import useCourseProgress from "../../shared/useCourseProgress";

export default function useCssAnimationsProgress() {
  return useCourseProgress({
    courseId: "css-animations",
    storagePrefix: "css-animations",
    scoped: false,
    supportsNotes: false,
  });
}
