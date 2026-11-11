/**
 * W3Schools-style reference content for Ruby Gems lessons.
 * Merged into curriculum at build time (definition, syntax, examples, reference tables).
 */

import { table, objectives } from "../../js-fundamentals/data/jsCurriculumHelpers.js";

export const RUBY_GEMS_W3_CONTENT = {
  "rbgem-0": {
    topicOverview: {
      style: "w3",
      definition:
        "A **Ruby gem** is a packaged, versioned library distributed through **RubyGems**. Instead of copying source files into every project, you declare a dependency and load reusable code with `require` — gems power everything from JSON parsing to full frameworks like Rails.",
      syntax: "gem install json",
      syntaxLabel: "Install a gem from RubyGems.org",
      cliExample: "gem list",
      exampleNote:
        "After `gem install json`, Ruby adds the gem's `lib/` folder to `$LOAD_PATH` so `require \"json\"` finds the library. In PolyCode's browser Ruby you simulate these concepts with pure Ruby modules.",
      reference: [
        { term: "Gem", description: "Packaged Ruby library with a name and version (e.g. json 2.7.2)" },
        { term: "RubyGems.org", description: "Public registry where gems are published and downloaded" },
        { term: "Semver", description: "MAJOR.MINOR.PATCH version scheme (2.7.2)" },
        { term: "require", description: "Loads a gem or library file at runtime" },
        { term: "Gemfile", description: "Project manifest listing gem dependencies (managed by Bundler)" },
      ],
      note: "Gems are **not** part of the Ruby language itself — they are community libraries installed separately (or via Bundler).",
      essentials: [
        "Gems package reusable Ruby code with a name, version, and entry file",
        "Install with `gem install` or declare in a Gemfile and run `bundle install`",
        "Versions follow semver: MAJOR.MINOR.PATCH",
        "PolyCode simulates gem concepts in browser Ruby without real gem installs",
      ],
      practiceTitle: "Define a gem identity module",
    },
    prepend: [
      objectives([
        "Explain what a Ruby gem is and why gems exist",
        "Identify gem name, version, and the RubyGems registry",
        "Simulate a gem module with a VERSION-like constant",
      ]),
      {
        type: "text",
        content:
          "**What can gems do?** Parse JSON, connect to databases, run background jobs, add CLI tools, extend Rails, and share utilities across every Ruby project you write.",
      },
      {
        type: "code",
        lang: "ruby",
        label: "Example — conceptual gem module",
        content: `module Colorize
  def self.red(text)
    "[RED] #{text}"
  end
end

puts Colorize.red("Hello")`,
      },
      table("Gem lifecycle", ["Stage", "Who", "Action"], [
        ["Author", "Developer", "Write lib/, gemspec, tests"],
        ["Publish", "RubyGems.org", "Upload .gem archive"],
        ["Consume", "Your app", "Gemfile → bundle install → require"],
      ]),
    ],
    objectives: [
      "Define a module representing a gem with NAME and describe",
      "Print a formatted gem identity string",
    ],
  },
  "rbgem-1": {
    topicOverview: {
      style: "w3",
      definition:
        "**RubyGems.org** is the public registry for Ruby libraries. When you run `gem install json`, RubyGems downloads the gem and places it on **$LOAD_PATH** so `require \"json\"` can load the entry file. `require` returns `false` if the file was already loaded.",
      syntax: 'require "json"',
      syntaxLabel: "Load an installed gem",
      cliExample: "gem install json",
      exampleNote:
        "Use `require` for gems and stdlib. Use `require_relative` for files inside your own project tree.",
      reference: [
        { term: "RubyGems.org", description: "Official gem registry at https://rubygems.org" },
        { term: "require", description: "Searches $LOAD_PATH for name.rb and loads it once" },
        { term: "$LOAD_PATH", description: "Array of directories Ruby scans for libraries" },
        { term: "$LOADED_FEATURES", description: "Tracks already-required files" },
        { term: "gem install", description: "Downloads and installs a gem to your system or bundle path" },
      ],
      tip: "`require \"json\"` is case-sensitive and does not need the `.rb` extension.",
      essentials: [
        "gem install downloads from RubyGems.org and updates $LOAD_PATH",
        "require loads a library; returns false if already loaded",
        "require_relative is for your own project files, not published gems",
        "gem search json finds gems by name on the registry",
      ],
      practiceTitle: "Simulate require with a loaded-features list",
    },
    prepend: [
      objectives([
        "Describe how RubyGems.org and require work together",
        "Explain why require returns false on second load",
        "Simulate a mini load path and loaded-features tracker",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — simulated require",
        content: `LOADED = []

def fake_require(name)
  return false if LOADED.include?(name)
  LOADED << name
  true
end

puts fake_require("json")   # true
puts fake_require("json")   # false
puts LOADED.inspect`,
      },
      table("require vs require_relative", ["Method", "Use for", "Path style"], [
        ["require", "Gems & stdlib", "Bare name: \"json\""],
        ["require_relative", "Your project files", "Relative: \"./lib/app\""],
        ["require", "Already loaded?", "Returns false, no reload"],
      ]),
    ],
    objectives: [
      "Implement fake_require that tracks loaded gems",
      "Return true on first load and false on duplicate",
    ],
  },
  "rbgem-2": {
    topicOverview: {
      style: "w3",
      definition:
        "When Ruby cannot find a file via `require`, it raises **LoadError**. Installed gems add their **lib/** directory to **$LOAD_PATH**. Ruby walks each directory looking for `name.rb` before giving up.",
      syntax: '$LOAD_PATH.each { |p| puts p }',
      syntaxLabel: "Inspect the load path",
      reference: [
        { term: "$LOAD_PATH", description: "Ordered list of directories searched by require" },
        { term: "lib/", description: "Folder packaged into gems; added to $LOAD_PATH on install" },
        { term: "LoadError", description: "Raised when require cannot find the requested file" },
        { term: "Entry file", description: "Usually lib/gem_name.rb — the first file loaded" },
      ],
      note: "Bundler manages $LOAD_PATH for you after `bundle install` or when using `bundle exec`.",
      essentials: [
        "Gems place code in lib/; that path joins $LOAD_PATH on install",
        "Entry point is typically lib/gem_name.rb",
        "Subfiles often live in lib/gem_name/ and are required from the entry",
        "Simulate search order: check loaded → scan paths → load file",
      ],
      practiceTitle: "Find a gem file on a simulated load path",
    },
    prepend: [
      objectives([
        "Trace how require searches $LOAD_PATH",
        "Locate the standard lib/ entry file for a gem",
        "Simulate load-path lookup in pure Ruby",
      ]),
      {
        type: "text",
        content:
          "**Search order:** (1) Already in $LOADED_FEATURES? Return false. (2) Walk each $LOAD_PATH directory for `name.rb`. (3) Load the file and add to $LOADED_FEATURES.",
      },
      {
        type: "code",
        lang: "ruby",
        label: "Example — find on load path",
        content: `LOAD_PATH_SIM = ["lib", "vendor"]
FILES = { "lib/json.rb" => true, "vendor/json.rb" => true }

def find_gem(name)
  LOAD_PATH_SIM.each do |dir|
    path = "#{dir}/#{name}.rb"
    return path if FILES.key?(path)
  end
  nil
end

puts find_gem("json")`,
      },
      table("Standard gem layout paths", ["Path", "On $LOAD_PATH?", "Purpose"], [
        ["lib/gem_name.rb", "Yes (via lib/)", "Entry point"],
        ["lib/gem_name/*.rb", "Yes", "Namespaced implementation"],
        ["spec/", "No", "Tests — not shipped to users"],
        ["bin/", "No (executables)", "CLI scripts listed in gemspec"],
      ]),
    ],
    objectives: [
      "Search a simulated LOAD_PATH for the first matching .rb file",
      "Return the full path when found",
    ],
  },
  "rbgem-3": {
    topicOverview: {
      style: "w3",
      definition:
        "**Bundler** is Ruby's dependency manager. Without it, global gem installs cause version conflicts between projects. Bundler reads your **Gemfile**, resolves compatible versions, writes **Gemfile.lock**, and installs gems per project.",
      syntax: "bundle install",
      syntaxLabel: "Install gems from Gemfile",
      cliExample: "bundle exec ruby app.rb",
      exampleNote:
        "`bundle exec` ensures commands use the exact gem versions from your lockfile — not random global installs.",
      reference: [
        { term: "Bundler", description: "Gem that manages project dependencies and lockfiles" },
        { term: "Gemfile", description: "Declares which gems and version constraints your project needs" },
        { term: "Gemfile.lock", description: "Pins exact resolved versions for reproducible installs" },
        { term: "bundle exec", description: "Runs a command with locked gem versions on LOAD_PATH" },
      ],
      tip: "Always commit **Gemfile.lock** so every developer and CI server installs identical gems.",
      essentials: [
        "Install Bundler: gem install bundler",
        "bundle install reads Gemfile (+ lock) and installs gems",
        "bundle exec prefixes commands to use locked versions",
        "Each project gets isolated dependencies — no global conflicts",
      ],
      practiceTitle: "List gems from a simulated Gemfile hash",
    },
    prepend: [
      objectives([
        "Explain why Bundler exists alongside RubyGems",
        "Describe the Gemfile → resolve → install flow",
        "Simulate a Gemfile as a Ruby hash",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — simulated Gemfile",
        content: `GEMFILE = { "json" => "~> 2.6", "rake" => "~> 13.0" }

GEMFILE.each do |name, constraint|
  puts "gem \\"#{name}\\", \\"#{constraint}\\""
end`,
      },
      table("Essential Bundler commands", ["Command", "Description"], [
        ["bundle install", "Resolve and install gems from Gemfile"],
        ["bundle update json", "Bump json within constraints, refresh lock"],
        ["bundle exec rspec", "Run tests with locked gem versions"],
        ["bundle check", "Verify gems are installed and lock is satisfied"],
      ]),
    ],
    objectives: [
      "Iterate a GEMFILE hash and print each gem name",
      "Use a consistent output format for gem entries",
    ],
  },
  "rbgem-4": {
    topicOverview: {
      style: "w3",
      definition:
        "A **Gemfile** declares dependencies with `gem \"name\", \"version_constraint\"`. Use **group** for `:development`, `:test`, or `:production` gems. Set **require: false** to install without auto-loading on boot.",
      syntax: 'gem "pg", "~> 1.5"',
      syntaxLabel: "Declare a gem with constraint",
      cliExample: "bundle add json --version '~> 2.6'",
      reference: [
        { term: "source", description: "Where to download gems — usually https://rubygems.org" },
        { term: "group", description: "Limits gems to dev, test, or production environments" },
        { term: "require: false", description: "Install gem but do not auto-require at boot" },
        { term: "platform", description: "Install only on matching OS (e.g. :mingw, :jruby)" },
        { term: "git:", description: "Load gem from a Git repository instead of RubyGems" },
      ],
      essentials: [
        "source 'https://rubygems.org' is the first line of most Gemfiles",
        "group :development do ... end keeps test tools out of production",
        "require: false is common for gems loaded conditionally",
        "Simulate grouped entries as an array of hashes with :group keys",
      ],
      practiceTitle: "Filter gems by Gemfile group",
    },
    prepend: [
      objectives([
        "Read a Gemfile gem declaration with version constraint",
        "Use groups and require: false appropriately",
        "Filter a simulated gem list by group",
      ]),
      {
        type: "text",
        content:
          "**Groups in practice:** `rubocop` and `debug` go in `:development`. `minitest` and `factory_bot` go in `:test`. Your web server gem stays in the default (runtime) group.",
      },
      {
        type: "code",
        lang: "ruby",
        label: "Example — grouped gems",
        content: `GEMS = [
  { name: "rake", group: :default },
  { name: "minitest", group: :test },
  { name: "rubocop", group: :development }
]

test_gems = GEMS.select { |g| g[:group] == :test }.map { |g| g[:name] }
puts test_gems.inspect`,
      },
      table("Common Gemfile options", ["Option", "Effect"], [
        ["group: :test", "Only installed/loaded in test environment"],
        ["require: false", "Bundler won't auto-require; you call require manually"],
        ["platform: :ruby", "Skip native-extension gems on other platforms"],
        ["path: '../my_gem'", "Use a local gem directory (private/monorepo)"],
      ]),
    ],
    objectives: [
      "Return gem names belonging to a given group",
      "Use select/map to filter a GEMS array",
    ],
  },
  "rbgem-5": {
    topicOverview: {
      style: "w3",
      definition:
        "**Gemfile.lock** records the **exact** resolved version of every gem, including transitive dependencies. Re-running `bundle install` on another machine installs precisely those versions — essential for reproducible builds and CI.",
      syntax: "bundle install",
      syntaxLabel: "Install exact versions from lockfile",
      reference: [
        { term: "Gemfile", description: "Loose constraints — human-edited (~> 2.6)" },
        { term: "Gemfile.lock", description: "Exact versions — Bundler-generated (2.7.2)" },
        { term: "Transitive deps", description: "Dependencies of your dependencies, also pinned in lock" },
        { term: "bundle update", description: "Re-resolve and refresh the lockfile" },
      ],
      note: "Never hand-edit Gemfile.lock. Change the Gemfile, then run `bundle install` or `bundle update gem_name`.",
      essentials: [
        "Gemfile = what you want; lockfile = what you got",
        "Always commit Gemfile.lock for applications",
        "bundle install is fast when lock matches — skips resolution",
        "CI should use the lockfile for identical builds every time",
      ],
      practiceTitle: "Read a resolved version from a lockfile hash",
    },
    prepend: [
      objectives([
        "Contrast Gemfile constraints with lockfile pins",
        "Explain why teams commit Gemfile.lock",
        "Look up an exact version from a simulated lockfile",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — lockfile lookup",
        content: `REQUESTED = { "json" => "~> 2.6" }
LOCKFILE = { "json" => "2.7.2", "rake" => "13.2.1" }

def resolved(name)
  LOCKFILE[name]
end

name = "json"
puts "#{name} #{resolved(name)}"`,
      },
      table("Gemfile vs Gemfile.lock", ["File", "Contains", "Edited by"], [
        ["Gemfile", "Desired gems + constraints", "Developer"],
        ["Gemfile.lock", "Exact versions + checksums", "Bundler (auto)"],
        ["Gemfile.lock", "Transitive dependency tree", "Bundler (auto)"],
      ]),
    ],
    objectives: [
      "Return the exact locked version for a gem name",
      "Print a formatted name + version string",
    ],
  },
  "rbgem-6": {
    topicOverview: {
      style: "w3",
      definition:
        "A standard gem repository follows a predictable layout. **bundle gem my_gem** scaffolds **lib/**, **spec/**, a **gemspec**, **Gemfile**, and **README.md**. Only **lib/** contents are added to $LOAD_PATH when installed.",
      syntax: "bundle gem poly_stats",
      syntaxLabel: "Scaffold a new gem project",
      reference: [
        { term: "lib/", description: "Ruby source code — entry file and namespaced modules" },
        { term: "spec/ or test/", description: "Test files — not packaged for end users" },
        { term: "bin/", description: "Executable scripts; listed in gemspec executables" },
        { term: ".gemspec", description: "Manifest describing name, version, files, and deps" },
        { term: "Gemfile", description: "Bundler file for developing the gem itself" },
      ],
      tip: "Entry file path mirrors the gem name: `poly_stats` → `lib/poly_stats.rb`.",
      essentials: [
        "lib/gem_name.rb is the entry point consumers require",
        "lib/gem_name/version.rb holds the VERSION constant",
        "spec/ tests are excluded from the packaged .gem file",
        "README.md becomes your RubyGems.org package page",
      ],
      practiceTitle: "Validate a gem has the required entry file",
    },
    prepend: [
      objectives([
        "Name the standard folders in a gem project",
        "Identify which folder is added to $LOAD_PATH",
        "Check a file list for the lib/ entry point",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — typical layout",
        content: `# poly_stats/
# ├── lib/poly_stats.rb
# ├── lib/poly_stats/version.rb
# ├── spec/poly_stats_spec.rb
# ├── poly_stats.gemspec
# └── Gemfile

FILES = ["lib/poly_stats.rb", "lib/poly_stats/version.rb", "spec/poly_stats_spec.rb"]
puts FILES.include?("lib/poly_stats.rb")`,
      },
      table("Gem directory reference", ["Path", "Packaged?", "Purpose"], [
        ["lib/", "Yes", "Runtime code on $LOAD_PATH"],
        ["spec/", "No", "Minitest/RSpec tests"],
        ["bin/", "Yes (if listed)", "CLI executables"],
        ["Rakefile", "No", "Dev tasks (test, build, release)"],
      ]),
    ],
    objectives: [
      "Verify a FILES array contains the lib/ entry point",
      "Return true or false from a layout validator",
    ],
  },
  "rbgem-7": {
    topicOverview: {
      style: "w3",
      definition:
        "Gems wrap code in a **namespace module** matching the gem name to avoid constant collisions. `json` defines `JSON`, `poly_stats` defines `PolyStats`. Nested modules use `::` — e.g. `PolyStats::Formatter`.",
      syntax: "module PolyStats\n  module Calculator\n  end\nend",
      syntaxLabel: "Namespaced gem module",
      reference: [
        { term: "Namespace", description: "Top-level module matching the gem name" },
        { term: "::", description: "Scope resolution operator for nested constants" },
        { term: "Snake → Camel", description: "poly_stats gem → PolyStats module" },
        { term: "Collision", description: "Prevented when gem code lives inside its namespace" },
      ],
      essentials: [
        "Every gem should define a module matching its CamelCase name",
        "Nested code goes inside that module, not at top level",
        "Entry file requires subfiles and may expose a convenience API",
        "Underscore-prefixed methods signal private/internal API",
      ],
      practiceTitle: "Build a nested Formatter module",
    },
    prepend: [
      objectives([
        "Explain why gems use namespace modules",
        "Map snake_case gem names to CamelCase modules",
        "Define nested modules with the :: operator",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — namespaced API",
        content: `module PolyStats
  module Calculator
    def self.mean(values)
      values.sum.to_f / values.length
    end
  end
end

puts PolyStats::Calculator.mean([2, 4, 6])`,
      },
      table("Naming conventions", ["Gem name", "Module", "Entry file"], [
        ["json", "JSON", "lib/json.rb"],
        ["poly_stats", "PolyStats", "lib/poly_stats.rb"],
        ["active_support", "ActiveSupport", "lib/active_support.rb"],
      ]),
    ],
    objectives: [
      "Define PolyStats::Formatter with a csv_row method",
      "Join array elements with commas",
    ],
  },
  "rbgem-8": {
    topicOverview: {
      style: "w3",
      definition:
        "Every gem defines a **VERSION** constant in `lib/gem_name/version.rb`. The gemspec reads this constant so you maintain the version in one place. The **entry point** loads version and subfiles, then exposes the public API.",
      syntax: 'VERSION = "0.1.0"',
      syntaxLabel: "Version constant in version.rb",
      reference: [
        { term: "VERSION", description: "Single source of truth for release number" },
        { term: "version.rb", description: "Dedicated file at lib/gem_name/version.rb" },
        { term: "Entry point", description: "lib/gem_name.rb — loaded by require \"gem_name\"" },
        { term: "Semver bump", description: "PATCH = fix, MINOR = feature, MAJOR = breaking" },
      ],
      tip: "Bump VERSION before `gem build` — the artifact name includes the version string.",
      essentials: [
        "Keep VERSION in lib/gem_name/version.rb",
        "Gemspec reads Gem::Specification version from the constant",
        "Entry file requires version.rb then other lib files",
        "Tag Git releases to match VERSION (v1.0.0)",
      ],
      practiceTitle: "Add VERSION and a banner method",
    },
    prepend: [
      objectives([
        "Place the VERSION constant in the standard file",
        "Wire the entry point to load version and API code",
        "Build a release banner from VERSION",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — version and banner",
        content: `module PolyStats
  VERSION = "1.0.0"

  def self.banner
    "PolyStats v#{VERSION}"
  end
end

puts PolyStats.banner`,
      },
      table("Semver bump guide", ["Change", "Bump", "Example"], [
        ["Bug fix, no API change", "PATCH", "1.0.0 → 1.0.1"],
        ["New backward-compatible feature", "MINOR", "1.0.1 → 1.1.0"],
        ["Breaking API change", "MAJOR", "1.1.0 → 2.0.0"],
      ]),
    ],
    objectives: [
      "Define VERSION and a self.banner method",
      "Interpolate VERSION into the banner string",
    ],
  },
  "rbgem-9": {
    topicOverview: {
      style: "w3",
      definition:
        "The **gemspec** (`.gemspec` file) is the gem's manifest. Required fields include **name**, **version**, **summary**, **authors**, and **files**. Optional fields: **homepage**, **license**, **executables**, and dependency declarations.",
      syntax: "gem build poly_stats.gemspec",
      syntaxLabel: "Build a .gem archive from gemspec",
      cliExample: "gem spec poly_stats.gemspec",
      reference: [
        { term: "name", description: "Gem name — lowercase, underscores (poly_stats)" },
        { term: "version", description: "Release version, usually read from VERSION constant" },
        { term: "files", description: "Array of paths packaged into the .gem archive" },
        { term: "summary", description: "One-line description shown on RubyGems.org" },
        { term: "require_paths", description: "Usually [\"lib\"] — added to $LOAD_PATH" },
      ],
      note: "In browser Ruby, simulate gemspec metadata as a hash instead of `Gem::Specification.new`.",
      essentials: [
        "s.files should list every file in the .gem package",
        "Use Dir[\"lib/**/*.rb\"] or git ls-files to populate files",
        "authors and email identify maintainers on RubyGems.org",
        "homepage links to GitHub or project docs",
      ],
      practiceTitle: "Build a gemspec description from a hash",
    },
    prepend: [
      objectives([
        "List essential gemspec fields and their purpose",
        "Simulate a gemspec as a Ruby hash",
        "Format a one-line gem description from metadata",
      ]),
      {
        type: "text",
        content:
          "**Real gemspec (commented — not runnable in browser WASM):** `Gem::Specification.new do |s|` sets name, version, summary, authors, files, and dependencies. Your challenge uses a hash with the same concepts.",
      },
      {
        type: "code",
        lang: "ruby",
        label: "Example — gemspec hash",
        content: `SPEC = {
  name: "poly_stats",
  version: "0.2.0",
  summary: "Stats helpers",
  authors: ["PolyCode Team"]
}

puts "#{SPEC[:name]} v#{SPEC[:version]} - #{SPEC[:summary]}"`,
      },
      table("Key gemspec fields", ["Field", "Required?", "Purpose"], [
        ["name", "Yes", "Unique gem identifier on RubyGems.org"],
        ["version", "Yes", "Current release (semver)"],
        ["files", "Yes", "What gets packaged into .gem"],
        ["add_runtime_dependency", "If needed", "Gems users must have installed"],
      ]),
    ],
    objectives: [
      "Read name, version, and summary from a SPEC hash",
      "Print a formatted one-line gem description",
    ],
  },
  "rbgem-10": {
    topicOverview: {
      style: "w3",
      definition:
        "**Semantic versioning** uses **MAJOR.MINOR.PATCH**. Never compare version strings with `<` — lexicographic order breaks (`\"10.0.0\" < \"9.0.0\"` is true as strings!). Parse into integer tuples or use `Gem::Version` in real projects.",
      syntax: "v.split(\".\").map(&:to_i)",
      syntaxLabel: "Parse a semver string",
      reference: [
        { term: "MAJOR", description: "Breaking changes — incompatible API updates" },
        { term: "MINOR", description: "Backward-compatible new features" },
        { term: "PATCH", description: "Backward-compatible bug fixes" },
        { term: "Gem::Version", description: "Ruby class for correct version comparison" },
        { term: "Pre-release", description: "1.0.0.beta1 — sorts below stable 1.0.0" },
      ],
      essentials: [
        "Parse versions into [major, minor, patch] integer arrays",
        "Compare tuple elements left to right numerically",
        "String comparison fails for multi-digit segments",
        "Constraint matching builds on parsed version logic",
      ],
      practiceTitle: "Compare two semver strings numerically",
    },
    prepend: [
      objectives([
        "Parse a semver string into integer components",
        "Compare versions numerically, not lexicographically",
        "Implement newer?(a, b) for two version strings",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — parse and compare",
        content: `def parse_version(v)
  v.split(".").map(&:to_i)
end

def version_gt?(left, right)
  parse_version(left).each_with_index do |part, i|
    r = parse_version(right)[i] || 0
    return true if part > r
    return false if part < r
  end
  false
end

def newer?(a, b)
  version_gt?(a, b)
end

puts newer?("2.1.0", "2.0.9")`,
      },
      table("Version comparison traps", ["Comparison", "String result", "Correct result"], [
        ["\"10.0.0\" < \"9.0.0\"", "true (wrong!)", "false"],
        ["\"2.10.0\" < \"2.9.0\"", "true (wrong!)", "false"],
        ["parse then compare", "N/A", "Always use numeric tuples"],
      ]),
    ],
    objectives: [
      "Write parse_version returning integer array",
      "Write newer? that compares parsed tuples correctly",
    ],
  },
  "rbgem-11": {
    topicOverview: {
      style: "w3",
      definition:
        "Gemspec dependencies split into **runtime** (`add_runtime_dependency`) and **development** (`add_development_dependency`). Runtime deps are required by apps using your gem; dev deps are only for building, testing, and linting.",
      syntax: "# s.add_runtime_dependency \"json\", \"~> 2.0\"",
      syntaxLabel: "Runtime dependency (real gemspec)",
      reference: [
        { term: "Runtime", description: "Needed when consumers require your gem in production" },
        { term: "Development", description: "Minitest, RuboCop, yard — author/CI only" },
        { term: "add_runtime_dependency", description: "Gemspec method for production deps" },
        { term: "add_development_dependency", description: "Gemspec method for dev/test tools" },
      ],
      note: "Putting Minitest in runtime dependencies bloats every consumer's install — keep test tools in development.",
      essentials: [
        "Runtime deps appear in consumer Gemfile.lock transitively",
        "Dev deps stay in the gem repo — not forced on users",
        "Bundler groups (:test) are separate from gemspec dep types",
        "Classify deps with RUNTIME and DEV arrays in simulation",
      ],
      practiceTitle: "Classify a gem as runtime or development",
    },
    prepend: [
      objectives([
        "Distinguish runtime from development dependencies",
        "Know who installs each dependency type",
        "Classify gem names into :runtime or :development",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — dep classification",
        content: `RUNTIME = ["json", "rake"]
DEV = ["minitest", "rubocop"]

def dep_type(name)
  return :runtime if RUNTIME.include?(name)
  return :development if DEV.include?(name)
  :unknown
end

puts dep_type("minitest")`,
      },
      table("Dependency audience", ["Type", "Who installs", "Examples"], [
        ["Runtime", "Every consumer", "json, faraday, pg"],
        ["Development", "Gem author & CI", "minitest, rubocop, yard"],
        ["Bundler :test group", "Test environment only", "factory_bot, webmock"],
      ]),
    ],
    objectives: [
      "Return :runtime, :development, or :unknown for a gem name",
      "Check membership in RUNTIME and DEV arrays",
    ],
  },
  "rbgem-12": {
    topicOverview: {
      style: "w3",
      definition:
        "Bundler **version constraints** control which releases are acceptable. The **pessimistic operator** `~>` allows patch updates within a boundary: `~> 2.6` means `>= 2.6` and `< 3.0`. `~> 2.6.1` means `>= 2.6.1` and `< 2.7.0`.",
      syntax: 'gem "json", "~> 2.6"',
      syntaxLabel: "Pessimistic version constraint",
      reference: [
        { term: "~>", description: "Pessimistic operator — trust this release line" },
        { term: ">= 2.0", description: "Any version 2.0 or higher" },
        { term: "= 2.7.2", description: "Exact version pin" },
        { term: "< 3.0", description: "Upper bound — exclude next major" },
      ],
      tip: "`~> 2.6` is Ruby shorthand for \"I trust 2.x but not 3.0 yet.\"",
      essentials: [
        "~> with two segments: >= X.Y and < (X+1).0",
        "~> with three segments: >= X.Y.Z and < X.(Y+1).0",
        ">= and < can be combined for custom ranges",
        "Exact pins (= 1.2.3) maximize reproducibility",
      ],
      practiceTitle: "Check if a version satisfies ~> constraint",
    },
    prepend: [
      objectives([
        "Read common Bundler constraint operators",
        "Explain pessimistic ~> boundaries",
        "Test whether a version satisfies a ~> base",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — pessimistic ceiling",
        content: `def pessimistic_ceiling(base)
  major, = base.split(".").map(&:to_i)
  "#{major + 1}.0"
end

puts pessimistic_ceiling("2.6")   # "3.0"
puts pessimistic_ceiling("1.2")   # "2.0"`,
      },
      table("Constraint cheat sheet", ["Constraint", "Allows", "Blocks"], [
        ["~> 2.6", "2.6.0, 2.7.2, 2.99.0", "3.0.0"],
        ["~> 2.6.1", "2.6.1, 2.6.9", "2.7.0"],
        [">= 2.0, < 3.0", "Same as ~> 2.0 (two segments)", "3.0.0"],
      ]),
    ],
    objectives: [
      "Implement satisfies_pessimistic? for a two-segment base",
      "Reject versions at or above the next major boundary",
    ],
  },
  "rbgem-13": {
    topicOverview: {
      style: "w3",
      definition:
        "Bundler's **resolver** picks gem versions satisfying all constraints across the dependency graph. It reads the Gemfile, checks compatibility with transitive deps, and writes exact versions to **Gemfile.lock**.",
      syntax: "bundle install",
      syntaxLabel: "Trigger dependency resolution",
      reference: [
        { term: "Resolver", description: "Algorithm that picks compatible versions for all gems" },
        { term: "Transitive", description: "Dependencies required by your direct dependencies" },
        { term: "Conflict", description: "When two gems need incompatible versions of the same lib" },
        { term: "CATALOG", description: "Simulation hash: gem name → available versions" },
      ],
      note: "Real resolution is complex; your simulation focuses on picking the latest compatible version from a catalog.",
      essentials: [
        "Resolution output is Gemfile.lock with exact versions",
        "Conflicts cause bundle install to fail with a clear error",
        "bundle update re-runs the resolver with fresh releases",
        "Simulate with a CATALOG hash mapping names to version arrays",
      ],
      practiceTitle: "Resolve the highest available version",
    },
    prepend: [
      objectives([
        "Describe the resolver's role in the Bundler workflow",
        "Simulate version picking from a catalog",
        "Return the highest listed version for a gem",
      ]),
      {
        type: "text",
        content:
          "**Resolution steps:** (1) Read Gemfile constraints. (2) Build dependency graph including transitive deps. (3) Pick compatible versions. (4) Write Gemfile.lock.",
      },
      {
        type: "code",
        lang: "ruby",
        label: "Example — pick from catalog",
        content: `CATALOG = {
  "json" => ["2.6.0", "2.7.2", "3.0.0"],
  "rake" => ["13.0.0", "13.2.1"]
}

def resolve(name)
  (CATALOG[name] || []).last
end

puts resolve("json")`,
      },
      table("Resolver inputs and outputs", ["Input", "Output"], [
        ["Gemfile constraints", "Candidate version ranges"],
        ["Gemspec deps (transitive)", "Additional constraints"],
        ["Available releases", "Gemfile.lock exact pins"],
      ]),
    ],
    objectives: [
      "Read versions from a CATALOG hash",
      "Return the last (highest listed) version for a gem",
    ],
  },
  "rbgem-14": {
    topicOverview: {
      style: "w3",
      definition:
        "Some gems have **optional dependencies** — features enabled only when another gem is present. Detect optional gems with **begin/rescue LoadError** around `require`, or check Bundler's loaded spec list in real projects.",
      syntax: "rescue LoadError",
      syntaxLabel: "Detect missing optional gem",
      reference: [
        { term: "Optional dep", description: "Feature gem that enhances but is not required" },
        { term: "LoadError", description: "Raised when require cannot find a library" },
        { term: "Graceful degrade", description: "Core API works; extended features show clear errors" },
        { term: "Feature flag", description: "Runtime check whether optional gem is installed" },
      ],
      tip: "Document optional gems in README — tell consumers which Gemfile lines to add for extra features.",
      essentials: [
        "Wrap optional require in begin/rescue LoadError",
        "Core features must work without optional deps",
        "Raise a helpful message when optional feature is requested but gem missing",
        "Simulate with an INSTALLED array of gem names",
      ],
      practiceTitle: "Enable or disable a feature by installed gems",
    },
    prepend: [
      objectives([
        "Explain optional dependencies in gem design",
        "Use begin/rescue LoadError for optional require",
        "Report feature enabled/disabled based on installed gems",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — feature flag",
        content: `INSTALLED = ["json", "rake"]

def available?(gem_name)
  INSTALLED.include?(gem_name)
end

def feature_status(feature, required_gem)
  if available?(required_gem)
    puts "#{feature}: enabled"
  else
    puts "#{feature}: disabled"
  end
end

feature_status("export", "json")`,
      },
      table("Optional dependency patterns", ["Pattern", "When to use"], [
        ["begin/rescue LoadError", "Runtime detection of installed adapter gem"],
        ["Document in README", "Consumer adds pg, redis, etc. to Gemfile"],
        ["Feature flag method", "API reports whether extension is active"],
      ]),
    ],
    objectives: [
      "Check INSTALLED for a required gem name",
      "Print enabled or disabled for a feature",
    ],
  },
  "rbgem-15": {
    topicOverview: {
      style: "w3",
      definition:
        "Most gems use **Minitest** or **RSpec** for testing. Tests live in **spec/** or **test/** and are excluded from the packaged gem. CI runs `bundle exec rake test` or `rspec` before every release.",
      syntax: "bundle exec rake test",
      syntaxLabel: "Run gem tests via Rake",
      cliExample: "bundle exec rspec",
      reference: [
        { term: "Minitest", description: "Lightweight test framework in Ruby stdlib ecosystem" },
        { term: "RSpec", description: "Popular BDD-style test framework (dev dependency)" },
        { term: "spec/", description: "Directory for tests — not in gemspec files list" },
        { term: "CI", description: "Continuous integration — runs tests on every push" },
      ],
      note: "In browser Ruby, simulate a tiny test runner with assert methods in pure Ruby.",
      essentials: [
        "Write tests before publishing — never ship broken releases",
        "Test files are dev-only; not packaged in the .gem archive",
        "assert_equal and assert_true are core Minitest assertions",
        "Green CI is a gate before gem push",
      ],
      practiceTitle: "Build a mini assert_true helper",
    },
    prepend: [
      objectives([
        "Know where gem tests live and how CI runs them",
        "Simulate a minimal test assertion in pure Ruby",
        "Return PASS or raise FAIL on condition",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — mini test runner",
        content: `def assert_equal(expected, actual)
  raise "Expected #{expected}, got #{actual}" unless expected == actual
  "PASS"
end

def assert_true(condition)
  raise "FAIL" unless condition
  "PASS"
end

puts assert_equal(4, 2 + 2)
puts assert_true(3 > 1)`,
      },
      table("Test commands", ["Command", "Framework"], [
        ["bundle exec rake test", "Minitest (default Rake task)"],
        ["bundle exec rspec", "RSpec"],
        ["bundle exec ruby -Itest test/test_helper.rb", "Minitest direct"],
      ]),
    ],
    objectives: [
      "Implement assert_true that raises FAIL when false",
      "Return PASS when condition is true",
    ],
  },
  "rbgem-16": {
    topicOverview: {
      style: "w3",
      definition:
        "Great gems expose a **small, stable public API**. Hide internals in nested modules or prefix with underscore. Raise clear errors on invalid input. Add methods in minor releases; deprecate before removing in major releases.",
      syntax: "def self.mean(values)",
      syntaxLabel: "Module-level public API",
      reference: [
        { term: "Public API", description: "Methods documented and promised stable across minor releases" },
        { term: "ArgumentError", description: "Raised for invalid inputs — fail fast with clear messages" },
        { term: "configure block", description: "yield self DSL for setting options at boot" },
        { term: "Deprecation", description: "Warn before removing methods in next major version" },
      ],
      tip: "Breaking changes require a **major** version bump under semver.",
      essentials: [
        "Module methods for stateless utilities (mean, parse, format)",
        "Classes for stateful objects (Client, Connection)",
        "Raise ArgumentError on empty or invalid input",
        "Keep the public surface small — hide implementation details",
      ],
      practiceTitle: "Implement mean with empty-array guard",
    },
    prepend: [
      objectives([
        "Design a minimal, stable public API for a gem",
        "Raise clear errors on invalid input",
        "Implement a guarded mean method",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — safe public API",
        content: `module PolyStats
  def self.mean(values)
    raise ArgumentError, "empty" if values.empty?
    values.sum.to_f / values.length
  end
end

puts PolyStats.mean([10, 20, 30])`,
      },
      table("API design choices", ["Pattern", "Best for"], [
        ["Module methods", "Stateless helpers (mean, encode)"],
        ["Class instances", "Stateful connections (Client, Parser)"],
        ["configure { |c| }", "Global settings (precision, prefix)"],
      ]),
    ],
    objectives: [
      "Guard against empty arrays in mean",
      "Return a float average for valid input",
    ],
  },
  "rbgem-17": {
    topicOverview: {
      style: "w3",
      definition:
        "Rubyists document APIs with **RDoc** or **YARD** comments above methods. Tags like **@param**, **@return**, and **@raise** generate HTML docs and appear in IDE tooltips.",
      syntax: "# @param values [Array<Numeric>]",
      syntaxLabel: "YARD param tag",
      cliExample: "yard doc",
      reference: [
        { term: "YARD", description: "Documentation tool with rich @tag syntax" },
        { term: "RDoc", description: "Ruby's built-in documentation generator" },
        { term: "@param", description: "Documents a method parameter and type" },
        { term: "@return", description: "Documents the return value and type" },
        { term: "@raise", description: "Documents exceptions the method may raise" },
      ],
      essentials: [
        "Write comments directly above the method they describe",
        "Run yard doc or rdoc locally to preview HTML output",
        "Published gems often host docs on RubyDoc.info",
        "Good docs reduce GitHub issues and support burden",
      ],
      practiceTitle: "Format a method signature from doc metadata",
    },
    prepend: [
      objectives([
        "Read YARD @param, @return, and @raise tags",
        "Understand why gem APIs need documentation",
        "Format a doc_line from a metadata hash",
      ]),
      {
        type: "text",
        content:
          "**YARD example (comment only):** `# @param values [Array<Numeric>] list of numbers` / `# @return [Float] the mean` / `# @raise [ArgumentError] if values is empty`",
      },
      {
        type: "code",
        lang: "ruby",
        label: "Example — doc metadata hash",
        content: `DOCS = { method: "mean", params: "values", returns: "Float" }

def doc_line
  "#{DOCS[:method]}(#{DOCS[:params]}) -> #{DOCS[:returns]}"
end

puts doc_line`,
      },
      table("Common YARD tags", ["Tag", "Documents"], [
        ["@param name [Type]", "Method argument"],
        ["@return [Type]", "Return value"],
        ["@raise [ErrorClass]", "Exception that may be raised"],
        ["@example", "Usage example in generated docs"],
      ]),
    ],
    objectives: [
      "Build doc_line from DOCS hash fields",
      "Output method(params) -> returns format",
    ],
  },
  "rbgem-18": {
    topicOverview: {
      style: "w3",
      definition:
        "Publishing follows a pipeline: bump **VERSION**, update **CHANGELOG**, run tests, **gem build** the `.gemspec` into a `.gem` archive, then **gem push** to RubyGems.org.",
      syntax: "gem build poly_stats.gemspec",
      syntaxLabel: "Build the .gem archive",
      cliExample: "gem push poly_stats-0.3.0.gem",
      exampleNote:
        "The artifact name is always `name-version.gem` — e.g. `poly_stats-0.3.0.gem`. You cannot overwrite an existing version on RubyGems.org.",
      reference: [
        { term: "gem build", description: "Packages lib/ files and metadata into a .gem tarball" },
        { term: "gem push", description: "Uploads .gem to RubyGems.org (requires API key + 2FA)" },
        { term: "CHANGELOG", description: "Human-readable list of changes per version" },
        { term: "rake release", description: "Common task chain: bump, tag, build, push" },
      ],
      note: "If you publish a bad release, yank it on RubyGems.org and publish a new patch version.",
      essentials: [
        "Bump VERSION in lib/gem_name/version.rb first",
        "Run full test suite before gem build",
        "gem build produces name-version.gem in the project root",
        "gem push uploads; enable 2FA on your RubyGems account",
      ],
      practiceTitle: "Compute the .gem artifact filename",
    },
    prepend: [
      objectives([
        "List the steps in a gem release pipeline",
        "Know what gem build and gem push produce",
        "Build an artifact name from NAME and VERSION",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — artifact name",
        content: `NAME = "poly_stats"
VERSION = "0.3.0"

def artifact_name
  "#{NAME}-#{VERSION}.gem"
end

puts artifact_name`,
      },
      table("Release pipeline", ["Step", "Command / action"], [
        ["1. Bump version", "Edit lib/gem_name/version.rb"],
        ["2. Test", "bundle exec rake test"],
        ["3. Build", "gem build my_gem.gemspec"],
        ["4. Push", "gem push my_gem-1.0.0.gem"],
      ]),
    ],
    objectives: [
      "Return the standard name-version.gem string",
      "Interpolate NAME and VERSION constants",
    ],
  },
  "rbgem-19": {
    topicOverview: {
      style: "w3",
      definition:
        "Before your first **gem push**, verify a publish checklist: VERSION bumped, tests green, CHANGELOG updated, README has install instructions, license in gemspec, and **2FA** enabled on RubyGems.org.",
      syntax: "gem signin",
      syntaxLabel: "Authenticate with RubyGems.org",
      cliExample: "gem push my_gem-1.0.0.gem",
      reference: [
        { term: "API key", description: "Stored in ~/.gem/credentials for gem push" },
        { term: "2FA", description: "Two-factor auth — required for pushes since 2022" },
        { term: "README", description: "Install instructions shown on RubyGems.org package page" },
        { term: "License", description: "MIT, Apache-2.0, etc. — set in gemspec" },
        { term: "Git tag", description: "Tag v1.0.0 matching VERSION for source browsing" },
      ],
      tip: "Run `gem install your_gem` locally from the built .gem before pushing to verify packaging.",
      essentials: [
        "Register at rubygems.org and create an API key",
        "Enable 2FA before attempting gem push",
        "README should show gem install and basic usage",
        "Tag Git release to match VERSION",
      ],
      practiceTitle: "Calculate checklist completion percentage",
    },
    prepend: [
      objectives([
        "Complete a pre-publish verification checklist",
        "Know RubyGems.org authentication requirements",
        "Compute completion rate from a boolean array",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — publish checklist",
        content: `CHECKLIST = [
  "VERSION bumped",
  "Tests passing",
  "CHANGELOG updated",
  "README has install instructions",
  "MIT license in gemspec"
]

CHECKLIST.each { |step| puts "[ ] #{step}" }`,
      },
      table("Pre-push checklist", ["Item", "Why it matters"], [
        ["VERSION bumped", "Artifact name must be unique on RubyGems"],
        ["Tests passing", "Don't ship broken releases"],
        ["CHANGELOG", "Users know what changed"],
        ["2FA enabled", "Required for gem push since 2022"],
      ]),
    ],
    objectives: [
      "Count true values in a DONE array",
      "Return integer percentage of completed items",
    ],
  },
  "rbgem-20": {
    topicOverview: {
      style: "w3",
      definition:
        "Gem **security** matters: **typosquatting** (similarly named malicious gems), compromised maintainer accounts, and malicious post-install hooks. Mitigate with version pinning, **bundle audit**, and reviewing gemspec metadata before adding deps.",
      syntax: "bundle audit check",
      syntaxLabel: "Scan for known vulnerabilities",
      reference: [
        { term: "Typosquatting", description: "Malicious gem with name near a popular one (rubocop vs rubocpp)" },
        { term: "bundle audit", description: "Checks lockfile against a vulnerability database" },
        { term: "Pin versions", description: "Gemfile.lock prevents surprise transitive updates" },
        { term: "Supply chain", description: "Risk from third-party code in your dependency tree" },
      ],
      note: "Never embed API keys or passwords in a published gem. Use environment variables in the consuming app.",
      essentials: [
        "Review new gems on RubyGems.org before adding to Gemfile",
        "Commit Gemfile.lock and run bundle audit in CI",
        "Prefer well-maintained gems with many downloads",
        "Enable 2FA on your own RubyGems publish account",
      ],
      practiceTitle: "Check a gem against a trusted list",
    },
    prepend: [
      objectives([
        "Identify typosquatting and supply-chain risks",
        "List trust practices for gem dependencies",
        "Verify a gem name against a TRUSTED list",
      ]),
      {
        type: "text",
        content:
          "**Red flags:** Few downloads, no GitHub link, recently created name similar to a popular gem, or gemspec with suspicious post-install scripts.",
      },
      {
        type: "code",
        lang: "ruby",
        label: "Example — trust check",
        content: `TRUSTED = ["json", "rake", "minitest"]
REQUESTED = "json"

def trusted?(name)
  TRUSTED.include?(name)
end

puts trusted?(REQUESTED) ? "safe" : "review"`,
      },
      table("Security practices", ["Practice", "Tool / action"], [
        ["Pin exact versions", "Gemfile.lock committed to git"],
        ["Audit dependencies", "bundle audit check"],
        ["Verify gem source", "RubyGems.org page + GitHub repo"],
        ["Least privilege", "Minimal dependencies, no secrets in gems"],
      ]),
    ],
    objectives: [
      "Implement trusted? against a TRUSTED array",
      "Print safe or review for a requested gem",
    ],
  },
  "rbgem-21": {
    topicOverview: {
      style: "w3",
      definition:
        "Production gems share common patterns: a **configuration module** with `configure { |c| c.option = val }`, JSON wrapper defaults, and Railtie hooks for Rails integration. Study `faraday`, `dry-configurable`, and `dotenv` for excellent ergonomics.",
      syntax: "MyGem.configure { |c| c.timeout = 30 }",
      syntaxLabel: "Configuration block DSL",
      reference: [
        { term: "configure block", description: "yield self — DSL for setting options at boot" },
        { term: "Class ivars", description: "@precision and accessor methods store settings" },
        { term: "Railtie", description: "Rails hook for gems that integrate with Rails boot" },
        { term: "Adapter pattern", description: "Swap backends (JSON, HTTP) via configuration" },
      ],
      tip: "Study popular gem source on GitHub — patterns repeat across the ecosystem.",
      essentials: [
        "Sensible defaults so the gem works out of the box",
        "configure block with yield self for clean DSL",
        "Getter/setter methods for each configuration option",
        "Document all configuration options in README",
      ],
      practiceTitle: "Build a configurable prefix module",
    },
    prepend: [
      objectives([
        "Recognize the configure block pattern",
        "Implement getter/setter for a class-level option",
        "Set and read a prefix configuration value",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — configure block",
        content: `module PolyStats
  @precision = 2

  def self.configure
    yield self
  end

  def self.precision=(val)
    @precision = val
  end

  def self.precision
    @precision
  end
end

PolyStats.configure { |c| c.precision = 4 }
puts PolyStats.precision`,
      },
      table("Popular gem patterns", ["Pattern", "Example gems"], [
        ["configure block", "dotenv, sidekiq, dry-configurable"],
        ["Middleware stack", "faraday, rack"],
        ["Railtie integration", "devise, rspec-rails"],
      ]),
    ],
    objectives: [
      "Define prefix getter and setter on PolyStats",
      "Set prefix to metric and print it",
    ],
  },
  "rbgem-22": {
    topicOverview: {
      style: "w3",
      definition:
        "Not every gem belongs on RubyGems.org. **Private gems** live on internal servers (Gemstash, Artifactory, GitHub Packages) or are loaded via **path:** or **git:** in the Gemfile — common in monorepos and enterprise teams.",
      syntax: 'gem "poly_stats", path: "../poly_stats"',
      syntaxLabel: "Load a local gem without publishing",
      reference: [
        { term: "path:", description: "Bundler loads gem from a local directory" },
        { term: "git:", description: "Install gem from a Git repository URL" },
        { term: "Gemstash", description: "Self-hosted RubyGems-compatible cache/server" },
        { term: "source URL", description: "Private registry URL in Gemfile source block" },
      ],
      essentials: [
        "Private gems follow the same lib/, gemspec, and test structure",
        "path: is ideal for monorepo local development",
        "CI authenticates to private registries with tokens",
        "Simulate sources with a hash: name → :path, :git, or :rubygems",
      ],
      practiceTitle: "Route a gem name to its source type",
    },
    prepend: [
      objectives([
        "Explain when to use private vs public gems",
        "Use path: and git: in a Gemfile",
        "Look up source type from a SOURCES hash",
      ]),
      {
        type: "code",
        lang: "ruby",
        label: "Example — source types",
        content: `SOURCES = {
  "poly_stats" => :path,
  "json" => :rubygems,
  "internal_auth" => :git
}

def source_for(name)
  SOURCES.fetch(name, :unknown)
end

puts source_for("poly_stats")`,
      },
      table("Gemfile source options", ["Option", "Use case"], [
        ["path: '../my_gem'", "Local monorepo development"],
        ["git: 'https://...'", "Unpublished gem from GitHub/GitLab"],
        ["source 'https://gems.company.com'", "Private RubyGems server"],
      ]),
    ],
    objectives: [
      "Return :path, :rubygems, or :unknown from SOURCES",
      "Use fetch with a default for missing keys",
    ],
  },
  "rbgem-23": {
    topicOverview: {
      style: "w3",
      definition:
        "You've completed **Ruby Gems** — from RubyGems.org and Bundler to gemspecs, semver, dependency resolution, testing, publishing, and professional patterns. The capstone builds a miniature **PolyStats** gem combining VERSION, API design, and release info.",
      syntax: "bundle gem poly_stats",
      syntaxLabel: "Start your own gem locally",
      reference: [
        { term: "RubyGems.org", description: "Public registry — gem install and gem push" },
        { term: "Bundler", description: "Gemfile + lockfile dependency management" },
        { term: "gemspec", description: "Manifest for building and publishing" },
        { term: "Gemfile.lock", description: "Reproducible exact versions across machines" },
        { term: "PolyStats", description: "Capstone module — your miniature published gem" },
      ],
      tip: "Next step: run `bundle gem your_gem` locally and publish a tiny utility gem to RubyGems.org.",
      essentials: [
        "Gems package reusable Ruby libraries with semver versions",
        "Bundler resolves deps and Gemfile.lock pins exact versions",
        "lib/ structure, gemspec, tests, and docs before gem push",
        "Security, private gems, and config patterns for production libraries",
      ],
      practiceTitle: "PolyStats capstone — ship a miniature gem",
    },
    prepend: [
      objectives([
        "Recall the full gem lifecycle from install to publish",
        "Combine VERSION, mean, and release_info in one module",
        "Complete the PolyStats capstone challenge",
      ]),
      {
        type: "text",
        content:
          "**Your journey:** Ecosystem (require, LOAD_PATH) → Bundler (Gemfile, lock) → Build (lib/, gemspec) → Dependencies (semver, resolver) → Test & publish → Pro patterns (config, private gems).",
      },
      {
        type: "code",
        lang: "ruby",
        label: "Example — capstone preview",
        content: `module PolyStats
  VERSION = "1.0.0"

  def self.mean(values)
    raise "empty" if values.empty?
    values.sum.to_f / values.length
  end

  def self.release_info
    "PolyStats #{VERSION} ready"
  end
end

puts PolyStats.release_info
puts PolyStats.mean([10, 20, 30])`,
      },
      table("Course recap", ["Topic", "Key takeaway"], [
        ["RubyGems & require", "gem install + $LOAD_PATH + require"],
        ["Bundler", "Gemfile constraints → Gemfile.lock pins"],
        ["Build & publish", "lib/, gemspec, gem build, gem push"],
        ["Professional", "Config modules, security, private gems"],
      ]),
    ],
    objectives: [
      "Build PolyStats with VERSION, mean, and release_info",
      "Print release info and mean of [10, 20, 30]",
    ],
  },
};

export function applyRubyGemsEnhancements(chapters) {
  return chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map((lesson) => {
      const w3 = RUBY_GEMS_W3_CONTENT[lesson.id];
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
