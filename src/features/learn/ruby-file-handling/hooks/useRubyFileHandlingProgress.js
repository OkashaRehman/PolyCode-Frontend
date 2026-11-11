import useCourseProgress from "../../shared/useCourseProgress";

export default function useRubyFileHandlingProgress() {
  const progress = useCourseProgress({
    courseId: "ruby-file-handling",
    storagePrefix: "ruby_file_handling",
    scoped: false,
    supportsNotes: false,
  });

  return {
    ...progress,
    // Rename completedMap to progress to match OopsSidebar expected prop (like Ruby OOP does)
    progress: progress.completedMap,
    completedLessons: progress.completedMap ? Object.keys(progress.completedMap) : [],
  };
}