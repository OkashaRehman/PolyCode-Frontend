import { ASSISTANT_CONFIG } from "../../landing/lib/assistantConfig";

export function getContextLabel(context = {}) {
  if (context.mode === "lesson" && context.lessonTitle) {
    const course = context.course ? `${context.course} · ` : "";
    return `${course}${context.lessonTitle}`;
  }
  if (context.page === "playground") return "Playground";
  if (context.page === "docs") return "Documentation";
  if (context.page === "daily-challenge") return "Daily Challenge";
  if (context.page === "profile") return "Profile";
  if (context.page === "landing") return "PolyCode Home";
  if (context.course) return context.course;
  return null;
}

export function getQuickPrompts(context = {}) {
  if (context.mode === "lesson") {
    const title = context.lessonTitle || "this lesson";
    return [
      `Explain ${title} in simple words`,
      "Why is my code not working?",
      "Give me a hint (not the full answer)",
      "What should I try next?",
    ];
  }

  if (context.page === "playground") {
    return [
      "Help me debug my code",
      "Explain this error message",
      "How do I improve this solution?",
      "What does this syntax mean?",
    ];
  }

  if (context.page === "daily-challenge") {
    return [
      "Give me a hint for today's challenge",
      "Explain the approach step by step",
      "What concept is this testing?",
    ];
  }

  if (context.page === "docs") {
    return [
      "Summarize this topic for me",
      "Give me a simple example",
      "What should I learn next?",
    ];
  }

  return ASSISTANT_CONFIG.quickPrompts;
}

export function getWelcomeMessage(context = {}) {
  if (context.mode === "lesson" && context.lessonTitle) {
    return `I'm here to help with **${context.lessonTitle}**. Ask me to explain concepts, debug your code, or give hints for the challenge — I'll guide you step by step.`;
  }

  if (context.page === "playground") {
    return "You're in the **Playground**. Paste errors, ask about syntax, or get help debugging — I'll walk you through it.";
  }

  return ASSISTANT_CONFIG.welcomeMessage;
}
