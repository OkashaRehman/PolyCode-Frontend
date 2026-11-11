import useCourseProgress from "../../shared/useCourseProgress";

export default function usePhpFundamentalsProgress() {
  return useCourseProgress({
    courseId: "php-fundamentals",
    storagePrefix: "php_fundamentals",
    scoped: false,
    supportsNotes: false,
  });
}
