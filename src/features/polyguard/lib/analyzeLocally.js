import { runRulesEngine } from "./rulesEngine";
import { buildFixActions, buildHeadline } from "./fixActions";

const SEVERITY_PENALTY = {
  critical: 3,
  high: 2,
  medium: 1,
  low: 0.5,
};

function gradeFromScore(score) {
  if (score >= 9) return "A";
  if (score >= 8) return "B";
  if (score >= 7) return "C";
  if (score >= 5) return "D";
  return "F";
}

function riskFromScore(score, hasExecutionFailure) {
  if (hasExecutionFailure) {
    if (score >= 6) return "medium";
    return "high";
  }
  if (score >= 8) return "safe";
  if (score >= 6) return "low";
  if (score >= 4) return "medium";
  return "high";
}

function verdictFrom(score, context = {}, actions = []) {
  const failedTests = (context.testResults?.tests || []).filter(
    (t) => t.passed === false && t.id !== "runtime" && t.id !== "compile",
  );
  const hasRuntime = Boolean(String(context.runtimeError || "").trim());

  if (hasRuntime || failedTests.length > 0 || score < 5) {
    return "NEEDS WORK";
  }
  if (score < 7 || actions.length > 0) return "REVIEW";
  if (score >= 8) return "PASS";
  return "ACCEPTABLE";
}

function buildLessonFindings(context = {}) {
  const findings = [];
  const runtimeError = String(context.runtimeError || "").trim();

  if (runtimeError) {
    findings.push({
      id: "runtime-error",
      category: "Execution",
      severity: "high",
      source: "runtime",
    });
  }

  (context.testResults?.tests || [])
    .filter((test) => test.passed === false && test.id !== "runtime")
    .forEach((test, index) => {
      findings.push({
        id: `lesson-test-${test.id || index}`,
        category: "Lesson",
        severity: "medium",
        source: "lesson",
        label: test.label,
        hint: test.hint,
      });
    });

  return findings;
}

/**
 * Holistic score: structure from tests + execution must agree.
 * A runtime crash can never produce a near-perfect score.
 */
function computeScore(ruleFindings, context = {}) {
  const tests = (context.testResults?.tests || []).filter(
    (t) => t.id !== "runtime" && t.id !== "compile",
  );
  const passedTests = tests.filter((t) => t.passed === true);
  const failedTests = tests.filter((t) => t.passed === false);
  const total = tests.length || 1;
  const hasRuntime = Boolean(String(context.runtimeError || "").trim());
  const passRatio = passedTests.length / total;

  // Structure credit (up to 6)
  let score = passRatio * 6;

  // Execution credit (up to 4) — only when code actually runs
  if (!hasRuntime) {
    score += 4;
  } else {
    score += passRatio * 1;
    score -= 2;
  }

  let rulePenalty = 0;
  ruleFindings.forEach((finding) => {
    rulePenalty += (SEVERITY_PENALTY[finding.severity] || 0.5) * 0.25;
  });
  score -= Math.min(rulePenalty, 1.5);

  if (hasRuntime) {
    score = Math.min(score, 6.5);
  }
  if (failedTests.length > 0) {
    score = Math.min(score, 7);
  }

  if (hasRuntime && passRatio >= 0.5 && failedTests.length === 0) {
    score = Math.max(score, 4);
  } else if (passRatio >= 0.5) {
    score = Math.max(score, 3.5);
  }

  return Math.max(1, Math.min(10, Math.round(score * 10) / 10));
}

export function analyzeCodeLocally(code, language = "python", context = {}) {
  const trimmed = String(code || "").trim();
  const lines = trimmed ? trimmed.split("\n") : [];

  const ruleFindings = runRulesEngine(trimmed, language);
  const lessonFindings = buildLessonFindings(context);
  const findings = [...lessonFindings, ...ruleFindings];

  const hasExecutionFailure =
    Boolean(String(context.runtimeError || "").trim()) ||
    (context.testResults?.tests || []).some(
      (test) => (test.id === "runtime" || test.id === "compile") && test.passed === false,
    );

  const coachMode = Boolean(context.coachMode);
  const actions = buildFixActions(ruleFindings, { ...context, code: trimmed, language });
  let score = computeScore(ruleFindings, context);
  if (actions.length >= 3) {
    score = Math.min(score, 5);
  } else if (actions.length >= 2) {
    score = Math.min(score, 6);
  }
  score = Math.max(1, Math.min(10, Math.round(score * 10) / 10));
  const risk = riskFromScore(score, hasExecutionFailure);
  const verdict = verdictFrom(score, context, actions);
  const headline = buildHeadline(score, actions, context);
  const cleanConfidence = Math.round(score * 10 * 10) / 10;
  const vulnConfidence = Math.round((100 - cleanConfidence) * 10) / 10;

  const displayVerdict =
    hasExecutionFailure || actions.length > 0
      ? verdict === "NEEDS WORK"
        ? "NEEDS WORK"
        : verdict === "REVIEW"
          ? "REVIEW"
          : "NEEDS WORK"
      : score >= 9
        ? "EXCELLENT"
        : score >= 8
          ? "GOOD"
          : verdict;

  const securityLabel = coachMode
    ? actions.length > 0 || hasExecutionFailure
      ? "NEEDS FIX"
      : score >= 8
        ? "LOOKS GOOD"
        : "ALMOST THERE"
    : hasExecutionFailure
      ? score >= 5
        ? "REVIEW"
        : "AT RISK"
      : risk === "safe" && score >= 8
        ? "SECURE"
        : risk === "low"
          ? "LOW RISK"
          : risk === "medium"
            ? "REVIEW"
            : "AT RISK";

  return {
    score,
    grade: gradeFromScore(score),
    risk,
    verdict,
    language: String(language || "python").toLowerCase(),
    lines_analyzed: lines.length,
    analyzer: coachMode ? "polyguard-coach" : "polyguard-hybrid",
    analysisMode: coachMode ? "code-coach" : "local-rules",
    enriched: {
      headline,
      summary: headline,
      risk: risk.toUpperCase(),
      verdict: displayVerdict,
      securityLabel,
      actions,
      findings,
      metrics: {
        score,
        grade: gradeFromScore(score),
        linesAnalyzed: lines.length,
        language: String(language || "python").toLowerCase(),
        cleanConfidence,
        vulnConfidence,
        riskLevel: risk.toUpperCase(),
      },
    },
  };
}
