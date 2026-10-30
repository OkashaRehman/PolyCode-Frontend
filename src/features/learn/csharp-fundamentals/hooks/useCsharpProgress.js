import useCourseProgress from "../../shared/useCourseProgress";

export default function useCsharpProgress() {
  return useCourseProgress({
    courseId: "csharp-fundamentals",
    storagePrefix: "csharp",
    scoped: false,
    supportsNotes: false,
  });
}
