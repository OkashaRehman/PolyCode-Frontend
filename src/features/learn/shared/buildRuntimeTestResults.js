/**
 * When execution fails, still score acceptance tests from static code checks.
 */
export function buildRuntimeFailureResults(
  challenge,
  code,
  solutionCode,
  testPasses,
  {
    runtimeLabel = "Runs without errors",
    runtimeHint = "Fix the error in Output, then run again.",
  } = {},
) {
  const staticResults = challenge.tests.map((test) => ({
    ...test,
    passed: testPasses(test, code, solutionCode),
  }));

  return {
    passed: false,
    tests: [
      {
        id: "runtime",
        label: runtimeLabel,
        passed: false,
        hint: runtimeHint,
      },
      ...staticResults,
    ],
  };
}
