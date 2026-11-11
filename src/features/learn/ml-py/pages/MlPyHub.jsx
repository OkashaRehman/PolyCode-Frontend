import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import CourseCertificate from "../../shared/CourseCertificate";
import { ML_PY_CHAPTERS, ML_PY_LESSONS, ML_PY_TOTAL_XP, STAGES } from "../data/MlPyCurriculum";
import useMlPyProgress from "../hooks/useMlPyProgress";

const BASE_PATH = "/learn/ml-py";
const STAGE_INFO = {
  beginner: ["Beginner", "Build an ML vocabulary and prepare small datasets.", "#22c55e"],
  intermediate: ["Intermediate", "Train models and measure their predictions.", "#3b82f6"],
  pro: ["Pro", "Engineer features and discover patterns without labels.", "#f59e0b"],
  advanced: ["Advanced", "Ship, monitor, and document responsible ML systems.", "#8b5cf6"],
};

function lessonText(lesson) {
  return lesson.theory.map((block) => block.content || "").join(" ");
}

export default function MlPyHub() {
  const navigate = useNavigate();
  const [stage, setStage] = useState("beginner");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { isAuthenticated, completedMap: progress, bookmarks, lastLessonId } = useMlPyProgress();
  const completedCount = Object.keys(progress).length;
  const earnedXP = ML_PY_LESSONS.filter((lesson) => progress[lesson.id]).reduce((sum, lesson) => sum + lesson.xp, 0);
  const percent = Math.round((completedCount / ML_PY_LESSONS.length) * 100) || 0;
  const nextLesson = ML_PY_LESSONS.find((lesson) => !progress[lesson.id]) || ML_PY_LESSONS[0];
  const resumeLesson = ML_PY_LESSONS.find((lesson) => lesson.id === lastLessonId) || nextLesson;
  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ML_PY_LESSONS.filter((lesson) => {
      const chapter = ML_PY_CHAPTERS.find((item) => item.id === lesson.chapterId);
      const matchesStage = chapter?.stage === stage;
      const matchesQuery = !query || `${lesson.title} ${lesson.chapterTitle} ${lessonText(lesson)}`.toLowerCase().includes(query);
      const matchesFilter = filter === "all" || (filter === "todo" && !progress[lesson.id]) || (filter === "done" && progress[lesson.id]) || (filter === "bookmarked" && bookmarks.includes(lesson.id));
      return matchesStage && matchesQuery && matchesFilter;
    });
  }, [bookmarks, filter, progress, search, stage]);

  return <div className="oops-hub go-hub">
    <div className="oops-hero go-hero" style={{ borderColor: "#00add8" }}>
      <Link to="/language/Go" className="oops-back-btn" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>← Go courses</Link>
      <div className="oops-hero-badge">Go · Python Machine Learning Track</div>
      <h1 className="oops-hero-title">Machine Learning<br /><span className="oops-hero-accent">with Python</span></h1>
      <p className="oops-hero-sub">Learn the complete ML workflow: data, features, supervised and unsupervised learning, evaluation, deployment, and responsible practice.</p>
      <div className="oops-hero-grid"><div className="oops-xp-bar-wrap"><div className="oops-xp-meta"><span>{isAuthenticated ? `${completedCount}/${ML_PY_LESSONS.length} lessons · ${earnedXP}/${ML_PY_TOTAL_XP} XP` : `Sign in to track progress · ${ML_PY_LESSONS.length} lessons`}</span><span>{isAuthenticated ? `${percent}%` : "—"}</span></div><div className="oops-xp-track"><div className="oops-xp-fill" style={{ width: isAuthenticated ? `${percent}%` : "0%", backgroundColor: "#00add8" }} /></div></div>
      {!isAuthenticated && <div className="oops-auth-gate oops-auth-gate-hub"><p>Create a free account to run Python challenges, earn XP, and save your place.</p><div className="oops-auth-gate-actions"><Link to="/login" className="oops-auth-gate-btn">Sign in</Link><Link to="/signup" className="oops-auth-gate-btn oops-auth-gate-btn-primary">Sign up</Link></div></div>}
      <div className="oops-resume-panel"><span className="oops-sync-pill">{isAuthenticated ? "Progress saved to your account" : "Browse lessons — sign in to save progress"}</span><h2>{resumeLesson.title}</h2><p>{resumeLesson.chapterTitle} · {resumeLesson.xp} XP</p><button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${resumeLesson.id}`)}>{completedCount ? "Resume Machine Learning" : "Start Machine Learning"}</button></div></div>
    </div>
    <div className="oops-stage-tabs" style={{ padding: "0 1.5rem", marginTop: "0.5rem" }}>{STAGES.map((id) => <button key={id} type="button" className={stage === id ? "active stage-tab" : "stage-tab"} onClick={() => setStage(id)} style={{ marginRight: 8 }}>{STAGE_INFO[id][0]}</button>)}</div>
    <section className="matplotlib-learn-path" aria-label="Learning path"><div className="matplotlib-path-label"><span>Your path · Beginner to Advanced</span><small>{ML_PY_CHAPTERS.length} chapters · {ML_PY_LESSONS.length} lessons</small></div><div className="matplotlib-path-grid">{STAGES.map((id) => { const chapters = ML_PY_CHAPTERS.filter((chapter) => chapter.stage === id); const lessons = chapters.flatMap((chapter) => chapter.lessons); const done = lessons.filter((lesson) => progress[lesson.id]).length; return <article key={id} className="matplotlib-path-card" style={{ "--stage-color": STAGE_INFO[id][2] }}><header className="matplotlib-path-card-head"><span className="matplotlib-path-level">{STAGE_INFO[id][0]}</span><span className="matplotlib-path-pct">{Math.round((done / lessons.length) * 100) || 0}%</span></header><p className="matplotlib-path-summary">{STAGE_INFO[id][1]}</p><ul className="matplotlib-path-chapters">{chapters.map((chapter) => <li key={chapter.id}>{chapter.title}</li>)}</ul><button type="button" className="matplotlib-path-cta" onClick={() => { const open = lessons.find((lesson) => !progress[lesson.id]) || lessons[0]; if (open) navigate(`${BASE_PATH}/lesson/${open.id}`); }}>{done === lessons.length ? "Review stage →" : done ? "Continue stage →" : "Start stage →"}</button></article>; })}</div></section>
    <div className="oops-guide-tools"><div className="oops-tool-panel oops-tool-panel-main"><span className="oops-interactive-label">Find a Python ML topic</span><div className="oops-search-row"><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search features, regression, deployment..." aria-label="Search Machine Learning lessons" /><div className="oops-filter-tabs">{[["all", "All"], ["todo", "To do"], ["done", "Done"], ["bookmarked", "Saved"]].map(([value, label]) => <button key={value} type="button" className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div></div><div className="oops-search-results">{filteredLessons.slice(0, 6).map((lesson) => <button key={lesson.id} type="button" className="oops-search-result" onClick={() => navigate(`${BASE_PATH}/lesson/${lesson.id}`)}><span>{progress[lesson.id] ? "✓" : "○"}</span><strong>{lesson.title}</strong><small>{lesson.chapterTitle}</small></button>)}{!filteredLessons.length && <p className="oops-empty-copy">No lessons match that search.</p>}</div></div><div className="oops-tool-panel"><span className="oops-interactive-label">Recommended</span><h2>{nextLesson.title}</h2><p>Next in {nextLesson.chapterTitle}. Earn {nextLesson.xp} XP.</p><button type="button" onClick={() => navigate(`${BASE_PATH}/lesson/${nextLesson.id}`)}>Open next lesson</button></div></div>
    <LearnChapterPathOverview chapters={ML_PY_CHAPTERS} progress={progress} onChapterSelect={(chapter) => navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)} /><LearnChapterGrid chapters={ML_PY_CHAPTERS} progress={progress} basePath={BASE_PATH} navigate={navigate} /><CourseCertificate courseName="Machine Learning with Python" totalLessons={ML_PY_LESSONS.length} completedCount={completedCount} earnedXP={earnedXP} totalXP={ML_PY_TOTAL_XP} />
  </div>;
}
