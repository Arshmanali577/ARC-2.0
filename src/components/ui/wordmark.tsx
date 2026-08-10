import Image from "next/image";

import { cn } from "@/lib/cn";

/** Set this once a real logo asset lands in /public and the placeholder box
 *  disappears everywhere it is used. */
export const logoSrc: string | null = null;

type WordmarkProps = {
  tone?: "brand" | "light";
  /** 26px in the header, 24px in the footer. */
  size?: 24 | 26;
  /** Shows the dashed "drop logo svg" slot from the design. */
  showLogoSlot?: boolean;
  className?: string;
};

export function Wordmark({
  tone = "brand",
  size = 26,
  showLogoSlot = false,
  className,
}: WordmarkProps) {
  if (logoSrc) {
    return (
      <Image
        src={logoSrc}
        alt="ARC Builders"
        width={140}
        height={48}
        priority
        className={className}
      />
    );
  }

  return (
    <span
      className={cn(
        "flex items-center gap-3",
        showLogoSlot && "border border-dashed border-line-dashed px-[14px] py-2",
        className,
      )}
    >
      <span className="flex flex-col gap-[3px]">
        <span
          className={cn(
            "font-display font-bold leading-none tracking-[0.16em]",
            size === 26 ? "text-[26px]" : "text-[24px]",
            tone === "light" ? "text-white" : "text-brand",
          )}
        >
          ARC
        </span>
        <span
          className={cn(
            "text-[9px] font-medium tracking-[0.34em]",
            tone === "light" ? "text-mist-deep" : "text-muted",
          )}
        >
          BUILDERS
        </span>
      </span>
      {showLogoSlot ? (
        <span className="whitespace-nowrap text-[8px] font-medium tracking-[0.14em] text-faint">
          DROP LOGO SVG
        </span>
      ) : null}
    </span>
  );
}
