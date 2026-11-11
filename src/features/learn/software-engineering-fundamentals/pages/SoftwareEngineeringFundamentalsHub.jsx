import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS,
  SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS,
  SOFTWARE_ENGINEERING_FUNDAMENTALS_TOTAL_XP,
} from "../data/softwareEngineeringFundamentalsCurriculum";
import useSoftwareEngineeringFundamentalsProgress from "../hooks/useSoftwareEngineeringFundamentalsProgress";
import CourseCertificate from "../../shared/CourseCertificate";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import LearnChapterIcon from "../../shared/LearnChapterIcon";

const BASE_PATH = "/learn/software-engineering-fundamentals";

const LEARNING_PATH = [
  {
    level: "Overview",
    chapters: ["se-overview"],
    color: "#f59e0b",
    summary:
      "Why software engineering exists, how projects succeed or fail, the SDLC, and how to think about solving software problems.",
  },
];

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => block.content.replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function SoftwareEngineeringFundamentalsHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const {
    isAuthenticated,
    completedMap: progress,
    bookmarks,
    lastLessonId,
  } = useSoftwareEngineeringFundamentalsProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.filter(
    (lesson) => progress[lesson.id],
  ).reduce((sum, lesson) => sum + lesson.xp, 0);
  const pct =
    Math.round(
      (completedCount / SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.length) * 100,
    ) || 0;
  const nextLesson =
    SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.find((lesson) => !progress[lesson.id]) ||
    SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS[0];
  const resumeLesson =
    SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.find((lesson) => lesson.id === lastLessonId) ||
    nextLesson;
  const completedChapters = SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS.filter((chapter) =>
    chapter.lessons.every((lesson) => progress[lesson.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.filter((lesson) => {
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
  }, [bookmarks, filter, progress, search]);

  return (
    <div className="oops-hub matplotlib-hub">
      <div className="oops-hero matplotlib-hero">
        <Link
          to="/language/Software%20Engineering"
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← Software Engineering courses
        </Link>
        <div className="oops-hero-badge">SOFTWARE ENGINEERING · THEORY COURSE</div>
        <h1 className="oops-hero-title">
          Introduction to
          <br />
          <span className="oops-hero-accent">Software Engineering</span>
        </h1>
        <p className="oops-hero-sub">
          Why software engineering exists, how projects succeed or fail, the
          software development life cycle, what shapes a project's
          structure, and how engineers solve problems by combining smaller
          solutions into one system — 1 chapter, 6 lessons, no coding
          required.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.length} lessons · ${earnedXP}/${SOFTWARE_ENGINEERING_FUNDAMENTALS_TOTAL_XP} XP`
                  : `Sign in to track progress · ${SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.length} lessons`}
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

          {!isAuthenticated && (
            <div className="oops-auth-gate oops-auth-gate-hub">
              <p>
                Create a free account to earn XP and save your place in the
                course.
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
              {completedCount > 0 ? "Resume Software Engineering" : "Start Software Engineering"}
            </button>
          </div>
        </div>
      </div>

      <section className="matplotlib-prerequisites" aria-label="What comes next">
        <div className="matplotlib-prerequisites-head">
          <span>Section 1 of Introduction to Software Engineering</span>
          <small>More on PolyCode</small>
        </div>
        <div className="matplotlib-prerequisites-grid">
          <Link
            to={`${BASE_PATH}/lesson/se-0`}
            className="matplotlib-prereq-card"
          >
            <strong>Why It Matters</strong>
            <p>The $600B software industry and what every project needs.</p>
          </Link>
          <Link
            to={`${BASE_PATH}/lesson/se-1`}
            className="matplotlib-prereq-card"
          >
            <strong>Success & Failure</strong>
            <p>The Standish Group CHAOS Report, in plain terms.</p>
          </Link>
          <Link
            to={`${BASE_PATH}/lesson/se-2`}
            className="matplotlib-prereq-card"
          >
            <strong>The SDLC</strong>
            <p>The 7 phases every methodology is built from.</p>
          </Link>
          <Link
            to={`${BASE_PATH}/lesson/se-5`}
            className="matplotlib-prereq-card matplotlib-prereq-cheat"
          >
            <strong>Problem Solving</strong>
            <p>How unequal partial solutions combine into one system.</p>
          </Link>
        </div>
        <p className="matplotlib-runtime-note">
          This is a theory-only course — read each lesson and check your
          understanding with the built-in quizzes. No code runs here.
        </p>
      </section>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a topic</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search SDLC, CHAOS report, project factors..."
              aria-label="Search Software Engineering lessons"
            />
            <div
              className="oops-filter-tabs"
              aria-label="Filter Software Engineering lessons"
            >
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
            {completedCount}/{SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>
            {completedChapters}/{SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>
            {earnedXP}/{SOFTWARE_ENGINEERING_FUNDAMENTALS_TOTAL_XP}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      <section className="matplotlib-learn-path" aria-label="Learning path">
        <div className="matplotlib-path-label">
          <span>Your path · Section 1: Overview</span>
          <small>
            {SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS.length} chapter ·{" "}
            {SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.length} lessons
          </small>
        </div>
        <div className="matplotlib-path-grid">
          {LEARNING_PATH.map((stage) => {
            const stageChapters = SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS.filter((ch) =>
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
        chapters={SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) =>
          navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)
        }
      />

      <LearnChapterGrid
        chapters={SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS}
        progress={progress}
        basePath={BASE_PATH}
        navigate={navigate}
      />
      <CourseCertificate
        courseName="Introduction to Software Engineering"
        totalLessons={SOFTWARE_ENGINEERING_FUNDAMENTALS_LESSONS.length}
        completedCount={completedCount}
        earnedXP={earnedXP}
        totalXP={SOFTWARE_ENGINEERING_FUNDAMENTALS_TOTAL_XP}
      />
    </div>
  );
}
