import { analyzeCodeLocally } from "./analyzeLocally";

/** Legacy HF Space returns these for almost any snippet — not real ML output */
const LEGACY_GENERIC_TIP_PATTERNS = [
  /^add type hints/i,
  /^use f-strings/i,
  /^use with open\(\)/i,
  /^use list comprehensions/i,
  /^use dataclasses/i,
  /^pass arguments as a list to subprocess/i,
  /^no issues detected/i,
];

function gradeFromScore(score) {
  if (score >= 9) return "A";
  if (score >= 8) return "B";
  if (score >= 7) return "C";
  if (score >= 5) return "D";
  return "F";
}

function securityLabelFrom(risk, score) {
  if (risk === "safe" && score >= 8) return "SECURE";
  if (risk === "low") return "LOW RISK";
  if (risk === "medium") return "REVIEW";
  return "AT RISK";
}

function isGenericRemoteTip(tip) {
  const text = String(tip || "").trim();
  return LEGACY_GENERIC_TIP_PATTERNS.some((pattern) => pattern.test(text));
}

function securityRemoteActions(structuredFindings = [], tips = []) {
  const fromFindings = structuredFindings
    .map((f) => f.recommendation || f.detail || f.title)
    .filter(Boolean);
  const fromTips = (tips || []).filter((tip) => !isGenericRemoteTip(tip));
  return [...new Set([...fromFindings, ...fromTips])];
}

function hasLessonContext(local, context = {}) {
  const localActions = local.enriched?.actions || [];
  const failedTests = (context.testResults?.tests || []).filter(
    (test) => test.passed === false && test.id !== "runtime" && test.id !== "compile",
  );
  const hasRuntime = Boolean(String(context.runtimeError || "").trim());
  return localActions.length > 0 || failedTests.length > 0 || hasRuntime;
}

/**
 * Merge Hugging Face ML security signal with browser-local lesson + rules analysis.
 * ML provides vuln/clean confidence only — not lesson tips (legacy HF tips are filtered).
 */
export function enrichPolyGuardAnalysis(
  remote,
  {
    code = "",
    language = "python",
    context = {},
    baseLocal = null,
    remoteUrl = "",
  } = {},
) {
  const local =
    baseLocal || analyzeCodeLocally(code, language, context);

  if (!remote) {
    return {
      ...local,
      analysisMode: "local-rules",
      analysisSource: "Browser rules + lesson context",
    };
  }

  const lessonMode = hasLessonContext(local, context);
  const localScore = Number(local.score ?? local.enriched?.metrics?.score ?? 10);
  const mlScore =
    remote.ml_score != null
      ? Number(remote.ml_score)
      : remote.score != null
        ? Number(remote.score)
        : null;

  const mergedScore = lessonMode
    ? localScore
    : mlScore != null
      ? Math.max(
          0,
          Math.min(10, Math.round(Math.min(localScore, mlScore) * 10) / 10),
        )
      : localScore;

  const localClean =
    local.enriched?.metrics?.cleanConfidence ?? localScore * 10;
  const localVuln =
    local.enriched?.metrics?.vulnConfidence ?? 100 - localClean;
  const remoteClean =
    remote.clean_confidence != null ? Number(remote.clean_confidence) : null;
  const remoteVuln =
    remote.vuln_confidence != null ? Number(remote.vuln_confidence) : null;

  const cleanConfidence = lessonMode
    ? localClean
    : remoteClean ?? localClean;
  const vulnConfidence = lessonMode
    ? localVuln
    : remoteVuln ?? localVuln;

  const risk = lessonMode
    ? String(local.risk || "low").toLowerCase()
    : String(remote.risk || local.risk || "low").toLowerCase();

  const localActions = local.enriched?.actions || [];
  const remoteSecurityActions = securityRemoteActions(
    remote.structured_findings,
    remote.tips,
  );
  const actions = lessonMode
    ? localActions
    : [...new Set([...localActions, ...remoteSecurityActions])].slice(0, 8);

  const verdict = lessonMode
    ? local.enriched?.verdict || local.verdict || "REVIEW"
    : remote.structured_findings?.length
      ? remote.verdict || local.enriched?.verdict || local.verdict || "REVIEW"
      : local.enriched?.verdict || local.verdict || "REVIEW";

  const mlDisagrees =
    lessonMode &&
    mlScore != null &&
    mlScore >= 8 &&
    localScore < 7;

  return {
    ...local,
    score: mergedScore,
    grade: gradeFromScore(mergedScore),
    risk,
    verdict,
    clean_confidence: cleanConfidence,
    vuln_confidence: vulnConfidence,
    findings: remote.findings?.length
      ? remote.findings
      : local.findings || [],
    structured_findings:
      remote.structured_findings?.length
        ? remote.structured_findings
        : local.structured_findings || [],
    tips: remoteSecurityActions,
    analyzer: remote.analyzer || "polyguard-hybrid",
    analysisMode: "hybrid-ml",
    analysisSource: remoteUrl || "Hugging Face PolyGuard API",
    mlSecurityNote: mlDisagrees
      ? "ML security scan looks clean; lesson fixes still apply below."
      : null,
    enriched: {
      ...local.enriched,
      verdict,
      risk: risk.toUpperCase(),
      securityLabel: securityLabelFrom(risk, mergedScore),
      actions,
      headline:
        actions.length > 0
          ? actions[0]
          : local.enriched?.headline || "No issues detected.",
      summary:
        actions.length > 0
          ? actions[0]
          : local.enriched?.summary || "No issues detected.",
      metrics: {
        ...(local.enriched?.metrics || {}),
        score: mergedScore,
        grade: gradeFromScore(mergedScore),
        cleanConfidence,
        vulnConfidence,
        riskLevel: risk.toUpperCase(),
      },
    },
  };
}
