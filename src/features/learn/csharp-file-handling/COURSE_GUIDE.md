# C# File Handling — Course Guide

## Overview
Fifth course in the C# track, following **Fundamentals**, **OOP**, **Collections**,
and **LINQ**. Covers `System.IO`: reading/writing text files, checking and managing
files and directories, streaming, and exception-safe file access.

## Structure
- **3 chapters, 6 lessons**
- Theory + Code Challenge format identical to the rest of the C# track
- Accent color: `#179c24` (.NET Green)

### Chapters
1. **Reading & Writing Files** — `File.WriteAllText`/`AppendAllText`, `File.ReadAllText`/`ReadAllLines`
2. **Checking & Managing Files** — `File.Exists`/`Copy`/`Delete`, `Directory.Exists`/`CreateDirectory`
3. **Streams & Exception Safety** — `StreamWriter`/`StreamReader` with `using`, try/catch for file errors

## File Map
```
csharp-file-handling/
├── data/csharpFileHandlingCurriculum.js   # All chapters/lessons/challenges
├── hooks/useCsharpFileHandlingProgress.js # Progress tracking (courseId: csharp-file-handling)
├── pages/CsharpFileHandlingHub.jsx        # Course landing page
├── pages/CsharpFileHandlingLessonPage.jsx # Individual lesson view
└── COURSE_GUIDE.md
```

## Notes
- Templated structurally off `csharp-oop`, same as `csharp-collections` and `csharp-linq`.
- Grading is pattern-based (regex over submitted code) — the in-browser sandbox
  doesn't actually touch a real filesystem, consistent with the rest of the track.
- Next in the C# track: **C# ASP.NET Basics**.
