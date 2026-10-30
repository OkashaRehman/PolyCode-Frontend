import React, { useEffect, useRef, useState } from "react";
import { LEARN_ACCENT } from "../../shared/learnAccent";
import { useNavigate, useParams } from "react-router-dom";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import JavaScriptCodeChallenge from "../../js-fundamentals/components/JavaScriptCodeChallenge";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import { JS_APIS_CHAPTERS, JS_APIS_LESSONS, JS_APIS_TOTAL_XP } from "../data/jsApisCurriculum";
import useJsApisProgress from "../hooks/useJsApisProgress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";

const BASE_PATH = "/learn/js-apis";
const READ_GATE_PREFIX = "js_apis";

export default function JsApisLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const { markedAsRead, markAsRead, confidence, handleConfidenceChange, createGoToChallenge, challengeTabLocked } = useLessonReadGate(READ_GATE_PREFIX, lessonId);
  const goToChallenge = createGoToChallenge(setTab);
  const { user, isAuthenticated, completedMap: progress, savedCodeMap, bookmarks, completeLesson, rememberLesson, saveCode, toggleBookmark } = useJsApisProgress();
  const codeSaveTimer = useRef(null);

  const lesson = JS_APIS_LESSONS.find((item) => item.id === lessonId);
  const lessonIdx = JS_APIS_LESSONS.findIndex((item) => item.id === lessonId);
  const prev = JS_APIS_LESSONS[lessonIdx - 1];
  const next = JS_APIS_LESSONS[lessonIdx + 1];

  useLessonAssistantContext({ course: "JS APIs", language: "JavaScript", lesson, chapter: lesson?.chapterTitle, tab, code: savedCodeMap[lessonId] || "" });

  useEffect(() => { setTab("theory"); }, [lessonId]);
  useEffect(() => { if (lessonId) rememberLesson(lessonId); }, [lessonId, rememberLesson]);
  useEffect(() => () => { window.clearTimeout(codeSaveTimer.current); }, []);

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>JS APIs lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>← Back to JS APIs</button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = JS_APIS_LESSONS.filter((item) => progress[item.id]).reduce((sum, item) => sum + item.xp, 0);

  async function handleChallengeComplete() { await completeLesson(lesson); }

  function handleCodeChange(code) {
    window.clearTimeout(codeSaveTimer.current);
    codeSaveTimer.current = window.setTimeout(() => { saveCode(lessonId, code).catch(() => {}); }, 700);
  }

  return (
    <div className={`oops-lesson-page ${focusMode ? "oops-focus-mode" : ""}`}>
      <OopsSidebar currentLessonId={lessonId} progress={progress} chapters={JS_APIS_CHAPTERS} basePath={BASE_PATH} title="JS APIs" />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button type="button" className="oops-back-btn" onClick={() => navigate(BASE_PATH)}>← JS APIs</button>
          <div className="oops-lesson-breadcrumb">
            <span className="learn-lesson-chapter-tag">{lesson.chapterTitle}</span>
            <span className="oops-bc-sep">›</span>
            <span>{lesson.title}</span>
          </div>
          {isCompleted && <span className="oops-completed-badge">✓ Completed</span>}
          <button type="button" className={`oops-bookmark-btn ${isBookmarked ? "active" : ""}`} onClick={() => toggleBookmark(lessonId)}>{isBookmarked ? "★" : "☆"}</button>
          <button type="button" className={`oops-focus-btn ${focusMode ? "active" : ""}`} onClick={() => setFocusMode((v) => !v)}>{focusMode ? "Exit Focus" : "Focus"}</button>
          <LearnProfileMenu user={user} trackTitle="JS APIs" syncLabel={isAuthenticated ? "JS APIs progress saved to your account" : "Sign in to save progress"} completedCount={completedCount} totalLessons={JS_APIS_LESSONS.length} earnedXP={earnedXP} totalXP={JS_APIS_TOTAL_XP} bookmarksCount={bookmarks.length} streak={0} />
        </div>

        <div className="oops-tabs">
          <button type="button" className={`oops-tab ${tab === "theory" ? "active" : ""}`} onClick={() => setTab("theory")}>Theory</button>
          <LessonChallengeTab active={tab === "challenge"} locked={challengeTabLocked} xp={lesson.xp} onClick={goToChallenge} />
        </div>

        <LessonContentShell tab={tab} storageKey={`js-apis:${lessonId}`} videoUrl={lesson.videoUrl} videoTitle={`${lesson.title} — JS APIs`}>
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
