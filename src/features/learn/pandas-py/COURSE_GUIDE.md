# Pandas · py — Course Guide

## What is this course?

**Pandas · py** teaches **Pandas** — Python’s library for tables of data (like Excel sheets in code). Topics include Series, DataFrames, filtering, cleaning, grouping, and merging CSV-style data. Each lesson has theory, then a hands-on **Python challenge**.

**Live URL:** `/learn/pandas-py`

**Who it’s for:** Learners who finished or are doing NumPy and want to analyze real-world tables and datasets.

---

## Folder structure (simple map)

```
pandas-py/
├── COURSE_GUIDE.md
├── data/                    ← Lessons & videos
├── hooks/                   ← Progress saving
└── pages/                   ← Hub + lesson screens
```

*(No `components/` folder — this course reuses NumPy’s theory and challenge components.)*

---

## What each file does

### `data/`

| File | What it holds |
|------|----------------|
| **pandasCurriculum.js** | All chapters, lessons, theory, quizzes, and Python challenges. **Main content file.** |
| **pandasVideoLinks.js** | YouTube links per lesson id. |

### `hooks/`

| File | What it does |
|------|----------------|
| **usePandasProgress.js** | Saves completed lessons, code, notes, bookmarks in `localStorage`. |

### `pages/`

| File | What it does |
|------|----------------|
| **PandasHub.jsx** | Course home: progress, chapters, search. |
| **PandasLessonPage.jsx** | Single lesson page (theory + challenge tabs). |

---

## Borrowed from other folders

| From | Used for |
|------|----------|
| `numpy-py/components/NumpyIntroTheory.jsx` | Theory layout |
| `numpy-py/components/PythonCodeChallenge.jsx` | Python coding challenges |
| `oops-cpp/components/OopsSidebar.jsx` | Lesson list sidebar |
| `shared/` | Read gate, videos, annotations, `runPython.js` |

---

## Quick tips for editors

1. Edit lesson content in **`data/pandasCurriculum.js`**  
2. Add videos in **`data/pandasVideoLinks.js`**  
3. Lesson ids look like `pandas-0`, `pandas-1`, etc. — keep ids stable when adding links  
