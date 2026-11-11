import useCourseProgress from "../../shared/useCourseProgress";

export default function useJsEs6Progress() {
  return useCourseProgress({
    courseId: "js-es6-plus",
    storagePrefix: "js_es6_plus",
    scoped: false,
    supportsNotes: false,
  });
}
