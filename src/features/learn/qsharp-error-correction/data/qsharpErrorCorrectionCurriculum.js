import { createStructuredCourse } from "../../shared/createStructuredCourse";

export const QSHARP_ERROR_CORRECTION = createStructuredCourse({
  id: "qsharp-error-correction",
  title: "Q# Error Correction & Noise",
  language: "Q#",
  description:
    "Understand simple noise channels, encode and diagnose bit-flip errors, and reason about the limits of fault-tolerant quantum programs.",
  accent: "#7c3aed",
  basePath: "/learn/qsharp-error-correction",
  readGatePrefix: "qsharp_error_correction",
  backPath: "/language/Q%23",
  chapters: [
    {
      id: "noise-and-errors",
      title: "Noise and Error Models",
      icon: "〰️",
      color: "#7c3aed",
      topics: [
        {
          id: "noise-models",
          title: "Model Noise in a Quantum Program",
          xp: 20,
          overview:
            "Real devices are imperfect: gates and measurements can fail, and qubits can lose coherence. A noise model describes likely errors so a simulator or analysis can estimate how a circuit behaves beyond the ideal mathematical model.",
          example: `operation RunNoisyExperiment() : Result {
    use q = Qubit();
    H(q);
    let result = M(q);
    Reset(q);
    return result;
}`,
          note:
            "This Q# fragment shows an ideal circuit. Noise is introduced by a simulator or execution target; it is not created merely by naming a circuit noisy.",
          quiz: {
            question: "What does a noise model describe?",
            options: [
              "Likely imperfections in operations or measurements",
              "A guaranteed correction for every physical error",
              "The source formatting rules for Q#",
              "A classical random number generator only",
            ],
            answer: 0,
            explanation:
              "Noise models represent imperfections that can affect how a circuit executes.",
          },
          challenge: {
            title: "Reason About an Imperfect Run",
            description:
              "Choose the accurate interpretation of a simulated noise result.",
            question: "If repeated runs sometimes disagree, what can that indicate?",
            options: [
              "Random measurement outcomes, modeled noise, or both",
              "That the Q# compiler changed the program each time",
              "That measurement is always deterministic",
              "That the qubits were automatically error-corrected",
            ],
            answer: 0,
          },
        },
        {
          id: "bit-flip",
          title: "Understand Bit-Flip Errors",
          xp: 20,
          overview:
            "A bit-flip error changes computational-basis state `|0⟩` to `|1⟩` or vice versa; the Pauli X operator models that transformation. A single physical qubit cannot reveal every error without disturbing quantum information, which motivates encoding.",
          example: `operation ApplyBitFlip(q : Qubit) : Unit {
    X(q);
}`,
          note:
            "The operation applies a bit flip deliberately; it is a useful model for understanding the error, not an error-detection strategy by itself.",
          quiz: {
            question: "Which Pauli gate models a computational-basis bit flip?",
            options: ["X", "Z", "H", "S"],
            answer: 0,
            explanation:
              "The X gate exchanges the computational basis states `|0⟩` and `|1⟩`.",
          },
          challenge: {
            title: "Identify the Error Operator",
            description:
              "Select the operation associated with a `|0⟩`/`|1⟩` bit flip.",
            question: "Which gate is used to model a bit flip?",
            options: ["X", "Z", "T", "S"],
            answer: 0,
          },
        },
      ],
    },
    {
      id: "encoding-and-diagnosis",
      title: "Encoding and Error Diagnosis",
      icon: "🧩",
      color: "#2563eb",
      topics: [
        {
          id: "phase-flip",
          title: "Understand Phase-Flip Errors",
          xp: 20,
          overview:
            "A phase flip changes the relative phase between computational-basis components and is modeled by the Pauli Z operator. The Hadamard basis connects bit-flip and phase-flip descriptions, which is why error-correction schemes consider both kinds of errors.",
          example: `operation ApplyPhaseFlip(q : Qubit) : Unit {
    Z(q);
}`,
          note:
            "A phase error may leave computational-basis measurement probabilities unchanged while still changing later interference.",
          quiz: {
            question: "Which gate models a phase flip in the computational basis?",
            options: ["Z", "X", "CNOT", "H"],
            answer: 0,
            explanation:
              "Z changes the phase of `|1⟩` relative to `|0⟩`.",
          },
          challenge: {
            title: "Distinguish Phase and Bit Flips",
            description:
              "Select the gate that models a phase error rather than exchanging basis states.",
            question: "Which gate applies a phase flip?",
            options: ["Z", "X", "SWAP", "CNOT"],
            answer: 0,
          },
        },
        {
          id: "repetition-code",
          title: "Encode with a Three-Qubit Repetition Code",
          xp: 20,
          overview:
            "A three-qubit repetition code stores one logical bit across three physical qubits. In the computational basis, states are encoded as `|0⟩ → |000⟩` and `|1⟩ → |111⟩`, allowing a majority vote to correct one bit flip, provided the logical information can be measured in the intended basis.",
          example: `operation EncodeZero(q0 : Qubit, q1 : Qubit, q2 : Qubit) : Unit {
    CNOT(q0, q1);
    CNOT(q0, q2);
}`,
          note:
            "The repetition code corrects a single bit-flip error in its chosen basis; it does not by itself correct arbitrary quantum errors.",
          quiz: {
            question: "What is the codeword for logical `|1⟩` in the repetition code?",
            options: ["|111⟩", "|100⟩", "|010⟩", "|001⟩"],
            answer: 0,
            explanation:
              "The logical one is encoded as three physical ones.",
          },
          challenge: {
            title: "Apply Majority Reasoning",
            description:
              "Choose the logical value represented by the measured bit string.",
            question: "With one possible bit flip, what does `110` decode to?",
            options: ["Logical 1", "Logical 0", "It is always undecidable", "A phase-flip flag"],
            answer: 0,
          },
        },
        {
          id: "syndrome",
          title: "Use Syndromes to Locate Errors",
          xp: 20,
          overview:
            "A syndrome is a set of parity-check outcomes that identifies an error pattern without directly measuring the encoded logical value. For a repetition code, comparing neighboring qubits reveals which position disagrees with the others.",
          example: `operation CheckParity(q0 : Qubit, q1 : Qubit) : Result {
    use ancilla = Qubit();
    CNOT(q0, ancilla);
    CNOT(q1, ancilla);
    let syndrome = M(ancilla);
    Reset(ancilla);
    return syndrome;
}`,
          note:
            "A production Q# implementation must reset or otherwise safely manage ancillas and interpret all syndrome bits consistently.",
          quiz: {
            question: "What is the purpose of a syndrome measurement?",
            options: [
              "Identify an error pattern without reading the logical value directly",
              "Guarantee the physical device had no noise",
              "Replace every gate in the program",
              "Measure the logical state in all bases",
            ],
            answer: 0,
            explanation:
              "Syndromes provide information about error locations while protecting the encoded information.",
          },
          challenge: {
            title: "Interpret Error Information",
            description:
              "Choose what a parity-check syndrome is intended to reveal.",
            question: "A repetition-code syndrome primarily points to…",
            options: [
              "Which qubit disagrees with its neighbors",
              "The source-code line number of a gate",
              "The exact physical temperature",
              "The logical state in every basis",
            ],
            answer: 0,
          },
        },
        {
          id: "logical-boundaries",
          title: "Know the Limits of Error Correction",
          xp: 20,
          overview:
            "Error correction adds encoding, syndrome extraction, and recovery operations, each of which can fail. Fault-tolerant design therefore compares physical error rates with code thresholds, accounts for overhead, and validates logical behavior on realistic targets.",
          example: `operation CorrectOneBitFlip(q0 : Qubit, q1 : Qubit, q2 : Qubit) : Unit {
    // Extract parity syndromes, then apply a conditional correction.
    // The logical state must not be measured during diagnosis.
}`,
          note:
            "A simple repetition code is an educational building block, not a complete fault-tolerant quantum computer.",
          quiz: {
            question: "Why is encoding alone not sufficient for fault tolerance?",
            options: [
              "Syndrome extraction and correction operations can also fail",
              "Encoded qubits cannot be measured",
              "Q# cannot express logical operations",
              "Noise disappears after the first gate",
            ],
            answer: 0,
            explanation:
              "A complete analysis must account for errors in the entire correction cycle.",
          },
          challenge: {
            title: "Evaluate a Correction Cycle",
            description:
              "Select the factor that must be considered when evaluating a fault-tolerant design.",
            question: "Which cost belongs in the error-correction analysis?",
            options: [
              "Errors introduced during syndrome extraction and recovery",
              "Only the number of source-code comments",
              "The editor theme",
              "Whether the file ends with a newline",
            ],
            answer: 0,
          },
        },
      ],
    },
  ],
});

export const QSHARP_ERROR_CORRECTION_CHAPTERS =
  QSHARP_ERROR_CORRECTION.chapters;
export const QSHARP_ERROR_CORRECTION_LESSONS = QSHARP_ERROR_CORRECTION.lessons;
export const QSHARP_ERROR_CORRECTION_TOTAL_XP = QSHARP_ERROR_CORRECTION.totalXP;
