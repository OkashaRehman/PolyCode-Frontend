/**
 * PolyCode — runRust.js
 * Utility for executing Rust code directly from the browser.
 * Leverages the official Rust Playground API with native CORS support.
 */

const RUST_PLAYGROUND_URL = "https://play.rust-lang.org/execute";

/**
 * Sends the Rust source code to the official Rust Playground engine for compilation.
 * @param {string} code - The Rust source code from the editor
 * @returns {Promise<{result: object}>} The normalized execution payload
 */
export async function runRustCode(code) {
  try {
    const response = await fetch(RUST_PLAYGROUND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "stable",
        mode: "debug",
        edition: "2021",
        crateType: "bin",
        tests: false,
        code: code,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to reach the Rust Playground server.");
    }

    const data = await response.json();
    // The Rust Playground API returns a shape of: { success: true/false, stdout: "...", stderr: "..." }
    return { result: data };
  } catch (error) {
    throw new Error(error.message || "Network error while running Rust code.");
  }
}

/**
 * Formats the successful standard output of the Rust program.
 * @param {object} payload - The raw wrapper layout returned by runRustCode
 * @returns {string} The trimmed standard output text
 */
export function formatRustOutput(payload) {
  if (!payload || !payload.result) return "";
  return (payload.result.stdout || "").trim();
}

/**
 * Parses the execution payload to find hard Rust compilation failures or runtime panics.
 * @param {object} payload - The raw wrapper layout returned by runRustCode
 * @returns {string|null} The clean diagnostic text error, or null if execution passed safely
 */
export function getRustRuntimeError(payload) {
  if (!payload || !payload.result) return "Unknown execution error.";
  
  const { success, stderr } = payload.result;

  // The Rust playground routes linting warnings, compiler failures, and panic dumps all through stderr.
  // We only intercept it as a blocking runtime error if the execution flag is explicitly marked false.
  if (success === false && stderr && stderr.trim() !== "") {
    return cleanRustErrorOutput(stderr);
  }

  return null; // Compilation and run completed cleanly
}

/**
 * Helper function to clean up raw server file headers from Rust compiler diagnostics.
 * Simplifies localized string paths to provide a clean virtual directory interface.
 */
function cleanRustErrorOutput(stderr) {
  if (!stderr) return "";
  
  // You can add regex replacements here if you ever want to strip playground-specific line markers
  return stderr.trim();
}