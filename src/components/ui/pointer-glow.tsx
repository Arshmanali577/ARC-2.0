"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * A soft light that tracks the pointer across a card.
 *
 * The homepage's cards are large, flat and quiet — four navy cells, eight
 * suburb tiles — and a flat colour change on hover tells you only *that* a
 * card is live. A light that follows the pointer tells you *where* you are in
 * it, which is what makes a grid of eight feel like a surface rather than
 * eight buttons.
 *
 * Written to be as close to free as motion on this site gets:
 *
 *  - **Two custom properties, no state.** The handler writes `--glow-x` and
 *    `--glow-y` straight to the node, so a move costs one style write and
 *    repaints one gradient. Nothing re-renders.
 *  - **Pointer only.** `(hover: hover) and (pointer: fine)` gates the listener,
 *    so a phone never runs it and a tap is a tap.
 *  - **Reduced motion turns it off**, like everything else here.
 *
 * The gradient itself lives in `globals.css` as `pointer-lit` /
 * `pointer-lit-soft`, so the colour stays with the rest of the palette.
 */
export function PointerGlow({
  children,
  /** `gold` for a navy ground, `navy` for a light one. */
  tone = "gold",
  className,
}: {
  children: ReactNode;
  tone?: "gold" | "navy";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
      node.style.setProperty("--glow-x", `${event.clientX - box.left}px`);
      node.style.setProperty("--glow-y", `${event.clientY - box.top}px`);
    };

    node.addEventListener("pointermove", move);
    return () => {
      node.removeEventListener("pointermove", move);
      node.style.removeProperty("--glow-x");
      node.style.removeProperty("--glow-y");
    };
  }, []);

  return (
    <div ref={ref} className={cn("group/glow relative", className)}>
      {/* Under the content, over the card's own ground. Fades in rather than
          appearing, so moving along a row of cards reads as one light passing
          across them instead of four lights switching on. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover/glow:opacity-100 motion-reduce:hidden",
          tone === "gold" ? "pointer-lit" : "pointer-lit-soft",
        )}
      />
      {children}
    </div>
  );
}
