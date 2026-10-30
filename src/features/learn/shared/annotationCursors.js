export const DEFAULT_PENCIL_COLOR = "#ffe566";
export const DEFAULT_HIGHLIGHTER_COLOR = "#ffe566";
export const DEFAULT_LASER_COLOR = "#ff3344";

function svgCursor(svg, hotspotX, hotspotY, fallback = "crosshair") {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hotspotX} ${hotspotY}, ${fallback}`;
}

/* =========================
   PENCIL
   ========================= */

export function getPencilCursor(color = DEFAULT_PENCIL_COLOR) {
  return svgCursor(
    `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
      <g transform="translate(18 18) rotate(-45) translate(-18 -18)">
        
        <rect
          x="15"
          y="6"
          width="6"
          height="18"
          rx="1"
          fill="${color}"
          stroke="#8a6528"
          stroke-width="0.8"
        />

        <rect
          x="15"
          y="4"
          width="6"
          height="3"
          rx="0.6"
          fill="#ff9bb3"
          stroke="#7a4554"
          stroke-width="0.6"
        />

        <rect
          x="15"
          y="7"
          width="6"
          height="2"
          fill="#cfcfcf"
          stroke="#666"
          stroke-width="0.4"
        />

        <path
          d="M15 24 L18 31 L21 24 Z"
          fill="#e3c19a"
          stroke="#7a5a36"
          stroke-width="0.6"
        />

        <path
          d="M17 28 L18 31 L19 28 Z"
          fill="#111"
        />
      </g>
    </svg>`,
    6,
    30,
  );
}

export const PENCIL_CURSOR = getPencilCursor();

/* =========================
   ERASER
   ========================= */

export const ERASER_CURSOR = svgCursor(
  `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
    <g transform="translate(18 18) rotate(-25) translate(-18 -18)">
      
      <rect
        x="9"
        y="13"
        width="18"
        height="10"
        rx="2"
        fill="#ffb7c5"
        stroke="#8a4d5c"
        stroke-width="1"
      />

      <rect
        x="9"
        y="13"
        width="5"
        height="10"
        rx="1"
        fill="#ff95aa"
      />

      <rect
        x="14"
        y="13"
        width="13"
        height="10"
        rx="1"
        fill="#d9ecff"
      />
    </g>
  </svg>`,
  18,
  18,
);

/* =========================
   HIGHLIGHTER
   ========================= */

export function getHighlighterCursor(color = DEFAULT_HIGHLIGHTER_COLOR) {
  return svgCursor(
    `<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38">
      <g transform="translate(19 19) rotate(-45) translate(-19 -19)">

        <rect
          x="14"
          y="8"
          width="10"
          height="14"
          rx="2"
          fill="${color}"
          stroke="#666"
          stroke-width="0.8"
        />

        <rect
          x="15"
          y="22"
          width="8"
          height="5"
          rx="1"
          fill="#222"
        />

        <path
          d="M15 27 L19 33 L23 27 Z"
          fill="#111"
        />
      </g>
    </svg>`,
    10,
    30,
  );
}

export const HIGHLIGHTER_CURSOR = getHighlighterCursor();

/* =========================
   LASER
   ========================= */

export function getLaserCursor(color = DEFAULT_LASER_COLOR) {
  return svgCursor(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      
      <circle
        cx="16"
        cy="16"
        r="4"
        fill="${color}"
        opacity="0.95"
      />

      <circle
        cx="16"
        cy="16"
        r="8"
        fill="none"
        stroke="${color}"
        stroke-width="1"
        opacity="0.35"
      />

      <circle
        cx="16"
        cy="16"
        r="12"
        fill="none"
        stroke="${color}"
        stroke-width="0.8"
        opacity="0.15"
      />
      
    </svg>`,
    16,
    16,
  );
}

export const LASER_CURSOR = getLaserCursor();

/* =========================
   TEXT
   ========================= */

export const TEXT_CURSOR = "text";

/* =========================
   TOOL MAP
   ========================= */

export const TOOL_CURSORS = {
  pencil: PENCIL_CURSOR,
  highlighter: HIGHLIGHTER_CURSOR,
  eraser: ERASER_CURSOR,
  laser: LASER_CURSOR,
  text: TEXT_CURSOR,
};

/* =========================
   COLOR PRESETS
   ========================= */

export const MAIN_COLOR_PRESETS = [
  "#ffe566",
  "#ff4757",
  "#3794ff",
  "#4ade80",
  "#c084fc",
  "#ff8fab",
];

/* =========================
   STORAGE
   ========================= */

const PREFS_KEY = "polycode_annotation_prefs";

export function loadAnnotationPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY);

    if (!raw) {
      return {
        pencilColor: DEFAULT_PENCIL_COLOR,

        highlighterColor: DEFAULT_HIGHLIGHTER_COLOR,

        laserColor: DEFAULT_LASER_COLOR,
      };
    }

    const parsed = JSON.parse(raw);

    return {
      pencilColor: parsed.pencilColor || DEFAULT_PENCIL_COLOR,

      highlighterColor: parsed.highlighterColor || DEFAULT_HIGHLIGHTER_COLOR,

      laserColor: parsed.laserColor || DEFAULT_LASER_COLOR,
    };
  } catch {
    return {
      pencilColor: DEFAULT_PENCIL_COLOR,

      highlighterColor: DEFAULT_HIGHLIGHTER_COLOR,

      laserColor: DEFAULT_LASER_COLOR,
    };
  }
}

export function saveAnnotationPrefs(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // ignore storage errors
  }
}
