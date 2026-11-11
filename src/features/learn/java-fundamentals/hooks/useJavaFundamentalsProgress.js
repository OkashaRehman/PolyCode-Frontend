import useCourseProgress from "../../shared/useCourseProgress";

export default function useJavaFundamentalsProgress() {
  return useCourseProgress({
    courseId: "java-fundamentals",
    storagePrefix: "java_fundamentals",
    scoped: false,
    supportsNotes: true,
  });
}
