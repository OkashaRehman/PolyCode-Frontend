import { getApiBase } from "../../../config/apiBase";

/**
 * Run Java code via the backend /challenges/run-java endpoint.
 * The backend compiles and runs it using javac/java in a temp sandbox.
 * NOTE: the public class in the submitted code MUST be named "Solution"
 * because the backend always writes the file as Solution.java.
 */
async function runJavaOnServer(source) {
  const endpoints = ["/challenges/run-java", "/documents/run-java"];
  let lastError = null;

  for (const path of endpoints) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);

    try {
      const response = await fetch(`${getApiBase()}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: source }),
        signal: controller.signal,
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        lastError = new Error(
          payload.message || payload.error || `Java API failed (${path})`,
        );
        continue;
      }
      return payload;
    } catch (error) {
      lastError = error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError || new Error("Java API unavailable");
}

export async function runJavaCode(source) {
  const result = await runJavaOnServer(source);
  return { result, runtime: "server" };
}

export function formatJavaOutput(result = {}) {
  // If there's a compilation error in stderr, prefer showing that
  const text = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
  return text;
}

export function getJavaRuntimeError(runResult) {
  return (
    runResult?.error ||
    (runResult?.stderr && String(runResult.stderr).trim()) ||
    ""
  );
}
