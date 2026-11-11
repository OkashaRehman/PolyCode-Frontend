import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCoursesPath } from "../../learn/shared/allCourses";

function pathIsActive(pathname, path) {
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function LearnNavDropdown({ group, pathname }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, group?.id]);

  if (!group?.courses?.length) return null;

  const { id, label, courses, accent } = group;
  const allCoursesPath = getAllCoursesPath(id);
  const groupActive = courses.some((item) => pathIsActive(pathname, item.to));

  if (courses.length === 1) {
    const item = courses[0];
    return (
      <Link
        to={item.to}
        className={pathIsActive(pathname, item.to) ? "active" : ""}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className={`navbar-learn-menu${open ? " navbar-learn-menu--open" : ""}`}
      ref={menuRef}
    >
      <button
        type="button"
        className={`navbar-learn-trigger${groupActive ? " active" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        style={accent ? { "--learn-accent": accent } : undefined}
      >
        <span className="navbar-learn-trigger-label">{label}</span>
        <span className="navbar-learn-chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {open ? (
        <div className="navbar-learn-panel" role="menu" aria-label={`${label} courses`}>
          <Link
            to={allCoursesPath}
            className="navbar-learn-panel-all"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            All {label} courses
          </Link>
          <div className="navbar-learn-panel-divider" aria-hidden="true" />
          {courses.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`navbar-learn-panel-item${
                pathIsActive(pathname, item.to) ? " active" : ""
              }`}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
