import useCourseProgress from "../../shared/useCourseProgress";

export default function useBatchfileAutomationProgress() {
  return useCourseProgress({
    courseId: "batchfile-automation",
    storagePrefix: "batchfile-automation",
    scoped: false,
    supportsNotes: false,
  });
}
