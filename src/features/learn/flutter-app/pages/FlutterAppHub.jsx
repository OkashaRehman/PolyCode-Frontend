import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FLUTTER_APP_CHAPTERS,
  FLUTTER_APP_LESSONS,
  FLUTTER_APP_TOTAL_XP,
} from "../data/flutterCurriculum";
import useFlutterAppProgress from "../hooks/useFlutterAppProgress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import LearnChapterIcon from "../../shared/LearnChapterIcon";
import CourseCertificate from "../../shared/CourseCertificate";

const BASE_PATH = "/learn/flutter-app";

const LEARNING_PATH = [
  {
    level: "Beginner",
    chapters: ["meet", "setup", "dart-basics", "dart-oop", "project-anatomy"],
    color: "#02569b",
    summary: "Meet Flutter & Dart, set up your tools, and learn the language basics.",
  },
  {
    level: "UI Builder",
    chapters: ["first-ui", "layouts", "forms", "navigation", "state"],
    color: "#0175c2",
    summary: "Build screens, forms, navigation, and local state like a real app.",
  },
  {
    level: "App Skills",
    chapters: ["lists-models", "networking", "storage", "auth", "device"],
    color: "#13b9fd",
    summary: "Models, APIs, storage, login flows, and device features.",
  },
  {
    level: "Pro & Capstone",
    chapters: [
      "polish",
      "architecture",
      "realtime",
      "testing",
      "production",
      "advanced",
      "projects",
    ],
    color: "#05445e",
    summary: "Polish, architecture, chat concepts, testing, release, and projects.",
  },
];

function lessonPlainText(lesson) {
  return (lesson.theory || [])
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => block.content.replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function FlutterAppHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const {
    isAuthenticated,
    completedMap: progress,
    bookmarks,
    lastLessonId,
  } = useFlutterAppProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = FLUTTER_APP_LESSONS.filter((lesson) => progress[lesson.id]).reduce(
    (sum, lesson) => sum + lesson.xp,
    0,
  );
  const pct =
    Math.round((completedCount / FLUTTER_APP_LESSONS.length) * 100) || 0;
  const nextLesson =
    FLUTTER_APP_LESSONS.find((lesson) => !progress[lesson.id]) ||
    FLUTTER_APP_LESSONS[0];
  const resumeLesson =
    FLUTTER_APP_LESSONS.find((lesson) => lesson.id === lastLessonId) ||
    nextLesson;
  const completedChapters = FLUTTER_APP_CHAPTERS.filter((chapter) =>
    chapter.lessons.every((lesson) => progress[lesson.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => FLUTTER_APP_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return FLUTTER_APP_LESSONS.filter((lesson) => {
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
    <div className="oops-hub flutter-hub">
      <div className="oops-hero flutter-hero">
        <div className="flutter-hero-orbit" aria-hidden>
          <span className="flutter-hero-ring flutter-hero-ring-a" />
          <span className="flutter-hero-ring flutter-hero-ring-b" />
          <span className="flutter-hero-core" />
        </div>

        <Link
          to="/language/Flutter"
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← Flutter courses
        </Link>

        <div className="flutter-hero-badge-row">
          <div className="oops-hero-badge flutter-hero-badge">
            FLUTTER · ZERO TO REAL APPS
          </div>
          <span className="flutter-level-chip">Beginner → Capstone</span>
        </div>

        <h1 className="oops-hero-title flutter-hero-title">
          Flutter Development
          <br />
          <span className="oops-hero-accent">Zero to Real Apps</span>
        </h1>
        <p className="oops-hero-sub flutter-hero-sub">
          Learn Dart, build beautiful interfaces, connect APIs, and create
          complete Android applications — from absolute beginner to production
          skills, with QuantumChat-style practical projects.
        </p>

        <div
          className="flutter-module-strip"
          aria-label="Flutter modules you will meet"
        >
          {[
            "dart",
            "widgets",
            "forms",
            "state",
            "http",
            "auth",
            "chat",
            "release",
          ].map((name) => (
            <span key={name} className="flutter-module-pill">
              {name}
            </span>
          ))}
        </div>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${FLUTTER_APP_LESSONS.length} lessons · ${earnedXP}/${FLUTTER_APP_TOTAL_XP} XP`
                  : `Sign in to track progress · ${FLUTTER_APP_LESSONS.length} lessons`}
              </span>
              <span>{isAuthenticated ? `${pct}%` : "—"}</span>
            </div>
            <div className="oops-xp-track">
              <div
                className="oops-xp-fill flutter-xp-fill"
                style={{
                  width: isAuthenticated ? `${pct}%` : "0%",
                }}
              />
            </div>
          </div>

          {!isAuthenticated && (
            <div className="oops-auth-gate oops-auth-gate-hub">
              <p>
                Create a free account to check challenges, earn XP, and save your
                place in the studio.
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

          <div className="oops-resume-panel flutter-resume-panel">
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
              {completedCount > 0 ? "Resume Flutter Studio" : "Enter Flutter Studio"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main flutter-tool-panel">
          <span className="oops-interactive-label">Find a Flutter topic</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search widgets, Dart, API, chat, setState..."
              aria-label="Search Flutter lessons"
            />
            <div
              className="oops-filter-tabs"
              aria-label="Filter Flutter lessons"
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

        <div className="oops-tool-panel flutter-tool-panel">
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

        <div className="oops-tool-panel flutter-tool-panel">
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

      <div className="oops-dashboard-strip flutter-dashboard-strip">
        <div className="oops-stat-tile">
          <span>Lessons</span>
          <strong>
            {completedCount}/{FLUTTER_APP_LESSONS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>
            {completedChapters}/{FLUTTER_APP_CHAPTERS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>
            {earnedXP}/{FLUTTER_APP_TOTAL_XP}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      <section className="flutter-learn-path" aria-label="Learning path">
        <div className="flutter-path-label">
          <span>Studio path · Beginner to Capstone</span>
          <small>
            {FLUTTER_APP_CHAPTERS.length} chapters ·{" "}
            {FLUTTER_APP_LESSONS.length} lessons
          </small>
        </div>
        <div className="flutter-path-grid">
          {LEARNING_PATH.map((stage) => {
            const stageChapters = FLUTTER_APP_CHAPTERS.filter((ch) =>
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
                className="flutter-path-card"
                style={{ "--stage-color": stage.color }}
              >
                <header className="flutter-path-card-head">
                  <span className="flutter-path-level">{stage.level}</span>
                  <span className="flutter-path-pct">{stagePct}%</span>
                </header>
                <p className="flutter-path-summary">{stage.summary}</p>
                <ul className="flutter-path-chapters">
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
                  className="flutter-path-cta"
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
        chapters={FLUTTER_APP_CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) =>
          navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)
        }
      />

      <LearnChapterGrid
        chapters={FLUTTER_APP_CHAPTERS}
        progress={progress}
        basePath={BASE_PATH}
        navigate={navigate}
      />
      <CourseCertificate
        courseName="Flutter Development"
        totalLessons={FLUTTER_APP_LESSONS.length}
        completedCount={completedCount}
        earnedXP={earnedXP}
        totalXP={FLUTTER_APP_TOTAL_XP}
      />
    </div>
  );
}
