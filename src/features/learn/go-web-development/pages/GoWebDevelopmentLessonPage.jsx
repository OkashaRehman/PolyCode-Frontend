import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import GoFundamentalsCodeChallenge from "../../golang-fundamentals/components/GoFundamentalsCodeChallenge";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import useLessonReadGate from "../../shared/useLessonReadGate";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";
import {
  GO_WEB_DEVELOPMENT_CHAPTERS,
  GO_WEB_DEVELOPMENT_LESSONS,
  GO_WEB_DEVELOPMENT_TOTAL_XP,
} from "../data/GoWebDevelopmentCurriculum";
import useGoWebDevelopmentProgress from "../hooks/useGoWebDevelopmentProgress";

const BASE_PATH = "/learn/go-web-development";
const READ_GATE_PREFIX = "go_web_development";

export default function GoWebDevelopmentLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const { markedAsRead, markAsRead, confidence, handleConfidenceChange, createGoToChallenge, challengeTabLocked } = useLessonReadGate(READ_GATE_PREFIX, lessonId);
  const goToChallenge = createGoToChallenge(setTab);
  const { user, isAuthenticated, completedMap: progress, savedCodeMap, getLessonNote, bookmarks, completeLesson, rememberLesson, saveCode, saveNote, toggleBookmark } = useGoWebDevelopmentProgress();
  const [noteDraft, setNoteDraft] = useState("");
  const codeSaveTimer = useRef(null);
  const lesson = GO_WEB_DEVELOPMENT_LESSONS.find((item) => item.id === lessonId);
  const index = GO_WEB_DEVELOPMENT_LESSONS.findIndex((item) => item.id === lessonId);
  const previous = GO_WEB_DEVELOPMENT_LESSONS[index - 1];
  const next = GO_WEB_DEVELOPMENT_LESSONS[index + 1];

  useLessonAssistantContext({ course: "Go Web Development", language: "Go", lesson, chapter: lesson?.chapterTitle, tab, code: savedCodeMap[lessonId] || "" });
  useEffect(() => { setTab("theory"); }, [lessonId]);
  useEffect(() => { if (lessonId) rememberLesson(lessonId); }, [lessonId, rememberLesson]);
  useEffect(() => { setNoteDraft(getLessonNote(lessonId)); }, [lessonId, getLessonNote]);
  useEffect(() => () => window.clearTimeout(codeSaveTimer.current), []);

  if (!lesson) return <div className="oops-not-found"><p>Go Web Development lesson not found.</p><button type="button" onClick={() => navigate(BASE_PATH)}>← Back to Go Web Development</button></div>;

  const completed = isAuthenticated && !!progress[lessonId];
  const completedCount = Object.keys(progress).length;
  const earnedXP = GO_WEB_DEVELOPMENT_LESSONS.filter((item) => progress[item.id]).reduce((sum, item) => sum + item.xp, 0);
  const handleCodeChange = (code) => { window.clearTimeout(codeSaveTimer.current); codeSaveTimer.current = window.setTimeout(() => saveCode(lessonId, code).catch(() => {}), 700); };

  return (
    <div className={`oops-lesson-page ${focusMode ? "oops-focus-mode" : ""}`}>
      <OopsSidebar currentLessonId={lessonId} progress={progress} chapters={GO_WEB_DEVELOPMENT_CHAPTERS} basePath={BASE_PATH} title="Go Web Development" />
      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar"><button type="button" className="oops-back-btn" onClick={() => navigate(BASE_PATH)}>← Go Web Development</button><div className="oops-lesson-breadcrumb"><span style={{ color: lesson.chapterColor }}>{lesson.chapterTitle}</span><span className="oops-bc-sep">›</span><span>{lesson.title}</span></div>{completed && <span className="oops-completed-badge">✓ Completed</span>}<button type="button" className={`oops-bookmark-btn ${bookmarks.includes(lessonId) ? "active" : ""}`} onClick={() => toggleBookmark(lessonId)}>{bookmarks.includes(lessonId) ? "★" : "☆"}</button><button type="button" className={`oops-focus-btn ${focusMode ? "active" : ""}`} onClick={() => setFocusMode((value) => !value)}>{focusMode ? "Exit Focus" : "Focus"}</button><LearnProfileMenu user={user} trackTitle="Go Web Development" syncLabel={isAuthenticated ? "Go Web Development progress saved to your account" : "Sign in to save progress"} completedCount={completedCount} totalLessons={GO_WEB_DEVELOPMENT_LESSONS.length} earnedXP={earnedXP} totalXP={GO_WEB_DEVELOPMENT_TOTAL_XP} bookmarksCount={bookmarks.length} streak={0} /></div>
        <div className="oops-tabs"><button type="button" className={`oops-tab ${tab === "theory" ? "active" : ""}`} onClick={() => setTab("theory")}>Theory</button><LessonChallengeTab active={tab === "challenge"} locked={challengeTabLocked} xp={lesson.xp} onClick={goToChallenge} /></div>
        <LessonContentShell storageKey={`go_web_development:${lessonId}`} videoUrl={lesson.videoUrl} videoTitle={`${lesson.title} — Go`}>
          {tab === "theory" ? <NumpyIntroTheory lesson={lesson} quizStoragePrefix={READ_GATE_PREFIX} noteDraft={noteDraft} onNoteChange={setNoteDraft} onSaveNote={() => saveNote(lessonId, noteDraft)} confidence={confidence} onConfidenceChange={handleConfidenceChange} markedAsRead={markedAsRead} onMarkAsRead={markAsRead} onGoChallenge={goToChallenge} /> : <GoFundamentalsCodeChallenge challenge={lesson.challenge} accentColor={lesson.chapterColor} isCompleted={completed} onComplete={() => completeLesson(lesson)} initialCode={savedCodeMap[lessonId]} onCodeChange={handleCodeChange} />}
        </LessonContentShell>
        <div className="oops-lesson-nav">{previous ? <button type="button" className="oops-nav-btn" onClick={() => navigate(`${BASE_PATH}/lesson/${previous.id}`)}>← {previous.title}</button> : <div />}{next ? <button type="button" className="oops-nav-btn oops-nav-next" onClick={() => navigate(`${BASE_PATH}/lesson/${next.id}`)}>{next.title} →</button> : <button type="button" className="oops-nav-btn oops-nav-next" onClick={() => navigate(BASE_PATH)}>Finish Course →</button>}</div>
      </div>
    </div>
  );
}
