import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NumpyIntroTheory from "../numpy-py/components/NumpyIntroTheory";
import OopsSidebar from "../oops-cpp/components/OopsSidebar";
import LearnProfileMenu from "./LearnProfileMenu";
import LessonContentShell from "./LessonContentShell";
import LessonChallengeTab from "./LessonChallengeTab";
import useLessonReadGate from "./useLessonReadGate";
import { useLessonAssistantContext } from "../../assistant/hooks/useLessonAssistantContext";

function KnowledgeCheck({ lesson, accent, isCompleted, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSelected(null);
    setFeedback("");
    setSaving(false);
  }, [lesson.id]);

  async function checkAnswer() {
    if (selected !== lesson.challenge.answer) {
      setFeedback("Not quite. Review the lesson and try another answer.");
      return;
    }
    setSaving(true);
    try {
      await onComplete(lesson);
      setFeedback("Correct — lesson complete!");
    } catch (error) {
      setFeedback(
        `Your answer is correct, but progress could not be saved: ${error.message || "Please try again."}`,
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="numpy-step-card" aria-labelledby="course-check-title">
      <h2 id="course-check-title">{lesson.challenge.title}</h2>
      <p>{lesson.challenge.description}</p>
      <div
        className="numpy-quiz-options"
        role="group"
        aria-label={lesson.challenge.question}
      >
        {lesson.challenge.options.map((option, index) => (
          <button
            key={option}
            type="button"
            className={`numpy-quiz-option${selected === index ? " selected" : ""}`}
            aria-pressed={selected === index}
            onClick={() => {
              setSelected(index);
              setFeedback("");
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={selected === null || saving || isCompleted}
        onClick={checkAnswer}
        style={{ backgroundColor: accent }}
      >
        {saving ? "Saving…" : isCompleted ? "Lesson completed" : "Check answer"}
      </button>
      {feedback ? (
        <p className="numpy-quiz-feedback" role="status">
          {feedback} {lesson.challenge.explanation}
        </p>
      ) : null}
    </section>
  );
}

export default function StructuredCourseLessonPage({
  config,
  progressApi,
  onComplete,
}) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("theory");
  const gate = useLessonReadGate(config.readGatePrefix, lessonId);
  const {
    user,
    isAuthenticated,
    completedMap: progress,
    bookmarks,
    rememberLesson,
    toggleBookmark,
  } = progressApi;
  const lessonIndex = config.lessons.findIndex((item) => item.id === lessonId);
  const lesson = config.lessons[lessonIndex];
  const previous = config.lessons[lessonIndex - 1];
  const next = config.lessons[lessonIndex + 1];
  const completed = isAuthenticated && Boolean(progress[lessonId]);
  const completedCount = Object.keys(progress).length;
  const earnedXP = config.lessons
    .filter((item) => progress[item.id])
    .reduce((sum, item) => sum + item.xp, 0);

  useLessonAssistantContext({
    course: config.title,
    language: config.language,
    lesson,
    chapter: lesson?.chapterTitle,
    tab,
  });

  useEffect(() => {
    setTab("theory");
  }, [lessonId]);

  useEffect(() => {
    if (lessonId) rememberLesson(lessonId);
  }, [lessonId, rememberLesson]);

  if (!lesson) {
    return (
      <div className="oops-not-found">
        <p>Lesson not found.</p>
        <button type="button" onClick={() => navigate(config.basePath)}>
          ← Back to {config.title}
        </button>
      </div>
    );
  }

  const goToChallenge = gate.createGoToChallenge(setTab);

  return (
    <div className="oops-lesson-page">
      <OopsSidebar
        currentLessonId={lessonId}
        progress={progress}
        chapters={config.chapters}
        basePath={config.basePath}
        title={config.title}
      />
      <div className="oops-lesson-main">
        <div className="oops-lesson-topbar">
          <button
            type="button"
            className="oops-back-btn"
            onClick={() => navigate(config.basePath)}
          >
            ← {config.title}
          </button>
          <div className="oops-lesson-breadcrumb">
            <span
              className="learn-lesson-chapter-tag"
              style={{ color: lesson.chapterColor }}
            >
              {lesson.chapterTitle}
            </span>
            <span className="oops-bc-sep">›</span>
            <span>{lesson.title}</span>
          </div>
          {completed ? (
            <span className="oops-completed-badge">✓ Completed</span>
          ) : null}
          <button
            type="button"
            className={`oops-bookmark-btn ${bookmarks.includes(lessonId) ? "active" : ""}`}
            onClick={() => toggleBookmark(lessonId)}
            aria-label={
              bookmarks.includes(lessonId) ? "Remove bookmark" : "Bookmark lesson"
            }
          >
            {bookmarks.includes(lessonId) ? "★" : "☆"}
          </button>
          <LearnProfileMenu
            user={user}
            trackTitle={config.title}
            syncLabel={
              isAuthenticated
                ? `${config.title} progress saved to your account`
                : "Sign in to save progress"
            }
            completedCount={completedCount}
            totalLessons={config.lessons.length}
            earnedXP={earnedXP}
            totalXP={config.totalXP}
            bookmarksCount={bookmarks.length}
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
            locked={gate.challengeTabLocked}
            xp={lesson.xp}
            onClick={goToChallenge}
          />
        </div>
        <LessonContentShell tab={tab} storageKey={`${config.id}:${lessonId}`}>
          {tab === "theory" ? (
            <NumpyIntroTheory
              lesson={lesson}
              quizStoragePrefix={config.readGatePrefix}
              confidence={gate.confidence}
              onConfidenceChange={gate.handleConfidenceChange}
              markedAsRead={gate.markedAsRead}
              onMarkAsRead={gate.markAsRead}
              onGoChallenge={goToChallenge}
              accentColor={config.accent}
            />
          ) : (
            <KnowledgeCheck
              lesson={lesson}
              accent={config.accent}
              isCompleted={completed}
              onComplete={onComplete}
            />
          )}
        </LessonContentShell>
        <div className="oops-lesson-nav">
          {previous ? (
            <button
              type="button"
              className="oops-nav-btn"
              onClick={() =>
                navigate(`${config.basePath}/lesson/${previous.id}`)
              }
            >
              ← {previous.title}
            </button>
          ) : (
            <div />
          )}
          {next ? (
            <button
              type="button"
              className="oops-nav-btn oops-nav-next"
              onClick={() => navigate(`${config.basePath}/lesson/${next.id}`)}
            >
              {next.title} →
            </button>
          ) : (
            <button
              type="button"
              className="oops-nav-btn oops-nav-next"
              onClick={() => navigate(config.basePath)}
            >
              Finish Course →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
