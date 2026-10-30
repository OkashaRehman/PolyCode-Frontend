import { useEffect, useState } from "react";
import {
  getLearnDashboard,
  getPublicLearnDashboard,
} from "../../learn/shared/courseProgressApi";

const EMPTY = { overview: {}, courses: [], activity: [] };

/**
 * Learner dashboard aggregates (all CourseProgress + DailyXp summary).
 */
export default function useLearnDashboard({
  enabled = true,
  isOwnProfile = false,
  username = "",
  token = null,
}) {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setData(EMPTY);
      setError("");
      return undefined;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    const request = isOwnProfile
      ? token
        ? getLearnDashboard(token)
        : Promise.resolve(EMPTY)
      : username
        ? getPublicLearnDashboard(username)
        : Promise.resolve(EMPTY);

    request
      .then((payload) => {
        if (cancelled) return;
        setData({
          overview: payload.overview || {},
          courses: Array.isArray(payload.courses) ? payload.courses : [],
          activity: Array.isArray(payload.activity) ? payload.activity : [],
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setData(EMPTY);
        setError(err.message || "Could not load dashboard");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, isOwnProfile, username, token, version]);

  return {
    overview: data.overview,
    courses: data.courses,
    activity: data.activity,
    loading,
    error,
    refresh: () => setVersion((v) => v + 1),
  };
}
