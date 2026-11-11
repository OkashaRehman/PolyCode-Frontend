// PolyCode — Quantum Algorithms full curriculum
// 3 chapters · 6 lessons · theory + light browser-Python checks (Pyodide)
// YouTube links: edit quantumAlgorithmsVideoLinks.js (not this file).
//
// Same shape as quantum-computing-fundamentals: every lesson has both
// `theory` and `challenge`. Challenges simulate algorithm behavior in plain
// Python (oracle lookups, counting, probability weighting) rather than
// requiring a real quantum SDK.

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { QUANTUM_ALGORITHMS_VIDEO_LINKS } from "./quantumAlgorithmsVideoLinks";

const ACCENT = "#a855f7";

const RAW_QUANTUM_ALGORITHMS_CHAPTERS = [
  {
    id: "qa-foundations",
    title: "Algorithmic Building Blocks",
    icon: "🧩",
    color: ACCENT,
    lessons: [
      {
        id: "qa-0",
        title: "Quantum Parallelism",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "**Quantum parallelism** lets you evaluate a function on every possible input at once, by putting the input register into superposition before applying the function as a gate. You don't get all the outputs back directly — but you can use interference to extract a useful global property.",
          },
          {
            type: "diagram",
            title: "Classical vs quantum evaluation",
            nodes: [
              { id: "classical", label: "Classical", color: "#3776ab", items: ["One input at a time", "n calls for n inputs"] },
              { id: "quantum", label: "Quantum", color: ACCENT, items: ["Superposed inputs", "1 call, all branches at once"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Evaluating a function on every input (classically, for comparison)",
            content: `def f(x):\n    return x % 2  # a toy function\n\ninputs = [0, 1, 2, 3]\noutputs = [f(x) for x in inputs]\nprint(outputs)`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Quantum parallelism alone doesn't give you a free speedup — you still need a clever way (interference) to read out something useful without measuring every branch individually.",
          },
          {
            type: "quiz",
            question: "What does putting the input register in superposition let you do?",
            options: [
              "Read every output directly with one measurement",
              "Evaluate the function on all inputs 'at once' in superposition",
              "Skip the function evaluation entirely",
              "Nothing useful without a classical computer",
            ],
            answer: 1,
            explanation: "Superposition lets one function application act across all basis states simultaneously.",
          },
        ],
        challenge: {
          title: "Evaluate f on All Inputs",
          description:
            "Define `f(x)` that returns `x % 2`, then build a list `outputs` by applying `f` to `[0, 1, 2, 3]`, and print it.",
          starterCode: `def f(x):\n    # return x % 2\n    pass\n\ninputs = [0, 1, 2, 3]\n\n`,
          solutionCode: `def f(x):\n    return x % 2\n\ninputs = [0, 1, 2, 3]\noutputs = [f(x) for x in inputs]\nprint(outputs)`,
          tests: [
            { id: 1, label: "Defines f", keywords: [{ pattern: "def\\s+f\\s*\\(" }] },
            { id: 2, label: "Uses x % 2", keywords: [{ pattern: "%\\s*2" }] },
            { id: 3, label: "Builds outputs list", keywords: [{ pattern: "outputs\\s*=" }] },
          ],
        },
      },
      {
        id: "qa-1",
        title: "Phase Kickback and Interference",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "**Interference** lets amplitudes for 'wrong' answers cancel out while amplitudes for the 'right' answer reinforce. **Phase kickback** is the trick many algorithms use to write a function's output into the *phase* of a state rather than its amplitude, setting up that interference.",
          },
          {
            type: "code",
            lang: "python",
            label: "Constructive vs destructive interference (toy amplitudes)",
            content: `constructive = [0.5, 0.5]  # amplitudes add up\ndestructive = [0.5, -0.5]  # amplitudes cancel\n\nprint("constructive sum:", sum(constructive))\nprint("destructive sum:", sum(destructive))`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "This is why quantum algorithms look so different from classical ones: the design problem is really 'how do I arrange interference so wrong answers cancel?'",
          },
          {
            type: "quiz",
            question: "What is the purpose of interference in a quantum algorithm?",
            options: [
              "To make circuits slower",
              "To make wrong-answer amplitudes cancel and boost the right answer",
              "To copy qubits",
              "It has no purpose, it's a side effect",
            ],
            answer: 1,
            explanation:
              "Careful interference design is how quantum algorithms concentrate probability on the correct outcome.",
          },
        ],
        challenge: {
          title: "Sum Constructive vs Destructive Amplitudes",
          description:
            "Given `constructive = [0.5, 0.5]` and `destructive = [0.5, -0.5]`, print the sum of each list.",
          starterCode: `constructive = [0.5, 0.5]\ndestructive = [0.5, -0.5]\n\n`,
          solutionCode: `constructive = [0.5, 0.5]\ndestructive = [0.5, -0.5]\nprint(sum(constructive))\nprint(sum(destructive))`,
          tests: [
            { id: 1, label: "Sums constructive", keywords: [{ pattern: "sum\\s*\\(\\s*constructive\\s*\\)" }] },
            { id: 2, label: "Sums destructive", keywords: [{ pattern: "sum\\s*\\(\\s*destructive\\s*\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qa-classics",
    title: "Classic Speedups",
    icon: "⚡",
    color: "#c026d3",
    lessons: [
      {
        id: "qa-2",
        title: "Deutsch-Jozsa Algorithm",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "The **Deutsch-Jozsa algorithm** decides whether a function is *constant* (same output for every input) or *balanced* (outputs 0 for exactly half the inputs and 1 for the other half) — in a single query, versus needing over half the inputs classically in the worst case.",
          },
          {
            type: "diagram",
            title: "Constant vs balanced",
            nodes: [
              { id: "constant", label: "Constant", color: ACCENT, items: ["f(x) = 0 for all x", "or f(x) = 1 for all x"] },
              { id: "balanced", label: "Balanced", color: "#c026d3", items: ["0 for half the inputs", "1 for the other half"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Classifying a function classically (for intuition)",
            content: `def classify(f, inputs):\n    outputs = [f(x) for x in inputs]\n    if len(set(outputs)) == 1:\n        return "constant"\n    return "balanced"\n\nprint(classify(lambda x: 0, [0, 1, 2, 3]))\nprint(classify(lambda x: x % 2, [0, 1, 2, 3]))`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Deutsch-Jozsa isn't practically useful on its own — its value is historical: it was the first clean proof that quantum computers can be exponentially faster for *some* problem.",
          },
          {
            type: "quiz",
            question: "What does the Deutsch-Jozsa algorithm determine?",
            options: [
              "The prime factors of a number",
              "Whether a function is constant or balanced",
              "The shortest path in a graph",
              "A database search target",
            ],
            answer: 1,
            explanation: "It classifies a black-box function as constant or balanced in one query.",
          },
        ],
        challenge: {
          title: "Classify a Function",
          description:
            "Write `classify(f, inputs)` that returns `\"constant\"` if all outputs match, else `\"balanced\"`. Test it on `lambda x: 1` with `[0, 1, 2, 3]`.",
          starterCode: `def classify(f, inputs):\n    outputs = [f(x) for x in inputs]\n    # return "constant" if all outputs are the same, else "balanced"\n\n\n`,
          solutionCode: `def classify(f, inputs):\n    outputs = [f(x) for x in inputs]\n    if len(set(outputs)) == 1:\n        return "constant"\n    return "balanced"\n\nprint(classify(lambda x: 1, [0, 1, 2, 3]))`,
          tests: [
            { id: 1, label: "Defines classify", keywords: [{ pattern: "def\\s+classify" }] },
            { id: 2, label: "Uses set() to compare outputs", keywords: [{ pattern: "set\\s*\\(\\s*outputs\\s*\\)" }] },
            { id: 3, label: "Returns constant/balanced", keywords: [{ pattern: "\"constant\"[\\s\\S]*\"balanced\"" }] },
          ],
        },
      },
      {
        id: "qa-3",
        title: "Grover's Search",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "**Grover's algorithm** searches an unsorted list of N items in about √N steps, versus N/2 on average classically. It works by repeatedly amplifying the amplitude of the marked (correct) item using an *oracle* and a *diffusion* step.",
          },
          {
            type: "diagram",
            title: "Grover's speedup",
            nodes: [
              { id: "classical", label: "Classical search", color: "#3776ab", items: ["~N/2 checks on average"] },
              { id: "grover", label: "Grover's search", color: "#c026d3", items: ["~√N iterations", "Quadratic speedup"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Estimating Grover iterations needed",
            content: `import math\n\ndef grover_iterations(n):\n    return round(math.pi / 4 * math.sqrt(n))\n\nprint(grover_iterations(1_000_000))  # far fewer than 500,000`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Grover's is a *quadratic* speedup, not exponential — useful, but not the dramatic advantage Shor's algorithm gives for factoring.",
          },
          {
            type: "quiz",
            question: "Roughly how many steps does Grover's algorithm need to search N unsorted items?",
            options: ["log₂N", "√N", "N", "N²"],
            answer: 1,
            explanation: "Grover's algorithm gives a quadratic speedup: about √N iterations.",
          },
        ],
        challenge: {
          title: "Estimate Grover Iterations",
          description:
            "Write `grover_iterations(n)` returning `round(math.pi / 4 * math.sqrt(n))`, then print the result for `n = 1000000`.",
          starterCode: `import math\n\ndef grover_iterations(n):\n    # round(pi/4 * sqrt(n))\n    pass\n\n`,
          solutionCode: `import math\n\ndef grover_iterations(n):\n    return round(math.pi / 4 * math.sqrt(n))\n\nprint(grover_iterations(1000000))`,
          tests: [
            { id: 1, label: "Defines grover_iterations", keywords: [{ pattern: "def\\s+grover_iterations" }] },
            { id: 2, label: "Uses math.sqrt", keywords: [{ pattern: "math\\.sqrt" }] },
            { id: 3, label: "Calls with 1000000", keywords: [{ pattern: "1000000" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qa-advanced",
    title: "Advanced Algorithms",
    icon: "🚀",
    color: "#dc2626",
    lessons: [
      {
        id: "qa-4",
        title: "Quantum Fourier Transform",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "The **Quantum Fourier Transform (QFT)** converts a state encoding a periodic pattern into one where that period shows up as measurable spikes in amplitude — it's the quantum analog of the classical Fourier transform, and it's the key subroutine inside Shor's algorithm.",
          },
          {
            type: "code",
            lang: "python",
            label: "Finding a period classically (for intuition)",
            content: `def find_period(sequence):\n    for p in range(1, len(sequence)):\n        if sequence[:len(sequence)-p] == sequence[p:]:\n            return p\n    return None\n\nprint(find_period([1, 2, 1, 2, 1, 2]))  # period 2`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "The QFT does this exponentially faster than classical Fourier analysis for the right kind of problem — that speedup is exactly what makes Shor's algorithm practical.",
          },
          {
            type: "quiz",
            question: "What kind of pattern does the QFT help a quantum algorithm detect?",
            options: ["Randomness", "Periodicity", "Prime factors directly", "Text patterns"],
            answer: 1,
            explanation: "The QFT reveals periodic structure in a quantum state's amplitudes.",
          },
        ],
        challenge: {
          title: "Find a Sequence's Period",
          description:
            "Write `find_period(sequence)` that returns the smallest period `p` for which the sequence repeats, then test it on `[1, 2, 1, 2, 1, 2]`.",
          starterCode: `def find_period(sequence):\n    # try increasing p until sequence[:-p] == sequence[p:]\n    pass\n\n`,
          solutionCode: `def find_period(sequence):\n    for p in range(1, len(sequence)):\n        if sequence[:len(sequence)-p] == sequence[p:]:\n            return p\n    return None\n\nprint(find_period([1, 2, 1, 2, 1, 2]))`,
          tests: [
            { id: 1, label: "Defines find_period", keywords: [{ pattern: "def\\s+find_period" }] },
            { id: 2, label: "Loops over candidate periods", keywords: [{ pattern: "for\\s+p\\s+in\\s+range" }] },
            { id: 3, label: "Prints result", keywords: [{ pattern: "print\\s*\\(" }] },
          ],
        },
      },
      {
        id: "qa-5",
        title: "Shor's Algorithm",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "**Shor's algorithm** factors large integers exponentially faster than the best known classical algorithms, by turning factoring into a period-finding problem the QFT can solve efficiently. It's the reason RSA-style cryptography is considered vulnerable to large-scale quantum computers.",
          },
          {
            type: "diagram",
            title: "Shor's algorithm at a glance",
            nodes: [
              { id: "reduce", label: "1. Reduce", color: ACCENT, items: ["Factoring → period finding"] },
              { id: "qft", label: "2. QFT", color: "#c026d3", items: ["Find the period quantumly"] },
              { id: "classical", label: "3. Classical cleanup", color: "#dc2626", items: ["Compute factors from period"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Recovering a factor once you know the period (simplified)",
            content: `import math\n\ndef factor_from_period(N, a, r):\n    if r % 2 != 0:\n        return None\n    guess = pow(a, r // 2) - 1\n    return math.gcd(guess, N)\n\nprint(factor_from_period(15, 7, 4))  # -> 3 or 5`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Running Shor's algorithm on cryptographically-relevant key sizes requires far more stable qubits than exist today — this is theory you're learning ahead of the hardware.",
          },
          {
            type: "quiz",
            question: "What problem does Shor's algorithm reduce integer factoring to?",
            options: ["Sorting", "Period finding", "Graph coloring", "String matching"],
            answer: 1,
            explanation: "Shor's algorithm reduces factoring to period finding, which the QFT solves efficiently.",
          },
        ],
        challenge: {
          title: "Recover a Factor from a Period",
          description:
            "Write `factor_from_period(N, a, r)` that returns `None` if `r` is odd, else `math.gcd(pow(a, r // 2) - 1, N)`. Test with `N=15, a=7, r=4`.",
          starterCode: `import math\n\ndef factor_from_period(N, a, r):\n    # if r is odd, return None\n    # otherwise return math.gcd(pow(a, r // 2) - 1, N)\n    pass\n\n`,
          solutionCode: `import math\n\ndef factor_from_period(N, a, r):\n    if r % 2 != 0:\n        return None\n    guess = pow(a, r // 2) - 1\n    return math.gcd(guess, N)\n\nprint(factor_from_period(15, 7, 4))`,
          tests: [
            { id: 1, label: "Defines factor_from_period", keywords: [{ pattern: "def\\s+factor_from_period" }] },
            { id: 2, label: "Uses math.gcd", keywords: [{ pattern: "math\\.gcd" }] },
            { id: 3, label: "Handles odd r", keywords: [{ pattern: "r\\s*%\\s*2" }] },
          ],
        },
      },
    ],
  },
];

export const QUANTUM_ALGORITHMS_CHAPTERS = RAW_QUANTUM_ALGORITHMS_CHAPTERS;

export const QUANTUM_ALGORITHMS_LESSONS = applyLessonVideoLinks(
  QUANTUM_ALGORITHMS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  QUANTUM_ALGORITHMS_VIDEO_LINKS,
);

export const QUANTUM_ALGORITHMS_TOTAL_XP = QUANTUM_ALGORITHMS_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
