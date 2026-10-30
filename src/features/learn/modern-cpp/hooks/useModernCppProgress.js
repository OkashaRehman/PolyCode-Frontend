import useCourseProgress from "../../shared/useCourseProgress";

export default function useModernCppProgress() {
  return useCourseProgress({
    courseId: "modern-cpp",
    storagePrefix: "modern_cpp",
    scoped: false,
    supportsNotes: false,
  });
}
