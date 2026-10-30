import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import CCodeChallenge from "../../shared/CCodeChallenge";
import {
  C_POINTERS_CHAPTERS,
  C_POINTERS_LESSONS,
  C_POINTERS_TOTAL_XP,
} from "../data/c_pointersCurriculum";
import useCPointersProgress from "../hooks/useCPointersProgress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

const BASE_PATH = "/learn/c-pointers";
const READ_GATE_PREFIX = "c_pointers";

export default function CPointersLessonPage() {
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
  } = useCPointersProgress();
  const codeSaveTimer = useRef(null);

  const lesson = C_POINTERS_LESSONS.find((item) => item.id === lessonId);
  const lessonIdx = C_POINTERS_LESSONS.findIndex((item) => item.id === lessonId);
  const prev = C_POINTERS_LESSONS[lessonIdx - 1];
  const next = C_POINTERS_LESSONS[lessonIdx + 1];

  useLessonAssistantContext({
    course: "C Pointers",
    language: "C",
    lesson,
    chapter: lesson?.chapterTitle,
    tab,
    code: savedCodeMap[lessonId] || "",
  });

  useEffect(() => { setTab("theory"); }, [lessonId]);

  useEffect(() => {
    if (lessonId) rememberLesson(lessonId);
  }, [lessonId, rememberLesson]);

  useEffect(() => () => { window.clearTimeout(codeSaveTimer.current); }, []);

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>C Pointers lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>
          ← Back to C Pointers
        </button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = C_POINTERS_LESSONS.filter((item) => progress[item.id]).reduce(
    (sum, item) => sum + item.xp,
    0,
  );

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
    <div className={`oops-lesson-page ${focusMode ? "oops-focus-mode" : ""}`}>
      <OopsSidebar
        currentLessonId={lessonId}
        progress={progress}
        chapters={C_POINTERS_CHAPTERS}
        basePath={BASE_PATH}
        title="C Pointers"
      />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button
            type="button"
            className="oops-back-btn"
            onClick={() => navigate(BASE_PATH)}
          >
            ← C Pointers
          </button>
          <div className="oops-lesson-breadcrumb">
            <span className="learn-lesson-chapter-tag">{lesson.chapterTitle}</span>
            <span className="oops-bc-sep">›</span>
            <span>{lesson.title}</span>
          </div>
          {isCompleted && <span className="oops-completed-badge">✓ Completed</span>}
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
            trackTitle="C Pointers"
            syncLabel={
              isAuthenticated
                ? "C Pointers progress saved to your account"
                : "Sign in to save progress"
            }
            completedCount={completedCount}
            totalLessons={C_POINTERS_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={C_POINTERS_TOTAL_XP}
            bookmarksCount={bookmarks.length}
            streak={0}
          />
        </div>

        <div className="oops-tabs">
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
            onClick={goToChallenge}
          />
        </div>

        <LessonContentShell
          tab={tab}
          storageKey={`c_pointers:${lessonId}`}
          videoUrl={lesson.videoUrl}
          videoTitle={`${lesson.title} — C`}
        >
          {tab === "theory" ? (
            <NumpyIntroTheory
              lesson={lesson}
              autoW3={false}
              quizStoragePrefix={READ_GATE_PREFIX}
              confidence={confidence}
              onConfidenceChange={handleConfidenceChange}
              markedAsRead={markedAsRead}
              onMarkAsRead={markAsRead}
              onGoChallenge={goToChallenge}
            />
          ) : (
            <CCodeChallenge
              challenge={lesson.challenge}
              lessonId={lessonId}
              lessonTitle={lesson.title}
              accentColor="#e74c3c"
              isCompleted={isCompleted}
              onComplete={handleChallengeComplete}
              initialCode={savedCodeMap[lessonId]}
              onCodeChange={handleCodeChange}
            />
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
