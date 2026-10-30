import useCourseProgress from "../../shared/useCourseProgress";

export default function useCFundamentalsProgress() {
  return useCourseProgress({
    courseId: "c-fundamentals",
    storagePrefix: "c_fundamentals",
    scoped: false,
    supportsNotes: false,
  });
}
