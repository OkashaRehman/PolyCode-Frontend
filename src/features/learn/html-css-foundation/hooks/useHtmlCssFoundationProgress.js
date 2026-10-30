import useCourseProgress from "../../shared/useCourseProgress";

export default function useHtmlCssFoundationProgress() {
  return useCourseProgress({
    courseId: "html-css-foundation",
    storagePrefix: "html_css_foundation",
    scoped: false,
    supportsNotes: false,
  });
}
