import useCourseProgress from "../../shared/useCourseProgress";

export default function useFormsSemanticHtmlProgress() {
  return useCourseProgress({
    courseId: "forms-semantic-html",
    storagePrefix: "forms-semantic-html",
    scoped: false,
    supportsNotes: false,
  });
}
