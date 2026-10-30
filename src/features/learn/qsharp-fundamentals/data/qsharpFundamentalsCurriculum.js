// PolyCode — Q# Fundamentals curriculum
import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { QSHARP_FUNDAMENTALS_VIDEO_LINKS } from "./qsharpFundamentalsVideoLinks";

const ACCENT = "#0078d4";

const RAW_CHAPTERS = [
  {
    id: "qsf-intro",
    title: "Introduction to Q# & Quantum Environment",
    icon: "⚛️",
    color: ACCENT,
    lessons: [
      {
        id: "qsf-0",
        title: "What is Q#?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**Q#** (Q-Sharp) is a domain-specific programming language developed by Microsoft for expressing quantum algorithms. It separates quantum operations from classical control logic, allowing developers to target simulators or real quantum processors.",
          },
          {
            type: "diagram",
            title: "Q# Program Flow",
            nodes: [
              { id: "driver", label: "Host Program / Driver", color: "#3776ab", items: ["Python or C# host", "Passes inputs & receives results"] },
              { id: "qsharp", label: "Q# Quantum Logic", color: ACCENT, items: ["Allocates qubits", "Applies quantum gates"] },
              { id: "hardware", label: "Simulator / QPU", color: "#6366f1", items: ["Quantum State Vector Simulator", "Physical Quantum Processor"] },
            ],
          },
          {
            type: "code",
            lang: "qsharp",
            label: "A simple Q# Entry Point",
            content: `@EntryPoint()\noperation Main() : Result {\n    use q = Qubit();\n    let res = M(q);\n    Reset(q);\n    return res;\n}`,
          },
          {
            type: "quiz",
            question: "What is the primary purpose of Q#?",
            options: [
              "Web frontend design",
              "Expressing quantum algorithms and quantum logic",
              "Relational database querying",
              "Operating system kernel programming",
            ],
            answer: 1,
            explanation: "Q# is designed specifically by Microsoft for writing quantum algorithms.",
          },
        ],
        challenge: {
          title: "Write Your First Entry Point",
          description: "Write a main function simulation that returns a success flag for Q# setup check.",
          starterCode: `def qsharp_entry_point():\n    # Return "Entry Point Configured"\n    pass\n`,
          solutionCode: `def qsharp_entry_point():\n    return "Entry Point Configured"`,
          tests: [
            { id: 1, label: "Defines qsharp_entry_point", keywords: [{ pattern: "def\\s+qsharp_entry_point" }] },
            { id: 2, label: "Returns entry point string", keywords: [{ pattern: "Entry Point Configured" }] },
          ],
        },
      },
      {
        id: "qsf-1",
        title: "Operations vs Functions",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "In Q#, code is divided into **Operations** and **Functions**:\n\n- **Functions**: Pure classical computations with no side effects and no access to quantum qubits.\n- **Operations**: Quantum procedures that can allocate qubits, apply quantum gates, and perform measurements.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Comparing Function and Operation",
            content: `// Pure classical function\nfunction AddTwo(a : Int, b : Int) : Int {\n    return a + b;\n}\n\n// Quantum operation\noperation FlipQubit(q : Qubit) : Unit {\n    X(q);\n}`,
          },
          {
            type: "quiz",
            question: "Can a Q# Function modify a Qubit?",
            options: [
              "Yes, functions can apply gates",
              "No, only Operations can access and modify Qubits",
              "Yes, but only Hadamard gates",
              "Only on Tuesdays",
            ],
            answer: 1,
            explanation: "Functions are strictly classical and side-effect free. Only Operations can manipulate Qubits.",
          },
        ],
        challenge: {
          title: "Distinguish Classical Function from Operation",
          description: "Implement `classify_callable(kind)` returning `'Classical'` for function and `'Quantum'` for operation.",
          starterCode: `def classify_callable(kind):\n    # Return "Classical" if kind is "function", else "Quantum"\n    pass\n`,
          solutionCode: `def classify_callable(kind):\n    return "Classical" if kind == "function" else "Quantum"`,
          tests: [
            { id: 1, label: "Defines classify_callable", keywords: [{ pattern: "def\\s+classify_callable" }] },
            { id: 2, label: "Returns Classical for function", keywords: [{ pattern: "Classical" }] },
          ],
        },
      },
      {
        id: "qsf-2",
        title: "Allocating Qubits (`use`)",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Qubits are allocated using the `use` statement in Q#. All allocated qubits start in the pure $|0\\rangle$ state and MUST be reset back to $|0\\rangle$ before being released at the end of scope.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Allocating single qubit and qubit array",
            content: `operation AllocateQubits() : Unit {\n    use q = Qubit();        // Allocate 1 qubit\n    use register = Qubit[4]; // Allocate 4 qubits\n    \n    // Qubits automatically cleaned up / reset\n    Reset(q);\n    ResetAll(register);\n}`,
          },
          {
            type: "callout",
            variant: "warning",
            content: "Failing to reset qubits to |0⟩ before release is a runtime error in Q# to prevent quantum state leaks.",
          },
        ],
        challenge: {
          title: "Simulate Qubit Allocation",
          description: "Write `allocate_register(count)` returning a list of `count` qubits in state `'|0>'`.",
          starterCode: `def allocate_register(count):\n    # Return a list of count strings "|0>"\n    pass\n`,
          solutionCode: `def allocate_register(count):\n    return ["|0>"] * count`,
          tests: [
            { id: 1, label: "Defines allocate_register", keywords: [{ pattern: "def\\s+allocate_register" }] },
            { id: 2, label: "Returns correct list", keywords: [{ pattern: "\\|0>" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qsf-types",
    title: "Q# Variables, Types & Control Flow",
    icon: "⚙️",
    color: "#0284c7",
    lessons: [
      {
        id: "qsf-3",
        title: "Immutable & Mutable Variables",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "In Q#:\n- `let` declares an **immutable** variable (cannot be reassigned).\n- `mutable` declares a **mutable** variable, modified with the `set` keyword.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Variable Declarations in Q#",
            content: `let pi = 3.14159; // Cannot change pi\nmutable count = 0;\nset count = count + 1; // Update mutable variable`,
          },
        ],
        challenge: {
          title: "Simulate Q# Mutation",
          description: "Write `update_counter(initial, increment)` that updates and returns the total.",
          starterCode: `def update_counter(initial, increment):\n    # Simulate set counter = counter + increment\n    pass\n`,
          solutionCode: `def update_counter(initial, increment):\n    counter = initial\n    counter += increment\n    return counter`,
          tests: [
            { id: 1, label: "Defines update_counter", keywords: [{ pattern: "def\\s+update_counter" }] },
            { id: 2, label: "Updates counter", keywords: [{ pattern: "\\+=" }] },
          ],
        },
      },
      {
        id: "qsf-4",
        title: "Q# Primitive & Quantum Types",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "Q# includes built-in primitive types:\n- `Int`, `Double`, `Bool`, `String`\n- Quantum types: `Qubit`, `Result` (`Zero` or `One`), `Pauli` (`PauliI`, `PauliX`, `PauliY`, `PauliZ`).",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Q# Type Annotations",
            content: `let count : Int = 10;\nlet probability : Double = 0.5;\nlet measured : Result = Zero;`,
          },
        ],
        challenge: {
          title: "Format Quantum Result",
          description: "Write `format_result(res)` returning `'Measured One'` if `res == 1` else `'Measured Zero'`.",
          starterCode: `def format_result(res):\n    # Return "Measured One" if res == 1 else "Measured Zero"\n    pass\n`,
          solutionCode: `def format_result(res):\n    return "Measured One" if res == 1 else "Measured Zero"`,
          tests: [
            { id: 1, label: "Defines format_result", keywords: [{ pattern: "def\\s+format_result" }] },
            { id: 2, label: "Handles results", keywords: [{ pattern: "Measured One" }] },
          ],
        },
      },
      {
        id: "qsf-5",
        title: "Control Flow",
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              "Q# supports standard control structures like `if/elif/else`, `for` loops over ranges, and `repeat ... until ... fixup` for quantum repeat-until-success patterns.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Q# For Loop and Conditional",
            content: `for idx in 0..3 {\n    Message($"Processing qubit {idx}");\n}`,
          },
        ],
        challenge: {
          title: "Loop Qubit Processing",
          description: "Write `process_qubits(n)` returning a list of formatted strings `['Qubit 0', ..., 'Qubit n-1']`.",
          starterCode: `def process_qubits(n):\n    # Return list of formatted qubit labels\n    pass\n`,
          solutionCode: `def process_qubits(n):\n    return [f"Qubit {i}" for i in range(n)]`,
          tests: [
            { id: 1, label: "Defines process_qubits", keywords: [{ pattern: "def\\s+process_qubits" }] },
            { id: 2, label: "Uses string formatting", keywords: [{ pattern: "Qubit" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qsf-measurement",
    title: "Measurement & Classical Interoperability",
    icon: "📊",
    color: "#059669",
    lessons: [
      {
        id: "qsf-6",
        title: "Measuring Qubits (`M` operation)",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "The `M` operation measures a single qubit in the Z-basis ($|0\\rangle, |1\\rangle$), collapsing its superposition and returning a `Result` (`Zero` or `One`).",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "Measurement Operation",
            content: `use q = Qubit();\nH(q); // Superposition\nlet outcome = M(q); // Collapses to Zero or One`,
          },
        ],
        challenge: {
          title: "Simulate Z-Basis Measurement",
          description: "Write `measure_state(p_one)` taking probability `p_one` and returning `1` if input > 0.5 else `0`.",
          starterCode: `def measure_state(p_one):\n    # Return 1 if p_one > 0.5 else 0\n    pass\n`,
          solutionCode: `def measure_state(p_one):\n    return 1 if p_one > 0.5 else 0`,
          tests: [
            { id: 1, label: "Defines measure_state", keywords: [{ pattern: "def\\s+measure_state" }] },
          ],
        },
      },
      {
        id: "qsf-7",
        title: "Resetting & Releasing Qubits (`Reset`)",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "`Reset(q)` measures a qubit and applies an `X` gate if the outcome was `One`, ensuring the qubit returns to state $|0\\rangle$.",
          },
        ],
        challenge: {
          title: "Reset Qubit State",
          description: "Write `reset_qubit(state)` returning `'|0>'` regardless of initial state.",
          starterCode: `def reset_qubit(state):\n    # Return "|0>"\n    pass\n`,
          solutionCode: `def reset_qubit(state):\n    return "|0>"`,
          tests: [
            { id: 1, label: "Defines reset_qubit", keywords: [{ pattern: "def\\s+reset_qubit" }] },
          ],
        },
      },
      {
        id: "qsf-8",
        title: "Returning Classical Results",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Q# operations return classical values (integers, booleans, arrays of results) back to the caller host application.",
          },
        ],
        challenge: {
          title: "Convert Measurement Array",
          description: "Write `results_to_bitstring(results)` converting `[0, 1, 1, 0]` to `'0110'`.",
          starterCode: `def results_to_bitstring(results):\n    # Convert list of 0/1 integers to a single bitstring\n    pass\n`,
          solutionCode: `def results_to_bitstring(results):\n    return "".join(str(b) for b in results)`,
          tests: [
            { id: 1, label: "Defines results_to_bitstring", keywords: [{ pattern: "def\\s+results_to_bitstring" }] },
            { id: 2, label: "Joins string bits", keywords: [{ pattern: "join" }] },
          ],
        },
      },
    ],
  },
];

export const QSHARP_FUNDAMENTALS_CHAPTERS = RAW_CHAPTERS;

export const QSHARP_FUNDAMENTALS_LESSONS = applyLessonVideoLinks(
  QSHARP_FUNDAMENTALS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  QSHARP_FUNDAMENTALS_VIDEO_LINKS,
);

export const QSHARP_FUNDAMENTALS_TOTAL_XP = QSHARP_FUNDAMENTALS_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
