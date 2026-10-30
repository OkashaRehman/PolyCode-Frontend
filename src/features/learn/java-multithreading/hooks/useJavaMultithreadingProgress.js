import useCourseProgress from "../../shared/useCourseProgress";

export default function useJavaMultithreadingProgress() {
  return useCourseProgress({
    courseId: "java-multithreading",
    storagePrefix: "java_multithreading",
    scoped: false,
    supportsNotes: true,
  });
}
