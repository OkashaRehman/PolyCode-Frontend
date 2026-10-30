import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import useLessonReadGate from "../../shared/useLessonReadGate";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";
import JavaCodeChallenge from "../../java-fundamentals/components/JavaCodeChallenge";
import {
  JAVA_JDBC_CHAPTERS,
  JAVA_JDBC_LESSONS,
  JAVA_JDBC_TOTAL_XP,
} from "../data/javaJdbcCurriculum";
import useJavaJdbcProgress from "../hooks/useJavaJdbcProgress";

const BASE_PATH = "/learn/java-jdbc";
const READ_GATE_PREFIX = "java_jdbc";

export default function JavaJdbcLessonPage() {
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
    getLessonNote,
    bookmarks,
    completeLesson,
    rememberLesson,
    saveCode,
    saveNote,
    toggleBookmark,
  } = useJavaJdbcProgress();

  const [noteDraft, setNoteDraft] = useState("");
  const codeSaveTimer = useRef(null);

  const lesson = JAVA_JDBC_LESSONS.find((l) => l.id === lessonId);
  const lessonIdx = JAVA_JDBC_LESSONS.findIndex(
    (l) => l.id === lessonId,
  );
  const prev = JAVA_JDBC_LESSONS[lessonIdx - 1];
  const next = JAVA_JDBC_LESSONS[lessonIdx + 1];

  useLessonAssistantContext({
    course: "Java JDBC",
    language: "Java",
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

  useEffect(() => {
    setNoteDraft(getLessonNote(lessonId));
  }, [lessonId, getLessonNote]);

  useEffect(
    () => () => {
      window.clearTimeout(codeSaveTimer.current);
    },
    [],
  );

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>Java lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>
          ← Back to Java JDBC
        </button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = JAVA_JDBC_LESSONS.filter(
    (l) => progress[l.id],
  ).reduce((sum, l) => sum + l.xp, 0);

  async function handleChallengeComplete() {
    await completeLesson(lesson);
  }

  function handleSaveNote() {
    saveNote(lessonId, noteDraft);
  }

  function handleCodeChange(code) {
    window.clearTimeout(codeSaveTimer.current);
    codeSaveTimer.current = window.setTimeout(() => {
      saveCode(lessonId, code).catch(() => {});
    }, 700);
  }

  return (
    <div className={`oops-lesson-page ${focusMode ? "oops-focus-mode" : ""}`}>
      {/* ── Sidebar ── */}
      <OopsSidebar
        currentLessonId={lessonId}
        progress={progress}
        chapters={JAVA_JDBC_CHAPTERS}
        basePath={BASE_PATH}
        title="Java JDBC"
      />

      <div className="oops-lesson-main">
        {/* ── Top bar ── */}
        <div className="oops-lesson-topbar">
          <button
            type="button"
            className="oops-back-btn"
            onClick={() => navigate(BASE_PATH)}
          >
            ← Java JDBC
          </button>
          <div className="oops-lesson-breadcrumb">
            <span style={{ color: lesson.chapterColor }}>
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
            trackTitle="Java JDBC"
            syncLabel={
              isAuthenticated
                ? "Java progress saved to your account"
                : "Sign in to save progress"
            }
            completedCount={completedCount}
            totalLessons={JAVA_JDBC_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={JAVA_JDBC_TOTAL_XP}
            bookmarksCount={bookmarks.length}
            streak={0}
          />
        </div>

        {/* ── Theory / Challenge tabs ── */}
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

        {/* ── Content ── */}
        <LessonContentShell
          storageKey={`java-jdbc:${lessonId}`}
          videoUrl={lesson.videoUrl}
          videoTitle={`${lesson.title} — Java`}
        >
          {tab === "theory" ? (
            <NumpyIntroTheory
              lesson={lesson}
              noteDraft={noteDraft}
              onNoteChange={setNoteDraft}
              onSaveNote={handleSaveNote}
              confidence={confidence}
              onConfidenceChange={handleConfidenceChange}
              markedAsRead={markedAsRead}
              onMarkAsRead={markAsRead}
              onGoChallenge={goToChallenge}
            />
          ) : (
            <JavaCodeChallenge
              challenge={lesson.challenge}
              accentColor={lesson.chapterColor || "#e76f00"}
              isCompleted={isCompleted}
              onComplete={handleChallengeComplete}
              initialCode={savedCodeMap[lessonId]}
              onCodeChange={handleCodeChange}
            />
          )}
        </LessonContentShell>

        {/* ── Prev / Next nav ── */}
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
