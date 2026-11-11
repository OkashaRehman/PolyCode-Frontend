import useCourseProgress from "../../shared/useCourseProgress";

export default function usePointersProgress() {
  return useCourseProgress({
    courseId: "pointers-cpp",
    storagePrefix: "pointers_cpp",
    scoped: true,
    supportsNotes: false,
  });
}
