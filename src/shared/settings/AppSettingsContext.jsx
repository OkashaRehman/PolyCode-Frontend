import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "polycode_ide_sound_enabled";
const LEGACY_STORAGE_KEY = "polycode_sound_enabled";

const AppSettingsContext = createContext({
  soundEnabled: true,
  setSoundEnabled: () => {},
  toggleSound: () => {},
});

function readSoundEnabled() {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem(LEGACY_STORAGE_KEY);
    if (stored === null) return true;
    return stored === "true";
  } catch {
    return true;
  }
}

export function AppSettingsProvider({ children }) {
  const [soundEnabled, setSoundEnabledState] = useState(readSoundEnabled);

  const setSoundEnabled = (value) => {
    setSoundEnabledState(Boolean(value));
  };

  const toggleSound = () => {
    setSoundEnabledState((current) => !current);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(soundEnabled));
    } catch {
      /* ignore */
    }
  }, [soundEnabled]);

  const value = useMemo(
    () => ({
      soundEnabled,
      setSoundEnabled,
      toggleSound,
    }),
    [soundEnabled],
  );

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  return useContext(AppSettingsContext);
}
