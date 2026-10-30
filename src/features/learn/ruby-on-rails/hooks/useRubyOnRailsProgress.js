import useCourseProgress from "../../shared/useCourseProgress";

function useRubyOnRailsProgress() {
  const progress = useCourseProgress({
    courseId: "ruby-on-rails",
    storagePrefix: "ruby_on_rails",
    scoped: false,
    supportsNotes: false,
  });

  return {
    ...progress,
    // Rename completedMap to progress to match OopsSidebar's expected prop
    // (same convention used by every other course's hook, e.g. Ruby File Handling)
    progress: progress.completedMap,
    completedLessons: progress.completedMap ? Object.keys(progress.completedMap) : [],
  };
}

// Both exports point to the same hook — default is what rubyOnRailsHub.jsx and
// rubyOnRailsLessonPage.jsx import; named is kept in case anything else in the
// project still imports { useRubyOnRailsProgress }.
export default useRubyOnRailsProgress;
export { useRubyOnRailsProgress };