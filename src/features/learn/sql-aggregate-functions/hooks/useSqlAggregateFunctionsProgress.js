import useCourseProgress from "../../shared/useCourseProgress";

export default function useSqlAggregateFunctionsProgress() {
  return useCourseProgress({
    courseId: "sql-aggregate-functions",
    storagePrefix: "sqlaggregatefunctions",
    scoped: false,
    supportsNotes: false,
  });
}
