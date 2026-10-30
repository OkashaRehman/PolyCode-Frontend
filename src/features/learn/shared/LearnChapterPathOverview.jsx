import React from "react";
import LearnChapterIcon from "./LearnChapterIcon";

export default function LearnChapterPathOverview({
  chapters = [],
  progress = {},
  onChapterSelect,
}) {
  if (!Array.isArray(chapters) || chapters.length === 0) {
    return null;
  }

  return (
    <div className="oops-path-overview oops-path-overview--visual">
      {chapters.map((chapter, index) => {
        const lessons = chapter.lessons || [];
        const done = lessons.filter((lesson) => progress[lesson.id]).length;
        const total = lessons.length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        const active = done > 0 && done < total;
        const complete = total > 0 && done === total;

        return (
          <button
            key={chapter.id}
            type="button"
            className={`oops-path-step ${active ? "active" : ""} ${complete ? "done" : ""}`}
            onClick={() => onChapterSelect?.(chapter)}
          >
            <span className="oops-path-step-icon" aria-hidden>
              <LearnChapterIcon icon={chapter.icon} size={20} />
            </span>
            <span className="oops-path-step-body">
              <span className="oops-path-step-num">Chapter {index + 1}</span>
              <strong>{chapter.title}</strong>
            </span>
            <span
              className="oops-path-step-progress"
              aria-label={`${pct}% complete`}
              title={`${done}/${total} lessons`}
            >
              <span style={{ width: `${pct}%` }} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
