import React, { useEffect, useState } from "react";

// NOTE FOR INTEGRATORS:
// Unlike the Python courses (which run challenges live via Pyodide in the
// browser), there is no in-browser Rust compiler in this stack, so this
// component checks submissions by matching each test's regex `pattern`
// against the submitted code text (see the `tests` array on every
// challenge in the Rust curriculum data files). This mirrors the other
// Rust course components (Fundamentals, Collections, Memory, Concurrency)
// so no new data format is introduced.
//
// If your platform later adds a real Rust playground/compiler (e.g. via a
// WASM-compiled rustc, or a server-side sandbox endpoint), swap the
// `runChecks` function below for a real compile+run call and keep the rest
// of this component's UI/props contract the same.

function runChecks(code, tests = []) {
  return tests.map((test) => {
    const pass = (test.keywords || []).every(({ pattern }) => {
      try {
        return new RegExp(pattern).test(code);
      } catch {
        return false;
      }
    });
    return { ...test, pass };
  });
}

export default function RustCodeChallenge({
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

  function handleChange(e) {
    const next = e.target.value;
    setCode(next);
    onCodeChange?.(next);
  }

  function handleCheck() {
    const checked = runChecks(code, challenge.tests);
    setResults(checked);
    const allPass = checked.every((t) => t.pass);
    if (allPass && !isCompleted) {
      onComplete?.();
    }
  }

  return (
    <div className="oops-code-challenge" style={{ "--accent-color": accentColor }}>
      <h3>{challenge.title}</h3>
      <p className="oops-challenge-description">{challenge.description}</p>

      <textarea
        className="oops-code-editor"
        value={code}
        onChange={handleChange}
        spellCheck={false}
        rows={14}
      />

      <div className="oops-challenge-actions">
        <button type="button" className="oops-check-btn" onClick={handleCheck}>
          Check my code
        </button>
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
        <ul className="oops-test-results">
          {results.map((t) => (
            <li key={t.id} className={t.pass ? "pass" : "fail"}>
              {t.pass ? "✓" : "✗"} {t.label}
            </li>
          ))}
        </ul>
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
