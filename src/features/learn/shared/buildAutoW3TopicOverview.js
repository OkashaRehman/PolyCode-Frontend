function firstCodeSample(theory = []) {
  for (const block of theory) {
    if (block.type === "code" && block.content) {
      return {
        content: block.content,
        label: block.label || "Example",
        lang: block.lang || "python",
      };
    }
    if (block.type === "text" && block.code?.content) {
      return {
        content: block.code.content,
        label: block.code.label || block.label || "Example",
        lang: block.code.lang || block.lang || "python",
      };
    }
  }
  return null;
}

function referenceFromTheory(theory = []) {
  const refs = [];

  for (const block of theory) {
    if (block.type === "table") {
      for (const row of block.rows || []) {
        if (typeof row === "object" && row.label) {
          const description = (row.values || []).filter(Boolean).join(" — ");
          if (description) {
            refs.push({ term: row.label, description });
          }
        } else if (Array.isArray(row) && row[0]) {
          refs.push({
            term: row[0],
            description: row.slice(1).filter(Boolean).join(" — "),
          });
        }
      }
    }

    if (block.type === "diagram") {
      for (const node of block.nodes || []) {
        if (node.label && node.items?.[0]) {
          refs.push({ term: node.label, description: node.items[0] });
        }
      }
    }
  }

  return refs.slice(0, 8);
}

function pickCallout(theory, variants) {
  return theory.find(
    (block) => block.type === "callout" && variants.includes(block.variant),
  );
}

/**
 * Builds a W3Schools-style topicOverview from existing lesson theory blocks.
 * Used when a course has no hand-crafted topicOverview (npm / Ruby Gems do).
 */
export function buildAutoW3TopicOverview(lesson = {}) {
  const theory = lesson.theory || [];
  const firstText = theory.find(
    (block) => block.type === "text" && block.content && !block.code,
  );
  const objectivesBlock = theory.find((block) => block.type === "objectives");
  const essentials = (lesson.outcomes || objectivesBlock?.items || []).slice(0, 6);
  const code = firstCodeSample(theory);
  const reference = referenceFromTheory(theory);
  const tipBlock = pickCallout(theory, ["tip"]);
  const noteBlock = pickCallout(theory, ["warning", "info"]);

  const overview = {
    style: "w3",
    definition:
      firstText?.content ||
      `**${lesson.title || "This lesson"}** covers essential concepts from **${lesson.chapterTitle || "this chapter"}**. Read the tutorial below, run the examples, then try the challenge.`,
  };

  if (code) {
    overview.syntax = code.content.trim().split("\n").slice(0, 10).join("\n");
    overview.syntaxLabel = code.label || "Example";
    overview.syntaxLang = code.lang || "python";
  } else if (lesson.challenge?.starterCode) {
    const starter = lesson.challenge.starterCode
      .trim()
      .split("\n")
      .filter((line) => line.trim() && !/^\s*(\/\/|#)/.test(line))
      .slice(0, 8)
      .join("\n");
    if (starter) {
      overview.syntax = starter;
      overview.syntaxLabel = "Starter code";
    }
  }

  if (essentials.length >= 2) {
    overview.essentials = essentials;
  } else {
    overview.essentials = [
      `Understand the core idea in "${lesson.title || "this lesson"}"`,
      "Read each tutorial step and run the code examples",
      "Complete the coding challenge to earn XP",
    ];
  }

  if (reference.length) overview.reference = reference;
  if (tipBlock?.content) overview.tip = tipBlock.content;
  if (noteBlock?.content && noteBlock !== tipBlock) overview.note = noteBlock.content;
  if (lesson.challenge?.title) overview.practiceTitle = lesson.challenge.title;

  return overview;
}

export function lessonUsesW3Overview(lesson, autoW3 = true) {
  const custom = lesson?.topicOverview || {};
  return (
    custom.style === "w3" ||
    Boolean(custom.definition) ||
    autoW3
  );
}
