import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CourseCertificate from "../../CourseCertificate";
import LearnChapterGrid from "../../LearnChapterGrid";
import LearnChapterPathOverview from "../../LearnChapterPathOverview";
import {
  getPowerShellSpecializationTrack,
  POWERSHELL_SPECIALIZATION_TRACKS,
} from "../data/powershellSpecializationCurricula";
import usePowershellSpecializationProgress from "../hooks/usePowershellSpecializationProgress";

export default function PowershellSpecializationHub() {
  const location = useLocation();
  const navigate = useNavigate();
  const slug = location.pathname.split("/")[2];
  const track =
    getPowerShellSpecializationTrack(slug) ||
    POWERSHELL_SPECIALIZATION_TRACKS["powershell-security"];
  const {
    isAuthenticated,
    completedMap: progress,
    lastLessonId,
  } = usePowershellSpecializationProgress(track);
  const completedCount = Object.keys(progress).length;
  const earnedXp = track.lessons
    .filter((item) => progress[item.id])
    .reduce((sum, item) => sum + item.xp, 0);
  const nextLesson =
    track.lessons.find((item) => !progress[item.id]) || track.lessons[0];
  const resumeLesson =
    track.lessons.find((item) => item.id === lastLessonId) || nextLesson;
  const basePath = `/learn/${track.slug}`;

  return (
    <div className="oops-hub powershell-specialization-hub">
      <div className="oops-hero">
        <Link
          to="/language/POWERSHELL"
          className="oops-back-btn"
          style={{ marginBottom: "0.75rem", display: "inline-flex" }}
        >
          ← PowerShell courses
        </Link>
        <div className="oops-hero-badge">POWERSHELL · INTERACTIVE COURSE</div>
        <h1 className="oops-hero-title">{track.title}</h1>
        <p className="oops-hero-sub">{track.description}</p>
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
            onClick={() => navigate(`${basePath}/lesson/${resumeLesson.id}`)}
          >
            {completedCount > 0 ? "Resume course" : "Start course"}
          </button>
        </div>
      </div>

      <div className="oops-dashboard-strip">
        <div className="oops-stat-tile">
          <span>Lessons</span>
          <strong>
            {completedCount}/{track.lessons.length}
          </strong>
        </div>
        <div className="oops-stat-tile">
          <span>Chapters</span>
          <strong>{track.chapters.length}</strong>
        </div>
        <div className="oops-stat-tile">
          <span>XP</span>
          <strong>
            {earnedXp}/{track.totalXp}
          </strong>
        </div>
      </div>

      <LearnChapterPathOverview
        chapters={track.chapters}
        progress={progress}
        onChapterSelect={(chapter) =>
          navigate(`${basePath}/lesson/${chapter.lessons[0].id}`)
        }
      />
      <LearnChapterGrid
        chapters={track.chapters}
        progress={progress}
        basePath={basePath}
        navigate={navigate}
      />
      <CourseCertificate
        courseId={track.courseId}
        totalLessons={track.lessons.length}
        completedCount={completedCount}
      />
    </div>
  );
}
