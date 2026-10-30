import useCourseProgress from "../../shared/useCourseProgress";

export default function useQsharpFundamentalsProgress() {
  return useCourseProgress({
    courseId: "qsharp-fundamentals",
    storagePrefix: "qsharp_fundamentals",
    scoped: true,
    supportsNotes: false,
  });
}
