// Shared text-generation helpers for the Flutter curriculum generator.
// These functions build literal JS *source code strings* (not runtime
// objects) so the final flutterCurriculum.js reads just like scipyCurriculum.js
// — with real quiz()/challenge()/kw() calls in the source.

function str(s) {
  return JSON.stringify(String(s));
}

function strArray(arr, indent) {
  const pad = " ".repeat(indent);
  const padEnd = " ".repeat(Math.max(indent - 2, 0));
  const items = arr.map((v) => `${pad}${str(v)},`).join("\n");
  return `[\n${items}\n${padEnd}]`;
}

function renderVisual(visual, chapterColor, indent) {
  const pad = " ".repeat(indent);
  const pad2 = " ".repeat(indent + 2);
  const pad4 = " ".repeat(indent + 4);
  const pad6 = " ".repeat(indent + 6);

  if (visual.kind === "table") {
    const rows = visual.rows
      .map((vals, i) => {
        const values = vals.map((v) => str(v)).join(", ");
        return `${pad4}{ label: ${str(String(i + 1))}, values: [${values}] },`;
      })
      .join("\n");
    return `{
${pad2}type: "table",
${pad2}title: ${str(visual.title)},
${pad2}columns: [${visual.columns.map((c) => str(c)).join(", ")}],
${pad2}rows: [
${rows}
${pad2}],
${pad}}`;
  }

  // diagram
  const nodes = visual.nodes
    .map((n, i) => {
      const items = n.items.map((v) => str(v)).join(", ");
      return `${pad4}{
${pad6}id: ${str(`n${i}`)},
${pad6}label: ${str(n.label)},
${pad6}color: ${str(n.color || chapterColor)},
${pad6}items: [${items}],
${pad4}},`;
    })
    .join("\n");
  return `{
${pad2}type: "diagram",
${pad2}title: ${str(visual.title)},
${pad2}nodes: [
${nodes}
${pad2}],
${pad}}`;
}

export function renderLesson(spec, id, chapterColor) {
  const i2 = "        "; // 8
  const i3 = "          "; // 10
  const i4 = "            "; // 12

  const introText = `${i3}{
${i4}type: "text",
${i4}content: ${str(
    `**Introduction:** ${spec.def}\n\n**Real-life example:** ${spec.example}`,
  )},
${i3}},`;

  const learnText = `${i3}{
${i4}type: "text",
${i4}content: ${str(
    `**In this topic you will learn:**\n\n${spec.learn
      .map((b) => `• ${b}`)
      .join("\n")}`,
  )},
${i3}},`;

  const scenarioBlock = `${i3}{
${i4}type: "scenario",
${i4}title: ${str(spec.scenarioTitle || "Think of it like this")},
${i4}content: ${str(spec.scenario)},
${i3}},`;

  const visualBlock = `${i3}${renderVisual(spec.visual, chapterColor, 10)},`;

  const codeBlock = `${i3}{
${i4}type: "code",
${i4}lang: "dart",
${i4}label: ${str(spec.code.label)},
${i4}content: ${str(spec.code.content)},
${i3}},`;

  const tipBlock = `${i3}{
${i4}type: "callout",
${i4}variant: "tip",
${i4}content: ${str(`**Tip:** ${spec.tip}`)},
${i3}},`;

  const warningBlock = `${i3}{
${i4}type: "callout",
${i4}variant: "warning",
${i4}content: ${str(`**Watch out:** ${spec.warning}`)},
${i3}},`;

  const practiceText = `${i3}{
${i4}type: "text",
${i4}content: ${str(
    `**Practice:**\n\n**Level 1 (Easy):** ${spec.practice.level1}\n\n**Level 2 (Practice):** ${spec.practice.level2}\n\n**Level 3 (Challenge):** ${spec.practice.level3}`,
  )},
${i3}},`;

  const summaryText = `${i3}{
${i4}type: "text",
${i4}content: ${str(
    `**Lesson summary:** ${spec.summary}\n\n**Next step:** ${spec.next}`,
  )},
${i3}},`;

  const quizBlock = `${i3}quiz(
${i4}${str(spec.quiz.q)},
${i4}${strArray(spec.quiz.options, 14)},
${i4}${spec.quiz.answer},
${i4}${str(spec.quiz.explain)},
${i3}),`;

  const kwBlocks = spec.challenge.keywords
    .map(
      (k, idx) =>
        `${i4}kw(${idx + 1}, ${str(k.label)}, ${str(k.hint)}, ${str(k.pattern)}),`,
    )
    .join("\n");

  const challengeBlock = `${i2}challenge: challenge(
${i3}${str(spec.challenge.title)},
${i3}${str(spec.challenge.desc)},
${i3}${str(spec.challenge.starter)},
${i3}${str(spec.challenge.solution)},
${i3}[
${kwBlocks}
${i3}],
${i2}),`;

  return `      {
        id: ${str(id)},
        title: ${str(spec.title)},
        xp: ${spec.xp},
        theory: [
${introText}
${learnText}
${scenarioBlock}
${visualBlock}
${codeBlock}
${tipBlock}
${warningBlock}
${practiceText}
${summaryText}
${quizBlock}
        ],
${challengeBlock}
      },`;
}

export function renderChapter(chapterDef, lessonIds) {
  const lessons = chapterDef.lessons
    .map((spec, i) => renderLesson(spec, lessonIds[i], chapterDef.color))
    .join("\n");
  return `  {
    id: ${str(chapterDef.id)},
    title: ${str(chapterDef.title)},
    icon: ${str(chapterDef.icon)},
    color: ${str(chapterDef.color)},
    lessons: [
${lessons}
    ],
  },`;
}
