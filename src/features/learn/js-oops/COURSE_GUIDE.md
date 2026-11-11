# JavaScript OOP — Course Guide

## What is this course?

**JavaScript OOP** is a comprehensive path through Object-Oriented Programming in JavaScript: classes, inheritance, encapsulation, design patterns, and real-world applications. Theory uses clear explanations with code examples; challenges run **real JavaScript classes in the browser**.

**Live URL:** `/learn/js-oops`

**Who it's for:** Anyone comfortable with JavaScript fundamentals who wants to master OOP concepts, design patterns, and build maintainable, scalable applications.

---

## Folder structure (simple map)

---
js-Oops/
├── Data/
├── Hooks/
├── pages/
├── components/
└── COURSE_GUIDE.md





---

---

## What each file does

### `data/`

| File | What it holds |
|------|----------------|
| **jsOopsCurriculum.js** | All chapters, lessons, theory, quizzes, OOP challenges. **Main content file.** |
| **jsOopsVideoLinks.js** | YouTube links (`js-oops-0`, `js-oops-1`, …). |

### `components/`

| File | What it does |
|------|----------------|
| **JavaScriptCodeChallenge.jsx** | Monaco editor + run/submit tests for JavaScript OOP challenges. |

### `hooks/`

| File | What it does |
|------|----------------|
| **useJsOopsProgress.js** | Local progress: completions, saved code, notes, bookmarks. |

### `pages/`

| File | What it does |
|------|----------------|
| **JsOopsHub.jsx** | Course home — browse lessons, track progress, resume. |
| **JsOopsLessonPage.jsx** | Single lesson (theory + challenge). |

---

## Course Structure (5 Chapters, 16 Lessons)

**Chapter 1: Why Object-Oriented Programming?** 🎯
- What is OOP?
- Classes & constructors
- Methods

**Chapter 2: Inheritance & Extending** 🌳
- extends & super
- Override methods
- Composition over inheritance

**Chapter 3: Encapsulation & Privacy** 🔒
- Private fields (#)
- Getters and setters
- Static members

**Chapter 4: Design Patterns & Best Practices** 🏗️
- Singleton pattern
- Factory pattern
- Observer pattern

**Chapter 5: Build & Apply OOP** 🏁
- Todo List OOP
- Game Characters RPG
- API Response Handler
- Integration Challenge

---

## Borrowed from other folders

- **NumpyIntroTheory.jsx** from `numpy-py/` (theory layout — works for any language)
- **OopsSidebar** from `oops-cpp/`
- **shared/runJavaScript.js** — executes learner code in the browser
- **shared/** read gate, challenge tab, celebrations, profile menu

---

## Quick tips for editors

1. **Lesson IDs:** `js-oops-0` … `js-oops-15` (see curriculum file)
2. **Challenges use `console.log`** — tests look for keywords/patterns in code
3. **Edit `data/jsOopsCurriculum.js`** for all wording, theory, and tasks
4. **Edit `data/jsOopsVideoLinks.js`** to add YouTube tutorial links per lesson
5. **Test patterns** can check for:
   - Class declarations: `class\\s+ClassName`
   - Keywords: `extends`, `super`, `static`, `private`
   - Methods: `methodName\\s*\\(`
   - Usage: `new ClassName`, `instance.method()`

---

## Common Edits

### Adding a new lesson
1. Open `data/jsOopsCurriculum.js`
2. Add to appropriate chapter's `lessons` array
3. Use format: `{ id: "js-oops-N", title: "...", xp: 14, theory: [...], challenge: {...} }`
4. Add video link in `jsOopsVideoLinks.js` if available

### Adding a video
1. Get YouTube URL
2. Open `data/jsOopsVideoLinks.js`
3. Add: `"js-oops-N": "https://www.youtube.com/watch?v=..."`

### Updating a challenge test
1. Open `data/jsOopsCurriculum.js`
2. Find lesson's `challenge.tests` array
3. Modify regex pattern or hint
4. Pattern examples:
   - Exact match: `"class\\s+Dog"` finds "class Dog"
   - Method: `"constructor\\s*\\("` finds "constructor("
   - Usage: `"new\\s+Dog"` finds "new Dog"

---

## Real-world Examples in This Course

- **BankAccount** — private fields, getters/setters, encapsulation
- **Animal → Dog → Player** — inheritance hierarchy
- **TodoList + Task** — class composition, real app structure
- **Game Characters** — RPG with Player/Enemy, inheritance, private health
- **API ResponseFactory** — factory pattern, polymorphism
- **Logger Singleton** — single instance pattern
- **EventEmitter** — observer pattern with listeners

---

## Testing Locally

1. Run the app: `npm start`
2. Navigate to `/learn/js-oops`
3. Click into a lesson
4. Click "Challenge" tab
5. Write code and press Ctrl+Enter (or click Run & Submit)
6. Tests run against keyword patterns in the code

---

## Key Design Decisions

- **Private fields (#)** — modern JS privacy (ES2022)
- **Real classes** — not just objects; learners see `class` syntax from day 1
- **Progressive difficulty** — starts with basic classes, builds to design patterns
- **Real-world apps** — todo lists, games, API handlers — not toy examples
- **Encapsulation emphasis** — private fields prevent cheating in challenges (e.g., Bank.withdraw validates)

