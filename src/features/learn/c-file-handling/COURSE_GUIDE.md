# C File Handling — Course Guide

## What is this course?

**C File Handling** teaches C programming from the ground up with real-compiled C challenges.

**Live URL:** `/learn/c-file-handling`

---

## Chapters

- **File Basics** (3 lessons)
- **Reading Files** (3 lessons)
- **Writing Files** (3 lessons)
- **File Navigation** (3 lessons)
- **Practical Projects** (3 lessons)

---

## Folder structure

```
c-file-handling/
├── COURSE_GUIDE.md
├── data/
│   ├── c_file_handlingCurriculum.js      ← lessons, theory, quizzes, challenges
│   └── c_file_handlingVideoLinks.js      ← YouTube URLs (keyed by lesson id)
├── hooks/
│   └── useCFileHandlingProgress.js  ← localStorage progress
└── pages/
    ├── CFileHandlingHub.jsx            ← Course home page
    └── CFileHandlingLessonPage.jsx         ← Single lesson page
```

---

## Routes (register in App.js)

```jsx
<Route path="/learn/c-file-handling" element={<CFileHandlingHub />} />
<Route path="/learn/c-file-handling/lesson/:lessonId" element={<CFileHandlingLessonPage />} />
```

## courseCatalog.js changes needed

Add `"c"` key entries to `languageCourses`, `learnNavByLanguage`, `courseStackGroups`, and `inferLanguageFromLearnPath`. See the generated `courseCatalog_C_additions.js` file.

---

## Quick tips

1. Lesson ids follow the pattern `c_file_handling-<chapter>-<lesson>` (e.g. `c_file_handling-0-0`)  
2. Add YouTube video URLs to `c_file_handlingVideoLinks.js` keyed by lesson id  
3. Challenges use the shared `../shared/CCodeChallenge.jsx` (Monaco editor, Run & Submit, Solution, tests). Code runs on the backend through `../shared/runC.js` → `POST /api/challenges/run-c` (gcc)  
4. Challenge tests can check output (`expectedOutput` for an exact match, `outputIncludes` for substrings) and/or source (`keywords`). A test with no checks passes once the program compiles and exits with code 0. Optional `stdin` on the challenge is passed to the program
