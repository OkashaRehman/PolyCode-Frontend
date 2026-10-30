import React, { useCallback, useEffect, useMemo } from "react";
import LessonAnnotator from "./LessonAnnotator";
import LessonVideo from "./LessonVideo";
import { useAuth } from "../../auth/context/AuthContext";
import { upsertLessonEngagement } from "./courseProgressApi";
import {
  getCourseIdByStoragePrefix,
  getCourseRegistryEntry,
} from "./courseRegistry";
import { ChallengeTelemetryContext } from "./challengeTelemetry";

function resolveCourseAndLesson(storageKey = "") {
  const parts = String(storageKey || "")
    .trim()
    .split(":")
    .filter(Boolean);
  if (parts.length < 2) {
    return { courseId: null, lessonId: null };
  }
  const scope = parts[0];
  const lessonId = parts[1];
  const byId = getCourseRegistryEntry(scope);
  const courseId =
    byId?.courseId || getCourseIdByStoragePrefix(scope) || scope;
  return { courseId, lessonId };
}

/**
 * Wraps theory/challenge content with optional YouTube video + markup tools.
 * storageKey should be unique per lesson (e.g. course:lessonId).
 * Pass tab ("theory" | "challenge") so notes/drawings stay on that tab only.
 */
export default function LessonContentShell({
  storageKey,
  tab,
  videoUrl,
  videoTitle,
  children,
}) {
  const { token, isAuthenticated } = useAuth();
  // Video sits at the bottom of the article, not under the code challenge.
  const showVideo = Boolean(videoUrl) && tab !== "challenge";
  const { courseId, lessonId } = useMemo(
    () => resolveCourseAndLesson(storageKey),
    [storageKey],
  );

  const annotationKey = useMemo(() => {
    const base = String(storageKey || "").trim();
    if (!base) return tab ? `tab:${tab}` : "";
    const scope = String(tab || "").trim();
    return scope ? `${base}:${scope}` : base;
  }, [storageKey, tab]);

  const reportChallengeResult = useCallback(
    (passed) => {
      if (!isAuthenticated || !token || !courseId || !lessonId) return;
      upsertLessonEngagement(token, courseId, {
        lessonId,
        challengeLastResult: passed ? "pass" : "fail",
        incrementChallengeAttempts: !passed,
      }).catch((error) => {
        console.warn("Challenge engagement sync failed:", error.message);
      });
    },
    [isAuthenticated, token, courseId, lessonId],
  );

  useEffect(() => {
    if (!isAuthenticated || !token || !courseId || !lessonId || !tab) return;
    upsertLessonEngagement(token, courseId, {
      lessonId,
      lastTab: tab,
    }).catch(() => {
      /* non-blocking */
    });
  }, [isAuthenticated, token, courseId, lessonId, tab]);

  return (
    <ChallengeTelemetryContext.Provider value={reportChallengeResult}>
      <div className={`oops-lesson-content${showVideo ? " has-lesson-video" : ""}`}>
        <LessonAnnotator
          storageKey={annotationKey}
          courseId={courseId}
          lessonId={lessonId}
          tab={tab || "theory"}
        >
          {children}
        </LessonAnnotator>
        {showVideo ? (
          <LessonVideo url={videoUrl} title={videoTitle} placement="article" />
        ) : null}
      </div>
    </ChallengeTelemetryContext.Provider>
  );
}
