import React from "react";
import { Link } from "react-router-dom";
import {
  COURSE_DISPLAY_NAMES,
  PROFILE_FEATURED_TRACKS,
} from "../profileCourseCatalog";

const FEATURED_LESSON_COUNTS = PROFILE_FEATURED_TRACKS.reduce((acc, track) => {
  acc[track.courseId] = track.lessons.length;
  return acc;
}, {});

const FEATURED_HREFS = PROFILE_FEATURED_TRACKS.reduce((acc, track) => {
  acc[track.courseId] = track.href;
  return acc;
}, {});

function courseHref(courseId) {
  return FEATURED_HREFS[courseId] || `/learn/${courseId}`;
}

function courseTitle(courseId) {
  return COURSE_DISPLAY_NAMES[courseId] || courseId;
}

function formatWhen(dateValue) {
  if (!dateValue) return "No recent activity";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "No recent activity";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * All Mongo courses for the profile dashboard, sorted by recent activity.
 */
export default function AllCoursesList({ courses = [], showEngagement = false }) {
  if (!courses.length) {
    return (
      <section className="profile-all-courses">
        <div className="profile-section-heading">
          <span>All courses</span>
          <h2>Learning across PolyCode</h2>
        </div>
        <p className="profile-all-courses-empty">
          No course progress yet. Complete a lesson to see it here.
        </p>
      </section>
    );
  }

  return (
    <section className="profile-all-courses">
      <div className="profile-section-heading">
        <span>All courses</span>
        <h2>Learning across PolyCode</h2>
      </div>
      <ul className="profile-all-courses-list">
        {courses.map((course) => {
          const lessonTotal = FEATURED_LESSON_COUNTS[course.courseId];
          const completed = course.completedCount || 0;
          const pct =
            lessonTotal > 0
              ? Math.round((completed / lessonTotal) * 100) || 0
              : null;

          return (
            <li key={course.courseId} className="profile-all-courses-item">
              <div className="profile-all-courses-main">
                <div>
                  <span>{formatWhen(course.lastActiveDate)}</span>
                  <h3>{courseTitle(course.courseId)}</h3>
                </div>
                <strong>
                  {pct !== null
                    ? `${pct}%`
                    : `${completed} lesson${completed === 1 ? "" : "s"}`}
                </strong>
              </div>
              <div className="profile-all-courses-meta">
                <span>{course.totalXp || 0} XP</span>
                <span>{course.minutes || 0} min</span>
                <span>{course.streak || 0}d streak</span>
                {showEngagement ? (
                  <>
                    <span>{course.lessonsRead || 0} read</span>
                    <span>{course.quizAnswered || 0} quizzes</span>
                  </>
                ) : null}
                <Link to={courseHref(course.courseId)}>Open</Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
