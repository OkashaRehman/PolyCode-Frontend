# C Data Structures — Course Guide

## What is this course?

**C Data Structures** teaches C programming from the ground up with real-compiled C challenges.

**Live URL:** `/learn/c-data-structures`

---

## Chapters

- **Structs & Arrays** (3 lessons)
- **Linked Lists** (3 lessons)
- **Stacks & Queues** (3 lessons)
- **Trees** (3 lessons)
- **Sorting Algorithms** (3 lessons)

---

## Folder structure

```
c-data-structures/
├── COURSE_GUIDE.md
├── data/
│   ├── c_data_structuresCurriculum.js      ← lessons, theory, quizzes, challenges
│   └── c_data_structuresVideoLinks.js      ← YouTube URLs (keyed by lesson id)
├── hooks/
│   └── useCDataStructuresProgress.js  ← localStorage progress
└── pages/
    ├── CDataStructuresHub.jsx            ← Course home page
    └── CDataStructuresLessonPage.jsx         ← Single lesson page
```

---

## Routes (register in App.js)

```jsx
<Route path="/learn/c-data-structures" element={<CDataStructuresHub />} />
<Route path="/learn/c-data-structures/lesson/:lessonId" element={<CDataStructuresLessonPage />} />
```

## courseCatalog.js changes needed

Add `"c"` key entries to `languageCourses`, `learnNavByLanguage`, `courseStackGroups`, and `inferLanguageFromLearnPath`. See the generated `courseCatalog_C_additions.js` file.

---

## Quick tips

1. Lesson ids follow the pattern `c_data_structures-<chapter>-<lesson>` (e.g. `c_data_structures-0-0`)  
2. Add YouTube video URLs to `c_data_structuresVideoLinks.js` keyed by lesson id  
3. Challenges use the shared `../shared/CCodeChallenge.jsx` (Monaco editor, Run & Submit, Solution, tests). Code runs on the backend through `../shared/runC.js` → `POST /api/challenges/run-c` (gcc)  
4. Challenge tests can check output (`expectedOutput` for an exact match, `outputIncludes` for substrings) and/or source (`keywords`). A test with no checks passes once the program compiles and exits with code 0. Optional `stdin` on the challenge is passed to the program
