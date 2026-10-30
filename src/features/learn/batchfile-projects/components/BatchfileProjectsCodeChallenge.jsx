import React, { useEffect, useState } from "react";
import { Play, CheckCircle, XCircle } from "lucide-react";
import Editor from "@monaco-editor/react";

// Batch files have no in-browser interpreter available in this stack, so
// (like the other scripting-language courses) submissions are checked by
// matching each test's `keywords` against the submitted script text. This
// keeps the format consistent with Rust/PowerShell/Batchfile Automation
// course challenges.

export default function BatchfileProjectsCodeChallenge({
  challenge,
  accentColor,
  isCompleted,
  onComplete,
  initialCode,
  onCodeChange,
}) {
  const [code, setCode] = useState(initialCode || challenge?.starterCode || "");
  const [results, setResults] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    setCode(initialCode || challenge?.starterCode || "");
    setResults(null);
    setShowSolution(false);
  }, [challenge, initialCode]);

  if (!challenge) return null;

  function handleChange(value) {
    const next = value || "";
    setCode(next);
    onCodeChange?.(next);
  }

  function runCode() {
    const tests = challenge.tests || [];
    const newResults = tests.map((test) => {
      const passed = (test.keywords || []).every((kw) =>
        code.toLowerCase().includes(String(kw).toLowerCase()),
      );
      return { ...test, passed };
    });
    setResults(newResults);
    const allPassed = newResults.every((r) => r.passed);
    if (allPassed && !isCompleted) {
      onComplete?.();
    }
  }

  return (
    <div className="oops-code-challenge" style={{ "--accent-color": accentColor }}>
      <h3>{challenge.title}</h3>
      <p className="oops-challenge-description">{challenge.description}</p>

      <div className="oops-editor-toolbar">
        <span>script.bat</span>
        <button
          type="button"
          className="oops-run-btn"
          onClick={runCode}
          disabled={!code.trim()}
        >
          <Play size={14} /> Check my code
        </button>
      </div>

      <Editor
        height="300px"
        defaultLanguage="bat"
        theme="vs-dark"
        value={code}
        onChange={handleChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
        }}
      />

      <div className="oops-challenge-actions">
        <button
          type="button"
          className="oops-solution-btn"
          onClick={() => setShowSolution((v) => !v)}
        >
          {showSolution ? "Hide solution" : "Show solution"}
        </button>
        {isCompleted && <span className="oops-completed-pill">✓ Completed</span>}
      </div>

      {results && (
        <div className="oops-test-results">
          <h4>Test Results</h4>
          <ul>
            {results.map((r) => (
              <li key={r.id} className={r.passed ? "passed" : "failed"}>
                {r.passed ? <CheckCircle size={14} /> : <XCircle size={14} />}
                <span>{r.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSolution && (
        <div className="oops-theory-code">
          <div className="oops-theory-code-label">Solution</div>
          <pre>
            <code>{challenge.solutionCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
