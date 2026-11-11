import useCourseProgress from "../../shared/useCourseProgress";

export default function useQuantumParadigmCodingProgress() {
  return useCourseProgress({ courseId: "quantum-paradigm-coding", storagePrefix: "quantum_paradigm_coding", scoped: false, supportsNotes: false });
}
