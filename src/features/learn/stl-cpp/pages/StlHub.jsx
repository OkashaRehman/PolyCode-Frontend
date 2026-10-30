import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CHAPTERS, ALL_LESSONS, TOTAL_XP } from "../data/stlCurriculum";
import useStlProgress from "../hooks/useStlProgress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import LearnChapterIcon from "../../shared/LearnChapterIcon";
import CourseCertificate from "../../shared/CourseCertificate";

const BASE_PATH = "/learn/stl-cpp";

const LEARNING_PATH = [
  {
    level: "Beginner",
    chapters: ["containers"],
    color: "#60a5fa",
    summary: "Learn the core STL containers and basic iterators.",
  },
  {
    level: "Intermediate",
    chapters: ["iterators", "algorithms"],
    color: "#f59e0b",
    summary: "Master iterators, sorting, and algorithm utilities.",
  },
  {
    level: "Advanced",
    chapters: ["functors", "adapters", "allocators"],
    color: "#7c3aed",
    summary: "Explore functors, adapters, and custom allocators.",
  },
  {
    level: "Pro",
    chapters: ["advanced"],
    color: "#14b8a6",
    summary: "Deep dive into move semantics and advanced STL patterns.",
  },
];

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => block.content.replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function StlHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { completedMap: progress, bookmarks, lastLessonId } = useStlProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = ALL_LESSONS.filter((lesson) => progress[lesson.id]).reduce(
    (sum, lesson) => sum + lesson.xp,
    0,
  );
  const pct = Math.round((completedCount / ALL_LESSONS.length) * 100) || 0;
  const nextLesson = ALL_LESSONS.find((lesson) => !progress[lesson.id]) || ALL_LESSONS[0];
  const resumeLesson = ALL_LESSONS.find((lesson) => lesson.id === lastLessonId) || nextLesson;
  const completedChapters = CHAPTERS.filter((chapter) =>
    chapter.lessons.every((lesson) => progress[lesson.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => ALL_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ALL_LESSONS.filter((lesson) => {
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
    <div className="oops-hub stl-hub">
      <div className="oops-hero stl-hero">
        <div className="oops-hero-badge">C++ STL TRACK</div>
        <h1 className="oops-hero-title">
          C++ STL
          <br />
          <span className="oops-hero-accent">From Beginner to Pro</span>
        </h1>
        <p className="oops-hero-sub">
          Master the Standard Template Library: containers, algorithms, iterators, functors, adapters, and advanced patterns.
        </p>
        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {completedCount}/{ALL_LESSONS.length} lessons · {earnedXP}/{TOTAL_XP} XP
              </span>
              <span>{pct}%</span>
            </div>
            <div className="oops-xp-track">
              <div className="oops-xp-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="oops-resume-panel">
            <span className="oops-sync-pill">Progress saved on this device</span>
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
              {completedCount > 0 ? "Resume STL" : "Start STL"}
            </button>
          </div>
        </div>
      </div>
      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a concept</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search containers, algorithms, iterators..."
              aria-label="Search STL lessons"
            />
            <div className="oops-filter-tabs" aria-label="Filter STL lessons">
              {[[
                "all",
                "All",
              ], ["todo", "To do"], ["done", "Done"], ["bookmarked", "Saved"]].map(
                ([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={filter === value ? "active" : ""}
                    onClick={() => setFilter(value)}
                  >
                    {label}
                  </button>
                ),
              )}
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
              <p className="oops-empty-copy">No STL lessons match that search yet.</p>
            )}
          </div>
        </div>
        <div className="oops-tool-panel">
          <span className="oops-interactive-label">Recommended</span>
          <h2>{nextLesson.title}</h2>
          <p>
            Next up in {nextLesson.chapterTitle}. Finish it to earn {nextLesson.xp} XP.
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
            <p>Bookmark lessons you want to revisit here.</p>
          )}
        </div>
      </div>
      <div className="oops-dashboard-strip">
        <div className="oops-stat-tile">
          <span>Lessons</span>
          <strong>
            {completedCount}/{ALL_LESSONS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>
            {completedChapters}/{CHAPTERS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>
            {earnedXP}/{TOTAL_XP}
          </strong>
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
            {CHAPTERS.length} chapters · {ALL_LESSONS.length} lessons
          </small>
        </div>
        <div className="matplotlib-path-grid">
          {LEARNING_PATH.map((stage) => {
            const stageChapters = CHAPTERS.filter((ch) =>
              stage.chapters.includes(ch.id),
            );
            const stageLessons = stageChapters.flatMap((ch) => ch.lessons);
            const stageDone = stageLessons.filter((l) => progress[l.id]).length;
            const stagePct =
              stageLessons.length > 0
                ? Math.round((stageDone / stageLessons.length) * 100)
                : 0;
            const firstOpen =
              stageLessons.find((l) => !progress[l.id]) || stageLessons[0];

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
        chapters={CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) => navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)}
      />

      <LearnChapterGrid chapters={CHAPTERS} progress={progress} basePath={BASE_PATH} navigate={navigate} />
      <CourseCertificate courseName="C++ STL" totalLessons={ALL_LESSONS.length} completedCount={completedCount} earnedXP={earnedXP} totalXP={TOTAL_XP} />
    </div>
  );
}
