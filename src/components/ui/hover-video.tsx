"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * The hover preview film on a project card. It layers over the card's still,
 * which stays visible underneath, and fades in once the film has a frame to
 * show — so a slow start never flashes an empty plate.
 *
 * `preload="none"` is what makes this affordable on a twelve-card grid: no
 * video bytes are fetched until a pointer lands on a card, and only that card's
 * film loads. Cards without `heroVideo` never render this at all.
 *
 * Two deliberate choices, both learned from the first cut of this component
 * not playing at all:
 *
 * - The pointer listeners sit on the *card*, not on this overlay. The card is
 *   what the visitor actually hovers, it is the same element the CSS `group`
 *   fade keys off, and it removes any dependency on this transparent layer
 *   winning the hit test against the still beneath it.
 * - Visibility is gated on the video having decoded a frame, never on playback
 *   succeeding. If a browser refuses `play()` the loaded frame still fades in,
 *   which is indistinguishable from the still — rather than nothing happening.
 */
export function HoverVideo({
  src,
  zoom = "group-hover:scale-[1.05]",
  className,
}: {
  src: string;
  /**
   * The hover zoom, given as a full class so Tailwind can see it in source.
   * Match the still's own zoom on the slot this sits in — the two layers move
   * together or the swap reads as a jump.
   */
  zoom?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const card = video.closest("a") ?? video.parentElement;
    if (!card) return;

    const start = () => {
      // The attribute is already there; setting the property too keeps the
      // element unambiguously muted, which is what buys us autoplay.
      video.muted = true;
      // HAVE_NOTHING means `preload="none"` has held everything back so far.
      if (video.readyState === 0) video.load();
      void video.play().catch(() => {});
    };

    const stop = () => {
      video.pause();
      // Rewound so the next hover opens on the first frame, not mid-shot.
      video.currentTime = 0;
    };

    card.addEventListener("pointerenter", start);
    card.addEventListener("pointerleave", stop);

    return () => {
      card.removeEventListener("pointerenter", start);
      card.removeEventListener("pointerleave", stop);
    };
  }, []);

  const markReady = () => setReady(true);

  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-500 ease-out",
        ready && "group-hover:opacity-100",
        className,
      )}
    >
      {/* The scale lives here, not on the wrapper: the wrapper owns the
          opacity transition, and `cn` joins classes rather than merging them,
          so a second `transition-*` on the same element would fight it. The
          timing matches MediaPlate's, keeping still and film in step. */}
      <video
        ref={videoRef}
        className={cn(
          "h-full w-full object-cover transition-transform duration-[900ms] ease-out",
          zoom,
        )}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        onLoadedData={markReady}
        onCanPlay={markReady}
        onPlaying={markReady}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
