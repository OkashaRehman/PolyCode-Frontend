import useCourseProgress from "../../shared/useCourseProgress";

export default function useJavaJdbcProgress() {
  return useCourseProgress({
    courseId: "java-jdbc",
    storagePrefix: "java_jdbc",
    scoped: false,
    supportsNotes: true,
  });
}
