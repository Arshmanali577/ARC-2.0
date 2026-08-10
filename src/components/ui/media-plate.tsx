import Image from "next/image";

import { cn } from "@/lib/cn";

/**
 * Every image slot on the page is a "plate". Until real photography lands it
 * renders the hatched placeholder from the design; pass `src` and the exact
 * same slot renders an optimised <Image> instead — no layout change.
 */
export type MediaPlate = {
  /** Uppercase art-direction note shown on the placeholder. */
  label: string;
  /** Placeholder fill. Determines hatch colour and label contrast. */
  tone: "dark" | "brand-mid" | "plate-1" | "plate-2" | "plate-3" | "plate-4";
  /** Supply once real photography exists. */
  src?: string;
  alt?: string;
};

const toneStyles: Record<MediaPlate["tone"], string> = {
  dark: "bg-brand-deep hatch-dark",
  "brand-mid": "bg-brand-mid hatch-dark-strong",
  "plate-1": "bg-plate-1 hatch-light",
  "plate-2": "bg-plate-2 hatch-light",
  "plate-3": "bg-plate-3 hatch-light",
  "plate-4": "bg-plate-4 hatch-light",
};

const isDarkTone = (tone: MediaPlate["tone"]) =>
  tone === "dark" || tone === "brand-mid";

type MediaPlateProps = MediaPlate & {
  className?: string;
  /** Placeholder label alignment. The hero note sits bottom-right. */
  align?: "start" | "end";
  /** Placeholder inner padding in px, matching the design per slot. */
  labelPadding?: number;
  priority?: boolean;
  sizes?: string;
};

export function MediaPlate({
  label,
  tone,
  src,
  alt,
  className,
  align = "start",
  labelPadding = 18,
  priority,
  sizes = "100vw",
}: MediaPlateProps) {
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
          "text-[11px] font-medium tracking-[0.14em]",
          isDarkTone(tone) ? "text-white/50" : "text-muted",
        )}
      >
        {label}
      </span>
    </div>
  );
}
