import { executeCode } from "../../playground/services/BrowserExecutor";
import {
  needsDomRuntime,
  runJavaScriptWithDom,
} from "./runDomJavaScript";

export async function runJavaScriptCode(source) {
  if (needsDomRuntime(source)) {
    const result = await runJavaScriptWithDom(source);
    return { result, runtime: "dom" };
  }

  const result = await executeCode(source, "javascript");
  return { result, runtime: "browser" };
}

export function formatJavaScriptOutput(result = {}) {
  return [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
}

export function getJavaScriptRuntimeError(runResult) {
  return (
    runResult?.error ||
    (runResult?.stderr && String(runResult.stderr).trim()) ||
    ""
  );
}
