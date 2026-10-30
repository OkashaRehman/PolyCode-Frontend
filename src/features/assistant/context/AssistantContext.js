import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const AssistantContext = createContext(null);

const EMPTY_ROUTE = {
  page: "general",
  route: "/",
  language: null,
  course: null,
};

/**
 * @typedef {Object} AssistantPageContext
 * @property {string} [mode] - "lesson" | "playground" | "docs" | "landing"
 * @property {string} [page]
 * @property {string} [route]
 * @property {string} [language]
 * @property {string} [course]
 * @property {string} [lessonId]
 * @property {string} [lessonTitle]
 * @property {string} [chapter]
 * @property {string} [tab]
 * @property {string} [code]
 * @property {string} [error]
 * @property {string} [challengeDescription]
 */

export function AssistantProvider({ children }) {
  const [routeContext, setRouteContext] = useState(EMPTY_ROUTE);
  const [pageContext, setPageContextState] = useState(null);

  const setRouteContextSafe = useCallback((next) => {
    setRouteContext((prev) => ({ ...prev, ...next }));
  }, []);

  const setPageContext = useCallback((next) => {
    setPageContextState(next);
  }, []);

  const patchPageContext = useCallback((patch) => {
    setPageContextState((prev) => ({ ...(prev || {}), ...patch }));
  }, []);

  const clearPageContext = useCallback(() => {
    setPageContextState(null);
  }, []);

  const context = useMemo(() => {
    const merged = {
      ...routeContext,
      ...(pageContext || {}),
    };

    if (pageContext?.mode === "lesson") {
      merged.mode = "lesson";
    } else if (routeContext.page && routeContext.page !== "general") {
      merged.mode = routeContext.page;
    } else {
      merged.mode = merged.mode || "general";
    }

    return merged;
  }, [routeContext, pageContext]);

  const value = useMemo(
    () => ({
      context,
      setRouteContext: setRouteContextSafe,
      setPageContext,
      patchPageContext,
      clearPageContext,
    }),
    [
      context,
      setRouteContextSafe,
      setPageContext,
      patchPageContext,
      clearPageContext,
    ],
  );

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) {
    throw new Error("useAssistant must be used within AssistantProvider");
  }
  return ctx;
}
