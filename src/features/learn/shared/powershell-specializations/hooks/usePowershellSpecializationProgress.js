import useCourseProgress from "../../useCourseProgress";

export default function usePowershellSpecializationProgress(track) {
  return useCourseProgress({
    courseId: track.courseId,
    storagePrefix: track.storagePrefix,
    scoped: false,
    supportsNotes: false,
  });
}
