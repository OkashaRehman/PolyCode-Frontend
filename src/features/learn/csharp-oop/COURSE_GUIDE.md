# C# OOP — Course Guide

## What is this course?

**C# OOP** teaches object-oriented programming in C#: classes, objects,
constructors, encapsulation with properties, inheritance, polymorphism,
interfaces, and static members. Follows the exact same shape as
`csharp-fundamentals`.

**Live URL:** `/learn/csharp-oop`

**Who it's for:** Learners who finished C# Fundamentals and want to go deeper
into object-oriented design.

---

## Folder structure (simple map)

```
csharp-oop/
├── COURSE_GUIDE.md
├── data/
├── hooks/
└── pages/
```

Note: this course has **no `components/` folder** — it reuses
`CsharpCodeChallenge.jsx` directly from `csharp-fundamentals/components/`,
since that component is fully generic and not tied to any one course's data.

---

## What each file does

### `data/`

| File | What it holds |
|------|----------------|
| **csharpOopCurriculum.js** | 4 chapters, 8 lessons: theory + code challenges. **Main content file.** |

### `hooks/`

| File | What it does |
|------|----------------|
| **useCsharpOopProgress.js** | Saves progress locally / to account when signed in. |

### `pages/`

| File | What it does |
|------|----------------|
| **CsharpOopHub.jsx** | Course homepage. |
| **CsharpOopLessonPage.jsx** | One lesson screen (imports `CsharpCodeChallenge` from `csharp-fundamentals`). |

---

## Borrowed from other folders

- **NumpyIntroTheory** from `numpy-py/`
- **OopsSidebar** from `oops-cpp/`
- **CsharpCodeChallenge** from `csharp-fundamentals/components/` (shared, not duplicated)

---

## Quick tips for editors

1. Challenges use pattern tests understood by `CsharpCodeChallenge.jsx`
   (`Console.WriteLine`, keywords/regex on the submitted code).
2. Edit **`data/csharpOopCurriculum.js`** for content.
3. Route registered in `App.js` via the `LEARN_COURSE_ROUTES` table
   (slug: `csharp-oop`, language: `"C#"`).
