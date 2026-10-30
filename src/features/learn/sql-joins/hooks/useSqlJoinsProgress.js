import useCourseProgress from "../../shared/useCourseProgress";

export default function useSqlJoinsProgress() {
  return useCourseProgress({
    courseId: "sql-joins",
    storagePrefix: "sqljoins",
    scoped: false,
    supportsNotes: false,
  });
}
