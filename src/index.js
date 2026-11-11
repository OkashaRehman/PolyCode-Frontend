import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QuantumChatAuthProvider } from "./features/quantumchat/context/QuantumChatAuthContext";
import "./index.css";

const resizeObserverLoopMessages = [
  "ResizeObserver loop completed with undelivered notifications.",
  "ResizeObserver loop limit exceeded",
];

function isHtmlAsScriptSyntaxError(event) {
  // Pyodide/CDN sometimes returns an HTML error page for a .js URL. The browser
  // then reports: SyntaxError: Unexpected token '<'.
  const message = event?.message || "";
  if (!/Unexpected token\s*['"]?</i.test(message)) return false;
  const target = event.target;
  if (!target || typeof target.tagName !== "string") return true;
  const tag = target.tagName.toUpperCase();
  return tag === "SCRIPT" || tag === "LINK" || !event.filename;
}

function isBenignResourceError(event) {
  // Script/link load failures are ErrorEvents with an empty message. CRA's
  // overlay then prints "[object Event]" and blocks the UI even though the app
  // can recover (Monaco CDN, chunk retries, etc.).
  if (!event) return false;
  if (resizeObserverLoopMessages.includes(event.message)) return true;
  if (isHtmlAsScriptSyntaxError(event)) return true;
  if (event.message && event.message !== "[object Event]") return false;
  const target = event.target;
  if (!target || typeof target.tagName !== "string") return false;
  const tag = target.tagName.toUpperCase();
  return tag === "SCRIPT" || tag === "LINK" || tag === "IMG";
}

window.addEventListener(
  "error",
  (event) => {
    if (isBenignResourceError(event)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const src = event.target?.src || event.target?.href;
      if (src) {
        console.warn("Resource failed to load:", src);
      }
    }
  },
  true,
);

window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  const message = reason?.message || String(reason || "");
  if (
    resizeObserverLoopMessages.includes(message) ||
    reason instanceof Event ||
    message === "[object Event]" ||
    /Unexpected token\s*['"]?</i.test(message)
  ) {
    event.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuantumChatAuthProvider>
      <App />
    </QuantumChatAuthProvider>
  </React.StrictMode>,
);
