import fs from "fs";
import path from "path";

const ROOT = path.resolve("src/features/learn");
const PLACEHOLDER =
  /(TODO|TBD|coming soon|placeholder|lorem ipsum|fill in later|stub lesson|under construction|expand this|add content)/i;

const STUB_PHRASE = "This lesson covers the essential concepts";

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/Curriculum\.js$/i.test(ent.name)) out.push(p);
  }
  return out;
}

function extractLessons(source) {
  const lessons = [];
  const lessonRe = /\{\s*\n\s*id:\s*["']([^"']+)["']/g;
  let m;
  while ((m = lessonRe.exec(source))) {
    const id = m[1];
    if (!id.includes("-")) continue;
    const start = m.index;
    const next = source.indexOf("\n  },", start + 1);
    const chunk = next > start ? source.slice(start, next) : source.slice(start, start + 8000);
    lessons.push({ id, chunk });
  }
  return lessons;
}

function theoryChars(chunk) {
  const blocks = [...chunk.matchAll(/type:\s*["'](text|callout)["'][\s\S]*?content:\s*`([\s\S]*?)`/g)];
  return blocks.reduce((n, b) => n + b[2].replace(/\*\*|\\`/g, "").length, 0);
}

function hasChallenge(chunk) {
  return /challenge:\s*\{/.test(chunk) && /starterCode:/.test(chunk);
}

function testCount(chunk) {
  const m = chunk.match(/tests:\s*\[/);
  if (!m) return 0;
  const start = m.index;
  let depth = 0;
  let i = start + "tests:".length;
  while (i < chunk.length) {
    const ch = chunk[i];
    if (ch === "[") depth++;
    if (ch === "]") {
      depth--;
      if (depth === 0) {
        const arr = chunk.slice(start, i + 1);
        return (arr.match(/\{/g) || []).length;
      }
    }
    i++;
  }
  return 0;
}

function hasQuiz(chunk) {
  return /quiz:\s*\[/.test(chunk);
}

const files = walk(ROOT).sort();
const results = [];

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const course = path.basename(path.dirname(path.dirname(file)));
  const chapterMatches = source.match(/id:\s*["']ch-/g) || [];
  const lessons = extractLessons(source);

  let noChallenge = 0;
  let thinTheory = 0;
  let noTheory = 0;
  let placeholder = 0;
  let withQuiz = 0;
  let totalTheory = 0;
  let totalTests = 0;
  const thinIds = [];
  const placeholderIds = [];

  for (const { id, chunk } of lessons) {
    const chars = theoryChars(chunk);
    totalTheory += chars;
    if (chars === 0) noTheory++;
    else if (chars < 250) {
      thinTheory++;
      thinIds.push(id);
    }
    if (PLACEHOLDER.test(chunk)) {
      placeholder++;
      placeholderIds.push(id);
    }
    if (!hasChallenge(chunk)) noChallenge++;
    totalTests += testCount(chunk);
    if (hasQuiz(chunk)) withQuiz++;
  }

  const fileKb = Math.round(fs.statSync(file).size / 1024);
  const stubLessons = (source.match(new RegExp(STUB_PHRASE, "g")) || []).length;
  results.push({
    course,
    fileKb,
    stubLessons,
    chapters: chapterMatches.length,
    lessons: lessons.length,
    noChallenge,
    thinTheory,
    noTheory,
    placeholder,
    avgTheoryChars: lessons.length ? Math.round(totalTheory / lessons.length) : 0,
    avgTests: lessons.length ? +(totalTests / lessons.length).toFixed(1) : 0,
    quizCoverage: lessons.length ? Math.round((withQuiz / lessons.length) * 100) : 0,
    thinIds: thinIds.slice(0, 5),
    placeholderIds: placeholderIds.slice(0, 5),
  });
}

results.sort((a, b) => a.lessons - b.lessons || a.avgTheoryChars - b.avgTheoryChars);

const score = (r) => {
  let s = 0;
  if (r.stubLessons >= 10) s += 5;
  else if (r.stubLessons > 0) s += 2;
  if (r.lessons < 15) s += 2;
  else if (r.lessons < 20) s += 1;
  if (r.fileKb < 40) s += 2;
  else if (r.fileKb < 60) s += 1;
  if (r.avgTheoryChars > 0 && r.avgTheoryChars < 500) s += 2;
  if (r.thinTheory > r.lessons * 0.35) s += 2;
  if (r.noChallenge > 0) s += 2;
  return s;
};

console.log("COURSE CONTENT AUDIT");
console.log("=".repeat(72));
for (const r of results) {
  const s = score(r);
  const flag = s >= 5 ? "LOW" : s >= 3 ? "MED" : "OK";
  console.log(
    `[${flag}] ${r.course.padEnd(28)} lessons=${String(r.lessons).padStart(3)} ch=${String(r.chapters).padStart(2)} avgTheory=${String(r.avgTheoryChars).padStart(5)}ch file=${String(r.fileKb).padStart(4)}KB stub=${String(r.stubLessons).padStart(2)} noCh=${r.noChallenge} thin=${r.thinTheory}`,
  );
  if (s >= 3 && (r.thinIds.length || r.placeholderIds.length)) {
    if (r.thinIds.length) console.log(`      thin: ${r.thinIds.join(", ")}`);
    if (r.placeholderIds.length)
      console.log(`      placeholder: ${r.placeholderIds.join(", ")}`);
  }
}

console.log("\nLOW/MED flagged courses:", results.filter((r) => score(r) >= 3).map((r) => r.course).join(", "));
