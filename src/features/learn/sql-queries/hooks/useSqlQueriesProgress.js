import useCourseProgress from "../../shared/useCourseProgress";

export default function useSqlQueriesProgress() {
  return useCourseProgress({
    courseId: "sql-queries",
    storagePrefix: "sqlqueries",
    scoped: false,
    supportsNotes: false,
  });
}
