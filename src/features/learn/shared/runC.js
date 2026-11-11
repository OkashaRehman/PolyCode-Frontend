import { apiFetch, networkErrorMessage } from "../../../lib/apiClient";

/**
 * Compile and run C on the backend (POST /api/challenges/run-c, gcc).
 * No browser fallback: the browser only simulates print lines, and C
 * challenges are graded on real program output.
 */
export async function runCCode(source, stdin = "") {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  try {
    return await apiFetch("/challenges/run-c", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ code: source, stdin }),
      signal: controller.signal,
      fallbackMessage: "C compiler API failed",
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("C compile timed out. Try shorter code.");
    }
    throw new Error(networkErrorMessage(error));
  } finally {
    clearTimeout(timeout);
  }
}

export function formatCOutput(result = {}) {
  return [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
}

export function getCRuntimeError(runResult) {
  return (
    runResult?.error ||
    (runResult?.exitCode != null && runResult.exitCode !== 0
      ? runResult.stderr || `Program exited with code ${runResult.exitCode}`
      : "")
  );
}
