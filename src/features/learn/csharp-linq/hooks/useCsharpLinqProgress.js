import useCourseProgress from "../../shared/useCourseProgress";

export default function useCsharpLinqProgress() {
  return useCourseProgress({
    courseId: "csharp-linq",
    storagePrefix: "csharp_linq",
    scoped: false,
    supportsNotes: false,
  });
}
