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

/** Gallery navigation. Drawn on the same grid as the disclosure caret. */
export function ChevronLeft(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10 3.5L5.5 8l4.5 4.5" />
    </Svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 3.5L10.5 8 6 12.5" />
    </Svg>
  );
}

/** Four corners pushed outward — the gallery's fullscreen action. */
export function ExpandIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.4 2.4H2.4v4M9.6 2.4h4v4M9.6 13.6h4v-4M6.4 13.6h-4v-4" />
    </Svg>
  );
}

/** The same corners drawn inward, plus the lightbox dismiss. */
export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.2 3.2l9.6 9.6M12.8 3.2l-9.6 9.6" />
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

/* -- Project detail -------------------------------------------------------- */

/* The glyphs the About band on a project page is built from. Same 16px grid
   and 1.5px hairline as the service marks above, so a specification row, a
   feature card and a statistic all read as one drawn set. */

/** Architect: the figure on the drawing, not a photo avatar. */
export function PersonIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 2.4a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4z" />
      <path d="M2.8 14.2c0-2.9 2.3-4.8 5.2-4.8s5.2 1.9 5.2 4.8" />
    </Svg>
  );
}

/** Year completed: the wall calendar, ruled like a schedule. */
export function CalendarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.2 3.6h11.6v10.2H2.2z" />
      <path d="M2.2 6.6h11.6" />
      <path d="M5.4 2.2v2.8M10.6 2.2v2.8" />
      <path d="M4.8 9.2h1.4M7.3 9.2h1.4M9.8 9.2h1.4M4.8 11.6h1.4M7.3 11.6h1.4" />
    </Svg>
  );
}

/** The same sheet with the date struck through — a programme, delivered. */
export function CalendarCheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.2 3.6h11.6v10.2H2.2z" />
      <path d="M2.2 6.6h11.6" />
      <path d="M5.4 2.2v2.8M10.6 2.2v2.8" />
      <path d="m5.4 10.2 1.8 1.8 3.4-3.6" />
    </Svg>
  );
}

/** Build duration: the programme clock. */
export function ClockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 1.6a6.4 6.4 0 1 1 0 12.8A6.4 6.4 0 0 1 8 1.6z" />
      <path d="M8 4.6V8.2l2.8 1.7" />
    </Svg>
  );
}

/* -- Proof marks -----------------------------------------------------------
   The four figures and three assurances in the enquire band. Drawn on the same
   16px grid as everything above, so a rosette sits beside a calendar without
   either looking imported. */

/** Licensed and covered: the shield, signed off. */
export function ShieldCheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 1.6 13.1 3.6v4.1c0 3.2-2.05 5.5-5.1 6.7-3.05-1.2-5.1-3.5-5.1-6.7V3.6z" />
      <path d="m5.6 7.7 1.85 1.85L10.5 6.3" />
    </Svg>
  );
}

/** Fixed price: the same shield holding a figure rather than a tick. */
export function ShieldPriceIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 1.6 13.1 3.6v4.1c0 3.2-2.05 5.5-5.1 6.7-3.05-1.2-5.1-3.5-5.1-6.7V3.6z" />
      <path d="M8 4.6v6" />
      <path d="M9.7 6.1c-.4-.5-3.3-.8-3.3.8 0 1.35 3.3.5 3.3 1.9 0 1.5-2.9 1.25-3.4.7" />
    </Svg>
  );
}

/** Accreditation: the rosette, ribbon and all. */
export function AwardIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 1.7a3.85 3.85 0 1 1 0 7.7 3.85 3.85 0 0 1 0-7.7z" />
      <path d="M8 4.4a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
      <path d="M5.6 8.9 4.3 14.3 8 12.2l3.7 2.1-1.3-5.4" />
    </Svg>
  );
}

/** Client reviews. */
export function StarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m8 1.7 1.9 4.2 4.5.5-3.4 3.1.95 4.5L8 11.7l-3.95 2.3.95-4.5L1.6 6.4l4.5-.5z" />
    </Svg>
  );
}

/** Project status: handover, signed off. */
export function CheckCircleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 1.6a6.4 6.4 0 1 1 0 12.8A6.4 6.4 0 0 1 8 1.6z" />
      <path d="m5 8.2 2.1 2.1L11.1 6" />
    </Svg>
  );
}

/** Modern architecture: a monopitch volume with a set-back wing. */
export function ElevationIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M1.2 13.9h13.6" />
      <path d="M2.6 13.9V5.6l6.2-2.8v11.1" />
      <path d="M8.8 13.9V7.2h4.6v6.7" />
      <path d="M4.4 13.9V9.6h2.4v4.3" />
      <path d="M10.2 9.4h2" />
    </Svg>
  );
}

/** Open plan living: the sofa and its floor lamp, drawn in elevation. */
export function SofaIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.6 8.6V6.4h8.2v2.2" />
      <path d="M1.4 12.2V9.8a1.2 1.2 0 0 1 1.2-1.2h8.2a1.2 1.2 0 0 1 1.2 1.2v2.4z" />
      <path d="M2.8 12.2v1.4M10.6 12.2v1.4" />
      <path d="M14.4 13.6V6.6" />
      <path d="M13.1 6.6h2.6l-.75-2.4h-1.1z" />
    </Svg>
  );
}

/** Living areas: the armchair, the same set one seat narrower. */
export function ArmchairIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.4 8.4V5.6h7.2v2.8" />
      <path d="M2.8 12.4V9.9a1.5 1.5 0 0 1 1.6-1.5h7.2a1.5 1.5 0 0 1 1.6 1.5v2.5z" />
      <path d="M2.8 10.6h10.4" />
      <path d="M4.4 12.4v1.3M11.6 12.4v1.3" />
    </Svg>
  );
}

/** Premium materials: the cut stone, faceted. */
export function GemIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.4 3h7.2l2.8 3.9L8 13.6 1.6 6.9z" />
      <path d="M1.6 6.9h12.8" />
      <path d="M4.4 3 6 6.9 8 13.6M11.6 3 10 6.9 8 13.6" />
    </Svg>
  );
}

/** Indoor-outdoor living: the bi-fold opening, both leaves drawn. */
export function BifoldIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M1.4 2.4v11.2M14.6 2.4v11.2" />
      <path d="M1.4 2.4h13.2M1.4 13.6h13.2" />
      <path d="M3 3.6h4.2v8.8H3z" />
      <path d="M8.8 3.6H13v8.8H8.8z" />
    </Svg>
  );
}

/** Bedrooms: headboard, mattress, pillow. */
export function BedIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M1.6 13.8V4.2" />
      <path d="M1.6 8.4h12.8v5.4" />
      <path d="M1.6 11.2h12.8" />
      <path d="M3.2 8.4V6.2h3.6v2.2" />
    </Svg>
  );
}

/** Bathrooms: the freestanding tub under its wall spout. */
export function BathIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M1.4 8h13.2" />
      <path d="M2.6 8v2.6a2.6 2.6 0 0 0 2.6 2.6h5.6a2.6 2.6 0 0 0 2.6-2.6V8" />
      <path d="m4.4 13.2-.9 1.4M11.6 13.2l.9 1.4" />
      <path d="M4.6 8V4.8a1.4 1.4 0 0 1 2.8 0" />
    </Svg>
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

export function WhatsappIcon(props: IconProps) {
  return (
    <BrandSvg {...props}>
      <path d="M12.04 2.5a9.4 9.4 0 0 0-8.1 14.13L2.5 21.9l5.4-1.41a9.4 9.4 0 1 0 4.14-17.99m0 1.86a7.54 7.54 0 0 1 0 15.08 7.5 7.5 0 0 1-3.82-1.05l-.27-.16-3.2.84.85-3.12-.18-.29a7.54 7.54 0 0 1 6.62-11.3" />
      <path d="M8.9 7.36c-.18-.4-.36-.41-.53-.42h-.45a.86.86 0 0 0-.62.29 2.6 2.6 0 0 0-.82 1.94c0 1.14.83 2.25.95 2.4.11.16 1.6 2.57 3.95 3.5 1.95.77 2.35.62 2.77.58.42-.04 1.36-.56 1.55-1.09.19-.53.19-.99.14-1.08-.06-.1-.21-.16-.45-.28-.23-.11-1.36-.67-1.57-.75-.21-.08-.36-.11-.51.12s-.59.75-.72.9c-.13.16-.27.18-.5.06a6.3 6.3 0 0 1-1.85-1.14 7 7 0 0 1-1.28-1.6c-.14-.23-.02-.35.1-.47l.34-.4c.11-.13.15-.23.23-.38.07-.16.03-.29-.03-.4-.06-.12-.5-1.26-.7-1.72" />
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
