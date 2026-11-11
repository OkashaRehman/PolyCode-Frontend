import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Maximize2, Minimize2, X } from "lucide-react";

const MIN_W = 360;
const MIN_H = 280;
const DEFAULT_W = 720;
const DEFAULT_H = 520;
const EDGE = 10;
const MSG_SOURCE = "polycode-excalidraw";

function whiteboardStorageKey(storageKey) {
  return `polycode_whiteboard_${storageKey || "default"}`;
}

function whiteboardLayoutKey(storageKey) {
  return `polycode_whiteboard_layout_${storageKey || "default"}`;
}

function clampLayout(layout) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(
    Math.max(MIN_W, layout.width || DEFAULT_W),
    Math.max(MIN_W, vw - 16),
  );
  const height = Math.min(
    Math.max(MIN_H, layout.height || DEFAULT_H),
    Math.max(MIN_H, vh - 16),
  );
  const x = Math.min(Math.max(8, layout.x ?? 48), Math.max(8, vw - width - 8));
  const y = Math.min(Math.max(8, layout.y ?? 72), Math.max(8, vh - height - 8));
  return { x, y, width, height };
}

function loadLayout(storageKey) {
  try {
    const raw = localStorage.getItem(whiteboardLayoutKey(storageKey));
    if (!raw) {
      return clampLayout({
        x: Math.max(48, window.innerWidth - DEFAULT_W - 48),
        y: 72,
        width: DEFAULT_W,
        height: DEFAULT_H,
      });
    }
    return clampLayout(JSON.parse(raw));
  } catch {
    return clampLayout({
      x: 48,
      y: 72,
      width: DEFAULT_W,
      height: DEFAULT_H,
    });
  }
}

function saveLayout(storageKey, layout) {
  try {
    localStorage.setItem(
      whiteboardLayoutKey(storageKey),
      JSON.stringify(layout),
    );
  } catch {
    // ignore quota
  }
}

function loadScene(storageKey) {
  try {
    const raw = localStorage.getItem(whiteboardStorageKey(storageKey));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      elements: Array.isArray(parsed.elements) ? parsed.elements : [],
      appState:
        parsed.appState && typeof parsed.appState === "object"
          ? parsed.appState
          : undefined,
      files:
        parsed.files && typeof parsed.files === "object" ? parsed.files : {},
    };
  } catch {
    return null;
  }
}

function saveScene(storageKey, elements, appState, files) {
  try {
    localStorage.setItem(
      whiteboardStorageKey(storageKey),
      JSON.stringify({
        elements,
        appState,
        files: files || {},
      }),
    );
  } catch {
    // ignore quota
  }
}

function getResizeDir(event, panel) {
  const rect = panel.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const nearL = x <= EDGE;
  const nearR = x >= rect.width - EDGE;
  const nearT = y <= EDGE;
  const nearB = y >= rect.height - EDGE;
  if (nearT && nearL) return "nw";
  if (nearT && nearR) return "ne";
  if (nearB && nearL) return "sw";
  if (nearB && nearR) return "se";
  if (nearL) return "w";
  if (nearR) return "e";
  if (nearT) return "n";
  if (nearB) return "s";
  return null;
}

const CURSOR_FOR_DIR = {
  n: "ns-resize",
  s: "ns-resize",
  e: "ew-resize",
  w: "ew-resize",
  ne: "nesw-resize",
  sw: "nesw-resize",
  nw: "nwse-resize",
  se: "nwse-resize",
};

/**
 * Resizable floating whiteboard.
 * Excalidraw runs in an iframe (own React) to avoid CRA + React 19 conflicts.
 */
export default function LessonWhiteboard({ open, onClose, storageKey }) {
  const panelRef = useRef(null);
  const iframeRef = useRef(null);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const saveTimerRef = useRef(null);
  const sceneRef = useRef(null);

  const [layout, setLayout] = useState(() => loadLayout(storageKey));
  const [maximized, setMaximized] = useState(false);
  const [edgeCursor, setEdgeCursor] = useState(undefined);
  const [frameStatus, setFrameStatus] = useState("loading");
  const [iframeKey, setIframeKey] = useState(0);

  const hostSrc = useMemo(
    () => `${process.env.PUBLIC_URL || ""}/excalidraw-host.html`,
    [],
  );

  const sendInit = useCallback(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      {
        source: MSG_SOURCE,
        type: "init",
        scene: sceneRef.current || {
          elements: [],
          appState: { viewBackgroundColor: "#ffffff" },
          files: {},
        },
      },
      "*",
    );
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    sceneRef.current = loadScene(storageKey) || {
      elements: [],
      appState: { viewBackgroundColor: "#ffffff" },
      files: {},
    };
    setLayout(loadLayout(storageKey));
    setMaximized(false);
    setFrameStatus("loading");
    setIframeKey((k) => k + 1);

    const onMessage = (event) => {
      const data = event.data;
      if (!data || data.source !== MSG_SOURCE) return;

      if (data.type === "host-ready") {
        sendInit();
        return;
      }

      if (data.type === "ready") {
        setFrameStatus("ready");
        return;
      }

      if (data.type === "error") {
        setFrameStatus("error");
        return;
      }

      if (data.type === "change") {
        window.clearTimeout(saveTimerRef.current);
        saveTimerRef.current = window.setTimeout(() => {
          saveScene(
            storageKey,
            data.elements || [],
            data.appState,
            data.files || {},
          );
        }, 200);
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(saveTimerRef.current);
    };
  }, [open, storageKey, sendInit]);

  useEffect(() => {
    if (!open || maximized) return;
    saveLayout(storageKey, layout);
  }, [layout, open, storageKey, maximized]);

  const panelStyle = useMemo(() => {
    if (maximized) {
      return {
        left: 8,
        top: 8,
        width: "calc(100vw - 16px)",
        height: "calc(100vh - 16px)",
      };
    }
    return {
      left: layout.x,
      top: layout.y,
      width: layout.width,
      height: layout.height,
      cursor: edgeCursor || undefined,
    };
  }, [layout, maximized, edgeCursor]);

  const startMove = (event) => {
    if (maximized) return;
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    const pointer = event.touches?.[0] || event;
    dragRef.current = {
      startX: pointer.clientX,
      startY: pointer.clientY,
      originX: layout.x,
      originY: layout.y,
    };

    const onMove = (moveEvent) => {
      const state = dragRef.current;
      if (!state) return;
      const p = moveEvent.touches?.[0] || moveEvent;
      setLayout((prev) =>
        clampLayout({
          ...prev,
          x: state.originX + (p.clientX - state.startX),
          y: state.originY + (p.clientY - state.startY),
        }),
      );
    };

    const onUp = () => {
      dragRef.current = null;
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

  const startResize = (event, dir) => {
    if (maximized || !dir) return;
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const pointer = event.touches?.[0] || event;
    resizeRef.current = {
      dir,
      startX: pointer.clientX,
      startY: pointer.clientY,
      origin: { ...layout },
    };

    const onMove = (moveEvent) => {
      const state = resizeRef.current;
      if (!state) return;
      const p = moveEvent.touches?.[0] || moveEvent;
      const dx = p.clientX - state.startX;
      const dy = p.clientY - state.startY;
      const o = state.origin;
      let next = { ...o };

      if (state.dir.includes("e")) next.width = o.width + dx;
      if (state.dir.includes("s")) next.height = o.height + dy;
      if (state.dir.includes("w")) {
        next.width = o.width - dx;
        next.x = o.x + dx;
      }
      if (state.dir.includes("n")) {
        next.height = o.height - dy;
        next.y = o.y + dy;
      }

      setLayout(clampLayout(next));
    };

    const onUp = () => {
      resizeRef.current = null;
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

  const handlePanelPointerDown = (event) => {
    if (maximized) return;
    if (event.target.closest(".lesson-whiteboard-chrome")) return;
    if (event.target.closest(".lesson-whiteboard-frame")) return;
    const panel = panelRef.current;
    if (!panel) return;
    const dir = getResizeDir(event, panel);
    if (dir) startResize(event, dir);
  };

  const handlePanelPointerMove = (event) => {
    if (maximized || resizeRef.current || dragRef.current) return;
    const panel = panelRef.current;
    if (!panel) return;
    if (event.target.closest(".lesson-whiteboard-frame")) {
      setEdgeCursor(undefined);
      return;
    }
    const dir = getResizeDir(event, panel);
    setEdgeCursor(dir ? CURSOR_FOR_DIR[dir] : undefined);
  };

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={panelRef}
      className={`lesson-whiteboard${maximized ? " lesson-whiteboard--max" : ""}`}
      style={panelStyle}
      role="dialog"
      aria-label="Lesson whiteboard"
      onMouseDown={handlePanelPointerDown}
      onMouseMove={handlePanelPointerMove}
      onMouseLeave={() => setEdgeCursor(undefined)}
    >
      <div
        className="lesson-whiteboard-chrome"
        onMouseDown={startMove}
        onTouchStart={startMove}
      >
        <div className="lesson-whiteboard-title">
          <span className="lesson-whiteboard-dot" aria-hidden />
          Whiteboard
          <span className="lesson-whiteboard-sub">
            Excalidraw · infinite canvas · drag edges to resize
          </span>
        </div>
        <div className="lesson-whiteboard-actions">
          <button
            type="button"
            className="lesson-whiteboard-icon-btn"
            onClick={() => setMaximized((v) => !v)}
            title={maximized ? "Restore size" : "Maximize"}
            aria-label={
              maximized ? "Restore whiteboard size" : "Maximize whiteboard"
            }
          >
            {maximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button
            type="button"
            className="lesson-whiteboard-icon-btn"
            onClick={onClose}
            title="Close whiteboard"
            aria-label="Close whiteboard"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="lesson-whiteboard-canvas">
        {frameStatus === "loading" ? (
          <div className="lesson-whiteboard-loading">Loading whiteboard…</div>
        ) : null}
        {frameStatus === "error" ? (
          <div className="lesson-whiteboard-loading lesson-whiteboard-loading--error">
            Could not load whiteboard. Check your connection, then close and
            reopen.
          </div>
        ) : null}
        <iframe
          key={iframeKey}
          ref={iframeRef}
          className="lesson-whiteboard-frame"
          title="Excalidraw whiteboard"
          src={hostSrc}
          onLoad={sendInit}
        />
      </div>

      {!maximized
        ? ["n", "s", "e", "w", "ne", "nw", "se", "sw"].map((dir) => (
            <div
              key={dir}
              className={`lesson-whiteboard-handle lesson-whiteboard-handle--${dir}`}
              onMouseDown={(event) => startResize(event, dir)}
              onTouchStart={(event) => startResize(event, dir)}
            />
          ))
        : null}
    </div>,
    document.body,
  );
}
