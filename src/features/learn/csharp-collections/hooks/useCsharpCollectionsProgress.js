import useCourseProgress from "../../shared/useCourseProgress";

export default function useCsharpCollectionsProgress() {
  return useCourseProgress({
    courseId: "csharp-collections",
    storagePrefix: "csharp_collections",
    scoped: false,
    supportsNotes: false,
  });
}
