import React, { useEffect, useRef, useState } from "react";
import { LEARN_ACCENT } from "../../shared/learnAccent";
import { useNavigate, useParams } from "react-router-dom";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import RubyFundamentalsCodeChallenge from "../../ruby-fundamentals/components/RubyFundamentalsCodeChallenge";
import {
  RUBY_BLOCKS_MODULES_CHAPTERS,
  RUBY_BLOCKS_MODULES_LESSONS,
  RUBY_BLOCKS_MODULES_TOTAL_XP,
} from "../data/rubyBlocksModulesCurriculum";
import useRubyBlocksModulesProgress from "../hooks/useRubyBlocksModulesProgress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

const BASE_PATH = "/learn/ruby-blocks-modules";
const READ_GATE_PREFIX = "ruby_blocks_modules";

export default function RubyBlocksModulesLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const { markedAsRead, markAsRead, confidence, handleConfidenceChange, createGoToChallenge, challengeTabLocked } = useLessonReadGate(READ_GATE_PREFIX, lessonId);
  const goToChallenge = createGoToChallenge(setTab);
  const { user, isAuthenticated, completedMap: progress, savedCodeMap, bookmarks, completeLesson, rememberLesson, saveCode, toggleBookmark } = useRubyBlocksModulesProgress();
  const codeSaveTimer = useRef(null);

  const lesson = RUBY_BLOCKS_MODULES_LESSONS.find((item) => item.id === lessonId);
  const lessonIdx = RUBY_BLOCKS_MODULES_LESSONS.findIndex((item) => item.id === lessonId);
  const prev = RUBY_BLOCKS_MODULES_LESSONS[lessonIdx - 1];
  const next = RUBY_BLOCKS_MODULES_LESSONS[lessonIdx + 1];

  useLessonAssistantContext({
    course: "Ruby Blocks & Modules",
    language: "Ruby",
    lesson,
    chapter: lesson?.chapterTitle,
    tab,
    code: savedCodeMap[lessonId] || "",
  });

  useEffect(() => { setTab("theory"); }, [lessonId]);
  useEffect(() => { if (lessonId) rememberLesson(lessonId); }, [lessonId, rememberLesson]);
  useEffect(() => () => { window.clearTimeout(codeSaveTimer.current); }, []);

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>Ruby Blocks & Modules lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>← Back to Ruby Blocks & Modules</button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && !!progress[lessonId];
  const isBookmarked = bookmarks.includes(lessonId);
  const completedCount = Object.keys(progress).length;
  const earnedXP = RUBY_BLOCKS_MODULES_LESSONS.filter((item) => progress[item.id]).reduce((sum, item) => sum + item.xp, 0);

  async function handleChallengeComplete() { await completeLesson(lesson); }

  function handleCodeChange(code) {
    window.clearTimeout(codeSaveTimer.current);
    codeSaveTimer.current = window.setTimeout(() => { saveCode(lessonId, code).catch(() => {}); }, 700);
  }

  return (
    <div className={`oops-lesson-page ${focusMode ? "oops-focus-mode" : ""}`}>
      <OopsSidebar currentLessonId={lessonId} progress={progress} chapters={RUBY_BLOCKS_MODULES_CHAPTERS} basePath={BASE_PATH} title="Ruby Blocks & Modules" />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button type="button" className="oops-back-btn" onClick={() => navigate(BASE_PATH)}>← Ruby Blocks & Modules</button>
          <div className="oops-lesson-breadcrumb">
            <span className="learn-lesson-chapter-tag">{lesson.chapterTitle}</span>
            <span className="oops-bc-sep">›</span>
            <span>{lesson.title}</span>
          </div>
          {isCompleted && <span className="oops-completed-badge">✓ Completed</span>}
          <button type="button" className={`oops-bookmark-btn ${isBookmarked ? "active" : ""}`} onClick={() => toggleBookmark(lessonId)}>{isBookmarked ? "★" : "☆"}</button>
          <button type="button" className={`oops-focus-btn ${focusMode ? "active" : ""}`} onClick={() => setFocusMode((v) => !v)}>{focusMode ? "Exit Focus" : "Focus"}</button>
          <LearnProfileMenu user={user} trackTitle="Ruby Blocks & Modules" syncLabel={isAuthenticated ? "Ruby Blocks & Modules progress saved to your account" : "Sign in to save progress"} completedCount={completedCount} totalLessons={RUBY_BLOCKS_MODULES_LESSONS.length} earnedXP={earnedXP} totalXP={RUBY_BLOCKS_MODULES_TOTAL_XP} bookmarksCount={bookmarks.length} streak={0} />
        </div>

        <div className="oops-tabs">
          <button type="button" className={`oops-tab ${tab === "theory" ? "active" : ""}`} onClick={() => setTab("theory")}>Theory</button>
          <LessonChallengeTab active={tab === "challenge"} locked={challengeTabLocked} xp={lesson.xp} onClick={goToChallenge} />
        </div>

        <LessonContentShell tab={tab} storageKey={`ruby-blocks-modules:${lessonId}`} videoUrl={lesson.videoUrl} videoTitle={`${lesson.title} — Ruby Blocks & Modules`}>
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
            <RubyFundamentalsCodeChallenge
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
          {prev ? (
            <button type="button" className="oops-nav-btn" onClick={() => navigate(`${BASE_PATH}/lesson/${prev.id}`)}>← {prev.title}</button>
          ) : (<div />)}
          {next ? (
            <button type="button" className="oops-nav-btn oops-nav-next" onClick={() => navigate(`${BASE_PATH}/lesson/${next.id}`)}>{next.title} →</button>
          ) : (
            <button type="button" className="oops-nav-btn oops-nav-next" onClick={() => navigate(BASE_PATH)}>Finish Course →</button>
          )}
        </div>
      </div>
    </div>
  );
}
