import useCourseProgress from "../../shared/useCourseProgress";

export default function useCDataStructuresProgress() {
  return useCourseProgress({
    courseId: "c-data-structures",
    storagePrefix: "c_data_structures",
    scoped: false,
    supportsNotes: false,
  });
}
