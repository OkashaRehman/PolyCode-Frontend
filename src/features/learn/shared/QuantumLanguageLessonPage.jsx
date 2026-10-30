import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NumpyIntroTheory from "../numpy-py/components/NumpyIntroTheory";
import OopsSidebar from "../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "./LearnProfileMenu";
import LessonContentShell from "./LessonContentShell";
import PythonCodeChallenge from "../numpy-py/components/PythonCodeChallenge";
import LessonChallengeTab from "./LessonChallengeTab";
import useLessonReadGate from "./useLessonReadGate";
import { useLessonAssistantContext } from "../../assistant/hooks/useLessonAssistantContext";

export default function QuantumLanguageLessonPage({ config }) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const [code, setCode] = useState("");
  const timer = useRef(null);
  const gate = useLessonReadGate(config.readGatePrefix, lessonId);
  const progressApi = config.useProgress();
  const { user, isAuthenticated, completedMap: progress, savedCodeMap, bookmarks, completeLesson, rememberLesson, saveCode, toggleBookmark } = progressApi;
  const lessonIndex = config.lessons.findIndex((item) => item.id === lessonId);
  const lesson = config.lessons[lessonIndex];
  const previous = config.lessons[lessonIndex - 1];
  const next = config.lessons[lessonIndex + 1];
  useLessonAssistantContext({ course: config.title, language: "Quantum", lesson, chapter: lesson?.chapterTitle, tab, code: savedCodeMap[lessonId] || "" });
  useEffect(() => { setTab("theory"); setCode(savedCodeMap[lessonId] || ""); }, [lessonId, savedCodeMap]);
  useEffect(() => { if (lessonId) rememberLesson(lessonId); }, [lessonId, rememberLesson]);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  if (!lesson) return <div className="oops-not-found"><p>Quantum lesson not found.</p><button type="button" onClick={() => navigate(config.basePath)}>← Back to {config.title}</button></div>;
  const completed = isAuthenticated && !!progress[lessonId];
  const completedCount = Object.keys(progress).length;
  const earnedXP = config.lessons.filter((item) => progress[item.id]).reduce((sum, item) => sum + item.xp, 0);
  const onCodeChange = (value) => { setCode(value); window.clearTimeout(timer.current); timer.current = window.setTimeout(() => saveCode(lessonId, value).catch(() => {}), 700); };
  return <div className={`oops-lesson-page ${focusMode ? "oops-focus-mode" : ""}`}><OopsSidebar currentLessonId={lessonId} progress={progress} chapters={config.chapters} basePath={config.basePath} title={config.title} /><div className="oops-lesson-main"><div className="oops-lesson-topbar"><button type="button" className="oops-back-btn" onClick={() => navigate(config.basePath)}>← {config.title}</button><div className="oops-lesson-breadcrumb"><span className="learn-lesson-chapter-tag" style={{ color: lesson.chapterColor }}>{lesson.chapterTitle}</span><span className="oops-bc-sep">›</span><span>{lesson.title}</span></div>{completed && <span className="oops-completed-badge">✓ Completed</span>}<button type="button" className={`oops-bookmark-btn ${bookmarks.includes(lessonId) ? "active" : ""}`} onClick={() => toggleBookmark(lessonId)}>{bookmarks.includes(lessonId) ? "★" : "☆"}</button><button type="button" className={`oops-focus-btn ${focusMode ? "active" : ""}`} onClick={() => setFocusMode((value) => !value)}>{focusMode ? "Exit Focus" : "Focus"}</button><LearnProfileMenu user={user} trackTitle={config.title} syncLabel={isAuthenticated ? `${config.title} progress saved to your account` : "Sign in to save progress"} completedCount={completedCount} totalLessons={config.lessons.length} earnedXP={earnedXP} totalXP={config.totalXP} bookmarksCount={bookmarks.length} streak={0} /></div><div className="oops-tabs"><button type="button" className={`oops-tab ${tab === "theory" ? "active" : ""}`} onClick={() => setTab("theory")}>Theory</button><LessonChallengeTab active={tab === "challenge"} locked={gate.challengeTabLocked} xp={lesson.xp} onClick={gate.createGoToChallenge(setTab)} /></div><LessonContentShell tab={tab} storageKey={`${config.storagePrefix}:${lessonId}`}><>{tab === "theory" ? <NumpyIntroTheory lesson={lesson} quizStoragePrefix={config.readGatePrefix} confidence={gate.confidence} onConfidenceChange={gate.handleConfidenceChange} markedAsRead={gate.markedAsRead} onMarkAsRead={gate.markAsRead} onGoChallenge={gate.createGoToChallenge(setTab)} /> : <PythonCodeChallenge challenge={lesson.challenge} accentColor={config.accent} isCompleted={completed} onComplete={() => completeLesson(lesson)} initialCode={code || savedCodeMap[lessonId]} onCodeChange={onCodeChange} />}</></LessonContentShell><div className="oops-lesson-nav">{previous ? <button type="button" className="oops-nav-btn" onClick={() => navigate(`${config.basePath}/lesson/${previous.id}`)}>← {previous.title}</button> : <div />}{next ? <button type="button" className="oops-nav-btn oops-nav-next" onClick={() => navigate(`${config.basePath}/lesson/${next.id}`)}>{next.title} →</button> : <button type="button" className="oops-nav-btn oops-nav-next" onClick={() => navigate(config.basePath)}>Finish Course →</button>}</div></div></div>;
}
