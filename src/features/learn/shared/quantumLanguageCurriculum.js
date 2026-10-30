const STAGES = ["beginner", "intermediate", "pro", "advanced"];

const STAGE_BY_CHAPTER = ["beginner", "beginner", "intermediate", "intermediate", "pro", "advanced"];

const STAGE_COLORS = {
  beginner: "#22c55e",
  intermediate: "#3b82f6",
  pro: "#f59e0b",
  advanced: "#a855f7",
};

function makeChallenge(topic, example) {
  const functionName = topic.id.replace(/-[a-z]/g, (match) => match[1].toUpperCase());
  return {
    title: `Implement ${topic.title}`,
    description: `Write ${functionName}() to model ${topic.shortDescription.toLowerCase()}, print the result, and keep the program runnable in the browser.`,
    starterCode: `def ${functionName}():\n    # Model ${topic.shortDescription.toLowerCase()}\n    pass\n\nprint(${functionName}())`,
    solutionCode: `def ${functionName}():\n    return ${JSON.stringify(topic.result)}\n\nprint(${functionName}())`,
    gradeMode: "keywords",
    tests: [
      { id: 1, label: `Defines ${functionName}()`, keywords: [{ pattern: `def\\s+${functionName}\\s*\\(` }] },
      { id: 2, label: "Returns a useful result", keywords: [{ pattern: "return\\s+" }] },
      { id: 3, label: "Prints the result", keywords: [{ pattern: "print\\s*\\(" }] },
    ],
    example,
  };
}

function makeLesson(courseKey, chapterTitle, chapterColor, topic, index) {
  const functionName = topic.id.replace(/-[a-z]/g, (match) => match[1].toUpperCase());
  const example = `# Quantum ${topic.syntax}\ndef ${functionName}():\n    return ${JSON.stringify(topic.result)}\n\n# Python-style statement\nprint(${functionName}())\n# C++-style equivalent in a .sa file:\n# cout << ${JSON.stringify(topic.result)};`;
  return {
    id: `${courseKey}-${index}`,
    title: topic.title,
    xp: topic.xp || 14,
    chapterTitle,
    chapterColor,
    theory: [
      { type: "text", content: "**" + topic.title + "** teaches " + topic.description + " In Quantum, the same program can combine Python-style statements with C++-style expressions in one .sa file. The runnable example models the behavior with standard Python so you can try it immediately, while the commented cout << line shows the Quantum spelling." },
      { type: "diagram", title: topic.diagramTitle, nodes: topic.nodes.map((node, nodeIndex) => ({ id: `${topic.id}-${nodeIndex}`, label: node, color: nodeIndex % 2 ? "#8b5cf6" : chapterColor, items: ["Readable syntax", "Shared values"] })) },
      { type: "code", lang: "python", label: "Runnable Quantum concept example", content: example },
      { type: "callout", variant: topic.variant || "tip", content: topic.callout },
      { type: "quiz", question: topic.question, options: topic.options, answer: topic.answer || 0, explanation: topic.explanation },
    ],
    challenge: makeChallenge(topic, example),
  };
}

export function createQuantumLanguageCurriculum({ courseKey, accent, chapters }) {
  const builtChapters = chapters.map((chapter, chapterIndex) => ({
    id: `${courseKey}-${chapterIndex}`,
    title: chapter.title,
    stage: STAGE_BY_CHAPTER[chapterIndex],
    icon: chapter.icon,
    color: chapter.color || accent,
    lessons: chapter.topics.map((topic, lessonIndex) => makeLesson(courseKey, chapter.title, chapter.color || accent, topic, chapterIndex * 2 + lessonIndex)),
  }));
  const lessons = builtChapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ ...lesson, chapterId: chapter.id })));
  return {
    chapters: builtChapters,
    lessons,
    totalXP: lessons.reduce((sum, lesson) => sum + lesson.xp, 0),
  };
}

export { STAGES, STAGE_COLORS };
