import useCourseProgress from "../../shared/useCourseProgress";

export default function useNumpyProgress() {
  return useCourseProgress({
    courseId: "numpy-py",
    storagePrefix: "numpy_py",
    scoped: true,
    supportsNotes: false,
  });
}
