import useCourseProgress from "../../shared/useCourseProgress";

export default function useRustFundamentalsProgress() {
  return useCourseProgress({
    courseId: "rust-fundamentals",
    storagePrefix: "rust-fundamentals",
    scoped: false,
    supportsNotes: false,
  });
}
