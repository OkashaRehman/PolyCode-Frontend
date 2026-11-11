# Quantum Algorithms — Course Guide

## What is this course?

**Quantum Algorithms** covers the textbook speedups: quantum parallelism,
phase kickback/interference, Deutsch-Jozsa, Grover's search, the Quantum
Fourier Transform, and Shor's algorithm. Fully **interactive**, same pattern
as `quantum-computing-fundamentals` — theory + a light Pyodide-run Python
challenge per lesson that models the algorithm's logic classically (oracle
lookups, period finding, iteration counts) rather than requiring a real
quantum SDK.

**Live URL:** `/learn/quantum-algorithms`

**Who it's for:** Learners who finished Quantum Computing Fundamentals (and
ideally Quantum Mechanics for Programmers) and want to see *why* quantum
computers can be faster for specific problems.

---

## Folder structure

```
quantum-algorithms/
├── COURSE_GUIDE.md
├── data/
│   ├── quantumAlgorithmsCurriculum.js
│   └── quantumAlgorithmsVideoLinks.js
├── hooks/
│   └── useQuantumAlgorithmsProgress.js
└── pages/
    ├── QuantumAlgorithmsHub.jsx
    └── QuantumAlgorithmsLessonPage.jsx
```

This mirrors `quantum-computing-fundamentals` exactly (Theory/Challenge tabs,
`NumpyIntroTheory`, `PythonCodeChallenge`, `OopsSidebar`, read gate) — if
you've edited that course before, this one behaves identically.

---

## Quick tips for editors

1. Lesson ids: `qa-0` … `qa-5` (6 lessons across 3 chapters)
2. Edit **`data/quantumAlgorithmsCurriculum.js`** for lesson text and
   challenges
3. Edit **`data/quantumAlgorithmsVideoLinks.js`** for video URLs
4. Every lesson has both `theory[]` and a `challenge` object — keep that
   pairing consistent with the other interactive Quantum courses

---

## Still needs to be done outside this folder

Register routes in `App.js`:

```jsx
<Route path="/learn/quantum-algorithms" element={<QuantumAlgorithmsHub />} />
<Route path="/learn/quantum-algorithms/lesson/:lessonId" element={<QuantumAlgorithmsLessonPage />} />
```
