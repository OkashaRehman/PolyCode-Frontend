import useCourseProgress from "../../shared/useCourseProgress";

export default function useJavaExceptionProgress() {
  return useCourseProgress({
    courseId: "java-exception",
    storagePrefix: "java_exception",
    scoped: false,
    supportsNotes: true,
  });
}
