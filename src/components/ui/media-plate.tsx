import Image from "next/image";

import { cn } from "@/lib/cn";

/**
 * Every image slot on the page is a "plate". Until real photography lands it
 * renders the hatched placeholder from the design; pass `src` and the exact
 * same slot renders an optimised <Image> instead — no layout change.
 *
 * `className` sizes the plate — a height, or an `aspect-*`. It must NOT carry
 * a position utility: the plate owns `relative` so `next/image fill` has an
 * ancestor to fill, and Tailwind would resolve the clash by source order, not
 * by the order you wrote the classes in. Position the wrapper instead.
 */
export type MediaPlate = {
  /** Uppercase art-direction note shown on the placeholder. */
  label: string;
  /** Placeholder fill — only ever seen when `src` is absent. */
  tone?: "dark" | "brand-mid" | "plate-1" | "plate-2" | "plate-3" | "plate-4";
  /** Supply once real photography exists. */
  src?: string;
  alt?: string;
  /** Optional looping background film. `src` is used as its poster frame. */
  video?: string;
};

type PlateTone = NonNullable<MediaPlate["tone"]>;

const toneStyles: Record<PlateTone, string> = {
  dark: "bg-brand-deep hatch-dark",
  "brand-mid": "bg-brand-mid hatch-dark-strong",
  "plate-1": "bg-plate-1 hatch-light",
  "plate-2": "bg-plate-2 hatch-light",
  "plate-3": "bg-plate-3 hatch-light",
  "plate-4": "bg-plate-4 hatch-light",
};

const isDarkTone = (tone: PlateTone) =>
  tone === "dark" || tone === "brand-mid";

type MediaPlateProps = MediaPlate & {
  className?: string;
  /** Placeholder label alignment. The hero note sits bottom-right. */
  align?: "start" | "end";
  /** Placeholder inner padding in px, matching the design per slot. */
  labelPadding?: number;
  priority?: boolean;
  sizes?: string;
  /**
   * `object-position` for the photograph, e.g. `"center 15%"`. Only matters on
   * a plate whose rendered shape is far from the file's own — a full-bleed
   * masthead is letterboxed hard on a wide screen, and a centred crop can take
   * the top off the building. Left unset, the plate crops from the centre.
   */
  position?: string;
};

export function MediaPlate({
  label,
  tone = "plate-1",
  src,
  alt,
  video,
  className,
  align = "start",
  labelPadding = 18,
  priority,
  sizes = "100vw",
  position,
}: MediaPlateProps) {
  if (video) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={src}
          aria-label={alt ?? label}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt ?? label}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "flex items-end",
        align === "end" ? "justify-end" : "justify-start",
        toneStyles[tone],
        className,
      )}
      style={{ padding: labelPadding }}
    >
      <span
        className={cn(
          "text-[12px] font-medium tracking-[0.14em]",
          isDarkTone(tone) ? "text-white/50" : "text-muted",
        )}
      >
        {label}
      </span>
    </div>
  );
}
