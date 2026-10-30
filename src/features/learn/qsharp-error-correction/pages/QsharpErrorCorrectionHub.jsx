import React from "react";
import CourseCertificate from "../../shared/CourseCertificate";
import StructuredCourseHub from "../../shared/StructuredCourseHub";
import {
  QSHARP_ERROR_CORRECTION,
  QSHARP_ERROR_CORRECTION_LESSONS,
} from "../data/qsharpErrorCorrectionCurriculum";
import useQsharpErrorCorrectionProgress from "../hooks/useQsharpErrorCorrectionProgress";

const BASE_PATH = "/learn/qsharp-error-correction";

export default function QsharpErrorCorrectionHub() {
  const progressApi = useQsharpErrorCorrectionProgress();
  const completedCount = Object.keys(progressApi.completedMap).length;
  const earnedXP = QSHARP_ERROR_CORRECTION.lessons
    .filter((lesson) => progressApi.completedMap[lesson.id])
    .reduce((total, lesson) => total + lesson.xp, 0);

  return (
    <>
      <StructuredCourseHub
        config={{ ...QSHARP_ERROR_CORRECTION, basePath: BASE_PATH }}
        progressApi={progressApi}
        earnedXP={earnedXP}
      />
      <CourseCertificate
        courseName="Q# Error Correction & Noise"
        totalLessons={QSHARP_ERROR_CORRECTION_LESSONS.length}
        completedCount={completedCount}
      />
    </>
  );
}
