import useCourseProgress from "../../shared/useCourseProgress";

export default function useSqlFundamentalsProgress() {
  return useCourseProgress({
    courseId: "sql-fundamentals",
    storagePrefix: "sqlfundamentals",
    scoped: false,
    supportsNotes: false,
  });
}
