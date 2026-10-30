# C# Collections — Course Guide

## Overview
Third course in the C# track, following **C# Fundamentals** and **C# OOP**. Covers the
core .NET collection types: arrays, `List<T>`, `Dictionary<TKey, TValue>`, `HashSet<T>`,
`Stack<T>`, and `Queue<T>`, plus practical guidance on choosing the right one.

## Structure
- **3 chapters, 7 lessons**
- Theory + Code Challenge format identical to C# Fundamentals / C# OOP
- Accent color: `#179c24` (.NET Green, matches the rest of the C# track)

### Chapters
1. **Arrays & Lists** — Arrays, `List<T>`
2. **Dictionaries & Sets** — `Dictionary<TKey, TValue>`, `HashSet<T>`
3. **Stacks, Queues & Iteration** — `Stack<T>`/`Queue<T>`, sorting/transforming lists,
   choosing the right collection

## File Map
```
csharp-collections/
├── data/csharpCollectionsCurriculum.js   # All chapters/lessons/challenges
├── hooks/useCsharpCollectionsProgress.js # Progress tracking (courseId: csharp-collections)
├── pages/CsharpCollectionsHub.jsx        # Course landing page
├── pages/CsharpCollectionsLessonPage.jsx # Individual lesson view
└── COURSE_GUIDE.md
```

## Notes
- Templated structurally off `csharp-oop` (same shared components: `OopsSidebar`,
  `NumpyIntroTheory`, `CsharpCodeChallenge`, `LessonContentShell`, etc.) — zero new
  shared-component work needed.
- Grading is pattern-based (regex over submitted code), consistent with the rest of
  the C# track — the in-browser sandbox does not execute real C#.
- Next in the C# track: **C# LINQ**.
