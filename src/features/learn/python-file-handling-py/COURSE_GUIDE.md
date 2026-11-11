# Python File Handling · py — Course Guide

## What is this course?

**Python File Handling · py** teaches **reading, writing, and managing files in Python** — `open()`, `pathlib`, CSV, JSON, error handling, binary I/O, logging, and production-safe patterns. Learners follow theory lessons and complete **Python coding challenges** using `StringIO`, `csv`, `json`, and `pathlib`.

**Live URL:** `/learn/python-file-handling-py`

**Who it's for:** Learners comfortable with Python fundamentals who need durable, real-world file I/O skills.

---

## Folder structure

```
python-file-handling-py/
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
| **pythonFileHandlingCurriculum.js** | Chapters, lessons, theory, quizzes, challenges. **Main content file.** |
| **pythonFileHandlingVideoLinks.js** | Optional YouTube URL per lesson. |
| **pythonFileHandlingLessonEnhancements.js** | Per-lesson objectives, scenarios, and callouts. |

### `hooks/`

| File | What it does |
|------|----------------|
| **usePythonFileHandlingProgress.js** | Tracks XP, completed lessons, saved code, bookmarks. |

### `pages/`

| File | What it does |
|------|----------------|
| **PythonFileHandlingHub.jsx** | Course landing page. |
| **PythonFileHandlingLessonPage.jsx** | One lesson: theory + challenge. |

---

## Borrowed from other folders

Same pattern as Matplotlib:

- **NumpyIntroTheory** + **PythonCodeChallenge** from `numpy-py/`
- **OopsSidebar** from `oops-cpp/`
- Shared helpers from `shared/`

---

## Quick tips for editors

1. **`data/pythonFileHandlingCurriculum.js`** — all lesson text and tasks
2. Prefer **`io.StringIO`** in challenges so they run in Pyodide and on the server
3. **`data/pythonFileHandlingVideoLinks.js`** — video URLs
