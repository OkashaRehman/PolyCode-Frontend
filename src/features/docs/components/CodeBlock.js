import React, { useState, useCallback, useRef, lazy, Suspense } from "react";
import {
  executeCode,
  resolveEngine,
} from "../../playground/services/BrowserExecutor";
import "../../playground/components/IDE.css";

// ── Lazy-load the heavy syntax-highlighter library ──
// This keeps it out of the initial bundle; it's downloaded only when a
// CodeBlock actually mounts (i.e. when a document page is opened).
const SyntaxHighlighter = lazy(() =>
  import("react-syntax-highlighter").then((m) => ({ default: m.Prism })),
);

// Theme objects are also loaded lazily alongside the highlighter
let _themes = null;
async function loadThemes() {
  if (_themes) return _themes;
  const [darkMod, lightMod] = await Promise.all([
    import("react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus"),
    import("react-syntax-highlighter/dist/esm/styles/prism/one-light"),
  ]);
  _themes = { dark: darkMod.default, light: lightMod.default };
  return _themes;
}

// Eagerly kick off theme load so it's ready by the time the highlighter renders
loadThemes();

const makeSyntaxStyle = (baseStyle) => ({
  ...baseStyle,
  'pre[class*="language-"]': {
    ...baseStyle['pre[class*="language-"]'],
    background: "transparent",
    margin: 0,
    padding: "20px",
    fontSize: "0.845rem",
    lineHeight: "1.75",
  },
  'code[class*="language-"]': {
    ...baseStyle['code[class*="language-"]'],
    background: "transparent",
  },
});

// Thin skeleton shown while SyntaxHighlighter chunk loads
function CodeSkeleton({ code }) {
  return (
    <pre
      style={{
        padding: "20px",
        fontSize: "0.845rem",
        lineHeight: "1.75",
        background: "transparent",
        margin: 0,
        whiteSpace: "pre-wrap",
        opacity: 0.5,
      }}
    >
      {code}
    </pre>
  );
}

function HighlighterWithTheme({ language, code, isLightTheme }) {
  const [themes, setThemes] = useState(_themes);

  React.useEffect(() => {
    if (!themes) {
      loadThemes().then(setThemes);
    }
  }, [themes]);

  if (!themes) return <CodeSkeleton code={code} />;

  const baseStyle = isLightTheme ? themes.light : themes.dark;
  const syntaxStyle = makeSyntaxStyle(baseStyle);

  return (
    <SyntaxHighlighter
      language={language}
      style={syntaxStyle}
      showLineNumbers
      lineNumberStyle={{
        color: isLightTheme
          ? "rgba(71, 85, 105, 0.65)"
          : "rgba(255,255,255,0.12)",
        fontSize: "0.7rem",
        minWidth: "2.5em",
        paddingRight: "1em",
        userSelect: "none",
      }}
      wrapLongLines={false}
    >
      {code}
    </SyntaxHighlighter>
  );
}

export default function CodeBlock({
  code: initialCode,
  language = "python",
  filename,
  theme,
}) {
  const [code, setCode] = useState(initialCode);
  const [editMode, setEditMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState(null);
  const [previewHTML, setPreview] = useState(null);
  const textareaRef = useRef(null);

  const langInfo = resolveEngine(language);
  const hasOutput = output !== null || previewHTML !== null;
  const isLightTheme = theme === "light";

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(null);
    setPreview(null);
  };

  const toggleEdit = () => {
    setEditMode((e) => !e);
    if (!editMode) setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.target;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      }, 0);
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRun();
    }
  };

  const handleRun = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setOutput(null);
    setPreview(null);

    try {
      const result = await executeCode(code, language);
      if (result.previewHTML) {
        setPreview(result.previewHTML);
      } else {
        const lines = [];
        if (result.stdout) lines.push({ type: "stdout", text: result.stdout });
        if (result.stderr) lines.push({ type: "stderr", text: result.stderr });
        if (result.error) lines.push({ type: "stderr", text: result.error });
        if (!lines.length) lines.push({ type: "stdout", text: "(no output)" });
        setOutput(lines);
      }
    } catch (e) {
      setOutput([{ type: "stderr", text: e.message }]);
    } finally {
      setRunning(false);
    }
  }, [code, language, running]);

  const handleClear = () => {
    setOutput(null);
    setPreview(null);
  };

  const langMap = {
    python: "py",
    javascript: "js",
    typescript: "ts",
    bash: "sh",
  };
  const displayLang = langMap[language] || language;

  return (
    <div className={`code-block ide-enhanced ${hasOutput ? "has-output" : ""}`}>
      {/* ── Header ── */}
      <div className="code-block-header">
        <div className="dots">
          <span className="dot dot-red" />
          <span className="dot dot-amber" />
          <span className="dot dot-green" />
        </div>
        <span className="lang-label">
          {langInfo.icon} {filename || displayLang}
        </span>
        <div className="ide-actions">
          <button
            className={`ide-btn ${editMode ? "active" : ""}`}
            onClick={toggleEdit}
            title={editMode ? "Switch to read-only view" : "Edit this code"}
          >
            {editMode ? "👁 View" : "✏ Edit"}
          </button>

          {code !== initialCode && (
            <button
              className="ide-btn"
              onClick={handleReset}
              title="Reset to original"
            >
              ↺
            </button>
          )}

          <button
            className={`ide-btn run-btn ${running ? "running" : ""}`}
            onClick={handleRun}
            disabled={running}
            title={editMode ? "Run (Ctrl+Enter)" : "Run code"}
          >
            {running ? "⟳ Running…" : "▶ Run"}
          </button>

          {langInfo.engine === "server" && (
            <span
              className="ide-runtime-pill"
              title="Runs in local simulation mode"
            >
              Local Sim
            </span>
          )}

          <button
            className={`copy-trigger ${copied ? "active" : ""}`}
            onClick={handleCopy}
            aria-label="Copy code"
          >
            <span className="copy-label">{copied ? "✓ COPIED" : "COPY"}</span>
            <div className="copy-glow"></div>
          </button>
        </div>
      </div>

      {/* ── Split layout ── */}
      <div className="ide-split-layout">
        <div className="ide-code-panel">
          {editMode ? (
            <div className="ide-editor-wrapper">
              <textarea
                ref={textareaRef}
                className="ide-textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="Write your code here…"
              />
            </div>
          ) : (
            // Suspense boundary so the highlighter chunk loads without blocking
            <Suspense fallback={<CodeSkeleton code={code} />}>
              <HighlighterWithTheme
                language={langInfo.mono || language}
                code={code}
                isLightTheme={isLightTheme}
              />
            </Suspense>
          )}
        </div>

        {hasOutput && (
          <div className="ide-output-panel">
            <div className="ide-output-header">
              <span>{previewHTML ? "🌐 Preview" : "⬡ Output"}</span>
              <button className="ide-clear-btn" onClick={handleClear}>
                ✕ Clear
              </button>
            </div>

            {previewHTML ? (
              <iframe
                className="ide-preview-iframe"
                srcDoc={previewHTML}
                title="preview"
                sandbox="allow-scripts"
              />
            ) : (
              <div className="ide-output-body">
                {output.map((line, i) => (
                  <pre key={i} className={`ide-out-line ${line.type}`}>
                    {line.text}
                  </pre>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {editMode && (
        <div className="ide-edit-hint">
          Tab = indent &nbsp;·&nbsp; Ctrl+Enter = run
        </div>
      )}
    </div>
  );
}
