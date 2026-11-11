import useCourseProgress from "../../shared/useCourseProgress";

export default function useJavaAdvancedProgress() {
  return useCourseProgress({
    courseId: "java-advanced",
    storagePrefix: "java_advanced",
    scoped: false,
    supportsNotes: true,
  });
}
