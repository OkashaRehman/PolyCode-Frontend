# C# Projects — Course Guide (Capstone)

## Overview
Seventh and final course in the C# track, following **Fundamentals**, **OOP**,
**Collections**, **LINQ**, **File Handling**, and **ASP.NET Basics**. This is the
capstone: 4 growing, realistic projects that combine skills from every prior course.

## Structure
- **2 chapters, 4 lessons** (one project per lesson)
- Theory + Code Challenge format identical to the rest of the C# track
- Accent color: `#179c24` (.NET Green)

### Chapters
1. **Console Projects**
   - Project 1: Contact Book — `Contact` class + `List<Contact>` + LINQ search
   - Project 2: Persistent Todo List — `List<string>` + file save/reload
2. **Applied Projects**
   - Project 3: Student Grade Analyzer — `Student` class + LINQ aggregation (`Average`, `OrderByDescending`)
   - Project 4: Mini Task API — ASP.NET Minimal API + DTO + in-memory storage + LINQ lookup

## File Map
```
csharp-projects/
├── data/csharpProjectsCurriculum.js   # All chapters/lessons/challenges
├── hooks/useCsharpProjectsProgress.js # Progress tracking (courseId: csharp-projects)
├── pages/CsharpProjectsHub.jsx        # Course landing page
├── pages/CsharpProjectsLessonPage.jsx # Individual lesson view
└── COURSE_GUIDE.md
```

## Notes
- Templated structurally off `csharp-oop`, same as the other 5 C# courses.
- Project 4 (Mini Task API) is pattern/theory-graded like ASP.NET Basics, since it
  can't run a live server in the browser sandbox.
- This is the **last course** in the C# track — after this, all 7 C# courses
  (Fundamentals, OOP, Collections, LINQ, File Handling, ASP.NET Basics, Projects)
  are complete.
