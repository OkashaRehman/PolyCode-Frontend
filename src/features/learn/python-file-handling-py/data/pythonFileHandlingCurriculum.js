import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { PYTHON_FILE_HANDLING_VIDEO_LINKS } from "./pythonFileHandlingVideoLinks";
import { applyChapterEnhancements } from "./pythonFileHandlingLessonEnhancements";

const RAW_PYTHON_FILE_HANDLING_CHAPTERS = [
  {
    id: "foundations",
    title: "Foundations",
    icon: "🧱",
    color: "#2563eb",
    lessons: [
      {
        id: "fh-0",
        title: "Why Files Matter in Real Programs",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "Files make data durable. Variables disappear when your script exits, but files let logs, reports, configs, and exports survive restarts.",
          },
          {
            type: "text",
            content:
              "Production systems use files for pipelines, backups, audit trails, cache snapshots, and interoperability between tools.",
          },
          {
            type: "diagram",
            title: "Memory vs file persistence",
            nodes: [
              {
                id: "runtime",
                label: "Runtime memory",
                color: "#1d4ed8",
                items: ["Fast access", "Lost on process exit", "Great for temporary state"],
              },
              {
                id: "file",
                label: "File system",
                color: "#2563eb",
                items: ["Persistent storage", "Shareable between tools", "Supports audit history"],
              },
              {
                id: "workflow",
                label: "Typical workflow",
                color: "#60a5fa",
                items: ["Read input file", "Transform data", "Write output file"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Write and read a small report",
            content: `from io import StringIO

report = StringIO()
report.write("daily_sales=420\\n")
report.seek(0)
print(report.read())`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Students should understand that file handling is an integration skill: it connects Python logic with real data flows.",
          },
          {
            type: "quiz",
            question: "Why are files essential in production workflows?",
            options: [
              "They make code compile faster",
              "They persist and exchange data across runs",
              "They replace all data structures",
              "They remove the need for testing",
            ],
            answer: 1,
            explanation:
              "Files preserve data after program exit and allow communication with other systems and processes.",
          },
        ],
        challenge: {
          title: "Persist a mini report in memory file",
          description:
            "Use `StringIO` to write `status=ok` and `count=3` on separate lines, rewind the stream, and print all content.",
          starterCode: `from io import StringIO

# Write your solution here
`,
          solutionCode: `from io import StringIO

buffer = StringIO()
buffer.write("status=ok\\n")
buffer.write("count=3\\n")
buffer.seek(0)
print(buffer.read())`,
          tests: [
            {
              id: 1,
              label: "Imports StringIO",
              keywords: [{ pattern: "from\\s+io\\s+import\\s+StringIO" }],
            },
            {
              id: 2,
              label: "Writes content",
              keywords: [{ pattern: "\\.write\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints final content",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fh-0b",
        title: "Text vs Binary Files",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "Text files store characters using encodings like UTF-8, while binary files store raw bytes such as images, PDFs, and model checkpoints.",
          },
          {
            type: "text",
            content:
              "Use text mode for logs, CSV, JSON, and configs. Use binary mode (`rb`, `wb`) for media, archives, and serialized artifacts.",
          },
          {
            type: "diagram",
            title: "File mode decision map",
            nodes: [
              {
                id: "text",
                label: "Text mode",
                color: "#1d4ed8",
                items: ["human readable", "encoding-aware", "modes: r, w, a"],
              },
              {
                id: "binary",
                label: "Binary mode",
                color: "#2563eb",
                items: ["raw bytes", "no text decoding", "modes: rb, wb, ab"],
              },
              {
                id: "risk",
                label: "Common risk",
                color: "#60a5fa",
                items: ["Wrong mode corrupts data", "Wrong encoding breaks text", "Always choose explicitly"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Text and binary with in-memory streams",
            content: `from io import StringIO, BytesIO

text_stream = StringIO("hello")
byte_stream = BytesIO(b"\\x48\\x49")
print(text_stream.read())
print(byte_stream.read())`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "If you read binary bytes as text without decoding rules, you can get Unicode errors or silent data corruption.",
          },
          {
            type: "quiz",
            question: "Which mode should you use for raw image bytes?",
            options: ["r", "w", "rb", "a"],
            answer: 2,
            explanation:
              "Binary assets should be read in binary mode (`rb`) so bytes are preserved exactly.",
          },
        ],
        challenge: {
          title: "Work with text and bytes streams",
          description:
            "Use `StringIO` for text `alpha` and `BytesIO` for bytes `b'xyz'`. Read both and print each result.",
          starterCode: `from io import StringIO, BytesIO

# Create both streams and print outputs
`,
          solutionCode: `from io import StringIO, BytesIO

text_stream = StringIO("alpha")
byte_stream = BytesIO(b"xyz")
print(text_stream.read())
print(byte_stream.read())`,
          tests: [
            {
              id: 1,
              label: "Uses StringIO",
              keywords: ["StringIO"],
            },
            {
              id: 2,
              label: "Uses BytesIO",
              keywords: ["BytesIO"],
            },
            {
              id: 3,
              label: "Prints both outputs",
              keywords: [{ pattern: "print\\s*\\(" }, { pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "reading-writing",
    title: "Reading & Writing",
    icon: "✍️",
    color: "#0d9488",
    lessons: [
      {
        id: "fh-1",
        title: "open() Basics and File Modes",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "`open(path, mode, encoding)` creates a file handle. Core text modes are `r`, `w`, and `a`; add `b` for binary operations.",
          },
          {
            type: "text",
            content:
              "`w` overwrites existing content, `a` appends safely at end, and `r` expects the file to already exist.",
          },
          {
            type: "diagram",
            title: "How open() mode changes behavior",
            nodes: [
              {
                id: "read",
                label: "r (read)",
                color: "#0f766e",
                items: ["must exist", "no writing", "cursor starts at beginning"],
              },
              {
                id: "write",
                label: "w (write)",
                color: "#0d9488",
                items: ["creates if missing", "truncates if exists", "best for fresh output"],
              },
              {
                id: "append",
                label: "a (append)",
                color: "#14b8a6",
                items: ["creates if missing", "keeps old content", "writes at end"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Simulate write/read flow with StringIO",
            content: `from io import StringIO

f = StringIO()
f.write("line-1\\n")
f.write("line-2\\n")
f.seek(0)
print(f.read())`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Always choose mode intentionally. Many production bugs happen because `w` was used where `a` or `r+` was expected.",
          },
          {
            type: "quiz",
            question: "Which mode preserves existing content and adds new data at the end?",
            options: ["r", "w", "a", "rb"],
            answer: 2,
            explanation: "Append mode (`a`) keeps prior content and writes new content at file end.",
          },
        ],
        challenge: {
          title: "Write two lines and read back",
          description:
            "Use `StringIO` to write `first` and `second` lines, rewind, and print full text.",
          starterCode: `from io import StringIO

# Implement write then read
`,
          solutionCode: `from io import StringIO

stream = StringIO()
stream.write("first\\n")
stream.write("second\\n")
stream.seek(0)
print(stream.read())`,
          tests: [
            {
              id: 1,
              label: "Uses StringIO",
              keywords: ["StringIO"],
            },
            {
              id: 2,
              label: "Uses write calls",
              keywords: [{ pattern: "\\.write\\s*\\(" }],
            },
            {
              id: 3,
              label: "Reads and prints content",
              keywords: [{ pattern: "\\.read\\s*\\(" }, { pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fh-1b",
        title: "Context Managers with with open",
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              "A `with` block ensures file handles close automatically, even if exceptions happen. This prevents descriptor leaks in long-running apps.",
          },
          {
            type: "text",
            content:
              "The pattern `with open(...) as f:` is a reliability baseline for professional Python codebases.",
          },
          {
            type: "diagram",
            title: "Lifecycle of with-open block",
            nodes: [
              {
                id: "enter",
                label: "Enter context",
                color: "#0f766e",
                items: ["open file", "bind to variable", "ready for I/O"],
              },
              {
                id: "body",
                label: "Do work",
                color: "#0d9488",
                items: ["read/write operations", "may raise exception", "logic stays focused"],
              },
              {
                id: "exit",
                label: "Exit context",
                color: "#14b8a6",
                items: ["auto close file", "cleanup guaranteed", "fewer resource bugs"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Canonical with-open pattern",
            content: `# Real file example
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("safe and explicit\\n")`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Code reviews often reject manual open/close blocks unless there is a strong reason. Prefer context managers by default.",
          },
          {
            type: "quiz",
            question: "What is the main benefit of `with open(...)`?",
            options: [
              "It makes files faster",
              "It auto-closes resources reliably",
              "It avoids file paths",
              "It converts binary to text",
            ],
            answer: 1,
            explanation:
              "`with` provides deterministic cleanup and prevents unclosed-file resource issues.",
          },
        ],
        challenge: {
          title: "Use the canonical with-open pattern",
          description:
            "Write code that uses `with open('output.txt', 'w', encoding='utf-8') as f:` and writes one line, then prints `done`.",
          starterCode: `# Use with-open in this challenge

`,
          solutionCode: `with open("output.txt", "w", encoding="utf-8") as f:
    f.write("hello from with-open\\n")

print("done")`,
          tests: [
            {
              id: 1,
              label: "Uses with open",
              keywords: [{ pattern: "with\\s+open\\s*\\(" }],
            },
            {
              id: 2,
              label: "Writes data in context",
              keywords: [{ pattern: "\\.write\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints done",
              keywords: [{ pattern: "print\\s*\\(\\s*[\"']done[\"']" }],
            },
          ],
        },
      },
      {
        id: "fh-2",
        title: "read(), write(), append(), and Line Iteration",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Use `read()` for whole content, `readline()` for one line, and iteration (`for line in f`) for scalable line-by-line processing.",
          },
          {
            type: "text",
            content:
              "Appending is useful for logs and event streams because it preserves historical entries.",
          },
          {
            type: "diagram",
            title: "Read strategy by data size",
            nodes: [
              {
                id: "small",
                label: "Small files",
                color: "#0f766e",
                items: ["f.read()", "simple scripts", "quick prototypes"],
              },
              {
                id: "medium",
                label: "Line-by-line",
                color: "#0d9488",
                items: ["for line in f", "memory friendly", "stream processing"],
              },
              {
                id: "appendlog",
                label: "Append workflows",
                color: "#14b8a6",
                items: ["add new records", "avoid truncation", "great for logs"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Iterate lines from StringIO",
            content: `from io import StringIO

source = StringIO("A\\nB\\nC\\n")
for line in source:
    print(line.strip())`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "For ETL and ingestion jobs, line iteration is usually safer than loading full files into memory.",
          },
          {
            type: "quiz",
            question: "Which pattern is best for memory-friendly text processing?",
            options: ["f.read() always", "for line in f", "f.write()", "json.dumps()"],
            answer: 1,
            explanation:
              "Iterating line by line avoids loading complete file contents at once.",
          },
        ],
        challenge: {
          title: "Process lines and append output",
          description:
            "Read lines from a `StringIO` source, uppercase each line, append to another `StringIO`, then print final result.",
          starterCode: `from io import StringIO

source = StringIO("red\\nblue\\n")
target = StringIO()

# Transform and print
`,
          solutionCode: `from io import StringIO

source = StringIO("red\\nblue\\n")
target = StringIO()

for line in source:
    target.write(line.strip().upper() + "\\n")

target.seek(0)
print(target.read())`,
          tests: [
            {
              id: 1,
              label: "Uses line iteration",
              keywords: [{ pattern: "for\\s+\\w+\\s+in\\s+source" }],
            },
            {
              id: 2,
              label: "Writes transformed output",
              keywords: [{ pattern: "target\\.write\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints final stream",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "paths-modes",
    title: "Paths & Modes",
    icon: "🛣️",
    color: "#7c3aed",
    lessons: [
      {
        id: "fh-3",
        title: "Pathlib Essentials",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "`pathlib.Path` provides an object-oriented way to handle paths that is cleaner and safer than manual string concatenation.",
          },
          {
            type: "text",
            content:
              "Use `/` operator for joins, `.name` for filename, `.suffix` for extension, and `.parent` for directory traversal.",
          },
          {
            type: "diagram",
            title: "Path object anatomy",
            nodes: [
              {
                id: "base",
                label: "Base path",
                color: "#6d28d9",
                items: ["Path('data')", "portable path object", "OS-safe behavior"],
              },
              {
                id: "join",
                label: "Join paths",
                color: "#7c3aed",
                items: ["base / 'reports' / 'daily.csv'", "no manual slashes", "clear intent"],
              },
              {
                id: "inspect",
                label: "Inspect metadata",
                color: "#8b5cf6",
                items: [".name", ".suffix", ".parent"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Build and inspect a path",
            content: `from pathlib import Path

p = Path("data") / "exports" / "result.json"
print(p)
print(p.name)
print(p.suffix)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Pathlib makes code more readable and reduces cross-platform path bugs in Windows/Linux mixed teams.",
          },
          {
            type: "quiz",
            question: "Which operator joins `Path` segments?",
            options: ["+", "/", ".", ":"],
            answer: 1,
            explanation:
              "Pathlib overloads `/` to create readable and cross-platform path joins.",
          },
        ],
        challenge: {
          title: "Construct and inspect a report path",
          description:
            "Create `Path('logs') / '2026' / 'app.log'` and print the full path plus the file name.",
          starterCode: `from pathlib import Path

# Build the path and print details
`,
          solutionCode: `from pathlib import Path

log_path = Path("logs") / "2026" / "app.log"
print(log_path)
print(log_path.name)`,
          tests: [
            {
              id: 1,
              label: "Imports Path",
              keywords: [{ pattern: "from\\s+pathlib\\s+import\\s+Path" }],
            },
            {
              id: 2,
              label: "Uses pathlib join operator",
              keywords: [{ pattern: "Path\\s*\\(" }, { pattern: "\\/\\s*[\"']" }],
            },
            {
              id: 3,
              label: "Prints output",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fh-3b",
        title: "Modes, Encoding, and Newline Handling",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Set `encoding='utf-8'` explicitly for predictable behavior. Newline handling matters when exchanging files across platforms.",
          },
          {
            type: "text",
            content:
              "Universal newline mode normalizes line endings on read; on write, explicit `\\n` keeps code clear and consistent.",
          },
          {
            type: "diagram",
            title: "Encoding and newline pitfalls",
            nodes: [
              {
                id: "encoding",
                label: "Encoding mismatch",
                color: "#6d28d9",
                items: ["garbled characters", "decode errors", "fix with explicit utf-8"],
              },
              {
                id: "newline",
                label: "Newline differences",
                color: "#7c3aed",
                items: ["Windows CRLF", "Unix LF", "normalize in processing"],
              },
              {
                id: "safe",
                label: "Safe defaults",
                color: "#8b5cf6",
                items: ["with open(..., encoding='utf-8')", "strip line endings", "write deterministic output"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Normalize lines from mixed endings",
            content: `from io import StringIO

raw = "one\\r\\ntwo\\nthree\\r\\n"
stream = StringIO(raw.replace("\\r\\n", "\\n"))
for line in stream:
    print(line.strip())`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "In multilingual or cross-OS teams, implicit defaults can produce hard-to-reproduce text bugs. Be explicit.",
          },
          {
            type: "quiz",
            question: "What is the safest explicit text encoding for most projects?",
            options: ["latin-1 always", "utf-16 always", "utf-8", "ascii only"],
            answer: 2,
            explanation:
              "UTF-8 is the common default for modern apps and supports international text reliably.",
          },
        ],
        challenge: {
          title: "Normalize line endings",
          description:
            "Given a raw string containing `\\r\\n`, convert to `\\n`, iterate each line, and print stripped lines.",
          starterCode: `from io import StringIO

raw = "a\\r\\nb\\n"

# Normalize and print
`,
          solutionCode: `from io import StringIO

raw = "a\\r\\nb\\n"
normalized = raw.replace("\\r\\n", "\\n")
stream = StringIO(normalized)
for line in stream:
    print(line.strip())`,
          tests: [
            {
              id: 1,
              label: "Replaces CRLF",
              keywords: [{ pattern: "replace\\s*\\(\\s*[\"']\\\\r\\\\n[\"']" }],
            },
            {
              id: 2,
              label: "Iterates lines",
              keywords: [{ pattern: "for\\s+\\w+\\s+in\\s+stream" }],
            },
            {
              id: 3,
              label: "Prints normalized lines",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fh-4",
        title: "Creating Directories with Path.mkdir",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "Batch jobs often need output folders. `Path.mkdir(parents=True, exist_ok=True)` creates nested directories safely and repeatedly.",
          },
          {
            type: "text",
            content:
              "This avoids racey pre-check patterns like `if not exists: mkdir` and improves idempotent automation scripts.",
          },
          {
            type: "diagram",
            title: "Safe directory creation strategy",
            nodes: [
              {
                id: "target",
                label: "Target path",
                color: "#6d28d9",
                items: ["reports/2026/july", "may not exist", "nested structure"],
              },
              {
                id: "mkdir",
                label: "mkdir with flags",
                color: "#7c3aed",
                items: ["parents=True", "exist_ok=True", "idempotent run behavior"],
              },
              {
                id: "benefit",
                label: "Outcome",
                color: "#8b5cf6",
                items: ["fewer failures", "safe reruns", "CI-friendly scripts"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Create nested directories",
            content: `from pathlib import Path

out_dir = Path("reports") / "2026" / "july"
out_dir.mkdir(parents=True, exist_ok=True)
print(out_dir)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Idempotency is key for automation. Your setup code should be safe if run multiple times.",
          },
          {
            type: "quiz",
            question: "Which `mkdir` flag prevents errors when directory already exists?",
            options: ["parents", "recursive", "exist_ok", "safe_mode"],
            answer: 2,
            explanation:
              "`exist_ok=True` avoids raising an error when the target folder already exists.",
          },
        ],
        challenge: {
          title: "Create nested output directory",
          description:
            "Use `Path` to build `output/reports/daily` and call `mkdir` with flags for safe repeated runs, then print the path.",
          starterCode: `from pathlib import Path

# Build and create the directory
`,
          solutionCode: `from pathlib import Path

target = Path("output") / "reports" / "daily"
target.mkdir(parents=True, exist_ok=True)
print(target)`,
          tests: [
            {
              id: 1,
              label: "Uses Path",
              keywords: ["Path"],
            },
            {
              id: 2,
              label: "Calls mkdir with safety flags",
              keywords: [
                { pattern: "\\.mkdir\\s*\\(" },
                { pattern: "parents\\s*=\\s*True" },
                { pattern: "exist_ok\\s*=\\s*True" },
              ],
            },
            {
              id: 3,
              label: "Prints target directory",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "csv-data",
    title: "CSV Data",
    icon: "📊",
    color: "#059669",
    lessons: [
      {
        id: "fh-5",
        title: "CSV Reader and Writer Basics",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "CSV is a practical exchange format for analytics, BI tools, spreadsheets, and data ingestion scripts.",
          },
          {
            type: "text",
            content:
              "Python's `csv` module handles quoting, separators, and line parsing more safely than manual `split(',')` logic.",
          },
          {
            type: "diagram",
            title: "CSV processing flow",
            nodes: [
              {
                id: "rawcsv",
                label: "CSV text",
                color: "#047857",
                items: ["header row", "data rows", "comma-delimited fields"],
              },
              {
                id: "reader",
                label: "csv.reader",
                color: "#059669",
                items: ["iterable rows", "list per row", "handles quoting"],
              },
              {
                id: "writer",
                label: "csv.writer",
                color: "#10b981",
                items: ["writes rows safely", "proper escaping", "reliable exports"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Read and write CSV using StringIO",
            content: `import csv
from io import StringIO

source = StringIO("name,score\\nAva,92\\nNoah,88\\n")
reader = csv.reader(source)
for row in reader:
    print(row)

target = StringIO()
writer = csv.writer(target)
writer.writerow(["name", "score"])
writer.writerow(["Lina", 95])
print(target.getvalue())`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "CSV edge cases (commas inside text, quotes, empty fields) are common. Use the module, not string hacks.",
          },
          {
            type: "quiz",
            question: "Why should you prefer `csv.reader` over `line.split(',')`?",
            options: [
              "It is shorter only",
              "It correctly handles quoting and CSV edge cases",
              "It only works on binary files",
              "It converts CSV to JSON automatically",
            ],
            answer: 1,
            explanation:
              "The csv module correctly parses quoted commas and other CSV formatting rules.",
          },
        ],
        challenge: {
          title: "Parse CSV and print rows",
          description:
            "Use `csv.reader` with `StringIO` to parse `id,name` data and print each row list.",
          starterCode: `import csv
from io import StringIO

data = "id,name\\n1,Ava\\n2,Noah\\n"

# Parse and print rows
`,
          solutionCode: `import csv
from io import StringIO

data = "id,name\\n1,Ava\\n2,Noah\\n"
stream = StringIO(data)
reader = csv.reader(stream)
for row in reader:
    print(row)`,
          tests: [
            {
              id: 1,
              label: "Imports csv module",
              keywords: [{ pattern: "import\\s+csv" }],
            },
            {
              id: 2,
              label: "Uses csv.reader",
              keywords: [{ pattern: "csv\\.reader\\s*\\(" }],
            },
            {
              id: 3,
              label: "Iterates rows",
              keywords: [{ pattern: "for\\s+\\w+\\s+in\\s+reader" }],
            },
          ],
        },
      },
      {
        id: "fh-5b",
        title: "DictReader and DictWriter",
        xp: 17,
        theory: [
          {
            type: "text",
            content:
              "`csv.DictReader` maps each row to a dictionary keyed by column names, making transformations more expressive and less index-fragile.",
          },
          {
            type: "text",
            content:
              "`DictWriter` enforces column order via `fieldnames`, which helps produce consistent exports for downstream systems.",
          },
          {
            type: "diagram",
            title: "Positional rows vs keyed rows",
            nodes: [
              {
                id: "listrows",
                label: "csv.reader rows",
                color: "#047857",
                items: ["['Ava', '92']", "position-based access", "more brittle to schema changes"],
              },
              {
                id: "dictrows",
                label: "csv.DictReader rows",
                color: "#059669",
                items: ["{'name': 'Ava', 'score': '92'}", "key-based access", "clearer transformations"],
              },
              {
                id: "dictwriter",
                label: "csv.DictWriter",
                color: "#10b981",
                items: ["fieldnames contract", "writeheader()", "stable output schema"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "DictReader to DictWriter flow",
            content: `import csv
from io import StringIO

src = StringIO("name,score\\nAva,90\\nNoah,85\\n")
rows = list(csv.DictReader(src))

out = StringIO()
writer = csv.DictWriter(out, fieldnames=["name", "passed"])
writer.writeheader()
for row in rows:
    writer.writerow({"name": row["name"], "passed": int(row["score"]) >= 90})
print(out.getvalue())`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "For real ETL scripts, keyed dictionaries are easier to maintain when CSV schemas evolve over time.",
          },
          {
            type: "quiz",
            question: "What does `DictReader` return for each row?",
            options: ["tuple", "list", "set", "dict"],
            answer: 3,
            explanation:
              "Each row becomes a dictionary keyed by column headers.",
          },
        ],
        challenge: {
          title: "Transform with DictReader",
          description:
            "Use `DictReader` to read name/score CSV from `StringIO`, print `name:PASS` for each score >= 60 else `name:FAIL`.",
          starterCode: `import csv
from io import StringIO

raw = "name,score\\nAva,75\\nLiam,58\\n"

# Print name:PASS or name:FAIL
`,
          solutionCode: `import csv
from io import StringIO

raw = "name,score\\nAva,75\\nLiam,58\\n"
reader = csv.DictReader(StringIO(raw))
for row in reader:
    status = "PASS" if int(row["score"]) >= 60 else "FAIL"
    print(f"{row['name']}:{status}")`,
          tests: [
            {
              id: 1,
              label: "Uses DictReader",
              keywords: [{ pattern: "csv\\.DictReader\\s*\\(" }],
            },
            {
              id: 2,
              label: "Accesses row by key",
              keywords: [{ pattern: "row\\s*\\[\\s*[\"']score[\"']\\s*\\]" }],
            },
            {
              id: 3,
              label: "Prints formatted status",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fh-6",
        title: "CSV Cleaning and Type Conversion",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "CSV values are read as strings by default. Reliable pipelines convert and validate numeric/date fields explicitly.",
          },
          {
            type: "text",
            content:
              "Data cleaning usually includes trimming whitespace, handling blanks, and protecting numeric conversions with error handling.",
          },
          {
            type: "diagram",
            title: "CSV normalization pipeline",
            nodes: [
              {
                id: "ingest",
                label: "Ingest",
                color: "#047857",
                items: ["read text rows", "all values as strings", "possible missing cells"],
              },
              {
                id: "clean",
                label: "Clean",
                color: "#059669",
                items: ["strip whitespace", "default missing values", "validate ranges"],
              },
              {
                id: "convert",
                label: "Convert",
                color: "#10b981",
                items: ["int/float conversion", "derive new fields", "emit clean output"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Convert score column safely",
            content: `import csv
from io import StringIO

raw = "name,score\\nAva, 90\\nNoah,\\n"
for row in csv.DictReader(StringIO(raw)):
    score_text = row["score"].strip()
    score = int(score_text) if score_text else 0
    print(row["name"], score)`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Skipping conversion rules can silently break analytics because string sorting differs from numeric sorting.",
          },
          {
            type: "quiz",
            question: "What type does `csv.DictReader` produce for values by default?",
            options: ["int", "float", "str", "bool"],
            answer: 2,
            explanation:
              "CSV values are parsed as strings unless you explicitly convert them.",
          },
        ],
        challenge: {
          title: "Clean and sum CSV amounts",
          description:
            "Read `item,amount` CSV from `StringIO`, strip amount text, treat blank as 0, sum totals, and print the total.",
          starterCode: `import csv
from io import StringIO

raw = "item,amount\\nA, 5\\nB,\\nC,7\\n"

# Print total amount
`,
          solutionCode: `import csv
from io import StringIO

raw = "item,amount\\nA, 5\\nB,\\nC,7\\n"
total = 0
for row in csv.DictReader(StringIO(raw)):
    amount_text = row["amount"].strip()
    total += int(amount_text) if amount_text else 0
print(total)`,
          tests: [
            {
              id: 1,
              label: "Uses DictReader",
              keywords: ["DictReader"],
            },
            {
              id: 2,
              label: "Strips raw amount",
              keywords: [{ pattern: "\\.strip\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints computed total",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "json-config",
    title: "JSON & Config",
    icon: "🧾",
    color: "#ea580c",
    lessons: [
      {
        id: "fh-7",
        title: "JSON Loads and Dumps",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "JSON is the dominant structured text format for APIs, configs, and cross-service data exchange.",
          },
          {
            type: "text",
            content:
              "Use `json.loads` to parse JSON strings and `json.dumps` to serialize Python dict/list structures back to text.",
          },
          {
            type: "diagram",
            title: "JSON round-trip",
            nodes: [
              {
                id: "rawjson",
                label: "JSON text",
                color: "#c2410c",
                items: ["string payload", "network/file boundary", "schema-driven structure"],
              },
              {
                id: "pyobj",
                label: "Python objects",
                color: "#ea580c",
                items: ["dict/list/bool/int", "business logic processing", "validation/transforms"],
              },
              {
                id: "back",
                label: "Serialized JSON",
                color: "#fb923c",
                items: ["json.dumps()", "portable output", "human and machine readable"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "JSON string parse and serialize",
            content: `import json

raw = '{"service":"billing","enabled":true,"retries":3}'
cfg = json.loads(raw)
cfg["retries"] += 1
print(json.dumps(cfg))`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "JSON booleans are `true/false` in text, but become `True/False` in Python objects after parsing.",
          },
          {
            type: "quiz",
            question: "Which function parses a JSON string to Python data?",
            options: ["json.dumps", "json.loads", "json.load_path", "json.stringify"],
            answer: 1,
            explanation:
              "`json.loads` converts JSON text into Python objects.",
          },
        ],
        challenge: {
          title: "Parse and update JSON config",
          description:
            "Use `json.loads` on a config string, increment `version` by 1, and print `json.dumps` result.",
          starterCode: `import json

raw = '{"app":"polycode","version":2}'

# Update and print JSON
`,
          solutionCode: `import json

raw = '{"app":"polycode","version":2}'
cfg = json.loads(raw)
cfg["version"] += 1
print(json.dumps(cfg))`,
          tests: [
            {
              id: 1,
              label: "Uses json.loads",
              keywords: [{ pattern: "json\\.loads\\s*\\(" }],
            },
            {
              id: 2,
              label: "Mutates parsed dict",
              keywords: [{ pattern: "\\[\\s*[\"']version[\"']\\s*\\]\\s*\\+=" }],
            },
            {
              id: 3,
              label: "Uses json.dumps",
              keywords: [{ pattern: "json\\.dumps\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fh-7b",
        title: "Nested Config Structures",
        xp: 17,
        theory: [
          {
            type: "text",
            content:
              "Real configs are nested: environment blocks, database settings, feature flags, and service endpoints.",
          },
          {
            type: "text",
            content:
              "Access deeply nested keys carefully with defaults to avoid crashes when optional sections are missing.",
          },
          {
            type: "diagram",
            title: "Nested config layers",
            nodes: [
              {
                id: "rootcfg",
                label: "Root config",
                color: "#c2410c",
                items: ["app metadata", "global toggles", "environments map"],
              },
              {
                id: "envcfg",
                label: "Environment config",
                color: "#ea580c",
                items: ["dev/prod blocks", "host and port", "service credentials refs"],
              },
              {
                id: "featurecfg",
                label: "Feature flags",
                color: "#fb923c",
                items: ["enable rollout", "disable risky paths", "safe experimentation"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Read nested JSON safely",
            content: `import json

raw = '{"env":{"prod":{"host":"api.example.com","port":443}}}'
cfg = json.loads(raw)
prod = cfg.get("env", {}).get("prod", {})
print(prod.get("host", "missing"))`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Prefer explicit defaults for optional nested keys so config parsing fails gracefully and predictably.",
          },
          {
            type: "quiz",
            question: "What is a safe way to access nested config values?",
            options: [
              "Direct deep indexing only",
              "Use chained `.get(..., {})` with defaults",
              "Convert JSON to CSV first",
              "Use eval on raw JSON string",
            ],
            answer: 1,
            explanation:
              "Chained `.get()` calls help avoid `KeyError` when optional sections are absent.",
          },
        ],
        challenge: {
          title: "Read nested timeout value",
          description:
            "Parse JSON string, read `settings.network.timeout` safely with defaults, and print timeout.",
          starterCode: `import json

raw = '{"settings":{"network":{"timeout":30}}}'

# Parse and print timeout safely
`,
          solutionCode: `import json

raw = '{"settings":{"network":{"timeout":30}}}'
cfg = json.loads(raw)
timeout = cfg.get("settings", {}).get("network", {}).get("timeout", 10)
print(timeout)`,
          tests: [
            {
              id: 1,
              label: "Uses json.loads",
              keywords: ["json.loads"],
            },
            {
              id: 2,
              label: "Uses nested get defaults",
              keywords: [{ pattern: "\\.get\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints timeout",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fh-8",
        title: "Environment and Secrets Patterns",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "Keep secrets out of committed config files. Store only non-sensitive defaults in JSON and inject secrets from environment variables at runtime.",
          },
          {
            type: "text",
            content:
              "A common pattern: load JSON config -> overlay env vars (`API_KEY`, `DB_PASSWORD`) -> validate required values before startup.",
          },
          {
            type: "diagram",
            title: "Secure config layering",
            nodes: [
              {
                id: "basejson",
                label: "Base JSON config",
                color: "#c2410c",
                items: ["safe defaults", "non-secret values", "versioned in repository"],
              },
              {
                id: "envlayer",
                label: "Environment layer",
                color: "#ea580c",
                items: ["secrets at runtime", "deployment-specific values", "no git exposure"],
              },
              {
                id: "finalcfg",
                label: "Resolved config",
                color: "#fb923c",
                items: ["validated at boot", "used by application", "fails fast if missing"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Overlay env values on JSON config",
            content: `import json
import os

raw = '{"service":"payments","api_key":"<env>"}'
cfg = json.loads(raw)
cfg["api_key"] = os.getenv("API_KEY", "dev-placeholder")
print(json.dumps(cfg))`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Never hardcode real secrets in curriculum examples, repos, or logs. Use placeholders and env-driven injection.",
          },
          {
            type: "quiz",
            question: "Where should production API keys usually come from?",
            options: ["hardcoded source file", "public README", "environment variables", "CSV export"],
            answer: 2,
            explanation:
              "Environment variables keep secrets outside version control and support deployment-specific configuration.",
          },
        ],
        challenge: {
          title: "Merge env secret into JSON",
          description:
            "Parse JSON config string, set `api_key` from `os.getenv('API_KEY', 'fallback')`, and print JSON output.",
          starterCode: `import json
import os

raw = '{"service":"core","api_key":"<env>"}'

# Merge env value and print
`,
          solutionCode: `import json
import os

raw = '{"service":"core","api_key":"<env>"}'
cfg = json.loads(raw)
cfg["api_key"] = os.getenv("API_KEY", "fallback")
print(json.dumps(cfg))`,
          tests: [
            {
              id: 1,
              label: "Imports os and json",
              keywords: ["import os", "import json"],
            },
            {
              id: 2,
              label: "Uses getenv for key",
              keywords: [{ pattern: "os\\.getenv\\s*\\(\\s*[\"']API_KEY[\"']" }],
            },
            {
              id: 3,
              label: "Prints dumped JSON",
              keywords: [{ pattern: "json\\.dumps\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "errors-safety",
    title: "Errors & Safety",
    icon: "🛡️",
    color: "#dc2626",
    lessons: [
      {
        id: "fh-9",
        title: "Handling File Exceptions",
        xp: 17,
        theory: [
          {
            type: "text",
            content:
              "File operations can fail for missing paths, permission issues, invalid encodings, and malformed content. Robust code handles these cases explicitly.",
          },
          {
            type: "text",
            content:
              "Use narrow exceptions where possible (`FileNotFoundError`, `PermissionError`) and keep error messages actionable.",
          },
          {
            type: "diagram",
            title: "Exception-aware file workflow",
            nodes: [
              {
                id: "attempt",
                label: "Attempt operation",
                color: "#b91c1c",
                items: ["open file", "parse data", "process content"],
              },
              {
                id: "except",
                label: "Catch expected errors",
                color: "#dc2626",
                items: ["FileNotFoundError", "ValueError", "PermissionError"],
              },
              {
                id: "recover",
                label: "Recover/report",
                color: "#ef4444",
                items: ["fallback behavior", "clean message", "continue safely"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Specific exception handling",
            content: `from pathlib import Path

path = Path("missing.txt")
try:
    with open(path, "r", encoding="utf-8") as f:
        print(f.read())
except FileNotFoundError:
    print("Input file not found")`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Good error handling turns runtime failures into predictable, debuggable behavior instead of crashes.",
          },
          {
            type: "quiz",
            question: "Which practice is better for file error handling?",
            options: [
              "Catch every exception silently",
              "Use specific exception types with clear messages",
              "Never use try/except",
              "Use bare except and ignore",
            ],
            answer: 1,
            explanation:
              "Specific exception handling preserves signal and enables targeted recovery steps.",
          },
        ],
        challenge: {
          title: "Catch missing file errors",
          description:
            "Try reading `input.txt` with `with open`, catch `FileNotFoundError`, and print `missing file`.",
          starterCode: `# Add try/except around with-open

`,
          solutionCode: `try:
    with open("input.txt", "r", encoding="utf-8") as f:
        print(f.read())
except FileNotFoundError:
    print("missing file")`,
          tests: [
            {
              id: 1,
              label: "Uses with open",
              keywords: [{ pattern: "with\\s+open\\s*\\(" }],
            },
            {
              id: 2,
              label: "Catches FileNotFoundError",
              keywords: [{ pattern: "except\\s+FileNotFoundError" }],
            },
            {
              id: 3,
              label: "Prints fallback message",
              keywords: [{ pattern: "print\\s*\\(\\s*[\"']missing file[\"']" }],
            },
          ],
        },
      },
      {
        id: "fh-9b",
        title: "Existence Checks with Path",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "Use `Path.exists()`, `is_file()`, and `is_dir()` for preconditions before expensive operations, especially in batch processing.",
          },
          {
            type: "text",
            content:
              "Checks can improve user feedback, but still guard with try/except because filesystem state can change between check and use.",
          },
          {
            type: "diagram",
            title: "Precheck plus safe execution",
            nodes: [
              {
                id: "precheck",
                label: "Path precheck",
                color: "#b91c1c",
                items: ["exists()", "is_file()", "user-friendly branch"],
              },
              {
                id: "operate",
                label: "Attempt operation",
                color: "#dc2626",
                items: ["open/read/write", "actual filesystem action", "may still fail"],
              },
              {
                id: "fallback",
                label: "Fallback path",
                color: "#ef4444",
                items: ["log warning", "skip record", "continue pipeline"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Guard read with Path.exists",
            content: `from pathlib import Path

target = Path("config.json")
if target.exists() and target.is_file():
    print("ready to read")
else:
    print("config missing")`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Use existence checks for cleaner UX messages, then still handle exceptions for full correctness.",
          },
          {
            type: "quiz",
            question: "Which method checks if a path exists at all?",
            options: ["is_file()", "exists()", "mkdir()", "suffix"],
            answer: 1,
            explanation: "`exists()` returns True for existing files or directories.",
          },
        ],
        challenge: {
          title: "Validate a path before use",
          description:
            "Create `Path('dataset.csv')`. If it exists and is a file, print `ok`; otherwise print `not-ready`.",
          starterCode: `from pathlib import Path

# Check path and print status
`,
          solutionCode: `from pathlib import Path

p = Path("dataset.csv")
if p.exists() and p.is_file():
    print("ok")
else:
    print("not-ready")`,
          tests: [
            {
              id: 1,
              label: "Uses Path object",
              keywords: ["Path("],
            },
            {
              id: 2,
              label: "Checks exists and is_file",
              keywords: [{ pattern: "\\.exists\\s*\\(" }, { pattern: "\\.is_file\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints branch result",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fh-9c",
        title: "Atomic Write Pattern",
        xp: 19,
        theory: [
          {
            type: "text",
            content:
              "Atomic writes reduce corruption risk by writing to a temporary target first, then swapping to the final path only when complete.",
          },
          {
            type: "text",
            content:
              "In practice this prevents partially written files when crashes or interruptions occur during serialization.",
          },
          {
            type: "diagram",
            title: "Atomic write sequence",
            nodes: [
              {
                id: "tempwrite",
                label: "Write temp content",
                color: "#b91c1c",
                items: ["target.tmp", "full content first", "validate success"],
              },
              {
                id: "swap",
                label: "Replace target",
                color: "#dc2626",
                items: ["Path.replace()", "single final swap", "minimize partial writes"],
              },
              {
                id: "resultsafe",
                label: "Safe output state",
                color: "#ef4444",
                items: ["old file or new file", "not half-written", "more resilient updates"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Atomic update template",
            content: `from pathlib import Path

target = Path("state.json")
tmp = Path("state.json.tmp")

with open(tmp, "w", encoding="utf-8") as f:
    f.write('{"ok": true}')

tmp.replace(target)
print(target)`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Atomic writes are especially important for config, checkpoints, and any file read by other processes.",
          },
          {
            type: "quiz",
            question: "What is the key benefit of writing temp file then replacing target?",
            options: [
              "Smaller files",
              "Faster JSON parsing",
              "Reduced chance of partial/corrupt target files",
              "No need for encoding",
            ],
            answer: 2,
            explanation:
              "The final file is replaced only after successful full write to temp.",
          },
        ],
        challenge: {
          title: "Implement atomic write workflow",
          description:
            "Use `Path` for `report.txt` and `report.txt.tmp`, write content to temp via `with open`, then call `replace` to swap.",
          starterCode: `from pathlib import Path

# Atomic write pattern
`,
          solutionCode: `from pathlib import Path

target = Path("report.txt")
tmp = Path("report.txt.tmp")

with open(tmp, "w", encoding="utf-8") as f:
    f.write("final report\\n")

tmp.replace(target)
print(target)`,
          tests: [
            {
              id: 1,
              label: "Uses temp file variable",
              keywords: [{ pattern: "tmp\\s*=\\s*Path\\s*\\(" }],
            },
            {
              id: 2,
              label: "Writes using with-open",
              keywords: [{ pattern: "with\\s+open\\s*\\(" }],
            },
            {
              id: 3,
              label: "Calls replace for swap",
              keywords: [{ pattern: "\\.replace\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "advanced-io",
    title: "Advanced I/O",
    icon: "⚡",
    color: "#0891b2",
    lessons: [
      {
        id: "fh-10",
        title: "shutil for Copy and Move Workflows",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "`shutil` provides higher-level file operations such as copy, move, archive, and directory tree handling.",
          },
          {
            type: "text",
            content:
              "For operational scripts, `shutil.copy2` preserves metadata and is often preferred over manual read/write loops.",
          },
          {
            type: "diagram",
            title: "Operational file movement flow",
            nodes: [
              {
                id: "sourcefiles",
                label: "Source assets",
                color: "#0e7490",
                items: ["raw files", "staging area", "incoming batch"],
              },
              {
                id: "shutilops",
                label: "shutil operations",
                color: "#0891b2",
                items: ["copy2()", "move()", "copytree()"],
              },
              {
                id: "destfiles",
                label: "Destination layout",
                color: "#06b6d4",
                items: ["processed folder", "backup folder", "archive folder"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Copy and move with Path + shutil",
            content: `import shutil
from pathlib import Path

src = Path("input.txt")
src.write_text("hello\\n")
backup = Path("backup.txt")
shutil.copy2(src, backup)
print("copied")`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Use `shutil` for intent clarity. Team members instantly understand copy/move semantics from standard library calls.",
          },
          {
            type: "quiz",
            question: "Which module is commonly used for high-level file copy/move operations?",
            options: ["pathlib", "typing", "shutil", "itertools"],
            answer: 2,
            explanation: "`shutil` is designed for high-level file and directory operations.",
          },
        ],
        challenge: {
          title: "Show a copy workflow command",
          description:
            "Import `shutil` and `Path`, define source/destination paths, call `shutil.copy2(source, dest)`, and print `copied`.",
          starterCode: `# Implement copy workflow

`,
          solutionCode: `import shutil
from pathlib import Path

source = Path("source.txt")
source.write_text("hello\\n")
dest = Path("dest.txt")
shutil.copy2(source, dest)
print("copied")`,
          tests: [
            {
              id: 1,
              label: "Imports shutil",
              keywords: [{ pattern: "import\\s+shutil" }],
            },
            {
              id: 2,
              label: "Calls shutil.copy2",
              keywords: [{ pattern: "shutil\\.copy2\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints copied",
              keywords: [{ pattern: "print\\s*\\(\\s*[\"']copied[\"']" }],
            },
          ],
        },
      },
      {
        id: "fh-10b",
        title: "glob Patterns for Batch File Discovery",
        xp: 19,
        theory: [
          {
            type: "text",
            content:
              "Glob patterns discover groups of files like `*.csv` or `**/*.json`, which is useful for batch imports and report generators.",
          },
          {
            type: "text",
            content:
              "With `Path.glob` and `Path.rglob`, you can recursively collect files and drive scalable processing loops.",
          },
          {
            type: "diagram",
            title: "Batch discovery pipeline",
            nodes: [
              {
                id: "rootdir",
                label: "Root directory",
                color: "#0e7490",
                items: ["project/data", "many subfolders", "mixed file types"],
              },
              {
                id: "patternmatch",
                label: "Glob pattern",
                color: "#0891b2",
                items: ["*.csv", "**/*.json", "date-specific names"],
              },
              {
                id: "batchloop",
                label: "Process matches",
                color: "#06b6d4",
                items: ["iterate files", "aggregate results", "write summary"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Collect matching file paths",
            content: `from pathlib import Path

root = Path("data")
for p in root.rglob("*.csv"):
    print(p)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Keep glob patterns explicit and narrow to avoid accidentally processing huge unrelated trees.",
          },
          {
            type: "quiz",
            question: "Which call recursively searches all subfolders for matches?",
            options: ["Path.match", "Path.rglob", "Path.name", "Path.resolve"],
            answer: 1,
            explanation:
              "`rglob` performs recursive pattern matching under the given path.",
          },
        ],
        challenge: {
          title: "Find JSON files recursively",
          description:
            "Use `Path('data').rglob('*.json')` and print each matched path.",
          starterCode: `from pathlib import Path

# Recursively list JSON files
`,
          solutionCode: `from pathlib import Path

for file_path in Path("data").rglob("*.json"):
    print(file_path)`,
          tests: [
            {
              id: 1,
              label: "Uses Path.rglob",
              keywords: [{ pattern: "rglob\\s*\\(\\s*[\"']\\*\\.json[\"']\\s*\\)" }],
            },
            {
              id: 2,
              label: "Iterates over matches",
              keywords: [{ pattern: "for\\s+\\w+\\s+in" }],
            },
            {
              id: 3,
              label: "Prints matched paths",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fh-11",
        title: "Binary Data with BytesIO",
        xp: 19,
        theory: [
          {
            type: "text",
            content:
              "Binary workflows process bytes directly. This is common for uploads, compressed assets, and protocol payloads.",
          },
          {
            type: "text",
            content:
              "`io.BytesIO` simulates binary file handles in memory, useful for tests and browser-compatible exercises.",
          },
          {
            type: "diagram",
            title: "Binary handling sequence",
            nodes: [
              {
                id: "bytesource",
                label: "Byte source",
                color: "#0e7490",
                items: ["network payload", "image bytes", "compressed data"],
              },
              {
                id: "buffer",
                label: "BytesIO buffer",
                color: "#0891b2",
                items: ["in-memory binary stream", "read/write/seek support", "test-friendly"],
              },
              {
                id: "decode",
                label: "Decode/forward",
                color: "#06b6d4",
                items: ["convert if needed", "hash/analyze", "pass to next service"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Read bytes from BytesIO",
            content: `from io import BytesIO

buf = BytesIO(b"ABC123")
print(buf.read())
buf.seek(0)
print(len(buf.read()))`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Do not decode arbitrary binary as UTF-8 unless protocol guarantees text content.",
          },
          {
            type: "quiz",
            question: "Which in-memory stream class is designed for binary bytes?",
            options: ["StringIO", "BytesIO", "PathIO", "TextIO"],
            answer: 1,
            explanation: "BytesIO handles raw byte streams and mimics binary file behavior.",
          },
        ],
        challenge: {
          title: "Read and inspect binary payload",
          description:
            "Create `BytesIO(b'\\x41\\x42\\x43')`, print raw bytes, rewind, then print byte length.",
          starterCode: `from io import BytesIO

# Read bytes and print length
`,
          solutionCode: `from io import BytesIO

payload = BytesIO(b"\\x41\\x42\\x43")
print(payload.read())
payload.seek(0)
print(len(payload.read()))`,
          tests: [
            {
              id: 1,
              label: "Uses BytesIO",
              keywords: ["BytesIO"],
            },
            {
              id: 2,
              label: "Reads from stream",
              keywords: [{ pattern: "\\.read\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints length",
              keywords: [{ pattern: "len\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fh-11b",
        title: "StringIO for Testable I/O Design",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "When functions accept file-like objects, they become easy to test in Pyodide and on servers without touching disk.",
          },
          {
            type: "text",
            content:
              "Designing around streams (`read`, `write`) decouples business logic from environment-specific filesystem details.",
          },
          {
            type: "diagram",
            title: "Dependency inversion for I/O",
            nodes: [
              {
                id: "logic",
                label: "Business logic",
                color: "#0e7490",
                items: ["parse/transform", "independent of disk", "pure behavior focus"],
              },
              {
                id: "iface",
                label: "File-like interface",
                color: "#0891b2",
                items: ["read()", "write()", "seek()"],
              },
              {
                id: "impl",
                label: "Implementations",
                color: "#06b6d4",
                items: ["StringIO in tests", "real open() in production", "easy swap"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Function over file-like stream",
            content: `from io import StringIO

def count_lines(stream):
    stream.seek(0)
    return sum(1 for _ in stream)

print(count_lines(StringIO("a\\nb\\n")))`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "This design pattern improves reliability and dramatically simplifies unit testing for file-heavy code.",
          },
          {
            type: "quiz",
            question: "Why is `StringIO` useful in file handling challenges?",
            options: [
              "It replaces JSON",
              "It simulates file I/O without disk access",
              "It is faster than all files always",
              "It only works in JavaScript",
            ],
            answer: 1,
            explanation:
              "StringIO provides an in-memory text stream with file-like methods for portable testing.",
          },
        ],
        challenge: {
          title: "Build a stream-based helper",
          description:
            "Write function `count_nonempty(stream)` that reads from `StringIO`, counts non-empty stripped lines, and prints the count.",
          starterCode: `from io import StringIO

# Write count_nonempty(stream)
`,
          solutionCode: `from io import StringIO

def count_nonempty(stream):
    stream.seek(0)
    total = 0
    for line in stream:
        if line.strip():
            total += 1
    print(total)

count_nonempty(StringIO("a\\n\\n b \\n"))`,
          tests: [
            {
              id: 1,
              label: "Defines function with stream parameter",
              keywords: [{ pattern: "def\\s+count_nonempty\\s*\\(\\s*stream\\s*\\)" }],
            },
            {
              id: 2,
              label: "Uses line iteration and strip",
              keywords: [{ pattern: "for\\s+\\w+\\s+in\\s+stream" }, { pattern: "\\.strip\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints final count",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "pro-workflows",
    title: "Pro Workflows",
    icon: "🏁",
    color: "#4f46e5",
    lessons: [
      {
        id: "fh-12",
        title: "Logging File Operations",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Logging around file operations creates operational visibility: what was read, what was written, and why failures occurred.",
          },
          {
            type: "text",
            content:
              "Use structured, contextual log messages so data engineers and SREs can diagnose pipelines quickly.",
          },
          {
            type: "diagram",
            title: "Observable file pipeline",
            nodes: [
              {
                id: "action",
                label: "I/O action",
                color: "#3730a3",
                items: ["read input", "transform content", "write output"],
              },
              {
                id: "logevent",
                label: "Log event",
                color: "#4f46e5",
                items: ["operation name", "target path", "record counts"],
              },
              {
                id: "diagnosis",
                label: "Operational diagnosis",
                color: "#6366f1",
                items: ["trace failures", "measure throughput", "support incident response"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Log simple file workflow",
            content: `import logging
from io import StringIO

logging.basicConfig(level=logging.INFO)
stream = StringIO("x\\ny\\n")
logging.info("starting read")
print(stream.read())
logging.info("read complete")`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Include operation context in every log entry. Generic messages like 'error happened' are hard to use in production.",
          },
          {
            type: "quiz",
            question: "What is the main value of logging around file operations?",
            options: [
              "Eliminate all exceptions",
              "Improve traceability and troubleshooting",
              "Automatically compress files",
              "Avoid unit tests",
            ],
            answer: 1,
            explanation:
              "Logs provide traceability of pipeline steps and failure points.",
          },
        ],
        challenge: {
          title: "Add logging to stream processing",
          description:
            "Configure logging at INFO, read from a `StringIO` stream, and log before and after reading.",
          starterCode: `import logging
from io import StringIO

# Add logs around read operation
`,
          solutionCode: `import logging
from io import StringIO

logging.basicConfig(level=logging.INFO)
stream = StringIO("alpha\\nbeta\\n")
logging.info("about to read stream")
print(stream.read())
logging.info("finished reading stream")`,
          tests: [
            {
              id: 1,
              label: "Imports logging",
              keywords: [{ pattern: "import\\s+logging" }],
            },
            {
              id: 2,
              label: "Uses logging.info",
              keywords: [{ pattern: "logging\\.info\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints stream content",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fh-13",
        title: "Custom Context Managers for File Workflows",
        xp: 21,
        theory: [
          {
            type: "text",
            content:
              "Custom context managers wrap setup/teardown logic around file workflows: timers, logging, locking, temporary resources, and cleanup.",
          },
          {
            type: "text",
            content:
              "You can build them with `contextlib.contextmanager` for concise reusable patterns.",
          },
          {
            type: "diagram",
            title: "Custom context manager lifecycle",
            nodes: [
              {
                id: "setupctx",
                label: "Setup phase",
                color: "#3730a3",
                items: ["initialize resource", "start timer/logging", "yield handle"],
              },
              {
                id: "bodyctx",
                label: "Body phase",
                color: "#4f46e5",
                items: ["perform I/O", "business logic", "possible errors"],
              },
              {
                id: "teardownctx",
                label: "Teardown phase",
                color: "#6366f1",
                items: ["cleanup guaranteed", "release resources", "final log/metrics"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Context manager wrapper",
            content: `from contextlib import contextmanager
from io import StringIO

@contextmanager
def tracked_stream(text):
    print("open")
    s = StringIO(text)
    try:
        yield s
    finally:
        print("close")

with tracked_stream("demo") as stream:
    print(stream.read())`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Custom context managers keep cross-cutting concerns out of business logic and standardize safe resource handling.",
          },
          {
            type: "quiz",
            question: "Which decorator helps create generator-based context managers?",
            options: ["@property", "@dataclass", "@contextmanager", "@staticmethod"],
            answer: 2,
            explanation:
              "`@contextmanager` from `contextlib` turns a generator into a context manager.",
          },
        ],
        challenge: {
          title: "Create a tracked stream context manager",
          description:
            "Use `@contextmanager` to create `tracked(text)` that prints `start`, yields `StringIO(text)`, then prints `end` in `finally`.",
          starterCode: `from contextlib import contextmanager
from io import StringIO

# Define tracked(text) and use it once
`,
          solutionCode: `from contextlib import contextmanager
from io import StringIO

@contextmanager
def tracked(text):
    print("start")
    stream = StringIO(text)
    try:
        yield stream
    finally:
        print("end")

with tracked("hello") as s:
    print(s.read())`,
          tests: [
            {
              id: 1,
              label: "Uses @contextmanager",
              keywords: ["@contextmanager"],
            },
            {
              id: 2,
              label: "Yields a stream",
              keywords: [{ pattern: "yield\\s+" }],
            },
            {
              id: 3,
              label: "Uses finally cleanup",
              keywords: [{ pattern: "finally\\s*:" }],
            },
          ],
        },
      },
      {
        id: "fh-14",
        title: "Capstone: CSV to JSON ETL",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Capstone objective: ingest CSV rows, aggregate by category, and emit a JSON string report suitable for API responses or dashboard ingestion.",
          },
          {
            type: "text",
            content:
              "This mirrors a real ETL micro-task: parse -> validate -> aggregate -> serialize.",
          },
          {
            type: "diagram",
            title: "Capstone ETL pipeline",
            nodes: [
              {
                id: "extract",
                label: "Extract (CSV StringIO)",
                color: "#3730a3",
                items: ["csv.DictReader", "row iteration", "string-to-int conversion"],
              },
              {
                id: "transform",
                label: "Transform (aggregate)",
                color: "#4f46e5",
                items: ["group by category", "sum amounts", "compute totals"],
              },
              {
                id: "load",
                label: "Load (JSON string)",
                color: "#6366f1",
                items: ["json.dumps()", "portable output", "print/report delivery"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "CSV to aggregated JSON",
            content: `import csv
import json
from io import StringIO

raw = "category,amount\\nbooks,20\\nfood,15\\nbooks,5\\n"
totals = {}
for row in csv.DictReader(StringIO(raw)):
    key = row["category"]
    totals[key] = totals.get(key, 0) + int(row["amount"])

result = {"totals": totals}
print(json.dumps(result))`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Capstone quality means deterministic output schema, clear numeric conversions, and robust handling of repetitive categories.",
          },
          {
            type: "quiz",
            question: "What is the key transform step in this ETL capstone?",
            options: [
              "Converting JSON to HTML",
              "Grouping CSV rows and summing amounts by category",
              "Sorting imports alphabetically",
              "Converting all text to uppercase",
            ],
            answer: 1,
            explanation:
              "The central transform is category-level aggregation before JSON serialization.",
          },
        ],
        challenge: {
          title: "Build the ETL aggregator",
          description:
            "Read CSV from `StringIO`, aggregate `amount` by `category`, build `{'totals': ...}` object, dump to JSON string, and print.",
          starterCode: `import csv
import json
from io import StringIO

raw = "category,amount\\nops,3\\nml,5\\nops,4\\n"

# Aggregate and print JSON
`,
          solutionCode: `import csv
import json
from io import StringIO

raw = "category,amount\\nops,3\\nml,5\\nops,4\\n"
totals = {}
for row in csv.DictReader(StringIO(raw)):
    category = row["category"]
    amount = int(row["amount"])
    totals[category] = totals.get(category, 0) + amount

result = {"totals": totals}
json_output = json.dumps(result)
print(json_output)`,
          tests: [
            {
              id: 1,
              label: "Uses csv with StringIO",
              keywords: ["csv.DictReader", "StringIO"],
            },
            {
              id: 2,
              label: "Aggregates using get pattern",
              keywords: [{ pattern: "\\.get\\s*\\(" }, { pattern: "\\+\\s*amount" }],
            },
            {
              id: 3,
              label: "Dumps and prints JSON",
              keywords: [{ pattern: "json\\.dumps\\s*\\(" }, { pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "fh-15",
        title: "Python File Handling Cheat Sheet",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "This final lesson condenses practical patterns you should reuse: safe open/close, pathlib joins, csv/json workflows, and atomic output updates.",
          },
          {
            type: "text",
            content:
              "Think in reusable templates. Most production file tasks are combinations of these core primitives.",
          },
          {
            type: "diagram",
            title: "Mastery checklist",
            nodes: [
              {
                id: "safeio",
                label: "Safe I/O fundamentals",
                color: "#3730a3",
                items: ["with open(...)", "explicit encoding", "exception handling"],
              },
              {
                id: "formats",
                label: "Structured formats",
                color: "#4f46e5",
                items: ["csv.DictReader/Writer", "json.loads/dumps", "schema-aware transforms"],
              },
              {
                id: "production",
                label: "Production hardening",
                color: "#6366f1",
                items: ["Pathlib", "atomic writes", "logging + observability"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Reusable robust template",
            content: `import csv
import json
from io import StringIO
from pathlib import Path

raw_csv = "name,score\\nAva,91\\n"
rows = list(csv.DictReader(StringIO(raw_csv)))
payload = json.dumps({"rows": rows})

out = Path("result.json.tmp")
with open(out, "w", encoding="utf-8") as f:
    f.write(payload)

print(payload)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Before shipping file code, ask: Is it testable without disk, encoding-safe, exception-safe, and rerun-safe?",
          },
          {
            type: "quiz",
            question: "Which pattern best improves reliability of write operations?",
            options: [
              "Always append blindly",
              "Write temp then replace target",
              "Use random filenames every run",
              "Disable exceptions",
            ],
            answer: 1,
            explanation:
              "Atomic write workflows reduce partial-write corruption in production systems.",
          },
        ],
        challenge: {
          title: "Final synthesis script",
          description:
            "Parse CSV from `StringIO`, convert to list of dict rows, create JSON string with `json.dumps`, and print it.",
          starterCode: `import csv
import json
from io import StringIO

raw = "name,score\\nAva,99\\nNoah,88\\n"

# Build and print JSON payload
`,
          solutionCode: `import csv
import json
from io import StringIO

raw = "name,score\\nAva,99\\nNoah,88\\n"
rows = list(csv.DictReader(StringIO(raw)))
payload = json.dumps({"rows": rows})
print(payload)`,
          tests: [
            {
              id: 1,
              label: "Uses csv.DictReader with StringIO",
              keywords: ["DictReader", "StringIO"],
            },
            {
              id: 2,
              label: "Uses json.dumps",
              keywords: [{ pattern: "json\\.dumps\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints payload",
              keywords: [{ pattern: "print\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
];

export const PYTHON_FILE_HANDLING_CHAPTERS = applyChapterEnhancements(
  RAW_PYTHON_FILE_HANDLING_CHAPTERS,
);

export const PYTHON_FILE_HANDLING_LESSONS = applyLessonVideoLinks(
  PYTHON_FILE_HANDLING_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  PYTHON_FILE_HANDLING_VIDEO_LINKS,
);

export const PYTHON_FILE_HANDLING_TOTAL_XP = PYTHON_FILE_HANDLING_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
