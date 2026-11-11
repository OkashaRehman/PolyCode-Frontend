import useCourseProgress from "../../shared/useCourseProgress";

export default function useFastapiProgress() {
  return useCourseProgress({
    courseId: "fastapi-py",
    storagePrefix: "fastapi_py",
    scoped: true,
    supportsNotes: false,
  });
}
