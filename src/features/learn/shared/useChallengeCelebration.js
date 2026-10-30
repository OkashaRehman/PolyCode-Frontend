import { useCallback, useEffect, useState } from "react";

export function useChallengeCelebration(challengeId) {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    setShowCelebration(false);
  }, [challengeId]);

  const triggerCelebration = useCallback(() => {
    setShowCelebration(true);
  }, []);

  const dismissCelebration = useCallback(() => {
    setShowCelebration(false);
  }, []);

  return { showCelebration, triggerCelebration, dismissCelebration };
}
