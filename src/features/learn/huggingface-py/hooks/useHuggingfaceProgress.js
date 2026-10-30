import useCourseProgress from "../../shared/useCourseProgress";

export default function useHuggingfaceProgress() {
  return useCourseProgress({
    courseId: "huggingface-py",
    storagePrefix: "huggingface_py",
    scoped: true,
    supportsNotes: false,
  });
}
