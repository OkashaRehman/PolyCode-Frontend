# Quantum Computing Fundamentals — Course Guide

## What is this course?

**Quantum Computing Fundamentals** is PolyCode's intro Quantum path: qubits,
superposition, entanglement, gates/circuits, and measurement. Theory is
concept-first (no heavy math); challenges are **light Python checks** run in
the browser (Pyodide) — they model the ideas (amplitudes, probabilities,
gate lists) in plain Python rather than requiring a real quantum SDK like
Qiskit.

**Live URL:** `/learn/quantum-computing-fundamentals`

**Who it's for:** Programmers with no physics background who want quantum
computing intuition before Quantum Algorithms and Quantum Programming
Projects.

---

## Folder structure

```
quantum-computing-fundamentals/
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
| **quantumComputingFundamentalsCurriculum.js** | Chapters, lessons, theory, quizzes, challenges. **Main content file.** |
| **quantumComputingFundamentalsVideoLinks.js** | Optional YouTube URL per lesson (currently empty — add IDs as needed). |

Unlike `python-fundamentals`, this course does **not** have a separate
`*LessonEnhancements.js` file yet — chapters/lessons are exported as-is from
the curriculum file. Add one later (copy the pattern from
`python-fundamentals/data/pythonLessonEnhancements.js`) if you want
per-lesson objectives/scenarios merged in automatically.

### `hooks/`

| File | What it does |
|------|----------------|
| **useQuantumComputingFundamentalsProgress.js** | Tracks XP, completed lessons, saved code, bookmarks (via shared `useCourseProgress`). |

### `pages/`

| File | What it does |
|------|----------------|
| **QuantumComputingFundamentalsHub.jsx** | Course landing page with learning path (mirrors `PythonFundamentalsHub.jsx`). |
| **QuantumComputingFundamentalsLessonPage.jsx** | One lesson: theory + challenge (mirrors `PythonFundamentalsLessonPage.jsx`). |

---

## Borrowed from other folders

Same pattern as Python Fundamentals:

- **NumpyIntroTheory** + **PythonCodeChallenge** from `numpy-py/` (renders
  theory blocks and runs the Python challenge via Pyodide)
- **OopsSidebar** from `oops-cpp/`
- Shared helpers from `shared/` (read gate, challenge tab, certificate,
  chapter grid/path overview, etc.)

---

## Quick tips for editors

1. Lesson ids: `qc-0` … `qc-5` (6 lessons across 3 chapters)
2. Edit **`data/quantumComputingFundamentalsCurriculum.js`** for lesson text
   and challenges
3. Edit **`data/quantumComputingFundamentalsVideoLinks.js`** for video URLs
4. To add a 4th chapter or more lessons, follow the exact shape of an
   existing lesson object (`id`, `title`, `xp`, `theory[]`, `challenge`) —
   `theory` blocks can be `text`, `diagram`, `code`, `callout`, or `quiz`

---

## Still needs to be done outside this folder

1. **Register routes** in `App.js` (or wherever routes live) for:
   - `/learn/quantum-computing-fundamentals`
   - `/learn/quantum-computing-fundamentals/lesson/:lessonId`
2. This folder is the template for the other 3 Quantum courses
   (`quantum-mechanics-for-programmers`, `quantum-algorithms`,
   `quantum-programming-projects`) — copy this structure, rename every
   `QuantumComputingFundamentals*` identifier, and swap in new curriculum
   content. The Mechanics course should likely drop `PythonCodeChallenge`
   entirely in favor of a theory-only tab, since it has no code challenges.
