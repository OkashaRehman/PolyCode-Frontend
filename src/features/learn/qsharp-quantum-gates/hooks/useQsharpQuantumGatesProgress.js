import useCourseProgress from "../../shared/useCourseProgress";

export default function useQsharpQuantumGatesProgress() {
  return useCourseProgress({
    courseId: "qsharp-quantum-gates",
    storagePrefix: "qsharp_quantum_gates",
    scoped: true,
    supportsNotes: false,
  });
}
