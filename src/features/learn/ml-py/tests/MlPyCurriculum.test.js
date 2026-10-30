import { ML_PY_CHAPTERS, ML_PY_LESSONS, ML_PY_TOTAL_XP } from "../data/MlPyCurriculum";

describe("Machine Learning with Python curriculum", () => {
  test("has staged chapters and balanced lessons", () => {
    expect(ML_PY_CHAPTERS).toHaveLength(7);
    expect(ML_PY_LESSONS).toHaveLength(21);
    expect(ML_PY_TOTAL_XP).toBeGreaterThan(0);
    expect(new Set(ML_PY_CHAPTERS.map((chapter) => chapter.stage))).toEqual(
      new Set(["beginner", "intermediate", "pro", "advanced"]),
    );
    expect(ML_PY_CHAPTERS.every((chapter) => chapter.lessons.length >= 2 && chapter.lessons.length <= 3)).toBe(true);
  });

  test("provides runnable Python examples and challenge contracts", () => {
    for (const lesson of ML_PY_LESSONS) {
      expect(lesson.theory[0].code.lang).toBe("python");
      expect(lesson.theory[0].code.content).toContain("# Machine Learning with Python");
      expect(lesson.challenge.starterCode).toContain("# Machine Learning with Python");
      expect(lesson.challenge.solutionCode).toContain("# Machine Learning with Python");
      expect(lesson.challenge.tests.length).toBeGreaterThanOrEqual(2);
    }
  });
});
