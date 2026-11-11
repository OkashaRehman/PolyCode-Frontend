import React, { useEffect, useRef, useState } from "react";
import { LEARN_ACCENT } from "../../shared/learnAccent";
import { useNavigate, useParams } from "react-router-dom";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import JavaScriptCodeChallenge from "../../js-fundamentals/components/JavaScriptCodeChallenge";
import { JS_ES6_CHAPTERS, JS_ES6_LESSONS, JS_ES6_TOTAL_XP } from "../data/jsEs6Curriculum";
import useJsEs6Progress from "../hooks/useJsEs6Progress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

const BASE_PATH = "/learn/js-es6-plus";
const READ_GATE_PREFIX = "js_es6_plus";

export default function JsEs6LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const { markedAsRead, markAsRead, confidence, handleConfidenceChange, createGoToChallenge, challengeTabLocked } = useLessonReadGate(READ_GATE_PREFIX, lessonId);
  const goToChallenge = createGoToChallenge(setTab);
  const { user, isAuthenticated, completedMap: progress, savedCodeMap, bookmarks, completeLesson, rememberLesson, saveCode, toggleBookmark } = useJsEs6Progress();
  const codeSaveTimer = useRef(null);

  const lesson = JS_ES6_LESSONS.find((item) => item.id === lessonId);
  const lessonIdx = JS_ES6_LESSONS.findIndex((item) => item.id === lessonId);
  const prev = JS_ES6_LESSONS[lessonIdx - 1];
  const next = JS_ES6_LESSONS[lessonIdx + 1];

  useLessonAssistantContext({ course: "JavaScript", language: "JavaScript", lesson, chapter: lesson?.chapterTitle, tab, code: savedCodeMap[lessonId] || "" });

  useEffect(() => { setTab("theory"); }, [lessonId]);

  useEffect(() => { if (lessonId) rememberLesson(lessonId); }, [lessonId, rememberLesson]);

  useEffect(() => () => { window.clearTimeout(codeSaveTimer.current); }, []);

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>ES6+ lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>← Back to ES6+ Course</button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = JS_ES6_LESSONS.filter((item) => progress[item.id]).reduce((sum, item) => sum + item.xp, 0);

  async function handleChallengeComplete() { await completeLesson(lesson); }

  function handleCodeChange(code) {
    window.clearTimeout(codeSaveTimer.current);
    codeSaveTimer.current = window.setTimeout(() => { saveCode(lessonId, code).catch(() => {}); }, 700);
  }

  return (
    <div className={`oops-lesson-page ${focusMode ? "oops-focus-mode" : ""}`}>
      <OopsSidebar currentLessonId={lessonId} progress={progress} chapters={JS_ES6_CHAPTERS} basePath={BASE_PATH} title="JS ES6+" />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button type="button" className="oops-back-btn" onClick={() => navigate(BASE_PATH)}>← ES6+ Course</button>
          <div className="oops-lesson-breadcrumb">
            <span className="learn-lesson-chapter-tag">{lesson.chapterTitle}</span>
            <span className="oops-bc-sep">›</span>
            <span>{lesson.title}</span>
          </div>
          {isCompleted && <span className="oops-completed-badge">✓ Completed</span>}
          <button type="button" className={`oops-bookmark-btn ${isBookmarked ? "active" : ""}`} onClick={() => toggleBookmark(lessonId)}>{isBookmarked ? "★" : "☆"}</button>
          <button type="button" className={`oops-focus-btn ${focusMode ? "active" : ""}`} onClick={() => setFocusMode((v) => !v)}>{focusMode ? "Exit Focus" : "Focus"}</button>
          <LearnProfileMenu user={user} trackTitle="JS ES6+" syncLabel={isAuthenticated ? "ES6+ progress saved to your account" : "Sign in to save progress"} completedCount={completedCount} totalLessons={JS_ES6_LESSONS.length} earnedXP={earnedXP} totalXP={JS_ES6_TOTAL_XP} bookmarksCount={bookmarks.length} streak={0} />
        </div>

        <div className="oops-tabs">
          <button type="button" className={`oops-tab ${tab === "theory" ? "active" : ""}`} onClick={() => setTab("theory")}>Theory</button>
          <LessonChallengeTab active={tab === "challenge"} locked={challengeTabLocked} xp={lesson.xp} onClick={goToChallenge} />
        </div>

        <LessonContentShell tab={tab} storageKey={`js-es6-plus:${lessonId}`} videoUrl={lesson.videoUrl} videoTitle={`${lesson.title} — JS ES6+`}>
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
            <JavaScriptCodeChallenge
              challenge={lesson.challenge}
              accentColor={LEARN_ACCENT}
              isCompleted={isCompleted}
              onComplete={handleChallengeComplete}
              initialCode={savedCodeMap[lessonId]}
              onCodeChange={handleCodeChange}
            />
          )}
        </LessonContentShell>

        <div className="oops-lesson-nav">
          {prev ? (<button type="button" className="oops-nav-btn" onClick={() => navigate(`${BASE_PATH}/lesson/${prev.id}`)}>← {prev.title}</button>) : <div />}
          {next ? (<button type="button" className="oops-nav-btn oops-nav-next" onClick={() => navigate(`${BASE_PATH}/lesson/${next.id}`)}>{next.title} →</button>) : (<button type="button" className="oops-nav-btn oops-nav-next" onClick={() => navigate(BASE_PATH)}>Finish Course →</button>)}
        </div>
      </div>
    </div>
  );
}
