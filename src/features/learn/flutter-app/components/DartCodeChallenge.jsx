import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useAuth } from "../../../auth/context/AuthContext";
import {
  definePolycodeMonacoTheme,
  getVSCodeEditorOptions,
  POLYCODE_VSCODE_THEME,
} from "../../../../shared/utils/monacoTheme";
import ChallengeCompleteCelebration from "../../shared/ChallengeCompleteCelebration";
import { useChallengeCelebration } from "../../shared/useChallengeCelebration";
import { useChallengeTelemetry } from "../../shared/challengeTelemetry";

function normalizeWhitespace(value = "") {
  return value.replace(/\s+/g, "");
}

function testPasses(test, code) {
  const keywords = test.keywords || [];
  if (!keywords.length) return true;

  return keywords.every((keyword) => {
    if (typeof keyword === "string") {
      return (
        code.includes(keyword) ||
        normalizeWhitespace(code).includes(normalizeWhitespace(keyword))
      );
    }
    if (keyword?.pattern) {
      return new RegExp(keyword.pattern, keyword.flags || "").test(code);
    }
    return true;
  });
}

/**
 * Keyword-based Dart/Flutter challenge checker.
 * Flutter widgets cannot run inside the browser — learners run full apps
 * locally with `flutter run`. Challenges verify required code patterns.
 */
export default function DartCodeChallenge({
  challenge,
  accentColor,
  isCompleted,
  onComplete,
  initialCode,
  onCodeChange,
}) {
  const { loading: authLoading, isAuthenticated } = useAuth();
  const canRun = isAuthenticated && !authLoading;
  const reportChallengeResult = useChallengeTelemetry();

  const [code, setCode] = useState(initialCode || challenge.starterCode);
  const [results, setResults] = useState(null);
  const [output, setOutput] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const showSolutionRef = useRef(false);
  showSolutionRef.current = showSolution;
  const [running, setRunning] = useState(false);
  const activeChallengeId = useRef(challenge.id);
  const runTestsRef = useRef(null);
  const { showCelebration, triggerCelebration, dismissCelebration } =
    useChallengeCelebration(challenge.id);

  useEffect(() => {
    const challengeChanged = activeChallengeId.current !== challenge.id;
    if (challengeChanged) {
      activeChallengeId.current = challenge.id;
      setCode(initialCode || challenge.starterCode);
      setResults(null);
      setOutput(null);
      setShowSolution(false);
      return;
    }

    if (typeof initialCode === "string") {
      setCode((currentCode) =>
        currentCode === challenge.starterCode ? initialCode : currentCode,
      );
    }
  }, [challenge.id, challenge.starterCode, initialCode]);

  function runTests() {
    if (!canRun || running || showSolution) return;

    setRunning(true);
    setResults(null);
    setOutput({
      status: "running",
      stdout: "Checking your Dart / Flutter code patterns…",
    });

    window.setTimeout(() => {
      const testResults = (challenge.tests || []).map((test) => ({
        ...test,
        passed: testPasses(test, code),
      }));
      const allPassed = testResults.every((test) => test.passed);

      setResults({ passed: allPassed, tests: testResults });
      setOutput({
        status: allPassed ? "pass" : "fail",
        stdout: allPassed
          ? "All acceptance checks passed.\n\nTip: For Flutter UI lessons, also run the app locally with `flutter run` to see the real screen."
          : "Some checks failed. Read the hints, adjust your code, then Check again.",
      });

      if (allPassed) {
        reportChallengeResult?.(true);
        triggerCelebration();
        if (!isCompleted) {
          Promise.resolve(onComplete()).catch((error) => {
            console.error("Unable to save Flutter lesson progress:", error);
          });
        }
      } else {
        reportChallengeResult?.(false);
      }

      setRunning(false);
    }, 450);
  }

  useEffect(() => {
    runTestsRef.current = runTests;
  });

  function handleEditorMount(editor, monaco) {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (canRun) runTestsRef.current?.();
    });
  }

  function resetCode() {
    setCode(challenge.starterCode);
    onCodeChange?.(challenge.starterCode);
    setResults(null);
    setOutput(null);
    setShowSolution(false);
  }

  return (
    <div className="oops-challenge">
      <ChallengeCompleteCelebration
        show={showCelebration}
        onDismiss={dismissCelebration}
      />
      <div className="oops-problem-panel">
        <div className="oops-problem-header">
          <h3 className="oops-problem-title">{challenge.title}</h3>
          {canRun && isCompleted && (
            <span
              className="oops-problem-solved"
              style={{ color: accentColor }}
            >
              ✓ Solved
            </span>
          )}
        </div>
        <p className="oops-problem-desc">{challenge.description}</p>
        <div className="oops-callout" style={{ "--callout-color": accentColor }}>
          <div>
            <strong>How checks work:</strong> PolyCode verifies required Dart /
            Flutter patterns in your editor. Full Flutter screens need Android
            Studio / VS Code + an emulator or phone (`flutter run`).
          </div>
        </div>

        {!canRun && (
          <div className="oops-auth-gate">
            <p>
              You can write code in the editor. Sign in or create an account to
              check, save progress, and mark lessons complete.
            </p>
            <div className="oops-auth-gate-actions">
              <Link to="/login" className="oops-auth-gate-btn">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="oops-auth-gate-btn oops-auth-gate-btn-primary"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}

        <div className="oops-test-cases">
          <div className="oops-test-cases-label">Acceptance Checks</div>
          {(results ? results.tests : challenge.tests).map((t) => (
            <div
              key={t.id}
              className={`oops-test-row ${
                results ? (t.passed ? "oops-test-pass" : "oops-test-fail") : ""
              }`}
            >
              <span className="oops-test-icon">
                {results ? (t.passed ? "✓" : "✗") : "○"}
              </span>
              <span className="oops-test-label">{t.label}</span>
              {results && !t.passed && t.hint && (
                <span className="oops-test-hint">Hint: {t.hint}</span>
              )}
            </div>
          ))}
        </div>

        <div
          className={`oops-output-panel ${
            output?.status ? `oops-output-${output.status}` : ""
          }`}
        >
          <div className="oops-output-head">
            <span>Check result</span>
            <small>{output ? "after last check" : "waiting"}</small>
          </div>
          <pre className="oops-output-body">
            {output?.stdout || "Press Check to verify your code patterns."}
          </pre>
        </div>
      </div>

      <div className="oops-editor-panel">
        <div className="oops-editor-topbar">
          <span className="oops-editor-lang">Dart · main.dart</span>
          <div className="oops-editor-actions">
            <button
              type="button"
              className="oops-editor-action"
              onClick={resetCode}
            >
              ↺ Reset
            </button>
            <button
              type="button"
              className="oops-editor-action"
              onClick={() => setShowSolution(!showSolution)}
              disabled={!canRun}
            >
              {showSolution ? "Hide Solution" : "Solution"}
            </button>
          </div>
        </div>

        <div className="oops-monaco-wrap">
          <Editor
            height="420px"
            language="dart"
            theme={POLYCODE_VSCODE_THEME}
            value={showSolution ? challenge.solutionCode : code}
            options={{
              ...getVSCodeEditorOptions(),
              readOnly: showSolution || !canRun,
            }}
            beforeMount={definePolycodeMonacoTheme}
            onMount={handleEditorMount}
            onChange={(value) => {
              if (showSolutionRef.current) return;
              const next = value ?? "";
              setCode(next);
              onCodeChange?.(next);
            }}
          />
        </div>

        <div className="oops-run-bar">
          <button
            type="button"
            className="oops-run-btn"
            style={{ background: accentColor }}
            onClick={runTests}
            disabled={!canRun || running || showSolution}
          >
            {running ? "Checking…" : "Check code"}
          </button>
          <span className="oops-run-hint">Ctrl/Cmd + Enter</span>
        </div>
      </div>
    </div>
  );
}
