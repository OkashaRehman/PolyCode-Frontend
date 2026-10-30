# Matplotlib · py — Course Guide

## What is this course?

**Matplotlib · py** teaches **Matplotlib** — how to draw charts and graphs in Python (line plots, bar charts, labels, colors, subplots). Learners follow theory lessons and complete **Python challenges** that build real plots.

**Live URL:** `/learn/matplotlib-py`

**Who it’s for:** Learners comfortable with NumPy/Pandas basics who want to visualize data.

---

## Folder structure (simple map)

```
matplotlib-py/
├── COURSE_GUIDE.md
├── data/
├── hooks/
└── pages/
```

---

## What each file does

### `data/`

| File | What it holds |
|------|----------------|
| **matplotlibCurriculum.js** | Chapters, lessons, theory, quizzes, challenges. **Main content file.** |
| **matplotlibVideoLinks.js** | Optional YouTube URL per lesson. |

### `hooks/`

| File | What it does |
|------|----------------|
| **usematplotlibProgress.js** | Tracks XP, completed lessons, saved code, bookmarks (local storage). |

### `pages/`

| File | What it does |
|------|----------------|
| **MatplotlibHub.jsx** | Course landing page. |
| **MatplotlibLessonPage.jsx** | One lesson: theory + challenge. |

---

## Borrowed from other folders

Same pattern as Pandas:

- **NumpyIntroTheory** + **PythonCodeChallenge** from `numpy-py/`
- **OopsSidebar** from `oops-cpp/`
- Shared helpers from `shared/` (`LessonContentShell`, progress gates, etc.)

---

## Quick tips for editors

1. **`data/matplotlibCurriculum.js`** — all lesson text and tasks  
2. **`data/matplotlibVideoLinks.js`** — video URLs  
3. Plot-heavy challenges may need `matplotlib` in the runner — already supported via Pyodide in the playground  
