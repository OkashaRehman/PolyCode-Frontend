import React, { useRef, useState, useEffect } from "react";
import { LEARN_ACCENT } from "../../shared/learnAccent";
import { useParams, useNavigate } from "react-router-dom";
import { ALL_LESSONS, TOTAL_XP, CHAPTERS } from "../data/stlCurriculum";
import CodeChallenge from "../../oops-cpp/components/CodeChallenge";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import useLessonReadGate from "../../shared/useLessonReadGate";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import useStlProgress from "../hooks/useStlProgress";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

const READ_GATE_PREFIX = "stl";
const BASE_PATH = "/learn/stl-cpp";

export default function StlLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const {
    user,
    syncState,
    remoteProgress,
    completedMap: progress,
    savedCodeMap,
    bookmarks,
    completeLesson,
    rememberLesson,
    saveCode,
    toggleBookmark,
  } = useStlProgress();
  const codeSaveTimer = useRef(null);

  const lesson = ALL_LESSONS.find((l) => l.id === lessonId);
  const { markedAsRead, markAsRead, confidence, handleConfidenceChange, createGoToChallenge, challengeTabLocked } =
    useLessonReadGate(READ_GATE_PREFIX, lessonId);
  const goToChallenge = createGoToChallenge(setTab);
  const lessonIdx = ALL_LESSONS.findIndex((l) => l.id === lessonId);
  const prev = ALL_LESSONS[lessonIdx - 1];
  const next = ALL_LESSONS[lessonIdx + 1];

  useLessonAssistantContext({
    course: "C++ STL",
    language: "C++",
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

  useEffect(() => () => {
    window.clearTimeout(codeSaveTimer.current);
  }, []);

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>Lesson not found.</p>
        <button onClick={() => navigate("/learn/stl-cpp")}>← Back to Hub</button>
      </div>
    );
  }

  const isCompleted = !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = ALL_LESSONS.filter((item) => progress[item.id]).reduce(
    (sum, item) => sum + item.xp,
    0,
  );
  const syncLabel =
    syncState === "synced"
      ? "Progress saved to MongoDB"
      : syncState === "syncing"
        ? "Syncing progress..."
        : user
          ? "Progress sync pending"
          : "Progress saved locally";

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
        chapters={CHAPTERS}
        basePath={BASE_PATH}
        title="C++ STL"
      />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button className="oops-back-btn" onClick={() => navigate("/learn/stl-cpp")}>
            ← C++ STL
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
            title={isBookmarked ? "Remove bookmark" : "Bookmark lesson"}
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
            trackTitle="C++ STL"
            syncLabel={syncLabel}
            completedCount={completedCount}
            totalLessons={ALL_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={TOTAL_XP}
            bookmarksCount={bookmarks.length}
            streak={remoteProgress?.currentStreak || 0}
          />
        </div>

        <div className="oops-tabs">
          <button
            className={`oops-tab ${tab === "theory" ? "active" : ""}`}
            onClick={() => setTab("theory")}
          >
            📖 Theory
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
          storageKey={`stl-cpp:${lessonId}`}
          videoUrl={lesson.videoUrl}
          videoTitle={`${lesson.title} — C++ STL`}
        >
          {tab === "theory" ? (
            <NumpyIntroTheory
              lesson={lesson}
              quizStoragePrefix={READ_GATE_PREFIX}
              confidence={confidence}
              onConfidenceChange={handleConfidenceChange}
              markedAsRead={markedAsRead}
              onMarkAsRead={markAsRead}
              onGoChallenge={goToChallenge}
              accentColor={LEARN_ACCENT}
            />
          ) : (
            <div className="oops-challenge-pane">
              <CodeChallenge
                challenge={lesson.challenge}
                initialCode={savedCodeMap[lessonId]}
                accentColor={LEARN_ACCENT}
                onCodeChange={handleCodeChange}
                onComplete={handleChallengeComplete}
              />
            </div>
          )}
        </LessonContentShell>

        <div className="oops-lesson-nav">
          {prev ? (
            <button
              type="button"
              className="oops-nav-btn"
              onClick={() => navigate(`/learn/stl-cpp/lesson/${prev.id}`)}
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
              onClick={() => navigate(`/learn/stl-cpp/lesson/${next.id}`)}
            >
              {next.title} →
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}