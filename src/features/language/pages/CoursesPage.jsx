import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, BookOpen, Layers3 } from "lucide-react";
import { COURSE_GROUPS } from "../../learn/shared/allCourses";

function scrollCoursesToTop() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const behavior = prefersReducedMotion ? "auto" : "smooth";

  window.scrollTo({ top: 0, left: 0, behavior });
  document
    .querySelectorAll(".main-content, .learn-content")
    .forEach((node) => {
      node.scrollTo({ top: 0, left: 0, behavior });
    });
}

export default function CoursesPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const stackParam = (params.get("stack") || "").trim().toLowerCase();
  const [panelKey, setPanelKey] = useState(stackParam || "default");
  const [panelAnimating, setPanelAnimating] = useState(false);
  const skipFirstScroll = useRef(true);

  const activeGroup = useMemo(() => {
    if (!stackParam) return COURSE_GROUPS[0] || null;
    return (
      COURSE_GROUPS.find((group) => group.id === stackParam) ||
      COURSE_GROUPS[0] ||
      null
    );
  }, [stackParam]);

  useEffect(() => {
    if (!activeGroup) return;

    setPanelKey(activeGroup.id);
    setPanelAnimating(true);
    const timer = window.setTimeout(() => setPanelAnimating(false), 420);

    if (skipFirstScroll.current) {
      skipFirstScroll.current = false;
    } else {
      scrollCoursesToTop();
    }

    return () => window.clearTimeout(timer);
  }, [activeGroup]);

  const selectStack = (stackId) => {
    if (stackId === activeGroup?.id) {
      scrollCoursesToTop();
      return;
    }
    navigate(`/courses?stack=${encodeURIComponent(stackId)}`, { replace: true });
  };

  if (!COURSE_GROUPS.length || !activeGroup) {
    return (
      <main className="language-landing">
        <section className="language-course-section">
          <p>No courses available yet.</p>
          <Link to="/select-language">Choose a language</Link>
        </section>
      </main>
    );
  }

  return (
    <main
      className="language-landing courses-catalog-page"
      style={{ "--language-color": activeGroup.accent || "#00d4ff" }}
    >
      <section className="language-landing-hero">
        <div className="language-hero-copy">
          <span className="language-hero-kicker">
            <Layers3 size={15} />
            All PolyCode courses
          </span>
          <h1>{activeGroup.label}</h1>
          <p>
            Browse every interactive track for {activeGroup.label}. Pick a stack
            on the left, then open any course card to start learning.
          </p>
          <div className="language-hero-actions">
            <Link className="language-primary-btn" to="/courses">
              <BookOpen size={18} />
              All courses
            </Link>
            <Link className="language-secondary-btn" to="/select-language">
              All stacks
            </Link>
          </div>
        </div>
      </section>

      <section className="language-course-section courses-catalog-layout">
        <aside className="courses-catalog-stacks" aria-label="Course stacks">
          {COURSE_GROUPS.map((group) => (
            <button
              key={group.id}
              type="button"
              className={`courses-catalog-stack${
                group.id === activeGroup.id ? " courses-catalog-stack--active" : ""
              }`}
              style={{ "--stack-accent": group.accent }}
              onClick={() => selectStack(group.id)}
            >
              <span>{group.label}</span>
              <span className="courses-catalog-stack-count">
                {group.courses.length}
              </span>
            </button>
          ))}
        </aside>

        <div
          key={panelKey}
          className={`courses-catalog-main${
            panelAnimating ? " courses-catalog-main--enter" : ""
          }`}
        >
          <div className="language-section-head">
            <span>Available Courses</span>
            <h2>
              {activeGroup.courses.length} {activeGroup.label} course
              {activeGroup.courses.length === 1 ? "" : "s"}
            </h2>
          </div>
          <div className="language-course-grid">
            {activeGroup.courses.map((course) => {
              const Icon = course.icon;
              return (
                <Link
                  key={course.href}
                  to={course.href}
                  className="language-course-card"
                  style={{
                    "--course-accent": course.accent || activeGroup.accent,
                  }}
                >
                  <div className="language-course-icon">
                    {Icon ? <Icon size={22} /> : null}
                  </div>
                  <span>{course.tag}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <strong>
                    Start <ArrowRight size={16} />
                  </strong>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
