# Quantum Mechanics for Programmers — Course Guide

## What is this course?

**Quantum Mechanics for Programmers** is PolyCode's **theory-only** Quantum
course: complex amplitudes, bra-ket notation, unitary matrices, the Bloch
sphere, and measurement/uncertainty. There are **no code challenges** — this
is deliberate, since the goal is physics/math intuition, not syntax.

**Live URL:** `/learn/quantum-mechanics-for-programmers`

**Who it's for:** Anyone who finished Quantum Computing Fundamentals and
wants the "why" behind the qubit math before Quantum Algorithms.

---

## How this differs from Quantum Computing Fundamentals

| | Fundamentals | Mechanics (this course) |
|---|---|---|
| Lesson shape | `theory` + `challenge` | `theory` only — **no `challenge` key at all** |
| Lesson page tabs | Theory / Challenge | Theory only — no tab bar |
| Completing a lesson | Pass the Pyodide challenge | Click "Mark as read" (calls `completeLesson` directly) |
| Components used | `+ LessonChallengeTab`, `+ PythonCodeChallenge`, code-save timer | Neither — removed entirely |

If you ever want to add a challenge to a specific lesson here later, copy the
`challenge` field shape from `quantum-computing-fundamentals`'s curriculum
file, then add back `LessonChallengeTab` + `PythonCodeChallenge` + the tab
state to the lesson page for that course (or split into two lesson-page
variants).

---

## Folder structure

```
quantum-mechanics-for-programmers/
├── COURSE_GUIDE.md
├── data/
│   ├── quantumMechanicsForProgrammersCurriculum.js
│   └── quantumMechanicsForProgrammersVideoLinks.js
├── hooks/
│   └── useQuantumMechanicsForProgrammersProgress.js
└── pages/
    ├── QuantumMechanicsForProgrammersHub.jsx
    └── QuantumMechanicsForProgrammersLessonPage.jsx
```

---

## Quick tips for editors

1. Lesson ids: `qm-0` … `qm-5` (6 lessons across 3 chapters)
2. Edit **`data/quantumMechanicsForProgrammersCurriculum.js`** for lesson
   content — every lesson object has `id`, `title`, `xp`, `theory[]`, and
   **no `challenge` field**. Don't add one without also updating the lesson
   page to render a Challenge tab.
3. `theory` blocks can be `text`, `diagram`, `code` (illustrative only — it's
   never executed), `callout`, or `quiz`.

---

## Still needs to be done outside this folder

Register routes in `App.js`:

```jsx
<Route path="/learn/quantum-mechanics-for-programmers" element={<QuantumMechanicsForProgrammersHub />} />
<Route path="/learn/quantum-mechanics-for-programmers/lesson/:lessonId" element={<QuantumMechanicsForProgrammersLessonPage />} />
```
