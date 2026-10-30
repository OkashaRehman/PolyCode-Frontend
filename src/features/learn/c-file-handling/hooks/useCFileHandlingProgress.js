import useCourseProgress from "../../shared/useCourseProgress";

export default function useCFileHandlingProgress() {
  return useCourseProgress({
    courseId: "c-file-handling",
    storagePrefix: "c_file_handling",
    scoped: false,
    supportsNotes: false,
  });
}
