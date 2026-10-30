// PolyCode — Quantum Mechanics for Programmers full curriculum
// 3 chapters · 6 lessons · THEORY ONLY (no code challenges — this is a
// concept/physics course, unlike quantum-computing-fundamentals).
// YouTube links: edit quantumMechanicsForProgrammersVideoLinks.js (not this file).
//
// Lessons here intentionally have NO `challenge` key. The matching
// QuantumMechanicsForProgrammersLessonPage.jsx only renders the Theory tab
// and never references lesson.challenge.

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { QUANTUM_MECHANICS_FOR_PROGRAMMERS_VIDEO_LINKS } from "./quantumMechanicsForProgrammersVideoLinks";

const ACCENT = "#8b5cf6";

const RAW_QUANTUM_MECHANICS_FOR_PROGRAMMERS_CHAPTERS = [
  {
    id: "quantum-mechanics-vectors",
    title: "Vectors & Amplitudes",
    icon: "🧮",
    color: ACCENT,
    lessons: [
      {
        id: "qm-0",
        title: "Complex Numbers, Fast",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "Quantum amplitudes are usually **complex numbers**: `a + bi`, where `i = √-1`. You don't need deep complex-analysis skills — just two operations: computing a magnitude, and multiplying two complex numbers together.",
          },
          {
            type: "code",
            lang: "python",
            label: "Complex numbers in Python",
            content: `z = complex(0.6, 0.8)\nmagnitude = abs(z)\nprint(magnitude)  # 1.0 — a valid amplitude`,
          },
          {
            type: "diagram",
            title: "Why complex numbers?",
            nodes: [
              { id: "phase", label: "Phase", color: ACCENT, items: ["Encodes interference", "Not visible in |amplitude|²"] },
              { id: "mag", label: "Magnitude", color: "#a855f7", items: ["Squared = probability", "Always real, non-negative"] },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Two states can have the *same* probabilities but different phases — and phase differences are exactly what quantum interference exploits.",
          },
          {
            type: "quiz",
            question: "What must be true of a valid amplitude's squared magnitude, summed across all outcomes?",
            options: ["It sums to 0", "It sums to 1", "It sums to infinity", "It's always negative"],
            answer: 1,
            explanation: "Total probability across all measurement outcomes must equal 1.",
          },
        ],
      },
      {
        id: "qm-1",
        title: "State Vectors and Bra-Ket Notation",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "Physicists write a qubit's state as `|ψ⟩` (a **ket**, a column vector) and its conjugate transpose as `⟨ψ|` (a **bra**, a row vector). This is just notation for vectors and matrices you already understand from linear algebra.",
          },
          {
            type: "code",
            lang: "python",
            label: "A ket as a Python list",
            content: `ket_psi = [0.6, 0.8]  # |ψ⟩ = 0.6|0⟩ + 0.8|1⟩\nprint(ket_psi)`,
          },
          {
            type: "diagram",
            title: "Bra-ket at a glance",
            nodes: [
              { id: "ket", label: "|ψ⟩ (ket)", color: ACCENT, items: ["Column vector", "A state"] },
              { id: "bra", label: "⟨ψ| (bra)", color: "#a855f7", items: ["Row vector", "Conjugate transpose"] },
              { id: "inner", label: "⟨φ|ψ⟩", color: "#c026d3", items: ["Inner product", "Overlap between states"] },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              "`⟨φ|ψ⟩` measures how much two states overlap — it's the same inner product you'd compute for any two vectors, just written with angle brackets.",
          },
          {
            type: "quiz",
            question: "In bra-ket notation, what does |ψ⟩ represent?",
            options: ["A measurement result", "A column vector state", "A classical bit", "A quantum gate"],
            answer: 1,
            explanation: "The ket |ψ⟩ is standard notation for a state vector.",
          },
        ],
      },
    ],
  },
  {
    id: "quantum-mechanics-operators",
    title: "Operators & Evolution",
    icon: "🔄",
    color: "#a855f7",
    lessons: [
      {
        id: "qm-2",
        title: "Unitary Matrices",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "Every quantum gate is a **unitary matrix** — a matrix `U` whose inverse equals its conjugate transpose (`U†U = I`). Unitarity guarantees the total probability stays 1 after applying a gate — no information is silently lost.",
          },
          {
            type: "code",
            lang: "python",
            label: "Checking a 2x2 matrix's shape (not full unitarity)",
            content: `pauli_x = [[0, 1], [1, 0]]  # the quantum NOT gate\nfor row in pauli_x:\n    print(row)`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Not every matrix is a valid quantum gate — only unitary ones. This is why quantum circuits are reversible, unlike most classical logic gates.",
          },
          {
            type: "quiz",
            question: "Why must quantum gates be represented by unitary matrices?",
            options: [
              "To make circuits look symmetrical",
              "To preserve total probability (norm) after the operation",
              "Because classical computers require it",
              "Unitary matrices are always diagonal",
            ],
            answer: 1,
            explanation: "Unitarity keeps the state vector's total probability equal to 1.",
          },
        ],
      },
      {
        id: "qm-3",
        title: "The Bloch Sphere",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "The **Bloch sphere** is a way to visualize any single-qubit state as a point on the surface of a 3D sphere. The north and south poles are |0⟩ and |1⟩; everywhere else on the surface is a valid superposition, including relative phase.",
          },
          {
            type: "diagram",
            title: "Bloch sphere landmarks",
            nodes: [
              { id: "north", label: "North pole", color: ACCENT, items: ["|0⟩"] },
              { id: "south", label: "South pole", color: "#c026d3", items: ["|1⟩"] },
              { id: "equator", label: "Equator", color: "#a855f7", items: ["Equal superpositions", "Different phases"] },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "A Hadamard gate rotates a state from a pole to the equator — that rotation *is* what \"creating superposition\" looks like geometrically.",
          },
          {
            type: "quiz",
            question: "On the Bloch sphere, where does a qubit certainly measured as 0 sit?",
            options: ["The equator", "The north pole", "The south pole", "Anywhere at random"],
            answer: 1,
            explanation: "|0⟩ is conventionally placed at the north pole of the Bloch sphere.",
          },
        ],
      },
    ],
  },
  {
    id: "quantum-mechanics-measurement",
    title: "Measurement & Uncertainty",
    icon: "📏",
    color: "#c026d3",
    lessons: [
      {
        id: "qm-4",
        title: "Measurement Operators",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "Measuring a qubit in the computational basis projects its state onto |0⟩ or |1⟩ with probability equal to the squared amplitude, then **collapses** the state — any superposition information is gone after that single measurement.",
          },
          {
            type: "code",
            lang: "python",
            label: "Collapsing a state after measurement (conceptually)",
            content: `state_before = [0.6, 0.8]\n# After measuring and getting outcome 1:\nstate_after = [0, 1]\nprint(state_before, '->', state_after)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "This collapse is why quantum algorithms are designed around interference *before* measurement — once you measure, the rich state is gone.",
          },
          {
            type: "quiz",
            question: "What happens to a qubit's superposition immediately after measurement?",
            options: [
              "Nothing changes",
              "It collapses to the measured outcome",
              "It doubles in magnitude",
              "It becomes entangled automatically",
            ],
            answer: 1,
            explanation: "Measurement collapses the state vector to match the observed outcome.",
          },
        ],
      },
      {
        id: "qm-5",
        title: "The Uncertainty Principle",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "The **uncertainty principle** says certain pairs of properties (like position and momentum, or two non-commuting quantum measurements) can't both be known precisely at the same time. In quantum computing, this shows up as measurement bases that reveal one property while scrambling another.",
          },
          {
            type: "diagram",
            title: "Complementary measurement bases",
            nodes: [
              { id: "z", label: "Z-basis", color: ACCENT, items: ["Measures 0/1", "Standard basis"] },
              { id: "x", label: "X-basis", color: "#c026d3", items: ["Measures +/-", "Complementary to Z"] },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "This isn't a limitation of our instruments — it's a fundamental property of quantum states, and it's part of what makes quantum cryptography (like BB84) secure.",
          },
          {
            type: "quiz",
            question: "Why does the uncertainty principle matter for quantum cryptography?",
            options: [
              "It doesn't — it's unrelated",
              "Measuring in the wrong basis unavoidably disturbs the state, revealing eavesdropping",
              "It only applies to classical bits",
              "It guarantees perfect copying of qubits",
            ],
            answer: 1,
            explanation:
              "An eavesdropper measuring in the wrong basis disturbs the qubit — detectable by the legitimate parties.",
          },
        ],
      },
    ],
  },
];

export const QUANTUM_MECHANICS_FOR_PROGRAMMERS_CHAPTERS =
  RAW_QUANTUM_MECHANICS_FOR_PROGRAMMERS_CHAPTERS;

export const QUANTUM_MECHANICS_FOR_PROGRAMMERS_LESSONS = applyLessonVideoLinks(
  QUANTUM_MECHANICS_FOR_PROGRAMMERS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  QUANTUM_MECHANICS_FOR_PROGRAMMERS_VIDEO_LINKS,
);

export const QUANTUM_MECHANICS_FOR_PROGRAMMERS_TOTAL_XP =
  QUANTUM_MECHANICS_FOR_PROGRAMMERS_LESSONS.reduce(
    (sum, lesson) => sum + lesson.xp,
    0,
  );
