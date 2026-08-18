/**
 * Homepage copy, section by section, in the order it appears on the page.
 *
 * Every string is migrated from the live site's homepage (see
 * `Content-Extraction/Home/Text/content.md`). The only strings that are not
 * from the live homepage are the two hero button labels, which the extraction
 * did not capture and which are kept from this theme instead.
 */

import type { MediaPlate } from "@/components/ui/media-plate";
import { localAreas } from "@/content/local-areas";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";

/* -- Hero ----------------------------------------------------------------- */

export const hero = {
  eyebrow: "Aesthetic Residential & Commercial",
  heading: "Custom Homes Crafted with Care",
  body: "Serving Brisbane and South East Queensland with thoughtfully designed homes, transparent pricing, and quality-first construction.",
  primaryCta: { label: "Book a free consultation", href: "/contact" },
  secondaryCta: { label: "See our work", href: "/projects" },
  media: {
    label: "SOLSTICE RESIDENCE — EIGHT MILE PLAINS",
    tone: "dark",
    src: "/projects/25-langford-st/hero.webp",
    alt: "Solstice Residence, Eight Mile Plains",
    video: "/videos/hero-langford.mp4",
  } satisfies MediaPlate,
};

/* -- Stats bar ------------------------------------------------------------ */

export type Stat = { value: string; label: string };

/**
 * The live hero animates three counters. Only the years figure is recorded in
 * the extracted content (`companyInfo.experience`), so the other two cells
 * count what is actually in this project rather than assert an unverified
 * number. Replace them once the real figures are supplied.
 */
export const stats: Stat[] = [
  { value: "18+", label: "Years of Industry Experience" },
  { value: `${projects.length}`, label: "Successful Projects" },
  { value: `${localAreas.length}`, label: "Service Areas Across SEQ" },
];

/* -- Selected work -------------------------------------------------------- */

export const projectsSection = {
  eyebrow: "Portfolio",
  heading: "Featured Projects",
  link: { label: "All projects", href: "/projects" },
};

/* -- The practice (About preview) ----------------------------------------- */

export type Pillar = { index: string; title: string; body: string };

export const practice = {
  eyebrow: "About ARC Builders",
  heading: "Custom Homes Built With Precision and Care",
  lead: "At ARC Builders, we bring over 18 years of experience delivering high-quality custom homes in Brisbane and South East Queensland. Our expert team is committed to exceptional customer service, offering a seamless and transparent building experience from design to completion.",
  body: [
    "We specialise in custom home design, multi-generational homes, and Vastu-inspired home planning, creating functional, spacious homes tailored for modern families who value comfort, connection, and long-term living.",
    "With fixed pricing, transparent quotes, and no hidden costs, you can build with confidence knowing exactly what to expect. Unlike standard project builders, we offer fully customised home designs so your home reflects your lifestyle, preferences, and future needs.",
  ],
  note: "ARC Builders - trusted custom home builders in Queensland, delivering personalised homes with precision, quality, and a difference.",
  link: { label: "More about ARC", href: "/about" },
  media: {
    label: "WILLOWMERE RESIDENCE — KINGSTON",
    tone: "brand-mid",
    src: "/projects/3-dart-ave-kingston/hero.webp",
    alt: "Willowmere Residence, Kingston",
  } satisfies MediaPlate,
};

export const pillars: Pillar[] = [
  {
    index: "01",
    title: "18+ Years",
    body: "Experienced custom home delivery across Queensland",
  },
  {
    index: "02",
    title: "Transparent Quotes",
    body: "Fixed pricing and clear scope without hidden costs",
  },
  {
    index: "03",
    title: "Custom Planning",
    body: "Fully personalised homes for modern family living",
  },
  {
    index: "04",
    title: "Specialist Design",
    body: "Multi-generational and Vastu-inspired home planning",
  },
];

/* -- What we build -------------------------------------------------------- */

export const capabilitySection = {
  eyebrow: "What We Do",
  heading: "Our Services",
  lead: "We design and build stylish residential and commercial buildings that suit your style, budget, and requirements.",
  footnote: "Need a complete service scope for residential or commercial work?",
  links: [
    { label: "Residential services", href: "/residential" },
    { label: "Commercial services", href: "/commercial" },
  ],
};

/** The four service lines the live homepage surfaces, in the same order. */
export const homeServiceIds = ["1", "2", "3", "7"];

/* -- Local expertise ------------------------------------------------------ */

export const localExpertise = {
  eyebrow: "Local Expertise",
  heading: "Custom Home Builder in Brisbane & South East Queensland",
  lead: "ARC Builders supports Indian-Australian and local families with custom homes, Vastu-aware planning, transparent pricing, and practical project delivery across South East Queensland.",
};

export const serviceAreaSection = {
  eyebrow: "Where we build",
  link: { label: "All service areas", href: "/locations" },
};

/** The eight suburbs the live homepage lists, in order. */
export const homeAreaSlugs = [
  "brisbane-southside",
  "logan",
  "rochedale",
  "calamvale",
  "pallara",
  "greenbank",
  "eight-mile-plains",
  "mount-gravatt",
];

/* -- The journey (process) ------------------------------------------------ */

export const journeySection = {
  eyebrow: "How We Work",
  heading: "Our Process",
  lead: "From first conversation to final handover, every step is transparent, collaborative, and focused on your vision.",
  link: { label: "The full process", href: "/process" },
};

/* -- Testimonials --------------------------------------------------------- */

export const testimonialSection = {
  eyebrow: "Testimonials",
  heading: "What Our Clients Say",
  media: {
    label: "ELMSWORTH RESIDENCE — CALAMVALE",
    tone: "plate-1",
    src: "/projects/35-ayesha-place-calamvale/hero.webp",
    alt: "Elmsworth Residence, Calamvale",
  } satisfies MediaPlate,
};

/* -- Closing call to action ----------------------------------------------- */

export const cta = {
  eyebrow: "Let's Build Together",
  heading: "Ready to Build Your Dream Home?",
  body: "Whether it's a custom home, renovation, or commercial project, our team delivers quality builds with transparent pricing and no hidden surprises.",
  primaryCta: { label: "Get in Touch", href: "/contact" },

  /**
   * The four figures across the top of the band. Every one is counted from
   * this repository or read from `site.ts` rather than asserted — swap a value
   * here the day the business has a verified number to put in its place.
   * `icon` names the glyph; the drawing itself stays in the component.
   */
  proof: [
    {
      icon: "projects",
      value: `${projects.length}`,
      label: "Projects Delivered",
    },
    { icon: "experience", value: site.experience, label: "Years Experience" },
    {
      icon: "licence",
      value: "Licensed",
      label: `${site.licence.authority} Builder`,
    },
    {
      icon: "reviews",
      value: `${testimonials.length}`,
      label: "Client Reviews",
    },
  ],

  /** The three promises under the statement, left column. */
  assurances: [
    { icon: "design", label: "Custom Design" },
    { icon: "price", label: "Fixed Price Contracts" },
    { icon: "accredited", label: "Licensed Builder" },
  ],

  /** The floating panel on the right. */
  panel: {
    heading: "Book a Consultation",
    body: "Let's discuss your vision and bring it to life.",
    action: { label: "Schedule a Consultation", href: "/contact" },
    /** Labels only — every number and link is read from `site.contact`. */
    channels: {
      phone: "Call Us",
      email: "Email Us",
      whatsapp: "WhatsApp",
      whatsappValue: "Chat with our team",
    },
  },
};
