import React, { useEffect, useRef } from "react";
import usePolyGuardAnalyze from "../hooks/usePolyGuardAnalyze";
import PolyGuardAnalyzeButton from "./PolyGuardAnalyzeButton";
import PolyGuardReport from "./PolyGuardReport";
import "../polyguard.css";

export default function PolyGuardPanel({
  code,
  language = "python",
  disabled = false,
  variant = "default",
  className = "",
  resetKey,
  showReport = true,
  compact = false,
  autoRunKey,
  analysisContext,
  hideManualTrigger = false,
}) {
  const { analyze, result, error, loading, reset } = usePolyGuardAnalyze();
  const lastAutoRunRef = useRef(null);
  const contextRef = useRef(analysisContext);
  const isLearn = variant === "learn";

  contextRef.current = analysisContext;

  useEffect(() => {
    reset();
    lastAutoRunRef.current = null;
  }, [resetKey, reset]);

  useEffect(() => {
    if (autoRunKey == null || disabled) return;
    if (lastAutoRunRef.current === autoRunKey) return;
    if (!String(code || "").trim()) return;

    lastAutoRunRef.current = autoRunKey;
    const ctx = {
      ...(contextRef.current || {}),
      coachMode: isLearn || contextRef.current?.coachMode,
    };
    analyze(code, language, { context: ctx });
  }, [autoRunKey, analyze, code, disabled, isLearn, language]);

  function handleAnalyze() {
    if (disabled || !String(code || "").trim()) return;
    const ctx = {
      ...(analysisContext || {}),
      coachMode: isLearn || analysisContext?.coachMode,
    };
    analyze(code, language, { context: ctx });
  }

  const hasReport = loading || result || error;

  return (
    <section
      className={`pg-panel pg-panel-${variant}${isLearn ? " pg-panel-learn" : ""} ${className}`.trim()}
      aria-label="PolyGuard analysis"
    >
      {!hideManualTrigger ? (
        <header className="pg-panel-header pg-panel-header-compact">
          <span className="pg-panel-kicker">PolyGuard</span>
          <PolyGuardAnalyzeButton
            variant={variant}
            onClick={handleAnalyze}
            loading={loading}
            disabled={disabled || !String(code || "").trim()}
          />
        </header>
      ) : null}

      {showReport && hasReport ? (
        <PolyGuardReport
          result={result}
          error={error}
          loading={loading}
          compact={isLearn}
        />
      ) : isLearn && autoRunKey == null ? (
        <div className="pg-panel-idle">Submit your code to see how to fix it.</div>
      ) : !isLearn && !hasReport ? (
        <div className="pg-panel-idle">Run analysis to see fixes.</div>
      ) : null}
    </section>
  );
}
