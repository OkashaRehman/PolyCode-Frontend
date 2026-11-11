// PolyCode — Node.js & npm full curriculum
// 6 chapters · 18 lessons · hands-on JS challenges modeling real npm workflows
// Video links: edit nodeNpmVideoLinks.js

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { NODE_NPM_VIDEO_LINKS } from "./nodeNpmVideoLinks";
import { applyNodeNpmEnhancements } from "./nodeNpmLessonEnhancements";
import {
  quiz,
  callout,
  text,
  diagram,
  table,
  objectives,
} from "../../js-fundamentals/data/jsCurriculumHelpers";

const NODE_GREEN = "#339933";
const PKG_BLUE = "#2563eb";
const DEPS_PURPLE = "#7c3aed";
const SCRIPTS_TEAL = "#0d9488";
const MODULES_AMBER = "#d97706";
const PROD_RED = "#dc2626";

export const NODE_NPM_CHAPTERS = applyNodeNpmEnhancements([
  {
    id: "foundations",
    title: "Node.js & npm Foundations",
    icon: "terminal",
    color: NODE_GREEN,
    lessons: [
      {
        id: "node-0",
        title: "What is Node.js?",
        xp: 12,
        chapterTitle: "Node.js & npm Foundations",
        theory: [
          objectives([
            "Explain what Node.js is and why it exists",
            "Describe the V8 engine and event loop at a high level",
            "Know when Node is the right tool vs the browser",
          ]),
          text(
            "**Node.js** is a JavaScript runtime built on Chrome's **V8** engine. It lets you run JavaScript outside the browser — on servers, CLIs, build tools, and automation scripts.",
            {
              label: "Check a Node-style version string",
              content: `const runtime = { name: "node", version: "22.0.0", v8: "12.4.0" };
console.log(runtime.name, runtime.version);`,
            },
          ),
          diagram("Where Node.js fits", [
            {
              id: "js",
              label: "JavaScript code",
              color: NODE_GREEN,
              items: ["Same language as the browser", "Functions, objects, async"],
            },
            {
              id: "v8",
              label: "V8 engine",
              color: PKG_BLUE,
              items: ["Compiles JS to machine code", "Powers Chrome & Node"],
            },
            {
              id: "apis",
              label: "Node APIs",
              color: DEPS_PURPLE,
              items: ["fs, path, http", "No DOM or window"],
            },
            {
              id: "use",
              label: "Common uses",
              color: SCRIPTS_TEAL,
              items: ["REST APIs", "CLIs & scripts", "Bundlers & dev tools"],
            },
          ]),
          text(
            "Node is **single-threaded** with an **event loop** for I/O. That design handles thousands of concurrent network requests efficiently without spawning a thread per connection.",
          ),
          callout(
            "info",
            "Node is not a framework — it's a runtime. Express, Fastify, and NestJS are frameworks that run *on* Node.",
          ),
          quiz(
            "What is Node.js primarily?",
            [
              "A browser plugin for faster pages",
              "A JavaScript runtime outside the browser",
              "A CSS preprocessor",
              "A database server only",
            ],
            1,
            "Node.js runs JavaScript on your machine or server using the V8 engine.",
          ),
        ],
        challenge: {
          title: "Parse a Runtime String",
          description:
            "Write `parseRuntime(input)` that splits `\"node/22.0.0\"` into `{ name: \"node\", version: \"22.0.0\" }`. Return null if the format is invalid.",
          starterCode: `function parseRuntime(input) {
  // split name/version
}

console.log(parseRuntime("node/22.0.0"));
`,
          solutionCode: `function parseRuntime(input) {
  if (typeof input !== "string") return null;
  const parts = input.split("/");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  return { name: parts[0], version: parts[1] };
}

console.log(parseRuntime("node/22.0.0"));
`,
          tests: [
            { id: 1, label: "Defines parseRuntime", keywords: [{ pattern: "function\\s+parseRuntime" }] },
            { id: 2, label: "Splits on slash", keywords: [{ pattern: "split\\s*\\(\\s*['\"]/['\"]" }] },
            { id: 3, label: "Returns name and version", keywords: [{ pattern: "name" }, { pattern: "version" }] },
          ],
        },
      },
      {
        id: "node-1",
        title: "What is npm?",
        xp: 12,
        chapterTitle: "Node.js & npm Foundations",
        theory: [
          objectives([
            "Define npm and its relationship to Node.js",
            "Explain the npm registry and package ecosystem",
            "Use basic npm CLI commands conceptually",
          ]),
          text(
            "**npm** (Node Package Manager) ships with Node.js. It downloads open-source libraries, manages versions, runs project scripts, and publishes your own packages to the **npm registry** at [npmjs.com](https://www.npmjs.com).",
          ),
          diagram("npm workflow", [
            {
              id: "init",
              label: "npm init",
              color: NODE_GREEN,
              items: ["Creates package.json", "Names your project"],
            },
            {
              id: "install",
              label: "npm install",
              color: PKG_BLUE,
              items: ["Reads package.json", "Downloads to node_modules"],
            },
            {
              id: "lock",
              label: "Lock file",
              color: DEPS_PURPLE,
              items: ["package-lock.json", "Pins exact versions"],
            },
            {
              id: "run",
              label: "npm run",
              color: SCRIPTS_TEAL,
              items: ["Runs scripts block", "start, test, build…"],
            },
          ]),
          table("Essential npm commands", ["Command", "What it does"], [
            ["npm init", "Create a new package.json interactively"],
            ["npm install express", "Add express to dependencies"],
            ["npm install -D vitest", "Add vitest as a devDependency"],
            ["npm run test", "Run the test script from package.json"],
            ["npm -v", "Print npm version"],
          ]),
          callout(
            "tip",
            "Use `npm init -y` to accept all defaults and get a package.json instantly — great for quick experiments.",
          ),
          quiz(
            "What does `npm install lodash` do?",
            [
              "Compiles lodash to C++",
              "Downloads lodash into node_modules and updates package.json",
              "Deletes node_modules",
              "Starts a web server",
            ],
            1,
            "npm install fetches the package from the registry and records it in your project manifest.",
          ),
        ],
        challenge: {
          title: "Extract Package Scope",
          description:
            "Write `getScope(name)` that returns `@org` from `@org/pkg` or `null` for unscoped names like `lodash`.",
          starterCode: `function getScope(name) {
  // return @scope or null
}

console.log(getScope("@polycode/cli"));
console.log(getScope("lodash"));
`,
          solutionCode: `function getScope(name) {
  if (typeof name !== "string" || !name.startsWith("@")) return null;
  const slash = name.indexOf("/");
  if (slash === -1) return null;
  return name.slice(0, slash);
}

console.log(getScope("@polycode/cli"));
console.log(getScope("lodash"));
`,
          tests: [
            { id: 1, label: "Defines getScope", keywords: [{ pattern: "function\\s+getScope" }] },
            { id: 2, label: "Checks scoped prefix", keywords: [{ pattern: "startsWith\\s*\\(\\s*['\"]@" }] },
            { id: 3, label: "Returns null for unscoped", keywords: [{ pattern: "null" }] },
          ],
        },
      },
      {
        id: "node-2",
        title: "Node.js vs Browser JavaScript",
        xp: 14,
        chapterTitle: "Node.js & npm Foundations",
        theory: [
          objectives([
            "List globals available in Node but not in the browser",
            "Explain why `window` and `document` are undefined in Node",
            "Know how to share code between environments",
          ]),
          text(
            "Browser JavaScript has **DOM** APIs (`document`, `window`, `fetch` in older setups). Node provides **system** APIs: `fs` for files, `path` for paths, `http` for servers, and `process` for environment info.",
          ),
          table("Environment comparison", ["API", "Browser", "Node.js"], [
            ["document", "✓ DOM tree", "✗ not available"],
            ["window", "✓ global object", "✗ use globalThis"],
            ["process.env", "✗", "✓ environment variables"],
            ["require / import", "bundler-dependent", "✓ native modules"],
            ["console.log", "✓ DevTools", "✓ terminal output"],
          ]),
          text(
            "Modern projects use **bundlers** (Vite, webpack) or **universal** libraries to share code. npm packages often ship code that works in both places when marked correctly.",
          ),
          callout(
            "warning",
            "Never assume `window` exists in Node. Guard shared code: `typeof window !== \"undefined\"`.",
          ),
          quiz(
            "Which global is Node-specific?",
            ["document", "window", "process", "alert"],
            2,
            "`process` exposes argv, env, cwd, and exit codes — core to CLI and server apps.",
          ),
        ],
        challenge: {
          title: "Detect Runtime Environment",
          description:
            "Implement `detectRuntime(globals)` that returns `\"node\"` if `globals.process` exists, `\"browser\"` if `globals.window` exists, else `\"unknown\"`.",
          starterCode: `function detectRuntime(globals) {
  // return "node", "browser", or "unknown"
}

console.log(detectRuntime({ process: {}, window: undefined }));
console.log(detectRuntime({ window: {}, process: undefined }));
`,
          solutionCode: `function detectRuntime(globals) {
  if (globals?.process) return "node";
  if (globals?.window) return "browser";
  return "unknown";
}

console.log(detectRuntime({ process: {}, window: undefined }));
console.log(detectRuntime({ window: {}, process: undefined }));
`,
          tests: [
            { id: 1, label: "Defines detectRuntime", keywords: [{ pattern: "function\\s+detectRuntime" }] },
            { id: 2, label: "Checks process", keywords: [{ pattern: "process" }] },
            { id: 3, label: "Returns node or browser", keywords: [{ pattern: "\"node\"" }, { pattern: "\"browser\"" }] },
          ],
        },
      },
    ],
  },
  {
    id: "package-json",
    title: "package.json Deep Dive",
    icon: "file",
    color: PKG_BLUE,
    lessons: [
      {
        id: "node-3",
        title: "Creating a Project with npm init",
        xp: 12,
        chapterTitle: "package.json Deep Dive",
        theory: [
          objectives([
            "Create a package.json with npm init",
            "Understand required vs optional fields",
            "Set name, version, and entry point correctly",
          ]),
          text(
            "Every Node project starts with **package.json** — the manifest npm reads for installs, scripts, and publishing. Run `npm init` in an empty folder or `npm init -y` for defaults.",
            {
              label: "Minimal package.json shape",
              content: `const pkg = {
  name: "my-app",
  version: "1.0.0",
  main: "index.js",
  scripts: { test: "echo \\"ok\\"" },
};
console.log(pkg.name, pkg.version);`,
            },
          ),
          table("Key fields at init", ["Field", "Purpose", "Example"], [
            ["name", "Package identifier (lowercase, no spaces)", "my-api"],
            ["version", "Semver string", "1.0.0"],
            ["description", "Short summary for npm", "REST API for todos"],
            ["main", "Entry when required()", "index.js"],
            ["scripts", "Named commands", "{ \"start\": \"node index.js\" }"],
            ["license", "Legal terms", "MIT"],
          ]),
          callout(
            "tip",
            "Package names must be unique on the public registry. Use scopes (`@yourorg/pkg`) for private team packages.",
          ),
          quiz(
            "What does `npm init -y` do?",
            [
              "Deletes package.json",
              "Creates package.json with default values without prompts",
              "Installs all dependencies",
              "Publishes to npm",
            ],
            1,
            "The -y flag skips interactive questions and writes sensible defaults.",
          ),
        ],
        challenge: {
          title: "Validate Package Name",
          description:
            "Write `isValidPackageName(name)` — true only if lowercase, no spaces, and matches `/^[a-z0-9._-]+$/`.",
          starterCode: `function isValidPackageName(name) {
  // return true/false
}

console.log(isValidPackageName("my-app"));
console.log(isValidPackageName("Bad Name"));
`,
          solutionCode: `function isValidPackageName(name) {
  if (typeof name !== "string") return false;
  return /^[a-z0-9._-]+$/.test(name);
}

console.log(isValidPackageName("my-app"));
console.log(isValidPackageName("Bad Name"));
`,
          tests: [
            { id: 1, label: "Defines isValidPackageName", keywords: [{ pattern: "function\\s+isValidPackageName" }] },
            { id: 2, label: "Uses regex test", keywords: [{ pattern: "test\\s*\\(" }] },
            { id: 3, label: "Rejects spaces", keywords: [{ pattern: "Bad Name" }] },
          ],
        },
      },
      {
        id: "node-4",
        title: "package.json Fields Explained",
        xp: 15,
        chapterTitle: "package.json Deep Dive",
        theory: [
          objectives([
            "Read and explain every major package.json field",
            "Use engines, files, and bin correctly",
            "Understand type module vs commonjs",
          ]),
          text(
            "Beyond basics, production package.json files use **engines** (required Node version), **files** (what gets published), **bin** (CLI commands), **exports** (modern entry map), and **type** (`\"module\"` for native ESM).",
          ),
          table("Advanced fields", ["Field", "When you need it"], [
            ["dependencies", "Packages required at runtime"],
            ["devDependencies", "Build, test, lint tools only"],
            ["peerDependencies", "Expected but not bundled (plugins)"],
            ["optionalDependencies", "Nice-to-have; install may fail silently"],
            ["engines", "Warn if Node/npm version too old"],
            ["exports", "Control what importers can access"],
            ["type", "\"module\" enables import/export without .mjs"],
          ]),
          diagram("Who reads package.json?", [
            {
              id: "npm",
              label: "npm CLI",
              color: PKG_BLUE,
              items: ["install", "publish", "run scripts"],
            },
            {
              id: "node",
              label: "Node.js",
              color: NODE_GREEN,
              items: ["Resolves main/exports", "Reads type field"],
            },
            {
              id: "tools",
              label: "Tooling",
              color: DEPS_PURPLE,
              items: ["ESLint, Jest configs", "CI pipelines"],
            },
          ]),
          callout(
            "info",
            "`private: true` prevents accidental `npm publish` — always set it on apps that are not libraries.",
          ),
          quiz(
            "Which field lists packages needed only during development?",
            ["dependencies", "devDependencies", "bundledDependencies", "optionalDependencies"],
            1,
            "devDependencies are not installed when someone installs your package as a dependency.",
          ),
        ],
        challenge: {
          title: "Classify Dependency Bucket",
          description:
            "Write `classifyDep(name, devList)` that returns `\"dev\"` if name is in devList, else `\"prod\"`.",
          starterCode: `const devList = ["vitest", "eslint", "typescript"];

function classifyDep(name, devList) {
  // return "dev" or "prod"
}

console.log(classifyDep("vitest", devList));
console.log(classifyDep("express", devList));
`,
          solutionCode: `const devList = ["vitest", "eslint", "typescript"];

function classifyDep(name, devList) {
  return devList.includes(name) ? "dev" : "prod";
}

console.log(classifyDep("vitest", devList));
console.log(classifyDep("express", devList));
`,
          tests: [
            { id: 1, label: "Defines classifyDep", keywords: [{ pattern: "function\\s+classifyDep" }] },
            { id: 2, label: "Uses includes", keywords: [{ pattern: "includes" }] },
            { id: 3, label: "Returns dev or prod", keywords: [{ pattern: "\"dev\"" }, { pattern: "\"prod\"" }] },
          ],
        },
      },
      {
        id: "node-5",
        title: "package-lock.json & Integrity",
        xp: 14,
        chapterTitle: "package.json Deep Dive",
        theory: [
          objectives([
            "Explain why package-lock.json exists",
            "Understand integrity hashes and resolved URLs",
            "Know when to commit the lockfile",
          ]),
          text(
            "**package.json** allows version *ranges* (`^1.2.0`). **package-lock.json** records the *exact* tree npm installed — every nested dependency, tarball URL, and integrity hash — so teammates and CI get identical installs.",
          ),
          diagram("Two manifests, one install", [
            {
              id: "json",
              label: "package.json",
              color: PKG_BLUE,
              items: ["Human intent", "Semver ranges", "Scripts & metadata"],
            },
            {
              id: "lock",
              label: "package-lock.json",
              color: DEPS_PURPLE,
              items: ["Machine snapshot", "Exact versions", "Integrity sha512"],
            },
            {
              id: "modules",
              label: "node_modules",
              color: NODE_GREEN,
              items: ["Physical files", "Rebuilt from lock", "Must match lock"],
            },
          ]),
          callout(
            "warning",
            "Never hand-edit package-lock.json. Change package.json, then run `npm install` to regenerate the lock.",
          ),
          quiz(
            "Why commit package-lock.json to git?",
            [
              "It replaces package.json",
              "It guarantees reproducible installs across machines",
              "It hides dependencies from users",
              "npm publish requires it in the tarball only",
            ],
            1,
            "The lockfile pins the full dependency tree so CI and production match your local install.",
          ),
        ],
        challenge: {
          title: "Compare Lock Versions",
          description:
            "Write `lockMatches(pkgVersion, lockedVersion)` — return true if lockedVersion equals pkgVersion (exact pin check).",
          starterCode: `function lockMatches(pkgVersion, lockedVersion) {
  // exact match
}

console.log(lockMatches("4.18.2", "4.18.2"));
console.log(lockMatches("^4.18.0", "4.18.2"));
`,
          solutionCode: `function lockMatches(pkgVersion, lockedVersion) {
  return pkgVersion === lockedVersion;
}

console.log(lockMatches("4.18.2", "4.18.2"));
console.log(lockMatches("^4.18.0", "4.18.2"));
`,
          tests: [
            { id: 1, label: "Defines lockMatches", keywords: [{ pattern: "function\\s+lockMatches" }] },
            { id: 2, label: "Compares versions", keywords: [{ pattern: "===" }] },
          ],
        },
      },
    ],
  },
  {
    id: "dependencies",
    title: "Dependencies & node_modules",
    icon: "layers",
    color: DEPS_PURPLE,
    lessons: [
      {
        id: "node-6",
        title: "Installing & Removing Packages",
        xp: 14,
        chapterTitle: "Dependencies & node_modules",
        theory: [
          objectives([
            "Use npm install with save flags correctly",
            "Remove packages cleanly with npm uninstall",
            "Install exact versions when needed",
          ]),
          text(
            "`npm install express` adds to **dependencies**. `npm install -D typescript` adds to **devDependencies**. `npm install express@4.18.2` pins an exact version. `npm uninstall express` removes the package and updates both json files.",
          ),
          table("Install variants", ["Command", "Effect"], [
            ["npm install", "Install all deps from lock (or resolve from json)"],
            ["npm install pkg", "Add pkg to dependencies"],
            ["npm install -D pkg", "Add pkg to devDependencies"],
            ["npm install -g pkg", "Install globally (CLI tools)"],
            ["npm install pkg@1.2.3", "Install specific version"],
            ["npm uninstall pkg", "Remove pkg and update manifests"],
          ]),
          callout(
            "tip",
            "Use `npm ls express` to see which version is installed and who depends on it in the tree.",
          ),
          quiz(
            "Which flag adds a package to devDependencies?",
            ["-g", "-D", "--force", "-p"],
            1,
            "-D (or --save-dev) records the package under devDependencies.",
          ),
        ],
        challenge: {
          title: "Build Install Command",
          description:
            "Write `installCmd(pkg, { dev, version })` returning a string like `npm install -D pkg@1.0.0` or `npm install pkg`.",
          starterCode: `function installCmd(pkg, options = {}) {
  // build npm install command string
}

console.log(installCmd("vitest", { dev: true }));
console.log(installCmd("lodash", { version: "4.17.21" }));
`,
          solutionCode: `function installCmd(pkg, options = {}) {
  let cmd = "npm install";
  if (options.dev) cmd += " -D";
  cmd += " " + pkg;
  if (options.version) cmd += "@" + options.version;
  return cmd;
}

console.log(installCmd("vitest", { dev: true }));
console.log(installCmd("lodash", { version: "4.17.21" }));
`,
          tests: [
            { id: 1, label: "Defines installCmd", keywords: [{ pattern: "function\\s+installCmd" }] },
            { id: 2, label: "Includes npm install", keywords: [{ pattern: "npm install" }] },
            { id: 3, label: "Handles dev flag", keywords: [{ pattern: "-D" }] },
          ],
        },
      },
      {
        id: "node-7",
        title: "Semantic Versioning (Semver)",
        xp: 16,
        chapterTitle: "Dependencies & node_modules",
        theory: [
          objectives([
            "Read MAJOR.MINOR.PATCH version numbers",
            "Explain ^ and ~ range operators",
            "Predict which updates npm allows",
          ]),
          text(
            "**Semver** uses `MAJOR.MINOR.PATCH`. Breaking changes bump MAJOR. New features bump MINOR. Bug fixes bump PATCH. npm ranges control automatic updates.",
          ),
          table("Range operators", ["Range", "Allows", "Example"], [
            ["1.2.3", "Exact version only", "Always 1.2.3"],
            ["^1.2.3", "Minor & patch updates", "1.9.0 OK, 2.0.0 not"],
            ["~1.2.3", "Patch updates only", "1.2.9 OK, 1.3.0 not"],
            [">=1.2.0 <2.0.0", "Explicit range", "Common in libraries"],
            ["*", "Anything (avoid in apps)", "Unpredictable installs"],
          ]),
          callout(
            "warning",
            "A caret (`^`) on `0.x` versions is special — breaking changes may appear in minor bumps before 1.0.0.",
          ),
          quiz(
            "Does `^2.4.1` allow version `2.5.0`?",
            ["Yes", "No", "Only with --force", "Only in devDependencies"],
            0,
            "Caret allows newer minor and patch within the same major version.",
          ),
        ],
        challenge: {
          title: "Parse Semver Triple",
          description:
            "Write `parseSemver(version)` returning `{ major, minor, patch }` for strings like `2.4.1` or null if invalid.",
          starterCode: `function parseSemver(version) {
  // return { major, minor, patch } or null
}

console.log(parseSemver("2.4.1"));
`,
          solutionCode: `function parseSemver(version) {
  if (typeof version !== "string") return null;
  const match = version.match(/^(\\d+)\\.(\\d+)\\.(\\d+)$/);
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

console.log(parseSemver("2.4.1"));
`,
          tests: [
            { id: 1, label: "Defines parseSemver", keywords: [{ pattern: "function\\s+parseSemver" }] },
            { id: 2, label: "Returns major minor patch", keywords: [{ pattern: "major" }, { pattern: "minor" }, { pattern: "patch" }] },
            { id: 3, label: "Uses regex or split", keywords: [{ pattern: "match|split" }] },
          ],
        },
      },
      {
        id: "node-8",
        title: "How node_modules Works",
        xp: 15,
        chapterTitle: "Dependencies & node_modules",
        theory: [
          objectives([
            "Explain nested vs flat node_modules layouts",
            "Understand how Node resolves require() paths",
            "Know why duplicate versions can exist",
          ]),
          text(
            "When you `npm install`, packages land in **node_modules**. npm hoists shared deps to the top when possible, but conflicting semver ranges can leave nested copies — e.g. two versions of `debug` under different parents.",
          ),
          diagram("Module resolution walk", [
            {
              id: "start",
              label: "require('pkg')",
              color: DEPS_PURPLE,
              items: ["Start in current folder", "Look at node_modules/pkg"],
            },
            {
              id: "up",
              label: "Walk up tree",
              color: PKG_BLUE,
              items: ["Parent node_modules", "Until root or found"],
            },
            {
              id: "pkg",
              label: "package.json main",
              color: NODE_GREEN,
              items: ["Read main or exports", "Load entry file"],
            },
          ]),
          callout(
            "info",
            "Never commit node_modules to git — it's huge and reproducible from package-lock.json. Add it to .gitignore.",
          ),
          quiz(
            "Where does Node look first for `require('lodash')`?",
            [
              "The global npm folder only",
              "./node_modules/lodash relative to the current module",
              "The Python path",
              "package-lock.json directly",
            ],
            1,
            "Node walks up the directory tree checking node_modules at each level.",
          ),
        ],
        challenge: {
          title: "Resolve Module Path",
          description:
            "Given `tree = { \"lodash\": \"4.17.21\", nested: { debug: \"4.3.4\" } }`, write `resolve(tree, name)` returning the version string or null.",
          starterCode: `const tree = {
  lodash: "4.17.21",
  nested: { debug: "4.3.4" },
};

function resolve(tree, name) {
  // return version or null
}

console.log(resolve(tree, "lodash"));
console.log(resolve(tree, "debug"));
`,
          solutionCode: `const tree = {
  lodash: "4.17.21",
  nested: { debug: "4.3.4" },
};

function resolve(tree, name) {
  if (tree[name]) return tree[name];
  if (tree.nested?.[name]) return tree.nested[name];
  return null;
}

console.log(resolve(tree, "lodash"));
console.log(resolve(tree, "debug"));
`,
          tests: [
            { id: 1, label: "Defines resolve", keywords: [{ pattern: "function\\s+resolve" }] },
            { id: 2, label: "Finds lodash", keywords: [{ pattern: "lodash" }] },
            { id: 3, label: "Checks nested", keywords: [{ pattern: "nested" }] },
          ],
        },
      },
    ],
  },
  {
    id: "scripts",
    title: "Scripts, npx & Tooling",
    icon: "play",
    color: SCRIPTS_TEAL,
    lessons: [
      {
        id: "node-9",
        title: "npm Scripts Deep Dive",
        xp: 14,
        chapterTitle: "Scripts, npx & Tooling",
        theory: [
          objectives([
            "Define and run custom npm scripts",
            "Use pre/post lifecycle hooks",
            "Chain commands cross-platform",
          ]),
          text(
            "The **scripts** block is your project's command palette. `npm run build` executes the `build` script. `npm start` and `npm test` are shortcuts — they run `start` and `test` without `run`.",
            {
              label: "Typical scripts block",
              content: `const scripts = {
  dev: "node server.js",
  build: "tsc",
  test: "vitest run",
  lint: "eslint .",
};
console.log(Object.keys(scripts));`,
            },
          ),
          table("Lifecycle hooks", ["Hook", "Runs when"], [
            ["preinstall", "Before package installed"],
            ["postinstall", "After install (native builds)"],
            ["prepublishOnly", "Before npm publish"],
            ["pretest / posttest", "Around npm test"],
          ]),
          callout(
            "tip",
            "Use `npm run` to pass args: `npm run test -- --watch` forwards `--watch` to the underlying command.",
          ),
          quiz(
            "How do you run the `build` script?",
            [
              "npm build",
              "npm run build",
              "node npm build",
              "npm exec build",
            ],
            1,
            "Custom script names need `npm run`. Only start, test, restart, and stop have shortcuts.",
          ),
        ],
        challenge: {
          title: "Run Script Simulator",
          description:
            "Write `runScript(scripts, name)` that returns the command string from a scripts object, or throws if missing.",
          starterCode: `const scripts = { start: "node index.js", test: "vitest" };

function runScript(scripts, name) {
  // return command or throw
}

console.log(runScript(scripts, "start"));
`,
          solutionCode: `const scripts = { start: "node index.js", test: "vitest" };

function runScript(scripts, name) {
  if (!scripts[name]) throw new Error("Missing script: " + name);
  return scripts[name];
}

console.log(runScript(scripts, "start"));
`,
          tests: [
            { id: 1, label: "Defines runScript", keywords: [{ pattern: "function\\s+runScript" }] },
            { id: 2, label: "Returns command", keywords: [{ pattern: "return" }] },
            { id: 3, label: "Handles missing script", keywords: [{ pattern: "throw|Error" }] },
          ],
        },
      },
      {
        id: "node-10",
        title: "npx & One-Off Commands",
        xp: 14,
        chapterTitle: "Scripts, npx & Tooling",
        theory: [
          objectives([
            "Use npx to run packages without global install",
            "Execute specific binary versions on demand",
            "Understand npx vs npm exec",
          ]),
          text(
            "**npx** downloads (or uses cached) a package and runs its binary once — perfect for `create-react-app`, `eslint`, or trying a CLI without polluting global installs.",
          ),
          table("npx patterns", ["Command", "Use case"], [
            ["npx cowsay hello", "Run package binary once"],
            ["npx create-vite@latest", "Always use latest create tool"],
            ["npx --package=typescript tsc", "Run binary from package alias"],
            ["npm exec eslint .", "Modern npx equivalent (npm 7+)"],
          ]),
          callout(
            "info",
            "npm 7+ treats `npx` as an alias for `npm exec`. Both respect local node_modules/.bin first.",
          ),
          quiz(
            "What is the main benefit of npx?",
            [
              "It deletes node_modules",
              "Run CLI tools without permanent global install",
              "It publishes packages faster",
              "It replaces package.json",
            ],
            1,
            "npx executes package binaries on demand — great for scaffolding and one-off tools.",
          ),
        ],
        challenge: {
          title: "Build npx Command",
          description:
            "Write `npxCmd(pkg, args)` returning `npx pkg arg1 arg2` from an args array.",
          starterCode: `function npxCmd(pkg, args = []) {
  // return full npx command string
}

console.log(npxCmd("eslint", [".", "--fix"]));
`,
          solutionCode: `function npxCmd(pkg, args = []) {
  return ["npx", pkg, ...args].join(" ");
}

console.log(npxCmd("eslint", [".", "--fix"]));
`,
          tests: [
            { id: 1, label: "Defines npxCmd", keywords: [{ pattern: "function\\s+npxCmd" }] },
            { id: 2, label: "Starts with npx", keywords: [{ pattern: "npx" }] },
            { id: 3, label: "Joins arguments", keywords: [{ pattern: "join" }] },
          ],
        },
      },
      {
        id: "node-11",
        title: "Global Packages & npm link",
        xp: 15,
        chapterTitle: "Scripts, npx & Tooling",
        theory: [
          objectives([
            "Install and manage global CLI tools",
            "Use npm link for local package development",
            "Know when global installs are appropriate",
          ]),
          text(
            "`npm install -g typescript` puts the `tsc` binary on your PATH. **npm link** symlinks a local package into another project — essential when developing a library and testing it in an app simultaneously.",
          ),
          diagram("npm link workflow", [
            {
              id: "lib",
              label: "In library folder",
              color: SCRIPTS_TEAL,
              items: ["npm link", "Registers global symlink"],
            },
            {
              id: "app",
              label: "In app folder",
              color: PKG_BLUE,
              items: ["npm link my-lib", "Uses local build"],
            },
            {
              id: "dev",
              label: "Development loop",
              color: NODE_GREEN,
              items: ["Edit library", "App sees changes instantly"],
            },
          ]),
          callout(
            "warning",
            "Prefer npx or project-local devDependencies over global installs when possible — globals are harder to version per project.",
          ),
          quiz(
            "What does `npm link` in a library project do?",
            [
              "Publishes to npm",
              "Creates a global symlink so other projects can link to it",
              "Deletes node_modules",
              "Runs tests globally",
            ],
            1,
            "npm link registers your local package globally for development consumption.",
          ),
        ],
        challenge: {
          title: "List Global Bin Path",
          description:
            "Write `binPath(pkgName)` returning `node_modules/.bin/pkgName` (local bin convention).",
          starterCode: `function binPath(pkgName) {
  // return .bin path
}

console.log(binPath("vitest"));
`,
          solutionCode: `function binPath(pkgName) {
  return "node_modules/.bin/" + pkgName;
}

console.log(binPath("vitest"));
`,
          tests: [
            { id: 1, label: "Defines binPath", keywords: [{ pattern: "function\\s+binPath" }] },
            { id: 2, label: "Includes .bin", keywords: [{ pattern: "\\.bin" }] },
          ],
        },
      },
    ],
  },
  {
    id: "modules",
    title: "Node Modules (CJS & ESM)",
    icon: "code",
    color: MODULES_AMBER,
    lessons: [
      {
        id: "node-12",
        title: "CommonJS: require & module.exports",
        xp: 15,
        chapterTitle: "Node Modules (CJS & ESM)",
        theory: [
          objectives([
            "Import modules with require()",
            "Export with module.exports",
            "Understand __dirname and __filename",
          ]),
          text(
            "Node's original module system is **CommonJS**. Each file is a module. `require()` loads synchronously. `module.exports` defines what callers receive.",
            {
              label: "CommonJS pattern",
              content: `// math.js style
const add = (a, b) => a + b;
module.exports = { add };

// app.js style
const { add } = require("./math");
console.log(add(2, 3));`,
            },
          ),
          table("CJS vs keywords", ["Symbol", "Meaning"], [
            ["require()", "Load a module"],
            ["module.exports", "What you export"],
            ["exports", "Shorthand (don't reassign)"],
            ["__dirname", "Directory of current file"],
            ["__filename", "Full path of current file"],
          ]),
          callout(
            "tip",
            "Most npm packages still ship CommonJS. Node can load both CJS and ESM, but mixing has rules.",
          ),
          quiz(
            "How do you export a function in CommonJS?",
            [
              "export default fn",
              "module.exports = fn",
              "global.fn = fn only",
              "import fn from './fn'",
            ],
            1,
            "module.exports (or exports.fn = fn) is the CommonJS export mechanism.",
          ),
        ],
        challenge: {
          title: "Simulate require Cache",
          description:
            "Write `createRegistry()` returning `{ register(name, value), get(name) }` mimicking Node's module cache.",
          starterCode: `function createRegistry() {
  // return { register, get }
}

const reg = createRegistry();
reg.register("math", { add: (a, b) => a + b });
console.log(reg.get("math").add(2, 3));
`,
          solutionCode: `function createRegistry() {
  const cache = {};
  return {
    register(name, value) {
      cache[name] = value;
    },
    get(name) {
      return cache[name];
    },
  };
}

const reg = createRegistry();
reg.register("math", { add: (a, b) => a + b });
console.log(reg.get("math").add(2, 3));
`,
          tests: [
            { id: 1, label: "Defines createRegistry", keywords: [{ pattern: "function\\s+createRegistry" }] },
            { id: 2, label: "Has register and get", keywords: [{ pattern: "register" }, { pattern: "get" }] },
          ],
        },
      },
      {
        id: "node-13",
        title: "ES Modules in Node",
        xp: 16,
        chapterTitle: "Node Modules (CJS & ESM)",
        theory: [
          objectives([
            "Use import and export in Node",
            "Enable ESM via package.json type or .mjs",
            "Know default vs named exports",
          ]),
          text(
            "Modern Node supports **ES Modules** natively. Set `\"type\": \"module\"` in package.json or use `.mjs` extensions. Then use `import` / `export` instead of `require`.",
            {
              label: "ESM syntax",
              content: `// utils.mjs
export function sum(a, b) { return a + b; }
export default function main() { return "ok"; }

// app.mjs
import main, { sum } from "./utils.mjs";
console.log(sum(1, 2), main());`,
            },
          ),
          callout(
            "warning",
            "In ESM, `__dirname` is not defined. Use `import.meta.url` with `fileURLToPath` from `node:url` instead.",
          ),
          quiz(
            "How do you enable ESM for all .js files in a package?",
            [
              "Set \"type\": \"module\" in package.json",
              "Run node --esm always",
              "Rename every file to .cjs",
              "Add \"esm\": true to tsconfig only",
            ],
            0,
            "The type field tells Node to treat .js files as ES modules.",
          ),
        ],
        challenge: {
          title: "Named Export Map",
          description:
            "Write `buildExportMap(exports)` turning `[\"a\",\"b\"]` into `{ a: true, b: true }` for tracking exported names.",
          starterCode: `function buildExportMap(names) {
  // return object with each name: true
}

console.log(buildExportMap(["sum", "avg"]));
`,
          solutionCode: `function buildExportMap(names) {
  return names.reduce((acc, name) => {
    acc[name] = true;
    return acc;
  }, {});
}

console.log(buildExportMap(["sum", "avg"]));
`,
          tests: [
            { id: 1, label: "Defines buildExportMap", keywords: [{ pattern: "function\\s+buildExportMap" }] },
            { id: 2, label: "Uses reduce or loop", keywords: [{ pattern: "reduce|forEach|for" }] },
          ],
        },
      },
      {
        id: "node-14",
        title: "exports, main & package Entry Points",
        xp: 15,
        chapterTitle: "Node Modules (CJS & ESM)",
        theory: [
          objectives([
            "Configure main and exports fields",
            "Control public API surface of a package",
            "Support conditional exports for import vs require",
          ]),
          text(
            "The **main** field is the classic entry. **exports** is the modern map — you can expose subpaths (`\"./utils\"`) and different files for `import` vs `require`.",
          ),
          table("Entry strategies", ["Field", "Use"], [
            ["main", "Single CJS entry (legacy)"],
            ["module", "Bundlers often read this for ESM"],
            ["exports", "Official public API map (preferred)"],
            ["types", "TypeScript declaration entry"],
            ["bin", "CLI executables map"],
          ]),
          callout(
            "info",
            "If `exports` is defined, only listed paths are importable — deep imports into node_modules internals are blocked.",
          ),
          quiz(
            "Which field is the modern way to define multiple public entry points?",
            ["files", "exports", "keywords", "repository"],
            1,
            "exports lets you publish a clean, documented public API.",
          ),
        ],
        challenge: {
          title: "Resolve Package Entry",
          description:
            "Write `resolveEntry(pkg, subpath)` — return `pkg.exports[subpath]` or `pkg.main` when subpath is `.`.",
          starterCode: `const pkg = {
  main: "index.js",
  exports: { ".": "./index.js", "./utils": "./utils.js" },
};

function resolveEntry(pkg, subpath = ".") {
  // return file path
}

console.log(resolveEntry(pkg, "./utils"));
`,
          solutionCode: `const pkg = {
  main: "index.js",
  exports: { ".": "./index.js", "./utils": "./utils.js" },
};

function resolveEntry(pkg, subpath = ".") {
  if (pkg.exports?.[subpath]) return pkg.exports[subpath];
  if (subpath === ".") return pkg.main;
  return null;
}

console.log(resolveEntry(pkg, "./utils"));
`,
          tests: [
            { id: 1, label: "Defines resolveEntry", keywords: [{ pattern: "function\\s+resolveEntry" }] },
            { id: 2, label: "Reads exports", keywords: [{ pattern: "exports" }] },
          ],
        },
      },
    ],
  },
  {
    id: "production",
    title: "Security, CI & Publishing",
    icon: "shield",
    color: PROD_RED,
    lessons: [
      {
        id: "node-15",
        title: "npm audit & Supply Chain Security",
        xp: 16,
        chapterTitle: "Security, CI & Publishing",
        theory: [
          objectives([
            "Run npm audit and interpret severity levels",
            "Apply audit fix safely",
            "Follow dependency hygiene best practices",
          ]),
          text(
            "`npm audit` scans your tree against a vulnerability database. It reports **low**, **moderate**, **high**, and **critical** issues. `npm audit fix` bumps to patched versions when semver allows.",
          ),
          table("Security practices", ["Practice", "Why"], [
            ["Commit lockfile", "Reproducible, reviewable installs"],
            ["Run audit in CI", "Catch CVEs before deploy"],
            ["Pin critical deps", "Reduce surprise updates"],
            ["Review new packages", "Supply chain risk is real"],
            ["Use npm ci in CI", "Clean install from lock only"],
          ]),
          callout(
            "warning",
            "`npm audit fix --force` may install breaking major versions. Review the diff and run tests.",
          ),
          quiz(
            "What does `npm audit` check?",
            [
              "Your code style",
              "Known vulnerabilities in the dependency tree",
              "Git commit messages",
              "CPU usage",
            ],
            1,
            "audit compares installed packages against a security advisory database.",
          ),
        ],
        challenge: {
          title: "Max Severity Level",
          description:
            "Write `maxSeverity(findings)` returning the highest rank from `['low','moderate','high','critical']` in an array of finding objects with `.severity`.",
          starterCode: `const order = ["low", "moderate", "high", "critical"];

function maxSeverity(findings) {
  // return highest severity string
}

console.log(maxSeverity([
  { severity: "low" },
  { severity: "high" },
]));
`,
          solutionCode: `const order = ["low", "moderate", "high", "critical"];

function maxSeverity(findings) {
  let max = -1;
  for (const f of findings) {
    const idx = order.indexOf(f.severity);
    if (idx > max) max = idx;
  }
  return max >= 0 ? order[max] : null;
}

console.log(maxSeverity([
  { severity: "low" },
  { severity: "high" },
]));
`,
          tests: [
            { id: 1, label: "Defines maxSeverity", keywords: [{ pattern: "function\\s+maxSeverity" }] },
            { id: 2, label: "Compares severities", keywords: [{ pattern: "severity" }] },
          ],
        },
      },
      {
        id: "node-16",
        title: "npm ci & Production Installs",
        xp: 14,
        chapterTitle: "Security, CI & Publishing",
        theory: [
          objectives([
            "Choose npm ci vs npm install in CI",
            "Configure NODE_ENV for production",
            "Prune devDependencies in deploy images",
          ]),
          text(
            "**npm ci** (clean install) deletes node_modules, installs exactly from package-lock.json, and fails if package.json and lock are out of sync. CI pipelines should prefer `npm ci` over `npm install`.",
          ),
          diagram("CI install flow", [
            {
              id: "clone",
              label: "Clone repo",
              color: PROD_RED,
              items: ["package.json", "package-lock.json"],
            },
            {
              id: "ci",
              label: "npm ci",
              color: PKG_BLUE,
              items: ["Fast & deterministic", "Fails on mismatch"],
            },
            {
              id: "test",
              label: "npm test",
              color: SCRIPTS_TEAL,
              items: ["Unit & integration", "Gate before deploy"],
            },
            {
              id: "prod",
              label: "Deploy",
              color: NODE_GREEN,
              items: ["NODE_ENV=production", "Omit devDeps if needed"],
            },
          ]),
          callout(
            "tip",
            "In Docker production stages use `npm ci --omit=dev` to skip devDependencies and shrink the image.",
          ),
          quiz(
            "When should you use npm ci instead of npm install?",
            [
              "When editing package.json by hand",
              "In automated CI/CD for reproducible builds",
              "When publishing to npm",
              "Only on Windows",
            ],
            1,
            "npm ci is designed for clean, locked installs in automation.",
          ),
        ],
        challenge: {
          title: "Pick Install Command for CI",
          description:
            "Write `ciInstall(isCI)` returning `\"npm ci\"` when isCI is true, else `\"npm install\"`.",
          starterCode: `function ciInstall(isCI) {
  // return npm ci or npm install
}

console.log(ciInstall(true));
console.log(ciInstall(false));
`,
          solutionCode: `function ciInstall(isCI) {
  return isCI ? "npm ci" : "npm install";
}

console.log(ciInstall(true));
console.log(ciInstall(false));
`,
          tests: [
            { id: 1, label: "Defines ciInstall", keywords: [{ pattern: "function\\s+ciInstall" }] },
            { id: 2, label: "Returns npm ci", keywords: [{ pattern: "npm ci" }] },
          ],
        },
      },
      {
        id: "node-17",
        title: "Publishing Packages to npm",
        xp: 18,
        chapterTitle: "Security, CI & Publishing",
        theory: [
          objectives([
            "Prepare a package for publishing",
            "Bump versions with npm version",
            "Understand scoped public and private packages",
          ]),
          text(
            "Publish with `npm publish` (after `npm login`). The **files** field or `.npmignore` controls what ships. Use `npm version patch` to bump semver and create a git tag. Scoped packages look like `@org/name`.",
          ),
          table("Publish checklist", ["Step", "Action"], [
            ["1", "Set unique name & version"],
            ["2", "Add README, license, repository"],
            ["3", "Run tests & npm pack --dry-run"],
            ["4", "npm publish --access public (for scoped)"],
            ["5", "Tag release in git"],
          ]),
          callout(
            "warning",
            "Publishing is permanent — you can unpublish only within 72 hours for new packages. Use `private: true` until ready.",
          ),
          quiz(
            "What command bumps the patch version and updates package.json?",
            [
              "npm bump",
              "npm version patch",
              "npm publish patch",
              "npm install patch",
            ],
            1,
            "npm version patch increments the patch number and can tag git.",
          ),
        ],
        challenge: {
          title: "Bump Patch Version",
          description:
            "Write `bumpPatch(version)` that turns `\"1.2.3\"` into `\"1.2.4\"`. Return null if invalid.",
          starterCode: `function bumpPatch(version) {
  // increment patch segment
}

console.log(bumpPatch("1.2.3"));
`,
          solutionCode: `function bumpPatch(version) {
  const parts = version.split(".");
  if (parts.length !== 3) return null;
  const patch = Number(parts[2]);
  if (Number.isNaN(patch)) return null;
  return parts[0] + "." + parts[1] + "." + (patch + 1);
}

console.log(bumpPatch("1.2.3"));
`,
          tests: [
            { id: 1, label: "Defines bumpPatch", keywords: [{ pattern: "function\\s+bumpPatch" }] },
            { id: 2, label: "Increments patch", keywords: [{ pattern: "1\\.2\\.4" }] },
          ],
        },
      },
      {
        id: "node-18",
        title: "Workspaces & Monorepos",
        xp: 18,
        chapterTitle: "Security, CI & Publishing",
        theory: [
          objectives([
            "Configure npm workspaces in package.json",
            "Share dependencies across packages in a monorepo",
            "Run scripts across workspaces",
          ]),
          text(
            "**Workspaces** let one repo host multiple packages — e.g. `apps/web` and `packages/ui`. Root package.json lists `\"workspaces\": [\"packages/*\"]`. One `npm install` hoists shared deps and links local packages.",
          ),
          diagram("Monorepo layout", [
            {
              id: "root",
              label: "Root package.json",
              color: PROD_RED,
              items: ["workspaces array", "Shared devDeps", "Root scripts"],
            },
            {
              id: "pkg",
              label: "packages/*",
              color: PKG_BLUE,
              items: ["Reusable libraries", "Linked locally"],
            },
            {
              id: "apps",
              label: "apps/*",
              color: NODE_GREEN,
              items: ["Applications", "Depend on workspace pkgs"],
            },
          ]),
          table("Workspace commands", ["Command", "Effect"], [
            ["npm install", "Install all workspaces"],
            ["npm run build -w pkg-a", "Run build in one workspace"],
            ["npm run test --workspaces", "Run test in every workspace"],
          ]),
          callout(
            "info",
            "Tools like Turborepo and Nx add caching on top of npm workspaces for faster monorepo builds.",
          ),
          quiz(
            "What does the workspaces field in package.json define?",
            [
              "Git branch names",
              "Glob paths to local packages managed together",
              "npm registry mirrors",
              "Docker volumes",
            ],
            1,
            "workspaces tells npm which subfolders are packages in the monorepo.",
          ),
        ],
        challenge: {
          title: "List Workspace Package Names",
          description:
            "Write `workspaceNames(pkgs)` that maps `[{ name: 'a' }, { name: 'b' }]` to `['a','b']`.",
          starterCode: `function workspaceNames(pkgs) {
  // return array of names
}

console.log(workspaceNames([
  { name: "@app/web" },
  { name: "@app/ui" },
]));
`,
          solutionCode: `function workspaceNames(pkgs) {
  return pkgs.map((p) => p.name);
}

console.log(workspaceNames([
  { name: "@app/web" },
  { name: "@app/ui" },
]));
`,
          tests: [
            { id: 1, label: "Defines workspaceNames", keywords: [{ pattern: "function\\s+workspaceNames" }] },
            { id: 2, label: "Uses map", keywords: [{ pattern: "map" }] },
          ],
        },
      },
    ],
  },
]);

export const NODE_NPM_LESSONS = applyLessonVideoLinks(
  NODE_NPM_CHAPTERS.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({
      ...lesson,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      chapterColor: chapter.color,
    })),
  ),
  NODE_NPM_VIDEO_LINKS,
);

export const NODE_NPM_TOTAL_XP = NODE_NPM_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
