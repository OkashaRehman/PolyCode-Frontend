import useCourseProgress from "../../shared/useCourseProgress";

export default function useJsWebDevProgress() {
  return useCourseProgress({
    courseId: "js-web-dev",
    storagePrefix: "js_web_dev",
    scoped: false,
    supportsNotes: false,
  });
}
