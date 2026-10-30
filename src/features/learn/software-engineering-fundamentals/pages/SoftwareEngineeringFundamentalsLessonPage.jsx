import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import {
  SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS,
  SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS,
  SOFTWARE_ENGINEERING_FUNDAMENTALS_TOTAL_XP,
} from "../data/softwareEngineeringFundamentalsCurriculum";
import useSoftwareEngineeringFundamentalsProgress from "../hooks/useSoftwareEngineeringFundamentalsProgress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

// THEORY-ONLY LESSON PAGE — same pattern as
// QuantumMechanicsForProgrammersLessonPage.jsx on purpose:
//   - No "tab" state (theory/challenge) — there's only ever theory.
//   - No LessonChallengeTab, no PythonCodeChallenge, no savedCodeMap/saveCode.
//   - "Mark as read" IS lesson completion here (awards XP directly),
//     since there's no challenge step to gate behind.

const BASE_PATH = "/learn/software-engineering-fundamentals";
const READ_GATE_PREFIX = "software_engineering_fundamentals";

export default function SoftwareEngineeringFundamentalsLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { markedAsRead, markAsRead, confidence, handleConfidenceChange } =
    useLessonReadGate(READ_GATE_PREFIX, lessonId);
  const {
    user,
    isAuthenticated,
    completedMap: progress,
    bookmarks,
    completeLesson,
    rememberLesson,
    toggleBookmark,
  } = useSoftwareEngineeringFundamentalsProgress();

  const lesson = SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.find(
    (item) => item.id === lessonId,
  );
  const lessonIdx = SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.findIndex(
    (item) => item.id === lessonId,
  );
  const prev = SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS[lessonIdx - 1];
  const next = SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS[lessonIdx + 1];

  useLessonAssistantContext({
    course: "Introduction to Software Engineering",
    language: "Software Engineering",
    lesson,
    chapter: lesson?.chapterTitle,
    tab: "theory",
    code: "",
  });

  useEffect(() => {
    if (lessonId) rememberLesson(lessonId);
  }, [lessonId, rememberLesson]);

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>Software Engineering lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>
          ← Back to Introduction to Software Engineering
        </button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.filter(
    (item) => progress[item.id],
  ).reduce((sum, item) => sum + item.xp, 0);

  async function handleMarkAsRead() {
    markAsRead();
    if (!isCompleted) {
      await completeLesson(lesson);
    }
  }

  return (
    <div className="oops-lesson-page">
      <OopsSidebar
        currentLessonId={lessonId}
        progress={progress}
        chapters={SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS}
        basePath={BASE_PATH}
        title="Introduction to Software Engineering"
      />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button
            type="button"
            className="oops-back-btn"
            onClick={() => navigate(BASE_PATH)}
          >
            ← Introduction to Software Engineering
          </button>
          <div className="oops-lesson-breadcrumb">
            <span className="learn-lesson-chapter-tag">
              {lesson.chapterTitle}
            </span>
            <span className="oops-bc-sep">›</span>
            <span>{lesson.title}</span>
          </div>
          {isCompleted && (
            <span className="oops-completed-badge">✓ Completed</span>
          )}
          <button
            type="button"
            className={`oops-bookmark-btn ${isBookmarked ? "active" : ""}`}
            onClick={() => toggleBookmark(lessonId)}
          >
            {isBookmarked ? "★" : "☆"}
          </button>
          <LearnProfileMenu
            user={user}
            trackTitle="Introduction to Software Engineering"
            syncLabel={
              isAuthenticated
                ? "Software Engineering progress saved to your account"
                : "Sign in to save progress"
            }
            completedCount={completedCount}
            totalLessons={SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={SOFTWARE_ENGINEERING_FUNDAMENTALS_TOTAL_XP}
            bookmarksCount={bookmarks.length}
            streak={0}
          />
        </div>

        {/* No tab bar here — theory is the only content, since this is a
            concept course with no code challenges. */}

        <LessonContentShell
          tab="theory"
          storageKey={`software-engineering-fundamentals:${lessonId}`}
          videoUrl={lesson.videoUrl}
          videoTitle={`${lesson.title} — Introduction to Software Engineering`}
        >
          <NumpyIntroTheory
            lesson={lesson}
            quizStoragePrefix={READ_GATE_PREFIX}
            confidence={confidence}
            onConfidenceChange={handleConfidenceChange}
            markedAsRead={markedAsRead}
            onMarkAsRead={handleMarkAsRead}
          />
        </LessonContentShell>

        <div className="oops-lesson-nav">
          {prev ? (
            <button
              type="button"
              className="oops-nav-btn"
              onClick={() => navigate(`${BASE_PATH}/lesson/${prev.id}`)}
            >
              ← {prev.title}
            </button>
          ) : (
            <div />
          )}
          {next ? (
            <button
              type="button"
              className="oops-nav-btn oops-nav-next"
              onClick={() => navigate(`${BASE_PATH}/lesson/${next.id}`)}
            >
              {next.title} →
            </button>
          ) : (
            <button
              type="button"
              className="oops-nav-btn oops-nav-next"
              onClick={() => navigate(BASE_PATH)}
            >
              Finish Course →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
