import useCourseProgress from "../../shared/useCourseProgress";

export default function useCMemoryManagementProgress() {
  return useCourseProgress({
    courseId: "c-memory-management",
    storagePrefix: "c_memory_management",
    scoped: false,
    supportsNotes: false,
  });
}
