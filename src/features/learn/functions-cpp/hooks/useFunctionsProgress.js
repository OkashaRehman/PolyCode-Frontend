import useCourseProgress from "../../shared/useCourseProgress";

export default function useFunctionsProgress() {
  return useCourseProgress({
    courseId: "functions-cpp",
    storagePrefix: "functions",
    scoped: true,
    supportsNotes: false,
  });
}
