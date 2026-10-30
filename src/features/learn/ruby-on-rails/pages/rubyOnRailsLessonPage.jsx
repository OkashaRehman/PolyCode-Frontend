import React, { useEffect, useRef, useState } from "react";
import { LEARN_ACCENT } from "../../shared/learnAccent";
import { useNavigate, useParams } from "react-router-dom";
import OopsSidebar from "../../oops-cpp/components/OopsSidebar";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";
import LearnProfileMenu from "../../shared/LearnProfileMenu";
import LessonContentShell from "../../shared/LessonContentShell";
import RubyFundamentalsCodeChallenge from "../../ruby-fundamentals/components/RubyFundamentalsCodeChallenge";
import {
  RUBY_ON_RAILS_CHAPTERS,
  RUBY_ON_RAILS_LESSONS,
  RUBY_ON_RAILS_TOTAL_XP,
} from "../data/rubyOnRailsCurriculum";
import useRubyOnRailsProgress from "../hooks/useRubyOnRailsProgress";
import useLessonReadGate from "../../shared/useLessonReadGate";
import LessonChallengeTab from "../../shared/LessonChallengeTab";
import { useLessonAssistantContext } from "../../../assistant/hooks/useLessonAssistantContext";

const BASE_PATH = "/learn/ruby-on-rails";
const READ_GATE_PREFIX = "ruby_on_rails";

export default function RubyOnRailsLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const [focusMode, setFocusMode] = useState(false);
  const { markedAsRead, markAsRead, confidence, handleConfidenceChange, createGoToChallenge, challengeTabLocked } =
    useLessonReadGate(READ_GATE_PREFIX, lessonId);
  const goToChallenge = createGoToChallenge(setTab);
  const {
    user,
    isAuthenticated,
    progress,
    savedCodeMap,
    bookmarks,
    completeLesson,
    rememberLesson,
    saveCode,
    toggleBookmark,
  } = useRubyOnRailsProgress();
  const codeSaveTimer = useRef(null);

  const lesson = RUBY_ON_RAILS_LESSONS.find((item) => item.id === lessonId);
  const lessonIdx = RUBY_ON_RAILS_LESSONS.findIndex((item) => item.id === lessonId);
  const prev = RUBY_ON_RAILS_LESSONS[lessonIdx - 1];
  const next = RUBY_ON_RAILS_LESSONS[lessonIdx + 1];

  useLessonAssistantContext({
    course: "Ruby on Rails",
    language: "Ruby",
    lesson,
    chapter: lesson?.chapterTitle,
    tab,
    code: savedCodeMap?.[lessonId] || "",
  });

  useEffect(() => {
    setTab("theory");
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) rememberLesson(lessonId);
  }, [lessonId, rememberLesson]);

  useEffect(() => () => { window.clearTimeout(codeSaveTimer.current); }, []);

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>Ruby on Rails lesson not found.</p>
        <button type="button" onClick={() => navigate(BASE_PATH)}>← Back to Ruby on Rails</button>
      </div>
    );
  }

  const isCompleted = isAuthenticated && !!progress?.[lessonId];
  const isBookmarked = (bookmarks || []).includes(lessonId);
  const completedCount = Object.keys(progress || {}).length;
  const earnedXP = RUBY_ON_RAILS_LESSONS.filter((item) => progress?.[item.id]).reduce((sum, item) => sum + item.xp, 0);

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
      <OopsSidebar
        currentLessonId={lessonId}
        progress={progress}
        chapters={RUBY_ON_RAILS_CHAPTERS}
        basePath={BASE_PATH}
        title="Ruby on Rails"
      />

      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button type="button" className="oops-back-btn" onClick={() => navigate(BASE_PATH)}>← Ruby on Rails</button>
          <div className="oops-lesson-breadcrumb">
            <span className="learn-lesson-chapter-tag">{lesson.chapterTitle}</span>
            <span className="oops-bc-sep">›</span>
            <span>{lesson.title}</span>
          </div>
          {isCompleted && <span className="oops-completed-badge">✓ Completed</span>}
          <button type="button" className={`oops-bookmark-btn ${isBookmarked ? "active" : ""}`} onClick={() => toggleBookmark(lessonId)}>
            {isBookmarked ? "★" : "☆"}
          </button>
          <button type="button" className={`oops-focus-btn ${focusMode ? "active" : ""}`} onClick={() => setFocusMode((v) => !v)}>
            {focusMode ? "Exit Focus" : "Focus"}
          </button>
          <LearnProfileMenu
            user={user}
            trackTitle="Ruby on Rails"
            syncLabel={isAuthenticated ? "Ruby on Rails progress saved to your account" : "Sign in to save progress"}
            completedCount={completedCount}
            totalLessons={RUBY_ON_RAILS_LESSONS.length}
            earnedXP={earnedXP}
            totalXP={RUBY_ON_RAILS_TOTAL_XP}
            bookmarksCount={(bookmarks || []).length}
            streak={0}
          />
        </div>

        <div className="oops-tabs">
          <button type="button" className={`oops-tab ${tab === "theory" ? "active" : ""}`} onClick={() => setTab("theory")}>Theory</button>
          <LessonChallengeTab active={tab === "challenge"} locked={challengeTabLocked} xp={lesson.xp} onClick={goToChallenge} />
        </div>

        <LessonContentShell tab={tab} storageKey={`ruby-on-rails:${lessonId}`} videoUrl={lesson.videoUrl} videoTitle={`${lesson.title} — Ruby on Rails`}>
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
              initialCode={savedCodeMap?.[lessonId]}
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