import useCourseProgress from "../../shared/useCourseProgress";

export default function useRubyFundamentalsProgress() {
  return useCourseProgress({
    courseId: "ruby-fundamentals",
    storagePrefix: "ruby_fundamentals",
    scoped: false,
    supportsNotes: false,
  });
}
