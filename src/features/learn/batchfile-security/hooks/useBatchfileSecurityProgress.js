import useCourseProgress from "../../shared/useCourseProgress";

export default function useBatchfileSecurityProgress() {
  return useCourseProgress({
    courseId: "batchfile-security",
    storagePrefix: "batchfile-security",
    scoped: false,
    supportsNotes: false,
  });
}
