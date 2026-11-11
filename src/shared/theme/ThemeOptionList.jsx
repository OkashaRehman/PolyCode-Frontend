import React from "react";
import { Check } from "lucide-react";
import { THEMES } from "./themes";

export default function ThemeOptionList({
  theme,
  onThemeChange,
  className = "",
  compact = false,
}) {
  if (typeof onThemeChange !== "function") {
    return null;
  }

  return (
    <div
      className={`theme-settings-list${className ? ` ${className}` : ""}`}
      role="listbox"
      aria-label="Choose theme"
    >
      {THEMES.map((item) => {
        const active = item.id === theme;
        return (
          <button
            key={item.id}
            type="button"
            role="option"
            aria-selected={active}
            className={`theme-settings-option${active ? " theme-settings-option--active" : ""}${compact ? " theme-settings-option--compact" : ""}`}
            onClick={() => onThemeChange(item.id)}
          >
            <span
              className="theme-settings-swatch"
              style={{ background: item.swatch }}
              aria-hidden
            />
            <span className="theme-settings-copy">
              <strong>{item.label}</strong>
              {!compact ? <small>{item.description}</small> : null}
            </span>
            {active ? (
              <Check size={15} className="theme-settings-check" aria-hidden />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
