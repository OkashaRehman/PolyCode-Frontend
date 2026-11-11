import useCourseProgress from "../../shared/useCourseProgress";

export default function useMlPyProgress() {
  return useCourseProgress({
    courseId: "ml-py",
    storagePrefix: "ml_py",
    scoped: false,
    supportsNotes: false,
  });
}
