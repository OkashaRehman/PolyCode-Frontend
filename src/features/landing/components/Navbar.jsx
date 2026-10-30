import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { getLanguages } from "../../docs/services/api";
import { COURSE_GROUPS, COURSE_PANEL_LIMIT, STACK_NAV_LIMIT, getAllCoursesPath } from "../../learn/shared/allCourses";
import ThemeSettingsMenu from "../../../shared/theme/ThemeSettingsMenu";

const NAV_LINKS = [
  { href: "#modules", label: "Features" },
  { href: "/playground", label: "Playground" },
];

export default function Navbar({ theme = "dark", onThemeChange }) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState(null);
  const [activeCourseGroup, setActiveCourseGroup] = useState(
    COURSE_GROUPS[0]?.id ?? null,
  );
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [languages, setLanguages] = useState([]);
  const coursesRef = useRef(null);
  const langRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const nav = document.querySelector(".landing-navbar");
    const onScroll = () =>
      nav?.classList.toggle("landing-navbar--scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    getLanguages()
      .then(({ data }) => {
        setLanguages(Array.isArray(data.languages) ? data.languages : []);
      })
      .catch(() => setLanguages([]));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (coursesRef.current && !coursesRef.current.contains(target)) {
        setCoursesOpen(false);
      }
      if (langRef.current && !langRef.current.contains(target)) {
        setLangOpen(false);
      }
    };
    // Use click (not mousedown) so in-dropdown links/buttons receive the
    // activating event before menus close due to document outside-click.
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileCoursesOpen(false);
    setMobileLangOpen(false);
    setMobileExpandedGroup(null);
  };

  const activeGroup =
    COURSE_GROUPS.find((group) => group.id === activeCourseGroup) ||
    COURSE_GROUPS[0] ||
    null;

  const hasMoreStacks = COURSE_GROUPS.length > STACK_NAV_LIMIT;
  const visibleStacks = useMemo(
    () =>
      hasMoreStacks
        ? COURSE_GROUPS.slice(0, STACK_NAV_LIMIT)
        : COURSE_GROUPS,
    [hasMoreStacks],
  );

  useEffect(() => {
    if (
      activeCourseGroup &&
      !visibleStacks.some((group) => group.id === activeCourseGroup)
    ) {
      setActiveCourseGroup(visibleStacks[0]?.id ?? null);
    }
  }, [activeCourseGroup, visibleStacks]);

  useEffect(() => {
    if (coursesOpen && COURSE_GROUPS[0] && !activeCourseGroup) {
      setActiveCourseGroup(COURSE_GROUPS[0].id);
    }
  }, [coursesOpen, activeCourseGroup]);

  const closeMenus = () => {
    setCoursesOpen(false);
    setLangOpen(false);
    closeMobile();
  };

  const handleNav = (href) => {
    closeMenus();
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <header className="landing-navbar">
        <div className="landing-container">
          <div className="landing-navbar-inner">
            <button
              type="button"
              className="landing-mobile-menu-btn"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <a href="#top" className="landing-brand">
              <div className="landing-brand-mark">
                <img
                  src="/images/polycode-logo.png"
                  alt="PolyCode Logo"
                  className="landing-logo"
                />
              </div>
              <div className="landing-brand-text">
                <span className="landing-logo-text">PolyCode</span>
                <span className="landing-logo-sub">AI Learning Platform</span>
              </div>
            </a>

            <nav className="landing-nav-links">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  className="landing-nav-link"
                  onClick={() => handleNav(link.href)}
                >
                  {link.label}
                </button>
              ))}

              <div className="ln-dropdown-wrap" ref={coursesRef}>
                <button
                  className={`landing-nav-link ln-dropdown-trigger${coursesOpen ? " ln-dropdown-trigger--open" : ""}`}
                  onClick={() => {
                    setCoursesOpen((o) => !o);
                    setLangOpen(false);
                  }}
                  aria-expanded={coursesOpen}
                >
                  Courses
                  <ChevronDown size={13} className="ln-chevron" />
                </button>

                {coursesOpen && (
                  <div className="ln-dropdown ln-dropdown--grouped">
                    <p className="ln-dropdown-label">Browse by stack</p>
                    <div className="ln-course-groups-wrap">
                      <div className="ln-course-groups">
                        <div
                          className="ln-course-groups-nav"
                          role="tablist"
                          aria-label="Course stacks"
                        >
                          {visibleStacks.map((group) => (
                            <button
                              key={group.id}
                              type="button"
                              role="tab"
                              aria-selected={activeGroup?.id === group.id}
                              className={`ln-course-group-tab${
                                activeGroup?.id === group.id
                                  ? " ln-course-group-tab--active"
                                  : ""
                              }`}
                              style={{ "--stack-accent": group.accent }}
                              onMouseEnter={() => setActiveCourseGroup(group.id)}
                              onFocus={() => setActiveCourseGroup(group.id)}
                              onClick={() => setActiveCourseGroup(group.id)}
                            >
                              <span className="ln-course-group-tab-label">
                                {group.label}
                              </span>
                              <span className="ln-course-group-tab-count">
                                {group.courses.length}
                              </span>
                            </button>
                          ))}
                        </div>

                        {activeGroup ? (
                          <div
                            className="ln-course-groups-panel"
                            role="tabpanel"
                            aria-label={`${activeGroup.label} courses`}
                          >
                            <p className="ln-course-groups-panel-title">
                              {activeGroup.label} courses
                            </p>
                            {(activeGroup.courses.length > COURSE_PANEL_LIMIT
                              ? activeGroup.courses.slice(0, COURSE_PANEL_LIMIT)
                              : activeGroup.courses
                            ).map((course) => {
                              const Icon = course.icon;
                              return (
                                <button
                                  key={course.href}
                                  type="button"
                                  className="ln-dropdown-item ln-dropdown-item--sub"
                                  style={{ "--lang-accent": course.accent }}
                                  onClick={() => handleNav(course.href)}
                                >
                                  <div className="ln-dropdown-icon">
                                    <Icon size={15} />
                                  </div>
                                  <div className="ln-dropdown-text">
                                    <span className="ln-dropdown-name">
                                      {course.title}
                                    </span>
                                    <span className="ln-dropdown-sub">
                                      {course.tag}
                                    </span>
                                  </div>
                                  <ArrowRight
                                    size={13}
                                    className="ln-dropdown-arrow"
                                  />
                                </button>
                              );
                            })}
                            <button
                              type="button"
                              className={
                                activeGroup.courses.length > COURSE_PANEL_LIMIT
                                  ? "ln-course-group-see-all"
                                  : "ln-course-group-all"
                              }
                              style={{ "--stack-accent": activeGroup.accent }}
                              onClick={() =>
                                handleNav(getAllCoursesPath(activeGroup.id))
                              }
                            >
                              {activeGroup.courses.length > COURSE_PANEL_LIMIT
                                ? `See all ${activeGroup.courses.length} ${activeGroup.label} courses`
                                : `All ${activeGroup.label} courses`}
                              <ArrowRight size={13} />
                            </button>
                          </div>
                        ) : null}
                      </div>

                      <Link
                        to={getAllCoursesPath()}
                        className="ln-course-groups-view-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          closeMenus();
                        }}
                      >
                        View all courses
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="ln-dropdown-wrap" ref={langRef}>
                <button
                  className={`landing-nav-link ln-dropdown-trigger${langOpen ? " ln-dropdown-trigger--open" : ""}`}
                  onClick={() => {
                    setLangOpen((o) => !o);
                    setCoursesOpen(false);
                  }}
                  aria-expanded={langOpen}
                >
                  Languages
                  <ChevronDown size={13} className="ln-chevron" />
                </button>

                {langOpen && (
                  <div className="ln-dropdown ln-dropdown--languages">
                    <p className="ln-dropdown-label">Pick a Language</p>
                    {languages.length === 0 ? (
                      <p className="ln-dropdown-empty">Loading…</p>
                    ) : (
                      <div className="ln-lang-grid">
                        {languages.map((lang) => (
                          <button
                            key={lang}
                            className="ln-lang-item"
                            onClick={() =>
                              handleNav(`/language/${encodeURIComponent(lang)}`)
                            }
                          >
                            <span className="ln-lang-name">{lang}</span>
                            <ArrowRight size={11} className="ln-lang-arrow" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </nav>

            <div className="landing-navbar-actions">
              <ThemeSettingsMenu
                theme={theme}
                onThemeChange={onThemeChange}
                buttonClassName="landing-theme-settings-btn"
                panelClassName="landing-theme-settings-panel"
              />
              <a href="#get-started" className="landing-btn-primary">
                Start Learning
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <button
          type="button"
          className="landing-mobile-backdrop"
          aria-label="Close menu"
          onClick={closeMobile}
        />
      ) : null}

      <aside
        className={`landing-mobile-drawer${mobileOpen ? " landing-mobile-drawer--open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="landing-mobile-drawer-head">
          <div className="landing-mobile-drawer-brand">
            <img
              src="/images/polycode-logo.png"
              alt=""
              className="landing-mobile-drawer-logo"
            />
            <span className="landing-mobile-drawer-title">PolyCode</span>
          </div>
          <button
            type="button"
            className="landing-mobile-drawer-close"
            aria-label="Close menu"
            onClick={closeMobile}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="landing-mobile-nav">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              className="landing-mobile-nav-link"
              onClick={() => handleNav(link.href)}
            >
              {link.label}
            </button>
          ))}

          <button
            type="button"
            className="landing-mobile-nav-link landing-mobile-nav-link--accordion"
            aria-expanded={mobileCoursesOpen}
            onClick={() => setMobileCoursesOpen((o) => !o)}
          >
            Courses
            <ChevronDown
              size={16}
              className={`landing-mobile-chevron${mobileCoursesOpen ? " landing-mobile-chevron--open" : ""}`}
            />
          </button>
          {mobileCoursesOpen ? (
            <div className="landing-mobile-subnav landing-mobile-subnav--grouped">
              {visibleStacks.map((group) => {
                const expanded = mobileExpandedGroup === group.id;
                return (
                  <div key={group.id} className="landing-mobile-course-group">
                    <button
                      type="button"
                      className="landing-mobile-course-group-trigger"
                      style={{ "--stack-accent": group.accent }}
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileExpandedGroup(expanded ? null : group.id)
                      }
                    >
                      <span>{group.label}</span>
                      <span className="landing-mobile-course-group-meta">
                        {group.courses.length} courses
                        <ChevronDown
                          size={14}
                          className={`landing-mobile-chevron${
                            expanded ? " landing-mobile-chevron--open" : ""
                          }`}
                        />
                      </span>
                    </button>
                    {expanded ? (
                      <div className="landing-mobile-course-group-items">
                        {(group.courses.length > COURSE_PANEL_LIMIT
                          ? group.courses.slice(0, COURSE_PANEL_LIMIT)
                          : group.courses
                        ).map((course) => {
                          const Icon = course.icon;
                          return (
                            <button
                              key={course.href}
                              type="button"
                              className="landing-mobile-subnav-link"
                              style={{ "--lang-accent": course.accent }}
                              onClick={() => handleNav(course.href)}
                            >
                              <Icon size={15} />
                              {course.title}
                            </button>
                          );
                        })}
                        <button
                          type="button"
                          className={
                            group.courses.length > COURSE_PANEL_LIMIT
                              ? "landing-mobile-course-group-see-all"
                              : "landing-mobile-course-group-all"
                          }
                          style={{ "--stack-accent": group.accent }}
                          onClick={() =>
                            handleNav(getAllCoursesPath(group.id))
                          }
                        >
                          {group.courses.length > COURSE_PANEL_LIMIT
                            ? `See all ${group.courses.length} courses`
                            : `All ${group.label} courses`}
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <Link
                to={getAllCoursesPath()}
                className="landing-mobile-course-groups-view-all"
                onClick={(e) => {
                  e.stopPropagation();
                  closeMenus();
                }}
              >
                View all courses
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : null}

          <button
            type="button"
            className="landing-mobile-nav-link landing-mobile-nav-link--accordion"
            aria-expanded={mobileLangOpen}
            onClick={() => setMobileLangOpen((o) => !o)}
          >
            Languages
            <ChevronDown
              size={16}
              className={`landing-mobile-chevron${mobileLangOpen ? " landing-mobile-chevron--open" : ""}`}
            />
          </button>
          {mobileLangOpen ? (
            <div className="landing-mobile-subnav landing-mobile-subnav--grid">
              {languages.length === 0 ? (
                <p className="ln-dropdown-empty">Loading…</p>
              ) : (
                languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    className="landing-mobile-subnav-link"
                    onClick={() =>
                      handleNav(`/language/${encodeURIComponent(lang)}`)
                    }
                  >
                    {lang}
                  </button>
                ))
              )}
            </div>
          ) : null}
        </nav>

        <div className="landing-mobile-drawer-foot">
          <button
            type="button"
            className="landing-mobile-cta"
            onClick={() => handleNav("#get-started")}
          >
            Start Learning
            <ArrowRight size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}
