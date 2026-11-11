import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LearnChapterPathOverview from "./LearnChapterPathOverview";
import LearnChapterGrid from "./LearnChapterGrid";
import CourseCertificate from "./CourseCertificate";
import { STAGES, STAGE_COLORS } from "./quantumLanguageCurriculum";

const STAGE_INFO = {
  beginner: "Learn the vocabulary, values, and first runnable patterns.",
  intermediate: "Compose states, operations, and reusable quantum logic.",
  pro: "Build reliable, testable programs around real boundaries.",
  advanced: "Bring runtime thinking, resilience, and capstone design together.",
};

export default function QuantumLanguageHub({ config }) {
  const navigate = useNavigate();
  const [stage, setStage] = useState("beginner");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { chapters, lessons, totalXP } = config;
  const { isAuthenticated, completedMap: progress, bookmarks, lastLessonId } = config.useProgress();
  const completedCount = Object.keys(progress).length;
  const earnedXP = lessons.filter((lesson) => progress[lesson.id]).reduce((sum, lesson) => sum + lesson.xp, 0);
  const percent = Math.round((completedCount / lessons.length) * 100) || 0;
  const nextLesson = lessons.find((lesson) => !progress[lesson.id]) || lessons[0];
  const resumeLesson = lessons.find((lesson) => lesson.id === lastLessonId) || nextLesson;
  const filteredLessons = useMemo(() => lessons.filter((lesson) => {
    const query = search.trim().toLowerCase();
    const matchesQuery = !query || `${lesson.title} ${lesson.chapterTitle} ${lesson.theory[0].content}`.toLowerCase().includes(query);
    const chapter = chapters.find((item) => item.id === lesson.chapterId);
    const matchesStage = chapter?.stage === stage;
    const matchesFilter = filter === "all" || (filter === "todo" && !progress[lesson.id]) || (filter === "done" && progress[lesson.id]) || (filter === "bookmarked" && bookmarks.includes(lesson.id));
    return matchesStage && matchesQuery && matchesFilter;
  }), [chapters, filter, lessons, progress, search, stage, bookmarks]);
  return <div className="oops-hub matplotlib-hub">
    <div className="oops-hero matplotlib-hero" style={{ borderColor: config.accent }}>
      <Link to="/language/Quantum" className="oops-back-btn" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>← Quantum courses</Link>
      <div className="oops-hero-badge">QUANTUM · BEGINNER → ADVANCED</div>
      <h1 className="oops-hero-title">{config.title.split(" ")[0]}<br /><span className="oops-hero-accent">{config.title.split(" ").slice(1).join(" ")}</span></h1>
      <p className="oops-hero-sub">{config.description} Six chapters, twelve lessons, theory, runnable examples, and browser challenges.</p>
      <div className="oops-hero-grid"><div className="oops-xp-bar-wrap"><div className="oops-xp-meta"><span>{isAuthenticated ? `${completedCount}/${lessons.length} lessons · ${earnedXP}/${totalXP} XP` : `Sign in to track progress · ${lessons.length} lessons`}</span><span>{isAuthenticated ? `${percent}%` : "—"}</span></div><div className="oops-xp-track"><div className="oops-xp-fill" style={{ width: isAuthenticated ? `${percent}%` : "0%", backgroundColor: config.accent }} /></div></div>
      {!isAuthenticated && <div className="oops-auth-gate oops-auth-gate-hub"><p>Create a free account to run challenges, earn XP, and save your place in the course.</p><div className="oops-auth-gate-actions"><Link to="/login" className="oops-auth-gate-btn">Sign in</Link><Link to="/signup" className="oops-auth-gate-btn oops-auth-gate-btn-primary">Sign up</Link></div></div>}
      <div className="oops-resume-panel"><span className="oops-sync-pill">{isAuthenticated ? "Progress saved to your account" : "Browse lessons — sign in to save progress"}</span><h2>{resumeLesson.title}</h2><p>{resumeLesson.chapterTitle} · {resumeLesson.xp} XP</p><button type="button" onClick={() => navigate(`${config.basePath}/lesson/${resumeLesson.id}`)}>{completedCount ? `Resume ${config.title}` : `Start ${config.title}`}</button></div></div>
    </div>
    <div className="oops-stage-tabs" style={{ padding: "0 1.5rem", marginTop: "0.5rem" }}>{STAGES.map((id) => <button key={id} type="button" className={stage === id ? "active stage-tab" : "stage-tab"} onClick={() => setStage(id)} style={{ marginRight: 8 }}>{id[0].toUpperCase() + id.slice(1)}</button>)}</div>
    <section className="matplotlib-learn-path" aria-label="Learning path"><div className="matplotlib-path-label"><span>Your path · Beginner to Advanced</span><small>{chapters.length} chapters · {lessons.length} lessons</small></div><div className="matplotlib-path-grid">{STAGES.map((id) => { const stageChapters = chapters.filter((chapter) => chapter.stage === id); const stageLessons = stageChapters.flatMap((chapter) => chapter.lessons); const done = stageLessons.filter((lesson) => progress[lesson.id]).length; return <article key={id} className="matplotlib-path-card" style={{ "--stage-color": STAGE_COLORS[id] }}><header className="matplotlib-path-card-head"><span className="matplotlib-path-level">{id[0].toUpperCase() + id.slice(1)}</span><span className="matplotlib-path-pct">{Math.round((done / stageLessons.length) * 100) || 0}%</span></header><p className="matplotlib-path-summary">{STAGE_INFO[id]}</p><ul className="matplotlib-path-chapters">{stageChapters.map((chapter) => <li key={chapter.id}>{chapter.title}</li>)}</ul><button type="button" className="matplotlib-path-cta" onClick={() => { const open = stageLessons.find((lesson) => !progress[lesson.id]) || stageLessons[0]; if (open) navigate(`${config.basePath}/lesson/${open.id}`); }}>{done === stageLessons.length ? "Review stage →" : done ? "Continue stage →" : "Start stage →"}</button></article>; })}</div></section>
    <div className="oops-guide-tools"><div className="oops-tool-panel oops-tool-panel-main"><span className="oops-interactive-label">Find a Quantum topic</span><div className="oops-search-row"><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search syntax, states, operations..." aria-label={`Search ${config.title} lessons`} /><div className="oops-filter-tabs">{[["all", "All"], ["todo", "To do"], ["done", "Done"], ["bookmarked", "Saved"]].map(([value, label]) => <button key={value} type="button" className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div></div><div className="oops-search-results">{filteredLessons.slice(0, 6).map((lesson) => <button key={lesson.id} type="button" className="oops-search-result" onClick={() => navigate(`${config.basePath}/lesson/${lesson.id}`)}><span>{progress[lesson.id] ? "✓" : "○"}</span><strong>{lesson.title}</strong><small>{lesson.chapterTitle}</small></button>)}{!filteredLessons.length && <p className="oops-empty-copy">No lessons match that search.</p>}</div></div><div className="oops-tool-panel"><span className="oops-interactive-label">Recommended</span><h2>{nextLesson.title}</h2><p>Next in {nextLesson.chapterTitle}. Earn {nextLesson.xp} XP.</p><button type="button" onClick={() => navigate(`${config.basePath}/lesson/${nextLesson.id}`)}>Open next lesson</button></div></div>
    <LearnChapterPathOverview chapters={chapters} progress={progress} onChapterSelect={(chapter) => navigate(`${config.basePath}/lesson/${chapter.lessons[0].id}`)} /><LearnChapterGrid chapters={chapters} progress={progress} basePath={config.basePath} navigate={navigate} /><CourseCertificate courseName={config.title} totalLessons={lessons.length} completedCount={completedCount} earnedXP={earnedXP} totalXP={totalXP} />
  </div>;
}
