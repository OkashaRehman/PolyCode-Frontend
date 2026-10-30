import React from "react";
import StructuredCourseLessonPage from "../../shared/StructuredCourseLessonPage";
import { QSHARP_ERROR_CORRECTION } from "../data/qsharpErrorCorrectionCurriculum";
import useQsharpErrorCorrectionProgress from "../hooks/useQsharpErrorCorrectionProgress";

export default function QsharpErrorCorrectionLessonPage() {
  const progressApi = useQsharpErrorCorrectionProgress();
  return (
    <StructuredCourseLessonPage
      config={QSHARP_ERROR_CORRECTION}
      progressApi={progressApi}
      onComplete={progressApi.completeLesson}
    />
  );
}
