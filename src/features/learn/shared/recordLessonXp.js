import { recordDailyXp } from "../../profile/services/dailyXpApi";

export function recordLessonXp(token, course, lesson) {
  if (!token || !lesson || !course) return Promise.resolve();

  const lessonId = lesson.id || lesson.lessonId;
  if (!lessonId) return Promise.resolve();

  const xp = Number(lesson.xp) || 0;
  if (xp <= 0) return Promise.resolve();

  return recordDailyXp(token, {
    course,
    lessonId,
    title: lesson.title || "",
    xp,
  }).catch(() => {});
}

const IDE_RUN_XP = 3;

export function recordPlaygroundRunXp(token, language, file) {
  if (!token || !language) return Promise.resolve();

  const date = new Date().toISOString().slice(0, 10);
  const fileKey = file?.id || file?.serverId || file?.name || "main";
  const lessonId = `ide-run-${language}-${fileKey}-${date}`;

  return recordDailyXp(token, {
    course: "playground",
    lessonId,
    title: `IDE run (${language})`,
    xp: IDE_RUN_XP,
  }).catch(() => null);
}

export { IDE_RUN_XP };
