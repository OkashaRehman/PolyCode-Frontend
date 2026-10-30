# Shared learn folder — Guide

## What is this folder?

The **`shared/`** folder is **not a course** — it holds code that **many courses reuse**. Think of it as a shared toolbox: progress gates, video embeds, code runners, certificates, and celebration animations.

If you are editing **one course’s lessons**, you usually edit that course’s `data/*Curriculum.js` file, not this folder — unless you are fixing behavior that affects **all** courses.

---

## Folder structure (simple map)

```
shared/
├── COURSE_GUIDE.md
├── allCourses.js
├── Lesson*.jsx / useLesson*.js   ← Lesson experience
├── run*.js                       ← Run code in challenges
├── Challenge*.jsx / *.css        ← Win animations
├── CourseCertificate.jsx         ← Certificates
└── …
```

---

## Important files (plain English)

### Lesson flow

| File | What it does |
|------|----------------|
| **useLessonReadGate.js** | Remembers if the user clicked “Mark as read” and their confidence level. |
| **LessonReadGate.jsx** | UI: mark read → pick confidence → unlock challenge button. |
| **LessonChallengeTab.jsx** | Challenge tab in the header (locked until read). |
| **LessonContentShell.jsx** | Wraps lesson body: optional video + drawing/annotation layer. |
| **LessonAnnotator.jsx** | Lets users draw on the lesson (pencil, laser, text). |
| **LessonVideo.jsx** | Embeds a YouTube lesson video. |

### Run code (challenges & theory)

| File | Language |
|------|----------|
| **runPython.js** | Python (server, then browser Pyodide) |
| **runJavaScript.js** | JavaScript in browser |
| **runCpp.js** | C++ (server `g++`, then browser simulation) |
| **runCsharp.js** | Simple C# line-by-line simulator |
| **RunnableCodeBlock.jsx** | “Run” button inside theory code snippets |

### Progress & navigation

| File | What it does |
|------|----------------|
| **LearnProfileMenu.jsx** | XP / progress dropdown in lesson top bar. |
| **LearnNavContext.js** | Shared nav state for learn pages. |
| **allCourses.js** | Lists courses for navbar (reads `courseCatalog.js`). |

### Videos & links

| File | What it does |
|------|----------------|
| **applyLessonVideoLinks.js** | Attaches YouTube URLs from `*VideoLinks.js` onto lessons. |
| **youtubeUtils.js** | Turns YouTube URLs into embed links. |

### Challenges & certificates

| File | What it does |
|------|----------------|
| **ChallengeCompleteCelebration.jsx** | Confetti / success when a challenge passes. |
| **useChallengeCelebration.js** | Controls when celebration shows. |
| **challenge-complete.css** | Styles for celebration. |
| **CourseCertificate.jsx** | Certificate UI when a course is finished. |
| **VerifyCertificatePage.jsx** | Public page to verify a certificate code. |

### Other

| File | What it does |
|------|----------------|
| **annotationCursors.js** | Cursor styles for lesson annotator. |

---

## Which courses use what?

| Feature | Used by |
|---------|---------|
| Lesson read gate | NumPy, Pandas, Matplotlib, JS, C#, C++ Fundamentals, Pointers (OOP uses inline gate) |
| NumpyIntroTheory | Python tracks + JS + C# + C++ Fundamentals |
| ConceptCard | OOP C++, Pointers C++ |
| runCpp.js | OOP, Pointers, C++ Fundamentals, RunnableCodeBlock |
| OopsSidebar | Most courses (lives in `oops-cpp/` but used everywhere) |

---

## Quick tip

Changing **shared** code can affect **every course**. Test at least one Python, one JS, and one C++ lesson after edits here.
