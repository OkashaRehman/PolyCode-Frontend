import useCourseProgress from "../../shared/useCourseProgress";

export default function useScipyProgress() {
  return useCourseProgress({
    courseId: "scipy-py",
    storagePrefix: "scipy_py",
    scoped: true,
    supportsNotes: false,
  });
}
