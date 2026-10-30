import useCourseProgress from "../../shared/useCourseProgress";

export default function useGoConcurrencyProgress() {
  return useCourseProgress({
    courseId: "go-concurrency",
    storagePrefix: "go_concurrency",
    scoped: false,
    supportsNotes: true,
  });
}
