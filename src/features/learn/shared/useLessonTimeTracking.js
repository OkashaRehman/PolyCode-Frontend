import { useEffect } from "react";

/**
 * Accrue 1 minute of course time every 60s while a lesson is open.
 * No-ops when addTime or lessonId is missing (e.g. guest without sync).
 */
export default function useLessonTimeTracking(addTime, lessonId) {
  useEffect(() => {
    if (!lessonId || typeof addTime !== "function") return undefined;
    const id = setInterval(() => {
      addTime(1).catch?.(() => {});
    }, 60000);
    return () => clearInterval(id);
  }, [addTime, lessonId]);
}
