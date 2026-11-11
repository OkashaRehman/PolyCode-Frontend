import { useEffect, useMemo, useState } from "react";
import {
  listMyCourseProgress,
  listPublicCourseProgress,
  progressToMap,
} from "../../learn/shared/courseProgressApi";

/**
 * Loads Mongo CourseProgress for the profile being viewed.
 * Own profile uses /auth/learn/progress; public uses /auth/username/:u/learn/progress.
 */
export default function useProfileLearnProgress({
  enabled = true,
  isOwnProfile = false,
  username = "",
  token = null,
}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCourses([]);
      setError("");
      return undefined;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    const request = isOwnProfile
      ? token
        ? listMyCourseProgress(token)
        : Promise.resolve([])
      : username
        ? listPublicCourseProgress(username)
        : Promise.resolve([]);

    request
      .then((rows) => {
        if (cancelled) return;
        setCourses(Array.isArray(rows) ? rows : []);
      })
      .catch((err) => {
        if (cancelled) return;
        setCourses([]);
        setError(err.message || "Could not load course progress");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, isOwnProfile, username, token, version]);

  const byCourseId = useMemo(() => {
    const map = {};
    for (const course of courses) {
      if (!course?.courseId) continue;
      map[course.courseId] = {
        completedMap: progressToMap(course),
        bookmarks: course.bookmarks || [],
        lastLessonId: course.lastLessonId || null,
        totalXp: course.totalXp || 0,
        currentStreak: course.currentStreak || 0,
        remoteProgress: course,
      };
    }
    return map;
  }, [courses]);

  return {
    courses,
    byCourseId,
    loading,
    error,
    refresh: () => setVersion((v) => v + 1),
  };
}
