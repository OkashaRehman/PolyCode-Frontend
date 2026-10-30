function getLineCol(code, index) {
  const before = code.slice(0, index);
  const lines = before.split("\n");
  return {
    line: lines.length,
    column: (lines[lines.length - 1] || "").length + 1,
  };
}

function runPatternRules(code, language, rules) {
  const findings = [];
  const lang = String(language || "python").toLowerCase();

  rules.forEach((rule) => {
    if (rule.languages && !rule.languages.includes(lang)) return;
    const pattern =
      rule.pattern instanceof RegExp
        ? rule.pattern
        : new RegExp(rule.pattern, rule.flags || "gi");

    let match;
    const flags = pattern.flags.includes("g")
      ? pattern.flags
      : `${pattern.flags}g`;
    const globalPattern = new RegExp(pattern.source, flags);

    while ((match = globalPattern.exec(code)) !== null) {
      const { line, column } = getLineCol(code, match.index);
      findings.push({
        id: `rule-${findings.length}`,
        vuln_type: rule.vuln_type || rule.category?.toLowerCase() || "issue",
        category: rule.category || "Quality",
        severity: rule.severity || "medium",
        line,
        column,
        snippet: match[0].slice(0, 120),
        title: rule.title,
        detail: rule.detail,
        recommendation: rule.recommendation,
        message: rule.detail,
        cwe: rule.cwe || null,
        confidence: rule.confidence ?? 0.85,
        source: "rules",
      });
    }
  });

  return findings;
}

const RULES = [
  // ── Python correctness (lessons) ─────────────────────────────────────────
  {
    languages: ["python"],
    pattern: /\bpd\.(shape|columns|head|tail|dtypes|info)\b(?!\s*\()/,
    category: "Correctness",
    severity: "high",
    title: "pandas attribute used without a DataFrame",
    detail:
      "Attributes like `shape` and `columns` exist on DataFrame instances, not on the `pd` alias itself.",
    recommendation:
      "Build a DataFrame (`df = pd.DataFrame(...)`) and call methods on `df`, e.g. `print(df.shape)`.",
  },
  {
    languages: ["python"],
    pattern: /\bpandas\.(shape|columns|head|tail|dtypes)\b/,
    category: "Correctness",
    severity: "high",
    title: "Attribute accessed on pandas module",
    detail:
      "`pandas.shape` is invalid — `shape` is a property of a DataFrame object.",
    recommendation:
      "Import pandas as `pd`, create a DataFrame, then use `df.shape`.",
  },
  {
    languages: ["python"],
    pattern: /\bnp\.(shape|size|dtype)\b(?!\s*\()/,
    category: "Correctness",
    severity: "medium",
    title: "NumPy attribute used incorrectly",
    detail:
      "Properties like `shape` belong to ndarray objects returned from `np.array(...)`, not the `np` module.",
    recommendation: "Create an array first: `arr = np.array([...]); print(arr.shape)`.",
  },
  {
    languages: ["python"],
    pattern: /\bprint\s*\(\s*shape\s*\)/,
    category: "Correctness",
    severity: "medium",
    title: "Bare `shape` referenced in print",
    detail: "`shape` is not a built-in name — it must be accessed on an array or DataFrame.",
    recommendation: "Use `print(df.shape)` or `print(arr.shape)` on a concrete variable.",
  },
  // ── SQL injection ───────────────────────────────────────────────────────
  {
    languages: ["python", "javascript", "php", "java"],
    pattern:
      /execute\s*\(\s*["'`].*?(SELECT|INSERT|UPDATE|DELETE|DROP).*?["'`]\s*\+/i,
    category: "Security",
    severity: "critical",
    vuln_type: "sql_injection",
    cwe: "CWE-89",
    title: "SQL built with string concatenation",
    detail: "User-controlled data concatenated into SQL enables injection attacks.",
    recommendation:
      "Use parameterized queries / prepared statements and bind user input as parameters.",
  },
  {
    languages: ["python"],
    pattern: /execute\s*\(\s*f["'].*?(SELECT|INSERT|UPDATE|DELETE).*?\{/i,
    category: "Security",
    severity: "critical",
    vuln_type: "sql_injection",
    cwe: "CWE-89",
    title: "SQL f-string with interpolated values",
    detail: "f-strings embed variables directly into SQL, which is unsafe.",
    recommendation: "Use placeholders: `cursor.execute('SELECT * FROM t WHERE id = ?', (user_id,))`.",
  },
  // ── Secrets ─────────────────────────────────────────────────────────────
  {
    languages: ["python", "javascript", "java", "php", "ruby", "go"],
    pattern:
      /(api_key|apikey|secret_key|private_key|access_token)\s*=\s*["'][^"']{8,}["']/i,
    category: "Security",
    severity: "critical",
    vuln_type: "hardcoded_secret",
    cwe: "CWE-798",
    title: "Hardcoded API key or secret",
    detail: "Secrets in source code are exposed in version control and builds.",
    recommendation: "Load secrets from environment variables or a secrets manager.",
  },
  {
    languages: ["python", "javascript", "java", "php", "ruby", "go"],
    pattern: /(password|passwd|pwd)\s*=\s*["'][^"']{4,}["']/i,
    category: "Security",
    severity: "critical",
    vuln_type: "hardcoded_secret",
    cwe: "CWE-798",
    title: "Hardcoded password",
    detail: "Passwords must never appear in source files.",
    recommendation: "Use environment variables and hash passwords with bcrypt/Argon2.",
  },
  {
    pattern: /sk-[a-zA-Z0-9]{20,}/,
    category: "Security",
    severity: "critical",
    vuln_type: "hardcoded_secret",
    title: "OpenAI API key pattern detected",
    detail: "An API key matching OpenAI format appears in the snippet.",
    recommendation: "Revoke the key, remove it from code, and store it in env vars.",
  },
  {
    pattern: /AKIA[0-9A-Z]{16}/,
    category: "Security",
    severity: "critical",
    vuln_type: "hardcoded_secret",
    title: "AWS access key detected",
    detail: "AWS access keys in code are a critical credential leak.",
    recommendation: "Rotate the key immediately and use IAM roles or env configuration.",
  },
  // ── XSS ─────────────────────────────────────────────────────────────────
  {
    languages: ["javascript", "typescript"],
    pattern: /\.(innerHTML|outerHTML)\s*=\s*(?!["'`])/i,
    category: "Security",
    severity: "high",
    vuln_type: "xss",
    cwe: "CWE-79",
    title: "Unsanitized DOM HTML assignment",
    detail: "Writing dynamic data to innerHTML can enable cross-site scripting.",
    recommendation: "Use `textContent`, React JSX escaping, or sanitize with DOMPurify.",
  },
  {
    languages: ["javascript", "typescript"],
    pattern: /dangerouslySetInnerHTML/i,
    category: "Security",
    severity: "high",
    vuln_type: "xss",
    cwe: "CWE-79",
    title: "dangerouslySetInnerHTML usage",
    detail: "Bypasses React's XSS protections when content is not trusted.",
    recommendation: "Sanitize HTML before injection or render plain text instead.",
  },
  // ── Weak crypto ───────────────────────────────────────────────────────────
  {
    languages: ["python"],
    pattern: /\bhashlib\.md5\b/i,
    category: "Cryptography",
    severity: "medium",
    vuln_type: "weak_crypto",
    cwe: "CWE-327",
    title: "MD5 hash usage",
    detail: "MD5 is cryptographically broken for security-sensitive hashing.",
    recommendation: "Use `hashlib.sha256` or a dedicated password hash like bcrypt.",
  },
  {
    languages: ["python"],
    pattern: /\bhashlib\.sha1\b/i,
    category: "Cryptography",
    severity: "medium",
    vuln_type: "weak_crypto",
    cwe: "CWE-327",
    title: "SHA-1 hash usage",
    detail: "SHA-1 is deprecated for security use cases.",
    recommendation: "Prefer SHA-256 or SHA-3 for integrity checks.",
  },
  // ── Dangerous Python ────────────────────────────────────────────────────
  {
    languages: ["python"],
    pattern: /\beval\s*\(/,
    category: "Security",
    severity: "high",
    vuln_type: "code_injection",
    cwe: "CWE-94",
    title: "eval() executes arbitrary code",
    detail: "`eval` must never run on untrusted input.",
    recommendation: "Use `ast.literal_eval` for safe literals or explicit parsers.",
  },
  {
    languages: ["python"],
    pattern: /\bexec\s*\(/,
    category: "Security",
    severity: "high",
    vuln_type: "code_injection",
    cwe: "CWE-94",
    title: "exec() executes arbitrary code",
    detail: "`exec` can run attacker-controlled logic.",
    recommendation: "Remove exec or restrict to trusted, static code paths.",
  },
  {
    languages: ["python"],
    pattern: /\bpickle\.loads?\s*\(/,
    category: "Security",
    severity: "high",
    vuln_type: "deserialization",
    cwe: "CWE-502",
    title: "Unsafe pickle deserialization",
    detail: "Pickle can execute arbitrary code during deserialization.",
    recommendation: "Use JSON or another safe serialization format for untrusted data.",
  },
  // ── C/C++ memory ────────────────────────────────────────────────────────
  {
    languages: ["c", "cpp"],
    pattern: /\bstrcpy\s*\(/i,
    category: "Security",
    severity: "critical",
    vuln_type: "buffer_overflow",
    cwe: "CWE-120",
    title: "Unsafe strcpy()",
    detail: "strcpy does not bound-check the destination buffer.",
    recommendation: "Use `strncpy` or `strlcpy` and always null-terminate.",
  },
  {
    languages: ["c", "cpp"],
    pattern: /\bgets\s*\(/i,
    category: "Security",
    severity: "critical",
    vuln_type: "buffer_overflow",
    cwe: "CWE-242",
    title: "Banned gets() function",
    detail: "gets() cannot safely read arbitrary input lengths.",
    recommendation: "Replace with `fgets(buf, sizeof(buf), stdin)`.",
  },
  {
    languages: ["c", "cpp"],
    pattern: /\bsprintf\s*\(/i,
    category: "Security",
    severity: "high",
    vuln_type: "buffer_overflow",
    cwe: "CWE-120",
    title: "Unsafe sprintf()",
    detail: "sprintf can overflow the target buffer.",
    recommendation: "Use `snprintf(buf, sizeof(buf), ...)`.",
  },
];

function dedupeFindings(findings) {
  const seen = new Set();
  return findings.filter((item) => {
    const key = `${item.line}|${item.title}|${item.detail}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function runRulesEngine(code, language = "python") {
  return dedupeFindings(runPatternRules(code, language, RULES));
}
