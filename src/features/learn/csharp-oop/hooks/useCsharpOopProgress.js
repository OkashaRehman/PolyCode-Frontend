import useCourseProgress from "../../shared/useCourseProgress";

export default function useCsharpOopProgress() {
  return useCourseProgress({
    courseId: "csharp-oop",
    storagePrefix: "csharp_oop",
    scoped: false,
    supportsNotes: false,
  });
}
