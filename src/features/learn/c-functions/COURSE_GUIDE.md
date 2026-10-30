# C Functions — Course Guide

## What is this course?

**C Functions** teaches C programming from the ground up with real-compiled C challenges.

**Live URL:** `/learn/c-functions`

---

## Chapters

- **Function Basics** (3 lessons)
- **Parameters & Arguments** (3 lessons)
- **Recursion** (3 lessons)
- **Scope & Storage** (3 lessons)
- **Function Pointers** (3 lessons)

---

## Folder structure

```
c-functions/
├── COURSE_GUIDE.md
├── data/
│   ├── c_functionsCurriculum.js      ← lessons, theory, quizzes, challenges
│   └── c_functionsVideoLinks.js      ← YouTube URLs (keyed by lesson id)
├── hooks/
│   └── useCFunctionsProgress.js  ← localStorage progress
└── pages/
    ├── CFunctionsHub.jsx            ← Course home page
    └── CFunctionsLessonPage.jsx         ← Single lesson page
```

---

## Routes (register in App.js)

```jsx
<Route path="/learn/c-functions" element={<CFunctionsHub />} />
<Route path="/learn/c-functions/lesson/:lessonId" element={<CFunctionsLessonPage />} />
```

## courseCatalog.js changes needed

Add `"c"` key entries to `languageCourses`, `learnNavByLanguage`, `courseStackGroups`, and `inferLanguageFromLearnPath`. See the generated `courseCatalog_C_additions.js` file.

---

## Quick tips

1. Lesson ids follow the pattern `c_functions-<chapter>-<lesson>` (e.g. `c_functions-0-0`)  
2. Add YouTube video URLs to `c_functionsVideoLinks.js` keyed by lesson id  
3. Challenges use the shared `../shared/CCodeChallenge.jsx` (Monaco editor, Run & Submit, Solution, tests). Code runs on the backend through `../shared/runC.js` → `POST /api/challenges/run-c` (gcc)  
4. Challenge tests can check output (`expectedOutput` for an exact match, `outputIncludes` for substrings) and/or source (`keywords`). A test with no checks passes once the program compiles and exits with code 0. Optional `stdin` on the challenge is passed to the program
