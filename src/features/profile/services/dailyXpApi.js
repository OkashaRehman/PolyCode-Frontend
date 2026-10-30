import { apiFetch } from "../../../lib/apiClient";

export function getDailyXpProgress(token) {
  return apiFetch("/auth/progress/daily-xp", {
    token,
    fallbackMessage: "Unable to load daily XP progress",
  });
}

export function recordDailyXp(token, payload) {
  return apiFetch("/auth/progress/daily-xp/record", {
    token,
    method: "POST",
    body: JSON.stringify(payload),
    fallbackMessage: "Unable to record lesson XP",
  });
}

export function markDailyXpRead(token, date) {
  return apiFetch("/auth/progress/daily-xp/mark-read", {
    token,
    method: "POST",
    body: JSON.stringify({ date }),
    fallbackMessage: "Unable to mark daily progress as read",
  });
}
