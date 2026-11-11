# C# ASP.NET Basics — Course Guide

## Overview
Sixth course in the C# track, following **Fundamentals**, **OOP**, **Collections**,
**LINQ**, and **File Handling**. Covers ASP.NET Core's Minimal API style: routing,
DTOs/model binding, HTTP result helpers, dependency injection, and middleware.

## Structure
- **3 chapters, 6 lessons**
- Theory + Code Challenge format, but **pattern/theory-focused**: ASP.NET Core needs
  a real web server and can't execute in the in-browser sandbox, so challenges are
  graded on code shape (regex over submitted code), the same approach used for
  Quantum Mechanics' un-runnable content.
- Accent color: `#179c24` (.NET Green)

### Chapters
1. **ASP.NET Core Fundamentals** — What is ASP.NET Core?, Routing & HTTP verbs
2. **Building APIs** — Model binding & DTOs, Results & status codes
3. **Dependency Injection & Middleware** — DI basics, the middleware pipeline

## File Map
```
csharp-aspnet-basics/
├── data/csharpAspnetBasicsCurriculum.js   # All chapters/lessons/challenges
├── hooks/useCsharpAspnetBasicsProgress.js # Progress tracking (courseId: csharp-aspnet-basics)
├── pages/CsharpAspnetBasicsHub.jsx        # Course landing page
├── pages/CsharpAspnetBasicsLessonPage.jsx # Individual lesson view
└── COURSE_GUIDE.md
```

## Notes
- Templated structurally off `csharp-oop`, same as the other 4 new C# courses.
- Next in the C# track: **C# Projects** (capstone).
