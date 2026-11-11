import useCourseProgress from "../../shared/useCourseProgress";

export default function useJsOopsProgress() {
  return useCourseProgress({
    courseId: "js-oops",
    storagePrefix: "js_oops",
    scoped: false,
    supportsNotes: true,
  });
}
