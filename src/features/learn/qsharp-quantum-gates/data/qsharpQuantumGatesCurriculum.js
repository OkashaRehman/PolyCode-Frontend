// PolyCode — Q# Quantum Gates curriculum
import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import {
  expandQsharpChapters,
  QSHARP_LESSON_EXPANSIONS,
} from "../../shared/qsharpCurriculumExpansion";
import { QSHARP_QUANTUM_GATES_VIDEO_LINKS } from "./qsharpQuantumGatesVideoLinks";

const ACCENT = "#e11d48";

const RAW_CHAPTERS = [
  {
    id: "qg-single",
    title: "Single-Qubit Pauli & Rotation Gates",
    icon: "🎛️",
    color: ACCENT,
    lessons: [
      {
        id: "qg-0",
        title: "Pauli X, Y, Z Gates",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "The Pauli gates act as quantum rotations around the X, Y, and Z axes on the Bloch sphere:\n- `X(q)`: Bit-flip gate ($|0\\rangle \\leftrightarrow |1\\rangle$)\n- `Z(q)`: Phase-flip gate ($|1\\rangle \\rightarrow -|1\\rangle$)\n- `Y(q)`: Combined bit and phase flip ($iXZ$).",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Applying Pauli Gates",
            content: `operation ApplyPauliGates(q : Qubit) : Unit {\n    X(q); // Flip bit\n    Y(q);\n    Z(q); // Flip phase\n}`,
          },
        ],
        challenge: {
          title: "Simulate Pauli-X Bit Flip",
          description: "Write `pauli_x(bit)` returning `1 - bit` for classical bit values `0` or `1`.",
          starterCode: `def pauli_x(bit):\n    # Return flipped bit\n    pass\n`,
          solutionCode: `def pauli_x(bit):\n    return 1 - bit`,
          tests: [
            { id: 1, label: "Defines pauli_x", keywords: [{ pattern: "def\\s+pauli_x" }] },
          ],
        },
      },
      {
        id: "qg-1",
        title: "Rotation Gates (`Rx`, `Ry`, `Rz`)",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Continuous rotation operations `Rx(theta, q)`, `Ry(theta, q)`, and `Rz(theta, q)` rotate the state vector by angle `theta` around specified Bloch sphere axes.",
          },
        ],
        challenge: {
          title: "Check Full Rotation Angle",
          description: "Write `is_full_rotation(theta)` returning `True` if `theta % (2 * math.pi) == 0` using `math` module.",
          starterCode: `import math\n\ndef is_full_rotation(theta):\n    # Return boolean check for 2pi multiples\n    pass\n`,
          solutionCode: `import math\n\ndef is_full_rotation(theta):\n    return math.isclose(theta % (2 * math.pi), 0, abs_tol=1e-5)`,
          tests: [
            { id: 1, label: "Defines is_full_rotation", keywords: [{ pattern: "def\\s+is_full_rotation" }] },
          ],
        },
      },
      {
        id: "qg-2",
        title: "Phase & T Gates (`S`, `T`)",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "`S` gate applies $\\pi/2$ phase shift ($S = \\sqrt{Z}$), and `T` gate applies $\\pi/4$ phase shift ($T = \\sqrt{S}$).",
          },
        ],
        challenge: {
          title: "Phase Gate Angle Sum",
          description: "Write `t_gate_count_for_phase(target_phase)` returning integer count of `T` gates required (each T adds pi/4 phase).",
          starterCode: `import math\n\ndef t_gate_count_for_phase(target_phase):\n    # Return int(target_phase / (math.pi / 4))\n    pass\n`,
          solutionCode: `import math\n\ndef t_gate_count_for_phase(target_phase):\n    return int(round(target_phase / (math.pi / 4)))`,
          tests: [
            { id: 1, label: "Defines t_gate_count_for_phase", keywords: [{ pattern: "def\\s+t_gate_count_for_phase" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qg-two",
    title: "Two-Qubit & Controlled Gates",
    icon: "🔀",
    color: "#f59e0b",
    lessons: [
      {
        id: "qg-3",
        title: "CNOT / CX Gate",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`CNOT(control, target)` flips target if control is $|1\\rangle$. It is fundamental for generating entanglement between qubits.",
          },
        ],
        challenge: {
          title: "CNOT Truth Table Output",
          description: "Write `cnot_output(c, t)` returning tuple `(c, c ^ t)`.",
          starterCode: `def cnot_output(c, t):\n    # Return (c, c ^ t)\n    pass\n`,
          solutionCode: `def cnot_output(c, t):\n    return (c, c ^ t)`,
          tests: [
            { id: 1, label: "Defines cnot_output", keywords: [{ pattern: "def\\s+cnot_output" }] },
          ],
        },
      },
      {
        id: "qg-4",
        title: "Controlled-Z & Controlled-Phase",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "`CZ(control, target)` applies a phase flip $-1$ only when both control and target are in the $|11\\rangle$ state.",
          },
        ],
        challenge: {
          title: "Simulate Controlled-Z Phase Shift",
          description: "Write `cz_phase(c, t)` returning `-1` if `c == 1 and t == 1` else `1`.",
          starterCode: `def cz_phase(c, t):\n    # Return -1 if c==1 and t==1 else 1\n    pass\n`,
          solutionCode: `def cz_phase(c, t):\n    return -1 if c == 1 and t == 1 else 1`,
          tests: [
            { id: 1, label: "Defines cz_phase", keywords: [{ pattern: "def\\s+cz_phase" }] },
          ],
        },
      },
      {
        id: "qg-5",
        title: "SWAP Gate (`SWAP`)",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "`SWAP(q1, q2)` exchanges the quantum states of two qubits, equivalent to 3 CNOT gates in sequence.",
          },
        ],
        challenge: {
          title: "Simulate SWAP Gate",
          description: "Write `swap_states(q1, q2)` returning `(q2, q1)`.",
          starterCode: `def swap_states(q1, q2):\n    # Return swapped pair\n    pass\n`,
          solutionCode: `def swap_states(q1, q2):\n    return (q2, q1)`,
          tests: [
            { id: 1, label: "Defines swap_states", keywords: [{ pattern: "def\\s+swap_states" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qg-multi",
    title: "Multi-Qubit & Universal Gate Sets",
    icon: "⚙️",
    color: "#10b981",
    lessons: [
      {
        id: "qg-6",
        title: "Toffoli Gate (`CCNOT`)",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "The Toffoli (CCNOT) gate flips the target qubit if and only if both control qubits are $|1\\rangle$. It is a universal gate for reversible classical computation.",
          },
        ],
        challenge: {
          title: "Simulate Toffoli Gate",
          description: "Write `toffoli_gate(c1, c2, t)` returning `t ^ (c1 & c2)`.",
          starterCode: `def toffoli_gate(c1, c2, t):\n    # Return target state after Toffoli gate\n    pass\n`,
          solutionCode: `def toffoli_gate(c1, c2, t):\n    return t ^ (c1 & c2)`,
          tests: [
            { id: 1, label: "Defines toffoli_gate", keywords: [{ pattern: "def\\s+toffoli_gate" }] },
          ],
        },
      },
      {
        id: "qg-7",
        title: "Decomposing Arbitrary Gates",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "Any multi-qubit unitary gate can be decomposed into single-qubit rotations (`Rx`, `Ry`, `Rz`) and CNOT gates.",
          },
        ],
        challenge: {
          title: "Estimate Gate Depth",
          description: "Write `estimate_depth(single_gates, cnot_gates)` returning `single_gates + 2 * cnot_gates`.",
          starterCode: `def estimate_depth(single_gates, cnot_gates):\n    # Return estimated circuit depth\n    pass\n`,
          solutionCode: `def estimate_depth(single_gates, cnot_gates):\n    return single_gates + 2 * cnot_gates`,
          tests: [
            { id: 1, label: "Defines estimate_depth", keywords: [{ pattern: "def\\s+estimate_depth" }] },
          ],
        },
      },
      {
        id: "qg-8",
        title: "Reversible Logic Synthesis",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Reversible classical logic uses Toffoli and CNOT gates to evaluate boolean functions without erasing information.",
          },
        ],
        challenge: {
          title: "Reversible AND Gate Output",
          description: "Write `reversible_and(a, b)` returning `a & b` using bitwise AND.",
          starterCode: `def reversible_and(a, b):\n    # Return AND output\n    pass\n`,
          solutionCode: `def reversible_and(a, b):\n    return a & b`,
          tests: [
            { id: 1, label: "Defines reversible_and", keywords: [{ pattern: "def\\s+reversible_and" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qg-basis",
    title: "Basis Changes & Phase Kickback",
    icon: "🧭",
    color: "#0f766e",
    lessons: [
      {
        id: "qg-9",
        title: "Change Measurement Basis with Gates",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "Changing basis before a Z-basis measurement lets a circuit access information in another basis. For example, applying H before measurement measures in the X basis; phase kickback uses a target phase to imprint oracle information on a control register.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Measure in the X basis",
            content: `operation MeasureInXBasis(q : Qubit) : Result {\n    H(q);\n    return M(q);\n}`,
          },
        ],
        challenge: {
          title: "Select a Measurement-Basis Circuit",
          description: "Write `basis_change_gate(basis)` returning `'H'` for `'X'`, `'I'` for `'Z'`, and `'Unsupported'` otherwise.",
          starterCode: `def basis_change_gate(basis):\n    # Return the gate applied before Z measurement\n    pass\n`,
          solutionCode: `def basis_change_gate(basis):\n    if basis == "X":\n        return "H"\n    if basis == "Z":\n        return "I"\n    return "Unsupported"`,
          tests: [
            { id: 1, label: "Defines basis_change_gate", keywords: [{ pattern: "def\\s+basis_change_gate" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qg-decomposition",
    title: "Gate Decomposition & Fault-Tolerant Cost",
    icon: "📐",
    color: "#7c3aed",
    lessons: [
      {
        id: "qg-10",
        title: "Estimate Decomposition and T-Count",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "A logical operation may need decomposition into a hardware- or fault-tolerant gate set. Approximation depth, two-qubit gate count, and especially T-count can dominate execution cost, so a mathematically correct circuit is not automatically an efficient one.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Compose a rotation from standard gates",
            content: `operation ApproximateRotation(q : Qubit) : Unit {\n    H(q);\n    T(q);\n    H(q);\n}`,
          },
        ],
        challenge: {
          title: "Estimate Circuit T-Count",
          description: "Write `total_t_count(operations)` returning the number of `'T'` entries in a list of gate names.",
          starterCode: `def total_t_count(operations):\n    # Count T gates\n    pass\n`,
          solutionCode: `def total_t_count(operations):\n    return sum(operation == "T" for operation in operations)`,
          tests: [
            { id: 1, label: "Defines total_t_count", keywords: [{ pattern: "def\\s+total_t_count" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qg-verification",
    title: "Circuit Verification & Optimization",
    icon: "✅",
    color: "#0891b2",
    lessons: [
      {
        id: "qg-11",
        title: "Simplify and Verify Gate Sequences",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Circuit optimization starts with semantics-preserving rewrites: adjacent self-inverse gates such as H-H or X-X cancel, while gate reordering is valid only when operators commute. Verify each rewrite against the circuit's action, not just its appearance.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Self-inverse gate identity",
            content: `operation ApplyIdentity(q : Qubit) : Unit {\n    H(q);\n    H(q);\n}`,
          },
        ],
        challenge: {
          title: "Cancel Adjacent Self-Inverse Gates",
          description: "Write `cancel_pairs(gates)` removing adjacent identical gates from a sequence. Assume all entries are self-inverse gate names.",
          starterCode: `def cancel_pairs(gates):\n    # Remove adjacent identical pairs\n    pass\n`,
          solutionCode: `def cancel_pairs(gates):\n    result = []\n    for gate in gates:\n        if result and result[-1] == gate:\n            result.pop()\n        else:\n            result.append(gate)\n    return result`,
          tests: [
            { id: 1, label: "Defines cancel_pairs", keywords: [{ pattern: "def\\s+cancel_pairs" }] },
          ],
        },
      },
    ],
  },
];

export const QSHARP_QUANTUM_GATES_CHAPTERS = expandQsharpChapters(
  RAW_CHAPTERS,
  QSHARP_LESSON_EXPANSIONS.gates.chapters,
  "lessons",
  QSHARP_LESSON_EXPANSIONS.gates.examples,
);

export const QSHARP_QUANTUM_GATES_LESSONS = applyLessonVideoLinks(
  QSHARP_QUANTUM_GATES_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  QSHARP_QUANTUM_GATES_VIDEO_LINKS,
);

export const QSHARP_QUANTUM_GATES_TOTAL_XP = QSHARP_QUANTUM_GATES_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
