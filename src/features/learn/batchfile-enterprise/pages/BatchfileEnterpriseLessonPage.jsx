import React from "react";
import StructuredCourseLessonPage from "../../shared/StructuredCourseLessonPage";
import { BATCHFILE_ENTERPRISE } from "../data/batchfileEnterpriseCurriculum";
import useBatchfileEnterpriseProgress from "../hooks/useBatchfileEnterpriseProgress";

export default function BatchfileEnterpriseLessonPage() {
  const progressApi = useBatchfileEnterpriseProgress();
  return (
    <StructuredCourseLessonPage
      config={BATCHFILE_ENTERPRISE}
      progressApi={progressApi}
      onComplete={progressApi.completeLesson}
    />
  );
}
