import useCourseProgress from "../../shared/useCourseProgress";

export default function useQsharpQuantumAlgorithmsProgress() {
  return useCourseProgress({
    courseId: "qsharp-quantum-algorithms",
    storagePrefix: "qsharp_quantum_algorithms",
    scoped: true,
    supportsNotes: false,
  });
}
