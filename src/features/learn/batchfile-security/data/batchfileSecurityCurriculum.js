import { createStructuredCourse } from "../../shared/createStructuredCourse";

export const BATCHFILE_SECURITY = createStructuredCourse({
  id: "batchfile-security",
  title: "Batchfile Security & Reliability",
  language: "Batchfile",
  description:
    "Harden everyday Windows scripts with safer input handling, predictable failures, careful file operations, and useful audit logs.",
  accent: "#f59e0b",
  basePath: "/learn/batchfile-security",
  readGatePrefix: "batchfile-security",
  backPath: "/language/Batchfile",
  chapters: [
    {
      id: "defensive-input",
      title: "Defensive Inputs and Paths",
      icon: "🛡️",
      color: "#f59e0b",
      topics: [
        {
          id: "input-boundaries",
          title: "Validate User Input",
          xp: 20,
          overview:
            "Batch variables are expanded into command text, so untrusted input can change how a command is parsed. Validate choices against an allowlist before using them in file or system commands.",
          example: `@echo off
set /p "choice=Choose a mode (backup/restore): "
if /i "%choice%"=="backup" goto backup
if /i "%choice%"=="restore" goto restore
echo Invalid mode.
exit /b 2
:backup
echo Starting backup
exit /b 0
:restore
echo Starting restore
exit /b 0`,
          note:
            "Prefer a small allowlist of known values over trying to remove every potentially dangerous character.",
          quiz: {
            question: "What is the safest way to accept a mode from a user?",
            options: [
              "Pass the value directly to a command",
              "Allow only the expected values and reject everything else",
              "Remove spaces and assume the rest is safe",
              "Disable command extensions",
            ],
            answer: 1,
            explanation:
              "An allowlist limits the value to choices the script explicitly supports.",
          },
          challenge: {
            title: "Choose the Safe Input Rule",
            description:
              "Select the rule that prevents unexpected input from changing the script's behavior.",
            question: "Which rule should gate a destructive action?",
            options: [
              "Accept any non-empty string",
              "Check the choice against permitted values before continuing",
              "Echo the value and continue regardless",
              "Use the value as part of a command without quotes",
            ],
            answer: 1,
          },
        },
        {
          id: "quote-paths",
          title: "Quote Paths and Handle Special Characters",
          xp: 20,
          overview:
            "Paths with spaces must be quoted whenever they are expanded. Keep `set` assignments in the `set \"name=value\"` form to avoid trailing spaces, and use delayed expansion deliberately when values may contain exclamation marks.",
          example: `@echo off
set "source=C:\\Program Files\\Reports"
set "destination=D:\\Daily Backup"
if not exist "%destination%" mkdir "%destination%"
robocopy "%source%" "%destination%" *.csv /E`,
          note:
            "Delayed expansion can corrupt values containing `!`; do not enable it globally when processing arbitrary file names.",
          quiz: {
            question: "Why quote a variable that contains a file path?",
            options: [
              "Quotes make the command run asynchronously",
              "Quotes keep spaces in the path from splitting command arguments",
              "Quotes convert a relative path to an absolute path",
              "Quotes enable delayed expansion",
            ],
            answer: 1,
            explanation:
              "Quoting keeps a path such as `C:\\Program Files` as one argument.",
          },
          challenge: {
            title: "Protect a Path Argument",
            description:
              "Choose the safe command form for copying from a path that may contain spaces.",
            question: "Which form preserves the source path as one argument?",
            options: [
              "copy %source% %destination%",
              "copy \"%source%\" \"%destination%\"",
              "copy %source% \"%destination%",
              "copy %source%+%destination%",
            ],
            answer: 1,
          },
        },
      ],
    },
    {
      id: "reliable-operations",
      title: "Reliable Operations",
      icon: "⚙️",
      color: "#dc2626",
      topics: [
        {
          id: "check-errorlevel",
          title: "Check Exit Codes",
          xp: 20,
          overview:
            "External commands report success or failure through `ERRORLEVEL`. Check it immediately after the command you care about; later commands can replace the result and make recovery logic misleading.",
          example: `@echo off
robocopy "C:\\Data" "D:\\Backup" /E
set "copyResult=%ERRORLEVEL%"
if %copyResult% GEQ 8 (
  echo Copy failed with code %copyResult%.
  exit /b %copyResult%
)
echo Copy completed.`,
          note:
            "Robocopy uses several non-zero codes for successful copies and differences; interpret its documented code ranges instead of treating every non-zero result as failure.",
          quiz: {
            question: "When should a script capture a command's exit code?",
            options: [
              "Immediately after that command runs",
              "At the end of the script",
              "Only after an echo command",
              "Before the command starts",
            ],
            answer: 0,
            explanation:
              "Capturing the status right away avoids losing it to a later command.",
          },
          challenge: {
            title: "Keep the Original Status",
            description:
              "Choose how to preserve a failing command's result before writing a log message.",
            question: "What should the script do before running another command?",
            options: [
              "Capture `%ERRORLEVEL%` in a variable",
              "Set `ERRORLEVEL` to zero",
              "Run the command a second time",
              "Pause and wait for input",
            ],
            answer: 0,
          },
        },
        {
          id: "cleanup-temporary",
          title: "Use Safe Cleanup and Exit Paths",
          xp: 20,
          overview:
            "Temporary work should live in a dedicated directory created by the script. Validate that directory before cleanup, quote the path, and centralize cleanup so both success and failure paths release temporary files.",
          example: `@echo off
set "work=%TEMP%\\report-work"
if not exist "%work%" mkdir "%work%"
call :build_report "%work%"
set "result=%ERRORLEVEL%"
if exist "%work%\\" rmdir /s /q "%work%"
exit /b %result%

:build_report
REM Build output under the supplied working directory.
exit /b 0`,
          note:
            "Never construct a recursive-delete target from unchecked user input; an empty or malformed path can make cleanup destructive.",
          quiz: {
            question: "What is the key guard before recursive cleanup?",
            options: [
              "Confirm the target is the script's dedicated temporary directory",
              "Add `/f` to every delete command",
              "Use an unquoted path",
              "Delete the parent directory first",
            ],
            answer: 0,
            explanation:
              "A known, script-owned temporary path limits cleanup to intended files.",
          },
          challenge: {
            title: "Select a Safe Cleanup Target",
            description:
              "Identify the cleanup target that has a clear, script-owned boundary.",
            question: "Which target is safest for recursive cleanup?",
            options: [
              "The current directory from an unchecked prompt",
              "A dedicated temporary subdirectory created by this script",
              "The value of `%USERPROFILE%`",
              "The drive root",
            ],
            answer: 1,
          },
        },
        {
          id: "audit-logs",
          title: "Create Useful Audit Logs",
          xp: 20,
          overview:
            "A reliable log records when the task ran, what action was attempted, and the final result. Append output rather than overwriting it, keep sensitive values out of logs, and return a meaningful exit code to callers.",
          example: `@echo off
set "log=%ProgramData%\\Ops\\cleanup.log"
if not exist "%ProgramData%\\Ops" mkdir "%ProgramData%\\Ops"
echo [%DATE% %TIME%] Cleanup started>>"%log%"
call cleanup-work.bat >>"%log%" 2>&1
set "result=%ERRORLEVEL%"
echo [%DATE% %TIME%] Cleanup exit code %result%>>"%log%"
exit /b %result%`,
          note:
            "Logs should help diagnose failures without recording passwords, tokens, or private user data.",
          quiz: {
            question: "Which information makes an operational log most useful?",
            options: [
              "Timestamps, action names, and outcomes",
              "Passwords and access tokens",
              "Only the script's file name",
              "Every environment variable",
            ],
            answer: 0,
            explanation:
              "Timestamps and outcomes make events traceable while avoiding unnecessary secrets.",
          },
          challenge: {
            title: "Choose the Audit Record",
            description:
              "Pick the log entry that gives an operator useful context without exposing credentials.",
            question: "Which entry is the best audit record?",
            options: [
              "Started at 02:00; cleanup exit code 0",
              "Password used: (secret)",
              "Done",
              "All environment variables: ...",
            ],
            answer: 0,
          },
        },
      ],
    },
  ],
});

export const BATCHFILE_SECURITY_CHAPTERS = BATCHFILE_SECURITY.chapters;
export const BATCHFILE_SECURITY_LESSONS = BATCHFILE_SECURITY.lessons;
export const BATCHFILE_SECURITY_TOTAL_XP = BATCHFILE_SECURITY.totalXP;
