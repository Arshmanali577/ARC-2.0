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

/* -- Services ------------------------------------------------------------- */

/* Every service glyph is a small elevation drawing rather than a pictogram:
   roof planes, wall lines and openings, drawn with the same 1.5px hairline the
   dividers use. That is what keeps a list of eight icons reading as one
   architectural set. */

export function HomeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M1.8 7.4 8 2.2l6.2 5.2" />
      <path d="M3.4 6.4v7.4h9.2V6.4" />
      <path d="M6.6 13.8V9.4h2.8v4.4" />
    </Svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.2 13.8V2.6h6.2v11.2" />
      <path d="M8.4 13.8V6.8h5.4v7" />
      <path d="M1 13.8h14" />
      <path d="M4 5.2h1M6 5.2h1M4 7.6h1M6 7.6h1M4 10h1M6 10h1" />
      <path d="M10 9h1.4M10 11.2h1.4" />
    </Svg>
  );
}

/** Custom homes: a drawing sheet with the pen still on it. */
export function DraftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.4 2.4h7v11.2h-7z" />
      <path d="M4.4 5.2h3M4.4 7.4h3M4.4 9.6h2" />
      <path d="m10.4 10.2 3-3 1.4 1.4-3 3-2 .6z" />
    </Svg>
  );
}

export function HammerIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.6 5.2 7.4 2.4l4.8 4.8-2.8 2.8z" />
      <path d="m7 7.6-2.6 2.6" />
      <path d="M5 10.8 3.2 12.6 2 11.4 3.8 9.6z" />
    </Svg>
  );
}

/** Extensions: the added bay, marked on the plan. */
export function ExtendIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.4 2.4h11.2v11.2H2.4z" />
      <path d="M8 5v6M5 8h6" />
    </Svg>
  );
}

/** Granny flats: the same house, one storey and a wider roof. */
export function CabinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M1.4 8 8 4.2 14.6 8" />
      <path d="M3 7.4v6.4h10V7.4" />
      <path d="M6.2 9.4h3.6v2.6H6.2z" />
    </Svg>
  );
}

export function StoreIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M1.6 3h12.8l1 3.2H.6z" />
      <path d="M2.6 6.4v7.4h10.8V6.4" />
      <path d="M5.8 13.8V9.6h4.4v4.2" />
    </Svg>
  );
}

/** Medical centres: the cross, set square to the grid. */
export function MedicalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.1 1.8h3.8v4.3h4.3v3.8H9.9v4.3H6.1V9.9H1.8V6.1h4.3z" />
    </Svg>
  );
}

/* -- Contact -------------------------------------------------------------- */

export function PinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 14.6c0 0-4.8-4.4-4.8-8a4.8 4.8 0 0 1 9.6 0c0 3.6-4.8 8-4.8 8z" />
      <path d="M8 4.8a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8z" />
    </Svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 2.4h2.8l1.2 3.1-1.7 1.2a8.6 8.6 0 0 0 3.9 3.9l1.2-1.7 3.1 1.2v2.8a1 1 0 0 1-1.1 1A11.6 11.6 0 0 1 2 3.5a1 1 0 0 1 1-1.1z" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M1.6 3.4h12.8v9.2H1.6z" />
      <path d="m1.6 4.2 6.4 4.6 6.4-4.6" />
    </Svg>
  );
}

/** The QBCC licence seal: a rosette over its ribbon. */
export function LicenceIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 1.4a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6z" />
      <path d="M8 4.1 8.8 5.7l1.7.2-1.25 1.2.3 1.7L8 8l-1.55.8.3-1.7L5.5 5.9l1.7-.2z" />
      <path d="M5.5 9.4 4.2 14.6 8 12.7l3.8 1.9-1.3-5.2" />
    </Svg>
  );
}

/** The opening mark on the footer's statement. Solid, not a hairline. */
export function QuoteIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M2 12.4V8.9c0-2.9 1.5-4.8 4.1-5.3v2c-1.3.4-2 1.3-2.1 2.7h2.1v4.1zm7.2 0V8.9c0-2.9 1.5-4.8 4.1-5.3v2c-1.3.4-2 1.3-2.1 2.7H13v4.1z" />
    </svg>
  );
}

/* -- Social marks ---------------------------------------------------------- */

/* These are the networks' own logotypes, so they are solid shapes on a 24px
   grid rather than hairlines on 16 — redrawing them in the house style would
   make them unrecognisable at the 22px they are rendered at. */

function BrandSvg({
  className,
  size = 22,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      {children}
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <BrandSvg {...props}>
      <path d="M13.5 21.4v-8.2h2.75l.41-3.19H13.5V7.97c0-.92.26-1.55 1.58-1.55h1.69V3.57a22.6 22.6 0 0 0-2.46-.13c-2.44 0-4.1 1.49-4.1 4.22v2.35H7.45v3.19h2.76v8.2z" />
    </BrandSvg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <BrandSvg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6.9a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2m0 2a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2"
      />
      <circle cx="17.4" cy="6.6" r="1.25" />
    </BrandSvg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <BrandSvg {...props}>
      <path d="M5 3.2a2.35 2.35 0 1 1 0 4.7 2.35 2.35 0 0 1 0-4.7M3 9.1h4v11.7H3zm6.6 0h3.83v1.6h.05a4.2 4.2 0 0 1 3.78-2.08c4.04 0 4.79 2.66 4.79 6.12v6.06h-4v-5.37c0-1.28-.02-2.93-1.79-2.93-1.79 0-2.06 1.4-2.06 2.84v5.46h-4z" />
    </BrandSvg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <BrandSvg {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.6 7.2a2.52 2.52 0 0 0-1.78-1.79C18.25 5 12 5 12 5s-6.25 0-7.82.41A2.52 2.52 0 0 0 2.4 7.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .4 4.8 2.52 2.52 0 0 0 1.78 1.79C5.75 19 12 19 12 19s6.25 0 7.82-.41a2.52 2.52 0 0 0 1.78-1.79A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.4-4.8M10 15.02V8.98L15.2 12z"
      />
    </BrandSvg>
  );
}
