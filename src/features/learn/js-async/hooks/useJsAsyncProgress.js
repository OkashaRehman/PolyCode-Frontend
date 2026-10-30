import useCourseProgress from "../../shared/useCourseProgress";

export default function useJsAsyncProgress() {
  return useCourseProgress({
    courseId: "js-async",
    storagePrefix: "js_async",
    scoped: false,
    supportsNotes: false,
  });
}
