import useCourseProgress from "../../shared/useCourseProgress";

export default function useBatchfileFundamentalsProgress() {
  return useCourseProgress({
    courseId: "batchfile-fundamentals",
    storagePrefix: "batchfile-fundamentals",
    scoped: false,
    supportsNotes: false,
  });
}
