import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import LearnChapterIcon from "../../shared/LearnChapterIcon";
import CourseCertificate from "../../shared/CourseCertificate";
import {
  GO_MODULES_CHAPTERS,
  GO_MODULES_LESSONS,
  GO_MODULES_TOTAL_XP,
} from "../data/GoModulesCurriculum";
import useGoModulesProgress from "../hooks/useGoModulesProgress";

const BASE_PATH = "/learn/go-modules";
const LEARNING_PATH = [
  {
    level: "Beginner",
    chapters: GO_MODULES_CHAPTERS.filter((ch) => ch.stage === "beginner").map((ch) => ch.id),
    color: "#22c55e",
    summary: "Start with module roots, dependency resolution, and project setup.",
  },
  {
    level: "Intermediate",
    chapters: GO_MODULES_CHAPTERS.filter((ch) => ch.stage === "intermediate").map((ch) => ch.id),
    color: "#3b82f6",
    summary: "Understand version constraints, replacements, and dependency hygiene.",
  },
  {
    level: "Pro",
    chapters: GO_MODULES_CHAPTERS.filter((ch) => ch.stage === "pro").map((ch) => ch.id),
    color: "#f59e0b",
    summary: "Work with workspaces, internal modules, and release discipline.",
  },
  {
    level: "Advanced",
    chapters: GO_MODULES_CHAPTERS.filter((ch) => ch.stage === "advanced").map((ch) => ch.id),
    color: "#8b5cf6",
    summary: "Ship maintainable module layouts, upgrades, and production-ready practices.",
  },
];

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => (block.content || "").replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function GoModulesHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("beginner");
  const [filter, setFilter] = useState("all");
  const { isAuthenticated, completedMap: progress, bookmarks, lastLessonId } =
    useGoModulesProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = GO_MODULES_LESSONS.filter((lesson) => progress[lesson.id]).reduce(
    (sum, lesson) => sum + lesson.xp,
    0,
  );
  const pct = Math.round((completedCount / GO_MODULES_LESSONS.length) * 100) || 0;
  const nextLesson =
    GO_MODULES_LESSONS.find((lesson) => !progress[lesson.id]) || GO_MODULES_LESSONS[0];
  const resumeLesson =
    GO_MODULES_LESSONS.find((lesson) => lesson.id === lastLessonId) || nextLesson;
  const chaptersForStage = GO_MODULES_CHAPTERS.filter(
    (chapter) => (chapter.stage || "beginner") === stage,
  );
  const completedChapters = chaptersForStage.filter((chapter) =>
    chapter.lessons.every((lesson) => progress[lesson.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => GO_MODULES_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return GO_MODULES_LESSONS.filter((lesson) => {
      const chapter = GO_MODULES_CHAPTERS.find((item) => item.id === lesson.chapterId);
      if (((chapter && chapter.stage) || "beginner") !== stage) return false;

      const matchesQuery =
        !query ||
        lesson.title.toLowerCase().includes(query) ||
        lesson.chapterTitle.toLowerCase().includes(query) ||
        lessonPlainText(lesson).toLowerCase().includes(query);
      const matchesFilter =
        filter === "all" ||
        (filter === "todo" && !progress[lesson.id]) ||
        (filter === "done" && progress[lesson.id]) ||
        (filter === "bookmarked" && bookmarks.includes(lesson.id));
      return matchesQuery && matchesFilter;
    });
  }, [bookmarks, filter, progress, search, stage]);

  return (
    <div className="oops-hub go-hub">
      <div className="oops-hero go-hero" style={{ borderColor: "#00add8" }}>
        <Link
          to="/language/Go"
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← Go courses
        </Link>
        <div className="oops-hero-badge">Go · Modules Track</div>
        <h1 className="oops-hero-title">
          Go
          <br />
          <span className="oops-hero-accent">Modules</span>
        </h1>
        <p className="oops-hero-sub">
          Learn how Go modules manage versions, dependencies, replacements,
          workspaces, and real-world project structure with working examples.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${GO_MODULES_LESSONS.length} lessons · ${earnedXP}/${GO_MODULES_TOTAL_XP} XP`
                  : `Sign in to track progress · ${GO_MODULES_LESSONS.length} lessons`}
              </span>
              <span>{isAuthenticated ? `${pct}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div
                className="oops-xp-fill"
                style={{
                  width: isAuthenticated ? `${pct}%` : "0%",
                  backgroundColor: "#00add8",
                }}
              />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="oops-auth-gate oops-auth-gate-hub">
              <p>
                Create a free account to run Go module challenges, earn XP, and
                save your place in the course.
              </p>
              <div className="oops-auth-gate-actions">
                <Link to="/login" className="oops-auth-gate-btn">
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="oops-auth-gate-btn oops-auth-gate-btn-primary"
                >
                  Sign up
                </Link>
              </div>
            </div>
          )}

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
              {completedCount > 0 ? "Resume Go Modules" : "Start Go Modules"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-stage-tabs" style={{ padding: "0 1.5rem", marginTop: "0.5rem" }}>
        {[
          ["beginner", "Beginner"],
          ["intermediate", "Intermediate"],
          ["pro", "Pro"],
          ["advanced", "Advanced"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={stage === id ? "active stage-tab" : "stage-tab"}
            onClick={() => setStage(id)}
            style={{ marginRight: 8 }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a Go topic</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search modules, versions, workspaces..."
              aria-label="Search Go Modules lessons"
            />
            <div className="oops-filter-tabs" aria-label="Filter Go lessons">
              {[
                ["all", "All"],
                ["todo", "To do"],
                ["done", "Done"],
                ["bookmarked", "Saved"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={filter === value ? "active" : ""}
                  onClick={() => setFilter(value)}
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

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Bookmarks</span>
          {bookmarkedLessons.length > 0 ? (
            <div className="oops-bookmark-list">
              {bookmarkedLessons.slice(0, 3).map((lesson) => (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}
                >
                  <strong>{lesson.title}</strong>
                  <small>{lesson.chapterTitle}</small>
                </button>
              ))}
            </div>
          ) : (
            <p>Bookmark lessons to review them here.</p>
          )}
        </div>
      </div>

      <div className="oops-dashboard-strip">
        <div className="oops-stat-tile">
          <span>Lessons</span>
          <strong>
            {completedCount}/{GO_MODULES_LESSONS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>
            {completedChapters}/{GO_MODULES_CHAPTERS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>
            {earnedXP}/{GO_MODULES_TOTAL_XP}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      <section className="matplotlib-learn-path" aria-label="Learning path">
        <div className="matplotlib-path-label">
          <span>Your path · Beginner to Advanced</span>
          <small>
            {GO_MODULES_CHAPTERS.length} chapters · {GO_MODULES_LESSONS.length} lessons
          </small>
        </div>
        <div className="matplotlib-path-grid">
          {LEARNING_PATH.map((stageDef) => {
            const stageChapters = GO_MODULES_CHAPTERS.filter((chapter) =>
              stageDef.chapters.includes(chapter.id),
            );
            const stageLessons = stageChapters.flatMap((chapter) => chapter.lessons);
            const stageDone = stageLessons.filter((lesson) => progress[lesson.id]).length;
            const stagePct =
              stageLessons.length > 0
                ? Math.round((stageDone / stageLessons.length) * 100)
                : 0;
            return (
              <article
                key={stageDef.level}
                className="matplotlib-path-card"
                style={{ "--stage-color": stageDef.color }}
              >
                <header className="matplotlib-path-card-head">
                  <span className="matplotlib-path-level">{stageDef.level}</span>
                  <span className="matplotlib-path-pct">{stagePct}%</span>
                </header>
                <p className="matplotlib-path-summary">{stageDef.summary}</p>
                <ul className="matplotlib-path-chapters">
                  {stageChapters.map((chapter) => (
                    <li key={chapter.id}>
                      <span className="oops-chapter-icon-wrap" aria-hidden>
                        <LearnChapterIcon icon={chapter.icon} size={14} />
                      </span>
                      {chapter.title}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="matplotlib-path-cta"
                  onClick={() => {
                    const firstOpen =
                      stageLessons.find((lesson) => !progress[lesson.id]) || stageLessons[0];
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
        chapters={GO_MODULES_CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) =>
          navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)
        }
      />

      <LearnChapterGrid
        chapters={GO_MODULES_CHAPTERS}
        progress={progress}
        basePath={BASE_PATH}
        navigate={navigate}
      />
      <CourseCertificate
        courseName="Go Modules"
        totalLessons={GO_MODULES_LESSONS.length}
        completedCount={completedCount}
        earnedXP={earnedXP}
        totalXP={GO_MODULES_TOTAL_XP}
      />
    </div>
  );
}
