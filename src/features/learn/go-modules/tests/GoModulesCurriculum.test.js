import {
  GO_MODULES_CHAPTERS,
  GO_MODULES_LESSONS,
  GO_MODULES_TOTAL_XP,
} from "../data/GoModulesCurriculum";

describe("Go Modules curriculum", () => {
  test("includes staged beginner to advanced chapters and runnable examples", () => {
    expect(GO_MODULES_CHAPTERS.length).toBeGreaterThanOrEqual(6);
    expect(GO_MODULES_LESSONS.length).toBeGreaterThanOrEqual(15);
    expect(GO_MODULES_TOTAL_XP).toBeGreaterThan(0);

    const stageSet = new Set(GO_MODULES_CHAPTERS.map((chapter) => chapter.stage));
    expect(stageSet.has("beginner")).toBe(true);
    expect(stageSet.has("intermediate")).toBe(true);
    expect(stageSet.has("pro")).toBe(true);
    expect(stageSet.has("advanced")).toBe(true);

    const chapterLessonCounts = GO_MODULES_CHAPTERS.map((chapter) => chapter.lessons.length);
    expect(chapterLessonCounts.every((count) => count >= 2 && count <= 3)).toBe(true);
  });
});
