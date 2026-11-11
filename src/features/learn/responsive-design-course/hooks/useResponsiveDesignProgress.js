import useCourseProgress from "../../shared/useCourseProgress";

export default function useResponsiveDesignProgress() {
  return useCourseProgress({
    courseId: "responsive-design",
    storagePrefix: "responsive-design",
    scoped: false,
    supportsNotes: false,
  });
}
