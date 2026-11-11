import React from "react";
import CourseCertificate from "../../shared/CourseCertificate";
import StructuredCourseHub from "../../shared/StructuredCourseHub";
import {
  BATCHFILE_ENTERPRISE,
  BATCHFILE_ENTERPRISE_LESSONS,
} from "../data/batchfileEnterpriseCurriculum";
import useBatchfileEnterpriseProgress from "../hooks/useBatchfileEnterpriseProgress";

const BASE_PATH = "/learn/batchfile-enterprise";

export default function BatchfileEnterpriseHub() {
  const progressApi = useBatchfileEnterpriseProgress();
  const completedCount = Object.keys(progressApi.completedMap).length;
  const earnedXP = BATCHFILE_ENTERPRISE.lessons
    .filter((lesson) => progressApi.completedMap[lesson.id])
    .reduce((total, lesson) => total + lesson.xp, 0);

  return (
    <>
      <StructuredCourseHub
        config={{ ...BATCHFILE_ENTERPRISE, basePath: BASE_PATH }}
        progressApi={progressApi}
        earnedXP={earnedXP}
      />
      <CourseCertificate
        courseName="Batchfile Enterprise Deployment"
        totalLessons={BATCHFILE_ENTERPRISE_LESSONS.length}
        completedCount={completedCount}
      />
    </>
  );
}
