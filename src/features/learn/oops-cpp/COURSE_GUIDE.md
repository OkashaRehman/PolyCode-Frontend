# OOPs C++ — Course Guide

## What is this course?

**OOPs C++** teaches **object-oriented programming in C++**: classes, objects, constructors, inheritance, polymorphism, abstraction, and design ideas used in real software. Lessons use rich theory cards and **real C++ compile-and-run** challenges. Progress can sync to the **backend** when the user is signed in.

**Live URL:** `/learn/oops-cpp`

**Who it’s for:** Learners who know C++ basics (ideally **C++ Fundamentals**) and want to build with classes and OOP.

---

## Folder structure (simple map)

```
oops-cpp/
├── COURSE_GUIDE.md
├── data/
├── components/              ← Theory & challenge UI (shared with Pointers course)
├── hooks/
├── pages/
└── services/                ← Talks to backend for saved progress
```

---

## What each file does

### `data/`

| File | What it holds |
|------|----------------|
| **oopsCurriculum.js** | Chapters, lessons, theory blocks, C++ challenges. **Main content file.** |
| **oopsVideoLinks.js** | YouTube links per lesson. |

### `components/`

| File | What it does |
|------|----------------|
| **ConceptCard.jsx** | Rich theory UI: summaries, term clouds, step-through diagrams, tables. |
| **CodeChallenge.jsx** | Full C++ challenge runner (compiler API + tests). **Used by Pointers course too.** |
| **OopsSidebar.jsx** | Left sidebar lesson list. **Used by almost all courses.** |

### `hooks/`

| File | What it does |
|------|----------------|
| **useOopsProgress.js** | Loads/saves progress via API + local fallback. |

### `pages/`

| File | What it does |
|------|----------------|
| **OopsHub.jsx** | Course homepage. |
| **LessonPage.jsx** | Single OOP lesson page. |

### `services/`

| File | What it does |
|------|----------------|
| **oopsProgressApi.js** | HTTP calls to backend to save/load user progress. |

---

## Shared code

- **shared/** — certificates, read gate, runCpp, lesson shell  
- Backend route: progress tied to authenticated user  

---

## Quick tips for editors

1. Theory block types include `table`, `stepthrough`, `diagram` — see existing lessons in **oopsCurriculum.js**  
2. Challenges must compile as real C++ — test on backend with `g++` when possible  
3. **Pointers C++** reuses **ConceptCard**, **CodeChallenge**, and **OopsSidebar** from this folder  
