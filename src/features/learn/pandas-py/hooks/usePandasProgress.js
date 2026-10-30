import useCourseProgress from "../../shared/useCourseProgress";

export default function usePandasProgress() {
  return useCourseProgress({
    courseId: "pandas-py",
    storagePrefix: "pandas_py",
    scoped: true,
    supportsNotes: false,
  });
}
