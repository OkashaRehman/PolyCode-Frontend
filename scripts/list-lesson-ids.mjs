import fs from "fs";

const courses = [
  "python-fundamentals/data/pythonFundamentalsCurriculum.js",
  "pandas-py/data/pandasCurriculum.js",
  "csharp-fundamentals/data/csharpCurriculum.js",
  "dsa-cpp/data/dsaCppCurriculum.js",
  "pointers-cpp/data/pointersCurriculum.js",
  "js-dom/data/jsDomCurriculum.js",
  "js-web-dev/data/jsWebDevCurriculum.js",
];

for (const c of courses) {
  const s = fs.readFileSync(`src/features/learn/${c}`, "utf8");
  const ids = [...s.matchAll(/id:\s*["']([^"']+)["']/g)]
    .map((m) => m[1])
    .filter(
      (id) =>
        !id.startsWith("ch-") &&
        !/^(intro|foundations|basics|dom-intro|arrays|complexity)$/.test(id) &&
        (id.includes("-") || /^[a-z]+\d/.test(id)),
    );
  console.log(`\n${c}: ${ids.length}`);
  console.log(ids.join(", "));
}
