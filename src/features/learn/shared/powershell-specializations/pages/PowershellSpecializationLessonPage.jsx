import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NumpyIntroTheory from "../../../numpy-py/components/NumpyIntroTheory";
import OopsSidebar from "../../../oops-cpp/components/OopsSidebar";
import LessonChallengeTab from "../../LessonChallengeTab";
import LessonContentShell from "../../LessonContentShell";
import LearnProfileMenu from "../../LearnProfileMenu";
import useLessonReadGate from "../../useLessonReadGate";
import PowerShellSpecializationChallenge from "../components/PowerShellSpecializationChallenge";
import {
  getPowerShellSpecializationTrack,
  POWERSHELL_SPECIALIZATION_TRACKS,
} from "../data/powershellSpecializationCurricula";
import usePowershellSpecializationProgress from "../hooks/usePowershellSpecializationProgress";
import { useLessonAssistantContext } from "../../../../assistant/hooks/useLessonAssistantContext";

export default function PowershellSpecializationLessonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const slug = location.pathname.split("/")[2];
  const track =
    getPowerShellSpecializationTrack(slug) ||
    POWERSHELL_SPECIALIZATION_TRACKS["powershell-security"];
  const basePath = `/learn/${track.slug}`;
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const codeSaveTimer = useRef(null);
  const {
    markedAsRead,
    markAsRead,
    confidence,
    handleConfidenceChange,
    createGoToChallenge,
    challengeTabLocked,
  } = useLessonReadGate(track.storagePrefix, lessonId);
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
  } = usePowershellSpecializationProgress(track);

  const lesson = track.lessons.find((item) => item.id === lessonId);
  const lessonIndex = track.lessons.findIndex((item) => item.id === lessonId);
  const previousLesson = track.lessons[lessonIndex - 1];
  const nextLesson = track.lessons[lessonIndex + 1];
  const completedCount = Object.keys(progress).length;
  const earnedXp = track.lessons
    .filter((item) => progress[item.id])
    .reduce((sum, item) => sum + item.xp, 0);

  useLessonAssistantContext({
    course: track.title,
    language: "PowerShell",
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
    () => () => window.clearTimeout(codeSaveTimer.current),
    [],
  );

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>Lesson not found.</p>
        <button type="button" onClick={() => navigate(basePath)}>
          ← Back to {track.title}
        </button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && Boolean(progress[lessonId]);

  async function handleChallengeComplete() {
    await completeLesson(lesson);
  }

  function handleCodeChange(code) {
    window.clearTimeout(codeSaveTimer.current);
    codeSaveTimer.current = window.setTimeout(() => {
      saveCode(lessonId, code).catch((error) => {
        console.warn("PowerShell course code save failed:", error.message);
      });
    }, 700);
  }

  return (
    <div className={`oops-lesson-page ${focusMode ? "oops-focus-mode" : ""}`}>
      <OopsSidebar
        currentLessonId={lessonId}
        progress={progress}
        chapters={track.chapters}
        basePath={basePath}
        title={track.title}
      />
      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button
            type="button"
            className="oops-back-btn"
            onClick={() => navigate(basePath)}
          >
            ← {track.title}
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
            className={`oops-bookmark-btn ${
              bookmarks.includes(lessonId) ? "active" : ""
            }`}
            onClick={() => toggleBookmark(lessonId)}
            aria-label={
              bookmarks.includes(lessonId)
                ? "Remove bookmark"
                : "Bookmark lesson"
            }
          >
            {bookmarks.includes(lessonId) ? "★" : "☆"}
          </button>
          <button
            type="button"
            className={`oops-focus-btn ${focusMode ? "active" : ""}`}
            onClick={() => setFocusMode((value) => !value)}
          >
            {focusMode ? "Exit focus" : "Focus"}
          </button>
          <LearnProfileMenu
            user={user}
            trackTitle={track.title}
            syncLabel={
              isAuthenticated
                ? "Progress saved to your account"
                : "Sign in to save progress"
            }
            completedCount={completedCount}
            totalLessons={track.lessons.length}
            earnedXP={earnedXp}
            totalXP={track.totalXp}
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
          storageKey={`${track.storagePrefix}:${lessonId}`}
        >
          {tab === "theory" ? (
            <NumpyIntroTheory
              lesson={lesson}
              quizStoragePrefix={track.storagePrefix}
              confidence={confidence}
              onConfidenceChange={handleConfidenceChange}
              markedAsRead={markedAsRead}
              onMarkAsRead={markAsRead}
              onGoChallenge={goToChallenge}
            />
          ) : (
            <PowerShellSpecializationChallenge
              lesson={lesson}
              isCompleted={isCompleted}
              onSuccess={handleChallengeComplete}
              initialCode={savedCodeMap[lessonId]}
              onCodeChange={handleCodeChange}
            />
          )}
        </LessonContentShell>

        <div className="oops-lesson-nav">
          {previousLesson ? (
            <button
              type="button"
              className="oops-nav-btn"
              onClick={() =>
                navigate(`${basePath}/lesson/${previousLesson.id}`)
              }
            >
              ← {previousLesson.title}
            </button>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <button
              type="button"
              className="oops-nav-btn oops-nav-next"
              onClick={() => navigate(`${basePath}/lesson/${nextLesson.id}`)}
            >
              {nextLesson.title} →
            </button>
          ) : (
            <button
              type="button"
              className="oops-nav-btn oops-nav-next"
              onClick={() => navigate(basePath)}
            >
              Finish course →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
