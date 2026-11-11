import { createContext, useCallback, useContext } from "react";

export const ChallengeTelemetryContext = createContext(null);

/**
 * Report pass/fail from a lesson code challenge. No-ops outside a provider.
 */
export function useChallengeTelemetry() {
  return useContext(ChallengeTelemetryContext);
}

export function useChallengeTelemetryReporter(recordChallengeResult, lessonId) {
  return useCallback(
    (passed) => {
      if (!lessonId || typeof recordChallengeResult !== "function") return;
      recordChallengeResult(lessonId, Boolean(passed)).catch?.(() => {});
    },
    [recordChallengeResult, lessonId],
  );
}
