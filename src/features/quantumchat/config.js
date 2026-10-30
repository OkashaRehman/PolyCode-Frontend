/**
 * QuantumChat embedded dock config.
 * Live app: https://chat.quantumlogicslimited.com/
 *
 * The dock is a native embedded chat client (sign-in, local E2E-encryption
 * keyring, contacts, threads) talking to the QuantumChat backend API — see
 * ../api/baseUrl.js for the backend URL resolver. This file only resolves the
 * URL for the "Open full QuantumChat" escape hatch, which opens the real
 * hosted app in a new window.
 */

const DEFAULT_APP_URL = "https://chat.quantumlogicslimited.com/chat";

export function getQuantumChatAppUrl() {
  const fromEnv = (
    process.env.REACT_APP_QUANTUMCHAT_URL ||
    process.env.REACT_APP_QUANTUM_CHAT_URL ||
    ""
  ).trim();
  return fromEnv || DEFAULT_APP_URL;
}
