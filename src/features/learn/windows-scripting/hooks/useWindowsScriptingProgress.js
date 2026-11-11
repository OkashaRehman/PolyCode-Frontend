import useCourseProgress from "../../shared/useCourseProgress";

export default function useWindowsScriptingProgress() {
  return useCourseProgress({
    courseId: "windows-scripting",
    storagePrefix: "windows-scripting",
    scoped: false,
    supportsNotes: false,
  });
}
