import useCourseProgress from "../../shared/useCourseProgress";

export default function useJsDomProgress() {
  return useCourseProgress({
    courseId: "js-dom",
    storagePrefix: "js_dom",
    scoped: false,
    supportsNotes: false,
  });
}
