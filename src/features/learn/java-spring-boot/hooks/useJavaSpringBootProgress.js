import useCourseProgress from "../../shared/useCourseProgress";

export default function useJavaSpringBootProgress() {
  return useCourseProgress({
    courseId: "java-spring-boot",
    storagePrefix: "java_spring_boot",
    scoped: false,
    supportsNotes: true,
  });
}
