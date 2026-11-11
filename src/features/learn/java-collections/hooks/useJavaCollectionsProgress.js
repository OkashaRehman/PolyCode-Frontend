import useCourseProgress from "../../shared/useCourseProgress";

export default function useJavaCollectionsProgress() {
  return useCourseProgress({
    courseId: "java-collections",
    storagePrefix: "java_collections",
    scoped: false,
    supportsNotes: true,
  });
}
