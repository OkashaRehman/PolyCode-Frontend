import useCourseProgress from "../../shared/useCourseProgress";

export default function useQuantumMechanicsForProgrammersProgress() {
  return useCourseProgress({
    courseId: "quantum-mechanics-for-programmers",
    storagePrefix: "quantum_mechanics_for_programmers",
    scoped: false,
    supportsNotes: false,
  });
}
