# Quantum Programming Projects — Course Guide

## What is this course?

**Quantum Programming Projects** is the capstone Quantum course: a Bell-state
generator, a true quantum coin flip, a simulated teleportation protocol, a
toy variational optimization loop, and a mini Grover search project that
combines everything. Fully **interactive** — same theory + Pyodide-challenge
pattern as `quantum-computing-fundamentals` and `quantum-algorithms`, but the
challenges are slightly bigger, closer to small working programs than
single-concept checks.

**Live URL:** `/learn/quantum-programming-projects`

**Who it's for:** Learners who've finished Quantum Computing Fundamentals and
Quantum Algorithms and want to build something end-to-end before moving to a
real SDK like Qiskit.

---

## Folder structure

```
quantum-programming-projects/
├── COURSE_GUIDE.md
├── data/
│   ├── quantumProgrammingProjectsCurriculum.js
│   └── quantumProgrammingProjectsVideoLinks.js
├── hooks/
│   └── useQuantumProgrammingProjectsProgress.js
└── pages/
    ├── QuantumProgrammingProjectsHub.jsx
    └── QuantumProgrammingProjectsLessonPage.jsx
```

Mirrors `quantum-computing-fundamentals` and `quantum-algorithms` exactly —
same components, same tab pattern, same read-gate flow.

---

## Quick tips for editors

1. Lesson ids: `qp-0` … `qp-5` (6 lessons across 3 chapters)
2. Edit **`data/quantumProgrammingProjectsCurriculum.js`** for lesson text
   and challenges
3. Edit **`data/quantumProgrammingProjectsVideoLinks.js`** for video URLs
4. This is the natural place to add bigger/multi-part challenges as the
   course grows — keep the `challenge.tests` keyword-regex pattern
   consistent with the other courses so `PythonCodeChallenge` keeps working
   without changes

---

## Still needs to be done outside this folder

Register routes in `App.js`:

```jsx
<Route path="/learn/quantum-programming-projects" element={<QuantumProgrammingProjectsHub />} />
<Route path="/learn/quantum-programming-projects/lesson/:lessonId" element={<QuantumProgrammingProjectsLessonPage />} />
```
