/**
 * Turn analysis signals into short, deduplicated fix lines (no fluff).
 */

import { normalizeIssueKey, scanAllStaticIssues } from "./codeIssueScanner";

const MAX_ACTIONS = 8;

const TEST_LABEL_FIXES = [
  {
    test: /import.*pandas|pandas as pd/i,
    code: /import\s+pandas\s+as\s+pd/i,
    fix: "Add `import pandas as pd` at the top of the file.",
  },
  {
    test: /creates?\s+pd\.dataframe|creates?\s+dataframe/i,
    code: /pd\.DataFrame\s*\(/i,
    fix: "Create a DataFrame with `pd.DataFrame({...})`.",
    typoFix: (code) => {
      const match = code.match(/\b([a-z]{1,3})\.DataFrame\s*\(/i);
      if (match && match[1].toLowerCase() !== "pd") {
        return `Use \`pd.DataFrame(...)\` — you wrote \`${match[1]}.DataFrame\` but pandas is imported as \`pd\`.`;
      }
      return "Create a DataFrame with `pd.DataFrame({...})`.";
    },
  },
  {
    test: /uses?\s+pd\.series|creates?\s+series/i,
    code: /pd\.Series\s*\(/i,
    fix: "Build a Series with `pd.Series([...])` or `pd.Series({\"a\": 1})`.",
  },
  {
    test: /prints?\s+.*shape|prints?\s+shape/i,
    code: /print\s*\([^)]*\.shape/i,
    fix: "Print shape on the DataFrame: `print(df.shape)` — not on `pd` or `pandas`.",
  },
  {
    test: /prints?\s+df|prints?\s+dataframe|uses?\s+\.loc/i,
    code: /print\s*\(\s*df[\s.[]/i,
    fix: "Print using your DataFrame variable, e.g. `print(df)` or `print(df.loc[...])`.",
  },
  {
    test: /\.mean\(\)|uses?\s+\.mean/i,
    code: /\.mean\s*\(\s*\)/i,
    fix: "Call `.mean()` on your Series or column, e.g. `s.mean()`.",
  },
  {
    test: /multipl|times\s+2|\*\s*2/i,
    fix: "Multiply the Series: `s * 2` (or assign the result to a variable).",
  },
  {
    test: /compiles?|runs without error/i,
    fix: "Fix syntax/runtime errors until the code executes without exceptions.",
  },
  {
    test: /#include|iostream/i,
    code: /#include\s*<iostream>/i,
    fix: "Add required headers, e.g. `#include <iostream>`.",
  },
  {
    test: /class|struct/i,
    fix: "Define the class/struct shown in the lesson brief before using it.",
  },
];

function parseRuntimeFixes(errorText = "", code = "") {
  const text = String(errorText).replace(/\^+/g, "").trim();
  if (!text) return [];

  const fixes = [];
  const lines = text.split("\n").filter(Boolean);

  for (const rawLine of lines) {
    const lineMatch = rawLine.match(/line\s+(\d+)/i);
    const linePrefix = lineMatch ? `Line ${lineMatch[1]}: ` : "";

    const nameErr = rawLine.match(/NameError:\s*name\s+'([^']+)'\s+is not defined/i);
    if (nameErr) {
      const badName = nameErr[1];
      const hasPandas = /import\s+pandas\s+as\s+pd/i.test(code);
      const hasDf = /\bdf\s*=/.test(code);
      if (hasPandas && badName === "pf") {
        fixes.push(`${linePrefix}Change \`pf\` to \`pd\` — pandas is imported as \`pd\`.`);
      } else if (hasDf && badName === "db") {
        fixes.push(`${linePrefix}Change \`db\` to \`df\` — your DataFrame is named \`df\`.`);
      } else if (hasPandas && badName.length <= 3 && badName !== "pd") {
        fixes.push(`${linePrefix}'${badName}' is not defined — did you mean \`pd\`?`);
      } else if (hasDf && badName.length <= 3 && badName !== "df") {
        fixes.push(`${linePrefix}'${badName}' is not defined — did you mean \`df\`?`);
      } else {
        fixes.push(`${linePrefix}'${badName}' is not defined — define it or correct the typo.`);
      }
      continue;
    }

    const attrErr = rawLine.match(
      /AttributeError:\s*(?:module\s+'([^']+)'\s+has no attribute\s+'([^']+)'|'([^']+)'\s+object has no attribute\s+'([^']+)')/i,
    );
    if (attrErr) {
      const moduleName = attrErr[1];
      const moduleAttr = attrErr[2];
      const objectType = attrErr[3];
      const objectAttr = attrErr[4];

      if (moduleAttr === "dataFrame" || objectAttr === "dataFrame") {
        fixes.push(
          `${linePrefix}Use \`pd.DataFrame({...})\` to create a DataFrame — \`dataFrame\` is not a valid attribute (capital D: \`DataFrame\`).`,
        );
        continue;
      }

      if (moduleName === "pandas" && moduleAttr === "shape") {
        fixes.push(
          `${linePrefix}\`pd.shape\` does not exist — use \`df.shape\` on your DataFrame variable.`,
        );
        continue;
      }

      if (moduleName) {
        if (moduleAttr === "DataFrame" && moduleName === "pandas") {
          fixes.push(
            `${linePrefix}Use \`pd.DataFrame({...})\` — you imported pandas as \`pd\`, not \`pandas\`.`,
          );
        } else {
          fixes.push(
            `${linePrefix}'${moduleAttr}' is not on '${moduleName}' — use it on an instance (e.g. df.${moduleAttr}).`,
          );
        }
      } else {
        const attr = objectAttr;
        if (/dataframe/i.test(attr) && /module/i.test(objectType || "")) {
          fixes.push(
            `${linePrefix}Use \`pd.DataFrame({...})\` to create a table — check spelling and capitalization.`,
          );
        } else {
          fixes.push(
            `${linePrefix}Object has no attribute '${attr}' — check the variable type and spelling.`,
          );
        }
      }
      continue;
    }

    const syntaxErr = rawLine.match(/SyntaxError:\s*(.+?)(?:\s*\(|$)/i);
    if (syntaxErr) {
      fixes.push(`${linePrefix}Syntax error — ${syntaxErr[1].trim()}.`);
      continue;
    }

    const importErr = rawLine.match(/ImportError:\s*(.+)/i);
    if (importErr) {
      fixes.push(`Import failed — ${importErr[1].trim()}.`);
      continue;
    }

    const typeErr = rawLine.match(/TypeError:\s*(.+)/i);
    if (typeErr) {
      fixes.push(`${linePrefix}Type error — ${typeErr[1].trim()}.`);
    }
  }

  if (fixes.length === 0) {
    const lineMatch = text.match(/line\s+(\d+)/i);
    const linePrefix = lineMatch ? `Line ${lineMatch[1]}: ` : "";
    const lastLine = lines[lines.length - 1] || text;
    if (lastLine.length < 140) {
      fixes.push(`${linePrefix}${lastLine}`);
    } else {
      fixes.push(`${linePrefix}Fix the runtime error, then submit again.`);
    }
  }

  return fixes;
}

function fixForTestLabel(label = "", hint = "", code = "") {
  const normalized = String(label).trim();

  for (const entry of TEST_LABEL_FIXES) {
    if (!entry.test.test(normalized)) continue;
    if (entry.code && entry.code.test(code)) return null;
    if (entry.typoFix) return entry.typoFix(code);
    return entry.fix;
  }

  if (hint && hint.length < 120 && !/re-read the lesson/i.test(hint)) {
    return hint;
  }

  return `Satisfy: ${normalized}.`;
}

function fixFromFinding(finding) {
  if (finding.recommendation && finding.recommendation.length < 160) {
    const prefix = finding.line ? `Line ${finding.line}: ` : "";
    return `${prefix}${finding.recommendation}`;
  }
  if (finding.line) {
    return `Line ${finding.line}: ${finding.title} — ${finding.detail}`;
  }
  return finding.title || finding.detail;
}

function isDuplicate(issueKey, seen) {
  if (seen.has(issueKey)) return true;
  for (const existing of seen) {
    if (existing.includes(issueKey) || issueKey.includes(existing)) return true;
  }
  return false;
}

export function buildFixActions(findings = [], context = {}) {
  const code = String(context.code || "");
  const language = context.language || "python";
  const actions = [];
  const seen = new Set();

  function push(text) {
    const line = String(text || "").trim();
    if (!line) return;
    const key = normalizeIssueKey(line);
    if (isDuplicate(key, seen)) return;
    seen.add(key);
    actions.push(line);
  }

  scanAllStaticIssues(code, language).forEach(push);

  parseRuntimeFixes(context.runtimeError, code).forEach(push);

  (context.testResults?.tests || [])
    .filter((test) => test.passed === false && test.id !== "runtime" && test.id !== "compile")
    .forEach((test) => {
      const fix = fixForTestLabel(test.label, test.hint, code);
      if (fix) push(fix);
    });

  findings
    .filter((f) => f.source === "rules" || f.category === "Security" || f.category === "Correctness")
    .forEach((f) => {
      push(fixFromFinding(f));
    });

  if (actions.length === 0) {
    findings.forEach((f) => push(fixFromFinding(f)));
  }

  return actions.slice(0, MAX_ACTIONS);
}

export function buildHeadline(score, actions, context = {}) {
  const failed =
    (context.testResults?.tests || []).filter(
      (t) => t.passed === false && t.id !== "runtime" && t.id !== "compile",
    ).length || 0;
  const hasRuntime = Boolean(String(context.runtimeError || "").trim());
  const issueCount = actions.length;

  if (issueCount > 1) {
    return `${issueCount} issues found — fix each line below.`;
  }
  if (hasRuntime && failed > 0) {
    return `Runtime error and ${failed} requirement${failed === 1 ? "" : "s"} not met.`;
  }
  if (hasRuntime) return "Code crashes — fix the errors below.";
  if (failed > 0) {
    return `${failed} requirement${failed === 1 ? "" : "s"} not met.`;
  }
  if (issueCount === 0 && score >= 8) return "Submission looks good.";
  if (issueCount > 0) return "1 issue to fix.";
  return "Review complete.";
}
