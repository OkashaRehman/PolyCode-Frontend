# C# Fundamentals — Course Guide

## What is this course?

**C# Fundamentals** teaches Microsoft’s **C#** language from the ground up: variables, `switch`, loops, methods, classes, and collections. Theory is step-by-step; challenges check your code with **pattern tests** (C# runs in a light browser simulator for simple programs).

**Live URL:** `/learn/c-sharp-fundamentals`

**Who it’s for:** Beginners who want C# for games (Unity), apps, or backend .NET work.

---

## Folder structure (simple map)

```
csharp-fundamentals/
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
| **csharpCurriculum.js** | Chapters, lessons, theory, challenges. **Main content file.** |
| **csharpVideoLinks.js** | YouTube links per lesson (`cs-0`, …). |

### `components/`

| File | What it does |
|------|----------------|
| **CsharpCodeChallenge.jsx** | Editor + tests for C# challenges (uses `shared/runCsharp.js`). |

### `hooks/`

| File | What it does |
|------|----------------|
| **useCsharpProgress.js** | Saves progress locally when signed in. |

### `pages/`

| File | What it does |
|------|----------------|
| **CsharpHub.jsx** | Course homepage. |
| **CsharpLessonPage.jsx** | One lesson screen. |

---

## Borrowed from other folders

- **NumpyIntroTheory** from `numpy-py/`
- **OopsSidebar** from `oops-cpp/`
- **shared/runCsharp.js** — simple C# interpreter for `Console.WriteLine` style code

---

## Quick tips for editors

1. Challenges should use patterns tests understand (`Console.WriteLine`, `int`, `class`, etc.)  
2. Full .NET features are **not** in the browser runner — keep challenges beginner-level  
3. Edit **`data/csharpCurriculum.js`** for content  
