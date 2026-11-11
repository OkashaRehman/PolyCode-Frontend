import useCourseProgress from "../../shared/useCourseProgress";

export default function useJsApisProgress() {
  return useCourseProgress({
    courseId: "js-apis",
    storagePrefix: "js_apis",
    scoped: false,
    supportsNotes: false,
  });
}
