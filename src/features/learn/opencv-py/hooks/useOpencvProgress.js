import useCourseProgress from "../../shared/useCourseProgress";

export default function useOpencvProgress() {
  return useCourseProgress({
    courseId: "opencv-py",
    storagePrefix: "opencv_py",
    scoped: true,
    supportsNotes: false,
  });
}
