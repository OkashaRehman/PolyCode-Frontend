import useCourseProgress from "../../shared/useCourseProgress";

export default function usePythonFundamentalsProgress() {
  return useCourseProgress({
    courseId: "python-fundamentals",
    storagePrefix: "python_fundamentals",
    scoped: false,
    supportsNotes: false,
  });
}
