import React from "react";
import StructuredCourseLessonPage from "../../shared/StructuredCourseLessonPage";
import { BATCHFILE_SECURITY } from "../data/batchfileSecurityCurriculum";
import useBatchfileSecurityProgress from "../hooks/useBatchfileSecurityProgress";

export default function BatchfileSecurityLessonPage() {
  const progressApi = useBatchfileSecurityProgress();
  return (
    <StructuredCourseLessonPage
      config={BATCHFILE_SECURITY}
      progressApi={progressApi}
      onComplete={progressApi.completeLesson}
    />
  );
}
