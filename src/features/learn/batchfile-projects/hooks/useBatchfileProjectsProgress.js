import useCourseProgress from "../../shared/useCourseProgress";

export default function useBatchfileProjectsProgress() {
  return useCourseProgress({
    courseId: "batchfile-projects",
    storagePrefix: "batchfile-projects",
    scoped: false,
    supportsNotes: false,
  });
}
