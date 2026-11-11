import useCourseProgress from "../../shared/useCourseProgress";

export default function usePythonOopProgress() {
  return useCourseProgress({
    courseId: "python-oop-py",
    storagePrefix: "python_oop_py",
    scoped: false,
    supportsNotes: false,
  });
}
