import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  LogOut,
  MoreHorizontal,
  Send,
  WifiOff,
} from "lucide-react";
import { useQuantumChatAuth } from "../context/QuantumChatAuthContext";
import {
  downloadKeyFile,
  formatKeyFile,
  parseKeyFile,
} from "../crypto/keyFile";
import { KEY_SET_SIZE } from "../crypto/keys";
import {
  decryptMessage,
  fetchConversation,
  fetchAllDiscoverUsers,
  fetchFriends,
  fetchUser,
  isNetworkError,
  markPeerConversationRead,
  postSealedMessage,
  sealDirectMessage,
  syncInbox,
} from "../services/chatService";
import useOnlineStatus from "../hooks/useOnlineStatus";
import {
  addToOutbox,
  hasPendingOutbox,
  newClientMessageId,
  readOutbox,
  removeFromOutbox,
} from "../utils/outbox";
import {
  conversationKeyForUser,
  getConversationActivity,
  getTotalUnread,
  getUnreadCount,
  incrementUnreadCount,
  markConversationRead,
  setConversationActivity,
} from "../utils/readState";
import { getQuantumChatAppUrl } from "../config";
import "../quantumchat-dock.css";

function getInitials(name) {
  const trimmed = name?.trim();
  if (!trimmed) return "Q";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function formatMessageTime(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const now = new Date();
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  if (sameDay) {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function previewFromMessage(raw, myUserId) {
  const decrypted = decryptMessage(raw, myUserId);
  if (decrypted.text) {
    const text = String(decrypted.text).replace(/\s+/g, " ").trim();
    return text.length > 64 ? `${text.slice(0, 64)}…` : text;
  }
  if (raw.attachment) return "Attachment";
  return "New message";
}

const OUTBOX_RETRY_MS = 15000;

/** A queued (not yet sent) message, shown in the thread with a clock. */
function pendingBubble(entry, myUserId) {
  const decrypted = decryptMessage(
    { from: myUserId, to: entry.to, forSender: entry.forSender },
    myUserId,
  );
  return {
    id: `pending-${entry.clientMessageId}`,
    clientMessageId: entry.clientMessageId,
    from: myUserId,
    to: entry.to,
    text: decrypted.text,
    createdAt: entry.queuedAt,
    pending: entry.failed ? "failed" : "waiting",
  };
}

/** Plain-language text for a failed request. */
function friendlyError(err, fallback) {
  if (isNetworkError(err)) {
    return typeof navigator !== "undefined" && navigator.onLine === false
      ? "You're offline."
      : "Can't reach QuantumChat right now.";
  }
  return err?.response?.data?.error || err?.message || fallback;
}

function AuthPanel({ mode, onSwitchMode }) {
  const { login, register, verify2fa } = useQuantumChatAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pending2fa, setPending2fa] = useState(null);
  const [totpCode, setTotpCode] = useState("");
  const [freshKeySet, setFreshKeySet] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (pending2fa) {
        if (!/^\d{6}$/.test(totpCode.trim())) {
          setError("Enter the 6-digit authenticator code.");
          return;
        }
        await verify2fa({
          tempToken: pending2fa.tempToken,
          token: totpCode.trim(),
          rememberMe: pending2fa.rememberMe !== false,
        });
        setPending2fa(null);
        return;
      }

      if (mode === "signup") {
        if (!form.username.trim() || !form.email.trim() || form.password.length < 8) {
          setError("Username, email, and password (8+ chars) are required.");
          return;
        }
        const result = await register({
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
        });
        setFreshKeySet(result.keySet);
        return;
      }

      const result = await login({
        email: form.email.trim(),
        password: form.password,
        rememberMe: true,
      });
      if (result?.requires2fa) {
        setPending2fa({
          tempToken: result.tempToken,
          rememberMe: result.rememberMe !== false,
        });
        setTotpCode("");
      }
    } catch (err) {
      const isNetwork =
        err.code === "ERR_NETWORK" || err.message === "Network Error";
      setError(
        isNetwork
          ? "Cannot reach QuantumChat (network/CORS). Try again in a moment."
          : err.response?.data?.error || err.message || "Request failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (freshKeySet) {
    const secretKeys = freshKeySet.map((k) => k.secretKey);
    return (
      <div className="quantum-chat-fallback">
        <p className="quantum-chat-fallback__title">Save your keys</p>
        <p className="quantum-chat-fallback__text">
          Download <code>keys.txt</code> now. You need this file to read chats on
          other devices. Anyone with it can read your messages.
        </p>
        <div className="quantum-chat-fallback__actions">
          <button
            type="button"
            className="quantum-chat-fallback__btn quantum-chat-fallback__btn--primary"
            onClick={() => {
              const content = formatKeyFile({
                username: form.username.trim(),
                email: form.email.trim(),
                secretKeys,
              });
              downloadKeyFile(content);
            }}
          >
            <Download size={14} style={{ marginRight: 6 }} />
            Download keys.txt
          </button>
          <button
            type="button"
            className="quantum-chat-fallback__btn"
            onClick={() => setFreshKeySet(null)}
          >
            Continue to chats
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="qc-auth-form" onSubmit={handleSubmit}>
      <p className="qc-auth-form__lead">
        {pending2fa
          ? "Enter your authenticator code"
          : mode === "signup"
            ? "Create a QuantumChat account"
            : "Sign in to decrypt your conversations"}
      </p>

      {!pending2fa && mode === "signup" && (
        <label className="qc-field">
          Username
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            autoComplete="username"
            required
          />
        </label>
      )}

      {!pending2fa && (
        <>
          <label className="qc-field">
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
              required
            />
          </label>
          <label className="qc-field">
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              required
              minLength={mode === "signup" ? 8 : undefined}
            />
          </label>
        </>
      )}

      {pending2fa && (
        <label className="qc-field">
          Authenticator code
          <input
            value={totpCode}
            onChange={(e) =>
              setTotpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            autoComplete="one-time-code"
            autoFocus
            required
          />
        </label>
      )}

      {error && <p className="qc-auth-form__error">{error}</p>}

      <button type="submit" className="qc-auth-form__submit" disabled={loading}>
        {loading
          ? "Please wait…"
          : pending2fa
            ? "Verify"
            : mode === "signup"
              ? "Create account"
              : "Sign in"}
      </button>

      {!pending2fa && (
        <button
          type="button"
          className="qc-auth-form__switch"
          onClick={() => onSwitchMode(mode === "signup" ? "signin" : "signup")}
        >
          {mode === "signup"
            ? "Already have an account? Sign in"
            : "New here? Create an account"}
        </button>
      )}
    </form>
  );
}

function KeyGatePanel() {
  const { user, importKeys, regenerateKeys } = useQuantumChatAuth();
  const fileRef = useRef(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const text = await file.text();
      const secretKeys = parseKeyFile(text);
      if (secretKeys.length < KEY_SET_SIZE) {
        throw new Error(
          `Found ${secretKeys.length} keys — need ${KEY_SET_SIZE} in keys.txt.`,
        );
      }
      await importKeys(secretKeys.slice(0, KEY_SET_SIZE));
    } catch (err) {
      setError(err.message || "Could not import keys.");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };

  const onRegenerate = async () => {
    const ok = window.confirm(
      "Generate new keys? Old messages encrypted with your previous keys will become unreadable.",
    );
    if (!ok) return;
    setError("");
    setBusy(true);
    try {
      const { keySet } = await regenerateKeys();
      const content = formatKeyFile({
        username: user.username || "user",
        email: user.email || "",
        secretKeys: keySet.map((k) => k.secretKey),
      });
      downloadKeyFile(content);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Could not regenerate keys.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="quantum-chat-fallback">
      <p className="quantum-chat-fallback__title">Import your keys</p>
      <p className="quantum-chat-fallback__text">
        Signed in as <strong>{user?.email || user?.username}</strong>. Upload your{" "}
        <code>keys.txt</code> to decrypt chats on this device.
      </p>
      {error && <p className="qc-auth-form__error">{error}</p>}
      <div className="quantum-chat-fallback__actions">
        <button
          type="button"
          className="quantum-chat-fallback__btn quantum-chat-fallback__btn--primary"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
        >
          Import keys.txt
        </button>
        <button
          type="button"
          className="quantum-chat-fallback__btn"
          disabled={busy}
          onClick={onRegenerate}
        >
          Generate new keys
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept=".txt,text/plain"
        hidden
        onChange={onFile}
      />
    </div>
  );
}

function ChatReadyPanel({ onUnreadChange }) {
  const { user } = useQuantumChatAuth();
  const [friends, setFriends] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [inboxPeers, setInboxPeers] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [listError, setListError] = useState("");
  const [threadError, setThreadError] = useState("");
  const [threadLoadFailed, setThreadLoadFailed] = useState(false);
  const online = useOnlineStatus();
  const flushingRef = useRef(false);
  const listLoadedRef = useRef(false);
  const [peer, setPeer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [picking, setPicking] = useState(false);
  const [query, setQuery] = useState("");
  const [inboxTick, setInboxTick] = useState(0);
  const bottomRef = useRef(null);
  const peerIdRef = useRef(null);
  const syncCursorRef = useRef(null);
  const knownIdsRef = useRef(new Set());

  const bumpInbox = useCallback(() => {
    setInboxTick((n) => n + 1);
  }, []);

  const loadLists = useCallback(async () => {
    setLoadingList(true);
    setListError("");
    try {
      const [friendRows, discoverRows] = await Promise.all([
        fetchFriends(),
        fetchAllDiscoverUsers(),
      ]);
      setFriends(Array.isArray(friendRows) ? friendRows : []);
      setDiscover(Array.isArray(discoverRows) ? discoverRows : []);
      listLoadedRef.current = true;
    } catch (err) {
      // Keep whatever list we already have; being offline is shown by the banner.
      setListError(
        isNetworkError(err)
          ? "Couldn't load your contacts. They'll refresh when you're back online."
          : friendlyError(err, "Could not load contacts."),
      );
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    loadLists();
  }, [loadLists]);

  // Back online: refresh the contact list if the first load failed.
  useEffect(() => {
    if (online && !listLoadedRef.current) loadLists();
  }, [online, loadLists]);

  // Server-side discover search so people outside the first local page are findable.
  useEffect(() => {
    const q = query.trim();
    if (!q) return undefined;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const rows = await fetchAllDiscoverUsers(q);
        if (cancelled) return;
        setDiscover((prev) => {
          const map = new Map(prev.map((p) => [String(p.id || p._id), p]));
          rows.forEach((p) => {
            const id = String(p.id || p._id);
            if (id) map.set(id, { ...p, id });
          });
          return [...map.values()];
        });
      } catch {
        // Keep existing list; local filter still applies.
      }
    }, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    peerIdRef.current = peer ? String(peer.id || peer._id) : null;
  }, [peer]);

  useEffect(() => {
    const ids = new Set();
    [...friends, ...discover, ...inboxPeers].forEach((person) => {
      const id = String(person.id || person._id || "");
      if (id) ids.add(id);
    });
    knownIdsRef.current = ids;
  }, [friends, discover, inboxPeers]);

  // Poll inbox so new DMs show a preview + unread badge without opening each chat.
  useEffect(() => {
    if (!user?.id) return undefined;

    let cancelled = false;
    let inFlight = false;
    let seeded = Boolean(syncCursorRef.current);

    const absorbRows = async (rows, { countUnread }) => {
      const missing = new Set();
      const openThreadMessages = [];
      const openId = peerIdRef.current;

      for (const raw of rows) {
        if (raw.group) continue;
        const fromSelf = String(raw.from) === String(user.id);
        const otherId = String(fromSelf ? raw.to : raw.from || "");
        if (!otherId) continue;

        const key = conversationKeyForUser(otherId);
        const at = raw.createdAt || new Date().toISOString();
        const prev = getConversationActivity(user.id, key);
        const prevMs = prev?.at ? new Date(prev.at).getTime() : 0;
        const nextMs = new Date(at).getTime();
        if (!prev || nextMs >= prevMs) {
          const preview = previewFromMessage(raw, user.id);
          const minePrefix = fromSelf ? "You: " : "";
          setConversationActivity(user.id, key, {
            at,
            from: raw.from,
            preview: `${minePrefix}${preview}`,
          });
        }

        // Live-append into the currently open conversation.
        if (openId && String(otherId) === String(openId)) {
          openThreadMessages.push(decryptMessage(raw, user.id));
        } else if (!fromSelf && countUnread) {
          incrementUnreadCount(user.id, key);
        }

        if (!knownIdsRef.current.has(otherId)) {
          missing.add(otherId);
        }
      }

      if (openThreadMessages.length && openId && peerIdRef.current === openId) {
        setMessages((prev) => {
          // A synced copy of a message we queued replaces its pending bubble.
          const arrivedClientIds = new Set(
            openThreadMessages.map((m) => m.clientMessageId).filter(Boolean),
          );
          const base = arrivedClientIds.size
            ? prev.filter((m) => !(m.pending && arrivedClientIds.has(m.clientMessageId)))
            : prev;
          const seen = new Set(
            base.map((m) => String(m.id || m._id || "")).filter(Boolean),
          );
          const next = [...base];
          for (const msg of openThreadMessages) {
            const id = String(msg.id || msg._id || "");
            if (!id || seen.has(id)) continue;
            seen.add(id);
            next.push(msg);
          }
          return next.length === prev.length && base === prev ? prev : next;
        });
        const key = conversationKeyForUser(openId);
        markConversationRead(user.id, key);
        markPeerConversationRead(openId).catch(() => {});
      }

      if (missing.size) {
        const fetched = await Promise.all(
          [...missing].map((id) => fetchUser(id).catch(() => null)),
        );
        const people = fetched.filter(Boolean).map((p) => ({
          ...p,
          id: String(p.id || p._id),
        }));
        if (people.length) {
          setInboxPeers((prev) => {
            const map = new Map(prev.map((p) => [String(p.id), p]));
            people.forEach((p) => map.set(String(p.id), p));
            return [...map.values()];
          });
        }
      }

      bumpInbox();
    };

    const runSync = async () => {
      if (cancelled || inFlight) return;
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }
      inFlight = true;
      try {
        if (!seeded) {
          // Load recent conversation previews once (no unread spam for old history).
          const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
          const seed = await syncInbox(dayAgo);
          if (cancelled) return;
          if (seed.messages?.length) {
            await absorbRows(seed.messages, { countUnread: false });
          }
          syncCursorRef.current = seed.cursor || new Date().toISOString();
          seeded = true;
          return;
        }

        const { messages: rows, cursor } = await syncInbox(syncCursorRef.current);
        if (cancelled) return;
        if (cursor) syncCursorRef.current = cursor;
        if (rows?.length) {
          await absorbRows(rows, { countUnread: true });
        }
      } catch {
        // Keep polling; transient network blips are fine.
      } finally {
        inFlight = false;
      }
    };

    runSync();
    // Poll faster while a chat is open so new messages appear without leaving the thread.
    const pollMs = peerIdRef.current ? 2500 : 10000;
    const timer = window.setInterval(runSync, pollMs);
    const onVisible = () => {
      if (document.visibilityState === "visible") runSync();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [user?.id, bumpInbox, peer?.id]);

  const openPeer = useCallback(
    async (nextPeer) => {
      const peerId = String(nextPeer.id || nextPeer._id);
      setPeer({ ...nextPeer, id: peerId });
      setPicking(false);
      setThreadError("");
      setThreadLoadFailed(false);
      const pendingForPeer = readOutbox(user.id)
        .filter((entry) => String(entry.to) === peerId)
        .map((entry) => pendingBubble(entry, user.id));
      setMessages(pendingForPeer);
      const key = conversationKeyForUser(peerId);
      markConversationRead(user.id, key);
      bumpInbox();
      markPeerConversationRead(peerId).catch(() => {});
      try {
        const rows = await fetchConversation(peerId);
        const decrypted = (rows || []).map((row) => decryptMessage(row, user.id));
        const sentClientIds = new Set(decrypted.map((m) => m.clientMessageId).filter(Boolean));
        setMessages([
          ...decrypted,
          ...pendingForPeer.filter((m) => !sentClientIds.has(m.clientMessageId)),
        ]);
        if (decrypted.length) {
          const last = rows[rows.length - 1];
          const lastDec = decrypted[decrypted.length - 1];
          const fromSelf = String(last.from) === String(user.id);
          setConversationActivity(user.id, key, {
            at: last.createdAt || new Date().toISOString(),
            from: last.from,
            preview: `${fromSelf ? "You: " : ""}${
              lastDec.text
                ? String(lastDec.text).replace(/\s+/g, " ").trim().slice(0, 64)
                : "Message"
            }`,
          });
          bumpInbox();
        }
      } catch (err) {
        setThreadLoadFailed(true);
        setThreadError(
          isNetworkError(err)
            ? "Couldn't load this chat. It will load when you're back online."
            : friendlyError(err, "Could not load chat."),
        );
      }
    },
    [user.id, bumpInbox],
  );

  // Back online with a chat that failed to load: try again.
  useEffect(() => {
    if (online && threadLoadFailed && peer) openPeer(peer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  useLayoutEffect(() => {
    // Jump to latest message before paint so opening a chat does not animate from the top.
    const node = bottomRef.current;
    if (!node) return;
    const scroller = node.closest(".qc-thread__messages");
    if (scroller) {
      scroller.scrollTop = scroller.scrollHeight;
      return;
    }
    node.scrollIntoView({ behavior: "auto", block: "end" });
  }, [messages, peer]);

  const contacts = useMemo(() => {
    const map = new Map();
    [...friends, ...discover, ...inboxPeers].forEach((person) => {
      const id = String(person.id || person._id);
      if (!id || id === String(user.id)) return;
      if (!map.has(id)) map.set(id, { ...person, id });
    });

    let list = [...map.values()].map((person) => {
      const key = conversationKeyForUser(person.id);
      const activity = getConversationActivity(user.id, key);
      const unreadCount = getUnreadCount(user.id, key);
      return {
        ...person,
        lastMessageAt: activity?.at || null,
        preview: activity?.preview || null,
        unreadCount,
        unread: unreadCount > 0,
      };
    });

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        `${p.username || ""} ${p.displayName || ""} ${p.email || ""} ${p.preview || ""}`
          .toLowerCase()
          .includes(q),
      );
    }

    list.sort((a, b) => {
      if (a.unread !== b.unread) return a.unread ? -1 : 1;
      const aAt = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
      const bAt = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
      return bAt - aAt;
    });

    return list;
    // inboxTick forces re-read of localStorage activity/unread
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friends, discover, inboxPeers, query, user.id, inboxTick]);

  useEffect(() => {
    const total = getTotalUnread(
      user.id,
      contacts.map((c) => c.id),
    );
    onUnreadChange?.(total);
  }, [contacts, user.id, onUnreadChange, inboxTick]);

  /**
   * Sends everything in the outbox, oldest first. Stops at the first network
   * failure (still offline) and leaves the rest for the next try. A message
   * the server rejects outright (e.g. you were blocked) is marked "Not sent"
   * instead of being retried forever.
   */
  const flushOutbox = useCallback(async () => {
    if (flushingRef.current || !user?.id) return;
    flushingRef.current = true;
    try {
      for (const entry of readOutbox(user.id)) {
        if (entry.failed) continue;
        let raw;
        try {
          raw = await postSealedMessage(entry);
        } catch (err) {
          if (isNetworkError(err)) break;
          addToOutbox(user.id, { ...entry, failed: true });
          setMessages((prev) =>
            prev.map((m) =>
              m.clientMessageId === entry.clientMessageId && m.pending
                ? { ...m, pending: "failed" }
                : m,
            ),
          );
          if (peerIdRef.current === String(entry.to)) {
            setThreadError(friendlyError(err, "Message not sent."));
          }
          continue;
        }
        removeFromOutbox(user.id, entry.clientMessageId);
        if (!raw) continue;
        const sent = decryptMessage(raw, user.id);
        if (peerIdRef.current === String(entry.to)) {
          setMessages((prev) => {
            const withoutPending = prev.filter(
              (m) => !(m.pending && m.clientMessageId === entry.clientMessageId),
            );
            const sentId = String(sent.id || "");
            if (sentId && withoutPending.some((m) => String(m.id) === sentId)) {
              return withoutPending;
            }
            return [...withoutPending, sent];
          });
        }
        setConversationActivity(user.id, conversationKeyForUser(entry.to), {
          at: raw.createdAt || new Date().toISOString(),
          from: user.id,
          preview: `You: ${String(sent.text || "").replace(/\s+/g, " ").trim().slice(0, 64)}`,
        });
        bumpInbox();
      }
    } finally {
      flushingRef.current = false;
    }
  }, [user?.id, bumpInbox]);

  // Send queued messages on load, whenever the connection comes back, and
  // every 15s while online (covers "online" but the server was unreachable).
  useEffect(() => {
    if (!online) return undefined;
    flushOutbox();
    const timer = window.setInterval(() => {
      if (readOutbox(user.id).some((e) => !e.failed)) flushOutbox();
    }, OUTBOX_RETRY_MS);
    return () => window.clearInterval(timer);
  }, [online, flushOutbox, user.id]);

  // The outbox is memory-only, so warn before a reload/close drops unsent messages.
  useEffect(() => {
    const onBeforeUnload = (event) => {
      if (!hasPendingOutbox(user.id)) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [user.id]);

  const handleSend = async (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!peer || !text || sending) return;
    setSending(true);
    setThreadError("");
    let sealed;
    try {
      // Encrypting needs the contact's public keys. They come with the
      // contact list, so this normally works offline too.
      sealed = await sealDirectMessage({ myUserId: user.id, peer, text });
    } catch (err) {
      setThreadError(
        isNetworkError(err)
          ? "Can't send to this contact until you're back online."
          : friendlyError(err, "Send failed."),
      );
      setSending(false);
      return;
    }

    const entry = {
      ...sealed,
      clientMessageId: newClientMessageId(),
      queuedAt: new Date().toISOString(),
    };
    addToOutbox(user.id, entry);
    setDraft("");
    setMessages((prev) => [...prev, pendingBubble(entry, user.id)]);
    setConversationActivity(user.id, conversationKeyForUser(peer.id), {
      at: entry.queuedAt,
      from: user.id,
      preview: `You: ${text.slice(0, 64)}`,
    });
    bumpInbox();
    setSending(false);
    if (online) flushOutbox();
  };

  const retryFailed = (clientMessageId) => {
    const entry = readOutbox(user.id).find((e) => e.clientMessageId === clientMessageId);
    if (!entry) return;
    addToOutbox(user.id, { ...entry, failed: false });
    setThreadError("");
    setMessages((prev) =>
      prev.map((m) =>
        m.clientMessageId === clientMessageId && m.pending ? { ...m, pending: "waiting" } : m,
      ),
    );
    if (online) flushOutbox();
  };

  const discardFailed = (clientMessageId) => {
    removeFromOutbox(user.id, clientMessageId);
    setMessages((prev) =>
      prev.filter((m) => !(m.pending && m.clientMessageId === clientMessageId)),
    );
  };

  const offlineBanner = online ? null : (
    <p className="qc-offline-banner" role="status">
      <WifiOff size={14} aria-hidden="true" />
      You&apos;re offline. Messages will send when you&apos;re back online — keep this tab open.
    </p>
  );

  if (peer && !picking) {
    return (
      <div className="qc-thread">
        <div className="qc-thread__bar">
          <button
            type="button"
            className="quantum-chat-dock__icon-btn"
            aria-label="Back to chats"
            onClick={() => {
              setPeer(null);
              setThreadError("");
            }}
          >
            <ArrowLeft size={16} />
          </button>
          <span className="qc-thread__name">
            {peer.displayName || peer.username || "Chat"}
          </span>
        </div>
        {offlineBanner}
        {threadError && <p className="qc-auth-form__error qc-thread__error">{threadError}</p>}
        <div className="qc-thread__messages">
          {messages.length === 0 && !threadLoadFailed && (
            <p className="qc-thread__empty">No messages yet. Say hello.</p>
          )}
          {messages.map((msg) => {
            const mine = String(msg.from) === String(user.id);
            const timeLabel = formatMessageTime(msg.createdAt || msg.at);
            return (
              <div
                key={msg.id}
                className={`qc-bubble ${mine ? "qc-bubble--mine" : "qc-bubble--theirs"}`}
              >
                <div className="qc-bubble__body">
                  {msg.text ?? (
                    <em className="qc-bubble__locked">Unable to decrypt</em>
                  )}
                </div>
                {msg.pending === "waiting" ? (
                  <span className="qc-bubble__status" title="Waiting to send">
                    <Clock size={11} aria-hidden="true" /> Waiting to send
                  </span>
                ) : msg.pending === "failed" ? (
                  <span className="qc-bubble__status qc-bubble__status--failed">
                    Not sent ·{" "}
                    <button type="button" onClick={() => retryFailed(msg.clientMessageId)}>
                      Retry
                    </button>{" "}
                    ·{" "}
                    <button type="button" onClick={() => discardFailed(msg.clientMessageId)}>
                      Delete
                    </button>
                  </span>
                ) : timeLabel ? (
                  <time className="qc-bubble__time" dateTime={msg.createdAt || msg.at}>
                    {timeLabel}
                  </time>
                ) : null}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        <form className="qc-thread__composer" onSubmit={handleSend}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message…"
            disabled={sending}
          />
          <button type="submit" disabled={sending || !draft.trim()} aria-label="Send">
            <Send size={16} />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="qc-chat-list">
      <div className="qc-chat-list__toolbar">
        <input
          className="qc-chat-list__search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search people…"
        />
      </div>
      {offlineBanner}
      {listError && !(offlineBanner && contacts.length) && (
        <p className="qc-auth-form__error">{listError}</p>
      )}
      {loadingList ? (
        <p className="quantum-chat-loading">Loading contacts…</p>
      ) : contacts.length === 0 ? (
        <div className="quantum-chat-fallback">
          <p className="quantum-chat-fallback__title">No contacts yet</p>
          <p className="quantum-chat-fallback__text">
            Add friends in the full QuantumChat app, or search discoverable users above
            when available.
          </p>
        </div>
      ) : (
        <ul className="qc-chat-list__items">
          {contacts.map((person) => (
            <li key={person.id}>
              <button
                type="button"
                className={`qc-chat-list__item${
                  person.unread ? " qc-chat-list__item--unread" : ""
                }`}
                onClick={() => openPeer(person)}
              >
                <span className="qc-chat-list__avatar" aria-hidden="true">
                  {getInitials(person.displayName || person.username)}
                </span>
                <span className="qc-chat-list__meta">
                  <span className="qc-chat-list__row">
                    <strong>{person.displayName || person.username}</strong>
                    {person.lastMessageAt && (
                      <time className="qc-chat-list__time">
                        {formatMessageTime(person.lastMessageAt)}
                      </time>
                    )}
                  </span>
                  <span className="qc-chat-list__row">
                    <small className="qc-chat-list__preview">
                      {person.preview || `@${person.username}`}
                    </small>
                    {person.unreadCount > 0 && (
                      <span className="qc-chat-list__badge" aria-label={`${person.unreadCount} unread`}>
                        {person.unreadCount > 99 ? "99+" : person.unreadCount}
                      </span>
                    )}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function QuantumChatDockInner() {
  const { pathname } = useLocation();
  const { user, hasLocalKeyring, logout } = useQuantumChatAuth();
  const headerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [unreadTotal, setUnreadTotal] = useState(0);

  const chatUrl = useMemo(() => getQuantumChatAppUrl(), []);
  const hidden = /^\/(login|signup)$/.test(pathname);
  const initials = useMemo(
    () => getInitials(user?.displayName || user?.username || user?.email),
    [user],
  );

  const handleUnreadChange = useCallback((total) => {
    setUnreadTotal(Number(total) || 0);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handlePointer = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    return () => document.removeEventListener("mousedown", handlePointer);
  }, [menuOpen]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
    setMenuOpen(false);
  }, []);

  // Footer "QuantumChat" link dispatches this to expand the dock instead of navigating away.
  useEffect(() => {
    const onOpenRequest = () => setIsOpen(true);
    window.addEventListener("open-polycode-quantumchat", onOpenRequest);
    return () => window.removeEventListener("open-polycode-quantumchat", onOpenRequest);
  }, []);

  const handleOpenExternal = useCallback(() => {
    setMenuOpen(false);
    window.open(chatUrl, "quantumchat", "noopener,noreferrer");
  }, [chatUrl]);

  const chatReady = Boolean(user && hasLocalKeyring);

  let gateBody = null;
  if (!user) {
    gateBody = <AuthPanel mode={authMode} onSwitchMode={setAuthMode} />;
  } else if (!hasLocalKeyring) {
    gateBody = <KeyGatePanel />;
  }

  if (hidden) return null;

  return (
    <section
      className={`quantum-chat-dock${isOpen ? " quantum-chat-dock--open" : ""}`}
      aria-label="QuantumChat"
    >
      <header
        ref={headerRef}
        className="quantum-chat-dock__header"
        onClick={toggleOpen}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleOpen();
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls="quantum-chat-dock-body"
      >
        <div className="quantum-chat-dock__identity">
          <span className="quantum-chat-dock__avatar" aria-hidden="true">
            <span className="quantum-chat-dock__avatar-text">{initials}</span>
            <span className="quantum-chat-dock__status" title="Online" />
            {unreadTotal > 0 && (
              <span className="quantum-chat-dock__unread" aria-hidden="true">
                {unreadTotal > 99 ? "99+" : unreadTotal}
              </span>
            )}
          </span>
          <span className="quantum-chat-dock__title">QuantumChat</span>
          {unreadTotal > 0 && (
            <span className="quantum-chat-dock__title-badge" aria-label={`${unreadTotal} unread messages`}>
              {unreadTotal > 99 ? "99+" : unreadTotal}
            </span>
          )}
        </div>

        <div className="quantum-chat-dock__actions">
          <div className="quantum-chat-dock__menu-wrap">
            <button
              type="button"
              className="quantum-chat-dock__icon-btn"
              aria-label="More QuantumChat options"
              title="More"
              aria-expanded={menuOpen}
              onClick={(event) => {
                event.stopPropagation();
                setMenuOpen((open) => !open);
              }}
            >
              <MoreHorizontal size={18} strokeWidth={2.2} />
            </button>
            {menuOpen && (
              <div className="quantum-chat-dock__menu" role="menu">
                <button
                  type="button"
                  role="menuitem"
                  className="quantum-chat-dock__menu-item"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleOpenExternal();
                  }}
                >
                  Open full QuantumChat
                </button>
                {user && (
                  <button
                    type="button"
                    role="menuitem"
                    className="quantum-chat-dock__menu-item"
                    onClick={(event) => {
                      event.stopPropagation();
                      setMenuOpen(false);
                      logout();
                    }}
                  >
                    <LogOut size={14} style={{ marginRight: 6 }} />
                    Sign out of QuantumChat
                  </button>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="quantum-chat-dock__icon-btn"
            aria-label={isOpen ? "Collapse QuantumChat" : "Expand QuantumChat"}
            title={isOpen ? "Collapse" : "Expand"}
            onClick={(event) => {
              event.stopPropagation();
              toggleOpen();
            }}
          >
            {isOpen ? (
              <ChevronDown size={18} strokeWidth={2.2} />
            ) : (
              <ChevronUp size={18} strokeWidth={2.2} />
            )}
          </button>
        </div>
      </header>

      {/* Keep inbox panel mounted while signed in so unread sync runs even when collapsed. */}
      {chatReady && (
        <div
          id="quantum-chat-dock-body"
          className="quantum-chat-dock__body"
          hidden={!isOpen}
          style={isOpen ? undefined : { display: "none" }}
        >
          <ChatReadyPanel onUnreadChange={handleUnreadChange} />
        </div>
      )}
      {!chatReady && isOpen && (
        <div id="quantum-chat-dock-body" className="quantum-chat-dock__body">
          {gateBody}
        </div>
      )}
    </section>
  );
}

QuantumChatDockInner.displayName = "QuantumChatDockInner";

export default React.memo(QuantumChatDockInner);
