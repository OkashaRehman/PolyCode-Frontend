import {
  GO_CONCURRENCY_CHAPTERS,
  GO_CONCURRENCY_LESSONS,
  GO_CONCURRENCY_TOTAL_XP,
} from "../data/GoConcurrencyCurriculum";

describe("Go Concurrency curriculum", () => {
  test("includes staged beginner to advanced chapters and runnable lessons", () => {
    expect(GO_CONCURRENCY_CHAPTERS.length).toBeGreaterThanOrEqual(6);
    expect(GO_CONCURRENCY_LESSONS.length).toBeGreaterThanOrEqual(18);
    expect(GO_CONCURRENCY_TOTAL_XP).toBeGreaterThan(0);

    const stageSet = new Set(GO_CONCURRENCY_CHAPTERS.map((chapter) => chapter.stage));
    expect(stageSet.has("beginner")).toBe(true);
    expect(stageSet.has("advanced")).toBe(true);
  });
});
