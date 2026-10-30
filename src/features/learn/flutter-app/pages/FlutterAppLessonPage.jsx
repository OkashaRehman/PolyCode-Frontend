import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FlutterTheoryShell from "../components/FlutterTheoryShell";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import DartCodeChallenge from "../components/DartCodeChallenge";
import {
  FLUTTER_APP_CHAPTERS,
  FLUTTER_APP_LESSONS,
  FLUTTER_APP_TOTAL_XP,
} from "../data/flutterCurriculum";
import useFlutterAppProgress from "../hooks/useFlutterAppProgress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

const BASE_PATH = "/learn/flutter-app";
const READ_GATE_PREFIX = "flutter_app";
const FLUTTER_ACCENT = "#02569b";

export default function FlutterAppLessonPage() {
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
  } = useFlutterAppProgress();
  const codeSaveTimer = useRef(null);

  const lesson = FLUTTER_APP_LESSONS.find((item) => item.id === lessonId);
  const lessonIdx = FLUTTER_APP_LESSONS.findIndex((item) => item.id === lessonId);
  const prev = FLUTTER_APP_LESSONS[lessonIdx - 1];
  const next = FLUTTER_APP_LESSONS[lessonIdx + 1];

  useLessonAssistantContext({
    course: "Flutter Development",
    language: "Dart",
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
        <p>Flutter lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>
          ← Back to Flutter
        </button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = FLUTTER_APP_LESSONS.filter((item) => progress[item.id]).reduce(
    (sum, item) => sum + item.xp,
    0,
  );
  const accent = lesson.chapterColor || FLUTTER_ACCENT;

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
      className={`oops-lesson-page flutter-lesson-page ${focusMode ? "oops-focus-mode" : ""}`}
      style={{ "--flutter-accent": accent }}
    >
      <OopsSidebar
        currentLessonId={lessonId}
        progress={progress}
        chapters={FLUTTER_APP_CHAPTERS}
        basePath={BASE_PATH}
        title="Flutter · apps"
      />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar flutter-lesson-topbar">
          <button
            type="button"
            className="oops-back-btn"
            onClick={() => navigate(BASE_PATH)}
          >
            ← Flutter Studio
          </button>
          <div className="oops-lesson-breadcrumb">
            <span className="learn-lesson-chapter-tag flutter-chapter-tag">
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
            trackTitle="Flutter · apps"
            syncLabel={
              isAuthenticated
                ? "Flutter progress saved to your account"
                : "Sign in to save progress"
            }
            completedCount={completedCount}
            totalLessons={FLUTTER_APP_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={FLUTTER_APP_TOTAL_XP}
            bookmarksCount={bookmarks.length}
            streak={0}
          />
        </div>

        <div className="oops-tabs flutter-tabs">
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
          storageKey={`flutter-app:${lessonId}`}
          videoUrl={lesson.videoUrl}
          videoTitle={`${lesson.title} — Flutter`}
        >
          {tab === "theory" ? (
            <FlutterTheoryShell
              lesson={lesson}
              quizStoragePrefix={READ_GATE_PREFIX}
              confidence={confidence}
              onConfidenceChange={handleConfidenceChange}
              markedAsRead={markedAsRead}
              onMarkAsRead={markAsRead}
              onGoChallenge={() => goToChallenge()}
            />
          ) : lesson.challenge ? (
            <DartCodeChallenge
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
              className="oops-nav-btn oops-nav-next flutter-nav-next"
              onClick={() => navigate(`${BASE_PATH}/lesson/${next.id}`)}
            >
              {next.title} →
            </button>
          ) : (
            <button
              type="button"
              className="oops-nav-btn oops-nav-next flutter-nav-next"
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
