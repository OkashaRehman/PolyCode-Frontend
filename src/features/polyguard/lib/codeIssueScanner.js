/**
 * Scan full source for lesson/correctness issues (not limited to first runtime error).
 */

const PANDAS_METHODS = "DataFrame|Series|read_csv|read_excel|concat|merge|to_csv";

function lineAt(code, lineIndex) {
  return lineIndex + 1;
}

function collectAssignedNames(lines) {
  const names = new Set();
  lines.forEach((line) => {
    const match = line.match(/^\s*([A-Za-z_]\w*)\s*=/);
    if (match) names.add(match[1]);
  });
  return names;
}

function scanPythonIssues(code = "") {
  const issues = [];
  const text = String(code);
  const lines = text.split("\n");
  const assigned = collectAssignedNames(lines);
  const hasPdImport = /import\s+pandas\s+as\s+pd/i.test(text);
  const hasNpImport = /import\s+numpy\s+as\s+np/i.test(text);

  lines.forEach((line, index) => {
    const n = lineAt(lines, index);
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    if (hasPdImport) {
      const wrongPdCall = line.match(
        new RegExp(`\\b([a-z]{1,3})\\.(${PANDAS_METHODS})\\s*\\(`, "i"),
      );
      if (wrongPdCall && wrongPdCall[1].toLowerCase() !== "pd") {
        issues.push(
          `Line ${n}: Change \`${wrongPdCall[1]}.${wrongPdCall[2]}(...)\` to \`pd.${wrongPdCall[2]}(...)\` — pandas is imported as \`pd\`.`,
        );
      }

      if (/\bpd\.dataFrame\s*\(/i.test(line)) {
        issues.push(
          `Line ${n}: Use \`pd.DataFrame(...)\` — the constructor is \`DataFrame\` with a capital D.`,
        );
      }

      if (assigned.has("df") && /\bdf\.DataFrame\s*\(/i.test(line)) {
        issues.push(
          `Line ${n}: Create a new table with \`pd.DataFrame({...})\` — \`df\` is your existing DataFrame, not the constructor.`,
        );
      }

      if (assigned.has("df") && /\bdf\.dataFrame\b/i.test(line)) {
        issues.push(
          `Line ${n}: \`dataFrame\` is not a method on \`df\` — use \`pd.DataFrame({...})\` to create a DataFrame.`,
        );
      }

      if (/\bpandas\.(DataFrame|Series)\s*\(/i.test(line)) {
        issues.push(
          `Line ${n}: Use \`pd.${line.match(/pandas\.(DataFrame|Series)/i)[1]}(...)\` — you imported pandas as \`pd\`.`,
        );
      }
    } else if (/\bpd\.(DataFrame|Series)\s*\(/i.test(line)) {
      issues.push(`Line ${n}: Add \`import pandas as pd\` before using \`pd.\`.`);
    }

    if (hasNpImport) {
      const wrongNpCall = line.match(/\b([a-z]{1,3})\.(array|zeros|ones|arange|linspace)\s*\(/i);
      if (wrongNpCall && wrongNpCall[1].toLowerCase() !== "np") {
        issues.push(
          `Line ${n}: Change \`${wrongNpCall[1]}.${wrongNpCall[2]}(...)\` to \`np.${wrongNpCall[2]}(...)\` — numpy is imported as \`np\`.`,
        );
      }
    }

    if (assigned.has("df")) {
      if (/\bdb\./i.test(line) || /\bdb\s*\[/i.test(line) || /\bprint\s*\(\s*db\b/i.test(line)) {
        issues.push(
          `Line ${n}: Change \`db\` to \`df\` — your DataFrame variable is named \`df\`.`,
        );
      }
    }

    if (assigned.has("s") || assigned.has("prices") || assigned.has("series")) {
      const seriesNames = ["s", "prices", "series"].filter((name) => assigned.has(name));
      const primary = seriesNames[0];
      if (primary && new RegExp(`\\b(ds|sr|prices)\\b`, "i").test(line)) {
        const wrongSeriesVar = line.match(/\b(ds|sr)\b/i);
        if (wrongSeriesVar) {
          issues.push(
            `Line ${n}: Change \`${wrongSeriesVar[1]}\` to \`${primary}\` — check your Series variable name.`,
          );
        }
      }
    }

    if (/\bprint\s*\(\s*pd\.(shape|columns|head)\s*\)/i.test(line)) {
      issues.push(
        `Line ${n}: \`pd.${line.match(/pd\.(shape|columns|head)/i)[1]}\` is invalid — use it on a DataFrame, e.g. \`df.${line.match(/pd\.(shape|columns|head)/i)[1]}\`.`,
      );
    }

    if (/\bprint\s*\(\s*pandas\.(shape|columns)\s*\)/i.test(line)) {
      issues.push(`Line ${n}: Use \`df.shape\` on a DataFrame instance, not on the \`pandas\` module.`);
    }
  });

  return issues;
}

function scanJavaScriptIssues(code = "") {
  const issues = [];
  const lines = String(code).split("\n");

  lines.forEach((line, index) => {
    const n = lineAt(lines, index);
    if (/\bvar\s+\w+/.test(line)) {
      issues.push(`Line ${n}: Prefer \`const\` or \`let\` instead of \`var\`.`);
    }
    if (/[^=!]==[^=]/.test(line) && !/===|!==/.test(line)) {
      issues.push(`Line ${n}: Use strict equality \`===\` instead of \`==\`.`);
    }
  });

  return issues;
}

export function scanAllStaticIssues(code = "", language = "python") {
  const lang = String(language || "python").toLowerCase();
  if (lang === "python") return scanPythonIssues(code);
  if (lang === "javascript" || lang === "js") return scanJavaScriptIssues(code);
  return [];
}

export function normalizeIssueKey(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/line\s+\d+:\s*/g, "")
    .trim();
}
