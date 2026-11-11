import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import {
  getDailyXpProgress,
  markDailyXpRead,
} from "../services/dailyXpApi";

export default function useDailyXpProgress({ enabled = true } = {}) {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [markingDate, setMarkingDate] = useState(null);

  const refresh = useCallback(async () => {
    if (!enabled || !token) {
      setData(null);
      setError("");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const result = await getDailyXpProgress(token);
      setData(result);
    } catch (err) {
      setError(err.message || "Could not load daily XP progress");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [enabled, token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markRead = useCallback(
    async (date) => {
      if (!token || !date) return null;
      setMarkingDate(date);
      try {
        const result = await markDailyXpRead(token, date);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message || "Could not mark day as read");
        return null;
      } finally {
        setMarkingDate(null);
      }
    },
    [token],
  );

  return {
    data,
    loading,
    error,
    markingDate,
    refresh,
    markRead,
  };
}
