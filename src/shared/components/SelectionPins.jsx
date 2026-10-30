import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const HIGHLIGHT_NAME = "polycode-selection-pins";

function canUseHighlights() {
  return typeof CSS !== "undefined" && CSS.highlights && window.Highlight;
}

function getCaretRangeFromPoint(x, y) {
  if (document.caretRangeFromPoint) {
    return document.caretRangeFromPoint(x, y);
  }

  if (document.caretPositionFromPoint) {
    const position = document.caretPositionFromPoint(x, y);
    if (!position) return null;

    const range = document.createRange();
    range.setStart(position.offsetNode, position.offset);
    range.collapse(true);
    return range;
  }

  return null;
}

function isEditableTarget(target) {
  return !!target.closest?.(
    "input, textarea, select, [contenteditable='true'], .monaco-editor",
  );
}

export default function SelectionPins() {
  const location = useLocation();
  const rangesRef = useRef([]);

  useEffect(() => {
    if (!canUseHighlights()) return undefined;

    const syncHighlights = () => {
      CSS.highlights.set(
        HIGHLIGHT_NAME,
        new window.Highlight(...rangesRef.current),
      );
    };

    const clearHighlights = () => {
      rangesRef.current = [];
      CSS.highlights.delete(HIGHLIGHT_NAME);
    };

    const removeRangeAtPoint = (pointRange) => {
      const index = rangesRef.current.findIndex((range) => {
        try {
          return range.isPointInRange(
            pointRange.startContainer,
            pointRange.startOffset,
          );
        } catch {
          return false;
        }
      });

      if (index === -1) return false;
      rangesRef.current.splice(index, 1);
      syncHighlights();
      return true;
    };

    const handleContextMenu = (event) => {
      if (isEditableTarget(event.target)) return;

      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();

      if (selection && selectedText && selection.rangeCount > 0) {
        event.preventDefault();
        const range = selection.getRangeAt(0).cloneRange();
        rangesRef.current.push(range);
        syncHighlights();
        selection.removeAllRanges();
        return;
      }

      const pointRange = getCaretRangeFromPoint(event.clientX, event.clientY);
      if (pointRange && removeRangeAtPoint(pointRange)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu, true);
    syncHighlights();

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, true);
      clearHighlights();
    };
  }, []);

  useEffect(() => {
    rangesRef.current = [];
    if (canUseHighlights()) CSS.highlights.delete(HIGHLIGHT_NAME);
  }, [location.pathname]);

  return null;
}
