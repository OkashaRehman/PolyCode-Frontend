import useCourseProgress from "../../shared/useCourseProgress";

export default function useSqlIndexesProgress() {
  return useCourseProgress({
    courseId: "sql-indexes",
    storagePrefix: "sqlindexes",
    scoped: false,
    supportsNotes: false,
  });
}
