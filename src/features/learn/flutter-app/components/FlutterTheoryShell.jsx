import React from "react";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";

const ACCENT = "#02569b";

/**
 * Flutter-branded theory shell — studio banner + shared NumPy theory renderer.
 */
export default function FlutterTheoryShell(props) {
  const { lesson } = props;
  const chapterColor = lesson?.chapterColor || ACCENT;

  return (
    <div className="flutter-theory-shell">
      <div
        className="flutter-studio-banner"
        style={{ "--flutter-accent": chapterColor }}
      >
        <div className="flutter-studio-banner-orbit" aria-hidden>
          <span className="flutter-orbit-ring" />
          <span className="flutter-orbit-dot" />
        </div>
        <div className="flutter-studio-banner-copy">
          <span className="flutter-studio-pill">Flutter Studio</span>
          <strong>{lesson?.chapterTitle}</strong>
          <p>
            Simple words → real example → try the code locally → quiz. Build
            like a real app maker.
          </p>
        </div>
      </div>
      <NumpyIntroTheory
        {...props}
        accentColor={chapterColor}
        autoW3={false}
      />
    </div>
  );
}
