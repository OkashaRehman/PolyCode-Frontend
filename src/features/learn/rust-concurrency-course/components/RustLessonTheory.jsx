import React, { useState } from "react";
import LearnChapterIcon from "../../shared/LearnChapterIcon";

// NOTE FOR INTEGRATORS:
// This component was written to match the *shape* of the existing
// NumpyIntroTheory component (theory blocks of type text/diagram/code/
// callout/quiz), since Rust lessons use the identical schema. It does not
// depend on Pyodide or any language runtime — it's pure rendering — so it
// should be safe to drop in as-is. If your design system already has a
// generic (language-agnostic) theory renderer, prefer that one instead and
// delete this file.

function TextBlock({ content }) {
  const html = content
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
  return (
    <p className="oops-theory-text" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function CodeBlock({ label, content }) {
  return (
    <div className="oops-theory-code">
      {label && <div className="oops-theory-code-label">{label}</div>}
      <pre>
        <code>{content}</code>
      </pre>
    </div>
  );
}

function CalloutBlock({ variant = "info", content }) {
  const html = content
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
  return (
    <div className={`oops-callout oops-callout-${variant}`}>
      <span
        className="oops-callout-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function DiagramBlock({ title, nodes = [] }) {
  return (
    <div className="oops-theory-diagram">
      {title && <div className="oops-theory-diagram-title">{title}</div>}
      <div className="oops-theory-diagram-grid">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="oops-theory-diagram-node"
            style={{ "--node-color": node.color }}
          >
            <strong>{node.label}</strong>
            <ul>
              {(node.items || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizBlock({ block, quizStoragePrefix, lessonId }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  function choose(index) {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
  }

  return (
    <div className="oops-theory-quiz">
      <p className="oops-quiz-question">{block.question}</p>
      <div className="oops-quiz-options">
        {block.options.map((option, index) => {
          const isCorrect = index === block.answer;
          const isSelected = index === selected;
          let stateClass = "";
          if (revealed && isSelected && isCorrect) stateClass = "correct";
          else if (revealed && isSelected && !isCorrect) stateClass = "incorrect";
          else if (revealed && isCorrect) stateClass = "correct-reveal";
          return (
            <button
              key={index}
              type="button"
              className={`oops-quiz-option ${stateClass}`}
              onClick={() => choose(index)}
              disabled={revealed}
            >
              {option}
            </button>
          );
        })}
      </div>
      {revealed && (
        <p className="oops-quiz-explanation">{block.explanation}</p>
      )}
    </div>
  );
}

export default function RustLessonTheory({
  lesson,
  quizStoragePrefix,
  confidence,
  onConfidenceChange,
  markedAsRead,
  onMarkAsRead,
  onGoChallenge,
}) {
  if (!lesson) return null;

  return (
    <div className="oops-lesson-theory">
      <header className="oops-lesson-theory-header">
        <span className="oops-chapter-icon-wrap" aria-hidden>
          <LearnChapterIcon icon={lesson.chapterColor ? "🦀" : "🦀"} size={16} />
        </span>
        <h2>{lesson.title}</h2>
      </header>

      {lesson.theory.map((block, i) => {
        switch (block.type) {
          case "text":
            return <TextBlock key={i} content={block.content} />;
          case "code":
            return (
              <CodeBlock key={i} label={block.label} content={block.content} />
            );
          case "callout":
            return (
              <CalloutBlock
                key={i}
                variant={block.variant}
                content={block.content}
              />
            );
          case "diagram":
            return (
              <DiagramBlock key={i} title={block.title} nodes={block.nodes} />
            );
          case "quiz":
            return (
              <QuizBlock
                key={i}
                block={block}
                quizStoragePrefix={quizStoragePrefix}
                lessonId={lesson.id}
              />
            );
          default:
            return null;
        }
      })}

      <div className="oops-lesson-theory-footer">
        <label className="oops-mark-read">
          <input
            type="checkbox"
            checked={!!markedAsRead}
            onChange={(e) => onMarkAsRead?.(e.target.checked)}
          />
          I've read this lesson
        </label>

        <div className="oops-confidence-row" aria-label="How confident do you feel?">
          {["Not confident", "Somewhat", "Confident"].map((label, i) => (
            <button
              key={label}
              type="button"
              className={confidence === i ? "active" : ""}
              onClick={() => onConfidenceChange?.(i)}
            >
              {label}
            </button>
          ))}
        </div>

        <button type="button" className="oops-go-challenge-btn" onClick={onGoChallenge}>
          Go to challenge →
        </button>
      </div>
    </div>
  );
}
