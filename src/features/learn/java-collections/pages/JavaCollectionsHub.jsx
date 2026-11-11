import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  JAVA_COLLECTIONS_CHAPTERS,
  JAVA_COLLECTIONS_LESSONS,
  JAVA_COLLECTIONS_TOTAL_XP,
} from "../data/javaCollectionsCurriculum";
import useJavaCollectionsProgress from "../hooks/useJavaCollectionsProgress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import CourseCertificate from "../../shared/CourseCertificate";

const BASE_PATH = "/learn/java-collections";

const LEARNING_PATH = [
  {
    level: "Beginner",
    chapters: ["lists"],
    color: "#06b6d4",
    summary: "ArrayList, LinkedList, iteration, and array conversion.",
  },
  {
    level: "Intermediate",
    chapters: ["sets-maps"],
    color: "#3b82f6",
    summary: "HashSet, HashMap, TreeMap/TreeSet, and LinkedHashMap ordering.",
  },
  {
    level: "Advanced",
    chapters: ["sorting"],
    color: "#ef4444",
    summary: "Comparable, Comparator, Collections utilities, and multi-level sorting.",
  },
  {
    level: "Pro",
    chapters: ["streams-collections"],
    color: "#8b5cf6",
    summary: "Streams: filter, map, collectors, grouping, and reduce.",
  },
];

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((b) => b.type === "text" || b.type === "callout")
    .map((b) => (b.content || "").replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function JavaCollectionsHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const {
    isAuthenticated,
    completedMap: progress,
    bookmarks,
    lastLessonId,
  } = useJavaCollectionsProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = JAVA_COLLECTIONS_LESSONS.filter(
    (l) => progress[l.id],
  ).reduce((sum, l) => sum + l.xp, 0);
  const pct =
    Math.round((completedCount / JAVA_COLLECTIONS_LESSONS.length) * 100) || 0;

  const nextLesson =
    JAVA_COLLECTIONS_LESSONS.find((l) => !progress[l.id]) ||
    JAVA_COLLECTIONS_LESSONS[0];
  const resumeLesson =
    JAVA_COLLECTIONS_LESSONS.find((l) => l.id === lastLessonId) || nextLesson;
  const completedChapters = JAVA_COLLECTIONS_CHAPTERS.filter((ch) =>
    ch.lessons.every((l) => progress[l.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => JAVA_COLLECTIONS_LESSONS.find((l) => l.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return JAVA_COLLECTIONS_LESSONS.filter((lesson) => {
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
    <div className="oops-hub js-fundamentals-hub">
      {/* ── Hero ── */}
      <div className="oops-hero js-fundamentals-hero">
        <Link
          to="/language/Java"
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← Java courses
        </Link>
        <div className="oops-hero-badge">JAVA · COLLECTIONS TRACK</div>
        <h1 className="oops-hero-title">
          Java
          <br />
          <span className="oops-hero-accent" style={{ color: "#06b6d4" }}>
            Collections
          </span>
        </h1>
        <p className="oops-hero-sub">
          Master Lists, Sets, Maps, sorting, and the Stream API with theory,
          quizzes, and real coding challenges compiled by <code>javac</code>.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${JAVA_COLLECTIONS_LESSONS.length} lessons · ${earnedXP}/${JAVA_COLLECTIONS_TOTAL_XP} XP`
                  : `Sign in to track progress · ${JAVA_COLLECTIONS_LESSONS.length} lessons`}
              </span>
              <span>{isAuthenticated ? `${pct}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div
                className="oops-xp-fill"
                style={{
                  width: isAuthenticated ? `${pct}%` : "0%",
                  background: "#06b6d4",
                }}
              />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="oops-auth-gate oops-auth-gate-hub">
              <p>
                Create a free account to compile and run Java, earn XP, and
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
              onClick={() =>
                navigate(`${BASE_PATH}/lesson/${resumeLesson.id}`)
              }
            >
              {completedCount > 0 ? "Resume Java" : "Start Java"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Search / Recommended / Bookmarks ── */}
      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a Java topic</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lists, maps, streams..."
              aria-label="Search Java lessons"
            />
            <div className="oops-filter-tabs" aria-label="Filter Java lessons">
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
                style={{ "--ch-color": lesson.chapterColor }}
                onClick={() =>
                  navigate(`${BASE_PATH}/lesson/${lesson.id}`)
                }
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
            onClick={() =>
              navigate(`${BASE_PATH}/lesson/${nextLesson.id}`)
            }
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
                  onClick={() =>
                    navigate(`${BASE_PATH}/lesson/${lesson.id}`)
                  }
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

      {/* ── Stats strip ── */}
      <div className="oops-dashboard-strip">
        <div className="oops-stat-tile">
          <span>Lessons</span>
          <strong>
            {completedCount}/{JAVA_COLLECTIONS_LESSONS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>
            {completedChapters}/{JAVA_COLLECTIONS_CHAPTERS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>
            {earnedXP}/{JAVA_COLLECTIONS_TOTAL_XP}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      {/* ── Path overview ── */}
      <div className="oops-path-overview">
        {JAVA_COLLECTIONS_CHAPTERS.map((chapter, index) => {
          const done = chapter.lessons.filter((l) => progress[l.id]).length;
          const active = done > 0 && done < chapter.lessons.length;
          return (
            <button
              key={chapter.id}
              type="button"
              className={`oops-path-step ${active ? "active" : ""} ${
                done === chapter.lessons.length ? "done" : ""
              }`}
              style={{ "--ch-color": chapter.color }}
              onClick={() =>
                navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)
              }
            >
              <span>{index + 1}</span>
              <strong>{chapter.title}</strong>
              <small>
                {done}/{chapter.lessons.length}
              </small>
            </button>
          );
        })}
      </div>

      {/* ── Beginner → Pro path ── */}
      <section className="matplotlib-learn-path" aria-label="Learning path">
        <div className="matplotlib-path-label">
          <span>Your path · Beginner to Pro</span>
          <small>
            {JAVA_COLLECTIONS_CHAPTERS.length} chapters ·{" "}
            {JAVA_COLLECTIONS_LESSONS.length} lessons
          </small>
        </div>
        <div className="matplotlib-path-grid">
          {LEARNING_PATH.map((stage) => {
            const stageChapters = JAVA_COLLECTIONS_CHAPTERS.filter((ch) =>
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
                      <span aria-hidden>{ch.icon}</span>
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
                    if (firstOpen) navigate(`${BASE_PATH}/lesson/${firstOpen.id}`);
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
        chapters={JAVA_COLLECTIONS_CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) =>
          navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)
        }
      />

      <LearnChapterGrid
        chapters={JAVA_COLLECTIONS_CHAPTERS}
        progress={progress}
        basePath={BASE_PATH}
        navigate={navigate}
      />

      <CourseCertificate
        courseName="Java Collections"
        totalLessons={JAVA_COLLECTIONS_LESSONS.length}
        completedCount={completedCount}
        earnedXP={earnedXP}
        totalXP={JAVA_COLLECTIONS_TOTAL_XP}
      />

      {/* ── Next Course Banner ── */}
      {completedCount === JAVA_COLLECTIONS_LESSONS.length && (
        <div className="oops-next-course-banner">
          <div className="oops-next-course-content">
            <span className="oops-next-course-emoji">🚀</span>
            <div>
              <h3>Java Collections Complete!</h3>
              <p>Great work. Take on exception handling next.</p>
            </div>
          </div>
          <button
            type="button"
            className="oops-next-course-btn"
            onClick={() => navigate("/learn/java-exception-handling")}
          >
            Start Java Exception Handling →
          </button>
        </div>
      )}
    </div>
  );
}
