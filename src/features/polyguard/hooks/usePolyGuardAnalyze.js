import { useCallback, useRef, useState } from "react";
import { analyzeCodeWithPolyGuard } from "../services/analyzeCode";

export default function usePolyGuardAnalyze() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const requestIdRef = useRef(0);

  const reset = useCallback(() => {
    requestIdRef.current += 1;
    setResult(null);
    setError("");
    setLoading(false);
  }, []);

  const analyze = useCallback(async (code, language = "python", options = {}) => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError("");

    try {
      const data = await analyzeCodeWithPolyGuard(code, language, {
        context: options.context || {},
      });
      if (requestId !== requestIdRef.current) return null;
      setResult(data);
      return data;
    } catch (err) {
      if (requestId !== requestIdRef.current) return null;
      const message =
        err instanceof Error ? err.message : "PolyGuard analysis failed.";
      setResult(null);
      setError(message);
      return null;
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  return {
    analyze,
    result,
    error,
    loading,
    reset,
  };
}
