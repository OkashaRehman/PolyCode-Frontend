# JavaScript Fundamentals — Course Guide

## What is this course?

**JavaScript Fundamentals** is a beginner-friendly path through core JavaScript: variables, logic, loops, functions, arrays, and objects. Theory uses short steps and real-life examples; challenges run **real JavaScript in the browser**.

**Live URL:** `/learn/js-fundamentals`

**Who it’s for:** Anyone new to programming or new to JS who wants a structured path before building web apps.

---

## Folder structure (simple map)

```
js-fundamentals/
├── COURSE_GUIDE.md
├── data/
├── components/
├── hooks/
└── pages/
```

---

## What each file does

### `data/`

| File | What it holds |
|------|----------------|
| **jsFundamentalsCurriculum.js** | All chapters, lessons, theory, quizzes, JS challenges. **Main content file.** |
| **jsFundamentalsVideoLinks.js** | YouTube links (`js-0`, `js-1`, …). |

### `components/`

| File | What it does |
|------|----------------|
| **JavaScriptCodeChallenge.jsx** | Monaco editor + run/submit tests for JavaScript challenges. |

### `hooks/`

| File | What it does |
|------|----------------|
| **useJsFundamentalsProgress.js** | Local progress: completions, saved code, notes, bookmarks. |

### `pages/`

| File | What it does |
|------|----------------|
| **JsFundamentalsHub.jsx** | Course home. |
| **JsFundamentalsLessonPage.jsx** | Single lesson (theory + challenge). |

---

## Borrowed from other folders

- **NumpyIntroTheory.jsx** from `numpy-py/` (theory layout — works for any language)
- **OopsSidebar** from `oops-cpp/`
- **shared/runJavaScript.js** — executes learner code in the browser
- **shared/** read gate, challenge tab, celebrations

---

## Quick tips for editors

1. Lesson ids: `js-0` … `js-15` (see curriculum file)  
2. Challenges use `console.log` — tests look for keywords/patterns in code  
3. Edit **`data/jsFundamentalsCurriculum.js`** for all wording and tasks  
