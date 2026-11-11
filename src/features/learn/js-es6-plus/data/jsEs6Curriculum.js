// PolyCode — JS ES6+ Modern JavaScript (Beginner → Advanced)
// 7 chapters · course focused on ES6+ features with runnable examples and challenges

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
// eslint-disable-next-line no-unused-vars
import { JS_ACCENT, quiz, callout, text, diagram, table, objectives } from "../../js-fundamentals/data/jsCurriculumHelpers";

const ACCENT = JS_ACCENT;

const RAW_CHAPTERS = [
  {
    id: "intro-es6",
    title: "ES6+ Essentials",
    icon: "sparkles",
    color: ACCENT,
    lessons: [
      {
        id: "es6-0",
        title: "let, const & template literals",
        xp: 10,
        theory: [
          objectives([
            "Use let and const appropriately",
            "Write template literals with embedded expressions",
            "Avoid var and prefer modern declarations",
          ]),
          text(
            "ES6 introduced `let` and `const` to fix confusing `var` scoping. Use `const` by default and `let` when reassignment is needed.",
            // eslint-disable-next-line no-template-curly-in-string
            { label: "Example", content: 'const name = "PolyCode";\nconst lessons = 12;\nconsole.log(`${name} — ${lessons} lessons`);' },
          ),
          callout("tip", "Prefer `const` and only use `let` for counters or values that change."),
          quiz(
            "Which declaration should you use by default?",
            ["var", "let", "const", "define"],
            2,
            "Use `const` unless you plan to reassign the variable."
          ),
        ],
        challenge: {
          title: "Greeting Card",
          description: "Create `const who = 'Student'` and `const course = 'JS ES6+'`, then log `Hello, <who> — welcome to <course>!` using a template literal.",
          starterCode: 'const who = \'Student\';\nconst course = \'JS ES6+\';\n\n// log a greeting using a template literal\n',
          // eslint-disable-next-line no-template-curly-in-string
          solutionCode: 'const who = \'Student\';\nconst course = \'JS ES6+\';\nconsole.log(`Hello, ${who} - welcome to ${course}!`);\n',
          tests: [
            { id: 1, label: "Uses const who", keywords: [{ pattern: "const\\s+who" }] },
            { id: 2, label: "Uses template literal", keywords: [{ pattern: "`Hello,\\s*\\$\\{who\\}.*\\$\\{course\\}`" }] },
          ],
        },
      },
      {
        id: "es6-1",
        title: "Arrow functions & implicit return",
        xp: 10,
        theory: [
          text(
            "Arrow functions provide concise syntax and lexical `this`. When the body is a single expression you can omit braces and `return`.",
            { label: "Example", content: `const add = (a, b) => a + b;\nconsole.log(add(2, 3));` },
          ),
          callout("info", "Avoid using arrow functions as object methods when you rely on `this`.")
        ],
        challenge: {
          title: "Map Doubles",
          description: "Given `const nums = [1,2,3]`, use `.map` with an arrow function to create `doubled` and log it.",
          starterCode: `const nums = [1, 2, 3];
// create doubled using map and arrow function
const doubled = nums.map((n) => n * 2);

console.log(doubled);
`,
          solutionCode: `const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2);
console.log(doubled);
`,
          tests: [
            { id: 1, label: "Uses map", keywords: [{ pattern: "\\.map\\s*\\(" }] },
            { id: 2, label: "Produces doubled array", keywords: [{ pattern: "n\\s*=>\\s*n\\s*\\*\\s*2" }] },
          ],
        },
      },
    ],
  },

  {
    id: "destructuring",
    title: "Destructuring & Spread",
    icon: "columns",
    color: "#06b6d4",
    lessons: [
      {
        id: "es6-2",
        title: "Array & object destructuring",
        xp: 12,
        theory: [
          text(
            "Destructuring extracts values from arrays and objects into variables. It's concise and common in modern code.",
            { label: "Example", content: `const [a, b] = [10, 20];\nconst { name, age } = { name: 'Ali', age: 28 };\nconsole.log(a, b, name, age);` },
          ),
          callout("tip", "Use defaults in destructuring: `const {x = 0} = obj;`).")
        ],
        challenge: {
          title: "Pick fields",
          description: "Destructure `const user = {name: 'Rita', role: 'student'}` to get `name` and `role`, then log them.",
          starterCode: `const user = { name: 'Rita', role: 'student' };
// destructure user into name and role

console.log(name, role);
`,
          solutionCode: `const user = { name: 'Rita', role: 'student' };
const { name, role } = user;
console.log(name, role);
`,
          tests: [
            { id: 1, label: "Destructures name", keywords: [{ pattern: "\\{\\s*name\\s*," }] },
            { id: 2, label: "Logs both", keywords: [{ pattern: "console\\.log\\s*\\(\\s*name\\s*,\\s*role\\s*\\)" }] },
          ],
        },
      },
      {
        id: "es6-3",
        title: "Spread & rest operators",
        xp: 12,
        theory: [
          text(
            "Spread (`...`) expands arrays or objects. Rest collects remaining items into an array or object. These are essential for immutability and function arguments.",
            { label: "Example", content: `const a = [1, 2];\nconst b = [...a, 3];\nfunction sum(...nums) { return nums.reduce((s, n) => s + n, 0); }\nconsole.log(b, sum(...b));` },
          ),
        ],
        challenge: {
          title: "Merge arrays",
          description: "Given `const a = [1,2]` and `const b = [3,4]`, create `all` by spreading both and log length 4.",
          starterCode: `const a = [1, 2];
const b = [3, 4];
// create all by spreading both arrays

console.log(all.length);
`,
          solutionCode: `const a = [1, 2];
const b = [3, 4];
const all = [...a, ...b];
console.log(all.length);
`,
          tests: [
            { id: 1, label: "Uses spread", keywords: [{ pattern: "\\.\\.\\.a" }] },
            { id: 2, label: "Length 4", keywords: [{ pattern: "all\\.length" }] },
          ],
        },
      },
    ],
  },

  {
    id: "modules",
    title: "Modules & Tooling",
    icon: "cube",
    color: "#22c55e",
    lessons: [
      {
        id: "es6-4",
        title: "Import / export basics",
        xp: 12,
        theory: [
          text(
            "ES modules (`import` / `export`) are the standard for modern JS. In Node you may enable them with `type: \"module\"` in package.json, and bundlers handle them for browsers.",
            { label: "Example (pseudo)", content: `// Function definition
function greet(name) { 
  return 'Hello, ' + name; 
}

// Function call
console.log(greet('You'));` },
          ),
          callout("info", "In PolyCode challenges we avoid file imports; treat this lesson as conceptual and use code snippets in the console."),
        ],
        challenge: {
          title: "Named export (concept)",
          description: "Write a function `sum(a,b)` and return a comment that shows how you'd export it as a named export (no runtime import needed).",
          starterCode: 'function sum(a, b) {\n  // return the sum here\n}\n\n// export { sum };  <- how you would export in a module\nconsole.log(sum(2, 3));\n',
          solutionCode: `function sum(a, b) { return a + b; }
// export { sum };  <- how you'd export in a module
console.log(sum(2,3));
`,
          tests: [
            { id: 1, label: "Defines sum", keywords: [{ pattern: "function\\s+sum\\s*\\(" }] },
            { id: 2, label: "Calls sum", keywords: [{ pattern: "sum\\s*\\(\\s*2\\s*,\\s*3\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  {
    id: "async",
    title: "Promises & async/await",
    icon: "clock",
    color: "#f97316",
    lessons: [
      {
        id: "es6-5",
        title: "Promises fundamentals",
        xp: 14,
        theory: [
          text(
            "Promises represent a future value. Use `.then` and `.catch` or `async/await` for clearer, sequential code.",
            { label: "Example", content: `const p = Promise.resolve(42);\np.then(v => console.log(v));` },
          ),
          quiz("Which keyword makes async code look synchronous?", ["then", "await", "promise", "setTimeout"], 1, "`await` inside `async` functions makes code read like synchronous flows."),
        ],
        challenge: {
          title: "Await a value",
          description: "Create an async function `f` that returns `42` after `await Promise.resolve(42)` and log `await f()`.",
          starterCode: 'async function f() {\n  // return the awaited value\n}\n\n(async () => {\n  console.log(await f());\n})();\n',
          solutionCode: `async function f() { return await Promise.resolve(42); }
(async () => { console.log(await f()); })();
`,
          tests: [
            { id: 1, label: "Defines async f", keywords: [{ pattern: "async\\s+function\\s+f" }] },
            { id: 2, label: "Logs 42", keywords: [{ pattern: "console\\.log\\s*\\(\\s*await\\s*f\\s*\\(\\s*\\)\\s*\\)" }] },
          ],
        },
      },
      {
        id: "es6-6",
        title: "Fetch & error handling",
        xp: 14,
        theory: [
          text(
            "`fetch` returns a promise — use `await` and try/catch to handle errors cleanly. In Node use `node-fetch` or built-in fetch in modern Node versions.",
            { label: "Example", content: `async function getJson(url) {
  const res = await fetch(url);
  return res.json();
}

// Call the function and log the output
const data = await getJson('https://jsonplaceholder.typicode.com/todos/1');
console.log(data);` },
          ),
          callout("warning", "Network code can fail — always handle exceptions when awaiting fetch."),
        ],
        challenge: {
          title: "Safe parse",
          description: 'Write a function safeJson that parses a JSON string and returns the object or null on error. Log safeJson(\'{"a":1}\').',
          starterCode: 'function safeJson(s) {\n  try {\n    // parse JSON here\n  } catch (e) {\n    return null;\n  }\n}\nconsole.log(safeJson(\'{"a":1}\'));\n',
          solutionCode: `function safeJson(s) {
  try {
    return JSON.parse(s);
  } catch (e) {
    return null;
  }
}
console.log(safeJson('{"a":1}'));
`,
          tests: [
            { id: 1, label: "Defines safeJson", keywords: [{ pattern: "function\\s+safeJson" }] },
            { id: 2, label: "Returns object", keywords: [{ pattern: "console\\.log\\s*\\(\\s*safeJson\\s*\\(\\s*'{\\\\\"a\\\\\":1}'\\s*\\)\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  {
    id: "oop",
    title: "Classes & OOP",
    icon: "badge",
    color: "#a78bfa",
    lessons: [
      {
        id: "es6-7",
        title: "Classes & extends",
        xp: 14,
        theory: [
          text(
            "Classes provide a clean syntax for constructor functions and prototypes. Use `extends` to create subclasses.",
            { label: "Example", content: `class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return this.name; }\n}\nclass Dog extends Animal {\n  speak() { return this.name + ' barks'; }\n}\nconsole.log(new Dog('Rex').speak());` },
          ),
        ],
        challenge: {
          title: "Make a class",
          description: "Create class `Counter` with constructor and `inc()` that increases `this.n` and `get()` that returns it. Log new Counter().get() after increment.",
          starterCode: 'class Counter {\n  constructor() {\n    this.n = 0;\n  }\n  inc() {\n    // increase this.n\n  }\n  get() {\n    // return this.n\n  }\n}\n\nconst c = new Counter();\nc.inc();\nconsole.log(c.get());\n',
          solutionCode: `class Counter {
  constructor() { this.n = 0; }
  inc() { this.n += 1; }
  get() { return this.n; }
}
const c = new Counter();
c.inc();
console.log(c.get());
`,
          tests: [
            { id: 1, label: "Defines class Counter", keywords: [{ pattern: "class\\s+Counter" }] },
            { id: 2, label: "Uses inc and get", keywords: [{ pattern: "c\\.inc\\s*\\(\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  {
    id: "advanced",
    title: "Advanced patterns",
    icon: "rocket",
    color: "#ef4444",
    lessons: [
      {
        id: "es6-8",
        title: "Map, Set & iterators",
        xp: 12,
        theory: [
          text(
            "Map and Set store keyed and unique collections with better semantics for certain problems. Iterators let you control iteration flow.",
            { label: "Example", content: `const s = new Set([1, 2, 2]);\nconst m = new Map([['a', 1]]);\nconsole.log(s.size, m.get('a'));` },
          ),
        ],
        challenge: {
          title: "Unique items",
          description: "Given `const items = [1,2,2,3]`, create a `Set` and log its size (should be 3).",
          starterCode: `const items = [1,2,2,3];
// create set and log size

`,
          solutionCode: `const items = [1,2,2,3];
const s = new Set(items);
console.log(s.size);
`,
          tests: [
            { id: 1, label: "Creates Set", keywords: [{ pattern: "new\\s+Set\\s*\\(" }] },
            { id: 2, label: "Logs size", keywords: [{ pattern: "s\\.size" }] },
          ],
        },
      },
      {
        id: "es6-9",
        title: "Course wrap-up",
        xp: 16,
        theory: [
          text("This course focused on ES6+ features you will use daily: modern declarations, arrows, destructuring, spread, modules, async, classes, and collections."),
          callout("tip", "Practice by rewriting small functions from old style to modern ES6+ style."),
        ],
        challenge: {
          title: "One-line summary",
          description: "Write a one-line arrow function `summary` that returns the string `'ES6+'`. Log it.",
          starterCode: `// one-line arrow function
const summary = () => 'ES6+';

console.log(summary());
`,
          solutionCode: `const summary = () => 'ES6+';
console.log(summary());
`,
          tests: [
            { id: 1, label: "Defines summary", keywords: [{ pattern: "const\\s+summary\\s*=\\s*\\(\\s*\\)\\s*=>" }] },
            { id: 2, label: "Calls summary", keywords: [{ pattern: "summary\\s*\\(\\s*\\)" }] },
          ],
        },
      },
    ],
  },
];

export const JS_ES6_CHAPTERS = RAW_CHAPTERS;

export const JS_ES6_LESSONS = applyLessonVideoLinks(
  RAW_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({ ...l, chapterId: ch.id, chapterTitle: ch.title, chapterColor: ch.color })),
  ),
  {},
);

export const JS_ES6_TOTAL_XP = JS_ES6_LESSONS.reduce((s, l) => s + l.xp, 0);

export default JS_ES6_CHAPTERS;
