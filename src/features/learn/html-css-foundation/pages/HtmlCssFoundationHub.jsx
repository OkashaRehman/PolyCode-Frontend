import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HTML_CSS_FOUNDATION_CHAPTERS,
  HTML_CSS_FOUNDATION_LESSONS,
  HTML_CSS_FOUNDATION_TOTAL_XP,
} from "../data/htmlCssFoundationCurriculum";
import useHtmlCssFoundationProgress from "../hooks/useHtmlCssFoundationProgress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import CourseCertificate from "../../shared/CourseCertificate";

const BASE_PATH = "/learn/html-css-foundation";

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => block.content.replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function HtmlCssFoundationHub() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const {
    isAuthenticated,
    completedMap: progress,
    bookmarks,
    lastLessonId,
  } = useHtmlCssFoundationProgress();

  const completedCount = Object.keys(progress).length;
  const courseComplete =
    completedCount >= HTML_CSS_FOUNDATION_LESSONS.length &&
    HTML_CSS_FOUNDATION_LESSONS.length > 0;

  useEffect(() => {
    if (location.hash !== "#course-certificate" || !courseComplete) return;
    const timer = window.setTimeout(() => {
      document
        .getElementById("course-certificate")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [location.hash, courseComplete, completedCount]);

  const earnedXP = HTML_CSS_FOUNDATION_LESSONS.filter((lesson) => progress[lesson.id]).reduce(
    (sum, lesson) => sum + lesson.xp,
    0,
  );
  const pct = Math.round((completedCount / HTML_CSS_FOUNDATION_LESSONS.length) * 100) || 0;
  const nextLesson =
    HTML_CSS_FOUNDATION_LESSONS.find((lesson) => !progress[lesson.id]) ||
    HTML_CSS_FOUNDATION_LESSONS[0];
  const resumeLesson =
    HTML_CSS_FOUNDATION_LESSONS.find((lesson) => lesson.id === lastLessonId) ||
    nextLesson;
  const completedChapters = HTML_CSS_FOUNDATION_CHAPTERS.filter((chapter) =>
    chapter.lessons.every((lesson) => progress[lesson.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => HTML_CSS_FOUNDATION_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return HTML_CSS_FOUNDATION_LESSONS.filter((lesson) => {
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
    <div className="oops-hub html-css-foundation-hub">
      <div className="oops-hero html-css-foundation-hero">
        <Link
          to="/language/HTML%20%26%20CSS"
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← HTML &amp; CSS courses
        </Link>
        <div className="oops-hero-badge">HTML &amp; CSS · WEB FOUNDATION</div>
        <h1 className="oops-hero-title">
          HTML &amp; CSS
          <br />
          <span className="oops-hero-accent">Foundation</span>
        </h1>
        <p className="oops-hero-sub">
          Short foundation course for HTML, CSS, and Bootstrap with beginner-friendly theory,
          strong examples, quick checks, and runnable challenges.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${HTML_CSS_FOUNDATION_LESSONS.length} lessons · ${earnedXP}/${HTML_CSS_FOUNDATION_TOTAL_XP} XP`
                  : `Sign in to track progress · ${HTML_CSS_FOUNDATION_LESSONS.length} lessons`}
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
                Create a free account to run challenges, earn XP, and save your place in the course.
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
              {completedCount > 0 ? "Resume HTML & CSS" : "Start HTML & CSS"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Search topics</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search HTML, CSS, Bootstrap..."
              aria-label="Search HTML and CSS lessons"
            />
            <div className="oops-filter-tabs" aria-label="Filter lessons">
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
            {completedCount}/{HTML_CSS_FOUNDATION_LESSONS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>
            {completedChapters}/{HTML_CSS_FOUNDATION_CHAPTERS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>
            {earnedXP}/{HTML_CSS_FOUNDATION_TOTAL_XP}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      <LearnChapterPathOverview
        chapters={HTML_CSS_FOUNDATION_CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) =>
          navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)
        }
      />

      <LearnChapterGrid
        chapters={HTML_CSS_FOUNDATION_CHAPTERS}
        progress={progress}
        basePath={BASE_PATH}
        navigate={navigate}
      />

      <CourseCertificate
        courseName="HTML & CSS Foundation"
        totalLessons={HTML_CSS_FOUNDATION_LESSONS.length}
        completedCount={completedCount}
        earnedXP={earnedXP}
        totalXP={HTML_CSS_FOUNDATION_TOTAL_XP}
      />
    </div>
  );
}
