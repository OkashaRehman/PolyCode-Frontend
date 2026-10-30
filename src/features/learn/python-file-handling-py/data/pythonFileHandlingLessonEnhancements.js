/** Per-lesson objectives, scenarios, and callouts merged into curriculum at build time. */

export const LESSON_ENHANCEMENTS = {
  "fh-0": {
    objectives: [
      "Explain why programs read and write files",
      "Distinguish persistent storage from in-memory variables",
      "Name common file types Python handles (text, CSV, JSON)",
    ],
    scenario:
      "A weather app must load yesterday's readings from disk on startup — without files, data vanishes when the program exits.",
    prepend: [
      {
        type: "callout",
        variant: "tip",
        content:
          "Files let your program **outlive a single run**. Logs, configs, exports, and user data almost always live on disk.",
      },
    ],
  },
  "fh-0b": {
    objectives: [
      "Contrast text files and binary files",
      "Know when to open with mode `t` vs `b`",
      "Avoid corrupting binary data by reading as text",
    ],
    scenario:
      "A teammate opens a `.png` with text mode and wonders why the image breaks — binary vs text mode is the answer.",
  },
  "fh-1": {
    objectives: [
      "Open files with `with open(path, mode) as f`",
      "Explain why context managers auto-close files",
      "Read entire file content with `f.read()`",
    ],
    scenario:
      "A deployment script reads `config.txt` once at startup. `with open(...)` guarantees the handle closes even if parsing fails.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "Never rely on `f.close()` alone in long scripts — use `with open(...)` so files close on exceptions.",
      },
    ],
  },
  "fh-1b": {
    objectives: [
      "Iterate files line by line with a for-loop",
      "Use `readlines()` when you need a list of lines",
      "Strip newlines with `.strip()` before processing",
    ],
    scenario:
      "A log analyzer counts ERROR lines in a 2 GB file — line-by-line reading avoids loading everything into RAM.",
  },
  "fh-2": {
    objectives: [
      "Write text with `f.write()` and `f.writelines()`",
      "Append with mode `\"a\"` without erasing existing content",
      "Understand that `\"w\"` overwrites the file",
    ],
    scenario:
      "A nightly job appends one summary line to `report.log` — mode `\"a\"` preserves earlier entries.",
  },
  "fh-3": {
    objectives: [
      "Build paths with `pathlib.Path`",
      "Use `/` operator to join path segments",
      "Prefer Path over manual string concatenation",
    ],
    scenario:
      "Cross-platform code must work on Windows and Linux — `Path('data') / 'users.csv'` handles separators correctly.",
  },
  "fh-3b": {
    objectives: [
      "Choose modes: r, w, a, x, r+",
      "Set `encoding='utf-8'` for text files",
      "Avoid platform-default encoding surprises",
    ],
    scenario:
      "A CSV with accented names garbles on one machine until you specify `encoding='utf-8'` explicitly.",
  },
  "fh-4": {
    objectives: [
      "Resolve paths with `.resolve()` and `.parent`",
      "Check existence with `.exists()` and `.is_file()`",
      "Create directories with `.mkdir(parents=True, exist_ok=True)`",
    ],
    scenario:
      "An export script writes to `output/2026/summary.json` — pathlib creates missing folders safely before writing.",
  },
  "fh-5": {
    objectives: [
      "Parse CSV rows with the `csv` module",
      "Handle headers in the first row",
      "Avoid manual `split(',')` for real CSV data",
    ],
    scenario:
      "Sales exports from Excel arrive as `sales.csv` with quoted commas inside fields — `csv.reader` handles that correctly.",
  },
  "fh-5b": {
    objectives: [
      "Write CSV rows with `csv.writer`",
      "Control quoting and line endings",
      "Export Python data to spreadsheet-friendly files",
    ],
    scenario:
      "Analytics code dumps 10,000 rows for finance — `csv.writer` produces a file Excel opens without extra steps.",
  },
  "fh-6": {
    objectives: [
      "Read CSV as dictionaries with `csv.DictReader`",
      "Write dict rows with `csv.DictWriter`",
      "Access columns by name instead of index",
    ],
    scenario:
      "HR data has columns `name`, `department`, `salary` — DictReader lets you write `row['department']` instead of `row[2]`.",
  },
  "fh-7": {
    objectives: [
      "Serialize Python objects with `json.dump` / `json.dumps`",
      "Load JSON with `json.load` / `json.loads`",
      "Know JSON supports dict, list, str, int, float, bool, null",
    ],
    scenario:
      "A web API returns JSON; your script saves the payload to `cache.json` for offline analysis.",
  },
  "fh-7b": {
    objectives: [
      "Navigate nested JSON with chained keys",
      "Use `.get()` for optional fields",
      "Validate structure before accessing deep keys",
    ],
    scenario:
      "Config file has `database.host` nested three levels deep — safe access prevents KeyError in production.",
  },
  "fh-8": {
    objectives: [
      "Treat config files as data, not code",
      "Separate secrets from committed config",
      "Use environment variables for sensitive paths",
    ],
    scenario:
      "`.env` holds API keys locally while `settings.json` (committed) holds non-secret defaults.",
    prepend: [
      {
        type: "callout",
        variant: "warning",
        content:
          "Never commit passwords or API keys in JSON config files tracked by git. Use env vars or secret managers.",
      },
    ],
  },
  "fh-9": {
    objectives: [
      "Catch `FileNotFoundError` and `PermissionError`",
      "Provide helpful error messages to users",
      "Fail gracefully when files are missing",
    ],
    scenario:
      "A CLI tool receives a wrong path — catching `FileNotFoundError` prints a clear message instead of a traceback.",
  },
  "fh-9b": {
    objectives: [
      "Check `path.exists()` before reading",
      "Distinguish files from directories",
      "Use `pathlib` guards in pipelines",
    ],
    scenario:
      "A batch importer skips missing files and logs a warning instead of crashing the whole job.",
  },
  "fh-9c": {
    objectives: [
      "Write to a temp file then rename for atomic updates",
      "Avoid half-written files on crash",
      "Understand why rename-on-success is safer",
    ],
    scenario:
      "A config updater writes `settings.json.tmp` then replaces the real file — readers never see a partial JSON document.",
  },
  "fh-10": {
    objectives: [
      "List directories with `os.listdir` or Path.iterdir",
      "Copy and move files with `shutil`",
      "Remove trees with `shutil.rmtree` carefully",
    ],
    scenario:
      "A backup script copies today's export folder to `archive/2026-07-02/` with `shutil.copytree`.",
  },
  "fh-10b": {
    objectives: [
      "Find files with `glob.glob` or `Path.glob`",
      "Filter by extension patterns like `*.csv`",
      "Batch-process every matching file",
    ],
    scenario:
      "A data cleaner runs the same transform on all `data/raw/*.csv` files in one loop.",
  },
  "fh-11": {
    objectives: [
      "Open binary files with mode `rb` / `wb`",
      "Read and write `bytes` objects",
      "Never decode binary files as UTF-8 text",
    ],
    scenario:
      "An image downloader saves raw bytes to `logo.png` — binary mode preserves the exact file content.",
  },
  "fh-11b": {
    objectives: [
      "Use `io.StringIO` as an in-memory text file",
      "Test file logic without touching disk",
      "Use StringIO in unit tests and browser challenges",
    ],
    scenario:
      "You unit-test a CSV parser by feeding `StringIO(sample_csv)` — fast, isolated, no temp files left behind.",
  },
  "fh-12": {
    objectives: [
      "Configure `logging` to write to a file",
      "Set log levels and format strings",
      "Rotate or append logs for long-running services",
    ],
    scenario:
      "A background worker logs errors to `worker.log` while stdout stays clean for operators.",
  },
  "fh-13": {
    objectives: [
      "Build custom context managers with `@contextmanager`",
      "Guarantee cleanup in `finally` blocks",
      "Wrap file + lock + timer patterns",
    ],
    scenario:
      "A custom context manager acquires a file lock, yields the handle, and always releases the lock on exit.",
  },
  "fh-14": {
    objectives: [
      "Combine CSV read, JSON write, and error handling",
      "Design a small ETL pipeline in one script",
      "Apply pathlib and encoding best practices",
    ],
    scenario:
      "Ingest `sales.csv`, aggregate totals by region, export `summary.json` — a realistic file-handling capstone.",
  },
  "fh-15": {
    objectives: [
      "Pick the right module for each file task",
      "Review modes, pathlib, csv, json, and safety patterns",
      "Reuse starter templates for new projects",
    ],
    scenario:
      "You start a new data script and keep this lesson open as a quick reference while coding.",
  },
};

export function applyLessonEnhancements(lesson) {
  const meta = LESSON_ENHANCEMENTS[lesson.id];
  const objectives = meta?.objectives || [
    `Understand the core idea in "${lesson.title}"`,
    "Apply Python file I/O patterns from this lesson in code",
    "Choose safe, readable approaches for real projects",
  ];

  const prefix = [{ type: "objectives", items: objectives }];
  if (meta?.scenario) {
    prefix.push({ type: "scenario", content: meta.scenario });
  }
  if (meta?.prepend?.length) {
    prefix.push(...meta.prepend);
  }

  return {
    ...lesson,
    theory: [...prefix, ...lesson.theory, ...(meta?.append || [])],
  };
}

export function applyChapterEnhancements(chapters) {
  return chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map(applyLessonEnhancements),
  }));
}
