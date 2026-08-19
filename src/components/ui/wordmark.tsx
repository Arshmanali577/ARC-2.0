import Image from "next/image";

import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/** The brand mark, migrated from the original site. */
const logoSrc = "/arc-logo.svg";

/**
 * Where the mark is standing. The header's is sized to the bar it sits in; the
 * footer's opens the brand column and so is drawn larger, growing once the
 * column has the width for it.
 */
const sizes = {
  header: "h-[42px] w-auto",
  footer: "h-[56px] w-auto tab:h-[64px]",
} as const;

type WordmarkProps = {
  /** The mark is deep navy; on the navy footer it needs to read white. */
  tone?: "brand" | "light";
  size?: keyof typeof sizes;
  className?: string;
};

export function Wordmark({
  tone = "brand",
  size = "header",
  className,
}: WordmarkProps) {
  return (
    <Image
      src={logoSrc}
      alt={site.name}
      width={500}
      height={189}
      priority
      // An SVG gains nothing from the image optimiser; serve the file as-is.
      unoptimized
      className={cn(
        sizes[size],
        tone === "light" && "brightness-0 invert",
        className,
      )}
    />
  );
}
