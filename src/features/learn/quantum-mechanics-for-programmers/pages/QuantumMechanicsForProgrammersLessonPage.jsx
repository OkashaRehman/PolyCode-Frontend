import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import {
  QUANTUM_MECHANICS_FOR_PROGRAMMERS_CHAPTERS,
  QUANTUM_MECHANICS_FOR_PROGRAMMERS_LESSONS,
  QUANTUM_MECHANICS_FOR_PROGRAMMERS_TOTAL_XP,
} from "../data/quantumMechanicsForProgrammersCurriculum";
import useQuantumMechanicsForProgrammersProgress from "../hooks/useQuantumMechanicsForProgrammersProgress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

// THEORY-ONLY LESSON PAGE — differs from
// QuantumComputingFundamentalsLessonPage.jsx on purpose:
//   - No "tab" state (theory/challenge) — there's only ever theory.
//   - No LessonChallengeTab, no PythonCodeChallenge, no savedCodeMap/saveCode.
//   - "Mark as read" IS lesson completion here (awards XP directly),
//     since there's no challenge step to gate behind.

const BASE_PATH = "/learn/quantum-mechanics-for-programmers";
const READ_GATE_PREFIX = "quantum_mechanics_for_programmers";

export default function QuantumMechanicsForProgrammersLessonPage() {
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
  } = useQuantumMechanicsForProgrammersProgress();

  const lesson = QUANTUM_MECHANICS_FOR_PROGRAMMERS_LESSONS.find(
    (item) => item.id === lessonId,
  );
  const lessonIdx = QUANTUM_MECHANICS_FOR_PROGRAMMERS_LESSONS.findIndex(
    (item) => item.id === lessonId,
  );
  const prev = QUANTUM_MECHANICS_FOR_PROGRAMMERS_LESSONS[lessonIdx - 1];
  const next = QUANTUM_MECHANICS_FOR_PROGRAMMERS_LESSONS[lessonIdx + 1];

  useLessonAssistantContext({
    course: "Quantum Mechanics for Programmers",
    language: "Quantum",
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
        <p>Quantum Mechanics lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>
          ← Back to Quantum Mechanics for Programmers
        </button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = QUANTUM_MECHANICS_FOR_PROGRAMMERS_LESSONS.filter(
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
        chapters={QUANTUM_MECHANICS_FOR_PROGRAMMERS_CHAPTERS}
        basePath={BASE_PATH}
        title="Quantum Mechanics for Programmers"
      />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button
            type="button"
            className="oops-back-btn"
            onClick={() => navigate(BASE_PATH)}
          >
            ← Quantum Mechanics for Programmers
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
            trackTitle="Quantum Mechanics for Programmers"
            syncLabel={
              isAuthenticated
                ? "Quantum Mechanics progress saved to your account"
                : "Sign in to save progress"
            }
            completedCount={completedCount}
            totalLessons={QUANTUM_MECHANICS_FOR_PROGRAMMERS_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={QUANTUM_MECHANICS_FOR_PROGRAMMERS_TOTAL_XP}
            bookmarksCount={bookmarks.length}
            streak={0}
          />
        </div>

        {/* No tab bar here — theory is the only content, unlike the
            Fundamentals/Algorithms/Projects courses which have a
            Theory/Challenge tab pair. */}

        <LessonContentShell
          tab="theory"
          storageKey={`quantum-mechanics-for-programmers:${lessonId}`}
          videoUrl={lesson.videoUrl}
          videoTitle={`${lesson.title} — Quantum Mechanics for Programmers`}
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
