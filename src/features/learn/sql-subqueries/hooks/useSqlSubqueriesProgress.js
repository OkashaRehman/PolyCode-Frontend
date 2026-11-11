import useCourseProgress from "../../shared/useCourseProgress";

export default function useSqlSubqueriesProgress() {
  return useCourseProgress({
    courseId: "sql-subqueries",
    storagePrefix: "sqlsubqueries",
    scoped: false,
    supportsNotes: false,
  });
}
