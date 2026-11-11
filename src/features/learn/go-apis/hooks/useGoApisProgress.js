import useCourseProgress from "../../shared/useCourseProgress";

export default function useGoApisProgress() {
  return useCourseProgress({
    courseId: "go-apis",
    storagePrefix: "go_apis",
    scoped: false,
    supportsNotes: true,
  });
}
