import useCourseProgress from "../../shared/useCourseProgress";

export default function useGoModulesProgress() {
  return useCourseProgress({
    courseId: "go-modules",
    storagePrefix: "go_modules",
    scoped: false,
    supportsNotes: true,
  });
}
