import useCourseProgress from "../../shared/useCourseProgress";

export default function useCFunctionsProgress() {
  return useCourseProgress({
    courseId: "c-functions",
    storagePrefix: "c_functions",
    scoped: false,
    supportsNotes: false,
  });
}
