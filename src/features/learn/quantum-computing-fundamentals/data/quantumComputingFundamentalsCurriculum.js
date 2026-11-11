// PolyCode — Quantum Computing Fundamentals full curriculum
// 3 chapters · 6 lessons · theory-first with light browser-Python checks (Pyodide)
// YouTube links: edit quantumComputingFundamentalsVideoLinks.js (not this file).
//
// This file follows the exact same shape as
// python-fundamentals/data/pythonFundamentalsCurriculum.js so it works with
// the shared NumpyIntroTheory / PythonCodeChallenge / OopsSidebar components
// without any changes to those files.

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { QUANTUM_COMPUTING_FUNDAMENTALS_VIDEO_LINKS } from "./quantumComputingFundamentalsVideoLinks";

const ACCENT = "#6366f1";

const RAW_QUANTUM_COMPUTING_FUNDAMENTALS_CHAPTERS = [
  {
    id: "quantum-foundations",
    title: "Foundations",
    icon: "⚛️",
    color: ACCENT,
    lessons: [
      {
        id: "qc-0",
        title: "What Is Quantum Computing?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Quantum computing** uses qubits instead of classical bits to represent and process information. Where a classical bit is strictly 0 or 1, a qubit can exist in a combination — a *superposition* — of both, which unlocks fundamentally different kinds of algorithms.",
          },
          {
            type: "diagram",
            title: "Classical vs quantum computing",
            nodes: [
              {
                id: "classical",
                label: "Classical bit",
                color: "#3776ab",
                items: ["Always 0 or 1", "Deterministic", "Read anytime"],
              },
              {
                id: "quantum",
                label: "Qubit",
                color: ACCENT,
                items: ["0, 1, or both at once", "Probabilistic", "Collapses on measurement"],
              },
              {
                id: "uses",
                label: "Where it helps",
                color: "#a855f7",
                items: ["Search & optimization", "Cryptography", "Chemistry simulation"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "A qubit state as two numbers (amplitudes)",
            content: `# A qubit's state can be written as [amplitude_of_0, amplitude_of_1]\nqubit_state = [1, 0]  # this qubit is definitely 0\nprint(qubit_state)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "You don't need physics or advanced math to start. This course builds intuition first — the linear algebra comes later, one small step at a time.",
          },
          {
            type: "quiz",
            question: "What can a qubit represent that a classical bit cannot?",
            options: [
              "Negative numbers",
              "A combination of 0 and 1 at the same time",
              "Text characters",
              "Nothing — they're identical",
            ],
            answer: 1,
            explanation:
              "Superposition lets a qubit hold a blend of both basis states until it's measured.",
          },
        ],
        challenge: {
          title: "Represent a Qubit",
          description:
            "Create a variable `qubit_state` set to the list `[1, 0]` (representing a qubit certainly in state 0), then print it.",
          starterCode: `# Represent a qubit that is definitely 0\n\n`,
          solutionCode: `qubit_state = [1, 0]\nprint(qubit_state)`,
          tests: [
            { id: 1, label: "Defines qubit_state", keywords: [{ pattern: "qubit_state\\s*=" }] },
            { id: 2, label: "Uses print()", keywords: [{ pattern: "print\\s*\\(" }] },
          ],
        },
      },
      {
        id: "qc-1",
        title: "Bits vs Qubits",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "A classical **register** of n bits stores exactly one of 2ⁿ values at a time. A quantum register of n qubits can represent a *weighted combination* of all 2ⁿ values simultaneously — that combinatorial space is where quantum speedups come from.",
          },
          {
            type: "diagram",
            title: "Growing state space",
            nodes: [
              { id: "one", label: "1 qubit", color: ACCENT, items: ["2 possible states"] },
              { id: "two", label: "2 qubits", color: "#8b5cf6", items: ["4 possible states"] },
              { id: "three", label: "3 qubits", color: "#a855f7", items: ["8 possible states"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Counting classical states for n bits",
            content: `def classical_states(n):\n    return 2 ** n\n\nprint(classical_states(3))  # 8 possible 3-bit values`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "This exponential growth is a double-edged sword: it's why quantum computers are hard to simulate classically, and also why they're hard to build reliably.",
          },
          {
            type: "quiz",
            question: "How many possible states can 3 qubits represent at once (in superposition)?",
            options: ["3", "6", "8", "9"],
            answer: 2,
            explanation: "n qubits span 2ⁿ basis states — 2³ = 8.",
          },
        ],
        challenge: {
          title: "Count the States",
          description:
            "Write a function `classical_states(n)` that returns `2 ** n`, then print `classical_states(4)`.",
          starterCode: `def classical_states(n):\n    # return 2 to the power of n\n    pass\n\n`,
          solutionCode: `def classical_states(n):\n    return 2 ** n\n\nprint(classical_states(4))`,
          tests: [
            { id: 1, label: "Defines classical_states", keywords: [{ pattern: "def\\s+classical_states" }] },
            { id: 2, label: "Uses 2 ** n", keywords: [{ pattern: "2\\s*\\*\\*\\s*n" }] },
            { id: 3, label: "Calls classical_states(4)", keywords: [{ pattern: "classical_states\\s*\\(\\s*4\\s*\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "quantum-core-concepts",
    title: "Core Concepts",
    icon: "🔗",
    color: "#8b5cf6",
    lessons: [
      {
        id: "qc-2",
        title: "Superposition",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "**Superposition** means a qubit's state is a weighted mix of |0⟩ and |1⟩, written as amplitudes. The probability of measuring each outcome is the *square* of its amplitude — and all probabilities must add up to 1.",
          },
          {
            type: "code",
            lang: "python",
            label: "Equal superposition — 50/50 odds",
            content: `import math\n\namp = 1 / math.sqrt(2)\nstate = [amp, amp]\nprobabilities = [a ** 2 for a in state]\nprint(probabilities)  # [0.5, 0.5]`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Amplitudes can be negative (or even complex numbers) — only the squared magnitude has to be a valid probability.",
          },
          {
            type: "quiz",
            question: "If a qubit's amplitudes are both 1/√2, what's the probability of measuring 0?",
            options: ["0%", "25%", "50%", "100%"],
            answer: 2,
            explanation: "(1/√2)² = 0.5, so there's a 50% chance for each outcome.",
          },
        ],
        challenge: {
          title: "Check the Probabilities",
          description:
            "Given `state = [0.6, 0.8]`, compute a list `probabilities` of each amplitude squared, and print it.",
          starterCode: `state = [0.6, 0.8]\n\n`,
          solutionCode: `state = [0.6, 0.8]\nprobabilities = [a ** 2 for a in state]\nprint(probabilities)`,
          tests: [
            { id: 1, label: "Defines probabilities", keywords: [{ pattern: "probabilities\\s*=" }] },
            { id: 2, label: "Squares amplitudes", keywords: [{ pattern: "\\*\\*\\s*2" }] },
            { id: 3, label: "Prints result", keywords: [{ pattern: "print\\s*\\(\\s*probabilities" }] },
          ],
        },
      },
      {
        id: "qc-3",
        title: "Entanglement",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "**Entanglement** links two or more qubits so that measuring one instantly tells you something about the other — regardless of distance. Entangled qubits can't be described independently; you have to describe the *pair* as a single system.",
          },
          {
            type: "diagram",
            title: "Independent vs entangled qubits",
            nodes: [
              { id: "indep", label: "Independent", color: "#3776ab", items: ["Each qubit stands alone", "Outcomes uncorrelated"] },
              { id: "entangled", label: "Entangled (Bell pair)", color: "#8b5cf6", items: ["Measuring one fixes the other", "Correlated outcomes"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "A Bell pair's possible outcomes",
            content: `bell_pair_outcomes = ["00", "11"]  # only ever both-0 or both-1\nprint(bell_pair_outcomes)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Entanglement is the resource behind quantum teleportation and quantum key distribution — it's correlation, not communication.",
          },
          {
            type: "quiz",
            question: "In a simple Bell pair, if you measure the first qubit as 1, what do you know about the second?",
            options: ["Nothing", "It's also 1", "It's definitely 0", "It's in superposition"],
            answer: 1,
            explanation: "A Bell pair is perfectly correlated — both qubits collapse to matching values.",
          },
        ],
        challenge: {
          title: "List Bell Pair Outcomes",
          description:
            "Create a list `bell_pair_outcomes` containing only the strings `\"00\"` and `\"11\"`, then print it.",
          starterCode: `# Only two outcomes are possible for a Bell pair\n\n`,
          solutionCode: `bell_pair_outcomes = ["00", "11"]\nprint(bell_pair_outcomes)`,
          tests: [
            { id: 1, label: "Defines bell_pair_outcomes", keywords: [{ pattern: "bell_pair_outcomes\\s*=" }] },
            { id: 2, label: "Includes 00 and 11", keywords: [{ pattern: "\"00\"[\\s\\S]*\"11\"" }] },
          ],
        },
      },
    ],
  },
  {
    id: "quantum-circuits",
    title: "Circuits & Measurement",
    icon: "🧮",
    color: "#a855f7",
    lessons: [
      {
        id: "qc-4",
        title: "Quantum Gates and Circuits",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "A **quantum circuit** is a sequence of **gates** applied to qubits — the quantum equivalent of logic gates. The Hadamard gate (H) creates superposition; the Pauli-X gate flips a qubit like a classical NOT; the CNOT gate entangles two qubits.",
          },
          {
            type: "diagram",
            title: "Common gates",
            nodes: [
              { id: "h", label: "Hadamard (H)", color: ACCENT, items: ["Creates superposition"] },
              { id: "x", label: "Pauli-X", color: "#8b5cf6", items: ["Flips |0⟩ ↔ |1⟩"] },
              { id: "cnot", label: "CNOT", color: "#a855f7", items: ["Entangles two qubits"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Modeling a tiny circuit as a list of steps",
            content: `circuit = ['H', 'CNOT']  # Hadamard then CNOT builds a Bell pair\nfor gate in circuit:\n    print('Apply', gate)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Real circuits run on hardware like IBM Quantum or simulators such as Qiskit — this course keeps the math visible in plain Python before you touch a real SDK.",
          },
          {
            type: "quiz",
            question: "Which gate is typically used first to create superposition?",
            options: ["CNOT", "Hadamard", "Pauli-X", "Measurement"],
            answer: 1,
            explanation: "The Hadamard gate turns a definite |0⟩ or |1⟩ into an equal superposition.",
          },
        ],
        challenge: {
          title: "Build a Bell-Pair Circuit",
          description:
            "Create a list `circuit` containing the strings `\"H\"` then `\"CNOT\"` in that order, then loop over it and print `f\"Apply {gate}\"` for each.",
          starterCode: `# Build the circuit as a list, then apply each gate\n\n`,
          solutionCode: `circuit = ["H", "CNOT"]\nfor gate in circuit:\n    print(f"Apply {gate}")`,
          tests: [
            { id: 1, label: "Defines circuit list", keywords: [{ pattern: "circuit\\s*=\\s*\\[" }] },
            { id: 2, label: "Loops over circuit", keywords: [{ pattern: "for\\s+gate\\s+in\\s+circuit" }] },
            { id: 3, label: "Prints each gate", keywords: [{ pattern: "print\\s*\\(" }] },
          ],
        },
      },
      {
        id: "qc-5",
        title: "Measurement and Probability",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "**Measuring** a qubit collapses its superposition into a definite classical outcome — 0 or 1 — with probability given by the squared amplitude. Repeating a circuit many times and counting outcomes is how quantum programs are actually read out.",
          },
          {
            type: "code",
            lang: "python",
            label: "Simulating repeated measurement with weighted random choice",
            content: `import random\n\ndef measure(probabilities, outcomes=("0", "1"), shots=1000):\n    return random.choices(outcomes, weights=probabilities, k=shots)\n\nresults = measure([0.5, 0.5])\nprint(results.count("0"), results.count("1"))`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "This is exactly what real quantum hardware reports back: a histogram of measured bitstrings across many \"shots\", not a single clean answer.",
          },
          {
            type: "quiz",
            question: "Why do quantum programs typically run a circuit thousands of times (\"shots\")?",
            options: [
              "To make it slower on purpose",
              "Because a single measurement only gives one probabilistic outcome",
              "Hardware requires it for cooling",
              "It doesn't matter, one run is enough",
            ],
            answer: 1,
            explanation:
              "Since measurement is probabilistic, many shots are needed to estimate the true outcome distribution.",
          },
        ],
        challenge: {
          title: "Simulate a Measurement",
          description:
            "Given `probabilities = [0.5, 0.5]`, use `random.choices([\"0\", \"1\"], weights=probabilities, k=100)` to create `results`, then print `results.count(\"0\")`.",
          starterCode: `import random\n\nprobabilities = [0.5, 0.5]\n\n`,
          solutionCode: `import random\n\nprobabilities = [0.5, 0.5]\nresults = random.choices(["0", "1"], weights=probabilities, k=100)\nprint(results.count("0"))`,
          tests: [
            { id: 1, label: "Uses random.choices", keywords: [{ pattern: "random\\.choices" }] },
            { id: 2, label: "Defines results", keywords: [{ pattern: "results\\s*=" }] },
            { id: 3, label: "Counts outcome '0'", keywords: [{ pattern: "results\\.count\\s*\\(\\s*\"0\"\\s*\\)" }] },
          ],
        },
      },
    ],
  },
];

// This course skips a separate *LessonEnhancements.js file (unlike
// python-fundamentals) for simplicity — the chapters are exported as-is.
// Add one later, following pythonLessonEnhancements.js, if you want
// per-lesson objectives/scenarios auto-merged into the first lesson of
// each chapter.
export const QUANTUM_COMPUTING_FUNDAMENTALS_CHAPTERS =
  RAW_QUANTUM_COMPUTING_FUNDAMENTALS_CHAPTERS;

export const QUANTUM_COMPUTING_FUNDAMENTALS_LESSONS = applyLessonVideoLinks(
  QUANTUM_COMPUTING_FUNDAMENTALS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  QUANTUM_COMPUTING_FUNDAMENTALS_VIDEO_LINKS,
);

export const QUANTUM_COMPUTING_FUNDAMENTALS_TOTAL_XP =
  QUANTUM_COMPUTING_FUNDAMENTALS_LESSONS.reduce(
    (sum, lesson) => sum + lesson.xp,
    0,
  );
