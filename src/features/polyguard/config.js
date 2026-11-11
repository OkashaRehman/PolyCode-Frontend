import { getApiBase } from "../../config/apiBase";

const DEFAULT_POLYGUARD_API_URL =
  "https://muhammadsaadamin-polyguard-api.hf.space";

function normalizeBase(url = "") {
  return String(url).trim().replace(/\/+$/, "");
}

/** ML augment on unless explicitly disabled */
export function isPolyGuardRemoteEnabled() {
  const flag = process.env.REACT_APP_POLYGUARD_REMOTE_AUGMENT;
  if (flag === "false" || flag === "0") return false;
  return true;
}

export function getPolyGuardApiBaseUrl() {
  return normalizeBase(
    process.env.REACT_APP_POLYGUARD_API_URL || DEFAULT_POLYGUARD_API_URL,
  );
}

/** Prefer backend proxy (reliable); falls back to direct HF Space URL */
export function getPolyGuardAnalyzeUrl() {
  const apiBase = getApiBase();
  if (apiBase) {
    return `${apiBase}/polyguard/analyze-ml`;
  }
  return `${getPolyGuardApiBaseUrl()}/analyze`;
}

export function getPolyGuardAnalysisModeLabel(mode, fallback = false) {
  if (mode === "code-coach") return "Code coach";
  if (mode === "hybrid-ml") {
    return fallback
      ? "Rules + ML (fallback)"
      : "Security scan + rules";
  }
  return "Local rules only";
}
