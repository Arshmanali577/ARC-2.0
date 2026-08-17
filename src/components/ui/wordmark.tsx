import Image from "next/image";

import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/** The brand mark, migrated from the original site. */
const logoSrc = "/arc-logo.svg";

type WordmarkProps = {
  /** The mark is deep navy; on the navy footer it needs to read white. */
  tone?: "brand" | "light";
  /** 42px tall in the header, 38px in the footer. */
  size?: 24 | 26;
  className?: string;
};

export function Wordmark({
  tone = "brand",
  size = 26,
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
        size === 26 ? "h-[42px] w-auto" : "h-[38px] w-auto",
        tone === "light" && "brightness-0 invert",
        className,
      )}
    />
  );
}
