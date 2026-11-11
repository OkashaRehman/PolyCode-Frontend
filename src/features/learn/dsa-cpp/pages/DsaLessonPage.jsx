import React, { useEffect, useRef, useState } from "react";
import { LEARN_ACCENT } from "../../shared/learnAccent";
import { useNavigate, useParams } from "react-router-dom";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import CodeChallenge from "../../oops-cpp/components/CodeChallenge";
import {
  DSA_CPP_CHAPTERS,
  DSA_CPP_LESSONS,
  DSA_CPP_TOTAL_XP,
} from "../data/dsaCppCurriculum";
import useDsaCppProgress from "../hooks/useDsaCppProgress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

const BASE_PATH = "/learn/dsa-cpp";
const READ_GATE_PREFIX = "dsa_cpp";

export default function DsaLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const codeSaveTimer = useRef(null);

  const { markedAsRead, markAsRead, confidence, handleConfidenceChange, createGoToChallenge, challengeTabLocked } = useLessonReadGate(READ_GATE_PREFIX, lessonId);
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
  } = useDsaCppProgress();

  useEffect(() => {
    setTab("theory");
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) rememberLesson(lessonId);
  }, [lessonId, rememberLesson]);

  const lesson = DSA_CPP_LESSONS.find((item) => item.id === lessonId);
  const lessonIdx = DSA_CPP_LESSONS.findIndex((item) => item.id === lessonId);
  const prev = DSA_CPP_LESSONS[lessonIdx - 1];
  const next = DSA_CPP_LESSONS[lessonIdx + 1];

  useEffect(
    () => () => {
      window.clearTimeout(codeSaveTimer.current);
    },
    [],
  );

  useLessonAssistantContext({ course: "DSA C++", language: "C++", lesson, chapter: lesson?.chapterTitle, tab, code: savedCodeMap[lessonId] || "" });

  if (!lesson) return (
    <div className="oops-not-found">
      <p>DSA lesson not found.</p>
      <button type="button" onClick={() => navigate(BASE_PATH)}>← Back to DSA</button>
    </div>
  );

  const isCompleted = isAuthenticated && !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = DSA_CPP_LESSONS.filter((item) => progress[item.id]).reduce((sum, item) => sum + item.xp, 0);

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
      <OopsSidebar currentLessonId={lessonId} progress={progress} chapters={DSA_CPP_CHAPTERS} basePath={BASE_PATH} title="DSA C++" />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button type="button" className="oops-back-btn" onClick={() => navigate(BASE_PATH)}>← DSA C++</button>
          <div className="oops-lesson-breadcrumb">
            <span className="learn-lesson-chapter-tag">{lesson.chapterTitle}</span>
            <span className="oops-bc-sep">›</span>
            <span>{lesson.title}</span>
          </div>
          {isCompleted && <span className="oops-completed-badge">✓ Completed</span>}
          <button type="button" className={`oops-bookmark-btn ${isBookmarked ? "active" : ""}`} onClick={() => toggleBookmark(lessonId)}>{isBookmarked ? "★" : "☆"}</button>
          <button type="button" className={`oops-focus-btn ${focusMode ? "active" : ""}`} onClick={() => setFocusMode((v) => !v)}>{focusMode ? "Exit Focus" : "Focus"}</button>
          <LearnProfileMenu user={user} trackTitle="DSA C++" syncLabel={isAuthenticated ? "DSA progress saved to your account" : "Sign in to save progress"} completedCount={completedCount} totalLessons={DSA_CPP_LESSONS.length} earnedXP={earnedXP} totalXP={DSA_CPP_TOTAL_XP} bookmarksCount={bookmarks.length} streak={0} />
        </div>

        <div className="oops-tabs">
          <button type="button" className={`oops-tab ${tab === "theory" ? "active" : ""}`} onClick={() => setTab("theory")}>Theory</button>
          <LessonChallengeTab active={tab === "challenge"} locked={challengeTabLocked} xp={lesson.xp} onClick={goToChallenge} />
        </div>

        <LessonContentShell tab={tab} storageKey={`dsa-cpp:${lessonId}`} videoUrl={lesson.videoUrl} videoTitle={`${lesson.title} — DSA C++`}>
          {tab === "theory" ? (
            <NumpyIntroTheory
              lesson={lesson}
              quizStoragePrefix={READ_GATE_PREFIX}
              confidence={confidence}
              onConfidenceChange={handleConfidenceChange}
              markedAsRead={markedAsRead}
              onMarkAsRead={markAsRead}
              onGoChallenge={goToChallenge}
            />
          ) : (
            <CodeChallenge
              challenge={{ id: lessonId, ...lesson.challenge }}
              accentColor={LEARN_ACCENT}
              isCompleted={isCompleted}
              onComplete={handleChallengeComplete}
              initialCode={savedCodeMap[lessonId]}
              onCodeChange={handleCodeChange}
            />
          )}
        </LessonContentShell>

        <div className="oops-lesson-nav">
          {prev ? <button type="button" className="oops-nav-btn" onClick={() => navigate(`${BASE_PATH}/lesson/${prev.id}`)}>← {prev.title}</button> : <div />}
          {next ? <button type="button" className="oops-nav-btn oops-nav-next" onClick={() => navigate(`${BASE_PATH}/lesson/${next.id}`)}>{next.title} →</button> : <button type="button" className="oops-nav-btn oops-nav-next" onClick={() => navigate(BASE_PATH)}>Finish Course →</button>}
        </div>
      </div>
    </div>
  );
}
