import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LEARN_ACCENT } from "../../shared/learnAccent";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import PythonCodeChallenge from "../../numpy-py/components/PythonCodeChallenge";
import useLessonReadGate from "../../shared/useLessonReadGate";
import { ML_PY_CHAPTERS, ML_PY_LESSONS, ML_PY_TOTAL_XP } from "../data/MlPyCurriculum";
import useMlPyProgress from "../hooks/useMlPyProgress";

const BASE_PATH = "/learn/ml-py";
const READ_GATE_PREFIX = "ml_py";

export default function MlPyLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const codeSaveTimer = useRef(null);
  const { markedAsRead, markAsRead, confidence, handleConfidenceChange, createGoToChallenge, challengeTabLocked } = useLessonReadGate(READ_GATE_PREFIX, lessonId);
  const goToChallenge = createGoToChallenge(setTab);
  const { user, isAuthenticated, completedMap: progress, savedCodeMap, bookmarks, completeLesson, rememberLesson, saveCode, toggleBookmark } = useMlPyProgress();
  const index = ML_PY_LESSONS.findIndex((item) => item.id === lessonId);
  const lesson = ML_PY_LESSONS[index];
  const previous = ML_PY_LESSONS[index - 1];
  const next = ML_PY_LESSONS[index + 1];

  useEffect(() => setTab("theory"), [lessonId]);
  useEffect(() => { if (lessonId) rememberLesson(lessonId); }, [lessonId, rememberLesson]);
  useEffect(() => () => window.clearTimeout(codeSaveTimer.current), []);

  if (!lesson) return <div className="oops-not-found"><p>Machine Learning lesson not found.</p><button type="button" onClick={() => navigate(BASE_PATH)}>← Back to Machine Learning</button></div>;

  const isCompleted = isAuthenticated && !!progress[lessonId];
  const completedCount = Object.keys(progress).length;
  const earnedXP = ML_PY_LESSONS.filter((item) => progress[item.id]).reduce((sum, item) => sum + item.xp, 0);
  const handleCodeChange = (code) => { window.clearTimeout(codeSaveTimer.current); codeSaveTimer.current = window.setTimeout(() => saveCode(lessonId, code).catch(() => {}), 700); };

  return <div className={`oops-lesson-page ${focusMode ? "oops-focus-mode" : ""}`}>
    <OopsSidebar currentLessonId={lessonId} progress={progress} chapters={ML_PY_CHAPTERS} basePath={BASE_PATH} title="ML · Python" />
    <div className="oops-lesson-main"><div className="oops-lesson-topbar"><button type="button" className="oops-back-btn" onClick={() => navigate(BASE_PATH)}>← Machine Learning · Python</button><div className="oops-lesson-breadcrumb"><span className="learn-lesson-chapter-tag">{lesson.chapterTitle}</span><span className="oops-bc-sep">›</span><span>{lesson.title}</span></div>{isCompleted && <span className="oops-completed-badge">✓ Completed</span>}<button type="button" className={`oops-bookmark-btn ${bookmarks.includes(lessonId) ? "active" : ""}`} onClick={() => toggleBookmark(lessonId)}>{bookmarks.includes(lessonId) ? "★" : "☆"}</button><button type="button" className={`oops-focus-btn ${focusMode ? "active" : ""}`} onClick={() => setFocusMode((value) => !value)}>{focusMode ? "Exit Focus" : "Focus"}</button><LearnProfileMenu user={user} trackTitle="ML · Python" syncLabel={isAuthenticated ? "Machine Learning progress saved to your account" : "Sign in to save progress"} completedCount={completedCount} totalLessons={ML_PY_LESSONS.length} earnedXP={earnedXP} totalXP={ML_PY_TOTAL_XP} bookmarksCount={bookmarks.length} streak={0} /></div>
      <div className="oops-tabs"><button type="button" className={`oops-tab ${tab === "theory" ? "active" : ""}`} onClick={() => setTab("theory")}>Theory</button><LessonChallengeTab active={tab === "challenge"} locked={challengeTabLocked} xp={lesson.xp} onClick={goToChallenge} /></div>
      <LessonContentShell tab={tab} storageKey={`ml_py:${lessonId}`} videoUrl={lesson.videoUrl} videoTitle={`${lesson.title} - Machine Learning`}>
        {tab === "theory" ? <NumpyIntroTheory lesson={lesson} quizStoragePrefix={READ_GATE_PREFIX} confidence={confidence} onConfidenceChange={handleConfidenceChange} markedAsRead={markedAsRead} onMarkAsRead={markAsRead} onGoChallenge={goToChallenge} /> : <PythonCodeChallenge challenge={lesson.challenge} accentColor={LEARN_ACCENT} isCompleted={isCompleted} onComplete={() => completeLesson(lesson)} initialCode={savedCodeMap[lessonId]} onCodeChange={handleCodeChange} />}
      </LessonContentShell>
      <div className="oops-lesson-nav">{previous ? <button type="button" className="oops-nav-btn" onClick={() => navigate(`${BASE_PATH}/lesson/${previous.id}`)}>← {previous.title}</button> : <div />}{next ? <button type="button" className="oops-nav-btn oops-nav-next" onClick={() => navigate(`${BASE_PATH}/lesson/${next.id}`)}>{next.title} →</button> : <button type="button" className="oops-nav-btn oops-nav-next" onClick={() => navigate(BASE_PATH)}>Finish Course →</button>}</div>
    </div>
  </div>;
}
