import React from "react";
import CourseCertificate from "../../shared/CourseCertificate";
import StructuredCourseHub from "../../shared/StructuredCourseHub";
import {
  BATCHFILE_SECURITY,
  BATCHFILE_SECURITY_LESSONS,
} from "../data/batchfileSecurityCurriculum";
import useBatchfileSecurityProgress from "../hooks/useBatchfileSecurityProgress";

const BASE_PATH = "/learn/batchfile-security";

export default function BatchfileSecurityHub() {
  const progressApi = useBatchfileSecurityProgress();
  const completedCount = Object.keys(progressApi.completedMap).length;
  const earnedXP = BATCHFILE_SECURITY.lessons
    .filter((lesson) => progressApi.completedMap[lesson.id])
    .reduce((total, lesson) => total + lesson.xp, 0);

  return (
    <>
      <StructuredCourseHub
        config={{ ...BATCHFILE_SECURITY, basePath: BASE_PATH }}
        progressApi={progressApi}
        earnedXP={earnedXP}
      />
      <CourseCertificate
        courseName="Batchfile Security & Reliability"
        totalLessons={BATCHFILE_SECURITY_LESSONS.length}
        completedCount={completedCount}
      />
    </>
  );
}
