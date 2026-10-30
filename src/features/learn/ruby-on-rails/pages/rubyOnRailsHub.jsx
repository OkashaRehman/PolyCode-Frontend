import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RUBY_ON_RAILS_CHAPTERS,
  RUBY_ON_RAILS_LESSONS,
  RUBY_ON_RAILS_TOTAL_XP,
} from "../data/rubyOnRailsCurriculum";
import useRubyOnRailsProgress from "../hooks/useRubyOnRailsProgress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import LearnChapterIcon from "../../shared/LearnChapterIcon";
import CourseCertificate from "../../shared/CourseCertificate";

const BASE_PATH = "/learn/ruby-on-rails";

// Learning path definition mirroring every other course's hub (Ruby File Handling, etc.)
const LEARNING_PATH = [
  {
    level: "Beginner",
    chapters: RUBY_ON_RAILS_CHAPTERS.filter((ch) => ch.stage === "beginner").map((ch) => ch.id),
    color: "#16a34a",
    summary: "Get comfortable with Rails fundamentals: MVC, routing, and controllers.",
  },
  {
    level: "Intermediate",
    chapters: RUBY_ON_RAILS_CHAPTERS.filter((ch) => ch.stage === "intermediate").map((ch) => ch.id),
    color: "#0ea5e9",
    summary: "Work with Active Record models, associations, views, and forms.",
  },
  {
    level: "Pro",
    chapters: RUBY_ON_RAILS_CHAPTERS.filter((ch) => ch.stage === "pro").map((ch) => ch.id),
    color: "#7e22ce",
    summary: "Add authentication, authorization, and build JSON APIs.",
  },
  {
    level: "Advanced",
    chapters: RUBY_ON_RAILS_CHAPTERS.filter((ch) => ch.stage === "advanced").map((ch) => ch.id),
    color: "#dc2626",
    summary: "Deploy, cache, run background jobs, and apply service-object patterns.",
  },
];

function lessonPlainText(lesson) {
  return (lesson.theory || [])
    .filter((block) => block.content)
    .map((block) => String(block.content).replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function RubyOnRailsHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("beginner");
  const [filter, setFilter] = useState("all");
  const { isAuthenticated, progress, bookmarks, lastLessonId } = useRubyOnRailsProgress();

  const completedCount = Object.keys(progress || {}).length;
  const earnedXP = RUBY_ON_RAILS_LESSONS.filter((lesson) => progress?.[lesson.id]).reduce(
    (sum, lesson) => sum + lesson.xp,
    0,
  );
  const pct = Math.round((completedCount / RUBY_ON_RAILS_LESSONS.length) * 100) || 0;
  const nextLesson =
    RUBY_ON_RAILS_LESSONS.find((lesson) => !progress?.[lesson.id]) || RUBY_ON_RAILS_LESSONS[0];
  const resumeLesson =
    RUBY_ON_RAILS_LESSONS.find((lesson) => lesson.id === lastLessonId) || nextLesson;
  const chaptersForStage = RUBY_ON_RAILS_CHAPTERS.filter((c) => (c.stage || "beginner") === stage);
  const completedChapters = chaptersForStage.filter((chapter) =>
    chapter.lessons.every((lesson) => progress?.[lesson.id]),
  ).length;
  const bookmarkedLessons = (bookmarks || [])
    .map((id) => RUBY_ON_RAILS_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return RUBY_ON_RAILS_LESSONS.filter((lesson) => {
      const ch = RUBY_ON_RAILS_CHAPTERS.find((c) => c.lessons.some((l) => l.id === lesson.id));
      if (((ch && ch.stage) || "beginner") !== stage) return false;

      const matchesQuery =
        !query ||
        lesson.title.toLowerCase().includes(query) ||
        lessonPlainText(lesson).toLowerCase().includes(query);
      const matchesFilter =
        filter === "all" ||
        (filter === "todo" && !progress?.[lesson.id]) ||
        (filter === "done" && progress?.[lesson.id]) ||
        (filter === "bookmarked" && (bookmarks || []).includes(lesson.id));
      return matchesQuery && matchesFilter;
    });
  }, [bookmarks, filter, progress, search, stage]);

  return (
    <div className="oops-hub ruby-on-rails-hub">
      <div className="oops-hero ruby-on-rails-hero">
        <Link to="/language/Ruby" className="oops-back-btn" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
          ← Ruby courses
        </Link>
        <div className="oops-hero-badge">Ruby · RAILS TRACK</div>
        <h1 className="oops-hero-title">
          Ruby on
          <br />
          <span className="oops-hero-accent">Rails</span>
        </h1>
        <p className="oops-hero-sub">
          Build powerful web applications with Rails — from MVC fundamentals and Active
          Record through authentication, JSON APIs, caching, background jobs, and
          service-object patterns. Hands-on examples and runnable challenges.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${RUBY_ON_RAILS_LESSONS.length} lessons · ${earnedXP}/${RUBY_ON_RAILS_TOTAL_XP} XP`
                  : `Sign in to track progress · ${RUBY_ON_RAILS_LESSONS.length} lessons`}
              </span>
              <span>{isAuthenticated ? `${pct}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div className="oops-xp-fill" style={{ width: isAuthenticated ? `${pct}%` : "0%" }} />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="oops-auth-gate oops-auth-gate-hub">
              <p>
                Create a free account to run Ruby on Rails challenges, earn XP, and save
                your place in the course.
              </p>
              <div className="oops-auth-gate-actions">
                <Link to="/login" className="oops-auth-gate-btn">Sign in</Link>
                <Link to="/signup" className="oops-auth-gate-btn oops-auth-gate-btn-primary">Sign up</Link>
              </div>
            </div>
          )}

          <div className="oops-resume-panel">
            <span className="oops-sync-pill">
              {isAuthenticated ? "Progress saved to your account" : "Browse lessons — sign in to save progress"}
            </span>
            <h2>{resumeLesson.title}</h2>
            <p>
              {RUBY_ON_RAILS_CHAPTERS.find((c) => c.lessons.some((l) => l.id === resumeLesson.id))?.title || ""} ·{" "}
              {resumeLesson.xp} XP
            </p>
            <button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${resumeLesson.id}`)}>
              {completedCount > 0 ? "Resume Rails" : "Start Rails"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-stage-tabs" style={{ padding: "0 1.5rem", marginTop: "0.5rem" }}>
        {[["beginner", "Beginner"], ["intermediate", "Intermediate"], ["pro", "Pro"], ["advanced", "Advanced"]].map(
          ([id, label]) => (
            <button
              key={id}
              type="button"
              className={stage === id ? "active stage-tab" : "stage-tab"}
              onClick={() => setStage(id)}
              style={{ marginRight: 8 }}
            >
              {label}
            </button>
          ),
        )}
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a Rails topic</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search routing, Active Record, auth, APIs..."
              aria-label="Search Ruby on Rails lessons"
            />
            <div className="oops-filter-tabs" aria-label="Filter Ruby on Rails lessons">
              {[["all", "All"], ["todo", "To do"], ["done", "Done"], ["bookmarked", "Saved"]].map(([value, label]) => (
                <button key={value} type="button" className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="oops-search-results">
            {filteredLessons.slice(0, 6).map((lesson) => (
              <button key={lesson.id} type="button" className="oops-search-result" onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}>
                <span>{progress?.[lesson.id] ? "✓" : "○"}</span>
                <strong>{lesson.title}</strong>
                <small>{RUBY_ON_RAILS_CHAPTERS.find((c) => c.lessons.some((l) => l.id === lesson.id))?.title || ""}</small>
              </button>
            ))}
            {filteredLessons.length === 0 && <p className="oops-empty-copy">No lessons match that search.</p>}
          </div>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Recommended</span>
          <h2>{nextLesson.title}</h2>
          <p>
            Next in {RUBY_ON_RAILS_CHAPTERS.find((c) => c.lessons.some((l) => l.id === nextLesson.id))?.title || ""}.
            Earn {nextLesson.xp} XP.
          </p>
          <button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${nextLesson.id}`)}>Open next lesson</button>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Bookmarks</span>
          {bookmarkedLessons.length > 0 ? (
            <div className="oops-bookmark-list">
              {bookmarkedLessons.slice(0, 3).map((lesson) => (
                <button key={lesson.id} type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}>
                  <strong>{lesson.title}</strong>
                  <small>{RUBY_ON_RAILS_CHAPTERS.find((c) => c.lessons.some((l) => l.id === lesson.id))?.title || ""}</small>
                </button>
              ))}
            </div>
          ) : (
            <p>Bookmark lessons to review them here.</p>
          )}
        </div>
      </div>

      <div className="oops-dashboard-strip">
        <div className="oops-stat-tile"><span>Lessons</span><strong>{completedCount}/{RUBY_ON_RAILS_LESSONS.length}</strong></div>
        <div className="oops-stat-tile"><span>Chapters</span><strong>{completedChapters}/{RUBY_ON_RAILS_CHAPTERS.length}</strong></div>
        <div className="oops-stat-tile"><span>XP</span><strong>{earnedXP}/{RUBY_ON_RAILS_TOTAL_XP}</strong></div>
        <div className="oops-stat-tile"><span>Bookmarks</span><strong>{(bookmarks || []).length}</strong></div>
      </div>

      <section className="matplotlib-learn-path" aria-label="Learning path">
        <div className="matplotlib-path-label">
          <span>Your path · Beginner to Advanced</span>
          <small>
            {RUBY_ON_RAILS_CHAPTERS.length} chapters · {RUBY_ON_RAILS_LESSONS.length} lessons
          </small>
        </div>
        <div className="matplotlib-path-grid">
          {LEARNING_PATH.map((stageDef) => {
            const stageChapters = RUBY_ON_RAILS_CHAPTERS.filter((ch) => stageDef.chapters.includes(ch.id));
            const stageLessons = stageChapters.flatMap((ch) => ch.lessons);
            const stageDone = stageLessons.filter((l) => progress?.[l.id]).length;
            const stagePct = stageLessons.length > 0 ? Math.round((stageDone / stageLessons.length) * 100) : 0;

            return (
              <article key={stageDef.level} className="matplotlib-path-card" style={{ "--stage-color": stageDef.color }}>
                <header className="matplotlib-path-card-head">
                  <span className="matplotlib-path-level">{stageDef.level}</span>
                  <span className="matplotlib-path-pct">{stagePct}%</span>
                </header>
                <p className="matplotlib-path-summary">{stageDef.summary}</p>
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
                    const firstOpen = stageLessons.find((l) => !progress?.[l.id]) || stageLessons[0];
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
        chapters={RUBY_ON_RAILS_CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) => navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)}
      />

      <LearnChapterGrid
        chapters={RUBY_ON_RAILS_CHAPTERS}
        progress={progress}
        basePath={BASE_PATH}
        navigate={navigate}
      />

      {completedCount === RUBY_ON_RAILS_LESSONS.length && RUBY_ON_RAILS_LESSONS.length > 0 && (
        <CourseCertificate
          courseName="Ruby on Rails"
          totalLessons={RUBY_ON_RAILS_LESSONS.length}
          completedCount={completedCount}
          earnedXP={earnedXP}
          totalXP={RUBY_ON_RAILS_TOTAL_XP}
        />
      )}
    </div>
  );
}