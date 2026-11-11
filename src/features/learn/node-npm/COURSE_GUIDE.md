# Node.js & npm — Course Guide

Interactive PolyCode course at **`/learn/node-npm`**.

## What this course covers

- **Node.js** runtime, V8, event loop, Node vs browser
- **npm** CLI, registry, install workflow
- **package.json** — every major field, engines, exports, type
- **package-lock.json** — reproducible installs
- **Dependencies** — prod, dev, peer, optional; semver (^, ~)
- **node_modules** — resolution and hoisting
- **Scripts** — npm run, lifecycle hooks, npx
- **Global packages** & npm link
- **CommonJS** & **ES Modules** in Node
- **Security** — npm audit, supply chain hygiene
- **CI** — npm ci, production installs
- **Publishing** — npm publish, versioning
- **Workspaces** — monorepo basics

## Folder structure

```
node-npm/
├── COURSE_GUIDE.md
├── data/
│   ├── nodeNpmCurriculum.js   ← lessons, theory, challenges
│   └── nodeNpmVideoLinks.js   ← YouTube IDs per lesson
├── hooks/
│   └── useNodeNpmProgress.js
└── pages/
    ├── NodeNpmHub.jsx
    └── NodeNpmLessonPage.jsx
```

## Registration

- **Catalog:** `frontend/src/features/language/courseCatalog.js` (javascript stack)
- **Routes:** `frontend/src/App.js` — `/learn/node-npm`, `/learn/node-npm/lesson/:lessonId`
- **Progress slug:** `node-npm` (XP), localStorage prefix `node_npm`

## Shared components

- Theory: `numpy-py/components/NumpyIntroTheory.jsx`
- Sidebar: `oops-cpp/components/OopsSidebar.jsx`
- Challenges: `js-fundamentals/components/JavaScriptCodeChallenge.jsx`
- Helpers: `js-fundamentals/data/jsCurriculumHelpers.js`

## Editing content

1. Add or edit lessons in `data/nodeNpmCurriculum.js`
2. Lesson ids: `node-0` … `node-18`
3. Add videos in `data/nodeNpmVideoLinks.js` keyed by lesson id
4. Each lesson needs `theory` (with ≥1 quiz) + `challenge` with `tests`

Challenges run in the browser and model npm/Node concepts in plain JavaScript.
