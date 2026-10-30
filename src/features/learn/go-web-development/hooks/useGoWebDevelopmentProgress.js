import useCourseProgress from "../../shared/useCourseProgress";

export default function useGoWebDevelopmentProgress() {
  return useCourseProgress({
    courseId: "go-web-development",
    storagePrefix: "go_web_development",
    scoped: false,
    supportsNotes: true,
  });
}
