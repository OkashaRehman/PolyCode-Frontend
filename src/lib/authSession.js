const TOKEN_KEY = "token";
const USERNAME_KEY = "username";
const PROFILE_PATH_KEY = "profilePath";
const USER_KEY = "authUser";

/** JWT-shaped string (three base64url segments). */
export function isValidToken(value) {
  return (
    typeof value === "string" &&
    value.length > 20 &&
    /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(value)
  );
}

function decodeTokenPayload(token) {
  if (!isValidToken(token)) return null;
  try {
    const segment = token.split(".")[1];
    return JSON.parse(
      atob(segment.replace(/-/g, "+").replace(/_/g, "/")),
    );
  } catch {
    return null;
  }
}

/**
 * True only when the token carries an `exp` that has already passed.
 * A token without `exp` never expires client-side — the server decides.
 */
export function isTokenExpired(token) {
  const payload = decodeTokenPayload(token);
  if (!payload || typeof payload.exp !== "number") return false;
  return payload.exp * 1000 <= Date.now();
}

/** Seconds of life left, or null when the token has no expiry. */
export function tokenSecondsRemaining(token) {
  const payload = decodeTokenPayload(token);
  if (!payload || typeof payload.exp !== "number") return null;
  return Math.round(payload.exp - Date.now() / 1000);
}

export function getStoredToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!isValidToken(token)) return null;
  // An expired token can never be revived — drop the whole session now so the
  // app does not render a signed-in shell that every request will reject.
  if (isTokenExpired(token)) {
    clearStoredSession();
    return null;
  }
  return token;
}

export function setStoredToken(token) {
  if (!isValidToken(token)) {
    throw new Error("Invalid auth token received from server");
  }
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Last known user, cached so a reload restores the signed-in UI immediately
 * instead of waiting on (or being logged out by) a slow /auth/me.
 */
export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    return user && (user._id || user.id) ? user : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  try {
    if (user && (user._id || user.id)) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  } catch {
    // Quota / private-mode failures must never break sign-in.
  }
}

export function clearStoredSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PROFILE_PATH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function rememberSignedInUser(user) {
  if (user?.username) {
    localStorage.setItem(USERNAME_KEY, user.username);
    localStorage.setItem(PROFILE_PATH_KEY, `/@${user.username}`);
  }
  setStoredUser(user);
}

export function getProfilePathForUser(user) {
  if (user?.username) return `/@${user.username}`;
  const stored = localStorage.getItem(PROFILE_PATH_KEY);
  return stored || "/hub";
}

export const AUTH_STORAGE_KEYS = {
  TOKEN_KEY,
  USER_KEY,
};
