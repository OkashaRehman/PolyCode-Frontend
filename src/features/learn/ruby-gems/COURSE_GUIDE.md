# Ruby Gems — Course Guide

## What is this course?

**Ruby Gems** teaches the **RubyGems** ecosystem — packages, Bundler, Gemfiles, gemspecs, semantic versioning, dependency resolution, testing, publishing, and professional library design. Each lesson has theory (with a quiz), then a hands-on **Ruby challenge** that runs in the browser.

**Live URL:** `/learn/ruby-gems`

**Who it's for:** Learners who finished (or are doing) Ruby Fundamentals and want to package, test, and publish real Ruby libraries.

---

## Folder structure (simple map)

```
ruby-gems/
├── COURSE_GUIDE.md
├── data/                    ← Lessons & videos
├── hooks/                   ← Progress saving
└── pages/                   ← Hub + lesson screens
```

*(No `components/` folder — this course reuses shared theory/challenge components.)*

---

## What each file does

### `data/`

| File | What it holds |
|------|----------------|
| **rubyGemsCurriculum.js** | All 8 chapters, 24 lessons, theory, quizzes, and Ruby challenges. **Main content file.** |
| **rubyGemsLessonEnhancements.js** | W3-style reference blocks merged onto each lesson (applied via `applyRubyGemsEnhancements`). |
| **rubyGemsVideoLinks.js** | YouTube links per lesson id — currently empty, add real video URLs here. |

### `hooks/`

| File | What it does |
|------|----------------|
| **useRubyGemsProgress.js** | Saves completed lessons, bookmarks, and last-visited lesson in the user's account/localStorage. |

### `pages/`

| File | What it does |
|------|----------------|
| **RubyGemsHub.jsx** | Course home: XP bar, chapter path overview, chapter grid, search/filter, bookmarks. |
| **RubyGemsLessonPage.jsx** | Single lesson page (theory + challenge tabs). |

---

## Chapters

1. **RubyGems Ecosystem** — what gems are, RubyGems.org, `require`, `$LOAD_PATH`
2. **Bundler Basics** — why Bundler, Gemfile, Gemfile.lock reproducibility
3. **Building a Gem** — folder structure, module namespacing, VERSION & entry point
4. **Gemspec Mastery** — gemspec fields, semver parsing, runtime vs dev dependencies
5. **Dependencies** — version constraints (`~>`), resolver behavior, optional deps
6. **Testing Gems** — Minitest basics, API design, YARD/RDoc comments
7. **Publishing** — build workflow, publish checklist, security & trust
8. **Pro & Capstone** — popular gem patterns, private gem sources, capstone project

---

## Borrowed from other folders

| From | Used for |
|------|----------|
| `shared/LearnChapterPathOverview.jsx` | Chapter path visualization on the hub |
| `shared/LearnChapterGrid.jsx` | Chapter/lesson grid on the hub |
| `shared/` | Read gate, videos, annotations, `runRuby` challenge runner |

---

## Registration

- **Catalog:** `frontend/src/features/language/courseCatalog.js` (`ruby` stack)
- **Routes:** `frontend/src/App.js` — `/learn/ruby-gems`, `/learn/ruby-gems/lesson/:lessonId`
- **Progress slug:** `ruby-gems`

---

## Quick tips for editors

1. Edit lesson content in **`data/rubyGemsCurriculum.js`**
2. Add W3-style reference boxes in **`data/rubyGemsLessonEnhancements.js`**
3. Add real videos in **`data/rubyGemsVideoLinks.js`**
4. Lesson ids look like `rbgem-0`, `rbgem-1`, etc. — keep ids stable when adding links
