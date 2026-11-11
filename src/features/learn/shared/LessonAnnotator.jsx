import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  Eraser,
  GripVertical,
  MousePointer2,
  Pencil,
  PenLine,
  Presentation,
  Trash2,
  Type,
  X,
  Zap,
} from "lucide-react";
import {
  DEFAULT_PENCIL_COLOR,
  getPencilCursor,
  loadAnnotationPrefs,
  MAIN_COLOR_PRESETS,
  saveAnnotationPrefs,
  TOOL_CURSORS,
} from "./annotationCursors";
import { useAuth } from "../../auth/context/AuthContext";
import {
  getLessonAnnotation,
  putLessonAnnotation,
} from "./courseProgressApi";
import LessonWhiteboard from "./LessonWhiteboard";

const STAGE_INTERACTIVE_SELECTOR =
  ".lesson-annotator-text-input, .lesson-annotator-label, .lesson-annotator-fab-wrap, .lesson-whiteboard, .numpy-lesson-outcomes, .numpy-confidence-panel, .numpy-mark-read-panel, .numpy-theory-actions, .lesson-read-gate, .lesson-confidence-panel, .lesson-read-actions, textarea, input, select, button, a";

const LABEL_MIN_W = 120;
const LABEL_MIN_H = 36;
const TEXT_INPUT_MIN_W = 160;
const TEXT_INPUT_MIN_H = 88;

const TOOLS = {
  POINTER: "pointer",
  PENCIL: "pencil",
  LASER: "laser",
  TEXT: "text",
  ERASER: "eraser",
};

const TOOL_ITEMS = [
  { id: TOOLS.POINTER, label: "Pointer", Icon: MousePointer2 },
  { id: TOOLS.PENCIL, label: "Pencil", Icon: Pencil },
  { id: TOOLS.LASER, label: "Laser", Icon: Zap },
  { id: TOOLS.TEXT, label: "Text", Icon: Type },
  { id: TOOLS.ERASER, label: "Eraser", Icon: Eraser },
];

const STROKE_WIDTH = 3;
const ERASER_RADIUS = 14;
const DRAG_THRESHOLD = 4;
const FAB_DRAG_THRESHOLD = 6;
const FAB_POS_KEY = "polycode_annotator_fab_position";

function loadFabPosition() {
  try {
    const raw = localStorage.getItem(FAB_POS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.x === "number" &&
      typeof parsed?.y === "number" &&
      Number.isFinite(parsed.x) &&
      Number.isFinite(parsed.y)
    ) {
      const clamped = clampFabPosition(parsed.x, parsed.y);
      if (clamped.x !== parsed.x || clamped.y !== parsed.y) {
        saveFabPosition(clamped);
      }
      return clamped;
    }
  } catch {
    // ignore
  }
  return null;
}

function saveFabPosition(position) {
  if (!position) return;
  localStorage.setItem(FAB_POS_KEY, JSON.stringify(position));
}

function clampFabPosition(x, y, size = 44) {
  const margin = 8;
  const maxX = Math.max(margin, window.innerWidth - size - margin);
  const maxY = Math.max(margin, window.innerHeight - size - margin);
  return {
    x: Math.min(maxX, Math.max(margin, x)),
    y: Math.min(maxY, Math.max(margin, y)),
  };
}

function annotationStorageKey(storageKey) {
  return `polycode_annotations_${storageKey}`;
}

function parseAnnotationPayload(raw) {
  if (!raw) return { strokes: [], labels: [] };
  try {
    const parsed = JSON.parse(raw);
    return {
      strokes: Array.isArray(parsed.strokes) ? parsed.strokes : [],
      labels: Array.isArray(parsed.labels) ? parsed.labels : [],
    };
  } catch {
    return { strokes: [], labels: [] };
  }
}

function loadAnnotations(storageKey) {
  if (!storageKey) return { strokes: [], labels: [] };

  const current = parseAnnotationPayload(
    localStorage.getItem(annotationStorageKey(storageKey)),
  );
  if (current.strokes.length || current.labels.length) {
    return current;
  }

  // One-time migrate notes saved before theory/challenge were split.
  // Old key: "course:lessonId" → new theory key: "course:lessonId:theory"
  if (storageKey.endsWith(":theory")) {
    const legacyKey = storageKey.slice(0, -":theory".length);
    const legacy = parseAnnotationPayload(
      localStorage.getItem(annotationStorageKey(legacyKey)),
    );
    if (legacy.strokes.length || legacy.labels.length) {
      localStorage.setItem(
        annotationStorageKey(storageKey),
        JSON.stringify(legacy),
      );
      localStorage.removeItem(annotationStorageKey(legacyKey));
      return legacy;
    }
  }

  return current;
}

function saveAnnotations(storageKey, data) {
  if (!storageKey) return;
  localStorage.setItem(annotationStorageKey(storageKey), JSON.stringify(data));
}

function getPoint(event, stage) {
  const rect = stage.getBoundingClientRect();
  const clientX = event.touches?.[0]?.clientX ?? event.clientX;
  const clientY = event.touches?.[0]?.clientY ?? event.clientY;
  return {
    x: clientX - rect.left + stage.scrollLeft,
    y: clientY - rect.top + stage.scrollTop,
  };
}

function drawStroke(ctx, stroke) {
  if (!stroke.points?.length) return;
  ctx.strokeStyle = stroke.color || DEFAULT_PENCIL_COLOR;
  ctx.lineWidth = stroke.width || STROKE_WIDTH;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(stroke.points[0][0], stroke.points[0][1]);
  stroke.points.slice(1).forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.stroke();
}

function distanceToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) {
    return Math.hypot(px - x1, py - y1);
  }
  const t = Math.max(
    0,
    Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)),
  );
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function strokeNearPoint(stroke, point, radius) {
  const points = stroke.points || [];
  for (let i = 1; i < points.length; i += 1) {
    const [x1, y1] = points[i - 1];
    const [x2, y2] = points[i];
    if (distanceToSegment(point.x, point.y, x1, y1, x2, y2) <= radius) {
      return true;
    }
  }
  return false;
}

function normalizeHex(color = "") {
  return color.trim().toLowerCase();
}

function ColorPicker({ label, value, onChange, compact }) {
  const paletteInputRef = useRef(null);
  const isCustomColor = !MAIN_COLOR_PRESETS.some(
    (preset) => normalizeHex(preset) === normalizeHex(value),
  );

  return (
    <div
      className={`lesson-annotator-color-picker${compact ? " lesson-annotator-color-picker--compact" : ""}`}
      aria-label={`${label} color`}
    >
      {MAIN_COLOR_PRESETS.map((color) => (
        <button
          key={color}
          type="button"
          className={`lesson-annotator-swatch${
            normalizeHex(value) === normalizeHex(color) ? " active" : ""
          }`}
          style={{ "--swatch": color }}
          onClick={() => onChange(color)}
          title={`${label}: ${color}`}
          aria-label={`${label} color ${color}`}
        />
      ))}
      <button
        type="button"
        className={`lesson-annotator-palette-btn${isCustomColor ? " active" : ""}`}
        style={isCustomColor ? { "--picked-color": value } : undefined}
        onClick={() => paletteInputRef.current?.click()}
        title="Choose any color"
        aria-label={`${label} custom color palette`}
      />
      <input
        ref={paletteInputRef}
        type="color"
        className="lesson-annotator-palette-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        tabIndex={-1}
        aria-hidden
      />
    </div>
  );
}

function AnnotationLabel({
  label,
  canAdjust,
  isEditing,
  onStartEdit,
  onSave,
  onDelete,
  onMove,
  onResize,
  stageRef,
}) {
  const [draft, setDraft] = useState(label.text);
  const [livePos, setLivePos] = useState(null);
  const [liveSize, setLiveSize] = useState(null);
  const dragState = useRef(null);
  const resizeState = useRef(null);

  useEffect(() => {
    if (isEditing) setDraft(label.text);
  }, [isEditing, label.text]);

  const finishDrag = useCallback(
    (event) => {
      const state = dragState.current;
      dragState.current = null;
      setLivePos(null);

      if (!state?.moved) return;

      const stage = stageRef.current;
      if (!stage) return;
      const point = getPoint(event, stage);
      onMove(label.id, {
        x: state.originX + (point.x - state.startX),
        y: state.originY + (point.y - state.startY),
      });
    },
    [label.id, onMove, stageRef],
  );

  const finishResize = useCallback(
    (event) => {
      const state = resizeState.current;
      resizeState.current = null;
      setLiveSize(null);
      if (!state?.moved) return;

      const stage = stageRef.current;
      if (!stage) return;
      const point = getPoint(event, stage);
      const width = Math.max(
        LABEL_MIN_W,
        state.originW + (point.x - state.startX),
      );
      const height = Math.max(
        LABEL_MIN_H,
        state.originH + (point.y - state.startY),
      );
      onResize?.(label.id, { width, height });
    },
    [label.id, onResize, stageRef],
  );

  useEffect(() => {
    const onMoveEvent = (event) => {
      const drag = dragState.current;
      const resize = resizeState.current;
      const stage = stageRef.current;
      if (!stage) return;
      const point = getPoint(event, stage);

      if (resize) {
        const dx = point.x - resize.startX;
        const dy = point.y - resize.startY;
        if (!resize.moved && Math.hypot(dx, dy) >= DRAG_THRESHOLD) {
          resize.moved = true;
        }
        if (resize.moved) {
          setLiveSize({
            width: Math.max(LABEL_MIN_W, resize.originW + dx),
            height: Math.max(LABEL_MIN_H, resize.originH + dy),
          });
        }
        return;
      }

      if (!drag) return;
      const dx = point.x - drag.startX;
      const dy = point.y - drag.startY;

      if (!drag.moved && Math.hypot(dx, dy) >= DRAG_THRESHOLD) {
        drag.moved = true;
      }

      if (drag.moved) {
        setLivePos({
          x: drag.originX + dx,
          y: drag.originY + dy,
        });
      }
    };

    const onUp = (event) => {
      if (resizeState.current) finishResize(event);
      else finishDrag(event);
    };

    window.addEventListener("mousemove", onMoveEvent);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMoveEvent);
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMoveEvent);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMoveEvent);
      window.removeEventListener("touchend", onUp);
    };
  }, [finishDrag, finishResize, stageRef]);

  const handleDragStart = (event) => {
    if (!canAdjust || isEditing) return;
    if (event.target.closest(".lesson-annotator-label-edit")) return;
    if (event.target.closest(".lesson-annotator-label-resize")) return;
    event.stopPropagation();
    event.preventDefault();

    const stage = stageRef.current;
    if (!stage) return;
    const point = getPoint(event, stage);
    dragState.current = {
      startX: point.x,
      startY: point.y,
      originX: label.x,
      originY: label.y,
      moved: false,
    };
  };

  const handleResizeStart = (event) => {
    if (!canAdjust && !isEditing) return;
    event.stopPropagation();
    event.preventDefault();

    const stage = stageRef.current;
    if (!stage) return;
    const point = getPoint(event, stage);
    const el = event.currentTarget.parentElement;
    const rect = el?.getBoundingClientRect();
    resizeState.current = {
      startX: point.x,
      startY: point.y,
      originW: label.width || rect?.width || 180,
      originH: label.height || rect?.height || 56,
      moved: false,
    };
  };

  const position = livePos || { x: label.x, y: label.y };
  const size = liveSize || {
    width: label.width || undefined,
    height: label.height || undefined,
  };
  const boxStyle = {
    left: position.x,
    top: position.y,
    ...(size.width ? { width: size.width, maxWidth: "none" } : null),
    ...(size.height ? { minHeight: size.height, height: size.height } : null),
  };

  if (isEditing) {
    return (
      <div
        className="lesson-annotator-label lesson-annotator-label--editing"
        style={boxStyle}
        onMouseDown={(event) => event.stopPropagation()}
        onTouchStart={(event) => event.stopPropagation()}
      >
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={3}
          autoFocus
          aria-label="Edit note"
          style={
            size.height
              ? { height: `calc(${size.height}px - 52px)`, minHeight: 48 }
              : undefined
          }
        />
        <div className="lesson-annotator-label-actions">
          <button
            type="button"
            onClick={() => onSave(label.id, draft)}
            disabled={!draft.trim()}
          >
            Save
          </button>
          <button type="button" onClick={() => onStartEdit(null)}>
            Cancel
          </button>
          <button
            type="button"
            className="lesson-annotator-label-delete"
            onClick={() => onDelete(label.id)}
          >
            Delete
          </button>
        </div>
        <button
          type="button"
          className="lesson-annotator-label-resize"
          aria-label="Resize note"
          title="Drag to resize"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
        />
      </div>
    );
  }

  return (
    <div
      className={`lesson-annotator-label${canAdjust ? " lesson-annotator-label--interactive" : ""}${livePos || liveSize ? " lesson-annotator-label--dragging" : ""}`}
      style={boxStyle}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onDoubleClick={(event) => {
        if (!canAdjust) return;
        event.stopPropagation();
        onStartEdit(label.id);
      }}
    >
      {canAdjust ? (
        <span className="lesson-annotator-label-grip" aria-hidden>
          <GripVertical size={12} />
        </span>
      ) : null}
      <span className="lesson-annotator-label-text">{label.text}</span>
      {canAdjust ? (
        <button
          type="button"
          className="lesson-annotator-label-edit"
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onStartEdit(label.id);
          }}
          aria-label="Edit note"
        >
          <PenLine size={12} />
        </button>
      ) : null}
      {canAdjust ? (
        <button
          type="button"
          className="lesson-annotator-label-resize"
          aria-label="Resize note"
          title="Drag to resize"
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
        />
      ) : null}
    </div>
  );
}

export default function LessonAnnotator({
  storageKey,
  children,
  courseId = null,
  lessonId = null,
  tab = "theory",
}) {
  const { token, isAuthenticated } = useAuth();
  const stageRef = useRef(null);
  const contentRef = useRef(null);
  const canvasRef = useRef(null);
  const fabRef = useRef(null);
  const fabDragRef = useRef(null);
  const drawingRef = useRef(false);
  const currentStrokeRef = useRef(null);
  const prefsRef = useRef(loadAnnotationPrefs());
  /** Only save annotations for the key currently loaded into state. */
  const loadedKeyRef = useRef(storageKey);
  /** Skip one save after loading a tab so we never write the previous tab's notes. */
  const skipNextSaveRef = useRef(true);
  const syncTimerRef = useRef(null);
  const remoteUpdatedAtRef = useRef(null);

  const [tool, setTool] = useState(TOOLS.POINTER);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pencilColor, setPencilColor] = useState(prefsRef.current.pencilColor);
  const [laserColor, setLaserColor] = useState(prefsRef.current.laserColor);
  const [strokes, setStrokes] = useState(
    () => loadAnnotations(storageKey).strokes,
  );
  const [labels, setLabels] = useState(
    () => loadAnnotations(storageKey).labels,
  );
  const [textDraft, setTextDraft] = useState("");
  const [pendingTextPoint, setPendingTextPoint] = useState(null);
  const [laserPoint, setLaserPoint] = useState(null);
  const [editingLabelId, setEditingLabelId] = useState(null);
  const [fabPosition, setFabPosition] = useState(() => loadFabPosition());
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
  const [pendingTextSize, setPendingTextSize] = useState({
    width: 220,
    height: 120,
  });
  const pendingResizeRef = useRef(null);

  const fabWrapStyle = useMemo(() => {
    if (!fabPosition) return undefined;
    return {
      left: `${fabPosition.x}px`,
      top: `${fabPosition.y}px`,
      right: "auto",
      bottom: "auto",
    };
  }, [fabPosition]);

  const redrawCanvas = useCallback((nextStrokes) => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nextStrokes.forEach((stroke) => drawStroke(ctx, stroke));
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!canvas || !stage || !content) return;

    const width = stage.clientWidth;
    const height = content.offsetHeight;
    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.max(1, Math.floor(width * ratio));
    canvas.height = Math.max(1, Math.floor(height * ratio));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    redrawCanvas(strokes);
  }, [redrawCanvas, strokes]);

  useEffect(() => {
    const handleResize = () => {
      setFabPosition((current) => {
        if (!current) return current;
        const clamped = clampFabPosition(current.x, current.y);
        if (clamped.x === current.x && clamped.y === current.y) return current;
        saveFabPosition(clamped);
        return clamped;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const saved = loadAnnotations(storageKey);
    skipNextSaveRef.current = true;
    loadedKeyRef.current = storageKey;
    remoteUpdatedAtRef.current = null;
    setStrokes(saved.strokes);
    setLabels(saved.labels);
    setPendingTextPoint(null);
    setTextDraft("");
    setLaserPoint(null);
    setEditingLabelId(null);
    drawingRef.current = false;
    currentStrokeRef.current = null;

    if (!isAuthenticated || !token || !courseId || !lessonId) return undefined;

    let cancelled = false;
    getLessonAnnotation(token, courseId, lessonId, tab || "theory")
      .then((annotation) => {
        if (cancelled || loadedKeyRef.current !== storageKey) return;
        const remoteStrokes = annotation?.strokes || [];
        const remoteLabels = annotation?.labels || [];
        const hasRemote = remoteStrokes.length > 0 || remoteLabels.length > 0;
        if (!hasRemote) return;
        remoteUpdatedAtRef.current = annotation?.updatedAt || null;
        skipNextSaveRef.current = true;
        setStrokes(remoteStrokes);
        setLabels(remoteLabels);
        saveAnnotations(storageKey, {
          strokes: remoteStrokes,
          labels: remoteLabels,
        });
      })
      .catch(() => {
        /* keep local */
      });

    return () => {
      cancelled = true;
    };
  }, [storageKey, isAuthenticated, token, courseId, lessonId, tab]);

  useEffect(() => {
    // Avoid writing theory notes into the challenge key (and vice versa)
    // when the tab changes before state has been swapped.
    if (loadedKeyRef.current !== storageKey) return;
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }
    saveAnnotations(storageKey, { strokes, labels });

    if (!isAuthenticated || !token || !courseId || !lessonId) return undefined;

    window.clearTimeout(syncTimerRef.current);
    syncTimerRef.current = window.setTimeout(() => {
      putLessonAnnotation(token, courseId, lessonId, tab || "theory", {
        strokes,
        labels,
      }).catch((error) => {
        console.warn("Annotation sync failed:", error.message);
      });
    }, 1500);

    return () => {
      window.clearTimeout(syncTimerRef.current);
    };
  }, [
    storageKey,
    strokes,
    labels,
    isAuthenticated,
    token,
    courseId,
    lessonId,
    tab,
  ]);

  useEffect(() => {
    saveAnnotationPrefs({ pencilColor, laserColor });
  }, [pencilColor, laserColor]);

  useEffect(() => {
    redrawCanvas(strokes);
  }, [strokes, redrawCanvas]);

  useEffect(() => {
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!stage || !content) return undefined;

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(content);
    observer.observe(stage);

    return () => {
      observer.disconnect();
    };
  }, [resizeCanvas]);

  useEffect(() => {
    setPendingTextPoint(null);
    setTextDraft("");
    setLaserPoint(null);
    setEditingLabelId(null);
  }, [tool, storageKey]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleOutside = (event) => {
      if (fabRef.current?.contains(event.target)) return;
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [menuOpen]);

  const eraseAt = useCallback((point) => {
    setStrokes((prev) =>
      prev.filter((stroke) => !strokeNearPoint(stroke, point, ERASER_RADIUS)),
    );
    setLabels((prev) =>
      prev.filter(
        (label) => Math.hypot(label.x - point.x, label.y - point.y) > 24,
      ),
    );
  }, []);

  const isMarkupTool = tool !== TOOLS.POINTER;
  const canAdjustLabels = tool === TOOLS.POINTER;

  const stageCursor = useMemo(() => {
    if (tool === TOOLS.PENCIL) return getPencilCursor(pencilColor);
    if (tool === TOOLS.LASER) return undefined;
    if (tool === TOOLS.ERASER || tool === TOOLS.TEXT) return TOOL_CURSORS[tool];
    return undefined;
  }, [tool, pencilColor]);

  const activeToolItem =
    TOOL_ITEMS.find((item) => item.id === tool) || TOOL_ITEMS[0];
  const ActiveIcon = activeToolItem.Icon;

  const selectTool = (nextTool) => {
    setTool(nextTool);
    setMenuOpen(false);
  };

  const handleStageMove = (event) => {
    if (event.target.closest(STAGE_INTERACTIVE_SELECTOR)) {
      return;
    }

    const stage = stageRef.current;
    if (!stage) return;

    if (tool === TOOLS.LASER) {
      setLaserPoint(getPoint(event, stage));
    }
  };

  const handleStageLeave = () => {
    setLaserPoint(null);
    handlePointerUp();
  };

  const handlePointerDown = (event) => {
    if (tool === TOOLS.POINTER) return;
    if (event.target.closest(STAGE_INTERACTIVE_SELECTOR)) {
      return;
    }

    const stage = stageRef.current;
    if (!stage) return;

    event.preventDefault();
    const point = getPoint(event, stage);

    if (tool === TOOLS.LASER) {
      setLaserPoint(point);
      return;
    }

    if (tool === TOOLS.PENCIL) {
      drawingRef.current = true;
      currentStrokeRef.current = {
        color: pencilColor,
        width: STROKE_WIDTH,
        points: [[point.x, point.y]],
      };
      return;
    }

    if (tool === TOOLS.ERASER) {
      eraseAt(point);
      drawingRef.current = true;
      return;
    }

    if (tool === TOOLS.TEXT) {
      setPendingTextPoint(point);
      setTextDraft("");
      setPendingTextSize({ width: 220, height: 120 });
      setEditingLabelId(null);
    }
  };

  const handlePointerMove = (event) => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage) return;

    if (tool === TOOLS.LASER) {
      setLaserPoint(getPoint(event, stage));
      return;
    }

    if (!canvas || !drawingRef.current) return;

    event.preventDefault();
    const point = getPoint(event, stage);

    if (tool === TOOLS.PENCIL && currentStrokeRef.current) {
      currentStrokeRef.current.points.push([point.x, point.y]);
      const ctx = canvas.getContext("2d");
      const pts = currentStrokeRef.current.points;
      const [x1, y1] = pts[pts.length - 2];
      const [x2, y2] = pts[pts.length - 1];
      drawStroke(ctx, {
        color: pencilColor,
        width: STROKE_WIDTH,
        points: [
          [x1, y1],
          [x2, y2],
        ],
      });
      return;
    }

    if (tool === TOOLS.ERASER) {
      eraseAt(point);
    }
  };

  const handlePointerUp = () => {
    if (tool === TOOLS.PENCIL && currentStrokeRef.current) {
      const finished = currentStrokeRef.current;
      if (finished.points.length > 1) {
        setStrokes((prev) => [...prev, finished]);
      }
    }
    drawingRef.current = false;
    currentStrokeRef.current = null;
  };

  const handleAddLabel = () => {
    const text = textDraft.trim();
    if (!text || !pendingTextPoint) return;

    const newId = `${Date.now()}`;
    setLabels((prev) => [
      ...prev,
      {
        id: newId,
        x: pendingTextPoint.x,
        y: pendingTextPoint.y,
        text,
        width: pendingTextSize.width,
        height: pendingTextSize.height,
      },
    ]);
    setPendingTextPoint(null);
    setTextDraft("");
    setPendingTextSize({ width: 220, height: 120 });
    setTool(TOOLS.POINTER);
    setEditingLabelId(newId);
  };

  const handleSaveLabel = (labelId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setLabels((prev) =>
      prev.map((label) =>
        label.id === labelId ? { ...label, text: trimmed } : label,
      ),
    );
    setEditingLabelId(null);
  };

  const handleMoveLabel = (labelId, position) => {
    setLabels((prev) =>
      prev.map((label) =>
        label.id === labelId ? { ...label, ...position } : label,
      ),
    );
  };

  const handleResizeLabel = (labelId, size) => {
    setLabels((prev) =>
      prev.map((label) =>
        label.id === labelId ? { ...label, ...size } : label,
      ),
    );
  };

  const handlePendingTextResizeStart = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const stage = stageRef.current;
    if (!stage || !pendingTextPoint) return;
    const point = getPoint(event, stage);
    pendingResizeRef.current = {
      startX: point.x,
      startY: point.y,
      originW: pendingTextSize.width,
      originH: pendingTextSize.height,
    };

    const onMove = (moveEvent) => {
      const state = pendingResizeRef.current;
      if (!state) return;
      const p = getPoint(moveEvent, stage);
      setPendingTextSize({
        width: Math.max(
          TEXT_INPUT_MIN_W,
          state.originW + (p.x - state.startX),
        ),
        height: Math.max(
          TEXT_INPUT_MIN_H,
          state.originH + (p.y - state.startY),
        ),
      });
    };

    const onUp = () => {
      pendingResizeRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
  };

  const handleDeleteLabel = (labelId) => {
    setLabels((prev) => prev.filter((label) => label.id !== labelId));
    setEditingLabelId(null);
  };

  const handleClearAll = () => {
    setStrokes([]);
    setLabels([]);
    setPendingTextPoint(null);
    setTextDraft("");
    setLaserPoint(null);
    setEditingLabelId(null);
  };

  const handleFabPointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();

    const wrap = fabRef.current;
    if (!wrap) return;

    const pointer = event.touches?.[0] || event;
    const rect = wrap.getBoundingClientRect();
    const startX = pointer.clientX;
    const startY = pointer.clientY;
    const origin = fabPosition || { x: rect.left, y: rect.top };

    fabDragRef.current = {
      startX,
      startY,
      originX: origin.x,
      originY: origin.y,
      dragged: false,
    };

    const onMove = (moveEvent) => {
      const state = fabDragRef.current;
      if (!state) return;

      const movePointer = moveEvent.touches?.[0] || moveEvent;
      const dx = movePointer.clientX - state.startX;
      const dy = movePointer.clientY - state.startY;

      if (!state.dragged && Math.hypot(dx, dy) < FAB_DRAG_THRESHOLD) {
        return;
      }

      state.dragged = true;
      setMenuOpen(false);
      const next = clampFabPosition(state.originX + dx, state.originY + dy);
      setFabPosition(next);
    };

    const onUp = (upEvent) => {
      const state = fabDragRef.current;
      fabDragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);

      if (state?.dragged) {
        const upPointer = upEvent?.changedTouches?.[0] || upEvent;
        if (upPointer?.clientX != null) {
          const dx = upPointer.clientX - state.startX;
          const dy = upPointer.clientY - state.startY;
          const saved = clampFabPosition(
            state.originX + dx,
            state.originY + dy,
          );
          setFabPosition(saved);
          saveFabPosition(saved);
        }
        return;
      }

      setMenuOpen((open) => !open);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);
  };

  const fabUi =
    typeof document !== "undefined" ? (
      <div
        ref={fabRef}
        className="lesson-annotator-fab-wrap"
        style={fabWrapStyle}
      >
        <button
          type="button"
          className={`lesson-annotator-fab${menuOpen ? " lesson-annotator-fab--open" : ""}`}
          onMouseDown={handleFabPointerDown}
          onTouchStart={handleFabPointerDown}
          aria-label={menuOpen ? "Close markup tools" : "Open markup tools"}
          aria-expanded={menuOpen}
          title="Drag to move · click to open tools"
        >
          <ActiveIcon size={18} aria-hidden />
        </button>

        {menuOpen ? (
          <div
            className="lesson-annotator-fab-menu"
            role="menu"
            aria-label="Markup tools"
          >
            <div className="lesson-annotator-fab-menu-head">
              <span>Markup · drag button to move</span>
              <button
                type="button"
                className="lesson-annotator-fab-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close tools"
              >
                <X size={14} />
              </button>
            </div>

            <div className="lesson-annotator-fab-tools">
              {TOOL_ITEMS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="menuitem"
                  className={tool === id ? "active" : ""}
                  onClick={() => selectTool(id)}
                  title={label}
                >
                  <Icon size={16} aria-hidden />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {tool === TOOLS.PENCIL || tool === TOOLS.LASER ? (
              <div className="lesson-annotator-fab-colors">
                <span>
                  {tool === TOOLS.PENCIL ? "Pencil color" : "Laser color"}
                </span>
                <ColorPicker
                  label={tool === TOOLS.PENCIL ? "Pencil" : "Laser"}
                  value={tool === TOOLS.PENCIL ? pencilColor : laserColor}
                  onChange={
                    tool === TOOLS.PENCIL ? setPencilColor : setLaserColor
                  }
                  compact
                />
              </div>
            ) : null}

            <button
              type="button"
              className="lesson-annotator-fab-whiteboard"
              onClick={() => {
                setWhiteboardOpen(true);
                setMenuOpen(false);
                setTool(TOOLS.POINTER);
              }}
            >
              <Presentation size={14} aria-hidden />
              Open whiteboard
            </button>

            <button
              type="button"
              className="lesson-annotator-fab-clear"
              onClick={handleClearAll}
            >
              <Trash2 size={14} aria-hidden />
              Clear all markup
            </button>

            {canAdjustLabels ? (
              <p className="lesson-annotator-fab-hint">
                Drag notes to move · corner to resize · double-click or ✎ to
                edit
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    ) : null;

  return (
    <div
      className={`lesson-annotator lesson-annotator--tool-${tool}${
        isMarkupTool ? " lesson-annotator--active" : ""
      }`}
    >
      <div
        ref={stageRef}
        className="lesson-annotator-stage"
        style={stageCursor ? { cursor: stageCursor } : undefined}
        onMouseDown={handlePointerDown}
        onMouseMove={(event) => {
          handleStageMove(event);
          handlePointerMove(event);
        }}
        onMouseUp={handlePointerUp}
        onMouseLeave={handleStageLeave}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <div ref={contentRef} className="lesson-annotator-content">
          {children}
        </div>

        <canvas
          ref={canvasRef}
          className={`lesson-annotator-canvas${isMarkupTool && tool !== TOOLS.LASER ? " is-active" : ""}`}
          style={stageCursor ? { cursor: stageCursor } : undefined}
          aria-hidden
        />

        {tool === TOOLS.LASER && laserPoint ? (
          <div
            className="lesson-annotator-laser-dot"
            style={{
              left: laserPoint.x,
              top: laserPoint.y,
              "--laser-color": laserColor,
            }}
            aria-hidden
          />
        ) : null}

        <div
          className={`lesson-annotator-labels${canAdjustLabels ? " lesson-annotator-labels--interactive" : ""}`}
        >
          {labels.map((label) => (
            <AnnotationLabel
              key={label.id}
              label={label}
              canAdjust={canAdjustLabels}
              isEditing={editingLabelId === label.id}
              onStartEdit={setEditingLabelId}
              onSave={handleSaveLabel}
              onDelete={handleDeleteLabel}
              onMove={handleMoveLabel}
              onResize={handleResizeLabel}
              stageRef={stageRef}
            />
          ))}
        </div>

        {pendingTextPoint ? (
          <div
            className="lesson-annotator-text-input"
            style={{
              left: pendingTextPoint.x,
              top: pendingTextPoint.y,
              width: pendingTextSize.width,
              height: pendingTextSize.height,
              maxWidth: "none",
            }}
            onMouseDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
          >
            <textarea
              value={textDraft}
              onChange={(event) => setTextDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleAddLabel();
                }
                if (event.key === "Escape") setPendingTextPoint(null);
              }}
              placeholder="Type a note..."
              rows={3}
              autoFocus
              style={{
                height: `calc(${pendingTextSize.height}px - 48px)`,
                minHeight: 48,
                resize: "none",
              }}
            />
            <div className="lesson-annotator-label-actions">
              <button
                type="button"
                onClick={handleAddLabel}
                disabled={!textDraft.trim()}
              >
                Add
              </button>
              <button type="button" onClick={() => setPendingTextPoint(null)}>
                Cancel
              </button>
            </div>
            <button
              type="button"
              className="lesson-annotator-label-resize"
              aria-label="Resize text box"
              title="Drag to resize"
              onMouseDown={handlePendingTextResizeStart}
              onTouchStart={handlePendingTextResizeStart}
            />
          </div>
        ) : null}
      </div>

      {fabUi ? createPortal(fabUi, document.body) : null}
      <LessonWhiteboard
        open={whiteboardOpen}
        onClose={() => setWhiteboardOpen(false)}
        storageKey={storageKey}
      />
    </div>
  );
}
