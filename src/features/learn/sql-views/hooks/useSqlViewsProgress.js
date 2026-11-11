import useCourseProgress from "../../shared/useCourseProgress";

export default function useSqlViewsProgress() {
  return useCourseProgress({
    courseId: "sql-views",
    storagePrefix: "sqlviews",
    scoped: false,
    supportsNotes: false,
  });
}
