import useCourseProgress from "../../shared/useCourseProgress";

export default function useCsharpAspnetBasicsProgress() {
  return useCourseProgress({
    courseId: "csharp-aspnet-basics",
    storagePrefix: "csharp_aspnet_basics",
    scoped: false,
    supportsNotes: false,
  });
}
