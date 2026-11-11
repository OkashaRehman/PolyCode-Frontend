# OpenCV · Python — Course Guide

## What is this course?

**OpenCV · py** is PolyCode's computer-vision track: images as NumPy arrays,
color spaces, filters, edges, contours, geometry, features, video, and
detection. Theory shows real `cv2` code. Challenges are **keyword-graded**
(same pattern as PyTorch) — pass/fail checks API usage patterns. Live `cv2`
execution is **not** required in the browser.

**Live URL:** `/learn/opencv-py`

**Who it's for:** Python learners comfortable with lists/arrays (NumPy
recommended) who want practical OpenCV from basics through video/detection.

---

## Folder structure

```
opencv-py/
├── COURSE_GUIDE.md
├── data/
│   ├── opencvCurriculum.js
│   ├── opencvLessonOutcomes.js
│   └── opencvVideoLinks.js
├── hooks/
│   └── useOpencvProgress.js
└── pages/
    ├── OpencvHub.jsx
    └── OpencvLessonPage.jsx
```

---

## What each file does

| File | Role |
|------|------|
| **opencvCurriculum.js** | Chapters, lessons, theory, quizzes, challenges |
| **opencvLessonOutcomes.js** | Plain-English outcomes per lesson id |
| **opencvVideoLinks.js** | Optional YouTube URL per lesson |
| **useOpencvProgress.js** | XP, completed lessons, saved code, bookmarks |
| **OpencvHub.jsx** | Course landing + learning path |
| **OpencvLessonPage.jsx** | Theory + keyword challenge |

---

## Borrowed from other folders

- **NumpyIntroTheory** + **PythonCodeChallenge** from `numpy-py/`
- **OopsSidebar** from `oops-cpp/`
- Shared helpers from `shared/`

---

## Runtime note

Challenges use `gradeMode: "keywords"`. Clicking **Run** may fail without
`opencv-python` on the server or a local install — that does not block
grading. Do not add a browser `cv2` shim unless you intentionally expand
scope later.

---

## Quick tips for editors

1. Lesson ids: `opencv-0` … `opencv-35` (36 lessons · 11 chapters)
2. Edit curriculum for text/challenges; outcomes and videos in their files
3. Outside this folder: `courseCatalog.js`, `App.js`, `courseRegistry.js`,
   backend `courseIds.js`, assistant route map, certificate script
