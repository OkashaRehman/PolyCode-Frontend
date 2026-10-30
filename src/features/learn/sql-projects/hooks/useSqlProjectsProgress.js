import useCourseProgress from "../../shared/useCourseProgress";

export default function useSqlProjectsProgress() {
  return useCourseProgress({
    courseId: "sql-projects",
    storagePrefix: "sqlprojects",
    scoped: false,
    supportsNotes: false,
  });
}
