import { apiFetch, networkErrorMessage } from "../../../lib/apiClient";

const FLUTTER_UI_NOTE =
  "This is a Flutter app — it draws a screen instead of printing text, so it cannot run here.\n\n" +
  "To see it: create a project with `flutter create my_app`, paste this into lib/main.dart, " +
  "then run `flutter run` (emulator, phone, or Chrome). You can also paste it into dartpad.dev.";

const PACKAGES_NOTE =
  "This example uses packages from pub.dev (see the `import 'package:…'` lines), so it only runs inside a Flutter project.\n\n" +
  "Add the packages with `flutter pub add <name>`, then call this code from your app.";

const NO_MAIN_NOTE =
  "Compiled with no errors. This example only defines classes and functions (there is no main()), so there is nothing to print.";

function usesFlutter(source = "") {
  return /import\s+['"]package:flutter\//.test(source);
}

/** Any pub.dev package import (dart:io, dart:convert, … are fine). */
function usesPackages(source = "") {
  return /import\s+['"]package:/.test(source);
}

function hasMain(source = "") {
  return /\bmain\s*\(/.test(source);
}

/**
 * Run plain Dart on the backend (POST /api/challenges/run-dart).
 * Flutter widget code and pub.dev packages need a real Flutter project, so
 * those return a short explanation instead of a confusing compiler error.
 */
export async function runDartCode(source) {
  if (usesFlutter(source)) {
    return { result: { stdout: FLUTTER_UI_NOTE }, runtime: "info" };
  }
  if (usesPackages(source)) {
    return { result: { stdout: PACKAGES_NOTE }, runtime: "info" };
  }

  const definesOnly = !hasMain(source);
  const code = definesOnly ? `${source}\n\nvoid main() {}\n` : source;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  try {
    const result = await apiFetch("/challenges/run-dart", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ code }),
      signal: controller.signal,
      fallbackMessage: "Dart runner API failed",
    });
    if (definesOnly && !getDartRuntimeError(result) && !result.stdout) {
      return { result: { ...result, stdout: NO_MAIN_NOTE }, runtime: "server" };
    }
    return { result, runtime: "server" };
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Dart run timed out. Try shorter code.");
    }
    throw new Error(networkErrorMessage(error));
  } finally {
    clearTimeout(timeout);
  }
}

export function formatDartOutput(result = {}) {
  return [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
}

export function getDartRuntimeError(runResult) {
  return (
    runResult?.error ||
    (runResult?.exitCode != null && runResult.exitCode !== 0
      ? runResult.stderr || `Dart exited with code ${runResult.exitCode}`
      : "")
  );
}
