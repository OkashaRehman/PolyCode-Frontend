import useCourseProgress from "../../shared/useCourseProgress";

export default function useCppDataStructuresProgress() {
  return useCourseProgress({
    courseId: "cpp-data-structures",
    storagePrefix: "cpp_data_structures",
    scoped: false,
    supportsNotes: false,
  });
}
