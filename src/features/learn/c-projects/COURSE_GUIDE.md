# C Projects — Course Guide

## What is this course?

**C Projects** teaches C programming from the ground up with real-compiled C challenges.

**Live URL:** `/learn/c-projects`

---

## Chapters

- **Project Setup** (3 lessons)
- **Mini Calculator** (3 lessons)
- **Student Records System** (3 lessons)
- **File-Based To-Do App** (3 lessons)
- **Capstone Project** (3 lessons)

---

## Folder structure

```
c-projects/
├── COURSE_GUIDE.md
├── data/
│   ├── c_projectsCurriculum.js      ← lessons, theory, quizzes, challenges
│   └── c_projectsVideoLinks.js      ← YouTube URLs (keyed by lesson id)
├── hooks/
│   └── useCProjectsProgress.js  ← localStorage progress
└── pages/
    ├── CProjectsHub.jsx            ← Course home page
    └── CProjectsLessonPage.jsx         ← Single lesson page
```

---

## Routes (register in App.js)

```jsx
<Route path="/learn/c-projects" element={<CProjectsHub />} />
<Route path="/learn/c-projects/lesson/:lessonId" element={<CProjectsLessonPage />} />
```

## courseCatalog.js changes needed

Add `"c"` key entries to `languageCourses`, `learnNavByLanguage`, `courseStackGroups`, and `inferLanguageFromLearnPath`. See the generated `courseCatalog_C_additions.js` file.

---

## Quick tips

1. Lesson ids follow the pattern `c_projects-<chapter>-<lesson>` (e.g. `c_projects-0-0`)  
2. Add YouTube video URLs to `c_projectsVideoLinks.js` keyed by lesson id  
3. Challenges use the shared `../shared/CCodeChallenge.jsx` (Monaco editor, Run & Submit, Solution, tests). Code runs on the backend through `../shared/runC.js` → `POST /api/challenges/run-c` (gcc)  
4. Challenge tests can check output (`expectedOutput` for an exact match, `outputIncludes` for substrings) and/or source (`keywords`). A test with no checks passes once the program compiles and exits with code 0. Optional `stdin` on the challenge is passed to the program
