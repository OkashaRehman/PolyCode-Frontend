import useCourseProgress from "../../shared/useCourseProgress";

export default function useCppFundamentalsProgress() {
  return useCourseProgress({
    courseId: "cpp-fundamentals",
    storagePrefix: "cpp_fundamentals",
    scoped: false,
    supportsNotes: false,
  });
}
