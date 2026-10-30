# NumPy · py — Course Guide

## What is this course?

**NumPy · py** teaches Python’s **NumPy** library — the tool data scientists use for fast number arrays, math on tables of data, reshaping, and combining datasets. Learners read short theory lessons (with diagrams and quizzes), mark each lesson as read, then solve **Python coding challenges** in the browser.

**Live URL:** `/learn/numpy-py`

**Who it’s for:** Beginners who know basic Python and want to work with arrays and data like in real analytics projects.

---

## Folder structure (simple map)

```
numpy-py/
├── COURSE_GUIDE.md          ← You are here
├── data/                    ← Lesson text & video links (edit content here)
├── components/              ← How theory & challenges look on screen
├── hooks/                   ← Saves progress in the browser
└── pages/                   ← Course home + single lesson screen
```

---

## What each file does

### `data/` — Course content (most edits happen here)

| File | What it holds |
|------|----------------|
| **numpyCurriculum.js** | All chapters, lessons, theory blocks, quizzes, and challenge tasks. This is the **main content file**. |
| **numpyVideoLinks.js** | Optional YouTube URL for each lesson (key = lesson id, e.g. `numpy-0`). |

### `components/` — Lesson UI pieces

| File | What it does |
|------|----------------|
| **NumpyIntroTheory.jsx** | Shows theory: step cards, diagrams, quizzes, runnable code, and the “Mark as read” flow. **Also used by Pandas, Matplotlib, JS, C#, and C++ Fundamentals.** |
| **PythonCodeChallenge.jsx** | Code editor + “Run & Submit” for Python challenges. **Also used by Pandas and Matplotlib.** |

### `hooks/` — Progress memory

| File | What it does |
|------|----------------|
| **useNumpyProgress.js** | Remembers completed lessons, saved code, notes, and bookmarks in `localStorage` (when the user is signed in). |

### `pages/` — Full screens

| File | What it does |
|------|----------------|
| **NumpyHub.jsx** | Course homepage: chapters, XP bar, search, resume button. |
| **NumpyLessonPage.jsx** | One lesson: Theory tab + Challenge tab, sidebar, navigation to next/prev lesson. |

---

## Shared code this course uses

These live in `../shared/` (not inside this folder):

- **LessonReadGate** — “Mark as read” before the challenge unlocks  
- **LessonContentShell** — Video + drawing/annotation on lessons  
- **runPython.js** — Runs Python in the browser or on the server  

Sidebar navigation comes from **`../oops-cpp/components/OopsSidebar.jsx`**.

---

## Quick tips for editors

1. **Change lesson words** → edit `data/numpyCurriculum.js`  
2. **Add a video** → paste URL in `data/numpyVideoLinks.js` for that lesson id  
3. **Change colors or layout of the hub** → `pages/NumpyHub.jsx` + global CSS in `App.css`  
4. **Do not** edit `numpy-py.txt` for content — it is an old code dump, not the live course file  
