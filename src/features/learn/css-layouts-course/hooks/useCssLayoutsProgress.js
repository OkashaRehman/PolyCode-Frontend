import useCourseProgress from "../../shared/useCourseProgress";

export default function useCssLayoutsProgress() {
  return useCourseProgress({
    courseId: "css-layouts",
    storagePrefix: "css-layouts",
    scoped: false,
    supportsNotes: false,
  });
}
