# C Pointers — Course Guide

## What is this course?

**C Pointers** teaches C programming from the ground up with real-compiled C challenges.

**Live URL:** `/learn/c-pointers`

---

## Chapters

- **Pointer Basics** (3 lessons)
- **Pointer Arithmetic** (3 lessons)
- **Pointers & Arrays** (3 lessons)
- **Pointers & Strings** (3 lessons)
- **Advanced Pointers** (3 lessons)

---

## Folder structure

```
c-pointers/
├── COURSE_GUIDE.md
├── data/
│   ├── c_pointersCurriculum.js      ← lessons, theory, quizzes, challenges
│   └── c_pointersVideoLinks.js      ← YouTube URLs (keyed by lesson id)
├── hooks/
│   └── useCPointersProgress.js  ← localStorage progress
└── pages/
    ├── CPointersHub.jsx            ← Course home page
    └── CPointersLessonPage.jsx         ← Single lesson page
```

---

## Routes (register in App.js)

```jsx
<Route path="/learn/c-pointers" element={<CPointersHub />} />
<Route path="/learn/c-pointers/lesson/:lessonId" element={<CPointersLessonPage />} />
```

## courseCatalog.js changes needed

Add `"c"` key entries to `languageCourses`, `learnNavByLanguage`, `courseStackGroups`, and `inferLanguageFromLearnPath`. See the generated `courseCatalog_C_additions.js` file.

---

## Quick tips

1. Lesson ids follow the pattern `c_pointers-<chapter>-<lesson>` (e.g. `c_pointers-0-0`)  
2. Add YouTube video URLs to `c_pointersVideoLinks.js` keyed by lesson id  
3. Challenges use the shared `../shared/CCodeChallenge.jsx` (Monaco editor, Run & Submit, Solution, tests). Code runs on the backend through `../shared/runC.js` → `POST /api/challenges/run-c` (gcc)  
4. Challenge tests can check output (`expectedOutput` for an exact match, `outputIncludes` for substrings) and/or source (`keywords`). A test with no checks passes once the program compiles and exits with code 0. Optional `stdin` on the challenge is passed to the program
