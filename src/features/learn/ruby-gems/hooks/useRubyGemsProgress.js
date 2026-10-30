import useCourseProgress from "../../shared/useCourseProgress";

export default function useRubyGemsProgress() {
  return useCourseProgress({
    courseId: "ruby-gems",
    storagePrefix: "ruby_gems",
    scoped: false,
    supportsNotes: false,
  });
}
