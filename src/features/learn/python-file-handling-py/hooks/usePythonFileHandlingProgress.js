import useCourseProgress from "../../shared/useCourseProgress";

export default function usePythonFileHandlingProgress() {
  return useCourseProgress({
    courseId: "python-file-handling-py",
    storagePrefix: "python_file_handling_py",
    scoped: false,
    supportsNotes: false,
  });
}
