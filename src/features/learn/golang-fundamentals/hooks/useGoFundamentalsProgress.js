import useCourseProgress from "../../shared/useCourseProgress";

export default function useGoFundamentalsProgress() {
  return useCourseProgress({
    courseId: "go-fundamentals",
    storagePrefix: "go_fundamentals",
    scoped: false,
    supportsNotes: true,
  });
}
