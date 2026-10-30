import useCourseProgress from "../../shared/useCourseProgress";

export default function useOopsProgress() {
  return useCourseProgress({
    courseId: "oops-cpp",
    storagePrefix: "oops",
    scoped: true,
    supportsNotes: false,
  });
}
