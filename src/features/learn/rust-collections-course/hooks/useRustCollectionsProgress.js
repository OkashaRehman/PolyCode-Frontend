import useCourseProgress from "../../shared/useCourseProgress";

export default function useRustCollectionsProgress() {
  return useCourseProgress({
    courseId: "rust-collections",
    storagePrefix: "rust-collections",
    scoped: false,
    supportsNotes: false,
  });
}
