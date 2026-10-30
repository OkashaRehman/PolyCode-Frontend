import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScipyTheoryShell from "../components/ScipyTheoryShell";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import PythonCodeChallenge from "../../numpy-py/components/PythonCodeChallenge";
import {
  SCIPY_CHAPTERS,
  SCIPY_LESSONS,
  SCIPY_TOTAL_XP,
} from "../data/scipyCurriculum";
import useScipyProgress from "../hooks/useScipyProgress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

const BASE_PATH = "/learn/scipy-py";
const READ_GATE_PREFIX = "scipy_py";
const SCIPY_ACCENT = "#0d9488";

export default function ScipyLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const {
    markedAsRead,
    markAsRead,
    confidence,
    handleConfidenceChange,
    createGoToChallenge,
    challengeTabLocked,
  } = useLessonReadGate(READ_GATE_PREFIX, lessonId);
  const goToChallenge = createGoToChallenge(setTab);
  const {
    user,
    isAuthenticated,
    completedMap: progress,
    savedCodeMap,
    bookmarks,
    completeLesson,
    rememberLesson,
    saveCode,
    toggleBookmark,
  } = useScipyProgress();
  const codeSaveTimer = useRef(null);

  const lesson = SCIPY_LESSONS.find((item) => item.id === lessonId);
  const lessonIdx = SCIPY_LESSONS.findIndex((item) => item.id === lessonId);
  const prev = SCIPY_LESSONS[lessonIdx - 1];
  const next = SCIPY_LESSONS[lessonIdx + 1];

  useLessonAssistantContext({
    course: "SciPy",
    language: "Python",
    lesson,
    chapter: lesson?.chapterTitle,
    tab,
    code: savedCodeMap[lessonId] || "",
  });

  useEffect(() => {
    setTab("theory");
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) rememberLesson(lessonId);
  }, [lessonId, rememberLesson]);

  useEffect(
    () => () => {
      window.clearTimeout(codeSaveTimer.current);
    },
    [],
  );

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>SciPy lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>
          ← Back to SciPy
        </button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = SCIPY_LESSONS.filter((item) => progress[item.id]).reduce(
    (sum, item) => sum + item.xp,
    0,
  );
  const accent = lesson.chapterColor || SCIPY_ACCENT;

  async function handleChallengeComplete() {
    await completeLesson(lesson);
  }

  function handleCodeChange(code) {
    window.clearTimeout(codeSaveTimer.current);
    codeSaveTimer.current = window.setTimeout(() => {
      saveCode(lessonId, code).catch(() => {});
    }, 700);
  }

  return (
    <div
      className={`oops-lesson-page scipy-lesson-page ${focusMode ? "oops-focus-mode" : ""}`}
      style={{ "--scipy-accent": accent }}
    >
      <OopsSidebar
        currentLessonId={lessonId}
        progress={progress}
        chapters={SCIPY_CHAPTERS}
        basePath={BASE_PATH}
        title="SciPy · py"
      />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar scipy-lesson-topbar">
          <button
            type="button"
            className="oops-back-btn"
            onClick={() => navigate(BASE_PATH)}
          >
            ← SciPy Lab
          </button>
          <div className="oops-lesson-breadcrumb">
            <span className="learn-lesson-chapter-tag scipy-chapter-tag">
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
          <button
            type="button"
            className={`oops-focus-btn ${focusMode ? "active" : ""}`}
            onClick={() => setFocusMode((v) => !v)}
          >
            {focusMode ? "Exit Focus" : "Focus"}
          </button>
          <LearnProfileMenu
            user={user}
            trackTitle="SciPy · py"
            syncLabel={
              isAuthenticated
                ? "SciPy progress saved to your account"
                : "Sign in to save progress"
            }
            completedCount={completedCount}
            totalLessons={SCIPY_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={SCIPY_TOTAL_XP}
            bookmarksCount={bookmarks.length}
            streak={0}
          />
        </div>

        <div className="oops-tabs scipy-tabs">
          <button
            type="button"
            className={`oops-tab ${tab === "theory" ? "active" : ""}`}
            onClick={() => setTab("theory")}
          >
            Theory
          </button>
          <LessonChallengeTab
            active={tab === "challenge"}
            locked={challengeTabLocked}
            xp={lesson.xp}
            onClick={() => goToChallenge()}
          />
        </div>

        <LessonContentShell
          tab={tab}
          storageKey={`scipy-py:${lessonId}`}
          videoUrl={lesson.videoUrl}
          videoTitle={`${lesson.title} — SciPy`}
        >
          {tab === "theory" ? (
            <ScipyTheoryShell
              lesson={lesson}
              quizStoragePrefix={READ_GATE_PREFIX}
              confidence={confidence}
              onConfidenceChange={handleConfidenceChange}
              markedAsRead={markedAsRead}
              onMarkAsRead={markAsRead}
              onGoChallenge={() => goToChallenge()}
            />
          ) : lesson.challenge ? (
            <PythonCodeChallenge
              challenge={{
                ...lesson.challenge,
                id: lesson.challenge?.id || lesson.id,
              }}
              accentColor={accent}
              isCompleted={isCompleted}
              onComplete={handleChallengeComplete}
              initialCode={savedCodeMap[lessonId]}
              onCodeChange={handleCodeChange}
            />
          ) : (
            <div className="oops-not-found">
              <p>This lesson does not have a coding challenge yet.</p>
            </div>
          )}
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
              className="oops-nav-btn oops-nav-next scipy-nav-next"
              onClick={() => navigate(`${BASE_PATH}/lesson/${next.id}`)}
            >
              {next.title} →
            </button>
          ) : (
            <button
              type="button"
              className="oops-nav-btn oops-nav-next scipy-nav-next"
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
