import useCourseProgress from "../../shared/useCourseProgress";

export default function useBatchfileEnterpriseProgress() {
  return useCourseProgress({
    courseId: "batchfile-enterprise",
    storagePrefix: "batchfile-enterprise",
    scoped: false,
    supportsNotes: false,
  });
}
