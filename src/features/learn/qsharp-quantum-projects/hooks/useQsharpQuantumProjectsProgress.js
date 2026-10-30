import useCourseProgress from "../../shared/useCourseProgress";

export default function useQsharpQuantumProjectsProgress() {
  return useCourseProgress({
    courseId: "qsharp-quantum-projects",
    storagePrefix: "qsharp_quantum_projects",
    scoped: true,
    supportsNotes: false,
  });
}
