import useCourseProgress from "../../shared/useCourseProgress";

export default function useCProjectsProgress() {
  return useCourseProgress({
    courseId: "c-projects",
    storagePrefix: "c_projects",
    scoped: false,
    supportsNotes: false,
  });
}
