/**
 * Utility for executing Go code directly from the browser.
 * This leverages the Official Go Playground API (play.golang.org), 
 * which natively supports CORS and requires no backend setup.
 */

const GO_PLAYGROUND_URL = "https://play.golang.org/compile";

/**
 * Sends the Go code to the Official Go Playground execution server.
 * @param {string} code - The Go source code to run
 * @returns {Promise<{result: object}>} The execution payload
 */
export async function runGoCode(code) {
  try {
    const response = await fetch(GO_PLAYGROUND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // The Go Playground API expects form-urlencoded data with version=2
      body: `version=2&body=${encodeURIComponent(code)}`,
    });

    if (!response.ok) {
      throw new Error("Failed to reach the Go Playground server.");
    }

    const data = await response.json();
    return { result: data };
  } catch (error) {
    throw new Error(error.message || "Network error while running Go code.");
  }
}

/**
 * Parses the execution result to find Go compilation errors or runtime panics.
 * The Go Playground API returns a top-level "Errors" string if compilation fails.
 * @param {object} result - The raw payload from the execution engine
 * @returns {string|null} The error message, or null if execution was successful
 */
export function getGoRuntimeError(result) {
  if (!result) return "Unknown execution error.";

  // 1. Check for Compilation Errors (e.g., unused variables, syntax errors)
  // The Playground returns these as a single string under result.Errors
  if (result.Errors && result.Errors.trim() !== "") {
    return cleanGoErrorOutput(result.Errors);
  }

  // 2. Check for Runtime Panics (e.g., index out of bounds)
    // The Playground also uses stderr for normal log output, so only treat
    // panic-shaped stderr as a failed run.
  if (result.Events && Array.isArray(result.Events)) {
    const stderrEvents = result.Events.filter((e) => e.Kind === "stderr");
    if (stderrEvents.length > 0) {
      const panicText = stderrEvents.map((e) => e.Message).join("");
        if (/panic:|fatal error:|runtime error:/i.test(panicText)) {
          return cleanGoErrorOutput(panicText);
        }
    }
  }

  return null; // No errors
}

/**
 * Formats the successful standard output of the Go program.
 * The Go Playground returns an array of "Events", which we map and join.
 * @param {object} result - The raw payload from the execution engine
 * @returns {string} The standard output text
 */
export function formatGoOutput(result) {
  if (!result || !result.Events || !Array.isArray(result.Events)) {
    return "";
  }
  
  // Filter for stdout events and combine their messages
    // Include stderr because Go's standard logger writes there. Runtime panic
    // text is removed by getGoRuntimeError before this formatter is called.
    const outputEvents = result.Events.filter(
      (e) => e.Kind === "stdout" || e.Kind === "stderr",
    );
  const outputString = outputEvents.map((e) => e.Message).join("");
  
  // Return the combined output, stripping trailing newlines for clean UI matching
  return outputString.trim();
}

/**
 * Helper function to clean up raw server file paths from Go compiler errors.
 * The Go Playground compiles code inside a dummy file called "prog.go".
 * This changes "prog.go:14:2: undefined: x" to a cleaner "main.go:14:2: undefined: x"
 */
function cleanGoErrorOutput(stderr) {
  if (!stderr) return "";
  
  // Replace the Playground's internal filename with our virtual filename
  let cleaned = stderr.replace(/prog\.go:/g, "main.go:");
  
  return cleaned.trim();
}