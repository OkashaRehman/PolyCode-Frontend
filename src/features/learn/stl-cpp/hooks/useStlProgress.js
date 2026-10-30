import useCourseProgress from "../../shared/useCourseProgress";

export default function useStlProgress() {
  return useCourseProgress({
    courseId: "stl-cpp",
    storagePrefix: "stl",
    scoped: true,
    supportsNotes: false,
  });
}
