# Python OOP · py — Course Guide

## What is this course?

**Python OOP · py** teaches **object-oriented programming in Python** — classes, objects, encapsulation, inheritance, polymorphism, special methods, design patterns, and a capstone project. Learners follow theory lessons and complete **Python coding challenges** that build real class designs.

**Live URL:** `/learn/python-oop-py`

**Who it's for:** Learners comfortable with Python fundamentals (variables, functions, lists, dicts) who want to design maintainable, professional object-oriented code.

---

## Folder structure

```
python-oop-py/
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
| **pythonOopCurriculum.js** | Chapters, lessons, theory, quizzes, challenges. **Main content file.** |
| **pythonOopVideoLinks.js** | Optional YouTube URL per lesson. |
| **pythonOopLessonEnhancements.js** | Per-lesson objectives, scenarios, and callouts. |

### `hooks/`

| File | What it does |
|------|----------------|
| **usePythonOopProgress.js** | Tracks XP, completed lessons, saved code, bookmarks (local storage). |

### `pages/`

| File | What it does |
|------|----------------|
| **PythonOopHub.jsx** | Course landing page. |
| **PythonOopLessonPage.jsx** | One lesson: theory + challenge. |

---

## Borrowed from other folders

Same pattern as Matplotlib:

- **NumpyIntroTheory** + **PythonCodeChallenge** from `numpy-py/`
- **OopsSidebar** from `oops-cpp/`
- Shared helpers from `shared/` (`LessonContentShell`, progress gates, etc.)

---

## Quick tips for editors

1. **`data/pythonOopCurriculum.js`** — all lesson text and tasks
2. **`data/pythonOopVideoLinks.js`** — video URLs
3. **`data/pythonOopLessonEnhancements.js`** — objectives and scenarios per lesson
