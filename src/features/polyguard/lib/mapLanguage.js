const LANGUAGE_ALIASES = {
  js: "javascript",
  ts: "typescript",
  typescript: "javascript",
  py: "python",
  "c++": "cpp",
  cxx: "cpp",
  "c#": "csharp",
  cs: "csharp",
  shell: "bash",
  sh: "bash",
  ps1: "powershell",
  md: "markdown",
};

export function toPolyGuardLanguage(language = "python") {
  const raw = String(language || "python").trim().toLowerCase();
  const normalized = LANGUAGE_ALIASES[raw] || raw;
  return normalized || "python";
}
