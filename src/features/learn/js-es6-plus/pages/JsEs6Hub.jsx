import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JS_ES6_CHAPTERS, JS_ES6_LESSONS, JS_ES6_TOTAL_XP } from "../data/jsEs6Curriculum";
import useJsEs6Progress from "../hooks/useJsEs6Progress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import LearnChapterIcon from "../../shared/LearnChapterIcon";
import CourseCertificate from "../../shared/CourseCertificate";

const BASE_PATH = "/learn/js-es6-plus";

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => block.content.replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function JsEs6Hub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { isAuthenticated, completedMap: progress, bookmarks, lastLessonId } = useJsEs6Progress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = JS_ES6_LESSONS.filter((lesson) => progress[lesson.id]).reduce((sum, lesson) => sum + lesson.xp, 0);
  const pct = Math.round((completedCount / JS_ES6_LESSONS.length) * 100) || 0;
  const nextLesson = JS_ES6_LESSONS.find((lesson) => !progress[lesson.id]) || JS_ES6_LESSONS[0];
  const resumeLesson = JS_ES6_LESSONS.find((lesson) => lesson.id === lastLessonId) || nextLesson;
  const completedChapters = JS_ES6_CHAPTERS.filter((chapter) => chapter.lessons.every((lesson) => progress[lesson.id])).length;
  const bookmarkedLessons = bookmarks.map((id) => JS_ES6_LESSONS.find((lesson) => lesson.id === id)).filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return JS_ES6_LESSONS.filter((lesson) => {
      const matchesQuery = !query || lesson.title.toLowerCase().includes(query) || lesson.chapterTitle.toLowerCase().includes(query) || lessonPlainText(lesson).toLowerCase().includes(query);
      const matchesFilter = filter === "all" || (filter === "todo" && !progress[lesson.id]) || (filter === "done" && progress[lesson.id]) || (filter === "bookmarked" && bookmarks.includes(lesson.id));
      return matchesQuery && matchesFilter;
    });
  }, [bookmarks, filter, progress, search]);

  return (
    <div className="oops-hub js-es6-hub">
      <div className="oops-hero js-es6-hero">
        <Link to="/language/JavaScript" className="oops-back-btn" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
          ← JavaScript courses
        </Link>
        <div className="oops-hero-badge">JAVASCRIPT · ES6+</div>
        <h1 className="oops-hero-title">
          JS ES6+
          <br />
          <span className="oops-hero-accent">Modern JavaScript — Beginner → Advanced</span>
        </h1>
        <p className="oops-hero-sub">A focused ES6+ path: modern syntax, modules, async, classes, collections, and practical challenges.</p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>{isAuthenticated ? `${completedCount}/${JS_ES6_LESSONS.length} lessons · ${earnedXP}/${JS_ES6_TOTAL_XP} XP` : `Sign in to track progress · ${JS_ES6_LESSONS.length} lessons`}</span>
              <span>{isAuthenticated ? `${pct}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div className="oops-xp-fill" style={{ width: isAuthenticated ? `${pct}%` : "0%" }} />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="oops-auth-gate oops-auth-gate-hub">
              <p>Create a free account to run challenges, earn XP, and save your place.</p>
              <div className="oops-auth-gate-actions">
                <Link to="/login" className="oops-auth-gate-btn">Sign in</Link>
                <Link to="/signup" className="oops-auth-gate-btn oops-auth-gate-btn-primary">Sign up</Link>
              </div>
            </div>
          )}

          <div className="oops-resume-panel">
            <span className="oops-sync-pill">{isAuthenticated ? "Progress saved to your account" : "Browse lessons — sign in to save progress"}</span>
            <h2>{resumeLesson.title}</h2>
            <p>{resumeLesson.chapterTitle} · {resumeLesson.xp} XP</p>
            <button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${resumeLesson.id}`)}>{completedCount > 0 ? "Resume ES6+" : "Start ES6+"}</button>
          </div>
        </div>
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find an ES6+ topic</span>
          <div className="oops-search-row">
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search destructuring, async, classes..." aria-label="Search ES6 lessons" />
            <div className="oops-filter-tabs" aria-label="Filter ES6 lessons">
              {[ ["all", "All"], ["todo", "To do"], ["done", "Done"], ["bookmarked", "Saved"] ].map(([value, label]) => (
                <button key={value} type="button" className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>
              ))}
            </div>
          </div>
          <div className="oops-search-results">
            {filteredLessons.slice(0, 6).map((lesson) => (
              <button key={lesson.id} type="button" className="oops-search-result" onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}>
                <span>{progress[lesson.id] ? "✓" : "○"}</span>
                <strong>{lesson.title}</strong>
                <small>{lesson.chapterTitle}</small>
              </button>
            ))}
            {filteredLessons.length === 0 && <p className="oops-empty-copy">No lessons match that search.</p>}
          </div>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Recommended</span>
          <h2>{nextLesson.title}</h2>
          <p>Next in {nextLesson.chapterTitle}. Earn {nextLesson.xp} XP.</p>
          <button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${nextLesson.id}`)}>Open next lesson</button>
        </div>

        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Bookmarks</span>
          {bookmarkedLessons.length > 0 ? (
            <div className="oops-bookmark-list">
              {bookmarkedLessons.slice(0, 3).map((lesson) => (
                <button key={lesson.id} type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}>
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
          <strong>{completedCount}/{JS_ES6_LESSONS.length}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>{completedChapters}/{JS_ES6_CHAPTERS.length}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>{earnedXP}/{JS_ES6_TOTAL_XP}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

          <section className="matplotlib-learn-path" aria-label="Learning path">
            <div className="matplotlib-path-label">
              <span>Your path · Beginner to Pro</span>
              <small>
                {JS_ES6_CHAPTERS.length} chapters · {JS_ES6_LESSONS.length} lessons
              </small>
            </div>
            <div className="matplotlib-path-grid">
              {[
                { level: "Beginner", chapters: ["intro-es6"], color: "#f59e0b", summary: "Start with modern declarations, template literals, and arrows." },
                { level: "Intermediate", chapters: ["destructuring", "modules"], color: "#0ea5e9", summary: "Destructuring, spread, and module basics." },
                { level: "Advanced", chapters: ["async", "oop"], color: "#14b8a6", summary: "Async/await, fetch, and classes." },
                { level: "Pro", chapters: ["advanced"], color: "#7c3aed", summary: "Collections, iterators, and advanced patterns." },
              ].map((stage) => {
                const stageChapters = JS_ES6_CHAPTERS.filter((ch) => stage.chapters.includes(ch.id));
                const stageLessons = stageChapters.flatMap((ch) => ch.lessons);
                const stageDone = stageLessons.filter((l) => progress[l.id]).length;
                const stagePct = stageLessons.length > 0 ? Math.round((stageDone / stageLessons.length) * 100) : 0;
                const firstOpen = stageLessons.find((l) => !progress[l.id]) || stageLessons[0];

                return (
                  <article key={stage.level} className="matplotlib-path-card" style={{ "--stage-color": stage.color }}>
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
                        if (firstOpen) navigate(`${BASE_PATH}/lesson/${firstOpen.id}`);
                      }}
                    >
                      {stageDone === stageLessons.length && stageLessons.length > 0 ? "Review Stage" : "Start Stage"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          <LearnChapterPathOverview chapters={JS_ES6_CHAPTERS} progress={progress} onChapterSelect={(chapter) => navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)} />

          <LearnChapterGrid chapters={JS_ES6_CHAPTERS} progress={progress} basePath={BASE_PATH} navigate={navigate} />

          <CourseCertificate courseName="JS ES6+" totalLessons={JS_ES6_LESSONS.length} completedCount={completedCount} earnedXP={earnedXP} totalXP={JS_ES6_TOTAL_XP} />
    </div>
  );
}
