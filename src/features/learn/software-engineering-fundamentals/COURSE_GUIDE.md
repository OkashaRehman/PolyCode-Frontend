# Introduction to Software Engineering — Course Guide

## What is this course?

**Introduction to Software Engineering** is PolyCode's **theory-only**
foundations course: why software engineering exists, how software projects
succeed or fail (the Standish Group CHAOS Report), the Software Development
Life Cycle (SDLC), what shapes a project's structure, why the discipline is
worth studying, and how engineers solve problems by decomposing them into
smaller, unequal solutions that get combined into one system. There are
**no code challenges** — this is deliberate, since the goal is conceptual
grounding before any language-specific course.

**Live URL:** `/learn/software-engineering-fundamentals`

**Who it's for:** Anyone starting out who wants the "why" and "how projects
actually work" behind software before diving into a specific language track.

**Current scope:** This build covers **Section 1 — Overview** only (6
lessons, 1 chapter). More sections (Requirements Engineering, Design,
Testing, Deployment & Maintenance, Project Management, …) can be added later
as additional chapters — see "Adding more sections" below.

---

## Folder structure

```
software-engineering-fundamentals/
├── COURSE_GUIDE.md
├── data/
│   ├── softwareEngineeringFundamentalsCurriculum.js
│   └── softwareEngineeringFundamentalsVideoLinks.js
├── hooks/
│   └── useSoftwareEngineeringFundamentalsProgress.js
└── pages/
    ├── SoftwareEngineeringFundamentalsHub.jsx
    └── SoftwareEngineeringFundamentalsLessonPage.jsx
```

This mirrors `quantum-mechanics-for-programmers/` exactly (same theory-only
shape), so any fix made there for the shared theory renderer applies here
too.

---

## Quick tips for editors

1. Lesson ids: `se-0` … `se-5` (6 lessons in the `se-overview` chapter).
2. Edit **`data/softwareEngineeringFundamentalsCurriculum.js`** for lesson
   content — every lesson object has `id`, `title`, `xp`, `theory[]`, and
   **no `challenge` field**. Don't add one without also updating the lesson
   page to render a Challenge tab.
3. `theory` blocks used here: `objectives`, `text` (supports `**bold**`,
   `` `code` ``, and `- ` bullet lists), `diagram`, `callout`, and `quiz`.
4. Edit **`data/softwareEngineeringFundamentalsVideoLinks.js`** for video
   URLs (currently empty).

### Adding more sections

To add Section 2 (e.g. "Requirements Engineering"), append a new chapter
object to `RAW_SOFTWARE_ENGINEERING_FUNDAMENTALS_CHAPTERS` in the curriculum
file, following the exact shape of the `se-overview` chapter — new `id`,
`title`, `icon`, `color`, and a `lessons[]` array using the next free `se-N`
ids. Nothing else needs to change; the Hub and Lesson pages, XP totals, and
sidebar all derive from that array automatically. Also add a new stage to
`LEARNING_PATH` in `SoftwareEngineeringFundamentalsHub.jsx` so the new
chapter shows up in the "Your path" section.

---

## Still needs to be done outside this folder

These were wired up as part of creating this course (see the diff for
exact locations) — listed here for reference if the course is ever moved
or renamed:

1. **Routes** — registered in `App.js`'s `LEARN_COURSE_ROUTES` array:
   - `/learn/software-engineering-fundamentals`
   - `/learn/software-engineering-fundamentals/lesson/:lessonId`
2. **Progress sync** — registered in
   `frontend/src/features/learn/shared/courseRegistry.js` and
   `backend/src/modules/auth/constants/courseIds.js`.
3. **Navigation & catalog** — registered as a new "Software Engineering"
   stack in `frontend/src/features/language/courseCatalog.js`
   (`courseStackGroups`, `languageCourses`, `learnNavByLanguage`,
   `inferLanguageFromLearnPath`).
