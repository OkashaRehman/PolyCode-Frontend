import useCourseProgress from "../../shared/useCourseProgress";

export default function useQuantumProgrammingProjectsProgress() {
  return useCourseProgress({
    courseId: "quantum-programming-projects",
    storagePrefix: "quantum_programming_projects",
    scoped: false,
    supportsNotes: false,
  });
}
