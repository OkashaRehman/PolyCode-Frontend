import React from "react";
import NumpyIntroTheory from "../../numpy-py/components/NumpyIntroTheory";

const ACCENT = "#0d9488";

/**
 * SciPy-branded theory shell — soft lab banner + NumPy theory renderer.
 * Keeps lesson content identical while making the reading experience feel distinct.
 */
export default function ScipyTheoryShell(props) {
  const { lesson } = props;
  const chapterColor = lesson?.chapterColor || ACCENT;

  return (
    <div className="scipy-theory-shell">
      <div
        className="scipy-lab-banner"
        style={{ "--scipy-accent": chapterColor }}
      >
        <div className="scipy-lab-banner-orbit" aria-hidden>
          <span className="scipy-orbit-ring" />
          <span className="scipy-orbit-dot" />
        </div>
        <div className="scipy-lab-banner-copy">
          <span className="scipy-lab-pill">SciPy Lab</span>
          <strong>{lesson?.chapterTitle}</strong>
          <p>
            Definition → real example → try the code → quiz. Keep it curious.
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
