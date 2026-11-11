import useCourseProgress from "../../shared/useCourseProgress";

export default function useCsharpFileHandlingProgress() {
  return useCourseProgress({
    courseId: "csharp-file-handling",
    storagePrefix: "csharp_file_handling",
    scoped: false,
    supportsNotes: false,
  });
}
