function stripMarkdown(text = "") {
  return String(text)
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function uniquePush(list, seen, text) {
  const clean = stripMarkdown(text);
  if (!clean || clean.length < 6) return;
  const key = clean.toLowerCase().slice(0, 96);
  if (seen.has(key)) return;
  seen.add(key);
  list.push(clean);
}

/**
 * Builds summary + essential bullets from lesson theory (or custom topicOverview).
 */
export function buildLessonTopicOverview(lesson = {}) {
  const theory = lesson.theory || [];
  const custom = lesson.topicOverview || {};

  if (custom.summary && custom.essentials?.length) {
    return {
      title: lesson.title || "This topic",
      chapterTitle: lesson.chapterTitle || "",
      summary: custom.summary,
      essentials: custom.essentials.slice(0, 8),
      practiceTitle: lesson.challenge?.title || null,
      xp: lesson.xp || null,
    };
  }

  const firstText = theory.find(
    (block) => block.type === "text" && block.content && !block.code,
  );
  const objectivesBlock = theory.find((block) => block.type === "objectives");
  const outcomes =
    lesson.outcomes?.length > 0
      ? lesson.outcomes
      : objectivesBlock?.items || [];

  const essentials = [];
  const seen = new Set();

  outcomes.forEach((item) => uniquePush(essentials, seen, item));

  theory
    .filter((block) => block.type === "callout")
    .slice(0, 4)
    .forEach((block) => uniquePush(essentials, seen, block.content));

  theory
    .filter((block) => block.type === "table")
    .slice(0, 2)
    .forEach((table) => {
      (table.rows || []).slice(0, 4).forEach((row) => {
        if (Array.isArray(row)) {
          const [label, ...values] = row;
          if (label && values[0]) {
            uniquePush(essentials, seen, `${label}: ${values[0]}`);
          } else if (label) {
            uniquePush(essentials, seen, label);
          }
          return;
        }
        if (row?.label && row.values?.[0]) {
          uniquePush(essentials, seen, `${row.label}: ${row.values[0]}`);
        } else if (row?.label) {
          uniquePush(essentials, seen, row.label);
        }
      });
    });

  theory
    .filter((block) => block.type === "diagram")
    .slice(0, 1)
    .forEach((diagram) => {
      (diagram.nodes || []).slice(0, 4).forEach((node) => {
        if (node.label) uniquePush(essentials, seen, node.label);
        (node.items || []).slice(0, 1).forEach((item) => uniquePush(essentials, seen, item));
      });
    });

  if (essentials.length < 3) {
    theory
      .filter((block) => block.type === "text" && block.content)
      .slice(1, 3)
      .forEach((block) => {
        const sentence =
          stripMarkdown(block.content).split(/(?<=[.!?])\s+/)[0] || block.content;
        uniquePush(essentials, seen, sentence);
      });
  }

  const summary =
    custom.summary ||
    firstText?.content ||
    `**${lesson.title || "This lesson"}** introduces core ideas from **${lesson.chapterTitle || "this chapter"}** — read the essentials below, then follow the steps and try the challenge.`;

  return {
    title: lesson.title || "This topic",
    chapterTitle: lesson.chapterTitle || "",
    summary,
    essentials: (custom.essentials?.length ? custom.essentials : essentials).slice(0, 8),
    practiceTitle: lesson.challenge?.title || null,
    xp: lesson.xp || null,
  };
}
