// PolyCode — Q# Quantum Projects curriculum
import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { QSHARP_QUANTUM_PROJECTS_VIDEO_LINKS } from "./qsharpQuantumProjectsVideoLinks";

const ACCENT = "#ec4899";

const RAW_CHAPTERS = [
  {
    id: "qp-crypto",
    title: "Quantum Cryptography & Communication",
    icon: "🔐",
    color: ACCENT,
    lessons: [
      {
        id: "qp-0",
        title: "Quantum Random Number Generator (QRNG)",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "Build a Quantum Random Number Generator in Q# by allocating qubits, placing them into Hadamard superposition ($H$), and measuring Z-basis outcomes to produce true quantum randomness.",
          },
          {
            type: "code",
            lang: "qsharp",
            label: "QRNG Operation in Q#",
            content: `@EntryPoint()\noperation SampleQuantumRandomBit() : Result {\n    use q = Qubit();\n    H(q);\n    let bit = M(q);\n    Reset(q);\n    return bit;\n}`,
          },
        ],
        challenge: {
          title: "Generate True Random Byte",
          description: "Write `qrng_byte(bits)` converting a list of 8 random bits `[1, 0, 1, 0, 1, 0, 1, 0]` to an integer.",
          starterCode: `def qrng_byte(bits):\n    # Return int from 8 bit values\n    pass\n`,
          solutionCode: `def qrng_byte(bits):\n    return int("".join(str(b) for b in bits), 2)`,
          tests: [
            { id: 1, label: "Defines qrng_byte", keywords: [{ pattern: "def\\s+qrng_byte" }] },
          ],
        },
      },
      {
        id: "qp-1",
        title: "Quantum Teleportation Protocol",
        xp: 22,
        theory: [
          {
            type: "text",
            content:
              "Quantum teleportation transmits an unknown quantum state $|\\psi\\rangle$ from Alice to Bob using an entangled Bell pair and 2 classical bits of information.",
          },
        ],
        challenge: {
          title: "Teleportation Correction Operator",
          description: "Write `teleport_correction(m1, m2)` returning `'Apply Z and X'` if `m1==1 and m2==1`, `'Apply Z'` if `m1==1`, `'Apply X'` if `m2==1`, else `'No Operation'`.",
          starterCode: `def teleport_correction(m1, m2):\n    # Return correction instruction\n    pass\n`,
          solutionCode: `def teleport_correction(m1, m2):\n    if m1 == 1 and m2 == 1:\n        return "Apply Z and X"\n    if m1 == 1:\n        return "Apply Z"\n    if m2 == 1:\n        return "Apply X"\n    return "No Operation"`,
          tests: [
            { id: 1, label: "Defines teleport_correction", keywords: [{ pattern: "def\\s+teleport_correction" }] },
          ],
        },
      },
      {
        id: "qp-2",
        title: "BB84 Quantum Key Distribution (QKD)",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Implement the BB84 protocol where Alice and Bob generate a secret key using quantum states. Eavesdropping by Eve introduces detectable measurement errors.",
          },
        ],
        challenge: {
          title: "BB84 Key Sifting",
          description: "Write `sift_keys(alice_bases, bob_bases, alice_bits)` returning list of `alice_bits` where bases match (`alice_bases[i] == bob_bases[i]`).",
          starterCode: `def sift_keys(alice_bases, bob_bases, alice_bits):\n    # Return sifted key list\n    pass\n`,
          solutionCode: `def sift_keys(alice_bases, bob_bases, alice_bits):\n    return [bit for a_base, b_base, bit in zip(alice_bases, bob_bases, alice_bits) if a_base == b_base]`,
          tests: [
            { id: 1, label: "Defines sift_keys", keywords: [{ pattern: "def\\s+sift_keys" }] },
          ],
        },
      },
    ],
  },
  {
    id: "qp-capstone",
    title: "Capstone Quantum Applications",
    icon: "🏆",
    color: "#f43f5e",
    lessons: [
      {
        id: "qp-3",
        title: "Superdense Coding",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "Superdense coding transmits 2 classical bits by sending only 1 physical qubit, using a pre-shared entangled Bell pair.",
          },
        ],
        challenge: {
          title: "Superdense Coding Gate Mapping",
          description: "Write `superdense_gate(msg)` returning `'I'` for `'00'`, `'X'` for `'01'`, `'Z'` for `'10'`, and `'XZ'` for `'11'`.",
          starterCode: `def superdense_gate(msg):\n    # Return gate name for 2-bit msg\n    pass\n`,
          solutionCode: `def superdense_gate(msg):\n    mapping = {"00": "I", "01": "X", "10": "Z", "11": "XZ"}\n    return mapping.get(msg, "I")`,
          tests: [
            { id: 1, label: "Defines superdense_gate", keywords: [{ pattern: "def\\s+superdense_gate" }] },
          ],
        },
      },
      {
        id: "qp-4",
        title: "Variational Quantum Eigensolver (VQE) Simulator",
        xp: 24,
        theory: [
          {
            type: "text",
            content:
              "VQE is a hybrid quantum-classical algorithm using parameterized quantum circuits (ansatz) and classical optimization to calculate molecular ground state energies.",
          },
        ],
        challenge: {
          title: "Calculate Energy Expectation",
          description: "Write `vqe_energy(params)` returning `sum(p ** 2 - 2 * p for p in params)`.",
          starterCode: `def vqe_energy(params):\n    # Return energy value\n    pass\n`,
          solutionCode: `def vqe_energy(params):\n    return sum(p ** 2 - 2 * p for p in params)`,
          tests: [
            { id: 1, label: "Defines vqe_energy", keywords: [{ pattern: "def\\s+vqe_energy" }] },
          ],
        },
      },
      {
        id: "qp-5",
        title: "Full Q# Quantum Capstone Project",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "Complete your final Q# Capstone Project by assembling a full quantum pipeline: qubit allocation, ansatz preparation, oracle application, measurement, and classical reporting.",
          },
        ],
        challenge: {
          title: "Full Capstone Pipeline",
          description: "Write `qsharp_capstone_summary(n_qubits, depth)` returning string `'Q# Capstone: n_qubits qubits, depth depth completed.'`",
          starterCode: `def qsharp_capstone_summary(n_qubits, depth):\n    # Return capstone summary string\n    pass\n`,
          solutionCode: `def qsharp_capstone_summary(n_qubits, depth):\n    return f"Q# Capstone: {n_qubits} qubits, depth {depth} completed."`,
          tests: [
            { id: 1, label: "Defines qsharp_capstone_summary", keywords: [{ pattern: "def\\s+qsharp_capstone_summary" }] },
          ],
        },
      },
    ],
  },
];

export const QSHARP_QUANTUM_PROJECTS_CHAPTERS = RAW_CHAPTERS;

export const QSHARP_QUANTUM_PROJECTS_LESSONS = applyLessonVideoLinks(
  QSHARP_QUANTUM_PROJECTS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  QSHARP_QUANTUM_PROJECTS_VIDEO_LINKS,
);

export const QSHARP_QUANTUM_PROJECTS_TOTAL_XP = QSHARP_QUANTUM_PROJECTS_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
