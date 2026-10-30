import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CPP_DATA_STRUCTURES_CHAPTERS,
  CPP_DATA_STRUCTURES_LESSONS,
  CPP_DATA_STRUCTURES_TOTAL_XP,
} from "../data/cppDataStructuresCurriculum";
import useCppDataStructuresProgress from "../hooks/useCppDataStructuresProgress";
import LearnChapterPathOverview from "../../shared/LearnChapterPathOverview";
import LearnChapterGrid from "../../shared/LearnChapterGrid";
import CourseCertificate from "../../shared/CourseCertificate";

const BASE_PATH = "/learn/cpp-data-structures";

function lessonPlainText(lesson) {
  return lesson.theory
    .filter((block) => block.type === "text" || block.type === "callout")
    .map((block) => (block.content || "").replace(/\*\*/g, "").replace(/`/g, ""))
    .join(" ");
}

export default function CppDataStructuresHub() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const {
    isAuthenticated,
    completedMap: progress,
    bookmarks,
    lastLessonId,
  } = useCppDataStructuresProgress();

  const completedCount = Object.keys(progress).length;
  const earnedXP = CPP_DATA_STRUCTURES_LESSONS.filter(
    (l) => progress[l.id],
  ).reduce((s, l) => s + l.xp, 0);
  const pct =
    Math.round((completedCount / CPP_DATA_STRUCTURES_LESSONS.length) * 100) || 0;
  const nextLesson =
    CPP_DATA_STRUCTURES_LESSONS.find((lesson) => !progress[lesson.id]) ||
    CPP_DATA_STRUCTURES_LESSONS[0];
  const resumeLesson =
    CPP_DATA_STRUCTURES_LESSONS.find((lesson) => lesson.id === lastLessonId) ||
    nextLesson;
  const completedChapters = CPP_DATA_STRUCTURES_CHAPTERS.filter((ch) =>
    ch.lessons.every((lesson) => progress[lesson.id]),
  ).length;
  const bookmarkedLessons = bookmarks
    .map((id) => CPP_DATA_STRUCTURES_LESSONS.find((lesson) => lesson.id === id))
    .filter(Boolean);

  const filteredLessons = useMemo(() => {
    const query = search.trim().toLowerCase();
    return CPP_DATA_STRUCTURES_LESSONS.filter((lesson) => {
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
    <div className="oops-hub dsa-hub">
      <div className="oops-hero dsa-hero">
        <Link
          to="/language/C++"
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← C++ courses
        </Link>
        <div className="oops-hero-badge">C++ · DATA STRUCTURES TRACK</div>
        <h1 className="oops-hero-title">
          Data Structures
          <br />
          <span className="oops-hero-accent">from the machine up (C++)</span>
        </h1>
        <p className="oops-hero-sub">
          Complexity limits and the CPU fetch–decode–execute–write cycle, the
          linear vs non-linear map, every list and linked-list variant, skip
          lists, stacks / queues / deques, hashing with collisions and indexing,
          BST &amp; AVL, min/max heaps, graphs, and Huffman compression — with
          hands-on C++ challenges on the structures you implement yourself.
        </p>

        <div className="oops-hero-grid">
          <div className="oops-xp-bar-wrap">
            <div className="oops-xp-meta">
              <span>
                {isAuthenticated
                  ? `${completedCount}/${CPP_DATA_STRUCTURES_LESSONS.length} lessons · ${earnedXP}/${CPP_DATA_STRUCTURES_TOTAL_XP} XP`
                  : `Sign in to track progress · ${CPP_DATA_STRUCTURES_LESSONS.length} lessons`}
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
                Create a free account to run C++ challenges, earn XP, and save
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
              {completedCount > 0
                ? "Resume C++ Data Structures"
                : "Start C++ Data Structures"}
            </button>
          </div>
        </div>
      </div>

      <div className="oops-guide-tools">
        <div className="oops-tool-panel oops-tool-panel-main">
          <span className="oops-interactive-label">Find a topic</span>
          <div className="oops-search-row">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search linked list, hashing, AVL, Huffman..."
              aria-label="Search C++ Data Structures lessons"
            />
            <div
              className="oops-filter-tabs"
              aria-label="Filter C++ Data Structures lessons"
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
            {completedCount}/{CPP_DATA_STRUCTURES_LESSONS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>
            {completedChapters}/{CPP_DATA_STRUCTURES_CHAPTERS.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>
            {earnedXP}/{CPP_DATA_STRUCTURES_TOTAL_XP}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Bookmarks</span>
          <strong>{bookmarks.length}</strong>
        </div>
      </div>

      <LearnChapterPathOverview
        chapters={CPP_DATA_STRUCTURES_CHAPTERS}
        progress={progress}
        onChapterSelect={(chapter) =>
          navigate(`${BASE_PATH}/lesson/${chapter.lessons[0].id}`)
        }
      />

      <LearnChapterGrid
        chapters={CPP_DATA_STRUCTURES_CHAPTERS}
        progress={progress}
        basePath={BASE_PATH}
        navigate={navigate}
      />
      <CourseCertificate
        courseName="C++ Data Structures"
        totalLessons={CPP_DATA_STRUCTURES_LESSONS.length}
        completedCount={completedCount}
        earnedXP={earnedXP}
        totalXP={CPP_DATA_STRUCTURES_TOTAL_XP}
      />
    </div>
  );
}
