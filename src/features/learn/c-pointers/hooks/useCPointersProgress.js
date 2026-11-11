import useCourseProgress from "../../shared/useCourseProgress";

export default function useCPointersProgress() {
  return useCourseProgress({
    courseId: "c-pointers",
    storagePrefix: "c_pointers",
    scoped: false,
    supportsNotes: false,
  });
}
