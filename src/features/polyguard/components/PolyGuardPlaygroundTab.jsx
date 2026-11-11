import React, { useEffect } from "react";
import usePolyGuardAnalyze from "../hooks/usePolyGuardAnalyze";
import PolyGuardAnalyzeButton from "./PolyGuardAnalyzeButton";
import PolyGuardReport from "./PolyGuardReport";
import "../polyguard.css";

export default function PolyGuardPlaygroundTab({
  code,
  language,
  isActive = false,
}) {
  const { analyze, result, error, loading, reset } = usePolyGuardAnalyze();
  const canAnalyze = Boolean(String(code || "").trim());

  useEffect(() => {
    if (!isActive) return;
    reset();
  }, [code, language, isActive, reset]);

  return (
    <div className="pg-polyguard-tab">
      <div className="pg-polyguard-toolbar">
        <span className="pg-panel-kicker">PolyGuard</span>
        <PolyGuardAnalyzeButton
          variant="playground"
          onClick={() => analyze(code, language)}
          loading={loading}
          disabled={!canAnalyze}
        />
      </div>

      {canAnalyze ? (
        <PolyGuardReport
          result={result}
          error={error}
          loading={loading}
          compact
          showRawJson
        />
      ) : (
        <div className="pg-panel-idle">Add code to analyze.</div>
      )}
    </div>
  );
}
