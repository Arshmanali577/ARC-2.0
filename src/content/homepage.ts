/**
 * All homepage copy, section by section, in the order it appears on the page.
 * Editing marketing text should never require opening a component file.
 */

import type { MediaPlate } from "@/components/ui/media-plate";

/* -- Hero ----------------------------------------------------------------- */

export const hero = {
  eyebrow: "Custom homes · Brisbane & South East Queensland",
  heading: "Build your vision, not a version of it.",
  body: "ARC Builders takes your brief from first sketch to final handover — design, approvals, construction and finishes handled under one roof, so the home you move into is the one you imagined.",
  primaryCta: { label: "Book a free consultation", href: "#enquire" },
  secondaryCta: { label: "See our work", href: "#projects" },
  media: {
    label: "HERO FILM — COMPLETED HOME, GOLDEN HOUR",
    tone: "dark",
  } satisfies MediaPlate,
};

/* -- Stats bar ------------------------------------------------------------ */

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "18+", label: "Years in Queensland" },
  { value: "100+", label: "Homes delivered" },
  { value: "One", label: "Point of contact, start to finish" },
];

/* -- Promise -------------------------------------------------------------- */

export const promise = {
  eyebrow: "Our promise",
  heading: "A home should still feel right in thirty years.",
  lead: "Most of what makes a build difficult happens long before anyone lifts a hammer — unclear drawings, soft budgets, decisions left open. We close those gaps first. The scope is written in plain language, the price is fixed, and every finish is chosen before site start.",
  body: "What you get is a build without surprises, and a house detailed well enough that your family grows into it rather than out of it.",
};

/* -- Selected work -------------------------------------------------------- */

export type Project = {
  slug: string;
  name: string;
  location: string;
  summary: string;
  href: string;
  media: MediaPlate;
  /** Offsets the card down a row in the two-column grid. */
  staggered?: boolean;
};

export const projectsSection = {
  eyebrow: "Selected work",
  heading: "Four homes, four very different briefs",
  link: { label: "All projects →", href: "#projects" },
};

export const projects: Project[] = [
  {
    slug: "aurelia",
    name: "Aurelia Residence",
    location: "Pallara, QLD",
    summary:
      "A four-bedroom family home on a new-estate block, planned around a shared central courtyard.",
    href: "#projects",
    media: { label: "AURELIA — FRONT ELEVATION, DUSK", tone: "plate-1" },
  },
  {
    slug: "solstice",
    name: "Solstice Residence",
    location: "Eight Mile Plains, QLD",
    summary:
      "Two generations under one roof, with a self-contained ground-floor wing and separate entry.",
    href: "#projects",
    media: { label: "SOLSTICE — LIVING, NORTH LIGHT", tone: "plate-2" },
    staggered: true,
  },
  {
    slug: "lumiere",
    name: "Lumiere Residence",
    location: "Camp Hill, QLD",
    summary:
      "A full renovation and rear extension to a character home, opened up to the garden.",
    href: "#projects",
    media: { label: "LUMIERE — STAIR & VOID", tone: "plate-3" },
  },
  {
    slug: "halcyon",
    name: "Halcyon Residence",
    location: "Mount Gravatt, QLD",
    summary:
      "Premium detailing throughout — stone, joinery and lighting resolved before site start.",
    href: "#projects",
    media: { label: "HALCYON — KITCHEN DETAIL", tone: "plate-4" },
    staggered: true,
  },
];

/* -- The practice --------------------------------------------------------- */

export type Pillar = { index: string; title: string; body: string };

export const practice = {
  eyebrow: "The practice",
  heading: "Builders are not interchangeable.",
  lead: "Eighteen years of custom residential and commercial building across Brisbane and South East Queensland. We take on a limited number of projects each year, which is what allows the director to stay across every one of them personally.",
  body: "Our specialisation runs deeper than square metres: multi-generational planning, Vastu-aware orientation, and detailing for families who intend to stay in the home they build.",
  link: { label: "More about ARC →", href: "#studio" },
  media: {
    label: "DIRECTOR & TEAM ON SITE — PORTRAIT",
    tone: "brand-mid",
  } satisfies MediaPlate,
};

export const pillars: Pillar[] = [
  {
    index: "01",
    title: "Fixed pricing",
    body: "A quote with the full scope attached. No allowances that quietly grow.",
  },
  {
    index: "02",
    title: "Multi-generational",
    body: "Dual living, separate wings, and privacy planned from the first sketch.",
  },
  {
    index: "03",
    title: "Vastu-aware design",
    body: "Orientation and room placement resolved alongside your consultant.",
  },
  {
    index: "04",
    title: "One point of contact",
    body: "The builder who quotes your home is the one who runs the site.",
  },
];

/* -- The journey ---------------------------------------------------------- */

export type Stage = { index: string; title: string; body: string };

export const journeySection = {
  eyebrow: "The journey",
  heading: "Four stages, and you always know which one you're in",
};

export const stages: Stage[] = [
  {
    index: "STAGE 01",
    title: "Your vision",
    body: "A free, no-obligation consultation. We walk the site, take the brief, and give you an honest read on what it costs before anyone draws anything.",
  },
  {
    index: "STAGE 02",
    title: "Design",
    body: "Floor plans, facades and interior finishes worked through together until the drawings match what you pictured.",
  },
  {
    index: "STAGE 03",
    title: "Approvals & pricing",
    body: "Permits secured, trades quoted, and the contract price fixed — so construction starts with nothing left open.",
  },
  {
    index: "STAGE 04",
    title: "Build & handover",
    body: "A clean site, weekly photo updates, then a full walkthrough of every system in the house before the keys change hands.",
  },
];

/* -- What we build -------------------------------------------------------- */

export type Capability = {
  index: string;
  title: string;
  body: string;
  href: string;
};

export const capabilitySection = {
  eyebrow: "What we build",
  heading: "Residential and commercial, under one licence",
};

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Custom Homes",
    body: "Concept to completion on your block — designed around the site, your budget, and how your family actually lives.",
    href: "#capability",
  },
  {
    index: "02",
    title: "Renovations",
    body: "Structural and cosmetic work on established homes, managed to keep dust, noise and surprises contained.",
    href: "#capability",
  },
  {
    index: "03",
    title: "Extensions & Granny Flats",
    body: "Added floor area that reads as part of the original house, not an afterthought bolted to the back.",
    href: "#capability",
  },
  {
    index: "04",
    title: "Fitouts & Medical Centres",
    body: "Retail and clinical fitouts delivered to programme, with trades sequenced around your opening date.",
    href: "#capability",
  },
];

/* -- Testimonial ---------------------------------------------------------- */

export const testimonial = {
  eyebrow: "Client",
  quote:
    "“Building our home happened during one of the most important times of our lives. ARC’s team became a source of calm and reassurance. They didn’t just build a house; they created a warm, safe space where our new journey as a family could begin.”",
  author: "Jaswinder & Reet",
  project: "Custom family home",
  media: {
    label: "CLIENT PORTRAIT IN FINISHED HOME",
    tone: "plate-1",
  } satisfies MediaPlate,
};

/* -- Service areas -------------------------------------------------------- */

export const serviceAreaSection = {
  eyebrow: "Where we build",
  link: { label: "All service areas →", href: "#enquire" },
};

export const serviceAreas: string[] = [
  "Brisbane Southside",
  "Logan",
  "Rochedale",
  "Calamvale",
  "Pallara",
  "Greenbank",
  "Eight Mile Plains",
  "Mount Gravatt",
];

/* -- Enquire -------------------------------------------------------------- */

export const enquire = {
  eyebrow: "Next step",
  heading: "Let's talk about your block.",
  body: "Send your site details and rough brief. You'll get an honest view on feasibility, timeline and cost — free, no obligation, and before you commit to anything.",
};
