import useCourseProgress from "../../shared/useCourseProgress";

export default function useSoftwareEngineeringFundamentalsProgress() {
  return useCourseProgress({
    courseId: "software-engineering-fundamentals",
    storagePrefix: "software_engineering_fundamentals",
    scoped: false,
    supportsNotes: false,
  });
}
