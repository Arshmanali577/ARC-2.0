"use client";

import { useEffect, useRef } from "react";

/**
 * A figure that counts up to itself the first time it is scrolled into view.
 *
 * The site's other motion is CSS on `animation-timeline: view()` and costs no
 * JavaScript; a counter cannot be, because the number itself has to change.
 * So this is deliberately the smallest client component on the site: one
 * observer, one `requestAnimationFrame` loop, no state, no re-render — the
 * text node is written directly.
 *
 * Three rules it has to keep:
 *
 *  1. **The finished value is what renders on the server.** A visitor with no
 *     JavaScript, a crawler, or a browser that never fires the observer all
 *     see `18+`, not `0+` and not an empty box. The run down to the start
 *     value only ever happens on the client, and only for an element that is
 *     still below the fold — which is where every figure on this site sits, so
 *     the reset is never on screen when it happens.
 *  2. **The suffix and the prefix survive.** `18+` counts the 18 and keeps the
 *     `+`; `QBCC` and `Licensed` are not numbers and are left alone entirely.
 *  3. **It runs once.** The observer disconnects on the first entry, so
 *     scrolling back up does not restart it.
 */

/** `18+` → prefix "", digits "18", suffix "+". Null when there is no number. */
function parse(value: string) {
  const match = /^(\D*?)(\d[\d,]*(?:\.\d+)?)([\s\S]*)$/.exec(value);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  const numeric = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(numeric)) return null;

  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;

  return {
    prefix,
    suffix,
    target: numeric,
    decimals,
    grouped: digits.includes(","),
  };
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

type CounterProps = {
  /** The finished figure, exactly as it should read: `18+`, `5.0`, `1,200`. */
  value: string;
  /**
   * Where the run starts. Left unset, it counts from zero — except for a
   * figure in the thousands, which is almost always a year, and rolling
   * `0 → 2024` reads as a bug rather than as a count.
   */
  from?: number;
  /** Milliseconds. Long enough to read as counting, short enough not to wait. */
  duration?: number;
  className?: string;
};

export function Counter({
  value,
  from,
  duration = 1400,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const parsed = parse(value);
    if (!parsed) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const { prefix, suffix, target, decimals, grouped } = parsed;
    const start = from ?? (target >= 1000 ? Math.max(0, target - 30) : 0);
    if (start === target) return;

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const body = grouped
        ? Number(fixed).toLocaleString("en-AU", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : fixed;
      return `${prefix}${body}${suffix}`;
    };

    let frame = 0;
    let guard = 0;
    let began = 0;

    /** The finished figure, written exactly as the server rendered it. */
    const settle = () => {
      cancelAnimationFrame(frame);
      clearTimeout(guard);
      node.textContent = value;
    };

    const run = () => {
      const step = (now: number) => {
        if (!began) began = now;
        const progress = Math.min(1, (now - began) / duration);
        if (progress >= 1) return settle();
        node.textContent = format(start + (target - start) * easeOut(progress));
        frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);

      // `requestAnimationFrame` is not a guarantee. A background tab, a
      // throttled renderer or a starved frame clock can leave the loop short,
      // and a figure frozen at `1997` where the page promised `2024` is worse
      // than no animation at all. This lands the real number regardless, a
      // little after the run should have finished.
      guard = window.setTimeout(settle, duration + 400);
    };

    // Already on screen when the page settled: start counting rather than
    // resetting to a value the visitor would watch appear and vanish.
    const box = node.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) {
      run();
      return settle;
    }

    node.textContent = format(start);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        run();
      },
      // A little inside the viewport, so the count is under way rather than
      // starting the instant the figure clears the bottom edge.
      { rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      settle();
    };
  }, [value, from, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
