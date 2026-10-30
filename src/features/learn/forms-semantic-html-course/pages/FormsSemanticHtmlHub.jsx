import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FORMS_SEMANTIC_HTML_CHAPTERS,
  FORMS_SEMANTIC_HTML_LESSONS,
  FORMS_SEMANTIC_HTML_TOTAL_XP,
} from "../data/formsSemanticHtmlCurriculum";
import useFormsSemanticHtmlProgress from "../hooks/useFormsSemanticHtmlProgress";
import CourseCertificate from "../../shared/CourseCertificate";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import LearnChapterIcon from "../../shared/LearnChapterIcon";

const BASE_PATH = "/learn/forms-semantic-html";
const ACCENT = "#0d9488";

const LEARNING_PATH = [
  {
    level: "Beginner",
    chapters: ["semantic-html-foundations"],
    color: "#0d9488",
    summary: "Why semantics matter, landmark elements, and section vs article vs div.",
  },
  {
    level: "Intermediate",
    chapters: ["more-semantic-elements", "form-basics"],
    color: "#f59e0b",
    summary: "figure/figcaption, time/details, the form element, and labels done right.",
  },
  {
    level: "Advanced",
    chapters: ["form-controls", "form-validation-accessibility"],
    color: "#7c3aed",
    summary: "select/textarea/fieldset, built-in validation, and ARIA for form errors.",
  },
  {
    level: "Expert",
    chapters: ["forms-practical-capstone"],
    color: "#dc2626",
    summary: "Accessible error messaging and a capstone full accessible contact form.",
  },
];

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => (block.content || "").replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function FormsSemanticHtmlHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const {
    isAuthenticated,
    completedMap: progress,
    bookmarks,
    lastLessonId,
  } = useFormsSemanticHtmlProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = FORMS_SEMANTIC_HTML_LESSONS.filter(
    (lesson) => progress[lesson.id],
  ).reduce((sum, lesson) => sum + lesson.xp, 0);
  const pct =
    Math.round((completedCount / FORMS_SEMANTIC_HTML_LESSONS.length) * 100) || 0;

  const nextLesson =
    FORMS_SEMANTIC_HTML_LESSONS.find((lesson) => !progress[lesson.id]) ||
    FORMS_SEMANTIC_HTML_LESSONS[0];
  const resumeLesson =
    FORMS_SEMANTIC_HTML_LESSONS.find((lesson) => lesson.id === lastLessonId) ||
    nextLesson;
  const completedChapters = FORMS_SEMANTIC_HTML_CHAPTERS.filter((chapter) =>
    chapter.lessons.every((lesson) => progress[lesson.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => FORMS_SEMANTIC_HTML_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return FORMS_SEMANTIC_HTML_LESSONS.filter((lesson) => {
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
          to="/language/HTML%20%26%20CSS"
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← HTML & CSS courses
        </Link>
        <div className="oops-hero-badge">HTML · CORE COURSE</div>
        <h1 className="oops-hero-title">
          Forms &
          <br />
          <span className="oops-hero-accent" style={{ color: ACCENT }}>
            Semantic HTML
          </span>
        </h1>
        <p className="oops-hero-sub">
          Write HTML that means something — landmark elements, accessible forms, built-in validation, and ARIA patterns for real-world forms. {FORMS_SEMANTIC_HTML_CHAPTERS.length}{" "}
          chapters, {FORMS_SEMANTIC_HTML_LESSONS.length} lessons, hands-on challenges.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${FORMS_SEMANTIC_HTML_LESSONS.length} lessons · ${earnedXP}/${FORMS_SEMANTIC_HTML_TOTAL_XP} XP`
                  : `Sign in to track progress · ${FORMS_SEMANTIC_HTML_LESSONS.length} lessons`}
              </span>
              <span>{isAuthenticated ? `${pct}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div
                className="oops-xp-fill"
                style={{
                  width: isAuthenticated ? `${pct}%` : "0%",
                  background: ACCENT,
                }}
              />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="oops-auth-gate oops-auth-gate-hub">
              <p>
                Create a free account to run challenges, earn XP, and save
                your place in the course.
              </p>
              <div className="oops-auth-gate-actions">
                <Link to="/login" className="oops-auth-gate-btn">
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="oops-auth-gate-btn oops-auth-gate-btn-primary"
                >
                  Sign up free
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
              {completedCount > 0 ? "Resume Course" : "Start Course"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a Forms & Semantic HTML topic</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search forms, labels, semantic tags..."
              aria-label="Search Forms & Semantic HTML lessons"
            />
            <div
              className="oops-filter-tabs"
              aria-label="Filter Forms & Semantic HTML lessons"
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
            {completedCount}/{FORMS_SEMANTIC_HTML_LESSONS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>
            {completedChapters}/{FORMS_SEMANTIC_HTML_CHAPTERS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>
            {earnedXP}/{FORMS_SEMANTIC_HTML_TOTAL_XP}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      <section className="matplotlib-learn-path" aria-label="Learning path">
        <div className="matplotlib-path-label">
          <span>Your path · Beginner to Expert</span>
          <small>
            {FORMS_SEMANTIC_HTML_CHAPTERS.length} chapters ·{" "}
            {FORMS_SEMANTIC_HTML_LESSONS.length} lessons
          </small>
        </div>
        <div className="matplotlib-path-grid">
          {LEARNING_PATH.map((stage) => {
            const stageChapters = FORMS_SEMANTIC_HTML_CHAPTERS.filter((ch) =>
              stage.chapters.includes(ch.id),
            );
            const stageLessons = stageChapters.flatMap((ch) => ch.lessons);
            const stageDone = stageLessons.filter(
              (l) => progress[l.id],
            ).length;
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
        chapters={FORMS_SEMANTIC_HTML_CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) =>
          navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)
        }
      />

      <LearnChapterGrid
        chapters={FORMS_SEMANTIC_HTML_CHAPTERS}
        progress={progress}
        basePath={BASE_PATH}
        navigate={navigate}
      />

      <CourseCertificate
        courseName="Forms & Semantic HTML"
        totalLessons={FORMS_SEMANTIC_HTML_LESSONS.length}
        completedCount={completedCount}
        earnedXP={earnedXP}
        totalXP={FORMS_SEMANTIC_HTML_TOTAL_XP}
      />
    </div>
  );
}
