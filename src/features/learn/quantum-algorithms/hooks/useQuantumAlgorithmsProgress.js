import useCourseProgress from "../../shared/useCourseProgress";

export default function useQuantumAlgorithmsProgress() {
  return useCourseProgress({
    courseId: "quantum-algorithms",
    storagePrefix: "quantum_algorithms",
    scoped: false,
    supportsNotes: false,
  });
}
