import useCourseProgress from "../../shared/useCourseProgress";

export default function useJsFundamentalsProgress() {
  return useCourseProgress({
    courseId: "js-fundamentals",
    storagePrefix: "js_fundamentals",
    scoped: false,
    supportsNotes: false,
  });
}
