"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Leans its child towards the cursor while the cursor is over it, and lets it
 * settle back when the cursor leaves.
 *
 * Used on the two or three actions a page actually wants you to take — the
 * hero's primary, the enquire panel's — and nowhere else. A page where
 * everything follows the pointer reads as a demo, not as a building company.
 *
 * Three things keep it honest:
 *
 *  - **Pointer only.** `(hover: hover) and (pointer: fine)` means a phone or a
 *    tablet never runs any of this, so a tap is a tap.
 *  - **Transform only**, written straight to the node from a pointer handler
 *    on the element itself. No scroll listener, no state, no re-render, and
 *    nothing the compositor cannot do on its own thread.
 *  - **Reduced motion turns it off**, like every other piece of movement here.
 *
 * The child keeps its own hover transition — this wrapper is a separate
 * element, so the `translate`/`scale` utilities on a `Button` inside it still
 * apply and the two compose instead of one overriding the other.
 */
export function Magnetic({
  children,
  /** How far the child may lean, in px. Kept small: this is a hint, not a pull. */
  strength = 7,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const move = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      const x = (event.clientX - (box.left + box.width / 2)) / (box.width / 2);
      const y = (event.clientY - (box.top + box.height / 2)) / (box.height / 2);
      node.style.transition = "transform 120ms ease-out";
      node.style.transform = `translate(${x * strength}px, ${y * strength * 0.6}px)`;
    };

    const reset = () => {
      // Slower on the way out than on the way in, so the action settles rather
      // than snapping back the moment the cursor clears it.
      node.style.transition = "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)";
      node.style.transform = "";
    };

    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", reset);

    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", reset);
      node.style.transform = "";
      node.style.transition = "";
    };
  }, [strength]);

  return (
    <span ref={ref} className={cn("inline-flex", className)}>
      {children}
    </span>
  );
}
