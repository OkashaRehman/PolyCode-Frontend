// PolyCode — Batchfile Fundamentals interactive course
// 4 chapters · 12 lessons
// Covers the core building blocks of Windows batch scripting (.bat/.cmd):
// running scripts, variables & input, control flow, and practical file/
// process operations — the foundation for the Automation, Windows
// Scripting, and Projects courses that follow in this track.

const ACCENT = "#c5c5c5"; // classic cmd.exe grey

const RAW_BATCHFILE_FUNDAMENTALS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Getting Started
  // ─────────────────────────────────────────────────────────────
  {
    id: "bf-getting-started",
    title: "Getting Started",
    icon: "🖥️",
    color: ACCENT,
    lessons: [
      {
        id: "bff-0",
        title: "Your First Batch File",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A **batch file** is a plain-text script for the Windows command interpreter, `cmd.exe`, saved with a `.bat` or `.cmd` extension. Each line is a command exactly as you'd type it at the command prompt, run top to bottom in order.",
          },
          {
            type: "code",
            lang: "batch",
            label: "hello.bat",
            content: `@echo off
echo Hello from a batch file!
pause`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`@echo off` at the top of a script stops Windows from printing every command before it runs it, so only your actual `echo` output shows. The `@` specifically suppresses that one line too — without it, even 'echo off' itself would print.",
          },
          {
            type: "quiz",
            question: "What does @echo off do at the top of a batch file?",
            options: [
              "Deletes the script after running",
              "Suppresses the command-echoing Windows normally does, so only intended output is shown",
              "Runs the script in the background",
              "Opens a new command prompt window",
            ],
            answer: 1,
            explanation:
              "By default `cmd.exe` echoes each command before executing it. `echo off` turns that behavior off for the rest of the script, and the leading `@` suppresses echoing of that line itself.",
          },
        ],
        challenge: {
          title: "Write a Greeting Script",
          description:
            "Write a batch script that turns command echoing off with `@echo off`, then uses `echo` to print \"Welcome to Batchfile!\".",
          starterCode: `@echo off
REM print "Welcome to Batchfile!"
`,
          solutionCode: `@echo off
echo Welcome to Batchfile!`,
          tests: [
            { id: "t1", label: "Turns off echoing", keywords: ["@echo off"] },
            { id: "t2", label: "Prints the welcome message", keywords: ["echo Welcome to Batchfile!"] },
          ],
        },
      },
      {
        id: "bff-1",
        title: "Comments & Readability",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Batch files use `REM` (short for 'remark') to mark a line as a comment, ignored by the interpreter. A very common alternative is a double colon `::`, which technically works by exploiting how `cmd.exe` parses labels, but is widely used because it's shorter.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Comment styles",
            content: `@echo off
REM This script backs up the Documents folder
:: This is also a comment
echo Starting backup...`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`::` comments can behave unexpectedly inside a block wrapped in parentheses (like an `if` or `for` body), since `cmd.exe` is still trying to interpret it as a label there. Inside such blocks, prefer `REM` for safety.",
          },
          {
            type: "quiz",
            question: "Which statement about batch file comments is most accurate?",
            options: [
              "Only REM is valid; :: always causes an error",
              "REM is the official comment keyword; :: is a widely used shorthand that can misbehave inside parenthesized blocks",
              "Comments are not supported in batch files",
              ":: is faster to execute than REM",
            ],
            answer: 1,
            explanation:
              "REM is the documented, always-safe way to write a comment. `::` works because cmd.exe treats it as an unreachable label, which is fine at the top level of a script but can cause parsing issues inside `(...)` blocks.",
          },
        ],
        challenge: {
          title: "Document Your Script",
          description:
            "Write a script with `@echo off`, a `REM` comment describing what it does, and an `echo` line that prints \"Running setup...\".",
          starterCode: `@echo off
REM describe the script
echo Running setup...
`,
          solutionCode: `@echo off
REM Runs the initial setup routine
echo Running setup...`,
          tests: [
            { id: "t1", label: "Includes a REM comment", keywords: ["REM"] },
            { id: "t2", label: "Prints the setup message", keywords: ["echo Running setup..."] },
          ],
        },
      },
      {
        id: "bff-2",
        title: "Running & Saving Scripts",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Save a script with a `.bat` extension using a plain-text editor (Notepad works fine, but avoid Word). Double-clicking runs it, or you can run it from an existing Command Prompt by typing its name — either way it executes in a `cmd.exe` session.",
          },
          {
            type: "code",
            lang: "batch",
            label: "pause and exit",
            content: `@echo off
echo Task complete.
pause
exit`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`pause` prints \"Press any key to continue . . .\" and waits — essential when double-clicking a script, since the window would otherwise flash and close the instant the script finishes.",
          },
          {
            type: "quiz",
            question: "Why is pause commonly added at the end of a double-clicked batch script?",
            options: [
              "It saves the script automatically",
              "Without it, the console window closes immediately after the script finishes, so output can't be read",
              "It's required syntax for all batch files",
              "It speeds up execution",
            ],
            answer: 1,
            explanation:
              "When a .bat file is double-clicked, Windows opens a console window for it and closes that window the moment the script ends. `pause` holds the window open until a key is pressed.",
          },
        ],
        challenge: {
          title: "End With a Pause",
          description:
            "Write a script that prints \"Task complete.\" and then uses `pause` so the window stays open.",
          starterCode: `@echo off
echo Task complete.
`,
          solutionCode: `@echo off
echo Task complete.
pause`,
          tests: [
            { id: "t1", label: "Prints the completion message", keywords: ["echo Task complete."] },
            { id: "t2", label: "Uses pause", keywords: ["pause"] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Variables & User Input
  // ─────────────────────────────────────────────────────────────
  {
    id: "bf-variables-input",
    title: "Variables & User Input",
    icon: "🔤",
    color: ACCENT,
    lessons: [
      {
        id: "bff-3",
        title: "Setting Variables",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`set` assigns a value to a variable, and `%name%` reads it back anywhere in the script — including inside strings, other commands, or file paths. Batch variables are untyped text by default.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Setting and reading a variable",
            content: `@echo off
set name=Ali
echo Hello, %name%!`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Don't put spaces around the `=` in `set name=Ali` — `set name = Ali` actually creates a variable literally named \"name \" (with a trailing space), which is a classic beginner bug.",
          },
          {
            type: "quiz",
            question: "What does %name% do in a batch script?",
            options: [
              "Declares a new variable named name",
              "Substitutes the current value of the variable name at that point in the script",
              "Deletes the variable name",
              "Comments out the rest of the line",
            ],
            answer: 1,
            explanation:
              "Wrapping a variable name in percent signs tells `cmd.exe` to substitute its current text value in place, similar to string interpolation in other languages.",
          },
        ],
        challenge: {
          title: "Set and Print a Variable",
          description:
            "Set a variable named `city` to \"Rawalpindi\", then echo a greeting using `%city%`.",
          starterCode: `@echo off
REM set city to "Rawalpindi"
REM echo a greeting using %city%
`,
          solutionCode: `@echo off
set city=Rawalpindi
echo Welcome to %city%!`,
          tests: [
            { id: "t1", label: "Sets the city variable", keywords: ["set city="] },
            { id: "t2", label: "Uses %city% in output", keywords: ["%city%"] },
          ],
        },
      },
      {
        id: "bff-4",
        title: "Reading User Input",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`set /p variable=prompt` displays a prompt and waits for the user to type a response, storing it in `variable`. This is the standard way to make an interactive batch script.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Prompting for input",
            content: `@echo off
set /p username=Enter your name: 
echo Hello, %username%! Welcome aboard.`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "The `/p` flag stands for 'prompt' — everything after the `=` on that line becomes the text shown to the user before they type their answer.",
          },
          {
            type: "quiz",
            question: "What does set /p username=Enter your name:  do?",
            options: [
              "Sets username to the literal text \"Enter your name\"",
              "Displays 'Enter your name: ' and stores whatever the user types into username",
              "Reads a file named username",
              "Only works inside a for loop",
            ],
            answer: 1,
            explanation:
              "The `/p` flag makes `set` interactive: it prints everything after the `=` as a prompt, then reads a line of keyboard input into the variable on the left.",
          },
        ],
        challenge: {
          title: "Ask for a Favorite Color",
          description:
            "Use `set /p` to ask the user \"Favorite color: \" storing it in a variable named `color`, then echo it back.",
          starterCode: `@echo off
REM prompt for favorite color into %color%
REM echo it back
`,
          solutionCode: `@echo off
set /p color=Favorite color: 
echo Nice choice: %color%`,
          tests: [
            { id: "t1", label: "Prompts with set /p", keywords: ["set /p color="] },
            { id: "t2", label: "Echoes the color back", keywords: ["%color%"] },
          ],
        },
      },
      {
        id: "bff-5",
        title: "Environment Variables",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Windows exposes system information through built-in **environment variables** like `%USERNAME%`, `%COMPUTERNAME%`, and `%DATE%`. `set` with no arguments lists every variable currently defined in the session, both built-in and custom.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Using built-in variables",
            content: `@echo off
echo Logged in as: %USERNAME%
echo Computer name: %COMPUTERNAME%
echo Today's date: %DATE%`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Variables set inside a script only last for that `cmd.exe` session — closing the window discards them, unlike `setx`, which writes a variable permanently into the user's environment.",
          },
          {
            type: "quiz",
            question: "What's the difference between set and setx for a variable?",
            options: [
              "They're identical",
              "set only affects the current session; setx persists the variable permanently in the user's environment",
              "setx is faster than set",
              "set only works with numbers",
            ],
            answer: 1,
            explanation:
              "`set` is temporary and local to the running `cmd.exe` session. `setx` writes the variable into the Windows registry so it's still available in future sessions (though it doesn't affect the current one until reopened).",
          },
        ],
        challenge: {
          title: "Print System Info",
          description:
            "Write a script that echoes the built-in `%USERNAME%` and `%COMPUTERNAME%` variables, each on its own line.",
          starterCode: `@echo off
REM echo %USERNAME%
REM echo %COMPUTERNAME%
`,
          solutionCode: `@echo off
echo Logged in as: %USERNAME%
echo Computer name: %COMPUTERNAME%`,
          tests: [
            { id: "t1", label: "Uses %USERNAME%", keywords: ["%USERNAME%"] },
            { id: "t2", label: "Uses %COMPUTERNAME%", keywords: ["%COMPUTERNAME%"] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Control Flow
  // ─────────────────────────────────────────────────────────────
  {
    id: "bf-control-flow",
    title: "Control Flow",
    icon: "🔀",
    color: ACCENT,
    lessons: [
      {
        id: "bff-6",
        title: "If / Else Conditions",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`if` compares values and branches the script. String comparisons use `==`, and `else` handles the opposite case. Batch's `if` is case-sensitive by default, so `if \"%x%\"==\"yes\"` won't match \"Yes\" unless you add the `/i` flag.",
          },
          {
            type: "code",
            lang: "batch",
            label: "A simple if/else",
            content: `@echo off
set /p answer=Do you want to continue? (yes/no): 
if /i "%answer%"=="yes" (
    echo Continuing...
) else (
    echo Stopping.
)`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Wrapping compared values in quotes, like `\"%answer%\"==\"yes\"`, protects against a crash if the variable happens to be empty or contains spaces — an unquoted empty variable can turn `if %answer%==yes` into invalid syntax.",
          },
          {
            type: "quiz",
            question: "What does the /i flag do in if /i \"%answer%\"==\"yes\"?",
            options: [
              "Makes the comparison case-insensitive",
              "Inverts the condition",
              "Ignores the variable entirely",
              "Only works with numbers",
            ],
            answer: 0,
            explanation:
              "`/i` tells `if` to compare strings case-insensitively, so \"Yes\", \"YES\", and \"yes\" would all match — without it, the comparison is exact and case-sensitive.",
          },
        ],
        challenge: {
          title: "Check a Password",
          description:
            "Write a script that checks if a variable `pass` (set it to \"secret\") equals \"secret\" using `if`, echoing \"Access granted\" if true and \"Access denied\" in an `else` branch.",
          starterCode: `@echo off
set pass=secret
REM if pass equals "secret", echo "Access granted"
REM else echo "Access denied"
`,
          solutionCode: `@echo off
set pass=secret
if "%pass%"=="secret" (
    echo Access granted
) else (
    echo Access denied
)`,
          tests: [
            { id: "t1", label: "Uses an if comparison", keywords: ["if \"%pass%\"==\"secret\""] },
            { id: "t2", label: "Has an else branch", keywords: ["else"] },
          ],
        },
      },
      {
        id: "bff-7",
        title: "Labels & goto",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A **label** (a line starting with `:`) marks a point in the script, and `goto label` jumps execution there — batch's equivalent of a loop or a menu system, since it predates structured loop keywords.",
          },
          {
            type: "code",
            lang: "batch",
            label: "A simple menu loop with goto",
            content: `@echo off
:menu
echo 1. Say hello
echo 2. Exit
set /p choice=Choose an option: 
if "%choice%"=="1" goto hello
if "%choice%"=="2" goto end
goto menu

:hello
echo Hello there!
goto menu

:end
echo Goodbye!`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`goto :eof` is a common idiom to jump straight to the end of the current script or subroutine — `:eof` is a built-in virtual label meaning 'end of file' that you don't need to write yourself.",
          },
          {
            type: "quiz",
            question: "What does a label like :menu mark in a batch script?",
            options: [
              "A comment that is never executed",
              "A named jump target that goto can transfer control to",
              "A variable declaration",
              "The start of a function with its own scope",
            ],
            answer: 1,
            explanation:
              "A label is purely a marker for `goto` to jump to. Unlike a function, it doesn't create a new scope — variables set before or after a label are all part of the same script-wide state.",
          },
        ],
        challenge: {
          title: "Build a Two-Step Loop",
          description:
            "Write a script with a label `:start` that echoes \"Looping...\" and then `goto start` to build an intentional infinite loop skeleton (don't worry about breaking out of it for this exercise).",
          starterCode: `@echo off
REM label :start
REM echo "Looping..."
REM goto start
`,
          solutionCode: `@echo off
:start
echo Looping...
goto start`,
          tests: [
            { id: "t1", label: "Defines the :start label", keywords: [":start"] },
            { id: "t2", label: "Jumps back with goto", keywords: ["goto start"] },
          ],
        },
      },
      {
        id: "bff-8",
        title: "For Loops",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`for %%x in (set) do command` loops over a list of items, running `command` once per item with `%%x` bound to the current value. Inside a script, the loop variable uses a double percent sign (`%%x`), unlike a regular variable's single percent (`%x%`).",
          },
          {
            type: "code",
            lang: "batch",
            label: "Looping over a list",
            content: `@echo off
for %%day in (Mon Tue Wed Thu Fri) do (
    echo Processing %%day
)`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "The double `%%` is only required *inside a saved .bat file*. If you type the same `for` command directly at an interactive command prompt, you'd use a single `%day`. This trips up a lot of beginners copying commands from the console into a script.",
          },
          {
            type: "quiz",
            question: "Why does the for loop use %%day instead of %day inside a batch file?",
            options: [
              "%%day is just a stylistic preference with no functional difference",
              "Batch files require doubled percent signs for for-loop variables because cmd.exe expands single percents differently when parsing a script",
              "%day would cause a syntax error unrelated to for loops",
              "%%day only works with numbers",
            ],
            answer: 1,
            explanation:
              "Inside a .bat/.cmd file, `cmd.exe` needs the loop variable doubled (`%%day`) to distinguish it from ordinary variable substitution during script parsing. At an interactive prompt (not in a saved script), a single percent is used instead.",
          },
        ],
        challenge: {
          title: "Loop Over Fruits",
          description:
            "Write a `for` loop over the list `(apple banana cherry)` using loop variable `%%f`, echoing \"Fruit: \" followed by each one.",
          starterCode: `@echo off
REM for %%f in (apple banana cherry) do echo "Fruit: %%f"
`,
          solutionCode: `@echo off
for %%f in (apple banana cherry) do (
    echo Fruit: %%f
)`,
          tests: [
            { id: "t1", label: "Loops over the fruit list", keywords: ["for %%f in (apple banana cherry)"] },
            { id: "t2", label: "Echoes each fruit", keywords: ["Fruit: %%f"] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Files, Processes & Exit Codes
  // ─────────────────────────────────────────────────────────────
  {
    id: "bf-files-processes",
    title: "Files, Processes & Exit Codes",
    icon: "📁",
    color: ACCENT,
    lessons: [
      {
        id: "bff-9",
        title: "File & Folder Commands",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Batch scripts wrap the same commands you'd use manually: `mkdir` creates a folder, `copy` duplicates a file, `del` removes one, and `dir` lists a folder's contents. These form the backbone of simple automation scripts (backups, cleanup, setup).",
          },
          {
            type: "code",
            lang: "batch",
            label: "Basic file operations",
            content: `@echo off
mkdir backup
copy report.txt backup\\report.txt
echo Backup complete.`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`del` deletes files immediately and permanently — there's no Recycle Bin step for a batch-script deletion, so scripts that use it should be tested carefully (ideally with `echo` statements in place of the real command first).",
          },
          {
            type: "quiz",
            question: "What does mkdir backup do?",
            options: [
              "Deletes the folder named backup",
              "Creates a new folder named backup in the current directory",
              "Copies a file into a folder named backup",
              "Renames the current folder to backup",
            ],
            answer: 1,
            explanation:
              "`mkdir` (or its alias `md`) creates a new directory with the given name relative to the current working directory.",
          },
        ],
        challenge: {
          title: "Create a Backup Folder",
          description:
            "Write a script that creates a folder named `logs` with `mkdir`, then echoes \"Logs folder ready.\".",
          starterCode: `@echo off
REM create the logs folder
REM echo "Logs folder ready."
`,
          solutionCode: `@echo off
mkdir logs
echo Logs folder ready.`,
          tests: [
            { id: "t1", label: "Creates the logs folder", keywords: ["mkdir logs"] },
            { id: "t2", label: "Confirms with echo", keywords: ["echo Logs folder ready."] },
          ],
        },
      },
      {
        id: "bff-10",
        title: "Calling Other Scripts",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`call other.bat` runs another batch script and, crucially, **returns control** to the current script when it finishes — unlike simply typing `other.bat`, which would hand off control permanently and never come back.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Calling a helper script",
            content: `@echo off
echo Starting main script...
call setup.bat
echo Back in main script after setup.`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "This same `call` distinction matters for labels too: `call :subroutine` jumps to a label and returns on `goto :eof`, letting you write reusable 'functions' within a single batch file.",
          },
          {
            type: "quiz",
            question: "What's the key difference between call other.bat and just running other.bat directly?",
            options: [
              "There is no difference",
              "call returns control to the calling script afterward; running it directly hands off control permanently",
              "call is faster",
              "call only works with .exe files",
            ],
            answer: 1,
            explanation:
              "Without `call`, control transfers to the second script and never comes back to the first. `call` invokes it as a subroutine, so execution resumes on the line after the `call` once the other script finishes.",
          },
        ],
        challenge: {
          title: "Call a Helper Script",
          description:
            "Write a script that echoes \"Starting...\", uses `call` to run \"helper.bat\", then echoes \"Done.\" afterward.",
          starterCode: `@echo off
echo Starting...
REM call helper.bat
echo Done.
`,
          solutionCode: `@echo off
echo Starting...
call helper.bat
echo Done.`,
          tests: [
            { id: "t1", label: "Calls helper.bat", keywords: ["call helper.bat"] },
            { id: "t2", label: "Confirms completion", keywords: ["echo Done."] },
          ],
        },
      },
      {
        id: "bff-11",
        title: "Exit Codes & Error Levels",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Every command sets `%ERRORLEVEL%` when it finishes — `0` conventionally means success, and any nonzero value signals an error. `exit /b N` ends a script (or a `call`ed subroutine) with exit code `N`, which matters for automation pipelines that check whether a step succeeded.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Checking an exit code",
            content: `@echo off
copy report.txt backup\\report.txt
if %ERRORLEVEL% neq 0 (
    echo Copy failed!
    exit /b 1
)
echo Copy succeeded.
exit /b 0`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Check `%ERRORLEVEL%` immediately after the command it refers to — any later command (even a harmless `echo`) can reset it, since every command updates its own exit code.",
          },
          {
            type: "quiz",
            question: "What does exit /b 1 signal to whatever ran this batch script?",
            options: [
              "The script ran successfully",
              "The script exited with a nonzero code, conventionally indicating an error occurred",
              "The script will restart automatically",
              "It has no effect outside the script",
            ],
            answer: 1,
            explanation:
              "`exit /b N` sets the script's exit code to N without closing the whole `cmd.exe` window (the `/b` limits it to the batch file). A nonzero code is the standard convention for signaling failure to any calling process or script.",
          },
        ],
        challenge: {
          title: "Exit With a Status Code",
          description:
            "Write a script that echoes \"All checks passed.\" and then exits with a success code using `exit /b 0`.",
          starterCode: `@echo off
echo All checks passed.
REM exit with code 0
`,
          solutionCode: `@echo off
echo All checks passed.
exit /b 0`,
          tests: [
            { id: "t1", label: "Prints the success message", keywords: ["echo All checks passed."] },
            { id: "t2", label: "Exits with code 0", keywords: ["exit /b 0"] },
          ],
        },
      },
    ],
  },
];

export const BATCHFILE_FUNDAMENTALS_CHAPTERS = RAW_BATCHFILE_FUNDAMENTALS_CHAPTERS;

export const BATCHFILE_FUNDAMENTALS_LESSONS = BATCHFILE_FUNDAMENTALS_CHAPTERS.flatMap(
  (ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
);

export const BATCHFILE_FUNDAMENTALS_TOTAL_XP = BATCHFILE_FUNDAMENTALS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
