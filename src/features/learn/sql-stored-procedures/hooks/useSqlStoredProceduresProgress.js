import useCourseProgress from "../../shared/useCourseProgress";

export default function useSqlStoredProceduresProgress() {
  return useCourseProgress({
    courseId: "sql-stored-procedures",
    storagePrefix: "sqlstoredprocedures",
    scoped: false,
    supportsNotes: false,
  });
}
