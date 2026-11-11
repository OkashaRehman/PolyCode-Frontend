import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JS_APIS_CHAPTERS, JS_APIS_LESSONS, JS_APIS_TOTAL_XP } from "../data/jsApisCurriculum";
import useJsApisProgress from "../hooks/useJsApisProgress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import LearnChapterIcon from "../../shared/LearnChapterIcon";
import CourseCertificate from "../../shared/CourseCertificate";

const BASE_PATH = "/learn/js-apis";

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => block.content.replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function JsApisHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { isAuthenticated, completedMap: progress, bookmarks, lastLessonId } = useJsApisProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = JS_APIS_LESSONS.filter((lesson) => progress[lesson.id]).reduce((sum, lesson) => sum + lesson.xp, 0);
  const pct = Math.round((completedCount / JS_APIS_LESSONS.length) * 100) || 0;
  const nextLesson = JS_APIS_LESSONS.find((lesson) => !progress[lesson.id]) || JS_APIS_LESSONS[0];
  const resumeLesson = JS_APIS_LESSONS.find((lesson) => lesson.id === lastLessonId) || nextLesson;
  const completedChapters = JS_APIS_CHAPTERS.filter((chapter) => chapter.lessons.every((lesson) => progress[lesson.id])).length;
  const bookmarkedLessons = bookmarks.map((id) => JS_APIS_LESSONS.find((lesson) => lesson.id === id)).filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return JS_APIS_LESSONS.filter((lesson) => {
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
    <div className="oops-hub js-apis-hub">
      <div className="oops-hero js-apis-hero">
        <Link to="/language/JavaScript" className="oops-back-btn" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
          ← JavaScript courses
        </Link>
        <div className="oops-hero-badge">JAVASCRIPT · APIs</div>
        <h1 className="oops-hero-title">
          JS APIs
          <br />
          <span className="oops-hero-accent">Browser APIs — Beginner → Advanced</span>
        </h1>
        <p className="oops-hero-sub">
          Learn JavaScript browser APIs with hands-on examples: fetch, storage, URL helpers, navigator, history, performance, and reusable API patterns.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>{isAuthenticated ? `${completedCount}/${JS_APIS_LESSONS.length} lessons · ${earnedXP}/${JS_APIS_TOTAL_XP} XP` : `Sign in to track progress · ${JS_APIS_LESSONS.length} lessons`}</span>
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
            <button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${resumeLesson.id}`)}>{completedCount > 0 ? "Resume JS APIs" : "Start JS APIs"}</button>
          </div>
        </div>
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Search API topics</span>
          <div className="oops-search-row">
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search fetch, localStorage, navigator..." aria-label="Search JS API lessons" />
            <div className="oops-filter-tabs" aria-label="Filter JS API lessons">
              {[["all", "All"], ["todo", "To do"], ["done", "Done"], ["bookmarked", "Saved"]].map(([value, label]) => (
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
          <strong>{completedCount}/{JS_APIS_LESSONS.length}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>{completedChapters}/{JS_APIS_CHAPTERS.length}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>{earnedXP}/{JS_APIS_TOTAL_XP}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      <section className="matplotlib-learn-path" aria-label="Learning path">
        <div className="matplotlib-path-label">
          <span>Your path · Beginner to Pro</span>
          <small>{JS_APIS_CHAPTERS.length} chapters · {JS_APIS_LESSONS.length} lessons</small>
        </div>
        <div className="matplotlib-path-grid">
          {[
            { level: "Beginner", chapters: ["api-intro", "storage-url"], color: "#f59e0b", summary: "Start with browser APIs, storage, and URL helpers." },
            { level: "Intermediate", chapters: ["network-apis", "runtime-apis"], color: "#0ea5e9", summary: "Make network requests and inspect the browser runtime." },
            { level: "Advanced", chapters: ["navigation-apis"], color: "#14b8a6", summary: "Update browser history and work with location state." },
            { level: "Pro", chapters: ["advanced-api-patterns"], color: "#7c3aed", summary: "Write reusable API helpers and reusable request logic." },
          ].map((stage) => {
            const stageChapters = JS_APIS_CHAPTERS.filter((ch) => stage.chapters.includes(ch.id));
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
                <button type="button" className="matplotlib-path-cta" onClick={() => { if (firstOpen) navigate(`${BASE_PATH}/lesson/${firstOpen.id}`); }}>
                  {stageDone === stageLessons.length && stageLessons.length > 0 ? "Review Stage" : "Start Stage"}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <LearnChapterPathOverview chapters={JS_APIS_CHAPTERS} progress={progress} onChapterSelect={(chapter) => navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)} />

      <LearnChapterGrid chapters={JS_APIS_CHAPTERS} progress={progress} basePath={BASE_PATH} navigate={navigate} />

      <CourseCertificate courseName="JS APIs" totalLessons={JS_APIS_LESSONS.length} completedCount={completedCount} earnedXP={earnedXP} totalXP={JS_APIS_TOTAL_XP} />
    </div>
  );
}
