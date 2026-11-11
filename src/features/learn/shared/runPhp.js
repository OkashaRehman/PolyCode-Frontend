/**
 * PolyCode — Client-Side PHP Runtime (WebAssembly)
 * Executes PHP completely in the browser using the php-wasm project.
 * No servers, no APIs, no rate limits!
 */

let PhpWebModule = null;

/**
 * Fetches the PHP WebAssembly engine module.
 * Called once to cache the library in memory.
 */
export async function initPhpVM() {
  if (PhpWebModule) return;
  
  try {
    // Import the ESM module from jsDelivr CDN
    const imported = await import("https://cdn.jsdelivr.net/npm/php-wasm/PhpWeb.mjs");
    PhpWebModule = imported.PhpWeb;
    
    console.log("🐘 PolyCode PHP WASM Engine loaded successfully!");
  } catch (error) {
    console.error("Failed to start the PHP Engine in initPhpVM:", error);
    // Rethrow so the caller knows the initialization failed
    throw error;
  }
}

/**
 * Executes PHP code inside an isolated WebAssembly sandbox.
 */
export async function runPhpCode(code) {
  try {
    // Attempt to load the VM if it isn't ready
    if (!PhpWebModule) {
      await initPhpVM();
    }
    
    // Fallback safety check
    if (!PhpWebModule) {
      throw new Error("PHP WebAssembly environment was not initialized.");
    }

    // Create a fresh PHP sandbox for this specific run.
    // This ensures variables, functions, and classes from the last run don't bleed over.
    const php = new PhpWebModule();
    
    let stdoutBuffer = "";
    let stderrBuffer = "";

    // Capture standard output (echo, print, var_dump, etc.)
    php.addEventListener('output', (event) => {
      const out = Array.isArray(event.detail) ? event.detail.join('') : String(event.detail);
      stdoutBuffer += out;
    });

    // Capture runtime errors or warnings
    php.addEventListener('error', (event) => {
      const err = Array.isArray(event.detail) ? event.detail.join('') : String(event.detail);
      stderrBuffer += err;
    });

    // PHP requires the <?php opening tag to execute code.
    // If the student didn't write it, we inject it automatically to prevent silent failures.
    let executeCode = code;
    if (!executeCode.trim().startsWith("<?php")) {
      executeCode = "<?php\n" + code;
    }

    // Run the code!
    const exitCode = await php.run(executeCode);

    return {
      result: {
        stdout: stdoutBuffer.trim(),
        stderr: stderrBuffer.trim(),
        code: exitCode || 0
      }
    };
    
  } catch (err) {
    return {
      result: {
        stdout: "",
        stderr: `Initialization/Syntax Error: ${err.message}`,
        code: 1
      }
    };
  }
}

export function formatPhpOutput(result) {
  if (!result) return "";
  return [result.stdout, result.stderr].filter(Boolean).join("\n\n");
}

export function getPhpRuntimeError(result) {
  if (!result) return "Unknown execution error.";
  
  if (result.code !== 0 || result.stderr) {
    return result.stderr.trim() || `Process exited with code ${result.code}.`;
  }
  
  return null;
}