# Flutter · apps — Course Guide

## Overview
- **Path:** `/learn/flutter-app`
- **Language hub:** `/language/Flutter`
- **Level:** Beginner → Capstone
- **Size:** 22 chapters · 100 lessons
- **Accent:** Flutter blue (`#02569b` → `#13b9fd`)

## Course
**Flutter Development: Zero to Real Apps**  
Learn Dart, build beautiful interfaces, connect APIs, and create complete Android applications.

## Chapters
1. Meet Flutter
2. Set Up Environment
3. Dart Programming for Beginners
4. Dart Intermediate
5. Understanding a Flutter Project
6. Your First Flutter UI
7. Layouts and Responsive Design
8. Buttons, Input Fields, and Forms
9. Navigation and Multiple Screens
10. State Management
11. Lists, Models, and Data Handling
12. Networking and REST APIs
13. Local Storage and Security
14. Authentication and User Accounts
15. Images, Files, and Device Features
16. Animations and Polished Interfaces
17. Architecture and Maintainable Code
18. Real-Time Applications and Chat
19. Testing and Debugging
20. Performance and Production Readiness
21. Advanced Flutter Concepts
22. Progressive Projects (Profile Card → Capstone)

## Files
| File | Role |
|------|------|
| `data/flutterCurriculum.js` | Generated lessons (do not hand-edit) |
| `scripts/lessonData/*.mjs` | Editable lesson specs |
| `scripts/generateCurriculum.mjs` | Rebuild curriculum data files |
| `data/flutterAppVideoLinks.js` | Paste YouTube lecture URLs |
| `data/flutterAppLessonOutcomes.js` | Outcomes per lesson |
| `data/flutterAppSecondQuizzes.js` | Second MCQ per lesson |
| `pages/FlutterAppHub.jsx` | Course hub |
| `pages/FlutterAppLessonPage.jsx` | Theory + challenge |
| `components/FlutterTheoryShell.jsx` | Studio banner + NumPy theory renderer |
| `components/DartCodeChallenge.jsx` | Keyword-based Dart/Flutter checks |
| `hooks/useFlutterAppProgress.js` | Progress sync (`flutter-app`) |

## Notes
- Challenges use **pattern checks** in the editor. Full Flutter UIs must be run locally with `flutter run` (they cannot execute inside the browser).
- To regenerate curriculum after editing `scripts/lessonData/*.mjs`:  
  `node src/features/learn/flutter-app/scripts/generateCurriculum.mjs`
- Paste lecture links in `data/flutterAppVideoLinks.js`.
