// Messages written while offline wait here until they can be sent.
//
// The queue lives in memory only — nothing is written to localStorage, so a
// reload or closed tab drops unsent messages (the dock warns before unload).
// Only the already-sealed payload is kept ({ to, forRecipient, forSender }),
// never plaintext. The dock shows the text again by decrypting `forSender`
// with the user's own key. Each entry keeps its `clientMessageId`, which the
// backend uses to ignore duplicates, so retrying after a lost response can't
// double-send.

const queues = new Map();

// Earlier builds persisted the queue under this prefix; remove any leftovers.
const LEGACY_PREFIX = "polycode_qc_outbox_";
try {
  for (let i = localStorage.length - 1; i >= 0; i -= 1) {
    const key = localStorage.key(i);
    if (key && key.startsWith(LEGACY_PREFIX)) localStorage.removeItem(key);
  }
} catch {
  // Storage blocked — nothing to clean up.
}

export function readOutbox(userId) {
  if (!userId) return [];
  return [...(queues.get(String(userId)) || [])];
}

function writeOutbox(userId, entries) {
  if (entries.length) queues.set(String(userId), entries);
  else queues.delete(String(userId));
}

export function addToOutbox(userId, entry) {
  const entries = readOutbox(userId).filter((e) => e.clientMessageId !== entry.clientMessageId);
  writeOutbox(userId, [...entries, entry]);
}

export function removeFromOutbox(userId, clientMessageId) {
  writeOutbox(
    userId,
    readOutbox(userId).filter((e) => e.clientMessageId !== clientMessageId),
  );
}

export function hasPendingOutbox(userId) {
  return readOutbox(userId).length > 0;
}

export function newClientMessageId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `qc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}
