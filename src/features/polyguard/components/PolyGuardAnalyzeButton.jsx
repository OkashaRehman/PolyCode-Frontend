import React from "react";
import "../polyguard.css";

export default function PolyGuardAnalyzeButton({
  onClick,
  loading = false,
  disabled = false,
  className = "",
  variant = "default",
  title = "Run PolyGuard analysis",
}) {
  const classes = [
    "pg-analyze-btn",
    `pg-analyze-btn-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <span className="pg-spinner" aria-hidden />
          Analyzing
        </>
      ) : (
        "Run analysis"
      )}
    </button>
  );
}
