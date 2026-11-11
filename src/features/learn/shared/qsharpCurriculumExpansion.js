const DISTRACTORS = [
  "It reveals all amplitudes directly without measurement.",
  "It guarantees a speedup on every input and execution target.",
  "It removes the need to validate results or resource assumptions.",
];

export function expandQsharpChapters(
  chapters,
  expansions,
  collection = "lessons",
  examples = {},
) {
  const knownIds = new Set(
    chapters.flatMap((chapter) => chapter[collection].map((item) => item.id)),
  );

  const expanded = chapters.map((chapter) => {
    const additions = (expansions[chapter.id] || []).map((spec) => {
      if (collection === "topics") {
        const [id, title, overview] = spec;
        if (knownIds.has(id)) {
          throw new Error(`Duplicate Q# lesson id: ${id}`);
        }
        knownIds.add(id);
        const options = [overview, ...DISTRACTORS];
        const quiz = {
          question: `Which statement best describes ${title}?`,
          options,
          answer: 0,
          explanation: overview,
        };
        return {
          id,
          title,
          xp: 24,
          overview,
          example: examples[chapter.id],
          note: "Check the assumptions in the example against the physical error model and target before drawing implementation conclusions.",
          quiz,
          challenge: {
            title: `Apply: ${title}`,
            description: `Use the example to explain the assumptions, expected syndrome or logical effect, and one limitation of ${title}.`,
            question: `Which statement is supported by this lesson on ${title}?`,
            options,
            answer: 0,
          },
        };
      }

      const [id, title, objective, exercise, signature, solution] = spec;
      if (knownIds.has(id)) {
        throw new Error(`Duplicate Q# lesson id: ${id}`);
      }
      knownIds.add(id);

      const functionName = signature.match(/^def\s+([A-Za-z_]\w*)\s*\(/)?.[1];
      if (!functionName) {
        throw new Error(`Invalid challenge signature for ${id}: ${signature}`);
      }

      const options = [objective, ...DISTRACTORS];
      const quiz = {
        question: `Which statement best describes ${title}?`,
        options,
        answer: 0,
        explanation: objective,
      };
      const challenge = {
        title: `Apply: ${title}`,
        description: exercise,
        starterCode: `${signature}\n    # Implement the stated behavior.\n    pass\n`,
        solutionCode: `${signature}\n    ${solution}\n`,
        tests: [
          {
            id: 1,
            label: `Defines ${functionName}`,
            keywords: [{ pattern: `def\\s+${functionName}` }],
          },
        ],
      };

      return {
        id,
        title,
        xp: 20,
        theory: [
          {
            type: "text",
            content: `## Core idea\n\n${objective}\n\nBuild on the chapter example by checking its assumptions before applying it to a larger circuit.`,
          },
          {
            type: "code",
            lang: "qsharp",
            label: `${title} in Q#`,
            content: examples[chapter.id] || chapter.example,
          },
          { type: "quiz", ...quiz },
        ],
        challenge,
      };
    });
    const items = [...chapter[collection], ...additions];
    if (items.length !== 6) {
      throw new Error(
        `Q# chapter "${chapter.id}" has ${items.length} ${collection}; expected 6`,
      );
    }
    return { ...chapter, [collection]: items };
  });

  return expanded;
}

export const QSHARP_LESSON_EXPANSIONS = {
  fundamentals: {
    examples: {
      "qsf-intro": `@EntryPoint()\noperation Main() : Unit {\n    Message("Q# is ready");\n}`,
      "qsf-types": `function IsValidShotCount(shots : Int) : Bool {\n    shots > 0\n}`,
      "qsf-measurement": `operation MeasureAndReset(q : Qubit) : Result {\n    let result = M(q);\n    Reset(q);\n    return result;\n}`,
      "qsf-composition": `newtype SampleSummary = (Total : Int, Ones : Int);\n\nfunction Summarize(total : Int, ones : Int) : SampleSummary {\n    SampleSummary(total, ones)\n}`,
      "qsf-functors": `operation ApplyPhase(q : Qubit) : Unit is Adj + Ctl {\n    Z(q);\n}`,
      "qsf-validation": `operation SamplePreparedState() : Result {\n    use q = Qubit();\n    X(q);\n    let result = M(q);\n    Reset(q);\n    return result;\n}`,
    },
    chapters: {
      "qsf-intro": [
        ["qsf-12", "Pin the Q# Toolchain", "Pinning the QDK and .NET versions makes builds and simulator behavior reproducible; record the target profile with each run.", "Write `is_supported_version(version, supported)` to check whether a requested toolchain is explicitly supported.", "def is_supported_version(version, supported):", "return version in supported"],
        ["qsf-13", "Trace the Host-to-Q# Boundary", "A host prepares classical inputs, invokes a Q# operation, and receives classical results; live qubit handles remain inside the quantum runtime.", "Write `validate_host_input(value, maximum)` to reject negative or oversized inputs.", "def validate_host_input(value, maximum):", "return 0 <= value <= maximum"],
        ["qsf-14", "Choose a Simulator for the Claim", "A simulator validates circuit semantics but does not demonstrate physical-device performance or quantum speedup.", "Write `classify_evidence(target)` to distinguish local simulation from a physical target.", "def classify_evidence(target):", "return 'simulation' if target == 'simulator' else 'physical target'"],
      ],
      "qsf-types": [
        ["qsf-15", "Make Classical State Changes Explicit", "Q# bindings are immutable by default; use `mutable` and `set` only when a classical value genuinely changes during an operation.", "Write `update_counter(value, increment)` to return the updated counter without mutating its input.", "def update_counter(value, increment):", "return value + increment"],
        ["qsf-16", "Convert Results at the Language Boundary", "`Result` is a quantum measurement outcome, not an `Int` or `Bool`; convert it explicitly before using it as ordinary host data.", "Write `result_to_bit(result)` to map `Zero` and `One` to 0 and 1.", "def result_to_bit(result):", "return {'Zero': 0, 'One': 1}[result]"],
        ["qsf-17", "Bound Loops and Validate Inputs", "Classical bounds should be validated before allocation or gate loops so invalid sizes cannot create impossible or unsafe quantum workloads.", "Write `valid_register_size(size, maximum)` for positive sizes no larger than the configured maximum.", "def valid_register_size(size, maximum):", "return 0 < size <= maximum"],
      ],
      "qsf-measurement": [
        ["qsf-18", "Enforce the Qubit Reset Postcondition", "A locally allocated qubit must be returned to `|0⟩` before its `use` scope ends; measurement alone does not guarantee that postcondition.", "Write `needs_reset(result)` to identify the measured outcome that leaves a qubit in `|1⟩`.", "def needs_reset(result):", "return result == 'One'"],
        ["qsf-19", "Measure in a Chosen Basis", "Applying `H` before a computational-basis measurement implements an X-basis measurement; undoing basis changes must match the measured observable.", "Write `basis_rotation(basis)` to return `H` for X and `I` for Z.", "def basis_rotation(basis):", "return {'X': 'H', 'Z': 'I'}[basis]"],
        ["qsf-20", "Aggregate Independent Shots", "A sampled frequency estimates a probability with finite uncertainty; retain the shot count and avoid interpreting one outcome as a distribution.", "Write `observed_rate(successes, shots)` and reject a zero-shot estimate.", "def observed_rate(successes, shots):", "return successes / shots if shots > 0 else None"],
      ],
      "qsf-composition": [
        ["qsf-21", "Design Explicit Operation Contracts", "A reusable Q# operation should state its classical inputs, qubit arguments, return value, and required postconditions such as ancilla cleanup.", "Write `contract_is_complete(fields)` to check that the required contract fields are present.", "def contract_is_complete(fields):", "return all(field in fields for field in ('inputs', 'outputs', 'postconditions'))"],
        ["qsf-22", "Use Arrays Without Exposing Quantum State", "Arrays can organize qubit registers and classical results, but a qubit array is not a readable array of amplitudes or bits.", "Write `count_ones(results)` to count classical `One` results in a measurement list.", "def count_ones(results):", "return sum(result == 'One' for result in results)"],
        ["qsf-23", "Validate User-Defined Data", "User-defined types make related values explicit, while constructor validation should reject inconsistent counts and out-of-range parameters.", "Write `valid_summary(total, ones)` for a count summary with `0 <= ones <= total`.", "def valid_summary(total, ones):", "return total >= 0 and 0 <= ones <= total"],
        ["qsf-24", "Separate Pure Helpers from Operations", "Keep deterministic classical preprocessing in functions and state-changing gates or measurements in operations to make side effects reviewable.", "Write `callable_kind(changes_qubits)` to return the suitable Q# abstraction.", "def callable_kind(changes_qubits):", "return 'operation' if changes_qubits else 'function'"],
        ["qsf-25", "Compose Results for the Host", "Return compact classical summaries from a quantum routine rather than leaking temporary quantum resources across the host boundary.", "Write `pack_summary(total, ones)` as a named mapping for host serialization.", "def pack_summary(total, ones):", "return {'total': total, 'ones': ones}"],
      ],
      "qsf-functors": [
        ["qsf-26", "Verify an Adjoint by Composition", "For a unitary operation `U`, its adjoint satisfies `U†U = I`; measurement and classical side effects do not have a unitary adjoint.", "Write `is_inverse_pair(forward, inverse)` to check that both operations are declared.", "def is_inverse_pair(forward, inverse):", "return bool(forward) and bool(inverse)"],
        ["qsf-27", "Control Only Unitary Operations", "A controlled operation coherently applies a unitary based on control qubits; it is not equivalent to measuring the controls and branching.", "Write `control_strategy(is_unitary)` to reject non-unitary operations.", "def control_strategy(is_unitary):", "return 'Controlled' if is_unitary else 'Not controllable'"],
        ["qsf-28", "Reverse Gate Order During Uncomputation", "The inverse of a composed circuit reverses gate order and replaces each gate by its adjoint; reversing order alone is insufficient.", "Write `inverse_sequence(gates)` to reverse a gate list and prefix each gate with `Adjoint`.", "def inverse_sequence(gates):", "return [f'Adjoint {gate}' for gate in reversed(gates)]"],
        ["qsf-29", "Uncompute Temporary Workspace", "Compute–use–uncompute removes scratch information only when the use step does not irreversibly disturb the workspace dependency.", "Write `workspace_is_clean(computed, uncomputed)` to verify matching compute/uncompute schedules.", "def workspace_is_clean(computed, uncomputed):", "return list(computed) == list(reversed(uncomputed))"],
        ["qsf-30", "Check Functor Support Before Reuse", "Declare `Adj` or `Ctl` only when every operation in the body supports the corresponding transformation.", "Write `supports_functors(operations, required)` to ensure every operation supports every required functor.", "def supports_functors(operations, required):", "return all(required <= set(supported) for supported in operations)"],
      ],
      "qsf-validation": [
        ["qsf-31", "Test Deterministic Circuit Invariants", "Test exact properties such as basis-state mapping and reset obligations separately from probabilistic distributions.", "Write `all_expected(actual, expected)` to compare deterministic test outputs.", "def all_expected(actual, expected):", "return list(actual) == list(expected)"],
        ["qsf-32", "Set Statistical Tolerances Before Sampling", "A probabilistic test needs an explicit shot count and tolerance; demanding an exact sample frequency makes tests flaky.", "Write `within_tolerance(observed, expected, tolerance)` for a predeclared bound.", "def within_tolerance(observed, expected, tolerance):", "return abs(observed - expected) <= tolerance"],
        ["qsf-33", "Report Execution Failures Explicitly", "A failed job or malformed output must remain a visible failure rather than becoming an empty result that resembles success.", "Write `execution_status(error)` to distinguish a failed run from a successful result.", "def execution_status(error):", "return 'failed' if error else 'completed'"],
        ["qsf-34", "Make Repeated Runs Reproducible", "Record the source revision, target, toolchain, input, and shot policy so repeated runs can be interpreted and compared fairly.", "Write `manifest_complete(fields)` to check for essential run metadata.", "def manifest_complete(fields):", "return all(key in fields for key in ('revision', 'target', 'toolchain', 'shots'))"],
        ["qsf-35", "Compare Simulator Results with a Baseline", "Use small exact classical cases to check circuit logic, but do not treat simulator-only results as evidence of hardware advantage.", "Write `comparison_label(target)` to label simulator results separately from device results.", "def comparison_label(target):", "return 'simulator baseline' if target == 'simulator' else 'device result'"],
      ],
    },
  },
  programmingBasics: {
    examples: {
      "qpb-superposition": `operation PrepareUniform(qs : Qubit[]) : Unit {\n    for q in qs {\n        H(q);\n    }\n}`,
      "qpb-registers": `operation PrepareBellPair(q0 : Qubit, q1 : Qubit) : Unit {\n    H(q0);\n    CNOT(q0, q1);\n}`,
      "qpb-operators": `operation PrepareAndUndo(q : Qubit) : Unit {\n    H(q);\n    Adjoint H(q);\n}`,
      "qpb-feed-forward": `operation CorrectFromResult(q : Qubit) : Unit {\n    let result = M(q);\n    if (result == One) { X(q); }\n}`,
      "qpb-ancillas": `operation ComputeUseUncompute(q : Qubit, ancilla : Qubit) : Unit {\n    CNOT(q, ancilla);\n    Z(ancilla);\n    CNOT(q, ancilla);\n}`,
      "qpb-contracts": `operation ApplyPhase(q : Qubit) : Unit is Adj + Ctl {\n    Z(q);\n}`,
    },
    chapters: {
      "qpb-superposition": [
        ["qpb-12", "Normalize State Preparation", "A prepared pure state must have squared amplitudes summing to one; an invalid vector is not a valid quantum state.", "Write `is_normalized(amplitudes, tolerance)` using a tolerance on the sum of squared amplitudes.", "def is_normalized(amplitudes, tolerance):", "return abs(sum(value * value for value in amplitudes) - 1.0) <= tolerance"],
        ["qpb-13", "Track Relative Phase Under Hadamards", "Relative phase can change interference even when immediate computational-basis probabilities are identical.", "Write `interference_result(phase_flip)` to predict the final bit for H-Z-H versus H-H.", "def interference_result(phase_flip):", "return 1 if phase_flip else 0"],
        ["qpb-14", "Estimate Superposition Sampling Error", "A uniform superposition gives equal ideal probabilities, but finite shots produce sampling fluctuations around that distribution.", "Write `expected_count(probability, shots)` for the expected number of observed outcomes.", "def expected_count(probability, shots):", "return probability * shots"],
      ],
      "qpb-registers": [
        ["qpb-15", "Distinguish Product States from Entanglement", "A Bell state cannot be factored into independent single-qubit states; computational-basis correlation alone is not a complete entanglement test.", "Write `bell_outcomes_match(first, second)` for two sampled Bell-pair results.", "def bell_outcomes_match(first, second):", "return first == second"],
        ["qpb-16", "Measure Correlations in Multiple Bases", "Applying basis rotations before measurement changes the observable and can expose correlations hidden in a single measurement basis.", "Write `measurement_rotation(basis)` for X, Y, and Z measurement conventions.", "def measurement_rotation(basis):", "return {'X': 'H', 'Y': 'Sdg then H', 'Z': 'I'}[basis]"],
        ["qpb-17", "Respect Register Ordering", "A register's index-to-bit convention must remain consistent across gate application, measurement, and host-side decoding.", "Write `decode_register(bits, little_endian)` to return the documented bit order.", "def decode_register(bits, little_endian):", "return list(reversed(bits)) if little_endian else list(bits)"],
      ],
      "qpb-operators": [
        ["qpb-18", "Compose Adjoint Operations Correctly", "The adjoint of `U₂U₁` is `U₁†U₂†`; reversing the operation sequence is required to undo a circuit.", "Write `adjoint_order(operations)` to reverse a gate sequence.", "def adjoint_order(operations):", "return list(reversed(operations))"],
        ["qpb-19", "Reason About Controlled Functors", "A controlled unitary preserves coherent control information; a measurement-conditioned branch destroys that coherence.", "Write `control_is_coherent(strategy)` to classify controlled versus measured control.", "def control_is_coherent(strategy):", "return strategy == 'Controlled'"],
        ["qpb-20", "Use Reversible Oracles", "An oracle must preserve enough information to be invertible; XORing a predicate into a target is a standard reversible contract.", "Write `xor_oracle(x, target, predicate)` for the reversible target update.", "def xor_oracle(x, target, predicate):", "return target ^ int(bool(predicate(x)))"],
      ],
      "qpb-feed-forward": [
        ["qpb-21", "Separate Measurement from Coherent Control", "Classical feed-forward uses an observed `Result`; coherent control applies an operation without observing its control qubit.", "Write `feed_forward_gate(result)` to map a classical outcome to a correction.", "def feed_forward_gate(result):", "return 'X' if result == 'One' else 'I'"],
        ["qpb-22", "Track Conditional State Corrections", "A correction branch must be derived from the measurement convention and protocol, not copied from an unrelated outcome ordering.", "Write `teleport_correction(x_bit, z_bit)` returning the required Pauli corrections.", "def teleport_correction(x_bit, z_bit):", "return [gate for bit, gate in ((x_bit, 'X'), (z_bit, 'Z')) if bit]"],
        ["qpb-23", "Validate Every Measurement Branch", "Every control-flow path must satisfy qubit cleanup and return-value contracts, including branches that apply no gate.", "Write `all_paths_reset(branches)` to verify all branch postconditions.", "def all_paths_reset(branches):", "return all(branch.get('reset', False) for branch in branches)"],
        ["qpb-24", "Handle Mid-Circuit Measurement Costs", "Mid-circuit measurement and feed-forward can constrain target compatibility and latency; their cost belongs in the algorithm model.", "Write `total_latency(gate_time, measurement_time, feed_forward_time)`.", "def total_latency(gate_time, measurement_time, feed_forward_time):", "return gate_time + measurement_time + feed_forward_time"],
        ["qpb-25", "Test Feed-Forward with Exhaustive Outcomes", "For a small protocol, exhaustively test every classical measurement outcome and compare the selected correction with its truth table.", "Write `covers_all_outcomes(mapping, outcomes)` to ensure every outcome is handled.", "def covers_all_outcomes(mapping, outcomes):", "return all(outcome in mapping for outcome in outcomes)"],
      ],
      "qpb-ancillas": [
        ["qpb-26", "Uncompute Without Erasing the Answer", "Scratch data can be uncomputed after its value has controlled a phase, provided the target operation preserves the information needed for reversal.", "Write `uncompute_order(computation)` to return the reverse gate order.", "def uncompute_order(computation):", "return list(reversed(computation))"],
        ["qpb-27", "Prevent Garbage Entanglement", "A workspace register left correlated with the output can prevent clean composition and invalidate an intended oracle action.", "Write `workspace_is_zero(state)` for a computational-basis workspace result.", "def workspace_is_zero(state):", "return all(bit == 0 for bit in state)"],
        ["qpb-28", "Budget Ancillas Against Circuit Depth", "Ancilla use can trade width for depth; compare both resources instead of optimizing one in isolation.", "Write `resource_dominates(a, b)` to check whether one design uses no more width or depth.", "def resource_dominates(a, b):", "return a['qubits'] <= b['qubits'] and a['depth'] <= b['depth']"],
        ["qpb-29", "Scope Temporary Qubit Ownership", "Allocate temporary qubits in the narrowest safe scope and restore them before that scope exits.", "Write `valid_lifetime(allocated, reset)` to verify all allocated workspace is cleaned.", "def valid_lifetime(allocated, reset):", "return set(allocated) <= set(reset)"],
        ["qpb-30", "Test Compute–Use–Uncompute Invariants", "A compute–use–uncompute routine should preserve the intended output and return all temporary qubits to their initial state.", "Write `uncompute_valid(computed, undone)` to verify inverse ordering.", "def uncompute_valid(computed, undone):", "return list(computed) == list(reversed(undone))"],
      ],
      "qpb-contracts": [
        ["qpb-31", "Specify Qubit Preconditions and Postconditions", "Operation contracts should state initial-state assumptions and final-state guarantees so callers can safely compose circuits.", "Write `has_state_contract(contract)` to check for both precondition and postcondition.", "def has_state_contract(contract):", "return bool(contract.get('precondition')) and bool(contract.get('postcondition'))"],
        ["qpb-32", "Compose Operations with Compatible Signatures", "Composition requires compatible input types, ownership expectations, functor support, and output semantics.", "Write `composable(first, second)` to check output/input compatibility.", "def composable(first, second):", "return first.get('output') == second.get('input')"],
        ["qpb-33", "Keep Classical Parameters Separate from Qubits", "Classical configuration belongs in typed parameters; quantum state belongs in qubit arguments and must not be inspected as ordinary data.", "Write `valid_operation_boundary(classical, quantum)` to check disjoint argument groups.", "def valid_operation_boundary(classical, quantum):", "return set(classical).isdisjoint(quantum)"],
        ["qpb-34", "Document Functor and Reset Guarantees", "Reusable APIs should declare supported adjoint/controlled transformations and whether caller-owned qubits are restored or changed.", "Write `api_ready(metadata)` to verify functor and state guarantees are documented.", "def api_ready(metadata):", "return all(metadata.get(key) is not None for key in ('functors', 'state_effect'))"],
        ["qpb-35", "Review an Operation as a Reusable Component", "A reusable operation needs stable semantics, bounded resource behavior, and tests for both ordinary and transformed invocation.", "Write `review_ready(checks)` to require all supplied review checks to pass.", "def review_ready(checks):", "return bool(checks) and all(checks)"],
      ],
    },
  },
  gates: {
    examples: {
      "qg-single": `operation RotateAndMeasure(theta : Double) : Result {\n    use q = Qubit();\n    Ry(theta, q);\n    let result = M(q);\n    Reset(q);\n    return result;\n}`,
      "qg-two": `operation Entangle(control : Qubit, target : Qubit) : Unit {\n    H(control);\n    CNOT(control, target);\n}`,
      "qg-multi": `operation ToggleWhenBothSet(a : Qubit, b : Qubit, target : Qubit) : Unit {\n    CCNOT(a, b, target);\n}`,
      "qg-basis": `operation MeasureInXBasis(q : Qubit) : Result {\n    H(q);\n    let result = M(q);\n    Reset(q);\n    return result;\n}`,
      "qg-decomposition": `operation TCountExample(q : Qubit) : Unit {\n    T(q);\n    T(q);\n    Adjoint T(q);\n}`,
      "qg-verification": `operation IdentityByCancellation(q : Qubit) : Unit {\n    X(q);\n    X(q);\n}`,
    },
    chapters: {
      "qg-single": [
        ["qg-12", "Track Global and Relative Phase", "A global phase does not change measurement probabilities, while a relative phase changes interference and can affect later outcomes.", "Write `phase_is_observable(global_phase)` to distinguish a global phase from a relative phase.", "def phase_is_observable(global_phase):", "return not global_phase"],
        ["qg-13", "Compose Rotations on the Same Axis", "Rotations about the same Pauli axis compose by adding angles, with periodic equivalence handled modulo a full turn.", "Write `combine_angles(first, second)` to return a normalized angle in `[0, 2π)`.", "def combine_angles(first, second):", "import math\n    return (first + second) % (2 * math.pi)"],
        ["qg-14", "Compare Gate Sequences by Action", "Two gate sequences are equivalent only when they implement the same unitary up to an irrelevant global phase.", "Write `same_sequence_action(matrix_a, matrix_b, tolerance)` to compare equally sized numeric matrices.", "def same_sequence_action(matrix_a, matrix_b, tolerance):", "return len(matrix_a) == len(matrix_b) and all(len(row_a) == len(row_b) and all(abs(a - b) <= tolerance for a, b in zip(row_a, row_b)) for row_a, row_b in zip(matrix_a, matrix_b))"],
      ],
      "qg-two": [
        ["qg-15", "Derive Controlled-Phase Behavior", "A controlled-phase gate changes the phase of the joint `|11⟩` component without flipping either computational-basis bit.", "Write `controlled_phase(state)` to apply a sign change only to the `11` amplitude.", "def controlled_phase(state):", "return {bits: (-amp if bits == '11' else amp) for bits, amp in state.items()}"],
        ["qg-16", "Use SWAP for Explicit Register Reordering", "SWAP exchanges two qubit states but does not itself create entanglement; use it to implement and document register permutations.", "Write `swap_pair(pair)` to reverse a two-element state pair.", "def swap_pair(pair):", "return (pair[1], pair[0])"],
        ["qg-17", "Test Two-Qubit Gates on Basis States", "A two-qubit unitary can be verified on a complete computational basis because linearity determines its action on superpositions.", "Write `truth_table_complete(rows)` to check all four two-bit inputs are represented.", "def truth_table_complete(rows):", "return {row[0] for row in rows} == {'00', '01', '10', '11'}"],
      ],
      "qg-multi": [
        ["qg-18", "Use Toffoli as Reversible AND", "Toffoli computes an AND into a target while preserving the controls, making the result reversible when the target is retained.", "Write `toffoli_target(a, b, target)` using XOR to model the reversible target update.", "def toffoli_target(a, b, target):", "return target ^ (a & b)"],
        ["qg-19", "Estimate Multi-Control Gate Cost", "A multi-controlled gate may require decomposition and ancillas on a constrained gate set; source-level gate count is not physical cost.", "Write `decomposed_cost(parts)` to sum the cost of each decomposition stage.", "def decomposed_cost(parts):", "return sum(parts)"],
        ["qg-20", "Preserve Reversibility in Logic Synthesis", "Reversible synthesis must retain enough input information to make the mapping one-to-one; an irreversible AND needs workspace or retained inputs.", "Write `is_injective(outputs)` to detect duplicate outputs in a finite mapping.", "def is_injective(outputs):", "return len(outputs) == len(set(outputs))"],
      ],
      "qg-basis": [
        ["qg-21", "Relate X-Basis Measurement to Hadamards", "Applying H before Z-basis measurement is equivalent to measuring the original state in the X basis.", "Write `pre_measurement_gate(basis)` for X- and Z-basis measurements.", "def pre_measurement_gate(basis):", "return {'X': 'H', 'Z': 'I'}[basis]"],
        ["qg-22", "Derive Phase Kickback from an Ancilla", "Preparing a target in `|−⟩` lets a reversible bit oracle imprint a predicate-dependent phase on its control register.", "Write `kickback_sign(predicate)` to return the phase factor for a Boolean predicate.", "def kickback_sign(predicate):", "return -1 if predicate else 1"],
        ["qg-23", "Choose a Measurement Basis for an Observable", "The basis rotation must map the desired observable eigenbasis to the computational basis before measurement.", "Write `basis_for_pauli(observable)` to select the required pre-measurement rotation.", "def basis_for_pauli(observable):", "return {'X': 'H', 'Y': 'Sdg then H', 'Z': 'I'}[observable]"],
        ["qg-24", "Separate Measurement Probability from Amplitude", "An amplitude is complex and phase-bearing; its squared magnitude gives a measurement probability, not the amplitude itself.", "Write `probability_from_amplitude(real, imag)` for a complex amplitude.", "def probability_from_amplitude(real, imag):", "return real * real + imag * imag"],
        ["qg-25", "Validate Phase-Oracle Truth Tables", "A phase oracle must flip exactly marked basis states and leave all unmarked amplitudes unchanged.", "Write `phase_oracle_valid(before, after, marked)` for basis-state amplitude mappings.", "def phase_oracle_valid(before, after, marked):", "return before.keys() == after.keys() and all(after[key] == (-before[key] if key in marked else before[key]) for key in before)"],
      ],
      "qg-decomposition": [
        ["qg-26", "Compare T-Count and T-Depth", "T-count measures the total non-Clifford T gates, while T-depth measures sequential layers and can be reduced through safe parallelization.", "Write `t_count(gates)` and return the total T-gate occurrences.", "def t_count(gates):", "return sum(gate == 'T' for gate in gates)"],
        ["qg-27", "Approximate Rotations with an Error Budget", "Approximate gate synthesis should allocate an error budget across rotations so total implementation error remains within the algorithm tolerance.", "Write `per_gate_budget(total_error, gate_count)` for an equal allocation.", "def per_gate_budget(total_error, gate_count):", "return total_error / gate_count if gate_count > 0 else 0"],
        ["qg-28", "Account for Ancillas in Decomposition", "A lower-depth decomposition may use more ancillas; report qubit width and depth together when comparing implementations.", "Write `resource_pair(qubits, depth)` as a named result.", "def resource_pair(qubits, depth):", "return {'qubits': qubits, 'depth': depth}"],
        ["qg-29", "Estimate a Fault-Tolerant T Budget", "A logical T-count can drive magic-state factory and runtime estimates, but cannot alone determine physical resources without an error-correction model.", "Write `factory_batches(t_count, factory_rate)` using a positive production rate.", "def factory_batches(t_count, factory_rate):", "return (t_count + factory_rate - 1) // factory_rate if factory_rate > 0 else None"],
        ["qg-30", "Document Target-Specific Gate Assumptions", "A decomposition is meaningful only relative to a target gate set, connectivity, and compiler version.", "Write `estimate_is_comparable(a, b)` to require matching target assumptions.", "def estimate_is_comparable(a, b):", "return a.get('target') == b.get('target') and a.get('compiler') == b.get('compiler')"],
      ],
      "qg-verification": [
        ["qg-31", "Cancel Gates Only Under Valid Identities", "Self-inverse adjacent gates cancel, but a rewrite is valid only when gate order and operands satisfy the relevant algebraic identity.", "Write `cancel_adjacent(gates)` to remove neighboring identical self-inverse gates.", "def cancel_adjacent(gates):", "result = []\n    for gate in gates:\n        if result and result[-1] == gate:\n            result.pop()\n        else:\n            result.append(gate)\n    return result"],
        ["qg-32", "Check Commutation Before Reordering", "Two gates can be reordered only when their operators commute on the shared state; disjoint support is a common sufficient condition.", "Write `can_reorder(support_a, support_b)` for disjoint qubit supports.", "def can_reorder(support_a, support_b):", "return set(support_a).isdisjoint(support_b)"],
        ["qg-33", "Verify Circuits with Basis-State Tests", "Testing each computational basis input catches many gate-order and control-target errors before probabilistic integration tests.", "Write `basis_test_passed(actual, expected)` to compare complete output tables.", "def basis_test_passed(actual, expected):", "return actual == expected"],
        ["qg-34", "Guard Optimizations with Regression Tests", "Every semantics-preserving optimization should retain a baseline and rerun correctness and resource checks.", "Write `regression_passed(before, after, tolerance)` for a bounded metric change.", "def regression_passed(before, after, tolerance):", "return abs(after - before) <= tolerance"],
        ["qg-35", "Preserve Circuit Intent in Optimized Output", "Optimization is successful only when it preserves the intended observable behavior and improves a declared resource metric.", "Write `optimization_acceptable(equivalent, old_cost, new_cost)`.", "def optimization_acceptable(equivalent, old_cost, new_cost):", "return equivalent and new_cost < old_cost"],
      ],
    },
  },
  algorithms: {
    examples: {
      "qa-deutsch": `operation ApplyOneBitPhaseOracle(q : Qubit) : Unit {\n    Z(q);\n}`,
      "qa-search": `operation PrepareSearchRegister(qs : Qubit[]) : Unit {\n    for q in qs { H(q); }\n}`,
      "qa-qft": `operation ApplyPhaseRotation(angle : Double, q : Qubit) : Unit {\n    Rz(angle, q);\n}`,
      "qa-factoring": `function IsCandidateOrder(r : Int) : Bool {\n    r > 0 and r % 2 == 0\n}`,
      "qa-hybrid": `operation PrepareAnsatz(theta : Double, q : Qubit) : Unit {\n    Ry(theta, q);\n}`,
      "qa-evaluation": `function SuccessRate(successes : Int, shots : Int) : Double {\n    IntAsDouble(successes) / IntAsDouble(shots)\n}`,
    },
    chapters: {
      "qa-deutsch": [
        ["qa-12", "State the Deutsch–Jozsa Promise", "The Deutsch–Jozsa guarantee assumes the oracle is either constant or balanced; the decision is not valid for arbitrary functions.", "Write `is_promised(outputs)` to check constant or balanced non-empty truth-table outputs.", "def is_promised(outputs):", "return bool(outputs) and (len(set(outputs)) == 1 or outputs.count(1) * 2 == len(outputs))"],
        ["qa-13", "Derive the Interference Decision Signal", "After phase kickback and Hadamards, the all-zero amplitude is proportional to the signed sum of oracle outputs.", "Write `zero_amplitude_sign(outputs)` to return the normalized signed sum.", "def zero_amplitude_sign(outputs):", "return sum(1 if value == 0 else -1 for value in outputs) / len(outputs)"],
        ["qa-14", "Separate Query Advantage from Oracle Cost", "One oracle query is not one constant-cost circuit: constructing a coherent reversible oracle can dominate total gate count.", "Write `total_query_cost(queries, gates_per_query)`.", "def total_query_cost(queries, gates_per_query):", "return queries * gates_per_query"],
      ],
      "qa-search": [
        ["qa-15", "Build the Grover Diffusion Reflection", "The diffuser reflects amplitudes about the mean of the prepared uniform state and must use the same state-preparation convention.", "Write `reflect_about_mean(values)` for a real-valued amplitude list.", "def reflect_about_mean(values):", "mean = sum(values) / len(values)\n    return [2 * mean - value for value in values]"],
        ["qa-16", "Choose Iterations from the Marked Fraction", "With M marked states among N, Grover rotates by angle θ where sin²θ = M/N; the first peak occurs near π/(4θ).", "Write `grover_peak_estimate(n, m)` for a positive marked count no larger than the search space.", "def grover_peak_estimate(n, m):", "import math\n    if n <= 0 or m <= 0 or m > n:\n        return 0\n    theta = math.asin(math.sqrt(m / n))\n    return max(0, round(math.pi / (4 * theta) - 0.5))"],
        ["qa-17", "Handle Unknown or Zero Solution Counts", "Fixed Grover iteration counts can fail when the number of marked states is unknown or zero; define a stopping and verification strategy.", "Write `should_accept(candidate, predicate)` to verify a sampled candidate.", "def should_accept(candidate, predicate):", "return bool(predicate(candidate))"],
      ],
      "qa-qft": [
        ["qa-18", "Track QFT Register Endianness", "QFT circuit decompositions may return reversed register order; decode measured bits using an explicit endianness convention.", "Write `reverse_bits(bits, reversed_order)` to normalize a bit sequence.", "def reverse_bits(bits, reversed_order):", "return list(reversed(bits)) if reversed_order else list(bits)"],
        ["qa-19", "Estimate Approximate-QFT Error", "Dropping small controlled rotations reduces depth but introduces approximation error that must fit the algorithm's success budget.", "Write `total_error_bound(per_rotation, omitted_rotations)`.", "def total_error_bound(per_rotation, omitted_rotations):", "return per_rotation * omitted_rotations"],
        ["qa-20", "Connect Phase Estimation to Precision", "With t evaluation qubits, phase estimation resolves phase on a grid with spacing approximately 1/2^t, subject to sampling and eigenstate assumptions.", "Write `phase_resolution(evaluation_qubits)`.", "def phase_resolution(evaluation_qubits):", "return 1 / (2 ** evaluation_qubits)"],
      ],
      "qa-factoring": [
        ["qa-21", "Validate Order-Finding Preconditions", "Classical post-processing requires a valid positive even order and a base coprime to the modulus before extracting nontrivial factors.", "Write `valid_order_inputs(a, n, r)` for the stated preconditions.", "def valid_order_inputs(a, n, r):", "import math\n    return n > 1 and r > 0 and r % 2 == 0 and math.gcd(a, n) == 1"],
        ["qa-22", "Reject Trivial Candidate Factors", "A candidate equal to one or the full modulus is not a nontrivial factor and requires another base or order sample.", "Write `nontrivial_factors(candidates, n)` to filter and deduplicate candidates.", "def nontrivial_factors(candidates, n):", "return sorted({value for value in candidates if 1 < value < n})"],
        ["qa-23", "Recover a Period from Continued Fractions", "Phase-estimation measurements provide an approximation to a rational with denominator related to the order; continued fractions produce candidates that need verification.", "Write `candidate_period(numerator, denominator)` for a reduced rational's denominator.", "def candidate_period(numerator, denominator):", "import math\n    return denominator // math.gcd(numerator, denominator)"],
        ["qa-24", "Verify Modular Order Candidates", "A proposed order r must satisfy a^r ≡ 1 mod N and should be checked for a smaller positive divisor with the same property.", "Write `is_order(a, n, r)` to verify that r is the smallest positive modular order.", "def is_order(a, n, r):", "return r > 0 and pow(a, r, n) == 1 and all(pow(a, divisor, n) != 1 for divisor in range(1, r) if r % divisor == 0)"],
        ["qa-25", "Account for Shor's Classical Failure Paths", "Even a valid period can produce trivial factors when the base or parity conditions fail; retries belong in the hybrid algorithm specification.", "Write `needs_new_sample(r, candidate_factors)` for odd or factorless outcomes.", "def needs_new_sample(r, candidate_factors):", "return r % 2 != 0 or not candidate_factors"],
      ],
      "qa-hybrid": [
        ["qa-26", "Estimate Expectation Values from Shots", "VQE and QAOA objectives are estimated from finite measurement samples, so each optimizer update carries statistical uncertainty.", "Write `sample_mean(values)` for non-empty samples.", "def sample_mean(values):", "return sum(values) / len(values) if values else None"],
        ["qa-27", "Use Parameter-Shift Gradients Carefully", "Parameter-shift rules apply to supported gates and objectives; verify the generator assumptions before using a shifted-evaluation formula.", "Write `parameter_shift(plus, minus)` for the standard half-difference rule.", "def parameter_shift(plus, minus):", "return (plus - minus) / 2"],
        ["qa-28", "Bound the Hybrid Evaluation Budget", "A hybrid optimizer's circuit budget includes objective evaluations, shots per evaluation, and retries rather than iteration count alone.", "Write `shot_budget(evaluations, shots_each, retries)`.", "def shot_budget(evaluations, shots_each, retries):", "return evaluations * shots_each * (retries + 1)"],
        ["qa-29", "Choose a Stopping Rule with Uncertainty", "Stop based on a declared iteration cap and objective/uncertainty criterion; noisy apparent convergence should not be mistaken for an exact optimum.", "Write `converged(delta, tolerance, uncertainty)` requiring both stability and acceptable uncertainty.", "def converged(delta, tolerance, uncertainty):", "return abs(delta) <= tolerance and uncertainty <= tolerance"],
        ["qa-30", "Compare Variational Results with Classical Baselines", "A heuristic quantum result is meaningful only against a classical baseline on the same instances and comparable evaluation budget.", "Write `relative_gap(best, baseline)` with a safe zero-baseline case.", "def relative_gap(best, baseline):", "return None if baseline == 0 else (best - baseline) / abs(baseline)"],
      ],
      "qa-evaluation": [
        ["qa-31", "Quantify Bernoulli Sampling Uncertainty", "For a measured success fraction p from S independent shots, the standard error is approximately √(p(1−p)/S).", "Write `standard_error(successes, shots)` for positive shot counts.", "def standard_error(successes, shots):", "import math\n    p = successes / shots\n    return math.sqrt(p * (1 - p) / shots) if shots > 0 else None"],
        ["qa-32", "Predeclare Benchmark Metrics", "Predeclared metrics and stopping rules prevent selecting only favorable instances or parameter settings after observing results.", "Write `benchmark_complete(metrics)` to require accuracy, cost, and baseline fields.", "def benchmark_complete(metrics):", "return all(key in metrics for key in ('accuracy', 'cost', 'baseline'))"],
        ["qa-33", "Separate Asymptotic and Finite-Size Claims", "An asymptotic complexity advantage does not establish a practical crossover at the finite sizes accessible to current devices.", "Write `practical_crossover(quantum_cost, classical_cost)`.", "def practical_crossover(quantum_cost, classical_cost):", "return quantum_cost < classical_cost"],
        ["qa-34", "Report Uncertainty Alongside Best Samples", "A best observed sample is not a stable estimator; report distribution summaries and uncertainty alongside the best result.", "Write `summary_stats(values)` returning count, mean, and minimum.", "def summary_stats(values):", "return {'count': len(values), 'mean': sum(values) / len(values), 'minimum': min(values)} if values else None"],
        ["qa-35", "Choose an Algorithm by Total Resource Cost", "Compare data loading, oracle synthesis, circuit depth, shots, and classical post-processing before selecting an algorithm.", "Write `total_cost(parts)` to sum a named set of nonnegative costs.", "def total_cost(parts):", "return sum(parts.values())"],
      ],
    },
  },
  projects: {
    examples: {
      "qp-crypto": `operation SampleRandomBit() : Result {\n    use q = Qubit();\n    H(q);\n    let bit = M(q);\n    Reset(q);\n    return bit;\n}`,
      "qp-capstone": `operation PrepareBellPair(q0 : Qubit, q1 : Qubit) : Unit {\n    H(q0);\n    CNOT(q0, q1);\n}`,
      "qp-validation": `operation VerifyPreparedOne() : Result {\n    use q = Qubit();\n    X(q);\n    let result = M(q);\n    Reset(q);\n    return result;\n}`,
      "qp-hybrid": `operation Ansatz(theta : Double, q : Qubit) : Unit {\n    Ry(theta, q);\n}`,
      "qp-resources": `operation AllocateAndRelease(count : Int) : Unit {\n    use register = Qubit[count];\n    ResetAll(register);\n}`,
      "qp-reproducibility": `newtype RunMetadata = (Target : String, Shots : Int, Revision : String);`,
    },
    chapters: {
      "qp-crypto": [
        ["qp-10", "Assess QRNG Sampling and Entropy", "Hadamard measurement gives an ideal uniform bit, but a practical random source needs bias tests, entropy analysis, and target-specific validation.", "Write `empirical_bias(ones, shots)` as the absolute deviation from one half.", "def empirical_bias(ones, shots):", "return abs(ones / shots - 0.5) if shots > 0 else None"],
        ["qp-11", "Account for Teleportation Correction Conventions", "Teleportation corrections depend on which measurement bit controls X and Z; state the convention and test all four outcomes.", "Write `correction_count(x_bit, z_bit)` for the number of required Pauli corrections.", "def correction_count(x_bit, z_bit):", "return int(bool(x_bit)) + int(bool(z_bit))"],
        ["qp-12", "Evaluate BB84 Sifting and Error Rates", "BB84 keeps positions measured in matching bases and estimates channel disturbance from a disclosed test subset.", "Write `quantum_bit_error_rate(errors, tested)` and handle an empty test set.", "def quantum_bit_error_rate(errors, tested):", "return errors / tested if tested > 0 else None"],
      ],
      "qp-capstone": [
        ["qp-13", "Validate Superdense Message Bitstrings", "Superdense coding requires a shared Bell pair and a consistent mapping from two classical bits to encoding gates and Bell-basis decoding.", "Write `valid_dense_message(bits)` to accept only two-bit binary messages.", "def valid_dense_message(bits):", "return len(bits) == 2 and set(bits) <= {'0', '1'}"],
        ["qp-14", "Validate VQE Energy Estimates", "A VQE energy estimate must use a normalized state, a defined Hamiltonian, and repeated measurements with uncertainty.", "Write `is_valid_energy(value, lower_bound, upper_bound)`.", "def is_valid_energy(value, lower_bound, upper_bound):", "return lower_bound <= value <= upper_bound"],
        ["qp-15", "Integrate a Capstone as a Tested Pipeline", "A capstone should separate input validation, Q# execution, result aggregation, and reporting so each stage can be tested independently.", "Write `pipeline_ready(stages)` to verify all required project stages exist.", "def pipeline_ready(stages):", "return all(stage in stages for stage in ('validate', 'execute', 'aggregate', 'report'))"],
      ],
      "qp-validation": [
        ["qp-16", "Model Readout Confusion Explicitly", "A readout-confusion matrix describes measured outcomes conditional on prepared states and should be calibrated separately from gate noise.", "Write `corrected_probability(observed, false_positive, false_negative)` for a binary readout model.", "def corrected_probability(observed, false_positive, false_negative):", "denominator = 1 - false_positive - false_negative\n    return (observed - false_positive) / denominator if denominator > 0 else None"],
        ["qp-17", "Separate Shot Noise from Device Drift", "Shot-to-shot uncertainty and time-dependent calibration drift are distinct effects and require different sampling and monitoring strategies.", "Write `drift_detected(first, second, threshold)` to flag a change in measured rates.", "def drift_detected(first, second, threshold):", "return abs(first - second) > threshold"],
        ["qp-18", "Validate a Noise Model Against Controls", "A noise model should reproduce control-circuit behavior before it is trusted to explain a target algorithm's observed degradation.", "Write `model_matches_controls(predicted, measured, tolerance)`.", "def model_matches_controls(predicted, measured, tolerance):", "return all(abs(a - b) <= tolerance for a, b in zip(predicted, measured))"],
        ["qp-19", "Report Confidence Bounds for Success Rates", "Success-rate reports should include a confidence interval or standard error, especially when comparing close outcomes.", "Write `rate_interval(successes, shots, margin)`.", "def rate_interval(successes, shots, margin):", "p = successes / shots\n    return (max(0, p - margin), min(1, p + margin)) if shots > 0 else None"],
        ["qp-20", "Use Controls to Detect Circuit Regressions", "A reference circuit with a known distribution detects setup and measurement regressions that can otherwise be misattributed to the algorithm.", "Write `control_passes(observed, expected, tolerance)`.", "def control_passes(observed, expected, tolerance):", "return abs(observed - expected) <= tolerance"],
      ],
      "qp-hybrid": [
        ["qp-21", "Choose a Stable Optimizer Step", "A gradient step must respect parameter bounds and use gradients estimated under a declared sampling policy.", "Write `bounded_step(value, gradient, rate, lower, upper)`.", "def bounded_step(value, gradient, rate, lower, upper):", "return min(upper, max(lower, value - rate * gradient))"],
        ["qp-22", "Track Optimizer Noise and Evaluation Counts", "Noisy gradients may increase evaluation count or destabilize updates; log every circuit call and its uncertainty.", "Write `evaluation_cost(calls, shots_each)`.", "def evaluation_cost(calls, shots_each):", "return calls * shots_each"],
        ["qp-23", "Detect Hybrid-Loop Non-Convergence", "A bounded hybrid loop should stop at its iteration or wall-time limit and report non-convergence instead of silently claiming success.", "Write `stop_reason(iteration, limit, converged)`.", "def stop_reason(iteration, limit, converged):", "return 'converged' if converged else 'limit reached' if iteration >= limit else 'continue'"],
        ["qp-24", "Retry Failed Jobs Without Duplicating Results", "Retries should retain unique job identifiers and must not count duplicate submissions as independent experimental samples.", "Write `is_new_job(job_id, seen)`.", "def is_new_job(job_id, seen):", "return job_id not in seen"],
        ["qp-25", "Compare Variational Runs Fairly", "Fair variational comparisons use the same instance set, stopping criteria, sampling budget, and reporting metric.", "Write `fair_comparison(config_a, config_b, keys)`.", "def fair_comparison(config_a, config_b, keys):", "return all(config_a.get(key) == config_b.get(key) for key in keys)"],
      ],
      "qp-resources": [
        ["qp-26", "Estimate Circuit Depth Before Submission", "Depth and connectivity constraints can dominate execution time even when a circuit uses few logical qubits.", "Write `estimated_runtime(depth, cycle_time)`.", "def estimated_runtime(depth, cycle_time):", "return depth * cycle_time"],
        ["qp-27", "Add Shot and Retry Cost to a Job Budget", "Execution budgets must include shots per circuit, parameter evaluations, and planned retries rather than only logical circuit size.", "Write `planned_shots(circuits, shots_each, retries)`.", "def planned_shots(circuits, shots_each, retries):", "return circuits * shots_each * (retries + 1)"],
        ["qp-28", "Reject Infeasible Resource Requests Early", "Validate qubit count, depth, time, and budget limits before queuing a remote job to avoid preventable cost and failed submissions.", "Write `within_limits(request, limits)` for all declared numeric resource fields.", "def within_limits(request, limits):", "return all(request.get(key, 0) <= limit for key, limit in limits.items())"],
        ["qp-29", "Compare Logical and Physical Qubit Estimates", "Logical qubit counts exclude error-correction overhead; physical estimates require explicit code and factory assumptions.", "Write `overhead_ratio(physical, logical)` with a safe zero-logical case.", "def overhead_ratio(physical, logical):", "return physical / logical if logical > 0 else None"],
        ["qp-30", "Record Resource-Estimator Assumptions", "A resource estimate is only comparable when its target profile, error model, code distance, and estimator version are recorded.", "Write `estimate_metadata_complete(metadata)` to validate essential fields.", "def estimate_metadata_complete(metadata):", "return all(key in metadata for key in ('target', 'error_model', 'code_distance', 'estimator_version'))"],
      ],
      "qp-reproducibility": [
        ["qp-31", "Hash Inputs for Reproducible Runs", "An input hash identifies the exact problem instance without relying on informal filenames or mutable external state.", "Write `input_fingerprint(data)` using a stable string encoding and built-in hash substitute.", "def input_fingerprint(data):", "import hashlib\n    return hashlib.sha256(repr(data).encode('utf-8')).hexdigest()"],
        ["qp-32", "Separate Secrets from Run Metadata", "Run manifests should record non-sensitive configuration while credentials remain in a protected secret store and never enter logs.", "Write `safe_manifest(fields)` to remove credential-like keys.", "def safe_manifest(fields):", "return {key: value for key, value in fields.items() if 'token' not in key.lower() and 'secret' not in key.lower()}"],
        ["qp-33", "Make Job Submission Idempotent", "A stable submission key lets a host detect a retried request and avoid unintentionally launching duplicate costly jobs.", "Write `submission_key(revision, input_hash, parameters)` as a stable tuple.", "def submission_key(revision, input_hash, parameters):", "return (revision, input_hash, tuple(sorted(parameters.items())))"],
        ["qp-34", "Preserve Failed and Partial Run Records", "Failed and partial jobs are evidence about reliability and must be retained with status rather than converted to successful empty outputs.", "Write `record_status(result, error)` to preserve failure details.", "def record_status(result, error):", "return {'status': 'failed', 'error': str(error)} if error else {'status': 'completed', 'result': result}"],
        ["qp-35", "Write a Reproducible Technical Summary", "A useful report links source revision, target, toolchain, input, shots, uncertainty, baseline, and resource assumptions to every conclusion.", "Write `report_complete(fields)` to verify essential evidence is present.", "def report_complete(fields):", "return all(key in fields for key in ('revision', 'target', 'toolchain', 'input', 'shots', 'baseline', 'uncertainty'))"],
      ],
    },
  },
  errorCorrection: {
    examples: {
      "noise-and-errors": `operation ApplyBitFlip(q : Qubit) : Unit {\n    X(q);\n}`,
      "encoding-and-diagnosis": `operation MeasureParity(q0 : Qubit, q1 : Qubit) : Result {\n    use ancilla = Qubit();\n    CNOT(q0, ancilla);\n    CNOT(q1, ancilla);\n    let syndrome = M(ancilla);\n    Reset(ancilla);\n    return syndrome;\n}`,
      "phase-code": `operation ChangeToPhaseBasis(q : Qubit) : Unit {\n    H(q);\n}`,
      "shor-code": `operation EncodeBlock(q0 : Qubit, q1 : Qubit, q2 : Qubit) : Unit {\n    CNOT(q0, q1);\n    CNOT(q0, q2);\n}`,
      "surface-code": `operation MeasureLocalCheck(data0 : Qubit, data1 : Qubit, ancilla : Qubit) : Result {\n    CNOT(data0, ancilla);\n    CNOT(data1, ancilla);\n    let result = M(ancilla);\n    Reset(ancilla);\n    return result;\n}`,
      "fault-tolerance": `function IsBelowThreshold(physicalError : Double, threshold : Double) : Bool {\n    physicalError < threshold\n}`,
    },
    chapters: {
      "noise-and-errors": [
        ["noise-channel-models", "Compare Bit-Flip and Depolarizing Channels", "A bit-flip channel applies X with a probability, while depolarizing noise distributes error across non-identity Pauli operators under a stated convention.", "Noise-channel probabilities depend on the exact model and convention; validate channel parameters before simulation."],
        ["compose-error-probability", "Compose Independent Error Probabilities", "For independent error events, the probability of at least one error is one minus the product of the no-error probabilities.", "Use independence only when the device model justifies it; correlated errors require a different calculation."],
        ["distinguish-gate-readout", "Separate Gate Noise from Readout Noise", "Gate errors alter circuit evolution, while readout errors corrupt the classical result; calibrate and analyze these sources separately.", "A readout-confusion matrix cannot by itself explain coherent gate errors or time-correlated drift."],
        ["estimate-coherence", "Relate Circuit Duration to Coherence", "Longer circuit duration can increase exposure to decoherence; compare gate schedules against the target's coherence and noise assumptions.", "A coherence-time estimate is not a full noise model and should not be treated as a device guarantee."],
      ],
      "encoding-and-diagnosis": [
        ["syndrome-parity-checks", "Derive Repetition-Code Parity Checks", "Neighboring parity checks identify which data qubit disagrees in a three-qubit bit-flip code without directly measuring the encoded logical value.", "Keep syndrome-bit ordering consistent with the decoder and test every single-qubit error location."],
        ["limit-classical-majority", "Limit Majority Decoding to Its Error Model", "Majority voting corrects a single bit flip in the repetition code's chosen basis, but it does not protect an arbitrary quantum state against phase errors.", "A decoder must not infer that a code corrects error types it was not designed to detect."],
      ],
      "phase-code": [
        ["phase-encode", "Derive Phase-Flip Encoding", "Hadamard basis changes map phase-flip protection to a bit-flip repetition problem and back again.", "Conjugate the error and the code operations together; basis changes at only one boundary change the logical interpretation."],
        ["phase-syndrome", "Measure Phase Syndromes Safely", "Parity checks in the complementary basis reveal phase-error information while avoiding direct measurement of the encoded amplitudes.", "Ancilla preparation, controlled gates, measurement, and reset must match the chosen stabilizer convention."],
        ["phase-recovery", "Recover from a Detected Phase Flip", "A phase-code recovery applies a correction selected from the syndrome, with the correction table derived from the exact check ordering.", "Verify the recovery on every single-qubit phase-error case, not only one representative location."],
        ["phase-code-basis", "Compare Bit- and Phase-Code Bases", "Bit-flip and phase-flip repetition codes are related by Hadamards but protect different observables and require different syndrome bases.", "The code basis determines which information the syndrome can reveal without damaging the logical state."],
        ["phase-code-limits", "Test the Phase Code's Correction Boundary", "A phase-flip repetition code does not automatically correct simultaneous arbitrary Pauli errors; characterize its correctable set explicitly.", "The code distance and correctable error set are properties of the full code and decoder, not the name alone."],
      ],
      "shor-code": [
        ["shor-logical-encoding", "Trace the Nine-Qubit Shor Encoding", "The Shor code concatenates bit- and phase-repetition structure to protect one logical qubit against an arbitrary single-qubit error in the ideal code model.", "A short illustrative circuit fragment is not a complete encoder; trace all nine physical qubits and their ordering."],
        ["concatenation-order", "Analyze Concatenation Order", "The order of inner and outer encodings affects the resulting stabilizers and decoding map, even when both layers use repetition ideas.", "Document logical basis conventions before translating a concatenated code into gates."],
        ["shor-syndrome", "Decode Shor-Code Syndromes", "Syndrome groups identify bit- and phase-error information; the decoder combines checks without measuring the logical state.", "Check that syndrome extraction is fault-aware before using it as a fault-tolerant routine."],
        ["shor-resource-cost", "Estimate Concatenated-Code Overhead", "Concatenation expands physical qubit and gate counts; compare code capability with encoding, syndrome, and recovery costs.", "Logical protection alone does not determine whether the encoded computation is more reliable end to end."],
        ["shor-code-boundary", "Identify Shor-Code Assumptions", "The single-error correction claim assumes a valid code implementation and bounded error model; correlated faults can violate that assumption.", "State the fault model and decoding assumptions alongside any correction claim."],
      ],
      "surface-code": [
        ["surface-stabilizers", "Distinguish X- and Z-Type Checks", "Surface-code stabilizers use complementary X- and Z-type checks to detect different error classes while preserving encoded information.", "Check operators must commute within the stabilizer set and align with the data-qubit geometry."],
        ["syndrome-history", "Use Repeated Syndrome Rounds", "Repeated rounds add a time dimension that helps distinguish data errors from faulty syndrome measurements.", "A single syndrome snapshot cannot generally disambiguate measurement faults from data faults."],
        ["decoder-matching", "Interpret Detection Events for Decoding", "A decoder connects syndrome changes to likely error chains using a model of edge weights and boundaries.", "Decoding output is a model-based inference, not a direct observation of the physical error path."],
        ["surface-boundaries", "Reason About Logical Boundaries", "Boundary types determine which error chains implement logical operators and which chains can terminate without detection.", "Changing geometry or boundary conditions can change the encoded logical observables."],
        ["surface-threshold", "State Surface-Code Threshold Assumptions", "Threshold claims depend on the noise model, decoder, circuit schedule, and scaling regime; finite-size behavior can differ substantially.", "Do not transfer a threshold number between incompatible noise and decoding assumptions."],
      ],
      "fault-tolerance": [
        ["code-distance", "Relate Code Distance to Correctable Errors", "A code of distance d detects up to d−1 errors and corrects up to floor((d−1)/2) arbitrary errors under the code's assumptions.", "Distance alone does not specify logical error rate without a physical noise and decoding model."],
        ["logical-error-rate", "Estimate Logical Error Suppression", "Logical error rates can fall with code distance below threshold, but the scaling law and prefactor depend on architecture and noise assumptions.", "Present logical-error estimates as conditional model outputs rather than measured guarantees."],
        ["magic-state-cost", "Include Non-Clifford State-Factory Cost", "Fault-tolerant non-Clifford operations may require distilled magic states, adding factories, routing, and runtime to logical gate cost.", "A logical T-count is an input to, not a substitute for, a factory-level resource estimate."],
        ["correction-cycle-time", "Budget Syndrome-Cycle Runtime", "Total fault-tolerant runtime depends on syndrome-cycle duration, required rounds, parallelism, and decoding latency.", "A gate-depth estimate omitting cycle time and decoder throughput can substantially understate runtime."],
        ["resource-sensitivity", "Perform Resource Sensitivity Analysis", "Vary physical error, target logical error, code distance, and factory assumptions to identify which inputs dominate the estimate.", "Report ranges and assumptions when hardware or architectural inputs are uncertain."],
      ],
    },
  },
};
