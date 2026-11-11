import useCourseProgress from "../../shared/useCourseProgress";

export default function useQsharpErrorCorrectionProgress() {
  return useCourseProgress({
    courseId: "qsharp-error-correction",
    storagePrefix: "qsharp_error_correction",
    scoped: true,
    supportsNotes: false,
  });
}
