import { useEffect } from "react";
import { useAssistant } from "../context/AssistantContext";

/**
 * Registers rich lesson context so PolyMentor can guide while coding.
 */
export function useLessonAssistantContext({
  course,
  language,
  lesson,
  chapter,
  tab,
  code = "",
  error = "",
}) {
  const { setPageContext, clearPageContext } = useAssistant();

  useEffect(() => {
    if (!lesson) {
      clearPageContext();
      return undefined;
    }

    setPageContext({
      mode: "lesson",
      course,
      language,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      chapter: typeof chapter === "string" ? chapter : chapter?.title || "",
      tab: tab || "theory",
      code: String(code || "").slice(0, 4000),
      error: String(error || "").slice(0, 2000),
      challengeDescription: lesson.challenge?.description || "",
    });

    return () => clearPageContext();
  }, [
    course,
    language,
    lesson,
    chapter,
    tab,
    code,
    error,
    setPageContext,
    clearPageContext,
  ]);
}
