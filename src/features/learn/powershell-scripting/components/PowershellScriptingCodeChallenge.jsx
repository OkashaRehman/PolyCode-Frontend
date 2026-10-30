import React, { useState, useEffect } from "react";
import { Play, CheckCircle, XCircle } from "lucide-react";
import Editor from "@monaco-editor/react";

export default function PowershellScriptingCodeChallenge({
  challenge,
  onComplete,
  isCompleted,
  initialCode,
  onCodeChange,
}) {
  const [code, setCode] = useState(
    initialCode || challenge.starterCode || "",
  );
  const [results, setResults] = useState(null);

  useEffect(() => {
    setCode(initialCode || challenge.starterCode || "");
    setResults(null);
  }, [challenge, challenge.starterCode, initialCode]);

  const runCode = () => {
    const newResults = challenge.tests.map((test) => ({
      ...test,
      passed: test.keywords.every((keyword) =>
        code.toLowerCase().includes(keyword.toLowerCase()),
      ),
    }));
    setResults(newResults);
    if (newResults.every((test) => test.passed)) onComplete();
  };

  function handleCodeChange(value) {
    const nextCode = value || "";
    setCode(nextCode);
    onCodeChange?.(nextCode);
  }

  return (
    <div className="oops-code-challenge">
      <div className="oops-editor-toolbar">
        <span>script.ps1</span>
        {isCompleted && <span>Completed</span>}
        <button
          type="button"
          className="oops-run-btn"
          onClick={runCode}
          disabled={!code.trim()}
        >
          <Play size={14} /> Run Code
        </button>
      </div>
      <Editor
          height="300px"
          defaultLanguage="powershell"
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
          }}
        />
      {results && (
        <div className="oops-test-results">
          <h4>Test Results</h4>
          <ul>
            {results.map((r, i) => (
              <li key={i} className={r.passed ? "passed" : "failed"}>
                {r.passed ? <CheckCircle size={14} /> : <XCircle size={14} />}
                <span>{r.label}</span>
                {!r.passed && <div className="oops-hint">Hint: {r.hint}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
