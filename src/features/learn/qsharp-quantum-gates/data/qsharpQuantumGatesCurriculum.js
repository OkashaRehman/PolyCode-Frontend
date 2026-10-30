// PolyCode — Q# Quantum Gates curriculum
import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
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
];

export const QSHARP_QUANTUM_GATES_CHAPTERS = RAW_CHAPTERS;

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
