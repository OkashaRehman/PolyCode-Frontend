import React, { useEffect, useRef, useState } from "react";

const CONFIDENCE_OPTIONS = [
  ["review", "😅 Need another read"],
  ["almost", "🙂 Getting it"],
  ["ready", "🚀 Ready for the challenge"],
];

// Minimum reading time before "Mark as read" works: about 1 minute per 200
// words of lesson text, kept between a floor and a cap.
const WORDS_PER_MINUTE = 200;
const MIN_READ_SECONDS = 15;
const MAX_READ_SECONDS = 300;
// The lesson is measured during its first few seconds (content can load late),
// then the requirement is frozen so quiz explanations appearing later don't
// raise it and lock the button again.
const MEASURE_SECONDS = 5;

function readProgressKey() {
  return `lesson_read_progress:${window.location.pathname}`;
}

function loadReadProgress(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key)) || {};
  } catch {
    return {};
  }
}

function saveReadProgress(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode / quota — the timer still works for this visit */
  }
}

/** Seconds needed to read the lesson the gate sits in (its own text excluded). */
function requiredReadSeconds(gate) {
  if (!gate) return MIN_READ_SECONDS;
  const lesson = gate.closest(".oops-lesson-content") || gate.parentElement;
  const text = (lesson?.textContent || "").replace(gate.textContent || "", " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  const seconds = Math.round((words / WORDS_PER_MINUTE) * 60);
  return Math.min(MAX_READ_SECONDS, Math.max(MIN_READ_SECONDS, seconds));
}

function formatSeconds(total) {
  const minutes = Math.floor(total / 60);
  const seconds = String(total % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function readingMessage({ reachedEnd, remaining }) {
  if (!reachedEnd) return "Read to the end of the lesson to mark it as read.";
  return `Keep reading — you can mark this lesson as read in ${formatSeconds(remaining)}.`;
}

/**
 * Tracks whether the learner has scrolled to the gate (the end of the lesson)
 * and spent long enough on the page. Only time with the tab visible counts.
 * Progress is kept per lesson URL for the browser session, so a reload or a
 * trip to the Challenge tab doesn't reset it.
 */
function useReadingRequirement(gateRef, active) {
  const [progress, setProgress] = useState({
    elapsed: 0,
    required: MIN_READ_SECONDS,
    reachedEnd: false,
  });

  useEffect(() => {
    if (!active) return undefined;

    let key;
    let elapsed;
    let reachedEnd;
    let required;
    let measureTicks;
    let observer = null;

    const load = () => {
      key = readProgressKey();
      const saved = loadReadProgress(key);
      elapsed = saved.elapsed || 0;
      reachedEnd = Boolean(saved.reachedEnd);
      required = saved.required || requiredReadSeconds(gateRef.current);
      measureTicks = saved.required ? 0 : MEASURE_SECONDS;
    };
    const save = () =>
      saveReadProgress(key, {
        elapsed,
        reachedEnd,
        ...(measureTicks === 0 ? { required } : {}),
      });
    const publish = () => setProgress({ elapsed, required, reachedEnd });

    load();

    const watchEnd = () => {
      observer?.disconnect();
      if (typeof IntersectionObserver === "undefined" || !gateRef.current) {
        reachedEnd = true;
        return;
      }
      observer = new IntersectionObserver((entries) => {
        if (reachedEnd || !entries.some((entry) => entry.isIntersecting)) return;
        reachedEnd = true;
        save();
        publish();
      });
      observer.observe(gateRef.current);
    };

    watchEnd();
    publish();

    const timer = window.setInterval(() => {
      // Lesson pages reuse this component when moving to the next lesson.
      if (readProgressKey() !== key) {
        load();
        watchEnd();
      }
      if (measureTicks > 0) {
        required = Math.max(required, requiredReadSeconds(gateRef.current));
        measureTicks -= 1;
      }
      if (document.visibilityState !== "hidden") elapsed += 1;
      save();
      publish();
    }, 1000);

    return () => {
      window.clearInterval(timer);
      observer?.disconnect();
    };
  }, [active, gateRef]);

  const remaining = Math.max(0, progress.required - progress.elapsed);
  return {
    ready: progress.reachedEnd && remaining === 0,
    reachedEnd: progress.reachedEnd,
    remaining,
  };
}

/**
 * Mark-as-read gate, then confidence check + challenge CTA.
 * Used at the end of theory content across all courses.
 */
export default function LessonReadGate({
  markedAsRead = false,
  onMarkAsRead,
  confidence = "",
  onConfidenceChange,
  onGoChallenge,
  accentColor = "#818cf8",
  challengeLabel = "Ready? Try the coding challenge →",
  quizzesRequired = 0,
  quizzesAttempted = 0,
}) {
  const [quizGateError, setQuizGateError] = useState(false);
  const gateRef = useRef(null);
  const reading = useReadingRequirement(gateRef, !markedAsRead);
  const quizzesPending =
    quizzesRequired > 0 && quizzesAttempted < quizzesRequired;
  // Theory-only lessons don't pass a challenge navigator; hide the CTA and
  // adjust the copy so we never show a dead "try the challenge" button.
  const hasChallenge = typeof onGoChallenge === "function";

  useEffect(() => {
    if (!quizzesPending) setQuizGateError(false);
  }, [quizzesPending]);

  function handleMarkAsRead() {
    if (!reading.ready) return;
    if (quizzesPending) {
      setQuizGateError(true);
      return;
    }
    setQuizGateError(false);
    onMarkAsRead?.();
  }

  if (!markedAsRead) {
    return (
      <div
        ref={gateRef}
        className="lesson-read-gate"
        style={{ "--lesson-accent": accentColor }}
      >
        <p className="lesson-read-gate-hint">
          {quizzesRequired > 0
            ? `Answer ${quizzesRequired === 1 ? "the quick check" : `all ${quizzesRequired} quick checks`} above, then mark this lesson as read${hasChallenge ? " to unlock the challenge" : " to complete it"}.`
            : hasChallenge
              ? "Finished reading? Mark this lesson as read to unlock the challenge."
              : "Finished reading? Mark this lesson as read to complete it."}
        </p>
        {quizGateError ? (
          <p className="lesson-read-gate-error" role="alert">
            Solve the MCQs to go ahead.
          </p>
        ) : null}
        {!reading.ready ? (
          <p className="lesson-read-gate-timer" role="status">
            {readingMessage(reading)}
          </p>
        ) : null}
        <button
          type="button"
          className="lesson-mark-read-btn"
          onClick={handleMarkAsRead}
          disabled={!reading.ready}
        >
          Mark as read
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="lesson-confidence-panel">
        <h3>How do you feel about this lesson?</h3>
        <div className="lesson-confidence-options">
          {CONFIDENCE_OPTIONS.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={confidence === value ? "active" : ""}
              onClick={() => onConfidenceChange(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {hasChallenge ? (
        <div className="lesson-read-actions">
          <button
            type="button"
            className="lesson-challenge-cta"
            style={{ "--lesson-accent": accentColor }}
            onClick={onGoChallenge}
          >
            {challengeLabel}
          </button>
        </div>
      ) : (
        <div className="lesson-read-actions">
          <p className="lesson-read-gate-hint lesson-read-gate-done">
            ✓ Lesson complete — use the arrows below to continue.
          </p>
        </div>
      )}
    </>
  );
}
