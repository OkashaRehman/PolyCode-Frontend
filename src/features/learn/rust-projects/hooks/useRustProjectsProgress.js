import useCourseProgress from "../../shared/useCourseProgress";

export default function useRustProjectsProgress() {
  return useCourseProgress({
    courseId: "rust-projects",
    storagePrefix: "rust-projects",
    scoped: false,
    supportsNotes: false,
  });
}
