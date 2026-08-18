"use client";

import { useRef } from "react";

/** Below this the gesture is a tap or a scroll, not a swipe. */
const THRESHOLD = 44;

/**
 * Touch paging for the stage and the lightbox.
 *
 * Deliberately passive: the handlers never call `preventDefault`, so a vertical
 * drag still scrolls the page. A gesture only counts when it travels further
 * horizontally than vertically, which is what stops a scroll that drifts a few
 * pixels sideways from skipping an image.
 */
export function useSwipe(onPrevious: () => void, onNext: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart: (event: React.TouchEvent) => {
      const touch = event.changedTouches[0];
      start.current = { x: touch.clientX, y: touch.clientY };
    },
    onTouchEnd: (event: React.TouchEvent) => {
      if (!start.current) return;

      const touch = event.changedTouches[0];
      const dx = touch.clientX - start.current.x;
      const dy = touch.clientY - start.current.y;
      start.current = null;

      if (Math.abs(dx) < THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;

      if (dx < 0) onNext();
      else onPrevious();
    },
  };
}
