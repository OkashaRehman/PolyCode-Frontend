import { getApiBase } from "../../../config/apiBase";

const SERVER_TIMEOUT_MS = 15000;

async function readJsonResponse(response) {
  const text = await response.text();
  if (!text.trim()) {
    if (response.status === 404) {
      throw new Error(
        "The PowerShell execution endpoint is not deployed. Deploy the backend with PowerShell execution enabled.",
      );
    }
    if (!response.ok) {
      throw new Error(
        `PowerShell API returned an empty response (HTTP ${response.status}).`,
      );
    }
    return {};
  }
  try {
    return JSON.parse(text);
  } catch {
    if (response.status === 404) {
      throw new Error(
        "The PowerShell execution endpoint is not deployed. Deploy the backend with PowerShell execution enabled.",
      );
    }
    throw new Error(
      `PowerShell API returned a non-JSON response (HTTP ${response.status}).`,
    );
  }
}

export async function runPowerShellCode(source, token) {
  if (!token) {
    throw new Error("Sign in to run PowerShell examples.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SERVER_TIMEOUT_MS);
  try {
    const response = await fetch(`${getApiBase()}/challenges/run-powershell`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: source }),
      signal: controller.signal,
    });
    const payload = await readJsonResponse(response);
    if (!response.ok) {
      throw new Error(
        payload.message || payload.error || "PowerShell execution failed.",
      );
    }
    return { result: payload, runtime: "server" };
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("PowerShell execution timed out. Try shorter code.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export function formatPowerShellOutput(result = {}) {
  return [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
}

export function getPowerShellRuntimeError(result = {}) {
  return (
    result.error ||
    (result.exitCode != null && result.exitCode !== 0
      ? result.stderr || "PowerShell execution failed."
      : "")
  );
}
