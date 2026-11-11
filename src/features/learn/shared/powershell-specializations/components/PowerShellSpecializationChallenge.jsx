import React, { useEffect, useState } from "react";
import { CheckCircle, Play, XCircle } from "lucide-react";
import Editor from "@monaco-editor/react";

export default function PowerShellSpecializationChallenge({
  lesson,
  onSuccess,
  isCompleted,
  initialCode,
  onCodeChange,
}) {
  const [code, setCode] = useState(
    initialCode || lesson.challenge.starterCode || "",
  );
  const [results, setResults] = useState(null);

  useEffect(() => {
    setCode(initialCode || lesson.challenge.starterCode || "");
    setResults(null);
  }, [lesson.id, lesson.challenge.starterCode, initialCode]);

  function handleCodeChange(value) {
    const nextCode = value || "";
    setCode(nextCode);
    onCodeChange?.(nextCode);
  }

  function runCode() {
    const nextResults = lesson.challenge.tests.map((test) => ({
      ...test,
      passed: test.keywords.every((keyword) =>
        code.toLowerCase().includes(keyword.toLowerCase()),
      ),
    }));
    setResults(nextResults);
    if (nextResults.every((result) => result.passed)) onSuccess();
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
          <Play size={14} /> Check solution
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
        }}
      />
      {results && (
        <div className="oops-test-results" role="status">
          <h4>Check Results</h4>
          <ul>
            {results.map((result) => (
              <li
                key={result.id}
                className={result.passed ? "passed" : "failed"}
              >
                {result.passed ? (
                  <CheckCircle size={14} />
                ) : (
                  <XCircle size={14} />
                )}
                <span>{result.label}</span>
                {!result.passed && (
                  <div className="oops-hint">Hint: {result.hint}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
