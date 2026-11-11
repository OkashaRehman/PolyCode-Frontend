import { analyzeCodeLocally } from "../lib/analyzeLocally";
import { enrichPolyGuardAnalysis } from "../lib/enrichAnalysis";
import { getPolyGuardAnalyzeUrl, isPolyGuardRemoteEnabled } from "../config";
import { toPolyGuardLanguage } from "../lib/mapLanguage";

function isCodeCoachContext(context = {}) {
  if (context.coachMode === true) return true;
  if (context.testResults?.tests?.length) return true;
  if (context.lessonTitle || context.lessonObjective) return true;
  return false;
}

/**
 * Lesson-aware code coach: static checks, runtime errors, and test hints.
 * ML security scan only runs outside lesson/challenge context.
 */
export async function analyzeCodeWithPolyGuard(
  code,
  language = "python",
  options = {},
) {
  const trimmed = String(code || "").trim();
  if (!trimmed) {
    throw new Error("Add some code before running PolyGuard analysis.");
  }

  const lang = toPolyGuardLanguage(language);
  const context = options.context || {};
  const coachMode = isCodeCoachContext(context);
  const local = analyzeCodeLocally(trimmed, lang, {
    ...context,
    coachMode,
  });

  if (coachMode || !isPolyGuardRemoteEnabled()) {
    return {
      ...local,
      analysisMode: coachMode ? "code-coach" : "local-rules",
      analysisSource: coachMode
        ? "Code coach — lesson checks + fix suggestions"
        : "Browser rules + lesson context",
    };
  }

  const remoteUrl = getPolyGuardAnalyzeUrl();

  try {
    const response = await fetch(remoteUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: trimmed, language: lang }),
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok || !payload) {
      return {
        ...local,
        analysisMode: "local-rules",
        analysisSource: "Browser rules (ML API unavailable)",
        analysisFallback: true,
      };
    }

    return enrichPolyGuardAnalysis(payload, {
      code: trimmed,
      language: lang,
      context,
      baseLocal: local,
      remoteUrl,
    });
  } catch {
    return {
      ...local,
      analysisMode: "local-rules",
      analysisSource: "Browser rules (ML API unreachable)",
      analysisFallback: true,
    };
  }
}
