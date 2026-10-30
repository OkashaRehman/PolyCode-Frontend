export function createStructuredCourse({
  id,
  title,
  language,
  description,
  accent,
  basePath,
  readGatePrefix,
  backPath,
  chapters,
}) {
  const builtChapters = chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.topics.map((topic) => ({
      id: `${id}-${topic.id}`,
      title: topic.title,
      xp: topic.xp || 20,
      chapterId: `${id}-${chapter.id}`,
      chapterTitle: chapter.title,
      chapterColor: chapter.color || accent,
      theory: [
        { type: "text", content: topic.overview },
        {
          type: "code",
          lang: language === "Batchfile" ? "batch" : "qsharp",
          runnable: false,
          label: topic.exampleLabel || `${topic.title} example`,
          content: topic.example,
        },
        { type: "callout", variant: topic.variant || "tip", content: topic.note },
        {
          type: "quiz",
          question: topic.quiz.question,
          options: topic.quiz.options,
          answer: topic.quiz.answer,
          explanation: topic.quiz.explanation,
        },
      ],
      challenge: {
        ...topic.challenge,
        explanation: topic.challenge.explanation || topic.quiz.explanation,
      },
    })),
  }));
  const lessons = builtChapters.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({ ...lesson, chapterId: chapter.id })),
  );

  return {
    id,
    title,
    language,
    description,
    accent,
    basePath,
    readGatePrefix,
    backPath,
    chapters: builtChapters,
    lessons,
    totalXP: lessons.reduce((total, lesson) => total + lesson.xp, 0),
  };
}
