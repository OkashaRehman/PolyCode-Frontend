import useCourseProgress from "../../shared/useCourseProgress";

export default function useRustMemoryProgress() {
  return useCourseProgress({
    courseId: "rust-memory",
    storagePrefix: "rust-memory",
    scoped: false,
    supportsNotes: false,
  });
}
