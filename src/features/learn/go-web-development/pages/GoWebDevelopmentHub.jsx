import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import CourseCertificate from "../../shared/CourseCertificate";
import {
  GO_WEB_DEVELOPMENT_CHAPTERS,
  GO_WEB_DEVELOPMENT_LESSONS,
  GO_WEB_DEVELOPMENT_TOTAL_XP,
} from "../data/GoWebDevelopmentCurriculum";
import useGoWebDevelopmentProgress from "../hooks/useGoWebDevelopmentProgress";

const BASE_PATH = "/learn/go-web-development";
const STAGES = [
  ["beginner", "Beginner", "Start with HTTP handlers, requests, and responses.", "#22c55e"],
  ["intermediate", "Intermediate", "Build routed JSON APIs with clear contracts.", "#3b82f6"],
  ["pro", "Pro", "Add middleware, security, and persistence boundaries.", "#f59e0b"],
  ["advanced", "Advanced", "Prepare services for testing, shutdown, and operations.", "#8b5cf6"],
];

function searchableText(lesson) {
  return lesson.theory.map((block) => block.content || "").join(" ");
}

export default function GoWebDevelopmentHub() {
  const navigate = useNavigate();
  const [stage, setStage] = useState("beginner");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { user, isAuthenticated, completedMap: progress, bookmarks, lastLessonId } =
    useGoWebDevelopmentProgress();
  const completedCount = Object.keys(progress).length;
  const earnedXP = GO_WEB_DEVELOPMENT_LESSONS.filter((item) => progress[item.id]).reduce(
    (sum, item) => sum + item.xp,
    0,
  );
  const percent = Math.round((completedCount / GO_WEB_DEVELOPMENT_LESSONS.length) * 100) || 0;
  const nextLesson = GO_WEB_DEVELOPMENT_LESSONS.find((item) => !progress[item.id]) || GO_WEB_DEVELOPMENT_LESSONS[0];
  const resumeLesson = GO_WEB_DEVELOPMENT_LESSONS.find((item) => item.id === lastLessonId) || nextLesson;
  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return GO_WEB_DEVELOPMENT_LESSONS.filter((item) => {
      const chapter = GO_WEB_DEVELOPMENT_CHAPTERS.find((entry) => entry.id === item.chapterId);
      if (chapter?.stage !== stage) return false;
      const matchesSearch = !query || `${item.title} ${item.chapterTitle} ${searchableText(item)}`.toLowerCase().includes(query);
      const matchesFilter = filter === "all" || (filter === "todo" && !progress[item.id]) || (filter === "done" && progress[item.id]) || (filter === "bookmarked" && bookmarks.includes(item.id));
      return matchesSearch && matchesFilter;
    });
  }, [bookmarks, filter, progress, search, stage]);

  return (
    <div className="oops-hub go-hub">
      <div className="oops-hero go-hero" style={{ borderColor: "#00add8" }}>
        <Link to="/language/Go" className="oops-back-btn" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>← Go courses</Link>
        <div className="oops-hero-badge">Go · Web Development Track</div>
        <h1 className="oops-hero-title">Go<br /><span className="oops-hero-accent">Web Development</span></h1>
        <p className="oops-hero-sub">Build reliable web services with Go: HTTP, routing, JSON APIs, middleware, persistence, testing, and production operations.</p>
        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta"><span>{isAuthenticated ? `${completedCount}/${GO_WEB_DEVELOPMENT_LESSONS.length} lessons · ${earnedXP}/${GO_WEB_DEVELOPMENT_TOTAL_XP} XP` : `Sign in to track progress · ${GO_WEB_DEVELOPMENT_LESSONS.length} lessons`}</span><span>{isAuthenticated ? `${percent}%` : "—"}</span></div>
            <div className="oops-xp-track"><div className="oops-xp-fill" style={{ width: isAuthenticated ? `${percent}%` : "0%", backgroundColor: "#00add8" }} /></div>
          </div>
          {!isAuthenticated && <div className="oops-auth-gate oops-auth-gate-hub"><p>Create a free account to run Go API challenges, earn XP, and save your place.</p><div className="oops-auth-gate-actions"><Link to="/login" className="oops-auth-gate-btn">Sign in</Link><Link to="/signup" className="oops-auth-gate-btn oops-auth-gate-btn-primary">Sign up</Link></div></div>}
          <div className="oops-resume-panel"><span className="oops-sync-pill">{isAuthenticated ? "Progress saved to your account" : "Browse lessons — sign in to save progress"}</span><h2>{resumeLesson.title}</h2><p>{resumeLesson.chapterTitle} · {resumeLesson.xp} XP</p><button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${resumeLesson.id}`)}>{completedCount > 0 ? "Resume Go Web Development" : "Start Go Web Development"}</button></div>
        </div>
      </div>

      <div className="oops-stage-tabs" style={{ padding: "0 1.5rem", marginTop: "0.5rem" }}>
        {STAGES.map(([id, label]) => <button key={id} type="button" className={stage === id ? "active stage-tab" : "stage-tab"} onClick={() => setStage(id)} style={{ marginRight: 8 }}>{label}</button>)}
      </div>
      <section className="matplotlib-learn-path" aria-label="Learning path">
        <div className="matplotlib-path-label"><span>Your path · Beginner to Advanced</span><small>7 chapters · 21 lessons</small></div>
        <div className="matplotlib-path-grid">
          {STAGES.map(([id, label, summary, color]) => {
            const chapters = GO_WEB_DEVELOPMENT_CHAPTERS.filter((chapter) => chapter.stage === id);
            const lessons = chapters.flatMap((chapter) => chapter.lessons);
            const done = lessons.filter((item) => progress[item.id]).length;
            return <article key={id} className="matplotlib-path-card" style={{ "--stage-color": color }}><header className="matplotlib-path-card-head"><span className="matplotlib-path-level">{label}</span><span className="matplotlib-path-pct">{Math.round((done / lessons.length) * 100) || 0}%</span></header><p className="matplotlib-path-summary">{summary}</p><ul className="matplotlib-path-chapters">{chapters.map((chapter) => <li key={chapter.id}>{chapter.title}</li>)}</ul><button type="button" className="matplotlib-path-cta" onClick={() => { const open = lessons.find((item) => !progress[item.id]) || lessons[0]; if (open) navigate(`${BASE_PATH}/lesson/${open.id}`); }}>{done === lessons.length ? "Review stage →" : done ? "Continue stage →" : "Start stage →"}</button></article>;
          })}
        </div>
      </section>
      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main"><span className="oops-interactive-label">Find a Go web topic</span><div className="oops-search-row"><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search HTTP, JSON, middleware..." aria-label="Search Go Web Development lessons" /><div className="oops-filter-tabs">{[["all", "All"], ["todo", "To do"], ["done", "Done"], ["bookmarked", "Saved"]].map(([value, label]) => <button key={value} type="button" className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div></div><div className="oops-search-results">{filteredLessons.slice(0, 6).map((item) => <button key={item.id} type="button" className="oops-search-result" onClick={() => navigate(`${BASE_PATH}/lesson/${item.id}`)}><span>{progress[item.id] ? "✓" : "○"}</span><strong>{item.title}</strong><small>{item.chapterTitle}</small></button>)}{!filteredLessons.length && <p className="oops-empty-copy">No lessons match that search.</p>}</div></div>
        <div className="oops-tool-panel"><span className="oops-interactive-label">Recommended</span><h2>{nextLesson.title}</h2><p>Next in {nextLesson.chapterTitle}. Earn {nextLesson.xp} XP.</p><button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${nextLesson.id}`)}>Open next lesson</button></div>
        <div className="oops-tool-panel"><span className="oops-interactive-label">Bookmarks</span><p>{bookmarks.length ? `${bookmarks.length} saved lesson${bookmarks.length === 1 ? "" : "s"}.` : "Bookmark lessons to review them here."}</p></div>
      </div>
      <LearnChapterPathOverview chapters={GO_WEB_DEVELOPMENT_CHAPTERS} progress={progress} onChapterSelect={(chapter) => navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)} />
      <LearnChapterGrid chapters={GO_WEB_DEVELOPMENT_CHAPTERS} progress={progress} basePath={BASE_PATH} navigate={navigate} />
      <CourseCertificate courseName="Go Web Development" totalLessons={GO_WEB_DEVELOPMENT_LESSONS.length} completedCount={completedCount} earnedXP={earnedXP} totalXP={GO_WEB_DEVELOPMENT_TOTAL_XP} />
      {user && null}
    </div>
  );
}
