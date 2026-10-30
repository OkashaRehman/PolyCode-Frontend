# Pointers C++ — Course Guide

## What is this course?

**Pointers C++** focuses on **memory and pointers** in C++: addresses, `*`, `&`, `nullptr`, pointer arithmetic, arrays vs pointers, 2D arrays, function pointers, smart pointers, and safe habits. It’s the follow-up after **OOPs C++** for anyone who needs low-level control without getting lost.

**Live URL:** `/learn/pointers-cpp`

**Who it’s for:** Intermediate C++ learners comfortable with classes who need pointers for systems, games, or embedded code.

---

## Folder structure (simple map)

```
pointers-cpp/
├── COURSE_GUIDE.md
├── data/
├── hooks/
└── pages/
```

*(No local `components/` — UI is borrowed from **oops-cpp**.)*

---

## What each file does

### `data/`

| File | What it holds |
|------|----------------|
| **pointersCurriculum.js** | All pointer lessons, theory, and C++ challenges. **Main content file.** |
| **pointersVideoLinks.js** | YouTube links per lesson. |

### `hooks/`

| File | What it does |
|------|----------------|
| **usePointersProgress.js** | Saves completed lessons and related data (mostly local storage). |

### `pages/`

| File | What it does |
|------|----------------|
| **PointersHub.jsx** | Course home. |
| **PointersLessonPage.jsx** | One lesson: theory (ConceptCard) + challenge (CodeChallenge). |

---

## Borrowed from `oops-cpp/`

| Component | Role |
|-----------|------|
| **ConceptCard.jsx** | Theory panels |
| **CodeChallenge.jsx** | Compile & run C++ challenges |
| **OopsSidebar.jsx** | Lesson navigation |

Also uses **shared/** for read gate, lesson shell, profile menu, etc.

---

## Quick tips for editors

1. Pointer lessons are easy to get wrong in wording — use diagrams in curriculum when possible  
2. Challenges should stay small and compile cleanly  
3. Read gate storage prefix: `pointers_cpp` (see `PointersLessonPage.jsx`)  
