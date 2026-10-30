# C++ Fundamentals — Course Guide

## What is this course?

**C++ Fundamentals** is a full beginner-to-intermediate C++ track: first program, variables, control flow, functions, arrays, strings, vectors, pointers, references, structs, enums, a preview of OOP, STL basics, and a capstone project. Theory uses plain language and real-life examples; challenges compile **real C++** (server or browser fallback).

**Live URL:** `/learn/cpp-fundamentals`

**Who it’s for:** New C++ learners before taking **OOPs C++** and **Pointers C++**.

**Suggested path:** C++ Fundamentals → OOPs C++ → Pointers C++

---

## Folder structure (simple map)

```
cpp-fundamentals/
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
| **cppFundamentalsCurriculum.js** | 10 chapters, 32 lessons, theory, quizzes, C++ challenges. **Main content file.** |
| **cppFundamentalsVideoLinks.js** | YouTube URLs keyed by `cpp-0`, `cpp-1`, … |

### `components/`

| File | What it does |
|------|----------------|
| **CppFundamentalsCodeChallenge.jsx** | C++ editor + run/submit via `shared/runCpp.js`. |

### `hooks/`

| File | What it does |
|------|----------------|
| **useCppFundamentalsProgress.js** | Local progress storage (`cpp_fundamentals_*` keys). |

### `pages/`

| File | What it does |
|------|----------------|
| **CppFundamentalsHub.jsx** | Course home. |
| **CppFundamentalsLessonPage.jsx** | Single lesson (theory + challenge). |

---

## Borrowed from other folders

- **NumpyIntroTheory** from `numpy-py/`
- **OopsSidebar** from `oops-cpp/`
- **shared/runCpp.js** — calls backend `/challenges/run-cpp` or browser simulation
- **shared/** read gate, lesson shell, celebrations

---

## Quick tips for editors

1. Challenges need a full `main()` — curriculum uses `CPP_MAIN` / `CPP_MAIN_END` helpers  
2. Lesson ids: `cpp-0` through `cpp-31`  
3. Routes are registered in **`App.js`** and **`courseCatalog.js`**  
