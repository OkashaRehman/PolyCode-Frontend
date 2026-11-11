import useCourseProgress from "../../shared/useCourseProgress";

export default function useQuantumComputingFundamentalsProgress() {
  return useCourseProgress({
    courseId: "quantum-computing-fundamentals",
    storagePrefix: "quantum_computing_fundamentals",
    scoped: false,
    supportsNotes: false,
  });
}
