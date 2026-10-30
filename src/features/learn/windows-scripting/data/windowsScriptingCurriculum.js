// PolyCode — Windows Scripting interactive course
// 4 chapters · 12 lessons
// Goes beyond core Batchfile syntax into the Windows-specific command-line
// tools scripts actually lean on: inspecting system state, reading and
// writing the registry, diagnosing networking, and managing services and
// user accounts — the toolkit behind real admin/ops scripts.

const ACCENT = "#0ea5e9";

const RAW_WINDOWS_SCRIPTING_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — System Information & Processes
  // ─────────────────────────────────────────────────────────────
  {
    id: "ws-system-processes",
    title: "System Information & Processes",
    icon: "🖥️",
    color: ACCENT,
    lessons: [
      {
        id: "ws-0",
        title: "Querying System Info",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`systeminfo` prints a detailed report about the machine — OS version, install date, memory, patches — while `hostname` and `ver` give quick single-line answers. Scripts use these to check whether a machine meets requirements before doing something else.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Gathering basic system facts",
            content: `@echo off
hostname
ver
systeminfo | findstr /c:"Total Physical Memory"`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Piping `systeminfo`'s full output through `findstr /c:\"...\"` filters it down to just the line(s) containing that exact phrase — a common pattern for pulling one fact out of a verbose command's output.",
          },
          {
            type: "quiz",
            question: "What does findstr /c:\"Total Physical Memory\" do when piped after systeminfo?",
            options: [
              "It deletes memory information",
              "It filters systeminfo's output down to lines containing that exact phrase",
              "It counts how much memory is installed",
              "It runs systeminfo faster",
            ],
            answer: 1,
            explanation:
              "`/c:\"...\"` tells findstr to search for that literal string as a whole phrase. Piped after a verbose command like systeminfo, it's a simple way to extract just the relevant line(s).",
          },
        ],
        challenge: {
          title: "Print the Hostname and OS Version",
          description:
            "Write a script that echoes the computer's hostname using `hostname`, then prints the OS version with `ver`.",
          starterCode: `@echo off
REM print hostname
REM print ver
`,
          solutionCode: `@echo off
hostname
ver`,
          tests: [
            { id: "t1", label: "Prints the hostname", keywords: ["hostname"] },
            { id: "t2", label: "Prints the OS version", keywords: ["ver"] },
          ],
        },
      },
      {
        id: "ws-1",
        title: "Listing & Filtering Processes",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`tasklist` lists every running process, and piping it through `findstr` narrows that down to processes matching a name — the first step before deciding whether (and how) to act on a specific one.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Checking if a process is running",
            content: `@echo off
tasklist | findstr /i "notepad.exe"
if %ERRORLEVEL%==0 (
    echo Notepad is running.
) else (
    echo Notepad is not running.
)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`findstr` sets `%ERRORLEVEL%` to `0` if it found a match and `1` if it found nothing — which is why this pattern works as a presence check, not just a display filter.",
          },
          {
            type: "quiz",
            question: "Why does checking %ERRORLEVEL% after findstr work as a presence check here?",
            options: [
              "findstr always returns 0",
              "findstr sets ERRORLEVEL to 0 when it finds a match and a nonzero value when it finds nothing",
              "ERRORLEVEL is unrelated to findstr's result",
              "tasklist sets the ERRORLEVEL, not findstr",
            ],
            answer: 1,
            explanation:
              "Like most command-line search tools, findstr communicates success (a match was found) through its exit code — 0 for at least one match, nonzero when nothing matched — which if/else can check directly.",
          },
        ],
        challenge: {
          title: "Check if a Process Is Running",
          description:
            "Write a script that pipes `tasklist` through `findstr /i \"chrome.exe\"`, then checks `%ERRORLEVEL%` and echoes \"Chrome is running.\" if found, else \"Chrome is not running.\".",
          starterCode: `@echo off
REM tasklist | findstr /i "chrome.exe"
REM check ERRORLEVEL and echo the result
`,
          solutionCode: `@echo off
tasklist | findstr /i "chrome.exe"
if %ERRORLEVEL%==0 (
    echo Chrome is running.
) else (
    echo Chrome is not running.
)`,
          tests: [
            { id: "t1", label: "Filters tasklist for chrome.exe", keywords: ["tasklist | findstr /i \"chrome.exe\""] },
            { id: "t2", label: "Branches on ERRORLEVEL", keywords: ["if %ERRORLEVEL%==0"] },
          ],
        },
      },
      {
        id: "ws-2",
        title: "Ending Processes",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`taskkill /im name.exe /f` force-terminates every process matching that image name. Scripts often use this before starting an update or reinstall, to make sure the target application isn't locking its own files.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Force-closing an app before updating it",
            content: `@echo off
echo Closing MyApp before update...
taskkill /im myapp.exe /f
echo Proceeding with update.`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`taskkill` returns a nonzero exit code if no matching process was found — which is completely fine in a 'close it if it's running' script, but worth remembering if you're chaining `&&` after it expecting success every time.",
          },
          {
            type: "quiz",
            question: "What does taskkill /im myapp.exe /f do?",
            options: [
              "Renames myapp.exe",
              "Force-terminates every running process with the image name myapp.exe",
              "Prevents myapp.exe from ever running again",
              "Only works on one instance, ignoring duplicates",
            ],
            answer: 1,
            explanation:
              "`/im` targets processes by image (executable) name rather than process ID, and `/f` forces termination immediately rather than requesting a graceful close — useful for stopping every matching instance in one command.",
          },
        ],
        challenge: {
          title: "Force-Close an App",
          description:
            "Write a script that echoes \"Closing MyApp...\", force-terminates `myapp.exe` with `taskkill`, then echoes \"Done.\".",
          starterCode: `@echo off
echo Closing MyApp...
REM taskkill /im myapp.exe /f
echo Done.
`,
          solutionCode: `@echo off
echo Closing MyApp...
taskkill /im myapp.exe /f
echo Done.`,
          tests: [
            { id: "t1", label: "Force-kills myapp.exe", keywords: ["taskkill /im myapp.exe /f"] },
            { id: "t2", label: "Confirms completion", keywords: ["echo Done."] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Registry & Configuration
  // ─────────────────────────────────────────────────────────────
  {
    id: "ws-registry-config",
    title: "Registry & Configuration",
    icon: "⚙️",
    color: ACCENT,
    lessons: [
      {
        id: "ws-3",
        title: "Reading the Registry",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`reg query` reads a value from the Windows Registry — the central configuration database for the OS and installed software. Scripts commonly use it to check installed software versions, or to read settings before deciding how to behave.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Reading the Windows version from the registry",
            content: `reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v ProductName`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Registry paths are a common source of typos in batch scripts — a single wrong backslash or subkey name fails silently with a generic 'unable to find' message rather than a clear syntax error, so double-check paths carefully.",
          },
          {
            type: "quiz",
            question: "What does the /v flag specify in a reg query command?",
            options: [
              "The registry hive to search",
              "The specific value name to read within the given registry key",
              "Verbose output mode",
              "The version of Windows",
            ],
            answer: 1,
            explanation:
              "`/v` names the specific value inside the registry key to retrieve — here, `ProductName` within the `CurrentVersion` key — as opposed to listing every value under that key.",
          },
        ],
        challenge: {
          title: "Query the Product Name",
          description:
            "Write a `reg query` command reading the `ProductName` value from `HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion`.",
          starterCode: `REM reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v ...
`,
          solutionCode: `reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v ProductName`,
          tests: [
            { id: "t1", label: "Queries the CurrentVersion key", keywords: ["reg query \"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\""] },
            { id: "t2", label: "Targets the ProductName value", keywords: ["/v ProductName"] },
          ],
        },
      },
      {
        id: "ws-4",
        title: "Writing Registry Values",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`reg add` creates or updates a registry value, specifying its type with `/t` (e.g. `REG_SZ` for a string, `REG_DWORD` for a number) and its data with `/d`. This is how setup scripts configure application settings without a GUI.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Setting a custom registry value",
            content: `reg add "HKCU\\Software\\MyApp" /v FirstRun /t REG_DWORD /d 0 /f`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Editing the registry incorrectly can break Windows or an application, and there's no undo for a bad `reg add`/`reg delete` — always double-check the key path and back up (`reg export`) before scripting registry writes that touch anything important.",
          },
          {
            type: "quiz",
            question: "What does /t REG_DWORD specify in a reg add command?",
            options: [
              "The registry key's permissions",
              "The data type of the value being written — here, a 32-bit number",
              "The timeout for the operation",
              "The target registry hive",
            ],
            answer: 1,
            explanation:
              "`/t` sets the value's type. `REG_DWORD` is a 32-bit numeric type, while `REG_SZ` would be used for a plain string — the registry is strongly typed, unlike batch variables.",
          },
        ],
        challenge: {
          title: "Write a Registry Value",
          description:
            "Write a `reg add` command setting a `REG_DWORD` value named `Enabled` to `1` under `HKCU\\Software\\MyApp`, forcing overwrite with `/f`.",
          starterCode: `REM reg add "HKCU\\Software\\MyApp" /v Enabled /t REG_DWORD /d 1 ...
`,
          solutionCode: `reg add "HKCU\\Software\\MyApp" /v Enabled /t REG_DWORD /d 1 /f`,
          tests: [
            { id: "t1", label: "Sets the Enabled DWORD value", keywords: ["/v Enabled /t REG_DWORD /d 1"] },
            { id: "t2", label: "Forces the write", keywords: ["/f"] },
          ],
        },
      },
      {
        id: "ws-5",
        title: "Persisting Environment Variables",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`setx` writes an environment variable permanently (into the registry, under the hood), unlike `set`, which only lasts for the current session. This is how a setup script can make a variable available to every future command prompt.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Setting a persistent environment variable",
            content: `setx APP_HOME "C:\\Program Files\\MyApp"
echo APP_HOME has been set permanently.`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "A variable set with `setx` isn't available in the *current* console session — only in new ones opened afterward. Scripts that need the value immediately should still `set` it locally in addition to persisting it with `setx`.",
          },
          {
            type: "quiz",
            question: "Why might a script use both set and setx for the same variable?",
            options: [
              "It's redundant and never necessary",
              "set makes the value available immediately in the current session, while setx persists it for future sessions",
              "setx is faster than set",
              "set only works with numbers",
            ],
            answer: 1,
            explanation:
              "`setx` writes the variable to the registry for future sessions but doesn't affect the currently running console. Using `set` alongside it makes the value usable right away, in the same script run.",
          },
        ],
        challenge: {
          title: "Persist an Application Path",
          description:
            "Write a script that uses `setx` to permanently set `APP_HOME` to \"C:\\Apps\\MyApp\", then echoes \"APP_HOME has been set permanently.\".",
          starterCode: `REM setx APP_HOME "C:\\Apps\\MyApp"
echo APP_HOME has been set permanently.
`,
          solutionCode: `setx APP_HOME "C:\\Apps\\MyApp"
echo APP_HOME has been set permanently.`,
          tests: [
            { id: "t1", label: "Persists APP_HOME with setx", keywords: ["setx APP_HOME \"C:\\Apps\\MyApp\""] },
            { id: "t2", label: "Confirms the change", keywords: ["echo APP_HOME has been set permanently."] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Networking Commands
  // ─────────────────────────────────────────────────────────────
  {
    id: "ws-networking",
    title: "Networking Commands",
    icon: "🌐",
    color: ACCENT,
    lessons: [
      {
        id: "ws-6",
        title: "Checking Network Configuration",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`ipconfig` shows the machine's network configuration — IP address, subnet mask, default gateway. `ipconfig /all` gives a much more detailed report including DNS servers and adapter MAC addresses, useful for diagnostic scripts.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Extracting the IP address",
            content: `@echo off
ipconfig | findstr /c:"IPv4 Address"`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "On a machine with multiple network adapters (Wi-Fi and Ethernet, or several virtual adapters), this simple filter returns one line per adapter — a script that needs exactly one IP would need extra logic to pick the right one.",
          },
          {
            type: "quiz",
            question: "What's the difference between ipconfig and ipconfig /all?",
            options: [
              "They are identical",
              "ipconfig shows a basic summary (IP, gateway, mask); /all adds detail like DNS servers and adapter MAC addresses",
              "ipconfig /all only works on servers",
              "ipconfig /all resets the network adapter",
            ],
            answer: 1,
            explanation:
              "Plain `ipconfig` gives a compact summary per adapter. Adding `/all` expands that to a full diagnostic report, including DNS server addresses, DHCP lease info, and each adapter's physical (MAC) address.",
          },
        ],
        challenge: {
          title: "Extract the IP Address",
          description:
            "Write a script that pipes `ipconfig` through `findstr /c:\"IPv4 Address\"` to show just the IP address line(s).",
          starterCode: `@echo off
REM ipconfig | findstr /c:"IPv4 Address"
`,
          solutionCode: `@echo off
ipconfig | findstr /c:"IPv4 Address"`,
          tests: [
            { id: "t1", label: "Filters ipconfig output", keywords: ["ipconfig | findstr /c:\"IPv4 Address\""] },
          ],
        },
      },
      {
        id: "ws-7",
        title: "Testing Connectivity",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`ping -n 1 host` sends a single ICMP probe to check whether a host is reachable, and its exit code (0 = reachable, nonzero = not) makes it easy to script a connectivity check before attempting something that needs the network.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Checking connectivity before continuing",
            content: `@echo off
ping -n 1 8.8.8.8 >nul
if %ERRORLEVEL%==0 (
    echo Internet connection detected.
) else (
    echo No internet connection.
    exit /b 1
)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`>nul` discards ping's normal output so only the intended echo messages show — a common pattern any time a script cares about a command's exit code but not its printed output.",
          },
          {
            type: "quiz",
            question: "What does -n 1 do in ping -n 1 8.8.8.8?",
            options: [
              "Pings continuously forever",
              "Sends exactly 1 echo request instead of the default 4",
              "Sets a 1-second timeout",
              "Pings the local network only",
            ],
            answer: 1,
            explanation:
              "`-n` sets the number of echo requests to send. `-n 1` sends just one probe, which is enough for a quick scripted reachability check without waiting for the default four.",
          },
        ],
        challenge: {
          title: "Check for Internet Connectivity",
          description:
            "Write a script that pings \"8.8.8.8\" once with `ping -n 1 8.8.8.8 >nul`, then checks `%ERRORLEVEL%` to echo either \"Internet connection detected.\" or \"No internet connection.\".",
          starterCode: `@echo off
REM ping -n 1 8.8.8.8 >nul
REM check ERRORLEVEL and echo the result
`,
          solutionCode: `@echo off
ping -n 1 8.8.8.8 >nul
if %ERRORLEVEL%==0 (
    echo Internet connection detected.
) else (
    echo No internet connection.
)`,
          tests: [
            { id: "t1", label: "Pings once, discarding output", keywords: ["ping -n 1 8.8.8.8 >nul"] },
            { id: "t2", label: "Branches on ERRORLEVEL", keywords: ["if %ERRORLEVEL%==0"] },
          ],
        },
      },
      {
        id: "ws-8",
        title: "Inspecting Active Connections",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`netstat -an` lists every active network connection and listening port on the machine, in numeric form. Piped through `findstr`, it's a fast way to check whether a specific service's port is actually listening.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Checking if a port is listening",
            content: `@echo off
netstat -an | findstr ":443"`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "The `-a` flag shows all connections and listening ports, and `-n` keeps addresses and ports numeric instead of resolving hostnames — which also makes the command run noticeably faster, since it skips DNS lookups.",
          },
          {
            type: "quiz",
            question: "Why does netstat -an run faster than plain netstat -a?",
            options: [
              "It shows fewer connections",
              "The -n flag skips DNS hostname resolution, keeping addresses numeric",
              "It only checks one port",
              "There is no difference in speed",
            ],
            answer: 1,
            explanation:
              "Without `-n`, netstat tries to resolve every IP address to a hostname via DNS, which is slow. `-n` keeps everything numeric, avoiding that lookup entirely.",
          },
        ],
        challenge: {
          title: "Check if a Port Is Listening",
          description:
            "Write a script that pipes `netstat -an` through `findstr` to check for connections on port \"8080\".",
          starterCode: `@echo off
REM netstat -an | findstr ":8080"
`,
          solutionCode: `@echo off
netstat -an | findstr ":8080"`,
          tests: [
            { id: "t1", label: "Filters netstat for port 8080", keywords: ["netstat -an | findstr \":8080\""] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Services & Users
  // ─────────────────────────────────────────────────────────────
  {
    id: "ws-services-users",
    title: "Services & Users",
    icon: "🛡️",
    color: ACCENT,
    lessons: [
      {
        id: "ws-9",
        title: "Managing Windows Services",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`sc query` checks a Windows service's current state, and `sc start`/`sc stop` control it directly from a script — the command-line equivalent of the Services management console, useful for restarting a hung service automatically.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Restarting a service",
            content: `@echo off
sc stop Spooler
timeout /t 5 /nobreak >nul
sc start Spooler
echo Print spooler restarted.`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "`sc stop` returns immediately after *requesting* the stop — the service may still be shutting down when the next line runs. `timeout /t 5` here gives it a moment before `sc start` tries to bring it back up.",
          },
          {
            type: "quiz",
            question: "Why does the script pause with timeout /t 5 between sc stop and sc start?",
            options: [
              "It's purely cosmetic and has no functional purpose",
              "sc stop returns before the service has fully shut down, so a brief pause avoids racing the start command against an in-progress stop",
              "Windows requires a mandatory 5-second wait between all sc commands",
              "It slows down the script for readability only",
            ],
            answer: 1,
            explanation:
              "`sc stop` is asynchronous — it signals the service to stop and returns immediately, before the stop necessarily completes. A short pause reduces the chance of `sc start` running while the service is still mid-shutdown.",
          },
        ],
        challenge: {
          title: "Restart a Service",
          description:
            "Write a script that stops a service named \"Spooler\" with `sc stop`, pauses 5 seconds with `timeout /t 5 /nobreak >nul`, then starts it again with `sc start`.",
          starterCode: `@echo off
REM sc stop Spooler
REM timeout /t 5 /nobreak >nul
REM sc start Spooler
`,
          solutionCode: `@echo off
sc stop Spooler
timeout /t 5 /nobreak >nul
sc start Spooler`,
          tests: [
            { id: "t1", label: "Stops the Spooler service", keywords: ["sc stop Spooler"] },
            { id: "t2", label: "Starts it again after a pause", keywords: ["timeout /t 5", "sc start Spooler"] },
          ],
        },
      },
      {
        id: "ws-10",
        title: "Managing User Accounts",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "`net user` creates, modifies, or lists local user accounts, and `net localgroup` manages group membership (like adding a user to Administrators) — the scriptable equivalent of the Local Users and Groups console, common in machine setup scripts.",
          },
          {
            type: "code",
            lang: "batch",
            label: "Creating a local account",
            content: `net user TempAdmin P@ssw0rd123 /add
net localgroup Administrators TempAdmin /add
echo TempAdmin account created and added to Administrators.`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Hardcoding a password directly in a plain-text batch script (as shown here for illustration) is a real security risk in practice — production setup scripts typically prompt for the password with `set /p`, or pull it from a secrets vault instead.",
          },
          {
            type: "quiz",
            question: "What does net localgroup Administrators TempAdmin /add do?",
            options: [
              "Creates a new user named TempAdmin",
              "Adds the existing user TempAdmin to the local Administrators group",
              "Deletes the Administrators group",
              "Renames the Administrators group to TempAdmin",
            ],
            answer: 1,
            explanation:
              "`net localgroup <group> <user> /add` adds an existing user account to a local group. This example grants TempAdmin administrator privileges by adding it to the built-in Administrators group.",
          },
        ],
        challenge: {
          title: "Add a User to a Group",
          description:
            "Write a `net localgroup` command that adds a user named \"ServiceAccount\" to the local group \"Users\".",
          starterCode: `REM net localgroup Users ServiceAccount /add
`,
          solutionCode: `net localgroup Users ServiceAccount /add`,
          tests: [
            { id: "t1", label: "Adds ServiceAccount to the Users group", keywords: ["net localgroup Users ServiceAccount /add"] },
          ],
        },
      },
      {
        id: "ws-11",
        title: "Building a System Health Check",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A real admin script combines everything in this course: checking a service's state, verifying connectivity, and logging the result — a compact 'is this machine healthy?' check that could run on a schedule (tying back to what you built in Batchfile Automation).",
          },
          {
            type: "code",
            lang: "batch",
            label: "A simple health check script",
            content: `@echo off
echo [%date% %time%] Health check starting >> health.log

sc query Spooler | findstr "RUNNING" >nul
if %ERRORLEVEL% neq 0 (
    echo [%date% %time%] Spooler service is NOT running >> health.log
) else (
    echo [%date% %time%] Spooler service is running >> health.log
)

ping -n 1 8.8.8.8 >nul
if %ERRORLEVEL% neq 0 (
    echo [%date% %time%] No internet connectivity >> health.log
    exit /b 1
) else (
    echo [%date% %time%] Internet connectivity OK >> health.log
)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Piping `sc query`'s output through `findstr \"RUNNING\"` turns a multi-line status report into a simple presence check, the same pattern used earlier for `tasklist` — one small technique reused across very different commands.",
          },
          {
            type: "quiz",
            question: "What's the overall purpose of combining sc query, ping, and logging in one script?",
            options: [
              "To slow down the machine intentionally",
              "To build an automated health check that verifies key services and connectivity, recording the result for later review",
              "To permanently disable the Spooler service",
              "It has no practical automation use case",
            ],
            answer: 1,
            explanation:
              "This is the payoff of the whole course: individually simple commands (service status, connectivity check, timestamped logging) combine into a genuinely useful unattended health-check script, ready to be scheduled with schtasks.",
          },
        ],
        challenge: {
          title: "Write a Health Check Log Entry",
          description:
            "Write a script that pipes `sc query Spooler` through `findstr \"RUNNING\"`, then logs either \"Spooler service is running\" or \"Spooler service is NOT running\" (with a timestamp) to \"health.log\".",
          starterCode: `@echo off
REM sc query Spooler | findstr "RUNNING" >nul
REM check ERRORLEVEL and log the result with a timestamp to health.log
`,
          solutionCode: `@echo off
sc query Spooler | findstr "RUNNING" >nul
if %ERRORLEVEL% neq 0 (
    echo [%date% %time%] Spooler service is NOT running >> health.log
) else (
    echo [%date% %time%] Spooler service is running >> health.log
)`,
          tests: [
            { id: "t1", label: "Checks the Spooler service state", keywords: ["sc query Spooler | findstr \"RUNNING\""] },
            { id: "t2", label: "Logs a timestamped result", keywords: ["%date% %time%", ">> health.log"] },
          ],
        },
      },
    ],
  },
];

export const WINDOWS_SCRIPTING_CHAPTERS = RAW_WINDOWS_SCRIPTING_CHAPTERS;

export const WINDOWS_SCRIPTING_LESSONS = WINDOWS_SCRIPTING_CHAPTERS.flatMap(
  (ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
);

export const WINDOWS_SCRIPTING_TOTAL_XP = WINDOWS_SCRIPTING_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
