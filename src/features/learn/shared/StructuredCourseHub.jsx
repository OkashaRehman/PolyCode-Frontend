import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LearnChapterGrid from "./LearnChapterGrid";
import LearnChapterPathOverview from "./LearnChapterPathOverview";

export default function StructuredCourseHub({ config, progressApi, earnedXP }) {
  const navigate = useNavigate();
  const { completedMap: progress, lastLessonId, isAuthenticated } = progressApi;
  const completedCount = Object.keys(progress).length;
  const percent = Math.round((completedCount / config.lessons.length) * 100) || 0;
  const resumeLesson =
    config.lessons.find((lesson) => lesson.id === lastLessonId) ||
    config.lessons.find((lesson) => !progress[lesson.id]) ||
    config.lessons[0];

  return (
    <div className="oops-hub matplotlib-hub">
      <div
        className="oops-hero matplotlib-hero"
        style={{ borderColor: config.accent }}
      >
        <Link
          to={config.backPath}
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← {config.language} courses
        </Link>
        <div className="oops-hero-badge">
          {config.language.toUpperCase()} · INTERACTIVE COURSE
        </div>
        <h1 className="oops-hero-title">{config.title}</h1>
        <p className="oops-hero-sub">{config.description}</p>
        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${config.lessons.length} lessons · ${earnedXP}/${config.totalXP} XP`
                  : `Sign in to track progress · ${config.lessons.length} lessons`}
              </span>
              <span>{isAuthenticated ? `${percent}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div
                className="oops-xp-fill"
                style={{
                  width: isAuthenticated ? `${percent}%` : "0%",
                  backgroundColor: config.accent,
                }}
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
              onClick={() =>
                navigate(`${config.basePath}/lesson/${resumeLesson.id}`)
              }
            >
              {completedCount ? "Resume course" : "Start course"}
            </button>
          </div>
        </div>
      </div>
      <section className="matplotlib-learn-path" aria-label="Course chapters">
        <div className="matplotlib-path-label">
          <span>Your learning path</span>
          <small>
            {config.chapters.length} chapters · {config.lessons.length} lessons
          </small>
        </div>
        <LearnChapterPathOverview
          chapters={config.chapters}
          progress={progress}
          onChapterSelect={(chapter) =>
            navigate(`${config.basePath}/lesson/${chapter.lessons[0].id}`)
          }
        />
      </section>
      <LearnChapterGrid
        chapters={config.chapters}
        progress={progress}
        basePath={config.basePath}
        navigate={navigate}
      />
    </div>
  );
}
