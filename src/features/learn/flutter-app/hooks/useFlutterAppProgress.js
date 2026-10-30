import useCourseProgress from "../../shared/useCourseProgress";

export default function useFlutterAppProgress() {
  return useCourseProgress({
    courseId: "flutter-app",
    storagePrefix: "flutter_app",
    scoped: true,
    supportsNotes: false,
  });
}
