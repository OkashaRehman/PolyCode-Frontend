import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  QSHARP_QUANTUM_GATES_CHAPTERS,
  QSHARP_QUANTUM_GATES_LESSONS,
  QSHARP_QUANTUM_GATES_TOTAL_XP,
} from "../data/qsharpQuantumGatesCurriculum";
import useQsharpQuantumGatesProgress from "../hooks/useQsharpQuantumGatesProgress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import LearnChapterIcon from "../../shared/LearnChapterIcon";
import CourseCertificate from "../../shared/CourseCertificate";

const BASE_PATH = "/learn/qsharp-quantum-gates";

const LEARNING_PATH = [
  {
    level: "Beginner",
    chapters: ["qg-single"],
    color: "#e11d48",
    summary: "Single-qubit Pauli X, Y, Z gates & bit/phase flips.",
  },
  {
    level: "Intermediate",
    chapters: ["qg-single"],
    color: "#f97316",
    summary: "Rotation gates (Rx, Ry, Rz) and S & T phase gates.",
  },
  {
    level: "Advanced",
    chapters: ["qg-two"],
    color: "#f59e0b",
    summary: "Two-qubit CNOT / CX and Controlled-Z (CZ) operations.",
  },
  {
    level: "Pro",
    chapters: ["qg-two"],
    color: "#10b981",
    summary: "SWAP gate operations and state exchange circuits.",
  },
  {
    level: "Expert",
    chapters: ["qg-multi"],
    color: "#06b6d4",
    summary: "Multi-qubit Toffoli (CCNOT) gates, gate decomposition, and reversible logic synthesis.",
  },
];

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => block.content.replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function QsharpQuantumGatesHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const {
    isAuthenticated,
    completedMap: progress,
    bookmarks,
    lastLessonId,
  } = useQsharpQuantumGatesProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = QSHARP_QUANTUM_GATES_LESSONS.filter(
    (lesson) => progress[lesson.id],
  ).reduce((sum, lesson) => sum + lesson.xp, 0);
  const pct = Math.round((completedCount / QSHARP_QUANTUM_GATES_LESSONS.length) * 100) || 0;
  const nextLesson =
    QSHARP_QUANTUM_GATES_LESSONS.find((lesson) => !progress[lesson.id]) ||
    QSHARP_QUANTUM_GATES_LESSONS[0];
  const resumeLesson =
    QSHARP_QUANTUM_GATES_LESSONS.find((lesson) => lesson.id === lastLessonId) ||
    nextLesson;
  const completedChapters = QSHARP_QUANTUM_GATES_CHAPTERS.filter((chapter) =>
    chapter.lessons.every((lesson) => progress[lesson.id]),
  ).length;

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return QSHARP_QUANTUM_GATES_LESSONS.filter((lesson) => {
      const matchesQuery =
        !query ||
        lesson.title.toLowerCase().includes(query) ||
        lesson.chapterTitle.toLowerCase().includes(query) ||
        lessonPlainText(lesson).toLowerCase().includes(query);
      const matchesFilter =
        filter === "all" ||
        (filter === "todo" && !progress[lesson.id]) ||
        (filter === "done" && progress[lesson.id]) ||
        (filter === "saved" && bookmarks.includes(lesson.id));
      return matchesQuery && matchesFilter;
    });
  }, [search, filter, progress, bookmarks]);

  return (
    <div className="oops-hub matplotlib-hub font-sans pb-24">
      <div className="oops-hero matplotlib-hero">
        <Link
          to="/language/qsharp"
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← Q# courses
        </Link>
        <div className="oops-hero-badge">CORE GATES TRACK</div>
        <h1 className="oops-hero-title">
          Quantum
          <br />
          <span className="oops-hero-accent">Gates</span>
        </h1>
        <p className="oops-hero-sub">
          Master single-qubit Pauli gates (X, Y, Z), rotation gates (Rx, Ry, Rz), phase gates (S, T), CNOT, CZ, SWAP, and Toffoli gates in Q#.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${QSHARP_QUANTUM_GATES_LESSONS.length} lessons · ${earnedXP}/${QSHARP_QUANTUM_GATES_TOTAL_XP} XP`
                  : `Sign in to track progress · ${QSHARP_QUANTUM_GATES_LESSONS.length} lessons`}
              </span>
              <span>{isAuthenticated ? `${pct}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div
                className="oops-xp-fill"
                style={{ width: isAuthenticated ? `${pct}%` : "0%" }}
              />
            </div>
          </div>

          <div className="oops-resume-panel">
            <span className="oops-sync-pill">
              {isAuthenticated
                ? "Progress saved to your account"
                : "Browse lessons — sign in to save progress"}
            </span>
            <h2>{resumeLesson.title}</h2>
            <p>
              {resumeLesson.chapterTitle} · {resumeLesson.xp} XP
            </p>
            <button
              type="button"
              onClick={() => navigate(`${BASE_PATH}/lesson/${resumeLesson.id}`)}
            >
              {completedCount > 0 ? "Resume Gates" : "Start Gates"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a gate</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Pauli, CNOT, SWAP, Toffoli..."
              aria-label="Search lessons"
            />
            <div className="oops-filter-tabs">
              {[
                ["all", "All"],
                ["todo", "To do"],
                ["done", "Done"],
                ["saved", "Saved"],
              ].map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  className={filter === val ? "active" : ""}
                  onClick={() => setFilter(val)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="oops-search-results">
            {filteredLessons.slice(0, 6).map((lesson) => (
              <button
                key={lesson.id}
                type="button"
                className="oops-search-result"
                onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}
              >
                <span>{progress[lesson.id] ? "✓" : "○"}</span>
                <strong>{lesson.title}</strong>
                <small>{lesson.chapterTitle}</small>
              </button>
            ))}
            {filteredLessons.length === 0 && (
              <p className="oops-empty-copy">No lessons match that search.</p>
            )}
          </div>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Recommended</span>
          <h2>{nextLesson.title}</h2>
          <p>
            Next in {nextLesson.chapterTitle}. Earn {nextLesson.xp} XP.
          </p>
          <button
            type="button"
            onClick={() => navigate(`${BASE_PATH}/lesson/${nextLesson.id}`)}
          >
            Open next lesson
          </button>
        </div>
      </div>

      <div className="oops-dashboard-strip">
        <div className="oops-stat-tile">
          <span>Lessons</span>
          <strong>{completedCount}/{QSHARP_QUANTUM_GATES_LESSONS.length}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>{completedChapters}/{QSHARP_QUANTUM_GATES_CHAPTERS.length}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>{earnedXP}/{QSHARP_QUANTUM_GATES_TOTAL_XP}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      <section className="matplotlib-learn-path" aria-label="Learning path">
        <div className="matplotlib-path-label">
          <span>Your path · 5 Stages (Beginner to Expert)</span>
          <small>
            {QSHARP_QUANTUM_GATES_CHAPTERS.length} chapters ·{" "}
            {QSHARP_QUANTUM_GATES_LESSONS.length} lessons
          </small>
        </div>
        <div className="matplotlib-path-grid">
          {LEARNING_PATH.map((stage) => {
            const stageChapters = QSHARP_QUANTUM_GATES_CHAPTERS.filter((ch) =>
              stage.chapters.includes(ch.id),
            );
            const stageLessons = stageChapters.flatMap((ch) => ch.lessons);
            const stageDone = stageLessons.filter((l) => progress[l.id]).length;
            const stagePct =
              stageLessons.length > 0
                ? Math.round((stageDone / stageLessons.length) * 100)
                : 0;

            return (
              <article
                key={stage.level}
                className="matplotlib-path-card"
                style={{ "--stage-color": stage.color }}
              >
                <header className="matplotlib-path-card-head">
                  <span className="matplotlib-path-level">{stage.level}</span>
                  <span className="matplotlib-path-pct">{stagePct}%</span>
                </header>
                <p className="matplotlib-path-summary">{stage.summary}</p>
                <ul className="matplotlib-path-chapters">
                  {stageChapters.map((ch) => (
                    <li key={ch.id}>
                      <span className="oops-chapter-icon-wrap" aria-hidden>
                        <LearnChapterIcon icon={ch.icon} size={14} />
                      </span>
                      {ch.title}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="matplotlib-path-cta"
                  onClick={() => {
                    const firstOpen =
                      stageLessons.find((l) => !progress[l.id]) ||
                      stageLessons[0];
                    if (firstOpen) {
                      navigate(`${BASE_PATH}/lesson/${firstOpen.id}`);
                    }
                  }}
                >
                  {stageDone === stageLessons.length && stageLessons.length > 0
                    ? "Review stage →"
                    : stageDone > 0
                      ? "Continue stage →"
                      : "Start stage →"}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <LearnChapterPathOverview
        chapters={QSHARP_QUANTUM_GATES_CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) =>
          navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)
        }
      />

      <LearnChapterGrid
        chapters={QSHARP_QUANTUM_GATES_CHAPTERS}
        progress={progress}
        basePath={BASE_PATH}
        navigate={navigate}
      />

      {pct >= 100 && (
        <CourseCertificate
          courseName="Quantum Gates"
          totalLessons={QSHARP_QUANTUM_GATES_LESSONS.length}
          completedCount={completedCount}
          earnedXP={earnedXP}
          totalXP={QSHARP_QUANTUM_GATES_TOTAL_XP}
        />
      )}
    </div>
  );
}
