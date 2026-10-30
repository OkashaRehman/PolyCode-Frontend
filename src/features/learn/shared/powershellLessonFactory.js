export function createPowerShellLesson(chapter, lessonNumber, lessonData) {
  const [title, explanation, example, task, starterCode, solutionCode, checks] =
    lessonData;

  return {
    id: `${chapter.id}-l${lessonNumber}`,
    title,
    chapterTitle: chapter.title,
    xp: 20,
    theory: [
      { type: "text", content: explanation },
      { type: "code", language: "powershell", content: example },
    ],
    challenge: {
      title: `Practice: ${title}`,
      description: [{ type: "text", content: task }],
      starterCode,
      solutionCode,
      tests: checks.map(([label, keyword, hint], index) => ({
        id: `t${index + 1}`,
        label,
        keywords: [keyword],
        hint,
      })),
    },
  };
}

export function createPowerShellChapter(chapterNumber, title, icon, desc, lessons) {
  const chapter = {
    id: `ch-${chapterNumber}`,
    title,
    icon,
    desc,
    lessons: [],
  };

  chapter.lessons = lessons.map((lesson, index) =>
    createPowerShellLesson(chapter, index + 1, lesson),
  );

  return chapter;
}
