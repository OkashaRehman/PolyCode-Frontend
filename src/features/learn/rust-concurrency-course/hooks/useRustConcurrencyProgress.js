import useCourseProgress from "../../shared/useCourseProgress";

export default function useRustConcurrencyProgress() {
  return useCourseProgress({
    courseId: "rust-concurrency",
    storagePrefix: "rust-concurrency",
    scoped: false,
    supportsNotes: false,
  });
}
