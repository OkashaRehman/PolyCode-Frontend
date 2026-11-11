// PolyCode — Ruby Gems interactive course
// 8 chapters · 24 lessons · browser Ruby challenges (gem concepts simulated in pure Ruby)
// W3 reference blocks: rubyGemsLessonEnhancements.js

import { applyRubyGemsEnhancements } from "./rubyGemsLessonEnhancements.js";

const ACCENT = "#9333ea";

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function text(content, codeBlock = null) {
  if (codeBlock) {
    return {
      type: "text",
      content,
      code: { lang: "ruby", ...codeBlock },
    };
  }
  return { type: "text", content };
}

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

export const RUBY_GEMS_CHAPTERS = applyRubyGemsEnhancements([
  {
    id: "ecosystem",
    title: "RubyGems Ecosystem",
    stage: "beginner",
    icon: "💎",
    color: ACCENT,
    lessons: [
      {
        id: "rbgem-0",
        title: "What Are Gems?",
        xp: 10,
        theory: [
          text(
            "A **gem** is a packaged Ruby library — reusable code distributed through RubyGems. Instead of copying source files into every project, you declare a dependency and Ruby loads the library at runtime. Gems can add methods, classes, or entire frameworks (like Rails).",
            {
              label: "Conceptual gem module",
              content: `# A gem often exposes a top-level module
module Colorize
  def self.red(text)
    "[RED] #{text}"
  end
end

puts Colorize.red("Hello")`,
            },
          ),
          text(
            "Every published gem has a **name** (e.g. `json`, `rake`) and a **version** (e.g. `2.7.2`). Version numbers follow [Semantic Versioning](https://semver.org): `MAJOR.MINOR.PATCH`.",
          ),
          diagram("Gem Lifecycle", [
            { id: "author", label: "Author", color: ACCENT, items: ["Write library code", "Define gemspec", "Run tests"] },
            { id: "publish", label: "RubyGems.org", color: "#a855f7", items: ["Upload .gem file", "Version indexed", "Downloadable worldwide"] },
            { id: "consumer", label: "Your App", color: "#22c55e", items: ["Gemfile entry", "bundle install", "require in code"] },
          ]),
          callout(
            "info",
            "In PolyCode's browser Ruby environment you cannot run `gem install`. Instead, you will **simulate** gem concepts — modules, version constants, dependency hashes — using pure Ruby.",
          ),
          quiz(
            "What is the primary purpose of a Ruby gem?",
            ["Compile Ruby to machine code", "Package and distribute reusable Ruby libraries", "Replace the Ruby interpreter", "Manage Git repositories"],
            1,
            "Gems are the standard packaging format for sharing Ruby libraries via RubyGems.org.",
          ),
        ],
        challenge: {
          title: "Gem Identity",
          description:
            "Define a module `PolyGem` with a constant `NAME` set to `\"poly-stats\"` and a method `self.describe` that returns the string `\"Gem: poly-stats\"`. Call `puts PolyGem.describe`.",
          starterCode: `# Define PolyGem module\n`,
          solutionCode: `module PolyGem
  NAME = "poly-stats"

  def self.describe
    "Gem: #{NAME}"
  end
end

puts PolyGem.describe`,
          tests: [
            { id: 1, label: "Defines module PolyGem", keywords: [{ pattern: "module\\s+PolyGem" }] },
            { id: 2, label: "Sets NAME constant", keywords: [{ pattern: "NAME\\s*=\\s*\"poly-stats\"" }] },
            { id: 3, label: "Prints Gem: poly-stats", keywords: [{ pattern: "puts\\s+PolyGem\\.describe" }] },
          ],
        },
      },
      {
        id: "rbgem-1",
        title: "RubyGems.org & require",
        xp: 12,
        theory: [
          text(
            "**RubyGems.org** is the public registry where gems are hosted. When you `gem install json`, RubyGems downloads the gem and places it on your `$LOAD_PATH` so `require \"json\"` can find it.",
            {
              label: "require loads a library",
              content: `# After installation, require loads the library
require "json"   # loads json gem's entry file

data = { name: "Ruby", version: 3 }
puts JSON.generate(data)`,
            },
          ),
          text(
            "`require` searches `$LOAD_PATH` — an array of directories Ruby scans for `.rb` files. If the file is already loaded, `require` returns `false` and does not reload it (preventing duplicate class definitions).",
          ),
          callout(
            "tip",
            "Use `require_relative` for files within your own project. Reserve `require` for gems and standard libraries.",
          ),
          quiz(
            "What does `require` return if the file was already loaded?",
            ["true", "false", "nil", "An error"],
            1,
            "require returns false when the file is already in $LOADED_FEATURES, signaling no reload occurred.",
          ),
        ],
        challenge: {
          title: "Simulated require",
          description:
            "Simulate a mini load path. Set `LOAD_PATH_SIM = [\"lib\"]` and `LOADED = []`. Write a method `fake_require(name)` that pushes `name` into `LOADED` only if it is not already there, then returns `true` or `false`. Call `fake_require(\"json\")` twice and `puts LOADED.inspect`.",
          starterCode: `LOAD_PATH_SIM = ["lib"]
LOADED = []

def fake_require(name)
  # return false if already loaded, else add and return true
end

fake_require("json")
fake_require("json")
puts LOADED.inspect`,
          solutionCode: `LOAD_PATH_SIM = ["lib"]
LOADED = []

def fake_require(name)
  return false if LOADED.include?(name)
  LOADED << name
  true
end

fake_require("json")
fake_require("json")
puts LOADED.inspect`,
          tests: [
            { id: 1, label: "Defines fake_require", keywords: [{ pattern: "def\\s+fake_require" }] },
            { id: 2, label: "Checks LOADED", keywords: [{ pattern: "LOADED\\.include\\?" }] },
            { id: 3, label: "Prints LOADED", keywords: [{ pattern: "puts\\s+LOADED\\.inspect" }] },
          ],
        },
      },
      {
        id: "rbgem-2",
        title: "$LOAD_PATH Simulation",
        xp: 14,
        theory: [
          text(
            "When Ruby cannot find a file via `require`, it raises `LoadError`. Gems add their `lib/` directory to `$LOAD_PATH` during installation. You can inspect the path at runtime:",
            {
              label: "Inspecting load path",
              content: `$LOAD_PATH.first(3).each { |p| puts p }`,
            },
          ),
          diagram("require Search Order", [
            { id: "check", label: "1. Check", color: ACCENT, items: ["Already loaded?", "Return false"] },
            { id: "search", label: "2. Search", color: "#f97316", items: ["Each $LOAD_PATH dir", "name.rb or name.so"] },
            { id: "load", label: "3. Load", color: "#22c55e", items: ["Eval file", "Add to $LOADED_FEATURES", "Return true"] },
          ]),
          text(
            "Gem entry points usually live at `lib/gem_name.rb`, which may `require` additional files from `lib/gem_name/` subfolders.",
          ),
          callout(
            "info",
            "In real projects, Bundler manages `$LOAD_PATH` for you after `bundle exec` or `Bundler.require`.",
          ),
          quiz(
            "Where do gem authors typically place the main entry `.rb` file?",
            ["bin/", "lib/", "spec/", "vendor/"],
            1,
            "The lib/ directory is added to $LOAD_PATH; the entry file is usually lib/gem_name.rb.",
          ),
        ],
        challenge: {
          title: "Find on Load Path",
          description:
            "Given `LOAD_PATH_SIM = [\"lib\", \"vendor\"]` and `FILES = { \"lib/json.rb\" => true, \"vendor/json.rb\" => true }`, write `find_gem(name)` that returns `\"lib/#{name}.rb\"` if that key exists in `FILES`, else `nil`. Set `entry = find_gem(\"json\")` and `puts entry`.",
          starterCode: `LOAD_PATH_SIM = ["lib", "vendor"]
FILES = { "lib/json.rb" => true, "vendor/json.rb" => true }

def find_gem(name)
  # search LOAD_PATH_SIM for first matching file
end

entry = find_gem("json")
puts entry`,
          solutionCode: `LOAD_PATH_SIM = ["lib", "vendor"]
FILES = { "lib/json.rb" => true, "vendor/json.rb" => true }

def find_gem(name)
  LOAD_PATH_SIM.each do |dir|
    path = "#{dir}/#{name}.rb"
    return path if FILES.key?(path)
  end
  nil
end

entry = find_gem("json")
puts entry`,
          tests: [
            { id: 1, label: "Defines find_gem", keywords: [{ pattern: "def\\s+find_gem" }] },
            { id: 2, label: "Iterates LOAD_PATH_SIM", keywords: [{ pattern: "LOAD_PATH_SIM\\.each" }] },
            { id: 3, label: "Prints entry", keywords: [{ pattern: "puts\\s+entry" }] },
          ],
        },
      },
    ],
  },
  {
    id: "bundler",
    title: "Bundler Basics",
    stage: "beginner",
    icon: "📦",
    color: "#7c3aed",
    lessons: [
      {
        id: "rbgem-3",
        title: "Why Bundler?",
        xp: 12,
        theory: [
          text(
            "**Bundler** is the dependency manager for Ruby. Without it, different projects might install conflicting gem versions globally. Bundler reads your `Gemfile`, resolves compatible versions, and installs gems into a project-local path (or uses the system gems with a lockfile).",
            {
              label: "Gemfile snippet",
              content: `# Simulated Gemfile (pure Ruby — Bundler DSL is not runnable here)
GEMFILE_SIM = {
  source: "https://rubygems.org",
  gems: [
    { name: "rake", version: "~> 13.0" },
    { name: "minitest", group: :test },
  ],
}

GEMFILE_SIM[:gems].each { |g| puts "gem \\"#{g[:name]}\\", \\"#{g[:version] || "default"}\\"" }`,
            },
          ),
          text(
            "Run `bundle install` to resolve and install. Run `bundle exec rspec` to ensure commands use the locked gem versions, not random global installs.",
          ),
          diagram("Bundler's Job", [
            { id: "gemfile", label: "Gemfile", color: "#7c3aed", items: ["Desired gems", "Version constraints", "Groups"] },
            { id: "resolve", label: "Resolver", color: ACCENT, items: ["Check compatibility", "Pick versions", "Write lockfile"] },
            { id: "install", label: "Install", color: "#22c55e", items: ["Download gems", "Isolate per project", "bundle exec"] },
          ]),
          callout(
            "tip",
            "Always commit `Gemfile.lock` to version control so every developer and CI server uses identical gem versions.",
          ),
          quiz(
            "What command installs gems according to your Gemfile?",
            ["gem build", "bundle install", "ruby setup.rb", "rake release"],
            1,
            "bundle install reads the Gemfile (and lockfile) and installs the resolved set of gems.",
          ),
        ],
        challenge: {
          title: "Project Gem List",
          description:
            "Simulate a Gemfile as a hash: `GEMFILE = { \"json\" => \"~> 2.6\", \"rake\" => \"~> 13.0\" }`. Write `list_gems` that prints each key on its own line prefixed with `gem: `. Call `list_gems`.",
          starterCode: `GEMFILE = { "json" => "~> 2.6", "rake" => "~> 13.0" }

def list_gems
  # print each gem name
end

list_gems`,
          solutionCode: `GEMFILE = { "json" => "~> 2.6", "rake" => "~> 13.0" }

def list_gems
  GEMFILE.each_key do |name|
    puts "gem: #{name}"
  end
end

list_gems`,
          tests: [
            { id: 1, label: "Defines list_gems", keywords: [{ pattern: "def\\s+list_gems" }] },
            { id: 2, label: "Iterates GEMFILE", keywords: [{ pattern: "GEMFILE\\.each" }] },
            { id: 3, label: "Prints gem: prefix", keywords: [{ pattern: "gem:\\s*#" }] },
          ],
        },
      },
      {
        id: "rbgem-4",
        title: "Gemfile Concepts",
        xp: 14,
        theory: [
          text(
            "A **Gemfile** declares dependencies using `gem \"name\", \"version_constraint\"`. Optional parameters include `group:` (`:development`, `:test`, `:production`) and `require:` (set `false` to load manually).",
            {
              label: "Groups and platforms",
              content: `# Simulated grouped Gemfile entries
GROUPS = {
  development_test: [{ name: "rubocop", require: false }],
  default: [{ name: "pg", platform: :ruby }],
}

GROUPS[:development_test].each do |entry|
  puts "group gem: #{entry[:name]} (require: #{entry[:require]})"
end`,
            },
          ),
          text(
            "The `source` line tells Bundler where to download gems — almost always `https://rubygems.org`. Private gems may use a custom gem server URL or path.",
          ),
          callout(
            "info",
            "Simulating a Gemfile as a Ruby `Hash` with nested group keys is a great way to practice resolver logic without Bundler installed.",
          ),
          quiz(
            "Which Gemfile option prevents automatic require on boot?",
            ["platform:", "require: false", "group: :default", "source:"],
            1,
            "require: false means Bundler won't auto-require the gem; you call require yourself when needed.",
          ),
        ],
        challenge: {
          title: "Group Filter",
          description:
            "Given `GEMS = [{ name: \"rake\", group: :default }, { name: \"minitest\", group: :test }]`, write `gems_for(group)` returning an array of names in that group. `puts gems_for(:test).inspect`.",
          starterCode: `GEMS = [
  { name: "rake", group: :default },
  { name: "minitest", group: :test }
]

def gems_for(group)
  # return array of gem names in group
end

puts gems_for(:test).inspect`,
          solutionCode: `GEMS = [
  { name: "rake", group: :default },
  { name: "minitest", group: :test }
]

def gems_for(group)
  GEMS.select { |g| g[:group] == group }.map { |g| g[:name] }
end

puts gems_for(:test).inspect`,
          tests: [
            { id: 1, label: "Defines gems_for", keywords: [{ pattern: "def\\s+gems_for" }] },
            { id: 2, label: "Filters by group", keywords: [{ pattern: "group\\s*==\\s*group" }] },
            { id: 3, label: "Prints result", keywords: [{ pattern: "puts\\s+gems_for\\(:test\\)" }] },
          ],
        },
      },
      {
        id: "rbgem-5",
        title: "Lockfile Reproducibility",
        xp: 16,
        theory: [
          text(
            "`Gemfile.lock` records the **exact** resolved versions of every gem (including transitive dependencies). Re-running `bundle install` on another machine installs precisely those versions — critical for reproducible builds.",
            {
              label: "Lockfile as a hash",
              content: `LOCKFILE = {
  "json" => "2.7.2",
  "rake" => "13.2.1"
}

def locked_version(name)
  LOCKFILE[name]
end

puts locked_version("json")`,
            },
          ),
          diagram("Gemfile vs Lockfile", [
            { id: "gemfile", label: "Gemfile", color: "#7c3aed", items: ["Loose constraints", "~> 2.6", "Human-edited"] },
            { id: "lock", label: "Gemfile.lock", color: ACCENT, items: ["Exact versions", "2.7.2", "Bundler-generated"] },
          ]),
          callout(
            "warning",
            "Never hand-edit `Gemfile.lock`. Change the Gemfile and run `bundle update gem_name` or `bundle install` to regenerate it.",
          ),
          quiz(
            "Why commit Gemfile.lock to Git?",
            ["It replaces the gemspec", "It pins exact versions for reproducible installs", "It stores API keys", "Bundler requires it to boot"],
            1,
            "The lockfile ensures every environment installs identical gem versions.",
          ),
        ],
        challenge: {
          title: "Lock Check",
          description:
            "Given `REQUESTED = { \"json\" => \"~> 2.6\" }` and `LOCKFILE = { \"json\" => \"2.7.2\" }`, write `resolved(name)` returning the locked version string. Print `json 2.7.2` using `puts \"#{name} #{resolved(name)}\"` with name `\"json\"`.",
          starterCode: `REQUESTED = { "json" => "~> 2.6" }
LOCKFILE = { "json" => "2.7.2" }

def resolved(name)
  # return exact version from lockfile
end

name = "json"
puts "#{name} #{resolved(name)}"`,
          solutionCode: `REQUESTED = { "json" => "~> 2.6" }
LOCKFILE = { "json" => "2.7.2" }

def resolved(name)
  LOCKFILE[name]
end

name = "json"
puts "#{name} #{resolved(name)}"`,
          tests: [
            { id: 1, label: "Defines resolved", keywords: [{ pattern: "def\\s+resolved" }] },
            { id: 2, label: "Reads LOCKFILE", keywords: [{ pattern: "LOCKFILE\\[" }] },
            { id: 3, label: "Prints json 2.7.2", keywords: [{ pattern: "puts.*json.*2\\.7\\.2", flags: "s" }] },
          ],
        },
      },
    ],
  },
  {
    id: "building",
    title: "Building a Gem",
    stage: "intermediate",
    icon: "🔨",
    color: "#6d28d9",
    lessons: [
      {
        id: "rbgem-6",
        title: "Gem Folder Structure",
        xp: 14,
        theory: [
          text(
            "A standard gem repository follows a predictable layout. Bundler's `bundle gem my_gem` scaffolds this for you:",
            {
              label: "Typical layout",
              content: `# my_gem/
# ├── lib/
# │   └── my_gem.rb          # entry point
# │   └── my_gem/
# │       └── version.rb     # VERSION constant
# ├── spec/                  # tests
# ├── my_gem.gemspec
# ├── Gemfile
# └── README.md`,
            },
          ),
          diagram("Gem Directory Tree", [
            { id: "lib", label: "lib/", color: ACCENT, items: ["Entry .rb file", "Namespaced code", "Added to $LOAD_PATH"] },
            { id: "spec", label: "spec/", color: "#22c55e", items: ["Minitest/RSpec", "CI runs here", "Not packaged"] },
            { id: "meta", label: "Root files", color: "#f97316", items: ["gemspec", "Gemfile", "README"] },
          ]),
          callout(
            "tip",
            "Keep executable scripts in `bin/` and list them in the gemspec's `executables` field if you want them on the PATH after install.",
          ),
          quiz(
            "Which folder's contents are added to $LOAD_PATH when the gem is installed?",
            ["spec/", "bin/", "lib/", "test/"],
            2,
            "Only lib/ is on the load path; spec/ and bin/ serve other purposes.",
          ),
        ],
        challenge: {
          title: "Layout Validator",
          description:
            "Given `FILES = [\"lib/poly_stats.rb\", \"lib/poly_stats/version.rb\", \"spec/poly_stats_spec.rb\"]`, write `has_entry?` returning true if any path equals `\"lib/poly_stats.rb\"`. `puts has_entry?`.",
          starterCode: `FILES = [
  "lib/poly_stats.rb",
  "lib/poly_stats/version.rb",
  "spec/poly_stats_spec.rb"
]

def has_entry?
  # true if lib/poly_stats.rb is in FILES
end

puts has_entry?`,
          solutionCode: `FILES = [
  "lib/poly_stats.rb",
  "lib/poly_stats/version.rb",
  "spec/poly_stats_spec.rb"
]

def has_entry?
  FILES.include?("lib/poly_stats.rb")
end

puts has_entry?`,
          tests: [
            { id: 1, label: "Defines has_entry?", keywords: [{ pattern: "def\\s+has_entry\\?" }] },
            { id: 2, label: "Checks FILES", keywords: [{ pattern: "FILES\\.include\\?" }] },
            { id: 3, label: "Prints result", keywords: [{ pattern: "puts\\s+has_entry\\?" }] },
          ],
        },
      },
      {
        id: "rbgem-7",
        title: "Module Namespace",
        xp: 16,
        theory: [
          text(
            "Gems use a **namespace module** matching the gem name to avoid collisions. `json` defines `JSON`, `active_support` defines `ActiveSupport`. Nested code lives inside that module:",
            {
              label: "Namespaced gem code",
              content: `module PolyStats
  module Calculator
    def self.mean(values)
      values.sum.to_f / values.length
    end
  end
end

puts PolyStats::Calculator.mean([2, 4, 6])`,
            },
          ),
          text(
            "Use `::` to reference nested constants (`PolyStats::VERSION`). The entry file `lib/poly_stats.rb` typically requires subfiles and may expose a convenience API.",
          ),
          callout(
            "info",
            "Snake_case gem names map to CamelCase modules: `poly_stats` → `PolyStats`.",
          ),
          quiz(
            "Why wrap gem code in a module matching the gem name?",
            ["Faster execution", "Avoid constant name collisions", "Required by Ruby syntax", "Enables multiple inheritance"],
            1,
            "Namespacing prevents your MyApp::User from clashing with a gem's User class.",
          ),
        ],
        challenge: {
          title: "Nested Namespace",
          description:
            "Define `module PolyStats` containing `module Formatter` with `self.csv_row(arr)` joining elements with commas. `puts PolyStats::Formatter.csv_row([\"a\", \"b\", \"c\"])`.",
          starterCode: `module PolyStats
  # define Formatter with csv_row
end

puts PolyStats::Formatter.csv_row(["a", "b", "c"])`,
          solutionCode: `module PolyStats
  module Formatter
    def self.csv_row(arr)
      arr.join(",")
    end
  end
end

puts PolyStats::Formatter.csv_row(["a", "b", "c"])`,
          tests: [
            { id: 1, label: "Defines PolyStats", keywords: [{ pattern: "module\\s+PolyStats" }] },
            { id: 2, label: "Defines Formatter", keywords: [{ pattern: "module\\s+Formatter" }] },
            { id: 3, label: "Uses join", keywords: [{ pattern: "\\.join" }] },
          ],
        },
      },
      {
        id: "rbgem-8",
        title: "VERSION & Entry Point",
        xp: 18,
        theory: [
          text(
            "Every gem defines a **VERSION** constant, usually in `lib/gem_name/version.rb`. The gemspec reads this constant so you maintain version in one place:",
            {
              label: "Version file pattern",
              content: `module PolyStats
  VERSION = "0.1.0"
end

puts PolyStats::VERSION`,
            },
          ),
          text(
            "The **entry point** (`lib/poly_stats.rb`) loads version and other files, then defines the public API consumers call after `require \"poly_stats\"`.",
          ),
          diagram("Boot Sequence", [
            { id: "require", label: "require \"poly_stats\"", color: ACCENT, items: ["Loads entry file", "Sets up namespace"] },
            { id: "version", label: "version.rb", color: "#a855f7", items: ["VERSION constant", "Single source of truth"] },
            { id: "api", label: "Public API", color: "#22c55e", items: ["Module methods", "Classes", "Ready to use"] },
          ]),
          callout(
            "tip",
            "Follow semver: bump PATCH for bug fixes, MINOR for backward-compatible features, MAJOR for breaking changes.",
          ),
          quiz(
            "Where should the VERSION constant typically live?",
            ["bin/poly_stats", "lib/gem_name/version.rb", "Gemfile", "Rakefile"],
            1,
            "A dedicated version.rb keeps the gemspec DRY and is the community convention.",
          ),
        ],
        challenge: {
          title: "Version Banner",
          description:
            "Define `module PolyStats` with `VERSION = \"1.0.0\"` and `def self.banner; \"PolyStats v#{VERSION}\"; end`. `puts PolyStats.banner`.",
          starterCode: `module PolyStats
  # VERSION and banner
end

puts PolyStats.banner`,
          solutionCode: `module PolyStats
  VERSION = "1.0.0"

  def self.banner
    "PolyStats v#{VERSION}"
  end
end

puts PolyStats.banner`,
          tests: [
            { id: 1, label: "VERSION constant", keywords: [{ pattern: "VERSION\\s*=\\s*\"1\\.0\\.0\"" }] },
            { id: 2, label: "Defines banner", keywords: [{ pattern: "def\\s+self\\.banner" }] },
            { id: 3, label: "Prints banner", keywords: [{ pattern: "puts\\s+PolyStats\\.banner" }] },
          ],
        },
      },
    ],
  },
  {
    id: "gemspec",
    title: "Gemspec Mastery",
    stage: "intermediate",
    icon: "📋",
    color: "#5b21b6",
    lessons: [
      {
        id: "rbgem-9",
        title: "Gemspec Fields",
        xp: 14,
        theory: [
          text(
            "The **gemspec** (`.gemspec` file) is the gem's manifest. Key fields include `name`, `version`, `summary`, `authors`, `email`, `files`, `homepage`, and dependency declarations:",
            {
              label: "Minimal gemspec (Ruby DSL)",
              content: `Gem::Specification.new do |s|
  s.name        = "poly_stats"
  s.version     = "0.1.0"
  s.summary     = "Lightweight stats helpers"
  s.authors     = ["PolyCode Team"]
  s.files       = Dir["lib/**/*.rb"]
  s.homepage    = "https://github.com/example/poly_stats"
end`,
            },
          ),
          text(
            "Simulate a gemspec as a hash in pure Ruby — the same metadata concepts apply without the `Gem::Specification` class.",
          ),
          callout(
            "info",
            "`s.files` should list every file packaged into the `.gem` archive. Use `git ls-files` or `Dir.glob` to populate it.",
          ),
          quiz(
            "Which gemspec field lists the Ruby source files included in the gem package?",
            ["executables", "files", "platform", "require_paths"],
            1,
            "The files array determines what gets bundled into the .gem file.",
          ),
        ],
        challenge: {
          title: "Gemspec Hash",
          description:
            "Create `SPEC = { name: \"poly_stats\", version: \"0.2.0\", summary: \"Stats helpers\" }`. Write `describe_gem` printing `name vversion - summary` on one line. Call it.",
          starterCode: `SPEC = { name: "poly_stats", version: "0.2.0", summary: "Stats helpers" }

def describe_gem
  # one-line description
end

describe_gem`,
          solutionCode: `SPEC = { name: "poly_stats", version: "0.2.0", summary: "Stats helpers" }

def describe_gem
  puts "#{SPEC[:name]} v#{SPEC[:version]} - #{SPEC[:summary]}"
end

describe_gem`,
          tests: [
            { id: 1, label: "Defines describe_gem", keywords: [{ pattern: "def\\s+describe_gem" }] },
            { id: 2, label: "Uses SPEC hash", keywords: [{ pattern: "SPEC\\[:name\\]" }] },
            { id: 3, label: "Prints summary line", keywords: [{ pattern: "puts.*poly_stats", flags: "s" }] },
          ],
        },
      },
      {
        id: "rbgem-10",
        title: "Semver Parsing",
        xp: 16,
        theory: [
          text(
            "**Semantic versioning** uses `MAJOR.MINOR.PATCH`. Comparing versions as strings fails (`\"10.0.0\" < \"9.0.0\"` is true lexically!). Parse into integer tuples instead:",
            {
              label: "Parse semver",
              content: `def parse_version(v)
  parts = v.split(".").map(&:to_i)
  { major: parts[0], minor: parts[1], patch: parts[2] }
end

info = parse_version("2.7.15")
puts info[:minor]  # 7`,
            },
          ),
          text(
            "Ruby's `Gem::Version` class handles this in real projects. Here you build the logic yourself to understand how constraint matching works.",
          ),
          callout(
            "tip",
            "Pre-release versions like `1.0.0.beta1` append labels after a hyphen. Stable releases sort higher than pre-releases with the same numeric core.",
          ),
          quiz(
            "Why shouldn't you compare version strings with `<` directly?",
            ["Ruby forbids it", "Lexicographic order differs from numeric order", "Versions are symbols", "Strings are frozen"],
            1,
            "\"10.0.0\" < \"9.0.0\" as strings because \"1\" < \"9\" — always parse numerically.",
          ),
        ],
        challenge: {
          title: "Version Compare",
          description:
            "Write `parse_version(v)` returning `[major, minor, patch]` as integers. Write `newer?(a, b)` returning true if version `a` is greater than `b`. `puts newer?(\"2.1.0\", \"2.0.9\")`.",
          starterCode: `def parse_version(v)
  # return [major, minor, patch] integers
end

def newer?(a, b)
  # true if a > b
end

puts newer?("2.1.0", "2.0.9")`,
          solutionCode: `def parse_version(v)
  v.split(".").map(&:to_i)
end

def version_gt?(left, right)
  la = parse_version(left)
  ra = parse_version(right)
  len = [la.length, ra.length].max
  len.times do |i|
    x = la[i] || 0
    y = ra[i] || 0
    return true if x > y
    return false if x < y
  end
  false
end

def newer?(a, b)
  version_gt?(a, b)
end

puts newer?("2.1.0", "2.0.9")`,
          tests: [
            { id: 1, label: "Defines parse_version", keywords: [{ pattern: "def\\s+parse_version" }] },
            { id: 2, label: "Defines newer?", keywords: [{ pattern: "def\\s+newer\\?" }] },
            { id: 3, label: "Prints true", keywords: [{ pattern: "puts\\s+newer\\?" }] },
          ],
        },
      },
      {
        id: "rbgem-11",
        title: "Runtime vs Dev Deps",
        xp: 18,
        theory: [
          text(
            "Gemspec dependencies split into **runtime** (`add_runtime_dependency`) and **development** (`add_development_dependency`). Runtime deps ship to users who install your gem; dev deps are only for building and testing.",
            {
              label: "Dependency types",
              content: `# In a real gemspec:
# s.add_runtime_dependency "json", "~> 2.0"
# s.add_development_dependency "minitest", "~> 5.0"

RUNTIME_DEPS = { "json" => "~> 2.0" }
DEV_DEPS = { "minitest" => "~> 5.0" }`,
            },
          ),
          diagram("Dependency Audience", [
            { id: "runtime", label: "Runtime", color: ACCENT, items: ["End users need them", "Listed in Gemfile.lock", "Shipped conceptually"] },
            { id: "dev", label: "Development", color: "#22c55e", items: ["Authors & CI only", "Tests, linting", "Not required at runtime"] },
          ]),
          callout(
            "warning",
            "Putting test frameworks in runtime dependencies bloats every consumer's install. Keep Minitest/RSpec in development.",
          ),
          quiz(
            "Who needs runtime dependencies installed?",
            ["Only the gem author", "Anyone who uses the gem in their app", "Only CI servers", "RubyGems.org staff"],
            1,
            "Runtime dependencies must be present when a consumer requires your gem in production code.",
          ),
        ],
        challenge: {
          title: "Dep Classifier",
          description:
            "Given `RUNTIME = [\"json\", \"rake\"]` and `DEV = [\"minitest\", \"rubocop\"]`, write `dep_type(name)` returning `:runtime`, `:development`, or `:unknown`. Print `dep_type(\"minitest\")`.",
          starterCode: `RUNTIME = ["json", "rake"]
DEV = ["minitest", "rubocop"]

def dep_type(name)
  # :runtime, :development, or :unknown
end

puts dep_type("minitest")`,
          solutionCode: `RUNTIME = ["json", "rake"]
DEV = ["minitest", "rubocop"]

def dep_type(name)
  return :runtime if RUNTIME.include?(name)
  return :development if DEV.include?(name)
  :unknown
end

puts dep_type("minitest")`,
          tests: [
            { id: 1, label: "Defines dep_type", keywords: [{ pattern: "def\\s+dep_type" }] },
            { id: 2, label: "Checks DEV", keywords: [{ pattern: "DEV\\.include\\?" }] },
            { id: 3, label: "Prints development", keywords: [{ pattern: ":development" }] },
          ],
        },
      },
    ],
  },
  {
    id: "dependencies",
    title: "Dependencies",
    stage: "intermediate",
    icon: "🔗",
    color: "#4c1d95",
    lessons: [
      {
        id: "rbgem-12",
        title: "Version Constraints",
        xp: 16,
        theory: [
          text(
            "Bundler version constraints control which releases are acceptable. Common operators:",
            {
              label: "Constraint examples",
              content: `# ">= 2.0"     — 2.0 or higher
# "~> 2.6"     — >= 2.6 and < 3.0 (pessimistic)
# "~> 2.6.1"   — >= 2.6.1 and < 2.7.0

def pessimistic_ceiling(version)
  major, minor = version.split(".").map(&:to_i)
  "#{major + 1}.0"
end

puts pessimistic_ceiling("2.6")`,
            },
          ),
          text(
            "The **pessimistic operator** `~>` allows patch-level changes if two digits are specified, or minor-level if three digits are given. It protects against breaking major (or minor) bumps.",
          ),
          callout(
            "tip",
            "`~> 2.6` is Ruby community shorthand for \"I trust 2.x but not 3.0 yet.\"",
          ),
          quiz(
            "What does '~> 2.6' allow?",
            [">= 2.6 and < 3.0", "Exactly 2.6.0", ">= 2.0 and < 2.7", "Only 2.6.x patch releases"],
            0,
            "With two segments, ~> permits changes to the final digit only within the next major boundary (< 3.0).",
          ),
        ],
        challenge: {
          title: "Pessimistic Check",
          description:
            "Write `satisfies_pessimistic?(version, base)` where constraint is `~> base` with two parts (e.g. base `\"2.6\"` allows `>= 2.6` and `< 3.0`). `puts satisfies_pessimistic?(\"2.7.1\", \"2.6\")`.",
          starterCode: `def satisfies_pessimistic?(version, base)
  # true if version >= base and < next major of base
end

puts satisfies_pessimistic?("2.7.1", "2.6")`,
          solutionCode: `def parse_version(v)
  v.split(".").map(&:to_i)
end

def version_gte?(left, right)
  la = parse_version(left)
  ra = parse_version(right)
  len = [la.length, ra.length].max
  len.times do |i|
    x = la[i] || 0
    y = ra[i] || 0
    return true if x > y
    return false if x < y
  end
  true
end

def satisfies_pessimistic?(version, base)
  v = parse_version(version)
  b = parse_version(base)
  return false unless version_gte?(version, base)
  v[0] < b[0] + 1
end

puts satisfies_pessimistic?("2.7.1", "2.6")`,
          tests: [
            { id: 1, label: "Defines satisfies_pessimistic?", keywords: [{ pattern: "def\\s+satisfies_pessimistic\\?" }] },
            { id: 2, label: "Compares versions", keywords: [{ pattern: "parse_version|split.*map" }] },
            { id: 3, label: "Prints true", keywords: [{ pattern: "puts\\s+satisfies_pessimistic\\?" }] },
          ],
        },
      },
      {
        id: "rbgem-13",
        title: "Resolver Simulation",
        xp: 18,
        theory: [
          text(
            "Bundler's **resolver** picks versions satisfying all constraints across the dependency graph. Simulate with a catalog hash mapping gem names to available versions:",
            {
              label: "Simple resolver",
              content: `CATALOG = {
  "json" => ["2.6.0", "2.7.2", "3.0.0"],
  "rake" => ["13.0.0", "13.2.1"]
}

def latest_matching(name, constraint_base)
  versions = CATALOG[name] || []
  prefix = constraint_base.split(".").first(2).join(".")
  versions.reverse.find { |v| v.start_with?(prefix) }
end

puts latest_matching("json", "2.6")`,
            },
          ),
          diagram("Resolution Steps", [
            { id: "read", label: "Read Gemfile", color: ACCENT, items: ["Direct deps", "Constraints"] },
            { id: "graph", label: "Build graph", color: "#a855f7", items: ["Transitive deps", "Conflict check"] },
            { id: "lock", label: "Write lock", color: "#22c55e", items: ["Exact versions", "Reproducible"] },
          ]),
          callout(
            "info",
            "Real resolution is NP-complete in the general case. Bundler uses a sophisticated solver; your simulation focuses on the core idea: pick compatible versions.",
          ),
          quiz(
            "What does the resolver output to?",
            ["gemspec only", "Gemfile.lock with exact versions", "README.md", "Rakefile"],
            1,
            "Resolution produces pinned versions stored in the lockfile.",
          ),
        ],
        challenge: {
          title: "Pick Latest",
          description:
            "Given `CATALOG = { \"json\" => [\"2.6.0\", \"2.7.2\"] }`, write `resolve(name)` returning the last (highest listed) version. `puts resolve(\"json\")`.",
          starterCode: `CATALOG = { "json" => ["2.6.0", "2.7.2"] }

def resolve(name)
  # return highest available version
end

puts resolve("json")`,
          solutionCode: `CATALOG = { "json" => ["2.6.0", "2.7.2"] }

def resolve(name)
  versions = CATALOG[name] || []
  versions.last
end

puts resolve("json")`,
          tests: [
            { id: 1, label: "Defines resolve", keywords: [{ pattern: "def\\s+resolve" }] },
            { id: 2, label: "Reads CATALOG", keywords: [{ pattern: "CATALOG\\[" }] },
            { id: 3, label: "Prints 2.7.2", keywords: [{ pattern: "2\\.7\\.2" }] },
          ],
        },
      },
      {
        id: "rbgem-14",
        title: "Optional Dependencies",
        xp: 20,
        theory: [
          text(
            "Some gems declare **optional** dependencies — features enabled only if another gem is present (e.g. `pg` for PostgreSQL adapter). In Ruby you detect this with a begin/rescue around require:",
            {
              label: "Optional require pattern",
              content: `HAS_JSON = begin
  # simulate checking if gem is available
  true
rescue LoadError
  false
end

puts HAS_JSON ? "json available" : "json missing"`,
            },
          ),
          text(
            "In gemspecs, optional deps may be documented but not hard-required. Consumers add them to their own Gemfile when they need the feature.",
          ),
          callout(
            "tip",
            "Design gem APIs to degrade gracefully: core features work without optional deps; extended features raise a clear error message when missing.",
          ),
          quiz(
            "How do gems typically detect an optional dependency at runtime?",
            ["Parse Gemfile.lock", "begin/rescue LoadError around require", "Check ENV only", "Call gem install"],
            1,
            "Attempting require and rescuing LoadError is the idiomatic optional-dependency pattern.",
          ),
        ],
        challenge: {
          title: "Feature Flag",
          description:
            "Given `INSTALLED = [\"json\", \"rake\"]`, write `available?(gem_name)` returning boolean. Write `feature_status(feature, required_gem)` printing `\"#{feature}: enabled\"` or `\"#{feature}: disabled\"`. Call with `feature_status(\"export\", \"json\")`.",
          starterCode: `INSTALLED = ["json", "rake"]

def available?(gem_name)
end

def feature_status(feature, required_gem)
end

feature_status("export", "json")`,
          solutionCode: `INSTALLED = ["json", "rake"]

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
          tests: [
            { id: 1, label: "Defines available?", keywords: [{ pattern: "def\\s+available\\?" }] },
            { id: 2, label: "Defines feature_status", keywords: [{ pattern: "def\\s+feature_status" }] },
            { id: 3, label: "Prints enabled", keywords: [{ pattern: "enabled" }] },
          ],
        },
      },
    ],
  },
  {
    id: "testing",
    title: "Testing Gems",
    stage: "pro",
    icon: "🧪",
    color: "#3b0764",
    lessons: [
      {
        id: "rbgem-15",
        title: "Minitest in Pure Ruby",
        xp: 18,
        theory: [
          text(
            "Most gems use **Minitest** or **RSpec**. Without those libraries in the browser, simulate a tiny test runner in pure Ruby:",
            {
              label: "Mini test runner",
              content: `def assert_equal(expected, actual)
  raise "Expected #{expected}, got #{actual}" unless expected == actual
  "PASS"
end

result = assert_equal(4, 2 + 2)
puts result`,
            },
          ),
          text(
            "Real Minitest tests subclass `Minitest::Test` or use `describe` blocks in spec style. CI runs `bundle exec rake test` or `rspec` before publishing.",
          ),
          diagram("Test Pipeline", [
            { id: "write", label: "Write spec/", color: ACCENT, items: ["Unit tests", "Edge cases", "API contracts"] },
            { id: "run", label: "CI / Local", color: "#f97316", items: ["bundle exec", "Green build", "Coverage optional"] },
            { id: "ship", label: "Publish", color: "#22c55e", items: ["Only when green", "Tag matches VERSION", "CHANGELOG updated"] },
          ]),
          callout(
            "info",
            "Test files live in `spec/` or `test/` and are **not** included in the packaged gem's `files` list.",
          ),
          quiz(
            "When should you publish a new gem version?",
            ["Before writing tests", "After tests pass in CI", "Only on Fridays", "Before updating VERSION"],
            1,
            "Never publish broken releases — run the full test suite first.",
          ),
        ],
        challenge: {
          title: "Mini Assert",
          description:
            "Write `assert_true(condition)` that raises `\"FAIL\"` unless condition is true, otherwise returns `\"PASS\"`. `puts assert_true(3 > 1)`.",
          starterCode: `def assert_true(condition)
  # raise FAIL or return PASS
end

puts assert_true(3 > 1)`,
          solutionCode: `def assert_true(condition)
  raise "FAIL" unless condition
  "PASS"
end

puts assert_true(3 > 1)`,
          tests: [
            { id: 1, label: "Defines assert_true", keywords: [{ pattern: "def\\s+assert_true" }] },
            { id: 2, label: "Raises on failure", keywords: [{ pattern: "raise.*FAIL" }] },
            { id: 3, label: "Prints PASS", keywords: [{ pattern: "puts\\s+assert_true" }] },
          ],
        },
      },
      {
        id: "rbgem-16",
        title: "API Design for Gems",
        xp: 20,
        theory: [
          text(
            "Great gems expose a **small, stable public API**. Hide internals in nested modules or prefix with underscore. Document every public method:",
            {
              label: "Clean public API",
              content: `module PolyStats
  def self.mean(values)
    raise ArgumentError, "empty" if values.empty?
    values.sum.to_f / values.length
  end
end

puts PolyStats.mean([10, 20, 30])`,
            },
          ),
          text(
            "Prefer module-level functions for stateless utilities, classes for stateful objects, and configuration blocks for gems that need setup (`PolyStats.configure { |c| c.precision = 2 }`).",
          ),
          callout(
            "tip",
            "Breaking changes require a major version bump. Add new methods freely in minor releases; deprecate before removing.",
          ),
          quiz(
            "What should happen if mean([]) is called on an empty array?",
            ["Return 0 silently", "Raise a clear error", "Return nil always", "Loop forever"],
            1,
            "Fail fast with ArgumentError — consumers debug faster with explicit errors.",
          ),
        ],
        challenge: {
          title: "Safe Mean",
          description:
            "In `module PolyStats`, define `self.mean(values)` raising `\"empty array\"` with `raise` if `values.empty?`, else return the float mean. `puts PolyStats.mean([4, 8])`.",
          starterCode: `module PolyStats
  def self.mean(values)
    # guard empty, then compute mean
  end
end

puts PolyStats.mean([4, 8])`,
          solutionCode: `module PolyStats
  def self.mean(values)
    raise "empty array" if values.empty?
    values.sum.to_f / values.length
  end
end

puts PolyStats.mean([4, 8])`,
          tests: [
            { id: 1, label: "Defines mean", keywords: [{ pattern: "def\\s+self\\.mean" }] },
            { id: 2, label: "Guards empty", keywords: [{ pattern: "values\\.empty\\?" }] },
            { id: 3, label: "Prints 6.0", keywords: [{ pattern: "puts\\s+PolyStats\\.mean" }] },
          ],
        },
      },
      {
        id: "rbgem-17",
        title: "YARD & RDoc Comments",
        xp: 18,
        theory: [
          text(
            "Rubyists document APIs with **RDoc** or **YARD** comments above methods. They generate HTML docs and help users discover parameters and return values:",
            {
              label: "YARD-style comment",
              content: `# Calculate the arithmetic mean.
#
# @param values [Array<Numeric>] list of numbers
# @return [Float] the mean
# @raise [ArgumentError] if values is empty
def mean(values)
  # ...
end`,
            },
          ),
          text(
            "Even in simulated gems, write clear comments — your future self (and open-source contributors) will thank you.",
          ),
          callout(
            "info",
            "Run `yard doc` or `rdoc` locally to preview documentation before publishing to RubyDoc.info or your gem's homepage.",
          ),
          quiz(
            "What does @param document in a YARD comment?",
            ["The gem version", "A method parameter", "The license type", "The load path"],
            1,
            "@param describes an argument: its name, type, and purpose.",
          ),
        ],
        challenge: {
          title: "Doc Metadata",
          description:
            "Store `DOCS = { method: \"mean\", params: \"values\", returns: \"Float\" }`. Write `doc_line` printing `method(params) -> returns`. `puts doc_line`.",
          starterCode: `DOCS = { method: "mean", params: "values", returns: "Float" }

def doc_line
  # format: mean(values) -> Float
end

puts doc_line`,
          solutionCode: `DOCS = { method: "mean", params: "values", returns: "Float" }

def doc_line
  "#{DOCS[:method]}(#{DOCS[:params]}) -> #{DOCS[:returns]}"
end

puts doc_line`,
          tests: [
            { id: 1, label: "Defines doc_line", keywords: [{ pattern: "def\\s+doc_line" }] },
            { id: 2, label: "Uses DOCS hash", keywords: [{ pattern: "DOCS\\[:method\\]" }] },
            { id: 3, label: "Prints signature", keywords: [{ pattern: "mean\\(values\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "publishing",
    title: "Publishing",
    stage: "pro",
    icon: "🚀",
    color: "#2e1065",
    lessons: [
      {
        id: "rbgem-18",
        title: "Build Workflow",
        xp: 20,
        theory: [
          text(
            "Publishing a gem follows a build pipeline: bump VERSION, update CHANGELOG, run tests, build the `.gem` archive, push to RubyGems.org:",
            {
              label: "Typical Rake tasks",
              content: `# gem build poly_stats.gemspec  → poly_stats-0.1.0.gem
# gem push poly_stats-0.1.0.gem   → uploads to RubyGems.org

VERSION = "0.3.0"
ARTIFACT = "poly_stats-#{VERSION}.gem"
puts "Built: #{ARTIFACT}"`,
            },
          ),
          diagram("Release Pipeline", [
            { id: "prep", label: "Prepare", color: ACCENT, items: ["Bump VERSION", "CHANGELOG entry", "Green CI"] },
            { id: "build", label: "Build", color: "#a855f7", items: ["gem build", ".gem tarball", "Verify contents"] },
            { id: "push", label: "Push", color: "#22c55e", items: ["gem push", "2FA required", "Live on RubyGems"] },
          ]),
          callout(
            "warning",
            "You cannot overwrite an existing version on RubyGems.org. If you publish a bad release, yank it and publish a new patch version.",
          ),
          quiz(
            "What file does `gem build` produce?",
            ["Gemfile.lock", "A .gem archive", "package.json", "Docker image"],
            1,
            "gem build packages your lib/ files and metadata into a .gem file.",
          ),
        ],
        challenge: {
          title: "Artifact Name",
          description:
            "Given `NAME = \"poly_stats\"` and `VERSION = \"0.3.0\"`, write `artifact_name` returning `\"name-version.gem\"`. `puts artifact_name`.",
          starterCode: `NAME = "poly_stats"
VERSION = "0.3.0"

def artifact_name
end

puts artifact_name`,
          solutionCode: `NAME = "poly_stats"
VERSION = "0.3.0"

def artifact_name
  "#{NAME}-#{VERSION}.gem"
end

puts artifact_name`,
          tests: [
            { id: 1, label: "Defines artifact_name", keywords: [{ pattern: "def\\s+artifact_name" }] },
            { id: 2, label: "Uses NAME and VERSION", keywords: [{ pattern: "NAME.*VERSION", flags: "s" }] },
            { id: 3, label: "Prints .gem name", keywords: [{ pattern: "poly_stats-0\\.3\\.0\\.gem" }] },
          ],
        },
      },
      {
        id: "rbgem-19",
        title: "Publish Checklist",
        xp: 22,
        theory: [
          text(
            "Before your first `gem push`, verify this checklist. Simulate it as an array of steps you validate in code:",
            {
              label: "Pre-publish checklist",
              content: `CHECKLIST = [
  "VERSION bumped",
  "Tests passing",
  "CHANGELOG updated",
  "README has install instructions",
  "MIT license in gemspec"
]

CHECKLIST.each { |step| puts "[ ] #{step}" }`,
            },
          ),
          text(
            "Register at rubygems.org, configure API keys (`~/.gem/credentials`), and enable **2FA** — required for gem pushes since 2022.",
          ),
          callout(
            "tip",
            "Tag the Git release matching VERSION (`v0.3.0`) so users can browse source for each published version.",
          ),
          quiz(
            "What authentication is required to push gems to RubyGems.org?",
            ["SSH key only", "API key with 2FA", "No authentication", "Docker login"],
            1,
            "RubyGems requires an API key and two-factor authentication for pushes.",
          ),
        ],
        challenge: {
          title: "Checklist Counter",
          description:
            "Given `DONE = [true, true, false, true, true]`, write `completion_rate` returning the percentage of `true` values as an integer (e.g. 80 for 4/5). `puts completion_rate`.",
          starterCode: `DONE = [true, true, false, true, true]

def completion_rate
  # integer percent of true values
end

puts completion_rate`,
          solutionCode: `DONE = [true, true, false, true, true]

def completion_rate
  total = DONE.length
  done = DONE.count(true)
  (done * 100) / total
end

puts completion_rate`,
          tests: [
            { id: 1, label: "Defines completion_rate", keywords: [{ pattern: "def\\s+completion_rate" }] },
            { id: 2, label: "Counts true values", keywords: [{ pattern: "count\\(true\\)|select.*true" }] },
            { id: 3, label: "Prints 80", keywords: [{ pattern: "puts\\s+completion_rate" }] },
          ],
        },
      },
      {
        id: "rbgem-20",
        title: "Security & Trust",
        xp: 20,
        theory: [
          text(
            "Gem security matters: typosquatting (`rubocop` vs `rubocpp`), compromised maintainer accounts, and malicious post-install hooks. Mitigations include:",
            {
              label: "Trust practices",
              content: `# Pin versions in Gemfile.lock
# Review gemspec metadata on RubyGems.org
# Prefer well-maintained gems with many downloads
# Audit with: bundle audit (simulated)

TRUSTED = ["json", "rake", "minitest"]
puts TRUSTED.include?("json")`,
            },
          ),
          diagram("Supply Chain Safety", [
            { id: "source", label: "Verify Source", color: ACCENT, items: ["Official RubyGems", "GitHub repo matches", "Read gemspec"] },
            { id: "pin", label: "Pin Versions", color: "#a855f7", items: ["Lockfile committed", "CI bundle audit", "Review updates"] },
            { id: "least", label: "Least Privilege", color: "#22c55e", items: ["Minimal deps", "No secrets in gem", "2FA on publish"] },
          ]),
          callout(
            "warning",
            "Never embed API keys or passwords in a published gem. Use environment variables in the consuming application.",
          ),
          quiz(
            "What is typosquatting in the gem ecosystem?",
            ["A testing technique", "Publishing a similarly named malicious gem", "A semver strategy", "A Bundler command"],
            1,
            "Attackers publish gems with names near popular ones hoping users mistype and install malware.",
          ),
        ],
        challenge: {
          title: "Trust Check",
          description:
            "Given `TRUSTED = [\"json\", \"rake\", \"minitest\"]` and `REQUESTED = \"json\"`, write `trusted?(name)` and `puts trusted?(REQUESTED) ? \"safe\" : \"review\"`.",
          starterCode: `TRUSTED = ["json", "rake", "minitest"]
REQUESTED = "json"

def trusted?(name)
end

puts trusted?(REQUESTED) ? "safe" : "review"`,
          solutionCode: `TRUSTED = ["json", "rake", "minitest"]
REQUESTED = "json"

def trusted?(name)
  TRUSTED.include?(name)
end

puts trusted?(REQUESTED) ? "safe" : "review"`,
          tests: [
            { id: 1, label: "Defines trusted?", keywords: [{ pattern: "def\\s+trusted\\?" }] },
            { id: 2, label: "Checks TRUSTED", keywords: [{ pattern: "TRUSTED\\.include\\?" }] },
            { id: 3, label: "Prints safe", keywords: [{ pattern: "\"safe\"" }] },
          ],
        },
      },
    ],
  },
  {
    id: "pro-capstone",
    title: "Pro & Capstone",
    stage: "advanced",
    icon: "🏆",
    color: "#1e1b4b",
    lessons: [
      {
        id: "rbgem-21",
        title: "Popular Gem Patterns",
        xp: 22,
        theory: [
          text(
            "Production gems share common patterns. A **configuration module** lets users set options once at boot:",
            {
              label: "Configure block pattern",
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
          ),
          text(
            "**JSON helper gems** wrap `JSON.generate`/`parse` with defaults. **Railtie** gems hook into Rails. Learn these patterns by reading popular gem source on GitHub.",
          ),
          diagram("Config Module Pattern", [
            { id: "defaults", label: "Defaults", color: ACCENT, items: ["Sensible out of box", "Class ivars", "Accessor methods"] },
            { id: "configure", label: "configure block", color: "#a855f7", items: ["yield self", "DSL at boot", "Thread-safe note"] },
            { id: "use", label: "Runtime", color: "#22c55e", items: ["Read settings", "Format output", "Consistent API"] },
          ]),
          callout(
            "tip",
            "Study `faraday`, `dry-configurable`, and `dotenv` for excellent configuration ergonomics.",
          ),
          quiz(
            "What does `yield self` inside configure enable?",
            ["Async I/O", "A DSL block for setting options", "Garbage collection", "Gem compilation"],
            1,
            "The block receives the module, letting users call setter methods in a clean DSL.",
          ),
        ],
        challenge: {
          title: "Config Module",
          description:
            "In `module PolyStats`, use `@prefix = \"stat\"`, `def self.prefix; @prefix; end`, and `def self.prefix=(val); @prefix = val; end`. Set prefix to `\"metric\"` and `puts PolyStats.prefix`.",
          starterCode: `module PolyStats
  # prefix getter/setter with @prefix default "stat"
end

PolyStats.prefix = "metric"
puts PolyStats.prefix`,
          solutionCode: `module PolyStats
  @prefix = "stat"

  def self.prefix
    @prefix
  end

  def self.prefix=(val)
    @prefix = val
  end
end

PolyStats.prefix = "metric"
puts PolyStats.prefix`,
          tests: [
            { id: 1, label: "Defines prefix getter", keywords: [{ pattern: "def\\s+self\\.prefix" }] },
            { id: 2, label: "Defines prefix setter", keywords: [{ pattern: "def\\s+self\\.prefix=" }] },
            { id: 3, label: "Prints metric", keywords: [{ pattern: "puts\\s+PolyStats\\.prefix" }] },
          ],
        },
      },
      {
        id: "rbgem-22",
        title: "Private Gems",
        xp: 23,
        theory: [
          text(
            "Not every gem belongs on RubyGems.org. **Private gems** live on internal servers (Gemstash, Artifactory, GitHub Packages) or are vendored via `path:` in the Gemfile:",
            {
              label: "Path-based private gem",
              content: `# Gemfile (conceptual)
# gem "poly_stats", path: "../poly_stats"

PRIVATE_SOURCES = {
  "poly_stats" => :path,
  "json" => :rubygems
}

puts PRIVATE_SOURCES["poly_stats"]`,
            },
          ),
          text(
            "Private gems follow the same structure and gemspec rules. CI authenticates to your gem server with tokens. Monorepos often use `path:` for local development and publish internally on release.",
          ),
          callout(
            "info",
            "Simulate private registries with a hash mapping gem names to `:path`, `:git`, or `:rubygems` source types.",
          ),
          quiz(
            "How do you use a local gem without publishing it?",
            ["gem push --local", "gem \"name\", path: \"../gem\"", "Delete the gemspec", "Use require only"],
            1,
            "Bundler's path: option loads a gem from a local directory — ideal for monorepos.",
          ),
        ],
        challenge: {
          title: "Source Router",
          description:
            "Given `SOURCES = { \"poly_stats\" => :path, \"json\" => :rubygems }`, write `source_for(name)` returning the symbol or `:unknown`. `puts source_for(\"poly_stats\")`.",
          starterCode: `SOURCES = { "poly_stats" => :path, "json" => :rubygems }

def source_for(name)
end

puts source_for("poly_stats")`,
          solutionCode: `SOURCES = { "poly_stats" => :path, "json" => :rubygems }

def source_for(name)
  SOURCES.fetch(name, :unknown)
end

puts source_for("poly_stats")`,
          tests: [
            { id: 1, label: "Defines source_for", keywords: [{ pattern: "def\\s+source_for" }] },
            { id: 2, label: "Reads SOURCES", keywords: [{ pattern: "SOURCES" }] },
            { id: 3, label: "Prints path", keywords: [{ pattern: ":path" }] },
          ],
        },
      },
      {
        id: "rbgem-23",
        title: "Course Recap",
        xp: 25,
        theory: [
          text(
            "Congratulations! You've completed **Ruby Gems**. You explored the RubyGems ecosystem, Bundler workflows, gemspec design, dependency resolution, testing, publishing, and real-world patterns — all simulated in pure Ruby.",
          ),
          diagram("Your Gems Journey", [
            { id: "eco", label: "Ecosystem", color: ACCENT, items: ["require & LOAD_PATH", "RubyGems.org", "Bundler lockfiles"] },
            { id: "build", label: "Build & Ship", color: "#a855f7", items: ["lib/ structure", "gemspec metadata", "gem push checklist"] },
            { id: "pro", label: "Pro Patterns", color: "#22c55e", items: ["Config modules", "Private gems", "PolyStats API"] },
          ]),
          text(
            "**Capstone — PolyStats:** Combine everything in the challenge below: a miniature stats gem with VERSION, mean, and a formatted banner. This mirrors what you'd ship as `poly_stats` on RubyGems.",
          ),
          callout(
            "tip",
            "Next steps: run `bundle gem your_gem` locally, publish a tiny utility gem, or contribute docs to an open-source gem you use daily.",
          ),
          quiz(
            "What file ensures reproducible gem versions across machines?",
            ["README.md", "Gemfile.lock", "Rakefile", ".gitignore"],
            1,
            "Gemfile.lock pins exact resolved versions for every dependency.",
          ),
        ],
        challenge: {
          title: "PolyStats Capstone",
          description:
            "Build `module PolyStats` with `VERSION = \"1.0.0\"`, `self.mean(values)` (float mean, raise `\"empty\"` if empty), and `self.release_info` returning `\"PolyStats #{VERSION} ready\"`. Print `PolyStats.release_info` then `puts PolyStats.mean([10, 20, 30])`.",
          starterCode: `module PolyStats
  # VERSION, mean, release_info
end

puts PolyStats.release_info
puts PolyStats.mean([10, 20, 30])`,
          solutionCode: `module PolyStats
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
          tests: [
            { id: 1, label: "VERSION constant", keywords: [{ pattern: "VERSION\\s*=\\s*\"1\\.0\\.0\"" }] },
            { id: 2, label: "Defines mean", keywords: [{ pattern: "def\\s+self\\.mean" }] },
            { id: 3, label: "Defines release_info", keywords: [{ pattern: "def\\s+self\\.release_info" }] },
            { id: 4, label: "Prints release info", keywords: [{ pattern: "puts\\s+PolyStats\\.release_info" }] },
            { id: 5, label: "Prints mean result", keywords: [{ pattern: "puts\\s+PolyStats\\.mean" }] },
          ],
        },
      },
    ],
  },
]);

export const RUBY_GEMS_LESSONS = RUBY_GEMS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const RUBY_GEMS_TOTAL_XP = RUBY_GEMS_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);
