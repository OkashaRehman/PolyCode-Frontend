import useCourseProgress from "../../shared/useCourseProgress";

export default function useQuantumMultiSyntaxProgress() {
  return useCourseProgress({ courseId: "quantum-multi-syntax", storagePrefix: "quantum_multi_syntax", scoped: false, supportsNotes: false });
}
