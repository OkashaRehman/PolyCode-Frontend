/**
 * W3Schools-style reference content for Node.js & npm lessons.
 * Merged into curriculum at build time (definition, syntax, examples, reference tables).
 */

import { table } from "../../js-fundamentals/data/jsCurriculumHelpers";

export const NODE_NPM_W3_CONTENT = {
  "node-0": {
    topicOverview: {
      style: "w3",
      definition:
        "**Node.js** is a free, open-source JavaScript **runtime** that runs JavaScript outside the web browser. Built on Chrome's **V8** engine, it is used to build web servers, REST APIs, CLI tools, and real-time applications.",
      syntax: "node app.js",
      syntaxLabel: "How to run a Node file",
      cliExample: "node --version",
      exampleNote:
        "Save your code in a file such as `app.js`, open a terminal in that folder, and run the command above. Node executes the file and prints output to the terminal.",
      reference: [
        { term: "Runtime", description: "Program that executes your JavaScript code" },
        { term: "V8", description: "Google's JavaScript engine used by Chrome and Node" },
        { term: "Event loop", description: "Handles async I/O without blocking the main thread" },
        { term: "REPL", description: "Read-Eval-Print Loop — type `node` with no file to try code live" },
      ],
      note: "Node.js is **not** a framework. Express, Fastify, and NestJS are frameworks that run on top of Node.",
      essentials: [
        "Runs JavaScript on servers, CLIs, and build tools — not in the browser DOM",
        "Event-driven and non-blocking — great for many concurrent connections",
        "Comes with built-in modules: fs, path, http, os, crypto, and more",
        "Download from nodejs.org — LTS recommended for production",
      ],
    },
    prepend: [
      {
        type: "text",
        content:
          "**What can you build?** Web servers, REST APIs, real-time chat, command-line tools, file processors, database backends, and IoT controllers.",
      },
      {
        type: "code",
        lang: "javascript",
        label: "Example — Hello from Node",
        content: `// app.js
console.log("Hello from Node.js!");
console.log("Platform:", process.platform);
console.log("Node version:", process.version);`,
      },
      table("Node.js vs Browser JavaScript", ["Feature", "Browser", "Node.js"], [
        ["DOM (document, window)", "Yes", "No"],
        ["File system (fs module)", "No", "Yes"],
        ["Run from terminal", "No", "Yes"],
        ["npm packages", "Via bundler", "Native"],
      ]),
    ],
  },
  "node-1": {
    topicOverview: {
      style: "w3",
      definition:
        "**npm** (Node Package Manager) is the default package manager for Node.js. It installs libraries from the [npm registry](https://www.npmjs.com), manages project dependencies, runs scripts, and publishes your own packages. **npm is installed automatically when you install Node.js.**",
      syntax: "npm install <package-name>",
      syntaxLabel: "Download a package",
      cliExample: "npm install express",
      exampleNote:
        "Open your terminal in the project folder. npm creates a `node_modules` folder and adds the package there. Your `package.json` is updated automatically.",
      reference: [
        { term: "Package", description: "A folder of code published to npm (a module you can require)" },
        { term: "Registry", description: "The public database at npmjs.com with millions of packages" },
        { term: "node_modules", description: "Folder where all installed packages live locally" },
        { term: "package.json", description: "Manifest file listing your project's dependencies" },
      ],
      note: "Check npm is ready: run `npm -v` and `node -v` in your terminal after installing Node.",
      essentials: [
        "npm ships with Node — no separate install needed",
        "`npm install lodash` downloads lodash into node_modules",
        "Packages are JavaScript libraries you add with require() or import",
        "Over 2 million open-source packages available on the registry",
      ],
    },
    prepend: [
      {
        type: "text",
        content:
          "**Using a package:** After `npm install upper-case`, include it like any module: `const uc = require('upper-case');` then call `uc.upperCase('hello')` → `HELLO`.",
      },
      {
        type: "code",
        lang: "javascript",
        label: "Example — use an npm package",
        content: `// After: npm install upper-case
const uc = require("upper-case");
console.log(uc.upperCase("hello world"));`,
      },
      table("First npm commands to know", ["Command", "Description"], [
        ["npm -v", "Show npm version"],
        ["npm init -y", "Create package.json with defaults"],
        ["npm install pkg", "Add package to dependencies"],
        ["npm list", "Show installed packages tree"],
      ]),
    ],
  },
  "node-2": {
    topicOverview: {
      style: "w3",
      definition:
        "Browser JavaScript and Node.js share the **same language** (variables, functions, arrays, promises) but expose **different APIs**. The browser has `window` and `document`; Node has `process`, `fs`, `path`, and `http`.",
      syntax: "typeof window === 'undefined'",
      syntaxLabel: "Check if code runs in Node",
      reference: [
        { term: "globalThis", description: "Universal global object (use instead of window in shared code)" },
        { term: "process", description: "Node object for env vars, argv, cwd, exit" },
        { term: "require", description: "CommonJS way to load modules in Node" },
        { term: "fetch", description: "Available in modern Node (v18+) and all browsers" },
      ],
      essentials: [
        "No DOM in Node — use fs/path/http instead of document",
        "console.log works in both environments",
        "Bundlers (Vite, webpack) bridge browser + Node code",
        "Always check which globals exist before using them",
      ],
    },
  },
  "node-3": {
    topicOverview: {
      style: "w3",
      definition:
        "**package.json** is a JSON file that describes your Node.js project — name, version, entry file, scripts, and dependencies. Every npm project needs one. Create it with `npm init` or `npm init -y` for quick defaults.",
      syntax: "npm init -y",
      syntaxLabel: "Create package.json quickly",
      cliExample: "npm init",
      exampleNote:
        "`npm init` asks questions (name, version, entry point). `-y` skips prompts and writes default values — perfect for learning.",
      reference: [
        { term: "name", description: "Package name — lowercase, no spaces (e.g. my-app)" },
        { term: "version", description: "Semver string, usually starts at 1.0.0" },
        { term: "main", description: "Entry file when someone requires your package (index.js)" },
        { term: "scripts", description: "Commands you run with npm run <name>" },
      ],
      essentials: [
        "Run npm init in an empty project folder",
        "name must be unique on the public npm registry",
        "Set private: true on apps you never plan to publish",
        "license field tells others how they may use your code",
      ],
    },
    prepend: [
      {
        type: "code",
        lang: "javascript",
        label: "Example package.json",
        content: `{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "A simple Node.js app",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Your Name",
  "license": "MIT"
}`,
      },
    ],
  },
  "node-4": {
    topicOverview: {
      style: "w3",
      definition:
        "Beyond name and version, package.json holds **dependencies**, **devDependencies**, **engines**, **exports**, **bin**, and **type**. Tools and Node itself read these fields to install packages, resolve entry points, and run scripts.",
      syntax: '"dependencies": { "express": "^4.18.2" }',
      syntaxLabel: "Dependencies field",
      reference: [
        { term: "dependencies", description: "Packages required when your app runs in production" },
        { term: "devDependencies", description: "Tools only needed for development (test, lint, build)" },
        { term: "peerDependencies", description: "Expected in the host app (common for plugins)" },
        { term: "engines", description: "Required Node/npm versions — e.g. node >= 18" },
        { term: "exports", description: "Modern map of public import paths" },
        { term: "type", description: "module enables import/export in .js files" },
      ],
      essentials: [
        "npm install express adds to dependencies automatically",
        "npm install -D jest adds to devDependencies",
        "exports replaces deep imports — only listed paths are public",
        "files array controls what gets published to npm",
      ],
    },
  },
  "node-5": {
    topicOverview: {
      style: "w3",
      definition:
        "**package-lock.json** records the **exact** versions of every package installed, including nested dependencies. It guarantees that `npm install` on another machine or in CI installs the identical tree.",
      syntax: "npm install",
      syntaxLabel: "Regenerates lock from package.json changes",
      reference: [
        { term: "package-lock.json", description: "Auto-generated; commit it to git" },
        { term: "integrity", description: "SHA hash verifying tarball was not tampered with" },
        { term: "resolved", description: "Exact URL of the downloaded package" },
      ],
      note: "Never hand-edit package-lock.json. Change package.json, then run npm install.",
      essentials: [
        "package.json = what you want (ranges); lock = what you got (exact)",
        "Always commit package-lock.json for applications",
        "Out of sync lock causes npm ci to fail — that's intentional",
      ],
    },
  },
  "node-6": {
    topicOverview: {
      style: "w3",
      definition:
        "Use **npm install** to add packages, **npm uninstall** to remove them, and **npm update** to bump versions within semver ranges. Flags control where packages are saved and whether installs are global.",
      syntax: "npm install <package> [-D | -g] [@version]",
      syntaxLabel: "Install syntax",
      reference: [
        { term: "npm install pkg", description: "Add to dependencies" },
        { term: "npm install -D pkg", description: "Add to devDependencies" },
        { term: "npm install -g pkg", description: "Install globally (CLI tools)" },
        { term: "npm uninstall pkg", description: "Remove and update package.json" },
        { term: "npm update", description: "Update all packages within allowed ranges" },
        { term: "npm outdated", description: "List packages with newer versions available" },
      ],
      essentials: [
        "Global installs put binaries on your PATH (e.g. nodemon, http-server)",
        "npm ls pkg shows where a package sits in the dependency tree",
        "Use exact versions (pkg@1.2.3) when you need reproducibility",
      ],
    },
  },
  "node-7": {
    topicOverview: {
      style: "w3",
      definition:
        "**Semantic versioning** uses **MAJOR.MINOR.PATCH**. npm range operators control which updates are allowed when you run npm install or npm update.",
      syntax: "^1.2.3  ~1.2.3  1.2.3  >=1.2.0 <2.0.0",
      syntaxLabel: "Common version ranges",
      reference: [
        { term: "^1.2.3", description: "Compatible with 1.x.x (minor + patch OK, not 2.0.0)" },
        { term: "~1.2.3", description: "Patch updates only (1.2.x)" },
        { term: "1.2.3", description: "Exact version — no auto-updates" },
        { term: "latest", description: "Newest stable (avoid in production apps)" },
      ],
      note: "Before 1.0.0, caret ranges are looser — breaking changes may appear in minor bumps.",
      essentials: [
        "MAJOR = breaking changes, MINOR = features, PATCH = bug fixes",
        "Libraries use ^ ; critical production apps often pin exact versions",
        "npm outdated shows current vs wanted vs latest",
      ],
    },
  },
  "node-8": {
    topicOverview: {
      style: "w3",
      definition:
        "**node_modules** is the folder npm creates to store every installed package. Node's module resolver walks up the directory tree looking for `node_modules/<name>` when you call require() or import.",
      syntax: "require('express')",
      syntaxLabel: "Triggers module resolution",
      reference: [
        { term: "Hoisting", description: "npm lifts shared deps to top-level node_modules when possible" },
        { term: "Nested install", description: "Conflicting versions get nested under a parent's node_modules" },
        { term: ".bin", description: "Folder with executable scripts from packages" },
      ],
      note: "Add node_modules to .gitignore — reinstall from package-lock.json instead.",
      essentials: [
        "Resolution order: local node_modules → parent folders → global",
        "Duplicate versions can exist when semver ranges conflict",
        "npm ls shows the full dependency tree",
      ],
    },
  },
  "node-9": {
    topicOverview: {
      style: "w3",
      definition:
        "The **scripts** field in package.json defines named commands. Run them with `npm run <script>`. Shortcuts exist for **start**, **test**, **restart**, and **stop** — no `run` needed.",
      syntax: '"scripts": { "start": "node index.js", "dev": "nodemon index.js" }',
      syntaxLabel: "Scripts in package.json",
      cliExample: "npm run dev",
      reference: [
        { term: "npm start", description: "Runs the start script" },
        { term: "npm test", description: "Runs the test script" },
        { term: "npm run build", description: "Runs custom build script" },
        { term: "pre/post hooks", description: "prebuild runs before build automatically" },
      ],
      essentials: [
        "Pass args: npm run test -- --watch",
        "preinstall, postinstall run around npm install",
        "Cross-platform: use cross-env for env vars in scripts",
      ],
    },
  },
  "node-10": {
    topicOverview: {
      style: "w3",
      definition:
        "**npx** runs a package binary without installing it globally — or runs a local binary from node_modules/.bin. npm 7+ aliases npx to `npm exec`.",
      syntax: "npx <package> [args]",
      syntaxLabel: "Run a package once",
      cliExample: "npx create-vite@latest my-app",
      reference: [
        { term: "npx cowsay hi", description: "Download, run, optionally discard" },
        { term: "npx eslint .", description: "Uses local eslint if installed, else prompts" },
        { term: "npm exec", description: "Modern equivalent of npx" },
      ],
      essentials: [
        "Perfect for project scaffolding (create-react-app, create-vite)",
        "Always uses local .bin first before downloading",
        "Pin version: npx package@1.2.3",
      ],
    },
  },
  "node-11": {
    topicOverview: {
      style: "w3",
      definition:
        "**Global packages** (`npm install -g`) install CLI tools system-wide. **npm link** symlinks a local package for development so another project can use your work-in-progress library.",
      syntax: "npm install -g <package>",
      syntaxLabel: "Global install",
      cliExample: "npm link",
      reference: [
        { term: "npm link (in lib)", description: "Register library globally for linking" },
        { term: "npm link my-lib (in app)", description: "Use local lib instead of registry version" },
        { term: "npm unlink", description: "Remove symlink" },
      ],
      note: "Prefer local devDependencies over globals when the tool is project-specific.",
      essentials: [
        "Global binaries live in npm's global bin directory",
        "On Unix you may need sudo for -g installs",
        "npm root -g shows global node_modules path",
      ],
    },
  },
  "node-12": {
    topicOverview: {
      style: "w3",
      definition:
        "**CommonJS** is Node's original module system. Use `require()` to import and `module.exports` to export. Every .js file is wrapped in a module scope — variables are not global unless you attach them to `globalThis`.",
      syntax: "const mod = require('./file');\nmodule.exports = { fn };",
      syntaxLabel: "CommonJS import / export",
      reference: [
        { term: "require()", description: "Load a module synchronously" },
        { term: "module.exports", description: "What callers receive from require()" },
        { term: "__dirname", description: "Directory path of the current file" },
        { term: "__filename", description: "Full file path of the current module" },
      ],
      essentials: [
        "require('./relative') uses relative paths; require('pkg') uses node_modules",
        "Built-in modules (fs, path) don't need node_modules",
        "require cache — same module loads once per process",
      ],
    },
    prepend: [
      {
        type: "code",
        lang: "javascript",
        label: "Example — CommonJS module",
        content: `// math.js
function add(a, b) { return a + b; }
module.exports = { add };

// app.js
const { add } = require("./math");
console.log(add(2, 3)); // 5`,
      },
    ],
  },
  "node-13": {
    topicOverview: {
      style: "w3",
      definition:
        "**ES Modules** use `import` and `export`. Enable them by setting `\"type\": \"module\"` in package.json or by using the `.mjs` file extension.",
      syntax: "import { fn } from './utils.js';\nexport default fn;",
      syntaxLabel: "ESM syntax",
      reference: [
        { term: "import", description: "Static import (hoisted, read-only bindings)" },
        { term: "export", description: "Named or default exports" },
        { term: "import.meta.url", description: "File URL of current module (replaces __dirname)" },
        { term: ".mjs", description: "File extension forcing ESM regardless of type field" },
      ],
      note: "In ESM, __dirname is not defined — use fileURLToPath(import.meta.url) from node:url.",
      essentials: [
        "type: module makes all .js files ESM in that package",
        "Use .cjs extension for CommonJS when type is module",
        "Dynamic import(): import('pkg') returns a Promise",
      ],
    },
  },
  "node-14": {
    topicOverview: {
      style: "w3",
      definition:
        "The **main** field points to the default entry file. The **exports** field (modern) defines exactly which paths importers may use — blocking deep imports into internal files.",
      syntax: '"exports": { ".": "./index.js", "./utils": "./utils.js" }',
      syntaxLabel: "exports field",
      reference: [
        { term: "main", description: "Legacy single entry for require()" },
        { term: "exports", description: "Public API map (preferred for new packages)" },
        { term: "bin", description: "CLI command name → script file" },
        { term: "types", description: "TypeScript declaration entry (.d.ts)" },
      ],
      essentials: [
        "If exports exists, only listed subpaths are importable",
        "Conditional exports can serve import vs require differently",
        "bin maps command names to executable files",
      ],
    },
  },
  "node-15": {
    topicOverview: {
      style: "w3",
      definition:
        "**npm audit** scans your dependency tree for known security vulnerabilities. Run it regularly and in CI. **npm audit fix** applies compatible patches automatically.",
      syntax: "npm audit\nnpm audit fix",
      syntaxLabel: "Security commands",
      reference: [
        { term: "low / moderate / high / critical", description: "Severity levels in audit report" },
        { term: "audit fix --force", description: "May install breaking majors — use with caution" },
        { term: "npm fund", description: "Shows which packages seek funding (optional)" },
      ],
      note: "audit fix --force can break your app. Always run tests after.",
      essentials: [
        "Run npm audit before every production deploy",
        "Pin and review new dependencies before adding them",
        "Supply chain attacks target popular npm packages",
      ],
    },
  },
  "node-16": {
    topicOverview: {
      style: "w3",
      definition:
        "**npm ci** (clean install) deletes node_modules and installs **exactly** from package-lock.json. It is faster and stricter than npm install — the standard for CI/CD pipelines.",
      syntax: "npm ci",
      syntaxLabel: "CI / production install",
      cliExample: "npm ci --omit=dev",
      reference: [
        { term: "npm ci", description: "Fails if package.json and lock are out of sync" },
        { term: "--omit=dev", description: "Skip devDependencies (production Docker images)" },
        { term: "NODE_ENV=production", description: "Convention; some tools skip devDeps automatically" },
      ],
      essentials: [
        "Use npm install locally when adding packages",
        "Use npm ci in GitHub Actions, Jenkins, Docker builds",
        "Never use npm install in CI if you want reproducible builds",
      ],
    },
  },
  "node-17": {
    topicOverview: {
      style: "w3",
      definition:
        "Publish your package to npm with **npm publish** after **npm login**. Bump versions with **npm version patch|minor|major**. Scoped packages use names like `@username/pkg`.",
      syntax: "npm publish --access public",
      syntaxLabel: "Publish a scoped package",
      reference: [
        { term: "npm login", description: "Authenticate with npmjs.com account" },
        { term: "npm version patch", description: "Bump patch, update package.json, optional git tag" },
        { term: "private: true", description: "Prevents accidental publish" },
        { term: "npm pack", description: "Preview tarball contents before publishing" },
      ],
      note: "Unpublish is only allowed within 72 hours for newly published packages.",
      essentials: [
        "Choose a unique package name before publishing",
        "Add README.md — it's your npm package page",
        "Use npm pack --dry-run to see what files ship",
      ],
    },
  },
  "node-18": {
    topicOverview: {
      style: "w3",
      definition:
        "**npm workspaces** let one repository host multiple packages. Set `\"workspaces\": [\"packages/*\"]` in the root package.json. One `npm install` links local packages and hoists shared dependencies.",
      syntax: '"workspaces": ["packages/*", "apps/*"]',
      syntaxLabel: "Workspaces in root package.json",
      reference: [
        { term: "Monorepo", description: "Single git repo with multiple npm packages" },
        { term: "npm run build -w pkg", description: "Run script in one workspace" },
        { term: "npm run test --workspaces", description: "Run script in all workspaces" },
      ],
      essentials: [
        "Local packages link automatically — no npm link needed",
        "Share devDependencies at the root to save disk space",
        "Tools like Turborepo add caching on top of workspaces",
      ],
    },
  },
};

export function applyNodeNpmEnhancements(chapters) {
  return chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map((lesson) => {
      const w3 = NODE_NPM_W3_CONTENT[lesson.id];
      if (!w3) return lesson;

      const prepend = w3.prepend || [];
      const theory = [...prepend, ...(lesson.theory || [])];

      return {
        ...lesson,
        theory,
        outcomes: w3.objectives || lesson.outcomes,
        topicOverview: w3.topicOverview,
      };
    }),
  }));
}
