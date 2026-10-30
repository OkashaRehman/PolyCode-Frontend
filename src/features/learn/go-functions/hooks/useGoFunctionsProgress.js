import useCourseProgress from "../../shared/useCourseProgress";

export default function useGoFunctionsProgress() {
  return useCourseProgress({
    courseId: "go-functions",
    storagePrefix: "go_functions",
    scoped: false,
    supportsNotes: true,
  });
}
