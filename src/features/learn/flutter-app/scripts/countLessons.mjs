import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../data");
const c = fs.readFileSync(path.join(dir, "flutterCurriculum.js"), "utf8");
const v = fs.readFileSync(path.join(dir, "flutterAppVideoLinks.js"), "utf8");
const q = fs.readFileSync(path.join(dir, "flutterAppSecondQuizzes.js"), "utf8");
const o = fs.readFileSync(path.join(dir, "flutterAppLessonOutcomes.js"), "utf8");

const ids = new Set([...c.matchAll(/id: "(flutter-\d+)"/g)].map((m) => m[1]));
console.log({
  lessons: ids.size,
  videos: (v.match(/"flutter-\d+"/g) || []).length,
  quizzes: (q.match(/"flutter-\d+"/g) || []).length,
  outcomes: (o.match(/"flutter-\d+"/g) || []).length,
  comingSoon: /Coming soon/i.test(c),
});
