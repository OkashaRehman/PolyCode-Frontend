import { useCallback, useState } from "react";
import { normalizeThemeId, DEFAULT_THEME_ID } from "../../../shared/theme/themes";

export const IDE_THEME_STORAGE_KEY = "polycode_ide_theme";

function readStoredIdeTheme() {
  try {
    const stored = localStorage.getItem(IDE_THEME_STORAGE_KEY);
    return stored ? normalizeThemeId(stored) : DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

export default function useIdeTheme() {
  const [ideTheme, setIdeThemeState] = useState(readStoredIdeTheme);

  const setIdeTheme = useCallback((nextTheme) => {
    const normalized = normalizeThemeId(nextTheme);
    setIdeThemeState(normalized);
    try {
      localStorage.setItem(IDE_THEME_STORAGE_KEY, normalized);
    } catch {
      /* ignore */
    }
  }, []);

  return { ideTheme, setIdeTheme };
}
