"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * A small disc that rides the cursor while it is over a region, carrying one
 * word: what this region does if you act on it.
 *
 * Used on the two places on the homepage where the affordance is not written
 * anywhere else — the featured band, which pages sideways, and the services
 * collage, which is a photograph you can open. A carousel that can be dragged
 * and never says so is a carousel most visitors will only ever click the
 * arrows on.
 *
 * The same three rules as `Magnetic` and `PointerGlow`: pointer devices only,
 * transforms written straight to the node with no state and no re-render, and
 * nothing at all under `prefers-reduced-motion`. The disc is
 * `pointer-events-none` throughout, so it never intercepts the click it is
 * advertising.
 */
export function PointerLabel({
  label,
  children,
  /** `light` is the disc for a dark photograph; `dark` for a pale ground. */
  tone = "light",
  className,
}: {
  label: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    const disc = discRef.current;
    if (!node || !disc) return;

    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    /* The disc is parked at the pointer on the way in *before* it is shown, so
       it grows out of the cursor rather than flying in from the last place the
       cursor happened to leave it. */
    const place = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      disc.style.transform = `translate3d(${event.clientX - box.left}px, ${
        event.clientY - box.top
      }px, 0) translate(-50%, -50%)`;
    };

    const enter = (event: PointerEvent) => {
      place(event);
      disc.style.opacity = "1";
      disc.style.scale = "1";
    };

    const leave = () => {
      disc.style.opacity = "0";
      disc.style.scale = "0.4";
    };

    node.addEventListener("pointerenter", enter);
    node.addEventListener("pointermove", place);
    node.addEventListener("pointerleave", leave);

    return () => {
      node.removeEventListener("pointerenter", enter);
      node.removeEventListener("pointermove", place);
      node.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {children}

      {/* `scale` rather than a scale transform, so the settle composes with the
          `translate3d` the handler writes instead of overwriting it — the same
          reason the reveal keyframes are written the way they are. */}
      <span
        ref={discRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 top-0 z-40 hidden size-[86px] select-none items-center justify-center rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-[2px] transition-[opacity,scale] duration-300 ease-out nav:flex motion-reduce:hidden",
          tone === "light"
            ? "border border-white/40 bg-ink/45 text-white"
            : "border border-line-strong bg-white/80 text-brand",
        )}
        style={{ opacity: 0, scale: "0.4" }}
      >
        {label}
      </span>
    </div>
  );
}
