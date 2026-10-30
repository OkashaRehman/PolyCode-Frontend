/**
 * Publishes the lesson list of the lesson page that is currently on screen so
 * shared widgets rendered outside that page's tree (the challenge celebration,
 * for example) can jump to the next lesson without every course page having to
 * thread a callback down through its challenge component.
 *
 * `OopsSidebar` is the registrar: it already receives `chapters`, `basePath`
 * and `currentLessonId` on every lesson page.
 */
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";

const EMPTY_NAV = { basePath: "", lessons: [], currentLessonId: null };

let snapshot = EMPTY_NAV;
const listeners = new Set();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

export function useRegisterLessonNav({ basePath, chapters, currentLessonId }) {
  const lessons = useMemo(
    () => (chapters || []).flatMap((chapter) => chapter.lessons || []),
    [chapters],
  );

  useEffect(() => {
    snapshot = { basePath, lessons, currentLessonId };
    emit();
    return () => {
      snapshot = EMPTY_NAV;
      emit();
    };
  }, [basePath, lessons, currentLessonId]);
}

/**
 * Path of the lesson after the one being viewed, the course home when the
 * current lesson is the last one, or null when the registered lesson list does
 * not belong to the page we are on (daily challenges, a stale registration).
 */
export function resolveNextLessonPath(nav, pathname) {
  const { basePath, lessons, currentLessonId } = nav;
  if (!basePath || !currentLessonId || !lessons.length) return null;

  const lessonPath = `${basePath}/lesson/${currentLessonId}`;
  if (pathname !== lessonPath && pathname !== `${lessonPath}/`) return null;

  const index = lessons.findIndex((lesson) => lesson.id === currentLessonId);
  if (index === -1) return null;

  const next = lessons[index + 1];
  return next ? `${basePath}/lesson/${next.id}` : basePath;
}

export function useNextLessonPath() {
  const nav = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const { pathname } = useLocation();
  return useMemo(() => resolveNextLessonPath(nav, pathname), [nav, pathname]);
}
