import useCourseProgress from "../../shared/useCourseProgress";

export default function useQsharpQuantumProgrammingBasicsProgress() {
  return useCourseProgress({
    courseId: "qsharp-quantum-programming-basics",
    storagePrefix: "qsharp_quantum_programming_basics",
    scoped: true,
    supportsNotes: false,
  });
}
