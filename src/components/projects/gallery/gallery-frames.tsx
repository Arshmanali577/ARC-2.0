"use client";

import Image from "next/image";

import type { GalleryItem } from "@/content/project-gallery";
import { cn } from "@/lib/cn";

/**
 * The crossfading image stack shared by the stage and the lightbox.
 *
 * Only frames the visitor has actually reached are mounted — `mounted` is the
 * running set the showcase keeps, seeded with the first image and its
 * neighbour. That is what makes a thirty-image gallery cost one image on load
 * instead of thirty, while still leaving the outgoing frame in the DOM long
 * enough for the fade to have something to fade from.
 */
export function GalleryFrames({
  items,
  active,
  mounted,
  sizes,
  fit = "cover",
  className,
}: {
  items: GalleryItem[];
  active: number;
  mounted: ReadonlySet<number>;
  sizes: string;
  /** The stage crops; the lightbox shows the whole frame. */
  fit?: "cover" | "contain";
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0", className)}>
      {items.map((item, index) => {
        if (!mounted.has(index)) return null;
        const isActive = index === active;

        return (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            fill
            sizes={sizes}
            /* The first frame is what the visitor came for; everything else is
               reached by an interaction, so it can wait for idle. */
            loading={index === 0 ? "eager" : "lazy"}
            aria-hidden={!isActive}
            className={cn(
              fit === "cover" ? "object-cover" : "object-contain",
              "transition-opacity duration-[650ms] ease-out motion-reduce:transition-none",
              isActive ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
          />
        );
      })}
    </div>
  );
}
