import useCourseProgress from "../../shared/useCourseProgress";

export default function useJavaIntermediateProgress() {
  return useCourseProgress({
    courseId: "java-intermediate",
    storagePrefix: "java_intermediate",
    scoped: false,
    supportsNotes: true,
  });
}
