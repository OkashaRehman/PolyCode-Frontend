import useCourseProgress from "../../shared/useCourseProgress";

export default function useDsaCppProgress() {
  return useCourseProgress({
    courseId: "dsa-cpp",
    storagePrefix: "dsa_cpp",
    scoped: false,
    supportsNotes: false,
  });
}
