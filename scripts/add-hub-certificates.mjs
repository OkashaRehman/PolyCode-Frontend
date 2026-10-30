#!/usr/bin/env node
/**
 * Add CourseCertificate to learn hubs that are missing it.
 * Usage: node scripts/add-hub-certificates.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const learnRoot = path.resolve(__dirname, "..", "src", "features", "learn");

const COURSE_NAMES = {
  "oops-cpp": "C++ OOP",
  "pointers-cpp": "C++ Pointers",
  "numpy-py": "NumPy",
  "pandas-py": "Pandas",
  "fastapi-py": "FastAPI",
  "opencv-py": "OpenCV",
  "pytorch-py": "PyTorch",
  "python-fundamentals": "Python Fundamentals",
  "python-oop-py": "Python OOP",
  "python-file-handling-py": "Python File Handling",
  "matplotlib-py": "Matplotlib",
  "ai-ml-py": "AI & ML with Python",
  "cpp-fundamentals": "C++ Fundamentals",
  "dsa-cpp": "DSA with C++",
  "c-fundamentals": "C Fundamentals",
  "c-functions": "C Functions",
  "c-pointers": "C Pointers",
  "c-data-structures": "C Data Structures",
  "c-memory-management": "C Memory Management",
  "c-file-handling": "C File Handling",
  "c-projects": "C Projects",
  "js-fundamentals": "JavaScript Fundamentals",
  "js-dom": "JavaScript DOM",
  "js-web-dev": "JavaScript Web Dev",
  "js-oops": "JavaScript OOP",
  "node-npm": "Node.js & npm",
  "html-css-foundation": "HTML & CSS Foundation",
  "php-fundamentals": "PHP Fundamentals",
  "ruby-fundamentals": "Ruby Fundamentals",
  "ruby-gems": "Ruby Gems",
  "ruby-file-handling": "Ruby File Handling",
  "csharp-fundamentals": "C# Fundamentals",
  "sql-fundamentals": "SQL Fundamentals",
  "sql-queries": "SQL Queries",
  "sql-joins": "SQL Joins",
  "sql-subqueries": "SQL Subqueries",
  "sql-aggregate-functions": "SQL Aggregate Functions",
  "sql-views": "SQL Views",
  "sql-indexes": "SQL Indexes",
  "sql-stored-procedures": "SQL Stored Procedures",
  "sql-projects": "SQL Projects",
  "go-fundamentals": "Go Fundamentals",
  "ml-py": "Machine Learning with Python",
  "rust-fundamentals": "Rust Fundamentals",
  "java-fundamentals": "Java Fundamentals",
  "java-intermediate": "Java Intermediate",
  "java-advanced": "Java Advanced",
  "java-collections": "Java Collections",
  "java-exception": "Java Exception Handling",
  "java-multithreading": "Java Multithreading",
  "java-jdbc": "Java JDBC",
  "java-spring-boot": "Java Spring Boot",
  "java-projects": "Java Projects",
};

function walkHubs(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "shared") continue;
      walkHubs(full, acc);
    } else if (/Hub\.jsx$/i.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

function inferCourseId(hubPath, src) {
  const basePath = src.match(/BASE_PATH\s*=\s*"\/learn\/([^"]+)"/);
  if (basePath) {
    const slug = basePath[1];
    if (slug === "c-sharp-fundamentals") return "csharp-fundamentals";
    if (slug === "ai-ml-py" || slug === "ai_ml-py") return "ai-ml-py";
    return slug;
  }
  const folder = path.basename(path.dirname(path.dirname(hubPath)));
  return folder
    .replace(/^Js-Oops$/i, "js-oops")
    .replace(/^ai_ml-py$/i, "ai-ml-py")
    .toLowerCase()
    .replace(/_/g, "-");
}

function findLessonsSymbol(src) {
  const patterns = [
    /\b([A-Z][A-Z0-9_]*_LESSONS)\b/,
    /\b(ALL_LESSONS)\b/,
  ];
  for (const re of patterns) {
    const m = src.match(re);
    if (m) return m[1];
  }
  return null;
}

function findTotalXpSymbol(src, lessonsSymbol) {
  if (!lessonsSymbol) return null;
  const total = lessonsSymbol.replace(/_LESSONS$/, "_TOTAL_XP");
  if (src.includes(total)) return total;
  if (src.includes("TOTAL_XP")) {
    const m = src.match(/\b([A-Z][A-Z0-9_]*_TOTAL_XP)\b/);
    if (m) return m[1];
  }
  return null;
}

function titleCaseFromId(courseId) {
  return (
    COURSE_NAMES[courseId] ||
    courseId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

function ensureImport(src, hubPath) {
  if (src.includes("CourseCertificate")) return src;
  const importLine =
    'import CourseCertificate from "../../shared/CourseCertificate";\n';
  // Prefer after last relative import
  const importRe = /^import .+;$/gm;
  let last = null;
  let m;
  while ((m = importRe.exec(src))) last = m;
  if (!last) {
    return importLine + src;
  }
  const insertAt = last.index + last[0].length;
  return src.slice(0, insertAt) + "\n" + importLine.trimEnd() + src.slice(insertAt);
}

function ensureCertBlock(src, courseName, lessonsSymbol, totalXpSymbol) {
  if (src.includes("<CourseCertificate")) return src;

  const nl = src.includes("\r\n") ? "\r\n" : "\n";
  const totalXpProp = totalXpSymbol
    ? `${nl}        totalXP={${totalXpSymbol}}`
    : "";
  const block = `${nl}      <CourseCertificate${nl}        courseName="${courseName}"${nl}        totalLessons={${lessonsSymbol}.length}${nl}        completedCount={completedCount}${nl}        earnedXP={earnedXP}${totalXpProp}${nl}      />${nl}`;

  // Insert before final closing </div>  ); }
  const closeRe = /(\r?\n)    <\/div>\r?\n  \);\r?\n}\s*$/;
  if (!closeRe.test(src)) {
    throw new Error("Could not find hub closing pattern");
  }
  return src.replace(
    closeRe,
    `${block}    </div>${nl}  );${nl}}${nl}`,
  );
}

const hubs = walkHubs(learnRoot);
let added = 0;
let skipped = 0;
let errors = [];

for (const hub of hubs) {
  let src = fs.readFileSync(hub, "utf8");
  if (src.includes("CourseCertificate")) {
    skipped += 1;
    continue;
  }

  const courseId = inferCourseId(hub, src);
  const lessonsSymbol = findLessonsSymbol(src);
  if (!lessonsSymbol) {
    errors.push(`${hub}: no LESSONS symbol`);
    continue;
  }
  if (!src.includes("earnedXP") || !src.includes("completedCount")) {
    errors.push(`${hub}: missing earnedXP/completedCount`);
    continue;
  }

  const totalXpSymbol = findTotalXpSymbol(src, lessonsSymbol);
  const courseName = titleCaseFromId(courseId);

  try {
    src = ensureImport(src, hub);
    src = ensureCertBlock(src, courseName, lessonsSymbol, totalXpSymbol);
    fs.writeFileSync(hub, src);
    added += 1;
    console.log(`ADDED  ${courseId}  (${path.relative(learnRoot, hub)})`);
  } catch (err) {
    errors.push(`${hub}: ${err.message}`);
  }
}

console.log(`\nAdded: ${added}, already had: ${skipped}, errors: ${errors.length}`);
for (const e of errors) console.error(`ERR   ${e}`);
process.exit(errors.length ? 1 : 0);
