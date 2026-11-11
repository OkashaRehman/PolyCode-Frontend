// PolyCode — Q# Quantum Programming Basics curriculum
import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import {
  expandQsharpChapters,
  QSHARP_LESSON_EXPANSIONS,
} from "../../shared/qsharpCurriculumExpansion";
import { QSHARP_QUANTUM_PROGRAMMING_BASICS_VIDEO_LINKS } from "./qsharpQuantumProgrammingBasicsVideoLinks";

const ACCENT = "#0284c7";

const RAW_CHAPTERS = [
  {
    id: "qpb-superposition",
    title: "Superposition & State Preparation",
    icon: "🌊",
    color: ACCENT,
    lessons: [
      {
        id: "qpb-0",
        title: "The Hadamard Gate (`H`)",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "Applying the `H` (Hadamard) gate puts a single qubit into an equal superposition state:\n$$H|0\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}}$$\nMeasurement of this state yields `Zero` 50% of the time and `One` 50% of the time.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Creating Superposition in Q#",
            content: `operation CreateSuperposition(q : Qubit) : Unit {\n    H(q); // Applies Hadamard gate\n}`,
          },
        ],
        challenge: {
          title: "Simulate Hadamard Probabilities",
          description: "Write `hadamard_prob()` returning `(0.5, 0.5)` for state probabilities of `|0>` and `|1>`.",
          starterCode: `def hadamard_prob():\n    # Return (0.5, 0.5)\n    pass\n`,
          solutionCode: `def hadamard_prob():\n    return (0.5, 0.5)`,
          tests: [
            { id: 1, label: "Defines hadamard_prob", keywords: [{ pattern: "def\\s+hadamard_prob" }] },
            { id: 2, label: "Returns 50-50 tuple", keywords: [{ pattern: "0\\.5" }] },
          ],
        },
      },
      {
        id: "qpb-1",
        title: "Equal Superposition States",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Applying `H` to an entire array of $N$ qubits creates an equal superposition over all $2^N$ classical basis states.",
          },
        ],
        challenge: {
          title: "Count Superposition Basis States",
          description: "Write `num_superposition_states(num_qubits)` returning $2^{\\text{num\\_qubits}}$.",
          starterCode: `def num_superposition_states(num_qubits):\n    # Return 2 ** num_qubits\n    pass\n`,
          solutionCode: `def num_superposition_states(num_qubits):\n    return 2 ** num_qubits`,
          tests: [
            { id: 1, label: "Defines num_superposition_states", keywords: [{ pattern: "def\\s+num_superposition_states" }] },
          ],
        },
      },
      {
        id: "qpb-2",
        title: "Arbitrary State Vector Preparation",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Rotations such as `Ry(theta, q)` allow preparing arbitrary single-qubit states $\\cos(\\theta/2)|0\\rangle + \\sin(\\theta/2)|1\\rangle$.",
          },
        ],
        challenge: {
          title: "State Amplitude Calculation",
          description: "Write `state_amplitudes(theta)` returning `[cos(theta/2), sin(theta/2)]` using `math` module.",
          starterCode: `import math\n\ndef state_amplitudes(theta):\n    # Return [math.cos(theta/2), math.sin(theta/2)]\n    pass\n`,
          solutionCode: `import math\n\ndef state_amplitudes(theta):\n    return [math.cos(theta / 2), math.sin(theta / 2)]`,
          tests: [
            { id: 1, label: "Defines state_amplitudes", keywords: [{ pattern: "def\\s+state_amplitudes" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qpb-registers",
    title: "Qubit Registers & Entanglement",
    icon: "🔗",
    color: "#6366f1",
    lessons: [
      {
        id: "qpb-3",
        title: "Allocating Qubit Arrays",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "In Q#, `use register = Qubit[n];` allocates an array of $n$ qubits that can be manipulated individually or as a multi-qubit register.",
          },
        ],
        challenge: {
          title: "Register Initialization Check",
          description: "Write `init_register_summary(n)` returning `'Register of n qubits ready'`.",
          starterCode: `def init_register_summary(n):\n    # Return string\n    pass\n`,
          solutionCode: `def init_register_summary(n):\n    return f"Register of {n} qubits ready"`,
          tests: [
            { id: 1, label: "Defines init_register_summary", keywords: [{ pattern: "def\\s+init_register_summary" }] },
          ],
        },
      },
      {
        id: "qpb-4",
        title: "Controlled Operations (`Controlled`)",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Q# functor `Controlled` transforms any operation into a controlled version. For example: `Controlled X([control], target);` applies `X` to target if control qubit is $|1\\rangle$.",
          },
        ],
        challenge: {
          title: "Simulate Controlled-X Gate",
          description: "Write `cx_gate(control, target)` returning `1 - target` if `control == 1` else `target`.",
          starterCode: `def cx_gate(control, target):\n    # Simulate CNOT gate\n    pass\n`,
          solutionCode: `def cx_gate(control, target):\n    return (1 - target) if control == 1 else target`,
          tests: [
            { id: 1, label: "Defines cx_gate", keywords: [{ pattern: "def\\s+cx_gate" }] },
          ],
        },
      },
      {
        id: "qpb-5",
        title: "Creating Bell States",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "The maximally entangled Bell state $|\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}$ is created by applying `H` to qubit 0, followed by `CNOT(qubit0, qubit1)`.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Bell State Operation in Q#",
            content: `operation CreateBellState(q0 : Qubit, q1 : Qubit) : Unit {\n    H(q0);\n    CNOT(q0, q1);\n}`,
          },
        ],
        challenge: {
          title: "Simulate Bell State Outcomes",
          description: "Write `bell_state_outcomes()` returning `['00', '11']` representing entangled measurement outcomes.",
          starterCode: `def bell_state_outcomes():\n    # Return list ["00", "11"]\n    pass\n`,
          solutionCode: `def bell_state_outcomes():\n    return ["00", "11"]`,
          tests: [
            { id: 1, label: "Defines bell_state_outcomes", keywords: [{ pattern: "def\\s+bell_state_outcomes" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qpb-operators",
    title: "Quantum Operators & Adjoint",
    icon: "🔄",
    color: "#a855f7",
    lessons: [
      {
        id: "qpb-6",
        title: "The `Adjoint` Functor",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "The `Adjoint` functor executes the conjugate transpose (inverse) of a unitary operation. For example, `Adjoint H(q)` or `Adjoint PrepareState(q)` uncomputes a quantum transformation.",
          },
        ],
        challenge: {
          title: "Check Inverse Property",
          description: "Write `is_inverse_identity(applied, inverse)` returning `True` if `applied == inverse` for self-inverse gates.",
          starterCode: `def is_inverse_identity(applied, inverse):\n    # Return boolean check\n    pass\n`,
          solutionCode: `def is_inverse_identity(applied, inverse):\n    return applied == inverse`,
          tests: [
            { id: 1, label: "Defines is_inverse_identity", keywords: [{ pattern: "def\\s+is_inverse_identity" }] },
          ],
        },
      },
      {
        id: "qpb-7",
        title: "Reversible Transformations",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "All non-measurement quantum operations are unitary and reversible. `Adjoint` allows clean uncomputation without leaving temporary quantum garbage.",
          },
        ],
        challenge: {
          title: "Uncomputation Flow Simulation",
          description: "Write `uncompute_pipeline(steps)` returning the reversed list of step inverse names `[f'Adjoint {s}' for s in reversed(steps)]`.",
          starterCode: `def uncompute_pipeline(steps):\n    # Return list of Adjoint step strings in reverse order\n    pass\n`,
          solutionCode: `def uncompute_pipeline(steps):\n    return [f"Adjoint {s}" for s in reversed(steps)]`,
          tests: [
            { id: 1, label: "Defines uncompute_pipeline", keywords: [{ pattern: "def\\s+uncompute_pipeline" }] },
          ],
        },
      },
      {
        id: "qpb-8",
        title: "Measuring Multi-Qubit Registers",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Use `MeasureEachZ(register)` in Q# to measure every qubit in an array, producing a `Result[]` array of classical bit values.",
          },
        ],
        challenge: {
          title: "Simulate Register Measurement",
          description: "Write `measure_register_all(states)` returning `[1 if s > 0.5 else 0 for s in states]`.",
          starterCode: `def measure_register_all(states):\n    # Return list of 0/1 ints\n    pass\n`,
          solutionCode: `def measure_register_all(states):\n    return [1 if s > 0.5 else 0 for s in states]`,
          tests: [
            { id: 1, label: "Defines measure_register_all", keywords: [{ pattern: "def\\s+measure_register_all" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qpb-feed-forward",
    title: "Mid-Circuit Measurement & Feed-Forward",
    icon: "↪️",
    color: "#0f766e",
    lessons: [
      {
        id: "qpb-9",
        title: "Branch on Measurement Results",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "A measurement result is classical data that can control later quantum operations. Feed-forward is essential in protocols such as teleportation, but measurement collapses the measured qubit and must be placed deliberately in the circuit.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Classical feed-forward in Q#",
            content: `operation CorrectFromResult(q : Qubit) : Unit {\n    let result = M(q);\n    if (result == One) {\n        X(q);\n    }\n}`,
          },
        ],
        challenge: {
          title: "Choose a Feed-Forward Correction",
          description: "Write `feed_forward_correction(result)` returning `'X'` for result `1` and `'I'` for result `0`.",
          starterCode: `def feed_forward_correction(result):\n    # Return the correction gate name\n    pass\n`,
          solutionCode: `def feed_forward_correction(result):\n    return "X" if result == 1 else "I"`,
          tests: [
            { id: 1, label: "Defines feed_forward_correction", keywords: [{ pattern: "def\\s+feed_forward_correction" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qpb-ancillas",
    title: "Ancillas & Clean Uncomputation",
    icon: "🧹",
    color: "#7c3aed",
    lessons: [
      {
        id: "qpb-10",
        title: "Keep Ancillas Clean",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "Ancilla qubits hold temporary information that can help compute an oracle or intermediate value. A well-formed circuit uncomputes this workspace before release so it does not remain entangled with the answer or contaminate later operations.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Compute, use, and uncompute",
            content: `operation ComputeAndUncompute(q : Qubit, ancilla : Qubit) : Unit {\n    CNOT(q, ancilla);\n    Z(ancilla);\n    CNOT(q, ancilla);\n}`,
          },
        ],
        challenge: {
          title: "Plan an Uncompute Sequence",
          description: "Write `uncompute_steps(steps)` returning the inverse operations in reverse order, each prefixed with `'Adjoint '`.",
          starterCode: `def uncompute_steps(steps):\n    # Return inverse steps in reverse order\n    pass\n`,
          solutionCode: `def uncompute_steps(steps):\n    return [f"Adjoint {step}" for step in reversed(steps)]`,
          tests: [
            { id: 1, label: "Defines uncompute_steps", keywords: [{ pattern: "def\\s+uncompute_steps" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qpb-contracts",
    title: "Composable Operations & Contracts",
    icon: "🧩",
    color: "#0891b2",
    lessons: [
      {
        id: "qpb-11",
        title: "Design Operations for Algorithm Composition",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Reusable Q# operations should make their qubit inputs, classical parameters, result, and supported functors explicit. Clear operation contracts let algorithms safely compose controlled and adjoint variants and help reviewers reason about circuit behavior.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "An operation with functor support",
            content: `operation ApplyOracle(q : Qubit) : Unit is Adj + Ctl {\n    Z(q);\n}`,
          },
        ],
        challenge: {
          title: "Check an Operation Contract",
          description: "Write `supports_reuse(has_adjoint, has_controlled)` returning `True` only when both capabilities are available.",
          starterCode: `def supports_reuse(has_adjoint, has_controlled):\n    # Both functors are required\n    pass\n`,
          solutionCode: `def supports_reuse(has_adjoint, has_controlled):\n    return has_adjoint and has_controlled`,
          tests: [
            { id: 1, label: "Defines supports_reuse", keywords: [{ pattern: "def\\s+supports_reuse" }] },
          ],
        },
      },
    ],
  },
];

export const QSHARP_QUANTUM_PROGRAMMING_BASICS_CHAPTERS = expandQsharpChapters(
  RAW_CHAPTERS,
  QSHARP_LESSON_EXPANSIONS.programmingBasics.chapters,
  "lessons",
  QSHARP_LESSON_EXPANSIONS.programmingBasics.examples,
);

export const QSHARP_QUANTUM_PROGRAMMING_BASICS_LESSONS = applyLessonVideoLinks(
  QSHARP_QUANTUM_PROGRAMMING_BASICS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  QSHARP_QUANTUM_PROGRAMMING_BASICS_VIDEO_LINKS,
);

export const QSHARP_QUANTUM_PROGRAMMING_BASICS_TOTAL_XP = QSHARP_QUANTUM_PROGRAMMING_BASICS_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
