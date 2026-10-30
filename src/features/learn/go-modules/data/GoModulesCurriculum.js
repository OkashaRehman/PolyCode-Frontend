// PolyCode — Go Modules interactive course
// 7 chapters · 18 lessons · Go dependency management

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { GO_MODULES_VIDEO_LINKS } from "./GoModulesVideoLinks";

const ACCENT = "#00add8";

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function text(content, codeBlock = null) {
  if (codeBlock) {
    return { type: "text", content, code: { lang: "go", ...codeBlock } };
  }
  return { type: "text", content };
}

const GO_MAIN = `package main

import "fmt"

func main() {
`;
const GO_MAIN_END = `}`;

export const GO_MODULES_CHAPTERS = [
  {
    id: "go-modules-foundations",
    title: "Module Foundations",
    stage: "beginner",
    icon: "📦",
    color: ACCENT,
    lessons: [
      {
        id: "go_modules-0-0",
        title: "What are Go Modules?",
        xp: 15,
        chapterTitle: "Module Foundations",
        chapterColor: ACCENT,
        theory: [
          text(
            "Go modules are the official dependency system in Go. They replace the older GOPATH workflow and let you manage local and remote packages in a version-aware, reproducible way.",
            {
              label: "A basic module file",
              content: `package main

import "fmt"

func main() {
    fmt.Println("module example.com/hello")
    fmt.Println("go 1.22")
    fmt.Println("dependency: github.com/google/uuid v1.6.0")
}`,
            },
          ),
          text(
            "The `go.mod` file sits at the root of your project and describes the module path, Go version, and required dependencies. Every import path in your project is resolved from that module root."
          ),
          callout(
            "tip",
            "A module path usually follows a repository or organization pattern such as `example.com/mytool` or `github.com/yourname/project`.",
          ),
          quiz(
            "What file identifies a Go module root?",
            ["package.json", "go.mod", "Cargo.toml", "requirements.txt"],
            1,
            "The `go.mod` file describes the module, Go version, and dependency list."
          ),
        ],
        challenge: {
          title: "Module Ready",
          description: "Write a small Go program that prints `module ready` using `fmt.Println`.",
          starterCode: `${GO_MAIN}    // Print module ready
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("module ready")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Prints module ready", keywords: [{ pattern: "module ready" }] },
            { id: 2, label: "Uses fmt.Println", keywords: [{ pattern: "fmt\\.Println" }] },
          ],
        },
      },
      {
        id: "go_modules-0-1",
        title: "Creating a Module",
        xp: 16,
        chapterTitle: "Module Foundations",
        chapterColor: ACCENT,
        theory: [
          text(
            "To create a module, run `go mod init <module-name>`. This generates a `go.mod` file in the current directory. The name you choose becomes the import path for the code inside your project.",
            {
              label: "Example",
              content: `package main

import "fmt"

func main() {
    fmt.Println("module path: example.com/hello-module")
    fmt.Println("run: go mod init example.com/hello-module")
}`,
            },
          ),
          text(
            "Once the module is initialized, `go run .`, `go test ./...`, and `go build` can resolve dependencies in a clean and consistent way."
          ),
          quiz(
            "Which command creates a new Go module?",
            ["go new", "go init", "go mod init", "go create"],
            2,
            "Use `go mod init <module-path>` to start a new module."
          ),
        ],
        challenge: {
          title: "Friendly Module Output",
          description: "Print `hello from go modules` in a valid Go program.",
          starterCode: `${GO_MAIN}    // Print hello from go modules
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("hello from go modules")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Prints the expected message", keywords: [{ pattern: "hello from go modules" }] },
          ],
        },
      },
      {
        id: "go_modules-0-2",
        title: "The go.sum File",
        xp: 15,
        chapterTitle: "Module Foundations",
        chapterColor: ACCENT,
        theory: [
          text(
            "When Go downloads a dependency, it records both the module version and a cryptographic hash in `go.sum`. This makes builds reproducible and ensures the exact same modules are used across machines.",
            {
              label: "Example go.sum entry",
              content: `package main

import "fmt"

func main() {
    fmt.Println("go.sum: github.com/google/uuid v1.6.0")
    fmt.Println("checksum recorded for reproducible builds")
}`,
            },
          ),
          text(
            "You normally do not edit `go.sum` by hand. It is generated automatically by Go when `go mod tidy` or `go build` resolves dependencies."
          ),
          callout("success", "A clean dependency state is one where `go.mod` and `go.sum` agree with the code you actually import."),
        ],
        challenge: {
          title: "Version Check Output",
          description: "Print the string `go.sum recorded` using a valid Go program.",
          starterCode: `${GO_MAIN}    // Print a version-message
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("go.sum recorded")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Expected output present", keywords: [{ pattern: "go\\.sum recorded" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-modules-deps",
    title: "Dependency Management",
    stage: "beginner",
    icon: "🧩",
    color: "#38bdf8",
    lessons: [
      {
        id: "go_modules-1-0",
        title: "Adding a Dependency",
        xp: 17,
        chapterTitle: "Dependency Management",
        chapterColor: "#38bdf8",
        theory: [
          text(
            "Go dependencies are downloaded with `go get`. For example, `go get github.com/google/uuid` adds the module to your `go.mod` and downloads the code to the module cache."
          ),
          text(
            "This is the standard dependency flow for a module:",
            {
              label: "Dependency workflow",
              content: `package main

import "fmt"

func main() {
    fmt.Println("go get github.com/google/uuid")
    fmt.Println("go mod tidy")
    fmt.Println("dependency ready")
}`,
            },
          ),
          text(
            "You usually do not manually edit dependency version numbers for everyday work. Instead, you update them with `go get` or `go get package@version` in a controlled way."
          ),
          callout("warning", "When you import a new package, always run `go mod tidy` to keep the module file accurate and remove unused dependencies."),
          quiz(
            "Which command adds a dependency to a module?",
            ["go install", "go fetch", "go get", "go add"],
            2,
            "`go get` resolves and downloads modules into the build graph."
          ),
        ],
        challenge: {
          title: "Dependency Ready",
          description: "Write a Go program that prints `dependency synced`.",
          starterCode: `${GO_MAIN}    // dependency synced
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("dependency synced")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Prints the message", keywords: [{ pattern: "dependency synced" }] },
          ],
        },
      },
      {
        id: "go_modules-1-1",
        title: "go mod tidy",
        xp: 17,
        chapterTitle: "Dependency Management",
        chapterColor: "#38bdf8",
        theory: [
          text(
            "`go mod tidy` cleans up the module file by adding the imports your code uses and removing unused ones. It is one of the most important commands in daily Go work."
          ),
          text(
            "This is the tidy step in a real project:",
            {
              label: "Tidy example",
              content: `package main

import "fmt"

func main() {
    fmt.Println("go mod tidy")
    fmt.Println("unused imports removed")
    fmt.Println("module clean")
}`,
            },
          ),
          text(
            "After editing code, running `go mod tidy` keeps the dependency graph honest and reduces surprise compile failures or stale modules."
          ),
          quiz(
            "Why is `go mod tidy` useful?",
            ["It compiles the code", "It removes unused dependencies and keeps the module clean", "It writes tests", "It upgrades the Go toolchain"],
            1,
            "It keeps your module manifest aligned with the actual imports your code uses."
          ),
        ],
        challenge: {
          title: "Tidy State",
          description: "Output `module tidy` from a valid Go program.",
          starterCode: `${GO_MAIN}    // Print module tidy
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("module tidy")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Outputs the expected string", keywords: [{ pattern: "module tidy" }] },
          ],
        },
      },
      {
        id: "go_modules-1-2",
        title: "Versioned Imports",
        xp: 18,
        chapterTitle: "Dependency Management",
        chapterColor: "#38bdf8",
        theory: [
          text(
            "Go modules are version-aware. If you need a specific release of a package, you can ask for it with `go get example.com/lib@v1.2.3`.",
            {
              label: "Versioned install",
              content: `package main

import "fmt"

func main() {
    fmt.Println("go get github.com/google/uuid@v1.6.0")
    fmt.Println("module version pinned")
}`,
            },
          ),
          text(
            "Version selection is how teams keep builds reproducible. A project can declare a compatible minimum version or a fixed tag, and Go resolves it consistently."
          ),
          callout("info", "The module system favors deterministic builds by recording exact versions in go.mod and go.sum."),
        ],
        challenge: {
          title: "Versioned Output",
          description: "Print `module versioned` in a valid Go program.",
          starterCode: `${GO_MAIN}    // Print versioned message
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("module versioned")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Contains expected output", keywords: [{ pattern: "module versioned" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-modules-versions",
    title: "Versioning & Constraints",
    stage: "intermediate",
    icon: "🏷️",
    color: "#34d399",
    lessons: [
      {
        id: "go_modules-2-0",
        title: "Semantic Versioning",
        xp: 18,
        chapterTitle: "Versioning & Constraints",
        chapterColor: "#34d399",
        theory: [
          text(
            "Go follows Go module semantics, and version tags often align with Semantic Versioning. A version such as `v2.3.1` clearly signals an API change or compatibility boundary."
          ),
          text(
            "Major version numbers matter when a dependency changes its public API.",
            {
              label: "Version bump demo",
              content: `package main

import "fmt"

func main() {
    fmt.Println("v1.4.0 -> v2.0.0")
    fmt.Println("breaking change review required")
}`,
            },
          ),
          text(
            "When you upgrade a dependency, the code may compile with minor or patch updates, but major versions often require deliberate code changes."
          ),
          quiz(
            "What does a major-version bump often signal?",
            ["No change", "A compatible patch release", "A breaking API change", "A build cache refresh"],
            2,
            "Major versions commonly imply a breaking change in public APIs."
          ),
        ],
        challenge: {
          title: "Version Tag Output",
          description: "Write valid Go code to print `semantic versioning`.",
          starterCode: `${GO_MAIN}    // Print semantic versioning
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("semantic versioning")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Correct output", keywords: [{ pattern: "semantic versioning" }] },
          ],
        },
      },
      {
        id: "go_modules-2-1",
        title: "Minimum Version Rules",
        xp: 18,
        chapterTitle: "Versioning & Constraints",
        chapterColor: "#34d399",
        theory: [
          text(
            "The `go.mod` file can express minimum versions and indirect dependencies. This helps Go select compatible module versions while still supporting transitive updates."
          ),
          text(
            "A safe dependency graph is predictable and reproducible.",
            {
              label: "Minimum version check",
              content: `package main

import "fmt"

func main() {
    fmt.Println("minimum version: v1.5.0")
    fmt.Println("compatible dependency graph")
}`,
            },
          ),
          text(
            "In a team environment, you often want all developers and CI machines to resolve to the same dependency graph, which is why the module file and lockfile-style `go.sum` matter so much."
          ),
          callout("tip", "The module system is opinionated about reproducibility: it prefers a consistent graph over ad-hoc local state."),
        ],
        challenge: {
          title: "Minimum Version",
          description: "Print `minimum version safe` from a complete Go program.",
          starterCode: `${GO_MAIN}    // Print minimum version safe
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("minimum version safe")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Contains expected output", keywords: [{ pattern: "minimum version safe" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-modules-replacements",
    title: "Replacements & Local Overrides",
    stage: "intermediate",
    icon: "🔁",
    color: "#fb7185",
    lessons: [
      {
        id: "go_modules-3-0",
        title: "replace Directives",
        xp: 19,
        chapterTitle: "Replacements & Local Overrides",
        chapterColor: "#fb7185",
        theory: [
          text(
            "A `replace` directive tells Go to use a different source for a module path. This is useful when you want to test an unpublished local dependency or temporarily override a remote package."
          ),
          text(
            "`replace` is especially helpful in monorepos or when a team needs to validate a patch before publishing an upstream release."
          ),
          {
            type: "text",
            content: "Example module override:",
            code: {
              lang: "go",
              label: "replace demo",
              content: `package main

import "fmt"

func main() {
    fmt.Println("module: example.com/service")
    fmt.Println("replace example.com/lib => ../lib")
}`,
            },
          },
        ],
        challenge: {
          title: "Override Example",
          description: "Print `replace active` in a valid Go program.",
          starterCode: `${GO_MAIN}    // Print replace active
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("replace active")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Shows output", keywords: [{ pattern: "replace active" }] },
          ],
        },
      },
      {
        id: "go_modules-3-1",
        title: "Local Dependency Testing",
        xp: 19,
        chapterTitle: "Replacements & Local Overrides",
        chapterColor: "#fb7185",
        theory: [
          text(
            "With a `replace` directive, you can test local changes before publishing a dependency. This lets you verify integration, behavior, and compatibility in a realistic workflow."
          ),
          text(
            "Local overrides are useful for testing a library before publishing it.",
            {
              label: "Local override demo",
              content: `package main

import "fmt"

func main() {
    fmt.Println("override active: ../lib")
    fmt.Println("integration test in progress")
}`,
            },
          ),
          text(
            "A common pattern is to keep a library repository next to an app repository and point the app at the local directory until the update is ready for publication."
          ),
          quiz(
            "What is a main use case for `replace`?",
            ["To hide code", "To test local module changes before publishing", "To make the build faster only", "To remove the module file"],
            1,
            "`replace` is useful for local validation and dependency overrides."
          ),
        ],
        challenge: {
          title: "Local Test Output",
          description: "Print `local override ready` from valid Go source.",
          starterCode: `${GO_MAIN}    // Print local override ready
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("local override ready")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Contains expected output", keywords: [{ pattern: "local override ready" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-modules-workspaces",
    title: "Workspaces & Monorepos",
    stage: "pro",
    icon: "🗂️",
    color: "#fbbf24",
    lessons: [
      {
        id: "go_modules-4-0",
        title: "Workspace Mode",
        xp: 20,
        chapterTitle: "Workspaces & Monorepos",
        chapterColor: "#fbbf24",
        theory: [
          text(
            "Go workspaces let you develop multiple modules together from a single root. They are useful when a company keeps libraries and apps in the same monorepo.",
            {
              label: "go.work example",
              content: `package main

import "fmt"

func main() {
    fmt.Println("workspace: ./lib + ./service")
    fmt.Println("go work enabled")
}`,
            },
          ),
          text(
            "`go work` helps you avoid editing `replace` directives constantly when several modules are being developed side-by-side."
          ),
          quiz(
            "What does `go.work` help you do?",
            ["Avoid all dependencies", "Work on multiple modules together in one root", "Create a binary only", "Remove package imports"],
            1,
            "A `go.work` file manages multiple modules in a workspace."
          ),
        ],
        challenge: {
          title: "Workspace Ready",
          description: "Print `workspace ready` in a Go program.",
          starterCode: `${GO_MAIN}    // Print workspace ready
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("workspace ready")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Outputs workspace ready", keywords: [{ pattern: "workspace ready" }] },
          ],
        },
      },
      {
        id: "go_modules-4-1",
        title: "Multi-Module Layout",
        xp: 21,
        chapterTitle: "Workspaces & Monorepos",
        chapterColor: "#fbbf24",
        theory: [
          text(
            "Large Go projects often have separate module roots for an API, shared library, and worker services. This keeps packages isolated while still letting the team work in one repository."
          ),
          text(
            "A monorepo can combine multiple reusable modules under one workspace.",
            {
              label: "Monorepo demo",
              content: `package main

import "fmt"

func main() {
    fmt.Println("api module")
    fmt.Println("shared lib module")
    fmt.Println("worker module")
}`,
            },
          ),
          text(
            "In a monorepo, each module can have its own `go.mod`, and a shared `go.work` file defines the active set for local development."
          ),
          callout("success", "One repository can contain several modules, and `go work` makes the local dependency graph easy to reason about."),
        ],
        challenge: {
          title: "Monorepo Output",
          description: "Write a valid Go program that prints `monorepo ready`.",
          starterCode: `${GO_MAIN}    // Print monorepo ready
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("monorepo ready")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Outputs text", keywords: [{ pattern: "monorepo ready" }] },
          ],
        },
      },
      {
        id: "go_modules-4-2",
        title: "go list and go graph",
        xp: 20,
        chapterTitle: "Workspaces & Monorepos",
        chapterColor: "#fbbf24",
        theory: [
          text(
            "`go list` and `go graph` help you inspect the active module graph. They are useful for diagnosing why one package is being built against a different version than expected."
          ),
          text(
            "Inspecting the graph helps you trace dependency edges and find version conflicts.",
            {
              label: "Graph check demo",
              content: `package main

import "fmt"

func main() {
    fmt.Println("go list ./...")
    fmt.Println("go graph")
    fmt.Println("dep graph inspected")
}`,
            },
          ),
          text(
            "In larger codebases, these commands help you identify direct and indirect dependency chains before you change or upgrade anything."
          ),
          quiz(
            "Why inspect the module graph?",
            ["To avoid running code", "To understand dependency edges and version resolution", "To rename files", "To skip tests"],
            1,
            "Dependency graphs show how modules connect and which versions are chosen."
          ),
        ],
        challenge: {
          title: "Graph Output",
          description: "Print `dependency graph` in a valid Go program.",
          starterCode: `${GO_MAIN}    // Print dependency graph
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("dependency graph")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Correct output", keywords: [{ pattern: "dependency graph" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-modules-publish",
    title: "Publishing & Stability",
    stage: "pro",
    icon: "🚀",
    color: "#a78bfa",
    lessons: [
      {
        id: "go_modules-5-0",
        title: "Publishing a Module",
        xp: 22,
        chapterTitle: "Publishing & Stability",
        chapterColor: "#a78bfa",
        theory: [
          text(
            "When you are ready to share a module, you usually publish it to a versioned source like GitHub, GitLab, or a private registry. The repository path and module path should stay aligned."
          ),
          text(
            "A module that uses a clean path and a predictable release tag is easier for teams to consume.",
            {
              label: "Publish readiness",
              content: `package main

import "fmt"

func main() {
    fmt.Println("github.com/company/sharedlib")
    fmt.Println("release tag: v1.5.0")
    fmt.Println("publish ready")
}`,
            },
          ),
          text(
            "A clean module path makes consuming code simpler and helps other teams import the package with a predictable path."
          ),
          callout("info", "A module is easier to maintain when its import path matches its repository location and its major version strategy is explicit."),
        ],
        challenge: {
          title: "Publish Output",
          description: "Print `publish ready` from a valid Go program.",
          starterCode: `${GO_MAIN}    // Print publish ready
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("publish ready")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Outputs the expected value", keywords: [{ pattern: "publish ready" }] },
          ],
        },
      },
      {
        id: "go_modules-5-1",
        title: "Release Hygiene",
        xp: 22,
        chapterTitle: "Publishing & Stability",
        chapterColor: "#a78bfa",
        theory: [
          text(
            "Release hygiene includes semantic versioning, changelog notes, compatibility checks, and careful upgrade planning. These practices keep consumers confident when they adopt a new library version."
          ),
          text(
            "A disciplined release process reduces confusion during upgrades.",
            {
              label: "Release hygiene demo",
              content: `package main

import "fmt"

func main() {
    fmt.Println("release notes updated")
    fmt.Println("compatibility verified")
    fmt.Println("release hygiene")
}`,
            },
          ),
          text(
            "Before shipping a new module version, review breaking changes, update documentation, and verify integration with the most important downstream projects."
          ),
          quiz(
            "What does release hygiene help with?",
            ["Runtime speed only", "Confidence and compatibility in downstream projects", "File permission changes", "Deleting tests"],
            1,
            "Good release discipline keeps consumers safe during upgrades."
          ),
        ],
        challenge: {
          title: "Release Ready",
          description: "Print `release hygiene` from a valid Go program.",
          starterCode: `${GO_MAIN}    // Print release hygiene
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("release hygiene")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Contains exact output", keywords: [{ pattern: "release hygiene" }] },
          ],
        },
      },
    ],
  },
  {
    id: "go-modules-advanced",
    title: "Production Module Patterns",
    stage: "advanced",
    icon: "🛡️",
    color: "#8b5cf6",
    lessons: [
      {
        id: "go_modules-6-0",
        title: "Private Modules",
        xp: 24,
        chapterTitle: "Production Module Patterns",
        chapterColor: "#8b5cf6",
        theory: [
          text(
            "Private module repositories are common in enterprise environments. Most teams use a private Git host or artifact mirror and ensure the module path and authentication settings are configured correctly."
          ),
          text(
            "Private dependency access is controlled with clear credentials and secure module paths.",
            {
              label: "Private module demo",
              content: `package main

import "fmt"

func main() {
    fmt.Println("private registry: internal.company")
    fmt.Println("token verified")
    fmt.Println("private module secure")
}`,
            },
          ),
          text(
            "This is where explicit dependency policies, access control, and version tracking matter most, because a private dependency can affect every application in a platform."
          ),
          callout("warning", "When using private modules, ensure your environment has the correct credentials and the module path matches the hosting policy."
          ),
        ],
        challenge: {
          title: "Private Module Output",
          description: "Print `private module secure` in a valid Go program.",
          starterCode: `${GO_MAIN}    // Print private module secure
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("private module secure")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Expected value present", keywords: [{ pattern: "private module secure" }] },
          ],
        },
      },
      {
        id: "go_modules-6-1",
        title: "Upgrades & Compatibility",
        xp: 25,
        chapterTitle: "Production Module Patterns",
        chapterColor: "#8b5cf6",
        theory: [
          text(
            "Upgrading dependencies is a balance between security, bug fixes, and compatibility. A disciplined team updates packages in small batches and checks the impact with tests and smoke runs."
          ),
          text(
            "Planned upgrades keep the module graph stable while shipping safer changes.",
            {
              label: "Upgrade review demo",
              content: `package main

import "fmt"

func main() {
    fmt.Println("go get package@latest")
    fmt.Println("tests passed")
    fmt.Println("upgrade validated")
}`,
            },
          ),
          text(
            "When a dependency is upgraded, consider whether the new API is backward compatible, whether a new major version is needed, and whether the dependency graph still resolves cleanly."
          ),
          quiz(
            "What is the safest way to handle upgrades?",
            ["Ignore all updates", "Upgrade only after review and test validation", "Rename every package", "Delete go.sum"],
            1,
            "Controlled upgrades reduce breakage and keep the module graph safe."
          ),
        ],
        challenge: {
          title: "Upgrade Safe",
          description: "Print `upgrade validated` using a valid Go program.",
          starterCode: `${GO_MAIN}    // Print upgrade validated
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("upgrade validated")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Outputs upgrade validated", keywords: [{ pattern: "upgrade validated" }] },
          ],
        },
      },
      {
        id: "go_modules-6-2",
        title: "Module Best Practices",
        xp: 24,
        chapterTitle: "Production Module Patterns",
        chapterColor: "#8b5cf6",
        theory: [
          text(
            "Good module design keeps public APIs clear, dependency boundaries narrow, and version bumps intentional. Teams succeed when they document module purpose and standardize upgrade rules."
          ),
          text(
            "The best module design is predictable, documented, and easy to maintain.",
            {
              label: "Best practice example",
              content: `package main

import "fmt"

func main() {
    fmt.Println("clear API")
    fmt.Println("documented versioning")
    fmt.Println("module best practice")
}`,
            },
          ),
          text(
            "A great module is predictable: easier to test, easier to share, and easier to trust across teams and services."
          ),
          callout(
            "success",
            "The most maintainable modules are intentionally versioned, clearly named, and updated with a deliberate compatibility story.",
          ),
        ],
        challenge: {
          title: "Best Practice Output",
          description: "Output `module best practice` with valid Go code.",
          starterCode: `${GO_MAIN}    // Print module best practice
${GO_MAIN_END}`,
          solutionCode: `${GO_MAIN}    fmt.Println("module best practice")
${GO_MAIN_END}`,
          tests: [
            { id: 1, label: "Expected message present", keywords: [{ pattern: "module best practice" }] },
          ],
        },
      },
    ],
  },
];

export const GO_MODULES_LESSONS = applyLessonVideoLinks(
  GO_MODULES_CHAPTERS.flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({
      ...lesson,
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      chapterColor: chapter.color,
      chapterIcon: chapter.icon,
    })),
  ),
  GO_MODULES_VIDEO_LINKS,
);

export const GO_MODULES_TOTAL_XP = GO_MODULES_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
