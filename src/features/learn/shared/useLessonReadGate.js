import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import {
  engagementToMap,
  getCourseProgress,
  upsertLessonEngagement,
} from "./courseProgressApi";
import { getCourseIdByStoragePrefix } from "./courseRegistry";

function readStorageKey(prefix, lessonId) {
  return `${prefix}_read_${lessonId}`;
}

function confidenceStorageKey(prefix, lessonId) {
  return `${prefix}_confidence_${lessonId}`;
}

function syncEngagement(token, courseId, lessonId, payload) {
  if (!token || !courseId || !lessonId) return;
  upsertLessonEngagement(token, courseId, { lessonId, ...payload }).catch(
    (error) => {
      console.warn("Lesson engagement sync failed:", error.message);
    },
  );
}

/**
 * Shared read gate + confidence state for all learn courses.
 * Guests: localStorage only. Signed-in: Mongo upsert + local cache.
 * @param {string} storagePrefix - e.g. "numpy_py", "oops", "pointers_cpp"
 * @param {string} lessonId
 */
export default function useLessonReadGate(storagePrefix, lessonId) {
  const { token, isAuthenticated } = useAuth();
  const courseId = getCourseIdByStoragePrefix(storagePrefix);
  const [markedAsRead, setMarkedAsRead] = useState(false);
  const [confidence, setConfidence] = useState("");

  useEffect(() => {
    if (!lessonId || !storagePrefix) return;

    const localRead =
      localStorage.getItem(readStorageKey(storagePrefix, lessonId)) === "true";
    const localConfidence =
      localStorage.getItem(confidenceStorageKey(storagePrefix, lessonId)) || "";

    setMarkedAsRead(localRead);
    setConfidence(localConfidence);

    if (!isAuthenticated || !token || !courseId) return undefined;

    let cancelled = false;
    getCourseProgress(token, courseId)
      .then((progress) => {
        if (cancelled) return;
        const entry = engagementToMap(progress)[lessonId];
        if (!entry) return;

        if (entry.read) {
          setMarkedAsRead(true);
          localStorage.setItem(readStorageKey(storagePrefix, lessonId), "true");
        }
        if (entry.confidence) {
          setConfidence(entry.confidence);
          localStorage.setItem(
            confidenceStorageKey(storagePrefix, lessonId),
            entry.confidence,
          );
        }
      })
      .catch(() => {
        /* keep local values */
      });

    return () => {
      cancelled = true;
    };
  }, [lessonId, storagePrefix, isAuthenticated, token, courseId]);

  const markAsRead = useCallback(() => {
    if (!lessonId || !storagePrefix) return;
    setMarkedAsRead(true);
    localStorage.setItem(readStorageKey(storagePrefix, lessonId), "true");
    syncEngagement(token, courseId, lessonId, { read: true });
  }, [lessonId, storagePrefix, token, courseId]);

  const handleConfidenceChange = useCallback(
    (value) => {
      if (!lessonId || !storagePrefix) return;
      setConfidence(value);
      localStorage.setItem(confidenceStorageKey(storagePrefix, lessonId), value);
      syncEngagement(token, courseId, lessonId, {
        read: true,
        confidence: value,
      });
    },
    [lessonId, storagePrefix, token, courseId],
  );

  const createGoToChallenge = useCallback(
    (setTab) => () => {
      if (!markedAsRead) return;
      setTab("challenge");
    },
    [markedAsRead],
  );

  const challengeTabLocked = !markedAsRead;

  return {
    markedAsRead,
    markAsRead,
    confidence,
    handleConfidenceChange,
    createGoToChallenge,
    challengeTabLocked,
  };
}
