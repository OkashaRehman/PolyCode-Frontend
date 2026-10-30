# C# LINQ — Course Guide

## Overview
Fourth course in the C# track, following **C# Fundamentals**, **C# OOP**, and
**C# Collections**. Covers `System.Linq`: filtering, projecting, ordering,
aggregating, grouping, and chaining queries into pipelines.

## Structure
- **3 chapters, 7 lessons**
- Theory + Code Challenge format identical to the rest of the C# track
- Accent color: `#179c24` (.NET Green)

### Chapters
1. **LINQ Basics** — What is LINQ?, `Select`
2. **Aggregation & Ordering** — `OrderBy`/`OrderByDescending`, `Count`/`Sum`/`Max`/`Min`/`Average`
3. **Advanced Queries** — `First`/`FirstOrDefault`/`Any`, `GroupBy`, chaining queries

## File Map
```
csharp-linq/
├── data/csharpLinqCurriculum.js   # All chapters/lessons/challenges
├── hooks/useCsharpLinqProgress.js # Progress tracking (courseId: csharp-linq)
├── pages/CsharpLinqHub.jsx        # Course landing page
├── pages/CsharpLinqLessonPage.jsx # Individual lesson view
└── COURSE_GUIDE.md
```

## Notes
- Templated structurally off `csharp-oop`, same as `csharp-collections`.
- Grading is pattern-based (regex over submitted code) — consistent with the rest
  of the C# track.
- Next in the C# track: **C# File Handling**.
