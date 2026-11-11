import { executeCode } from "../../playground/services/BrowserExecutor";
import { getApiBase } from "../../../config/apiBase";
import {
  mergePythonRunResult,
  codeUsesMatplotlib,
} from "./pythonPlotOutput";
import { codeUsesTorch } from "./torchBrowserShim";
import { codeUsesTransformers } from "./transformersBrowserShim";

// Each hop must be bounded, otherwise a slow API or a stalled Pyodide download
// leaves the challenge stuck on "Running…" with no result.
const SERVER_TIMEOUT_MS = 15000;
const BROWSER_TIMEOUT_MS = 90000;
const BROWSER_SCIPY_TIMEOUT_MS = 270000;

function withTimeout(promise, ms, message) {
  let timer = null;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export function codeUsesScipy(source = "") {
  return /(?:^|\n)\s*(?:import|from)\s+scipy\b/m.test(source);
}

function serverHasNoPythonRuntime(message = "") {
  return /No Python runtime found on server/i.test(String(message || ""));
}

function friendlyPythonRuntimeMessage(message = "", { usesScipy = false } = {}) {
  const text = String(message || "");
  if (serverHasNoPythonRuntime(text)) {
    return usesScipy
      ? "The hosted backend has no Python runtime, so SciPy runs in your browser (Pyodide). The SciPy download is large — wait for it to finish, then try Run again."
      : "The hosted backend has no Python runtime. Python will run in your browser instead (Pyodide).";
  }
  if (/Unexpected token\s*['"]?</i.test(text) || /received HTML/i.test(text)) {
    return usesScipy
      ? "Could not load SciPy in the browser (a download returned a web page instead of a package). Check your network and try again."
      : "Could not load the in-browser Python runtime (received a web page instead of a script/package). Check your network.";
  }
  if (/ModuleNotFoundError:\s*No module named ['"]scipy['"]/i.test(text)) {
    return "SciPy is not available on the server Python. SciPy lessons use the in-browser runtime — try Run again and wait for the package download.";
  }
  if (/Timed out downloading the 'scipy' package/i.test(text)) {
    return "SciPy is still downloading in your browser (it is a large package). Wait a bit and press Run again — the download continues in the background.";
  }
  return text;
}

async function readJsonResponse(response) {
  const text = await response.text();
  const trimmed = text.trim();
  if (!trimmed) return {};
  if (trimmed.startsWith("<")) {
    throw new Error(
      "Server returned HTML instead of JSON. The Python API may be unavailable.",
    );
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    throw new Error("Python API returned invalid JSON.");
  }
}

async function runPythonOnServer(source) {
  const endpoints = ["/challenges/run-python", "/documents/run-python"];
  let lastError = null;

  for (const path of endpoints) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SERVER_TIMEOUT_MS);

    try {
      const response = await fetch(`${getApiBase()}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: source }),
        signal: controller.signal,
      });

      const payload = await readJsonResponse(response);
      if (!response.ok) {
        lastError = new Error(
          payload.message || payload.error || `Python API failed (${path})`,
        );
        continue;
      }
      return mergePythonRunResult(payload);
    } catch (error) {
      if (error?.name === "AbortError") {
        clearTimeout(timeout);
        throw new Error(
          `Python API timed out after ${SERVER_TIMEOUT_MS / 1000}s.`,
        );
      }
      lastError = error;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError || new Error("Python API unavailable");
}

async function runPythonInBrowser(source) {
  const usesScipy = codeUsesScipy(source);
  const timeoutMs = usesScipy ? BROWSER_SCIPY_TIMEOUT_MS : BROWSER_TIMEOUT_MS;
  try {
    const result = await withTimeout(
      executeCode(source, "python"),
      timeoutMs,
      usesScipy
        ? "SciPy is still loading in the browser. Wait a moment and press Run again — the download continues in the background."
        : "The in-browser Python runtime did not respond in time. Check your connection and run again.",
    );
    return mergePythonRunResult(result);
  } catch (error) {
    throw new Error(
      friendlyPythonRuntimeMessage(error?.message || String(error), {
        usesScipy,
      }),
    );
  }
}

async function runPythonWithServerFirst(source) {
  const usesScipy = codeUsesScipy(source);
  try {
    const result = await runPythonOnServer(source);
    const runtimeError = getPythonRuntimeError(result);
    if (runtimeError) {
      throw new Error(runtimeError);
    }
    return { result, runtime: "server" };
  } catch (serverError) {
    const serverMessage = friendlyPythonRuntimeMessage(
      serverError?.message || String(serverError),
      { usesScipy },
    );

    // Missing server SciPy with a real Python host: prefer a clear install hint
    // over a huge Pyodide download that may fail.
    if (
      usesScipy &&
      /No module named ['"]scipy['"]/i.test(serverError?.message || "") &&
      !serverHasNoPythonRuntime(serverError?.message || "")
    ) {
      throw new Error(serverMessage);
    }

    try {
      const browserResult = await runPythonInBrowser(source);
      const browserError = getPythonRuntimeError(browserResult);
      if (browserError) {
        throw new Error(
          friendlyPythonRuntimeMessage(browserError, { usesScipy }),
        );
      }
      return { result: browserResult, runtime: "browser" };
    } catch (browserError) {
      throw new Error(
        friendlyPythonRuntimeMessage(
          browserError.message || serverMessage,
          { usesScipy },
        ) ||
          "Could not run Python. Check your network for the in-browser runtime (Pyodide).",
      );
    }
  }
}

async function runPythonWithBrowserFirst(source) {
  const usesScipy = codeUsesScipy(source);
  try {
    return { result: await runPythonInBrowser(source), runtime: "browser" };
  } catch (browserError) {
    // Hosted Vercel backend has no Python — don't waste time retrying the API
    // when the browser path already failed for SciPy/matplotlib/torch.
    if (usesScipy || codeUsesMatplotlib(source) || codeUsesTorch(source)) {
      try {
        const result = await runPythonOnServer(source);
        const runtimeError = getPythonRuntimeError(result);
        if (runtimeError) {
          if (serverHasNoPythonRuntime(runtimeError)) {
            throw new Error(browserError.message);
          }
          throw new Error(runtimeError);
        }
        return { result, runtime: "server" };
      } catch (serverError) {
        throw new Error(
          friendlyPythonRuntimeMessage(
            browserError.message || serverError.message,
            { usesScipy },
          ) ||
            "Could not run Python in the browser. Check your network and try again.",
        );
      }
    }

    try {
      const result = await runPythonOnServer(source);
      const runtimeError = getPythonRuntimeError(result);
      if (runtimeError) {
        throw new Error(runtimeError);
      }
      return { result, runtime: "server" };
    } catch (serverError) {
      throw new Error(
        friendlyPythonRuntimeMessage(
          browserError.message || serverError.message,
          { usesScipy },
        ) ||
          "Could not run Python. Matplotlib needs the in-browser runtime (Pyodide) or matplotlib installed on the server.",
      );
    }
  }
}

export async function runPythonCode(source) {
  // Torch and transformers aren't on the server or real Pyodide wheels — use
  // browser teaching shims. Matplotlib + SciPy: production Vercel backend has
  // no Python, so prefer Pyodide.
  if (
    codeUsesTorch(source) ||
    codeUsesTransformers(source) ||
    codeUsesMatplotlib(source) ||
    codeUsesScipy(source)
  ) {
    return runPythonWithBrowserFirst(source);
  }
  return runPythonWithServerFirst(source);
}

export function formatPythonOutput(result = {}) {
  return [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
}

export function getPythonRuntimeError(runResult) {
  return (
    runResult?.error ||
    (runResult?.exitCode != null && runResult.exitCode !== 0
      ? runResult.stderr || "Python exited with an error"
      : "")
  );
}
