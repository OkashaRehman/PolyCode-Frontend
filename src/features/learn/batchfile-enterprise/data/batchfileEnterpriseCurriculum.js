import { createStructuredCourse } from "../../shared/createStructuredCourse";

export const BATCHFILE_ENTERPRISE = createStructuredCourse({
  id: "batchfile-enterprise",
  title: "Batchfile Enterprise Deployment",
  language: "Batchfile",
  description:
    "Build repeatable Windows deployment workflows with preflight checks, controlled rollouts, scheduled execution, and recovery plans.",
  accent: "#0ea5e9",
  basePath: "/learn/batchfile-enterprise",
  readGatePrefix: "batchfile-enterprise",
  backPath: "/language/Batchfile",
  chapters: [
    {
      id: "deployment-design",
      title: "Deployment Design",
      icon: "🧭",
      color: "#0ea5e9",
      topics: [
        {
          id: "configuration",
          title: "Separate Configuration from Script Logic",
          xp: 20,
          overview:
            "Keep environment-specific values such as source paths, target directories, and log locations in one clearly named configuration section. Validate required values before changing a machine so the same script can be reviewed and reused safely.",
          example: `@echo off
set "packageRoot=\\\\fileserver\\releases\\app"
set "installRoot=C:\\Apps\\Example"
set "logRoot=%ProgramData%\\Example\\Logs"
if not exist "%packageRoot%\\setup.exe" (
  echo Required package is missing.
  exit /b 2
)
if not exist "%logRoot%" mkdir "%logRoot%"`,
          note:
            "Configuration still needs validation: a well-named variable can contain an invalid or inaccessible path.",
          quiz: {
            question: "Why keep deployment settings in one configuration section?",
            options: [
              "It centralizes values that vary between environments",
              "It makes all commands run as administrator",
              "It removes the need for error handling",
              "It converts a batch file into a service",
            ],
            answer: 0,
            explanation:
              "Centralized settings make a deployment easier to adapt, inspect, and validate.",
          },
          challenge: {
            title: "Prepare a Deployment",
            description:
              "Choose the first check to make before an install command changes the target machine.",
            question: "What should be validated before the deployment starts?",
            options: [
              "That required package files and configured paths are available",
              "That the desktop wallpaper is set",
              "That the command prompt has a particular window size",
              "That every user is signed out",
            ],
            answer: 0,
          },
        },
        {
          id: "preflight",
          title: "Run Preflight Checks",
          xp: 20,
          overview:
            "A preflight phase verifies prerequisites before making changes: required files exist, the destination is writable, and the caller has the needed rights. Fail early with a clear exit code instead of leaving a half-completed deployment.",
          example: `@echo off
if not exist "%packageRoot%\\setup.exe" exit /b 2
if not exist "%installRoot%" mkdir "%installRoot%"
if errorlevel 1 (
  echo Cannot prepare installation directory.
  exit /b 3
)
echo Preflight checks passed.`,
          note:
            "Test prerequisite checks on a clean machine and on a machine where each prerequisite is deliberately missing.",
          quiz: {
            question: "When should preflight validation happen?",
            options: [
              "Before the script makes deployment changes",
              "Only after a reboot",
              "After deleting the prior installation",
              "Only when the script reports success",
            ],
            answer: 0,
            explanation:
              "Checking up front prevents avoidable partial changes.",
          },
          challenge: {
            title: "Stop Before Partial Changes",
            description:
              "Pick the best response when a required installer is missing.",
            question: "How should a deployment script respond?",
            options: [
              "Skip validation and continue",
              "Report the missing prerequisite and exit with a failure code",
              "Delete the destination",
              "Treat the missing installer as success",
            ],
            answer: 1,
          },
        },
      ],
    },
    {
      id: "rollout-operations",
      title: "Rollout and Operations",
      icon: "🚀",
      color: "#2563eb",
      topics: [
        {
          id: "robocopy-rollout",
          title: "Stage Files with Robocopy",
          xp: 20,
          overview:
            "Robocopy can copy a release tree with retries and a log file. Stage and verify the files before invoking the installer, and interpret Robocopy's documented exit-code ranges rather than assuming any non-zero status is a failure.",
          example: `@echo off
robocopy "%packageRoot%" "%installRoot%\\staging" /E /R:3 /W:5 /LOG+:"%logRoot%\\deploy.log"
set "copyResult=%ERRORLEVEL%"
if %copyResult% GEQ 8 exit /b %copyResult%
call "%installRoot%\\staging\\setup.exe" /quiet
exit /b %ERRORLEVEL%`,
          note:
            "Avoid `/MIR` against a live destination unless deletion behavior is specifically reviewed and intended.",
          quiz: {
            question: "Why stage and verify release files before installing?",
            options: [
              "It separates transfer failures from install failures",
              "It prevents Windows from writing logs",
              "It makes every copy command atomic",
              "It removes the need to check exit codes",
            ],
            answer: 0,
            explanation:
              "A separate staging phase provides a clear checkpoint before installation.",
          },
          challenge: {
            title: "Check the Staging Result",
            description:
              "Choose the next step after Robocopy returns a documented failure code.",
            question: "What should the deployment do?",
            options: [
              "Proceed to install anyway",
              "Stop and report the transfer failure",
              "Delete the source package",
              "Assume the destination is complete",
            ],
            answer: 1,
          },
        },
        {
          id: "scheduled-run",
          title: "Schedule an Unattended Deployment",
          xp: 20,
          overview:
            "Task Scheduler can run deployment scripts in a maintenance window. Use a descriptive task name, an explicit script path, a dedicated service identity where appropriate, and logs that capture output and exit status.",
          example: `schtasks /create /tn "Example-Deployment" ^
  /tr "cmd.exe /c C:\\Ops\\deploy-example.bat" ^
  /sc once /st 23:00 /f
schtasks /query /tn "Example-Deployment" /v /fo list`,
          note:
            "The `/f` flag replaces an existing task of the same name; confirm that replacement is the intended behavior.",
          quiz: {
            question: "What should an unattended scheduled task provide?",
            options: [
              "A known identity, explicit command, and inspectable result",
              "A prompt that waits for an operator",
              "An unquoted script path",
              "A task name shared by unrelated jobs",
            ],
            answer: 0,
            explanation:
              "Clear task configuration and observable outcomes are essential for operations without an interactive user.",
          },
          challenge: {
            title: "Make the Task Observable",
            description:
              "Choose how to verify that a registered deployment task has the expected command and schedule.",
            question: "Which action provides the most useful verification?",
            options: [
              "Query the named task and inspect its details",
              "Assume task creation always succeeds",
              "Delete the task after creation",
              "Close the command prompt",
            ],
            answer: 0,
          },
        },
        {
          id: "rollback",
          title: "Plan Rollback and Recovery",
          xp: 20,
          overview:
            "A deployment plan should define its success signal, backup or previous version, and recovery action before rollout. Preserve the installer's exit code, log every phase, and make rollback an explicit step rather than an improvised response.",
          example: `@echo off
call "%installRoot%\\staging\\setup.exe" /quiet
set "installResult=%ERRORLEVEL%"
if not "%installResult%"=="0" (
  echo Install failed with %installResult%.
  call "%installRoot%\\previous\\restore.bat"
  exit /b %installResult%
)
echo Deployment completed.`,
          note:
            "Recovery scripts need the same path validation and access controls as installation scripts.",
          quiz: {
            question: "When should rollback conditions be defined?",
            options: [
              "Before rollout begins",
              "Only after a failed production deployment",
              "After deleting the previous version",
              "Only when a user reports a problem",
            ],
            answer: 0,
            explanation:
              "Predefined recovery criteria reduce guesswork during an incident.",
          },
          challenge: {
            title: "Choose a Recovery Plan",
            description:
              "Identify the deployment practice that best supports a controlled recovery.",
            question: "Which approach is most reliable?",
            options: [
              "Define rollback criteria and preserve the previous version",
              "Delete backups to avoid confusion",
              "Ignore installer exit codes",
              "Retry indefinitely without logging",
            ],
            answer: 0,
          },
        },
        {
          id: "handoff",
          title: "Document the Operational Handoff",
          xp: 20,
          overview:
            "A deployment handoff tells the next operator which version was installed, where logs and artifacts live, what exit codes mean, and how to pause or recover the rollout. Documentation should match the script and be updated with each release.",
          example: `REM Release: 2.4.1
REM Entry point: C:\\Ops\\deploy-example.bat
REM Logs: %ProgramData%\\Example\\Logs\\deploy.log
REM Exit 0 = success; non-zero = review log and follow rollback guide.`,
          note:
            "A short runbook paired with useful logs is more actionable than a long description that omits recovery steps.",
          quiz: {
            question: "What is most useful in a deployment runbook?",
            options: [
              "Version, logs, exit-code meaning, and recovery steps",
              "Only the author's name",
              "A copy of every system password",
              "A list of unrelated Windows commands",
            ],
            answer: 0,
            explanation:
              "Operators need to identify the release, diagnose the result, and know the next safe action.",
          },
          challenge: {
            title: "Complete the Handoff",
            description:
              "Select the documentation item an on-call operator needs after a failed run.",
            question: "Which detail directly supports diagnosis and recovery?",
            options: [
              "Where to find the log and how to roll back",
              "The author's favorite editor",
              "The color scheme of the script",
              "A list of unused variables",
            ],
            answer: 0,
          },
        },
      ],
    },
  ],
});

export const BATCHFILE_ENTERPRISE_CHAPTERS = BATCHFILE_ENTERPRISE.chapters;
export const BATCHFILE_ENTERPRISE_LESSONS = BATCHFILE_ENTERPRISE.lessons;
export const BATCHFILE_ENTERPRISE_TOTAL_XP = BATCHFILE_ENTERPRISE.totalXP;
