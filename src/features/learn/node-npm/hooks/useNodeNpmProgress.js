import useCourseProgress from "../../shared/useCourseProgress";

export default function useNodeNpmProgress() {
  return useCourseProgress({
    courseId: "node-npm",
    storagePrefix: "node_npm",
    scoped: false,
    supportsNotes: false,
  });
}
