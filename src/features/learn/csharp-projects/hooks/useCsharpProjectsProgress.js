import useCourseProgress from "../../shared/useCourseProgress";

export default function useCsharpProjectsProgress() {
  return useCourseProgress({
    courseId: "csharp-projects",
    storagePrefix: "csharp_projects",
    scoped: false,
    supportsNotes: false,
  });
}
