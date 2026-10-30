// PolyCode — Quantum Programming Projects full curriculum
// 3 chapters · 6 lessons · theory + hands-on browser-Python builds (Pyodide)
// YouTube links: edit quantumProgrammingProjectsVideoLinks.js (not this file).
//
// Same shape as quantum-computing-fundamentals: every lesson has both
// `theory` and `challenge`. This is the capstone course — challenges build
// slightly bigger, more complete simulated circuits/programs than the
// single-concept checks in the earlier courses.

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { QUANTUM_PROGRAMMING_PROJECTS_VIDEO_LINKS } from "./quantumProgrammingProjectsVideoLinks";

const ACCENT = "#c026d3";

const RAW_QUANTUM_PROGRAMMING_PROJECTS_CHAPTERS = [
  {
    id: "qp-warmup",
    title: "Warm-Up Circuits",
    icon: "🎛️",
    color: ACCENT,
    lessons: [
      {
        id: "qp-0",
        title: "Bell State Generator",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Let's build your first small \"program\": a function that reports what a Bell-pair circuit (Hadamard then CNOT) produces. This wraps together superposition, entanglement, and measurement from earlier courses into one project.",
          },
          {
            type: "diagram",
            title: "Bell state pipeline",
            nodes: [
              { id: "h", label: "H on qubit 0", color: ACCENT, items: ["Creates superposition"] },
              { id: "cnot", label: "CNOT(0 → 1)", color: "#a855f7", items: ["Entangles both qubits"] },
              { id: "measure", label: "Measure", color: "#7c3aed", items: ["Always 00 or 11"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "A tiny 'circuit runner' abstraction",
            content: `def run_bell_circuit():\n    gates_applied = ["H(q0)", "CNOT(q0,q1)"]\n    possible_outcomes = ["00", "11"]\n    return gates_applied, possible_outcomes\n\ngates, outcomes = run_bell_circuit()\nprint(gates)\nprint(outcomes)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Real SDKs like Qiskit give you a `QuantumCircuit` object with `.h()` and `.cx()` methods — the gate-list abstraction here mirrors that shape on purpose.",
          },
          {
            type: "quiz",
            question: "In this project's abstraction, what does run_bell_circuit() return?",
            options: [
              "Just a random number",
              "The gates applied and the possible measurement outcomes",
              "A single fixed answer, no list",
              "Nothing — it only prints",
            ],
            answer: 1,
            explanation: "It returns both the gate sequence and the set of possible outcomes.",
          },
        ],
        challenge: {
          title: "Build the Bell Circuit Function",
          description:
            "Write `run_bell_circuit()` returning `([\"H(q0)\", \"CNOT(q0,q1)\"], [\"00\", \"11\"])`, then print both values.",
          starterCode: `def run_bell_circuit():\n    # return (gates_applied, possible_outcomes)\n    pass\n\n`,
          solutionCode: `def run_bell_circuit():\n    gates_applied = ["H(q0)", "CNOT(q0,q1)"]\n    possible_outcomes = ["00", "11"]\n    return gates_applied, possible_outcomes\n\ngates, outcomes = run_bell_circuit()\nprint(gates)\nprint(outcomes)`,
          tests: [
            { id: 1, label: "Defines run_bell_circuit", keywords: [{ pattern: "def\\s+run_bell_circuit" }] },
            { id: 2, label: "Returns a tuple of two lists", keywords: [{ pattern: "return\\s+gates_applied\\s*,\\s*possible_outcomes" }] },
            { id: 3, label: "Prints both values", keywords: [{ pattern: "print\\s*\\(\\s*gates\\s*\\)" }] },
          ],
        },
      },
      {
        id: "qp-1",
        title: "Quantum Coin Flip",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "A single qubit through a Hadamard gate is a genuinely random coin flip — not pseudo-random like `random.random()`, but rooted in quantum measurement. Let's build a small simulated \"coin\" API around that idea.",
          },
          {
            type: "code",
            lang: "python",
            label: "A simulated quantum coin flip API",
            content: `import random\n\ndef quantum_coin_flip():\n    # Equal superposition -> 50/50 measurement, simulated here\n    return random.choice(["heads", "tails"])\n\nresults = [quantum_coin_flip() for _ in range(10)]\nprint(results)`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "This is a real use case for quantum hardware today: true random number generation, useful for cryptography, without relying on classical pseudo-randomness.",
          },
          {
            type: "quiz",
            question: "Why is a quantum coin flip considered 'truly' random, unlike most software randomness?",
            options: [
              "It isn't actually random at all",
              "It comes from a physical measurement outcome, not a deterministic algorithm",
              "It always alternates heads/tails",
              "It requires internet access",
            ],
            answer: 1,
            explanation: "Classical PRNGs are deterministic algorithms; quantum measurement is fundamentally probabilistic.",
          },
        ],
        challenge: {
          title: "Simulate 10 Coin Flips",
          description:
            "Write `quantum_coin_flip()` using `random.choice([\"heads\", \"tails\"])`, then build a list `results` of 10 flips and print it.",
          starterCode: `import random\n\ndef quantum_coin_flip():\n    pass\n\n`,
          solutionCode: `import random\n\ndef quantum_coin_flip():\n    return random.choice(["heads", "tails"])\n\nresults = [quantum_coin_flip() for _ in range(10)]\nprint(results)`,
          tests: [
            { id: 1, label: "Defines quantum_coin_flip", keywords: [{ pattern: "def\\s+quantum_coin_flip" }] },
            { id: 2, label: "Uses random.choice", keywords: [{ pattern: "random\\.choice" }] },
            { id: 3, label: "Builds 10 results", keywords: [{ pattern: "range\\s*\\(\\s*10\\s*\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qp-applied",
    title: "Applied Mini-Projects",
    icon: "🛠️",
    color: "#7c3aed",
    lessons: [
      {
        id: "qp-2",
        title: "Teleportation Protocol (Simulated)",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "**Quantum teleportation** transmits a qubit's exact state to a distant party using entanglement plus two classical bits — no physical particle travels, and no cloning happens (the original qubit's state is destroyed in the process, respecting no-cloning).",
          },
          {
            type: "diagram",
            title: "Teleportation protocol steps",
            nodes: [
              { id: "share", label: "1. Share entangled pair", color: ACCENT, items: ["Alice and Bob each hold one qubit"] },
              { id: "measure", label: "2. Alice measures", color: "#7c3aed", items: ["Gets 2 classical bits"] },
              { id: "send", label: "3. Send bits classically", color: "#a855f7", items: ["Over an ordinary channel"] },
              { id: "fix", label: "4. Bob corrects", color: "#c026d3", items: ["Applies gates based on the bits"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "Modeling the protocol's classical-bit correction step",
            content: `def bob_correction(bits):\n    corrections = {\n        "00": "I",   # do nothing\n        "01": "X",   # apply X gate\n        "10": "Z",   # apply Z gate\n        "11": "XZ",  # apply both\n    }\n    return corrections[bits]\n\nprint(bob_correction("10"))`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Teleportation doesn't allow faster-than-light communication — Bob can't use his qubit meaningfully until Alice's classical bits arrive, which is bound by the speed of light.",
          },
          {
            type: "quiz",
            question: "What does teleportation require alongside a shared entangled pair?",
            options: [
              "Nothing else — entanglement alone is enough",
              "Two classical bits sent over an ordinary channel",
              "A second entangled pair",
              "Physically moving the qubit",
            ],
            answer: 1,
            explanation: "Alice's measurement outcome (2 classical bits) must be sent to Bob so he knows which correction to apply.",
          },
        ],
        challenge: {
          title: "Map Measurement Bits to Corrections",
          description:
            "Write `bob_correction(bits)` using the dict `{\"00\": \"I\", \"01\": \"X\", \"10\": \"Z\", \"11\": \"XZ\"}`, then print the result for `\"11\"`.",
          starterCode: `def bob_correction(bits):\n    corrections = {\n        "00": "I",\n        "01": "X",\n        "10": "Z",\n        "11": "XZ",\n    }\n    # return the matching correction\n\n\n`,
          solutionCode: `def bob_correction(bits):\n    corrections = {\n        "00": "I",\n        "01": "X",\n        "10": "Z",\n        "11": "XZ",\n    }\n    return corrections[bits]\n\nprint(bob_correction("11"))`,
          tests: [
            { id: 1, label: "Defines bob_correction", keywords: [{ pattern: "def\\s+bob_correction" }] },
            { id: 2, label: "Uses a corrections dict", keywords: [{ pattern: "corrections\\s*=\\s*\\{" }] },
            { id: 3, label: "Returns corrections[bits]", keywords: [{ pattern: "corrections\\s*\\[\\s*bits\\s*\\]" }] },
          ],
        },
      },
      {
        id: "qp-3",
        title: "Simple Variational Circuit",
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              "**Variational quantum algorithms** use a classical optimizer to tune circuit parameters, run the circuit, check the result, and repeat — a hybrid loop between classical and quantum hardware. This is the backbone of near-term quantum machine learning and chemistry simulation.",
          },
          {
            type: "diagram",
            title: "The hybrid loop",
            nodes: [
              { id: "params", label: "Classical: pick params", color: ACCENT, items: ["Optimizer proposes values"] },
              { id: "circuit", label: "Quantum: run circuit", color: "#a855f7", items: ["Circuit uses those params"] },
              { id: "score", label: "Classical: score result", color: "#c026d3", items: ["Update params, repeat"] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "A tiny hill-climbing optimizer loop",
            content: `def cost(theta):\n    # toy cost function standing in for a circuit's output\n    return (theta - 3) ** 2\n\ntheta = 0\nfor step in range(5):\n    theta += 1  # naive fixed-step search\n    print(f"step {step}: theta={theta}, cost={cost(theta)}")`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Real variational algorithms (like VQE and QAOA) use gradient-based or gradient-free optimizers far smarter than this fixed-step loop — but the shape of the loop is identical.",
          },
          {
            type: "quiz",
            question: "What makes an algorithm 'variational' in the quantum computing sense?",
            options: [
              "It never uses classical computers",
              "It alternates between a classical optimizer and a parameterized quantum circuit",
              "It only works on variational databases",
              "It requires no measurement",
            ],
            answer: 1,
            explanation: "Variational algorithms are hybrid loops: classical optimization driving a quantum circuit's parameters.",
          },
        ],
        challenge: {
          title: "Write a Toy Cost Function Loop",
          description:
            "Write `cost(theta)` returning `(theta - 3) ** 2`. Starting at `theta = 0`, loop 5 times incrementing `theta` by 1 each step, printing `theta` and `cost(theta)`.",
          starterCode: `def cost(theta):\n    pass\n\ntheta = 0\n\n`,
          solutionCode: `def cost(theta):\n    return (theta - 3) ** 2\n\ntheta = 0\nfor step in range(5):\n    theta += 1\n    print(f"step {step}: theta={theta}, cost={cost(theta)}")`,
          tests: [
            { id: 1, label: "Defines cost", keywords: [{ pattern: "def\\s+cost" }] },
            { id: 2, label: "Uses (theta - 3) ** 2", keywords: [{ pattern: "\\(\\s*theta\\s*-\\s*3\\s*\\)\\s*\\*\\*\\s*2" }] },
            { id: 3, label: "Loops 5 times", keywords: [{ pattern: "range\\s*\\(\\s*5\\s*\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qp-capstone",
    title: "Capstone",
    icon: "🏁",
    color: "#7e22ce",
    lessons: [
      {
        id: "qp-4",
        title: "Mini Grover Search Capstone",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "Time to put Grover's search to work end-to-end: given a list and a target value, simulate how many \"Grover iterations\" it would take to find it, then actually find it — combining Quantum Algorithms concepts with a real working search function.",
          },
          {
            type: "code",
            lang: "python",
            label: "Combining iteration estimate + actual search",
            content: `import math\n\ndef grover_iterations(n):\n    return round(math.pi / 4 * math.sqrt(n))\n\ndef grover_search(items, target):\n    for i, item in enumerate(items):\n        if item == target:\n            return i\n    return -1\n\nitems = ["a", "b", "c", "d", "e"]\nprint(grover_iterations(len(items)))\nprint(grover_search(items, "d"))`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "On real quantum hardware, `grover_search` would be a circuit using an oracle and diffusion operator — here you're modeling its *behavior and cost*, which is exactly the mental model you'll need before writing real Qiskit code.",
          },
          {
            type: "quiz",
            question: "In this capstone, what does grover_iterations(n) estimate?",
            options: [
              "The exact index of the target",
              "How many amplification steps Grover's algorithm would need for n items",
              "The number of qubits required",
              "A random guess"
            ],
            answer: 1,
            explanation: "It estimates the number of amplitude-amplification iterations for a Grover search over n items.",
          },
        ],
        challenge: {
          title: "Combine Iteration Estimate and Search",
          description:
            "Write both `grover_iterations(n)` (as before) and `grover_search(items, target)` returning the index of `target` in `items` (or -1). Test on `items = [\"a\",\"b\",\"c\",\"d\",\"e\"]`, `target = \"d\"`.",
          starterCode: `import math\n\ndef grover_iterations(n):\n    pass\n\ndef grover_search(items, target):\n    pass\n\nitems = ["a", "b", "c", "d", "e"]\n\n`,
          solutionCode: `import math\n\ndef grover_iterations(n):\n    return round(math.pi / 4 * math.sqrt(n))\n\ndef grover_search(items, target):\n    for i, item in enumerate(items):\n        if item == target:\n            return i\n    return -1\n\nitems = ["a", "b", "c", "d", "e"]\nprint(grover_iterations(len(items)))\nprint(grover_search(items, "d"))`,
          tests: [
            { id: 1, label: "Defines grover_iterations", keywords: [{ pattern: "def\\s+grover_iterations" }] },
            { id: 2, label: "Defines grover_search", keywords: [{ pattern: "def\\s+grover_search" }] },
            { id: 3, label: "Uses enumerate", keywords: [{ pattern: "enumerate\\s*\\(" }] },
          ],
        },
      },
      {
        id: "qp-5",
        title: "Course Wrap-Up & Cheat Sheet",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "**Quick reference** — bookmark this lesson. State: `[amplitude_0, amplitude_1]`. Probability: `amplitude ** 2`. Gates: H (superposition), X (flip), CNOT (entangle). Measurement: `random.choices(outcomes, weights=probabilities)`. Speedups: Grover (√N), Shor (factoring via period-finding).",
          },
          {
            type: "diagram",
            title: "Your Quantum toolkit",
            nodes: [
              { id: "states", label: "States", color: ACCENT, items: ["Amplitudes", "Superposition", "Entanglement"] },
              { id: "gates", label: "Gates", color: "#a855f7", items: ["H, X, CNOT", "Unitary matrices"] },
              { id: "algos", label: "Algorithms", color: "#7e22ce", items: ["Deutsch-Jozsa", "Grover", "Shor"] },
              { id: "projects", label: "Projects", color: "#c026d3", items: ["Bell states", "Teleportation", "Variational loops"] },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "From here, the natural next step is a real SDK like Qiskit — everything you modeled in plain Python maps directly onto QuantumCircuit methods (.h(), .cx(), .measure()).",
          },
          {
            type: "quiz",
            question: "Which gate is used to entangle two qubits in the examples throughout this track?",
            options: ["Hadamard", "Pauli-X", "CNOT", "Measurement"],
            answer: 2,
            explanation: "CNOT is the two-qubit gate used to create entanglement, typically after a Hadamard on the control qubit.",
          },
        ],
        challenge: {
          title: "Cheat Sheet Drill",
          description:
            "Create `toolkit = {\"states\": 3, \"gates\": 3, \"algorithms\": 3, \"projects\": 3}` and print the value for the key `\"algorithms\"`.",
          starterCode: `toolkit = {"states": 3, "gates": 3, "algorithms": 3, "projects": 3}\n\n`,
          solutionCode: `toolkit = {"states": 3, "gates": 3, "algorithms": 3, "projects": 3}\nprint(toolkit["algorithms"])`,
          tests: [
            { id: 1, label: "Defines toolkit dict", keywords: [{ pattern: "toolkit\\s*=\\s*\\{" }] },
            { id: 2, label: "Prints algorithms key", keywords: [{ pattern: "toolkit\\s*\\[\\s*\"algorithms\"\\s*\\]" }] },
          ],
        },
      },
    ],
  },
];

export const QUANTUM_PROGRAMMING_PROJECTS_CHAPTERS =
  RAW_QUANTUM_PROGRAMMING_PROJECTS_CHAPTERS;

export const QUANTUM_PROGRAMMING_PROJECTS_LESSONS = applyLessonVideoLinks(
  QUANTUM_PROGRAMMING_PROJECTS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  QUANTUM_PROGRAMMING_PROJECTS_VIDEO_LINKS,
);

export const QUANTUM_PROGRAMMING_PROJECTS_TOTAL_XP =
  QUANTUM_PROGRAMMING_PROJECTS_LESSONS.reduce(
    (sum, lesson) => sum + lesson.xp,
    0,
  );
