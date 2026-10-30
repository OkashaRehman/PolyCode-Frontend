// PolyCode — Batchfile Automation interactive course
// 4 chapters · 12 lessons
// Builds on Batchfile Fundamentals: scheduling scripts to run unattended,
// logging what they do, automating file operations at scale, and writing
// robust patterns (retries, silent execution) for scripts that run without
// anyone watching.

const ACCENT = "#5391fe";

const RAW_BATCHFILE_AUTOMATION_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Scheduling Tasks
  // ─────────────────────────────────────────────────────────────
  {
    id: "bfa-scheduling",
    title: "Scheduling Tasks",
    icon: "🔁",
    color: ACCENT,
    lessons: [
      {
        id: "bfa-0",
        title: "Introduction to Task Scheduling",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`schtasks /create` registers a batch script to run automatically on a schedule (daily, at logon, etc.) using Windows Task Scheduler, without needing anyone to double-click it. This is the core building block of real Batchfile automation.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Scheduling a daily task",
            content: `schtasks /create /tn "DailyBackup" /tr "C:\\scripts\\backup.bat" /sc daily /st 02:00`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Breaking down the flags: `/tn` names the task, `/tr` is the command to run, `/sc daily` sets the schedule type, and `/st 02:00` sets the start time — here, every day at 2:00 AM.",
          },
          {
            type: "quiz",
            question: "What does /sc daily control in a schtasks /create command?",
            options: [
              "The task's name",
              "How often the scheduled task repeats — in this case, once every day",
              "The script's file path",
              "The user account the task runs as",
            ],
            answer: 1,
            explanation:
              "`/sc` sets the schedule type (daily, weekly, monthly, onlogon, etc.), controlling how frequently Task Scheduler triggers the task.",
          },
        ],
        challenge: {
          title: "Schedule a Cleanup Script",
          description:
            "Write an `schtasks /create` command naming the task \"Cleanup\", running `C:\\scripts\\cleanup.bat`, scheduled daily at 23:00.",
          starterCode: `REM schtasks /create /tn "Cleanup" /tr "..." /sc daily /st ...
`,
          solutionCode: `schtasks /create /tn "Cleanup" /tr "C:\\scripts\\cleanup.bat" /sc daily /st 23:00`,
          tests: [
            { id: "t1", label: "Names the task Cleanup", keywords: ["/tn \"Cleanup\""] },
            { id: "t2", label: "Schedules it daily", keywords: ["/sc daily"] },
          ],
        },
      },
      {
        id: "bfa-1",
        title: "Managing Scheduled Tasks",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`schtasks /query` lists existing scheduled tasks so you can check whether one is registered, and `schtasks /delete` removes one. Both take `/tn` to target a specific task by name.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Checking and removing a task",
            content: `schtasks /query /tn "DailyBackup"
schtasks /delete /tn "DailyBackup" /f`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`/f` (force) on `/delete` skips the \"are you sure?\" confirmation prompt — essential in an unattended script, but worth double-checking the task name first, since there's no undo.",
          },
          {
            type: "quiz",
            question: "Why is /f often added to schtasks /delete in automation scripts?",
            options: [
              "It makes deletion faster",
              "It suppresses the interactive confirmation prompt, which would otherwise hang an unattended script",
              "It's required syntax with no functional effect",
              "It deletes all tasks, not just the named one",
            ],
            answer: 1,
            explanation:
              "Without `/f`, `schtasks /delete` asks for interactive confirmation — something an unattended script can never answer, so it would hang indefinitely. `/f` forces the deletion through without prompting.",
          },
        ],
        challenge: {
          title: "Remove a Scheduled Task",
          description:
            "Write an `schtasks /delete` command that force-removes a task named \"OldJob\" without prompting for confirmation.",
          starterCode: `REM schtasks /delete /tn "OldJob" ...
`,
          solutionCode: `schtasks /delete /tn "OldJob" /f`,
          tests: [
            { id: "t1", label: "Targets the OldJob task", keywords: ["/tn \"OldJob\""] },
            { id: "t2", label: "Forces deletion without prompting", keywords: ["/f"] },
          ],
        },
      },
      {
        id: "bfa-2",
        title: "Running Scripts Silently",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`start /min` launches a script minimized instead of taking over the screen, and `start /b` runs it in the background of the current console with no new window at all — useful for automation that shouldn't interrupt whoever's at the keyboard.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Launching without a visible window",
            content: `@echo off
start /b cmd /c "C:\\scripts\\sync.bat"
echo Sync started in the background.`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Task Scheduler itself already runs tasks without a visible window when \"Run whether user is logged on or not\" is set — `start /b` matters most when you're launching a background job from *inside* another script that's already visibly running.",
          },
          {
            type: "quiz",
            question: "What's the difference between start /min and start /b?",
            options: [
              "They are identical",
              "start /min opens a minimized window; start /b runs with no new window at all, inside the current console",
              "start /b is only for .exe files",
              "start /min runs faster",
            ],
            answer: 1,
            explanation:
              "`/min` still creates a new console window, just minimized to the taskbar. `/b` skips creating a new window entirely, running the command as a background process attached to the current console.",
          },
        ],
        challenge: {
          title: "Launch a Background Sync",
          description:
            "Write a script that uses `start /b` to launch `cmd /c \"sync.bat\"` in the background, then echoes \"Sync started in the background.\".",
          starterCode: `@echo off
REM start /b cmd /c "sync.bat"
echo Sync started in the background.
`,
          solutionCode: `@echo off
start /b cmd /c "sync.bat"
echo Sync started in the background.`,
          tests: [
            { id: "t1", label: "Uses start /b", keywords: ["start /b"] },
            { id: "t2", label: "Confirms the sync started", keywords: ["echo Sync started in the background."] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Logging & Output
  // ─────────────────────────────────────────────────────────────
  {
    id: "bfa-logging",
    title: "Logging & Output",
    icon: "📝",
    color: ACCENT,
    lessons: [
      {
        id: "bfa-3",
        title: "Redirecting Output",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`>` redirects a command's output to a file, overwriting anything already there. `>>` appends instead, adding new output to the end of the file without erasing what came before — the difference matters a lot for a log file that should accumulate history.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Overwrite vs append",
            content: `echo Starting job > job.log
echo Step 1 complete >> job.log
echo Step 2 complete >> job.log`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Using `>` on every line of a log — instead of `>` once, then `>>` for the rest — is a common bug: each `>` wipes the file clean, so only the last line ever survives.",
          },
          {
            type: "quiz",
            question: "What happens if every line in a logging script uses > instead of >>?",
            options: [
              "The log file grows normally",
              "Each > overwrites the file, so only the output of the very last redirected line remains in the log",
              "There is no difference between > and >> in batch files",
              "The script fails to run",
            ],
            answer: 1,
            explanation:
              "`>` truncates the target file before writing. If used repeatedly, each new redirect erases the previous content — only `>>` preserves earlier log entries by appending.",
          },
        ],
        challenge: {
          title: "Write a Two-Line Log",
          description:
            "Write a script that creates \"run.log\" with \"Job started\" using `>`, then appends \"Job finished\" using `>>`.",
          starterCode: `REM echo Job started > run.log
REM echo Job finished >> run.log
`,
          solutionCode: `echo Job started > run.log
echo Job finished >> run.log`,
          tests: [
            { id: "t1", label: "Creates the log with >", keywords: ["echo Job started > run.log"] },
            { id: "t2", label: "Appends with >>", keywords: ["echo Job finished >> run.log"] },
          ],
        },
      },
      {
        id: "bfa-4",
        title: "Timestamped Log Files",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "The built-in `%date%` and `%time%` variables let a script stamp its own log entries — or even generate a uniquely named log file per run, so old logs from previous executions never get overwritten.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Stamping a log entry",
            content: `@echo off
echo [%date% %time%] Backup started >> backup.log`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "The exact text format of `%date%` and `%time%` depends on the system's regional/locale settings, so scripts that need a reliable, sortable timestamp format often parse these into a custom variable rather than using them raw.",
          },
          {
            type: "quiz",
            question: "Why might a script avoid using raw %date% and %time% for critical, parseable timestamps?",
            options: [
              "They don't exist in batch files",
              "Their exact text format varies by the system's regional settings, so it isn't guaranteed to be consistent or sortable across machines",
              "They can only be used once per script",
              "They require administrator privileges",
            ],
            answer: 1,
            explanation:
              "`%date%` and `%time%` reflect the OS's locale-dependent short date/time format, which can differ between machines (MM/DD/YYYY vs DD/MM/YYYY, for example) — a real problem if logs need to sort correctly or be parsed automatically.",
          },
        ],
        challenge: {
          title: "Add a Timestamp to a Log Entry",
          description:
            "Write a script that appends a log line to \"events.log\" reading \"[%date% %time%] Job complete\".",
          starterCode: `@echo off
REM echo [%date% %time%] Job complete >> events.log
`,
          solutionCode: `@echo off
echo [%date% %time%] Job complete >> events.log`,
          tests: [
            { id: "t1", label: "Uses %date% and %time%", keywords: ["%date%", "%time%"] },
            { id: "t2", label: "Appends to events.log", keywords: [">> events.log"] },
          ],
        },
      },
      {
        id: "bfa-5",
        title: "Combining Output Streams",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A command has two output streams: standard output (stdout, stream 1) and standard error (stderr, stream 2). `2>&1` redirects stderr into wherever stdout is currently going — so `command > log.txt 2>&1` captures both normal output and error messages in the same file.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Capturing errors alongside normal output",
            content: `robocopy C:\\src D:\\backup /mir > backup.log 2>&1`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Order matters here: `2>&1` must come *after* `> backup.log` so stderr gets redirected to where stdout has already been sent. Writing `2>&1 > backup.log` (reversed) sends stderr to the console and only stdout to the file.",
          },
          {
            type: "quiz",
            question: "What does 2>&1 do when placed after > log.txt?",
            options: [
              "It duplicates the log file",
              "It redirects the error stream (2) to the same destination stdout (1) is already going to — the log file",
              "It deletes error messages entirely",
              "It has no effect on batch scripts",
            ],
            answer: 1,
            explanation:
              "`2>&1` means 'send stream 2 (stderr) to wherever stream 1 (stdout) currently points.' Since stdout was already redirected to `log.txt` by the earlier `>`, both streams end up in that same file.",
          },
        ],
        challenge: {
          title: "Capture Both Output and Errors",
          description:
            "Write a command that runs `robocopy C:\\src D:\\backup /mir`, redirecting both stdout and stderr into \"backup.log\".",
          starterCode: `REM robocopy C:\\src D:\\backup /mir > backup.log ...
`,
          solutionCode: `robocopy C:\\src D:\\backup /mir > backup.log 2>&1`,
          tests: [
            { id: "t1", label: "Redirects stdout to the log", keywords: ["> backup.log"] },
            { id: "t2", label: "Redirects stderr to stdout", keywords: ["2>&1"] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Automating File Operations
  // ─────────────────────────────────────────────────────────────
  {
    id: "bfa-file-automation",
    title: "Automating File Operations",
    icon: "🗂️",
    color: ACCENT,
    lessons: [
      {
        id: "bfa-6",
        title: "Copying with Robocopy",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`robocopy` (Robust File Copy) is the modern, automation-friendly successor to `xcopy` — it handles retries on network hiccups, can mirror a folder structure exactly with `/mir`, and returns detailed exit codes describing exactly what happened.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Mirroring a folder",
            content: `robocopy C:\\Projects D:\\Backup\\Projects /mir /r:3 /w:5`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`/mir` makes the destination an exact mirror of the source — including **deleting** files in the destination that no longer exist in the source. Always double-check the source/destination order before running it against important data.",
          },
          {
            type: "quiz",
            question: "What does robocopy's /r:3 flag control?",
            options: [
              "It copies only 3 files",
              "It retries a failed file copy up to 3 times before giving up",
              "It limits the operation to 3 minutes",
              "It runs the copy 3 times in a row unconditionally",
            ],
            answer: 1,
            explanation:
              "`/r:n` sets the number of retry attempts robocopy makes on a file that fails to copy (e.g. due to a temporary lock), which is one of the main reasons it's preferred over `xcopy` for unattended automation.",
          },
        ],
        challenge: {
          title: "Mirror a Backup Folder",
          description:
            "Write a `robocopy` command that mirrors \"C:\\Data\" to \"D:\\Backup\" using `/mir`, retrying up to 3 times with `/r:3`.",
          starterCode: `REM robocopy C:\\Data D:\\Backup /mir ...
`,
          solutionCode: `robocopy C:\\Data D:\\Backup /mir /r:3`,
          tests: [
            { id: "t1", label: "Mirrors the folder", keywords: ["/mir"] },
            { id: "t2", label: "Retries up to 3 times", keywords: ["/r:3"] },
          ],
        },
      },
      {
        id: "bfa-7",
        title: "Looping Over Files",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`for /r %%f in (*.txt) do` walks a directory tree recursively and runs a command once per matching file, with `%%f` bound to the full path each time — the batch equivalent of 'for every file matching this pattern, do something.'",
          },
          {
            type: "code",
            lang: "batch",
            label: "Processing every .txt file",
            content: `@echo off
for /r C:\\Reports %%f in (*.txt) do (
    echo Found: %%f
)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`for /f` is a different, commonly confused variant — it loops over the *lines* of a file or the *output* of a command, rather than over files matching a pattern like `for /r` does.",
          },
          {
            type: "quiz",
            question: "What does for /r C:\\Reports %%f in (*.txt) do (...) iterate over?",
            options: [
              "Every line in a single text file",
              "Every file matching *.txt found recursively within C:\\Reports and its subfolders",
              "Only files directly in C:\\Reports, not subfolders",
              "The output of a previous command",
            ],
            answer: 1,
            explanation:
              "`for /r <path>` recursively walks the given directory tree (including subfolders), running the loop body once for each item matching the pattern in the `in (...)` clause.",
          },
        ],
        challenge: {
          title: "Find All Log Files",
          description:
            "Write a `for /r` loop over `C:\\Logs` matching `*.log`, echoing \"Found: \" followed by each file with loop variable `%%f`.",
          starterCode: `@echo off
REM for /r C:\\Logs %%f in (*.log) do echo "Found: %%f"
`,
          solutionCode: `@echo off
for /r C:\\Logs %%f in (*.log) do (
    echo Found: %%f
)`,
          tests: [
            { id: "t1", label: "Loops recursively over *.log files", keywords: ["for /r C:\\Logs %%f in (*.log)"] },
            { id: "t2", label: "Echoes each found file", keywords: ["Found: %%f"] },
          ],
        },
      },
      {
        id: "bfa-8",
        title: "Batch Renaming & Cleanup",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`forfiles` selects files matching a filter — often by age — and runs a command on each, making it the standard tool for cleanup scripts like 'delete anything in this folder older than 30 days.'",
          },
          {
            type: "code",
            lang: "batch",
            label: "Deleting old log files",
            content: `forfiles /p "C:\\Logs" /s /m *.log /d -30 /c "cmd /c del @path"`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`/d -30` means 'files last modified more than 30 days ago' — a positive number would instead mean 'files modified in the next N days,' which for a cleanup script would silently match nothing. Getting the sign backwards is a very easy mistake here.",
          },
          {
            type: "quiz",
            question: "In forfiles /d -30, what does the -30 mean?",
            options: [
              "Delete exactly 30 files",
              "Only select files whose last-modified date is more than 30 days in the past",
              "Wait 30 seconds before running",
              "Run the command 30 times",
            ],
            answer: 1,
            explanation:
              "A negative `/d` value in `forfiles` filters for files older than N days (last modified more than N days ago); a positive value would instead filter for files modified within the next N days.",
          },
        ],
        challenge: {
          title: "Clean Up Old Temp Files",
          description:
            "Write a `forfiles` command targeting \"C:\\Temp\", matching `*.tmp`, selecting files older than 7 days (`/d -7`), and deleting each with `/c \"cmd /c del @path\"`.",
          starterCode: `REM forfiles /p "C:\\Temp" /m *.tmp /d -7 /c "cmd /c del @path"
`,
          solutionCode: `forfiles /p "C:\\Temp" /m *.tmp /d -7 /c "cmd /c del @path"`,
          tests: [
            { id: "t1", label: "Targets C:\\Temp with *.tmp filter", keywords: ["/p \"C:\\Temp\"", "/m *.tmp"] },
            { id: "t2", label: "Filters files older than 7 days", keywords: ["/d -7"] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Robust Automation Patterns
  // ─────────────────────────────────────────────────────────────
  {
    id: "bfa-robust-patterns",
    title: "Robust Automation Patterns",
    icon: "🛡️",
    color: ACCENT,
    lessons: [
      {
        id: "bfa-9",
        title: "Retry Logic",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A retry loop combines a counter variable, a label, and an `%ERRORLEVEL%` check: attempt the operation, and if it fails, increment the counter and `goto` back — up to some maximum attempts — instead of giving up on the first transient failure.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Retrying a flaky operation",
            content: `@echo off
set attempts=0

:retry
set /a attempts+=1
copy \\\\server\\share\\file.txt C:\\local\\
if %ERRORLEVEL% neq 0 (
    if %attempts% lss 3 (
        echo Attempt %attempts% failed, retrying...
        goto retry
    ) else (
        echo Giving up after 3 attempts.
        exit /b 1
    )
)
echo Copy succeeded.`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`set /a attempts+=1` performs arithmetic — without `/a`, `set` treats everything as plain text, so `attempts+=1` would just become a literal (and useless) string rather than incrementing the number.",
          },
          {
            type: "quiz",
            question: "Why does the retry loop check both %ERRORLEVEL% and %attempts%?",
            options: [
              "It doesn't need to check attempts, ERRORLEVEL alone is enough",
              "ERRORLEVEL detects whether the operation actually failed; attempts caps how many times it retries so it doesn't loop forever on a permanent failure",
              "attempts controls the timeout duration",
              "ERRORLEVEL and attempts must always be equal",
            ],
            answer: 1,
            explanation:
              "Checking only `%ERRORLEVEL%` without a retry limit risks an infinite loop if the failure is permanent (e.g. the file genuinely doesn't exist). The `%attempts%` counter guarantees the script eventually gives up and reports failure.",
          },
        ],
        challenge: {
          title: "Increment a Retry Counter",
          description:
            "Write a script that sets `attempts` to 0, then uses `set /a attempts+=1` to increment it, and echoes the new value with `%attempts%`.",
          starterCode: `@echo off
set attempts=0
REM increment attempts using set /a
echo Attempt number: %attempts%
`,
          solutionCode: `@echo off
set attempts=0
set /a attempts+=1
echo Attempt number: %attempts%`,
          tests: [
            { id: "t1", label: "Initializes attempts to 0", keywords: ["set attempts=0"] },
            { id: "t2", label: "Increments with set /a", keywords: ["set /a attempts+=1"] },
          ],
        },
      },
      {
        id: "bfa-10",
        title: "Silent & Unattended Execution",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Many commands prompt for confirmation by default — `del` on a read-only file, `xcopy` when overwriting, or `rmdir /s`. Their `/y` (or equivalent) flag auto-confirms every prompt, which is required for a script that runs unattended with no one to click 'Yes.'",
          },
          {
            type: "code",
            lang: "batch",
            label: "Suppressing confirmation prompts",
            content: `@echo off
xcopy C:\\Data\\*.* D:\\Backup\\ /y /e
rmdir /s /q C:\\Temp\\OldFiles`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`/q` on `rmdir /s` is the 'quiet' equivalent of `/y` — without it, `rmdir /s` interactively asks 'Are you sure?' for every deletion, which hangs an unattended script exactly the same way an un-forced `schtasks /delete` would.",
          },
          {
            type: "quiz",
            question: "Why do unattended automation scripts consistently need flags like /y or /q?",
            options: [
              "They make commands run faster",
              "They auto-confirm prompts that would otherwise wait for interactive keyboard input the script can never provide",
              "They are required by Windows for all scripts",
              "They enable logging automatically",
            ],
            answer: 1,
            explanation:
              "Confirmation prompts assume a human is watching. A script running unattended (via Task Scheduler, at 2 AM, with no one logged in) will hang forever at any prompt unless the command was told in advance to auto-confirm.",
          },
        ],
        challenge: {
          title: "Silently Copy and Clean Up",
          description:
            "Write a script that runs `xcopy C:\\Data D:\\Backup /y` to copy without prompting, then `rmdir /s /q C:\\Temp` to quietly remove a temp folder.",
          starterCode: `@echo off
REM xcopy C:\\Data D:\\Backup /y
REM rmdir /s /q C:\\Temp
`,
          solutionCode: `@echo off
xcopy C:\\Data D:\\Backup /y
rmdir /s /q C:\\Temp`,
          tests: [
            { id: "t1", label: "Copies without prompting", keywords: ["xcopy C:\\Data D:\\Backup /y"] },
            { id: "t2", label: "Quietly removes the temp folder", keywords: ["rmdir /s /q C:\\Temp"] },
          ],
        },
      },
      {
        id: "bfa-11",
        title: "Building a Scheduled Backup Script",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Putting it all together: a real scheduled backup script combines a timestamped log, a `robocopy` mirror with retries, output redirection to capture everything, and an exit code the Task Scheduler can use to flag a failed run.",
          },
          {
            type: "code",
            lang: "batch",
            label: "A complete unattended backup script",
            content: `@echo off
echo [%date% %time%] Backup starting >> backup.log
robocopy C:\\Data D:\\Backup /mir /r:3 /w:5 >> backup.log 2>&1

if %ERRORLEVEL% geq 8 (
    echo [%date% %time%] Backup FAILED >> backup.log
    exit /b 1
) else (
    echo [%date% %time%] Backup succeeded >> backup.log
    exit /b 0
)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Robocopy's exit codes are unusual: 0-7 all mean some degree of success (files copied, some skipped, etc.), while **8 or higher** means at least one file failed to copy — so robocopy scripts check `geq 8`, not just `neq 0` like most other commands.",
          },
          {
            type: "quiz",
            question: "Why does this script check if %ERRORLEVEL% geq 8 instead of neq 0 after robocopy?",
            options: [
              "geq 8 and neq 0 always mean the same thing for every command",
              "Robocopy uses a bitmask exit code where 0-7 indicate varying degrees of success and only 8+ indicates a real failure",
              "It's a stylistic choice with no functional difference",
              "8 is robocopy's default retry count",
            ],
            answer: 1,
            explanation:
              "Unlike most commands where any nonzero exit code means failure, robocopy's exit codes 0 through 7 are all considered successful outcomes (e.g. 1 = files copied, 2 = extra files found). Only codes 8 and above indicate an actual copy failure.",
          },
        ],
        challenge: {
          title: "Assemble the Backup Script",
          description:
            "Write a script that logs a timestamped start message to \"backup.log\", runs `robocopy C:\\Data D:\\Backup /mir` redirecting all output to the log, then checks `if %ERRORLEVEL% geq 8` to exit with code 1 on failure.",
          starterCode: `@echo off
REM log a timestamped start message to backup.log
REM run robocopy, redirecting output to backup.log
REM if ERRORLEVEL geq 8, exit /b 1
`,
          solutionCode: `@echo off
echo [%date% %time%] Backup starting >> backup.log
robocopy C:\\Data D:\\Backup /mir >> backup.log 2>&1
if %ERRORLEVEL% geq 8 (
    exit /b 1
)`,
          tests: [
            { id: "t1", label: "Runs robocopy with output redirected", keywords: ["robocopy C:\\Data D:\\Backup /mir", ">> backup.log"] },
            { id: "t2", label: "Checks for failure with geq 8", keywords: ["if %ERRORLEVEL% geq 8"] },
          ],
        },
      },
    ],
  },
];

export const BATCHFILE_AUTOMATION_CHAPTERS = RAW_BATCHFILE_AUTOMATION_CHAPTERS;

export const BATCHFILE_AUTOMATION_LESSONS = BATCHFILE_AUTOMATION_CHAPTERS.flatMap(
  (ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
);

export const BATCHFILE_AUTOMATION_TOTAL_XP = BATCHFILE_AUTOMATION_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
