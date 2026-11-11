import useCourseProgress from "../../shared/useCourseProgress";

export default function useJavaProjectsProgress() {
  return useCourseProgress({
    courseId: "java-projects",
    storagePrefix: "java_projects",
    scoped: false,
    supportsNotes: true,
  });
}
