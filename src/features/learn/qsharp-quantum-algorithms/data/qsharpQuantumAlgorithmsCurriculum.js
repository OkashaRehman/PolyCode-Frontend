// PolyCode — Q# Quantum Algorithms curriculum
import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { QSHARP_QUANTUM_ALGORITHMS_VIDEO_LINKS } from "./qsharpQuantumAlgorithmsVideoLinks";

const ACCENT = "#a855f7";

const RAW_CHAPTERS = [
  {
    id: "qa-deutsch",
    title: "Quantum Oracles & Deutsch-Jozsa",
    icon: "🔮",
    color: ACCENT,
    lessons: [
      {
        id: "qa-0",
        title: "Phase Oracles in Q#",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "A phase oracle flips the sign of target states $|x\\rangle$ for which $f(x) = 1$, converting a classical boolean function into a unitary quantum operator:\n$$U_f |x\\rangle = (-1)^{f(x)} |x\\rangle$$",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Phase Oracle Signature in Q#",
            content: `operation ApplyPhaseOracle(q : Qubit, targetState : Int) : Unit {\n    // Applies phase flip if qubit matches target state\n    Z(q);\n}`,
          },
        ],
        challenge: {
          title: "Simulate Phase Flip",
          description: "Write `phase_flip(state, fx)` returning `-state` if `fx == 1` else `state`.",
          starterCode: `def phase_flip(state, fx):\n    # Return -state if fx == 1 else state\n    pass\n`,
          solutionCode: `def phase_flip(state, fx):\n    return -state if fx == 1 else state`,
          tests: [
            { id: 1, label: "Defines phase_flip", keywords: [{ pattern: "def\\s+phase_flip" }] },
          ],
        },
      },
      {
        id: "qa-1",
        title: "Deutsch's Algorithm",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "Deutsch's algorithm determines whether a single-bit function $f: \\{0,1\\} \\rightarrow \\{0,1\\}$ is constant or balanced in just **one** quantum evaluation.",
          },
        ],
        challenge: {
          title: "Classify Single-Bit Function",
          description: "Write `is_constant(f_0, f_1)` returning `True` if `f_0 == f_1` else `False`.",
          starterCode: `def is_constant(f_0, f_1):\n    # Return True if constant function else False\n    pass\n`,
          solutionCode: `def is_constant(f_0, f_1):\n    return f_0 == f_1`,
          tests: [
            { id: 1, label: "Defines is_constant", keywords: [{ pattern: "def\\s+is_constant" }] },
          ],
        },
      },
      {
        id: "qa-2",
        title: "Deutsch-Jozsa Algorithm",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "Deutsch-Jozsa generalizes Deutsch's algorithm to $N$-bit functions, distinguishing constant functions from balanced functions exponentially faster than classical deterministic algorithms.",
          },
        ],
        challenge: {
          title: "Check Function Balance",
          description: "Write `deutsch_jozsa_eval(outputs)` returning `'Constant'` if all elements equal, else `'Balanced'`.",
          starterCode: `def deutsch_jozsa_eval(outputs):\n    # Return "Constant" or "Balanced"\n    pass\n`,
          solutionCode: `def deutsch_jozsa_eval(outputs):\n    return "Constant" if len(set(outputs)) == 1 else "Balanced"`,
          tests: [
            { id: 1, label: "Defines deutsch_jozsa_eval", keywords: [{ pattern: "def\\s+deutsch_jozsa_eval" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qa-search",
    title: "Quantum Search & Bernstein-Vazirani",
    icon: "🔍",
    color: "#6366f1",
    lessons: [
      {
        id: "qa-3",
        title: "Bernstein-Vazirani Algorithm",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "The Bernstein-Vazirani algorithm recovers an unknown secret bitstring $s \\in \\{0,1\\}^n$ from oracle $f(x) = s \\cdot x \\pmod 2$ in a single query.",
          },
        ],
        challenge: {
          title: "Dot Product Oracle",
          description: "Write `bv_oracle(x_bits, s_bits)` returning `sum(a * b for a, b in zip(x_bits, s_bits)) % 2`.",
          starterCode: `def bv_oracle(x_bits, s_bits):\n    # Return dot product mod 2\n    pass\n`,
          solutionCode: `def bv_oracle(x_bits, s_bits):\n    return sum(a * b for a, b in zip(x_bits, s_bits)) % 2`,
          tests: [
            { id: 1, label: "Defines bv_oracle", keywords: [{ pattern: "def\\s+bv_oracle" }] },
          ],
        },
      },
      {
        id: "qa-4",
        title: "Grover's Search Algorithm",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Grover's algorithm searches an unsorted database of $N$ items in $O(\\sqrt{N})$ queries using quantum amplitude amplification.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Grover Iterations in Q#",
            content: `operation GroverSearch(nQubits : Int) : Unit {\n    use register = Qubit[nQubits];
    // Prepare superposition, apply Oracle and Diffuser iterations\n}`,
          },
        ],
        challenge: {
          title: "Optimal Grover Iterations",
          description: "Write `grover_iterations(N)` returning `int((math.pi / 4) * math.sqrt(N))` using `math`.",
          starterCode: `import math\n\ndef grover_iterations(N):\n    # Return optimal iteration count\n    pass\n`,
          solutionCode: `import math\n\ndef grover_iterations(N):\n    return int((math.pi / 4) * math.sqrt(N))`,
          tests: [
            { id: 1, label: "Defines grover_iterations", keywords: [{ pattern: "def\\s+grover_iterations" }] },
          ],
        },
      },
      {
        id: "qa-5",
        title: "Amplitude Amplification",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "Amplitude Amplification rotates the quantum state vector toward marked target states by reflecting across the average probability amplitude.",
          },
        ],
        challenge: {
          title: "Diffuser Reflection Simulation",
          description: "Write `reflect_about_mean(amplitudes)` returning `[2 * (sum(amplitudes)/len(amplitudes)) - a for a in amplitudes]`.",
          starterCode: `def reflect_about_mean(amplitudes):\n    # Return list of reflected amplitudes\n    pass\n`,
          solutionCode: `def reflect_about_mean(amplitudes):\n    mean = sum(amplitudes) / len(amplitudes)\n    return [2 * mean - a for a in amplitudes]`,
          tests: [
            { id: 1, label: "Defines reflect_about_mean", keywords: [{ pattern: "def\\s+reflect_about_mean" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qa-qft",
    title: "Quantum Fourier Transform & Phase Estimation",
    icon: "📈",
    color: "#0d9488",
    lessons: [
      {
        id: "qa-6",
        title: "Quantum Fourier Transform (QFT)",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "The Quantum Fourier Transform maps quantum state $|x\\rangle$ into phase space frequencies, acting as the quantum analogue of the Discrete Fourier Transform.",
          },
        ],
        challenge: {
          title: "QFT Phase Factor",
          description: "Write `qft_phase(j, k, N)` returning `(2 * math.pi * j * k) / N`.",
          starterCode: `import math\n\ndef qft_phase(j, k, N):\n    # Return phase angle\n    pass\n`,
          solutionCode: `import math\n\ndef qft_phase(j, k, N):\n    return (2 * math.pi * j * k) / N`,
          tests: [
            { id: 1, label: "Defines qft_phase", keywords: [{ pattern: "def\\s+qft_phase" }] },
          ],
        },
      },
      {
        id: "qa-7",
        title: "Quantum Phase Estimation (QPE)",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Quantum Phase Estimation estimates the eigenphase $\\theta$ of a unitary operator $U|u\\rangle = e^{2\\pi i \\theta}|u\\rangle$ using controlled operations and inverse QFT.",
          },
        ],
        challenge: {
          title: "Estimate Phase from Bitstring",
          description: "Write `binary_to_phase(bitstring)` taking `'010'` and returning integer value divided by $2^{\\text{len}}$.",
          starterCode: `def binary_to_phase(bitstring):\n    # Convert bitstring to decimal phase\n    pass\n`,
          solutionCode: `def binary_to_phase(bitstring):\n    return int(bitstring, 2) / (2 ** len(bitstring))`,
          tests: [
            { id: 1, label: "Defines binary_to_phase", keywords: [{ pattern: "def\\s+binary_to_phase" }] },
          ],
        },
      },
      {
        id: "qa-8",
        title: "Order Finding Preview",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "Order finding uses QPE to find the smallest integer $r$ such that $a^r \\equiv 1 \\pmod N$, forming the quantum core of Shor's factoring algorithm.",
          },
        ],
        challenge: {
          title: "Check Order Period",
          description: "Write `find_classical_order(a, N)` returning smallest `r > 0` where `pow(a, r, N) == 1`.",
          starterCode: `def find_classical_order(a, N):\n    # Return order r\n    pass\n`,
          solutionCode: `def find_classical_order(a, N):\n    r = 1\n    val = a % N\n    while val != 1:\n        val = (val * a) % N\n        r += 1\n    return r`,
          tests: [
            { id: 1, label: "Defines find_classical_order", keywords: [{ pattern: "def\\s+find_classical_order" }] },
          ],
        },
      },
    ],
  },
];

export const QSHARP_QUANTUM_ALGORITHMS_CHAPTERS = RAW_CHAPTERS;

export const QSHARP_QUANTUM_ALGORITHMS_LESSONS = applyLessonVideoLinks(
  QSHARP_QUANTUM_ALGORITHMS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  QSHARP_QUANTUM_ALGORITHMS_VIDEO_LINKS,
);

export const QSHARP_QUANTUM_ALGORITHMS_TOTAL_XP = QSHARP_QUANTUM_ALGORITHMS_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
