import { cn } from "@/lib/cn";

/**
 * The icon set. Drawn on a 16px grid with 1.5px strokes and butt caps so the
 * line weight reads like the hairlines elsewhere in the design — no icon
 * library, no rounded "app" styling.
 */

type IconProps = {
  className?: string;
  /** Rendered size in px. 16 in body copy, 20–24 in actions. */
  size?: number;
};

function Svg({
  className,
  size = 16,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      className={cn("shrink-0", className)}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M1.5 8h13" />
      <path d="M9.5 3l5 5-5 5" />
    </Svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 12.5l9-9" />
      <path d="M5.5 3.5h7v7" />
    </Svg>
  );
}

/** The disclosure caret on the header's services dropdown. */
export function ChevronDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 6l4.5 4.5L12.5 6" />
    </Svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 1.5v13" />
      <path d="M3 8.5l5 5 5-5" />
    </Svg>
  );
}
