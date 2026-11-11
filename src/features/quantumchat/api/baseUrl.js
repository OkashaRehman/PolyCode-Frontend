/**
 * Same-origin path that forwards to the QuantumChat backend:
 * - dev: CRA setupProxy.js
 * - prod: the `/qc-api` rewrite in vercel.json
 * Calling the backend directly from the browser is blocked by CORS because
 * its allowlist does not include this site's origin.
 */
const PROXY_BASE = "/qc-api";

export function getApiBaseUrl() {
  const configured = String(process.env.REACT_APP_QUANTUMCHAT_API_URL || "")
    .trim()
    .replace(/\/$/, "");
  // Allow overriding with another same-origin path; absolute URLs are only
  // used as the proxy target (setupProxy.js / vercel.json), never fetched directly.
  if (configured.startsWith("/")) return configured;
  return PROXY_BASE;
}

export function getApiUrl() {
  return `${getApiBaseUrl()}/api`;
}
