/**
 * Homepage copy, section by section, in the order it appears on the page.
 *
 * Most strings are migrated from the live site's homepage (see
 * `Content-Extraction/Home/Text/content.md`). The exceptions are the two hero
 * button labels and the copy for the bands the homepage reference design
 * introduces — the approach statement, the four reasons under "Built
 * Differently", and the band labels — which are that design's own words.
 */

import type { MediaPlate } from "@/components/ui/media-plate";
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

/* -- The approach --------------------------------------------------------- */

export type ApproachFigure = {
  /** Names the glyph; the drawing itself stays in the component. */
  icon: "award" | "home" | "pin" | "draft";
  value: string;
  /** The caption under the figure, one line per entry. */
  label: string[];
  /**
   * Set where the figure is words rather than a number, so it is not counted
   * up and is set at label size instead of display size.
   */
  word?: boolean;
};

/**
 * The statement the page opens on, with the four figures that back it. Every
 * figure is the reference design's own — swap a value here the day the
 * business has a differently verified number to put in its place.
 */
export const approach = {
  eyebrow: "The ARC Approach",
  heading: "We don't just build houses. We build homes with purpose.",
  body: "For over 18 years, ARC Builders has been creating custom homes that are beautifully designed, expertly constructed and built to stand the test of time. Your vision, our expertise — exceptional results, every time.",
  figures: [
    { icon: "award", value: site.experience, label: ["Years", "Experience"] },
    {
      icon: "home",
      value: site.projectsDelivered,
      label: ["Homes", "Delivered"],
    },
    {
      icon: "pin",
      value: "South East Queensland",
      label: ["Locations"],
      word: true,
    },
    { icon: "draft", value: "100%", label: ["Custom", "Built"] },
  ] satisfies ApproachFigure[],
};

/* -- Featured project ----------------------------------------------------- */

export const featuredSection = {
  eyebrow: "Featured Project",
  link: { label: "View all projects", href: "/projects" },
};

/**
 * The label a *list* of projects is given elsewhere on the site — the location
 * pages open their portfolio block with it. The homepage's own featured band
 * is labelled by `featuredSection` above.
 */
export const projectsSection = {
  eyebrow: "Portfolio",
  heading: "Featured Projects",
  link: { label: "All projects", href: "/projects" },
};

/* -- Why choose ARC ------------------------------------------------------- */

export type Reason = {
  index: string;
  title: string;
  body: string;
  /** Names the glyph; the drawing itself stays in the component. */
  icon: "people" | "price" | "home" | "service";
};

export const whyArc = {
  eyebrow: "Why Choose ARC",
  heading: "Built Differently.",
  reasons: [
    {
      index: "01",
      title: "18+ Years Experience",
      body: "Nearly two decades of industry knowledge and craftsmanship you can trust.",
      icon: "people",
    },
    {
      index: "02",
      title: "Transparent Pricing",
      body: "Fixed pricing and clear scope so you know exactly what to expect.",
      icon: "price",
    },
    {
      index: "03",
      title: "Fully Custom Design",
      body: "Homes designed around your lifestyle, block, and future needs — not a template.",
      icon: "home",
    },
    {
      index: "04",
      title: "Personal Service",
      body: "A dedicated team that listens, communicates, and delivers exceptional results.",
      icon: "service",
    },
  ] satisfies Reason[],
};

/* -- Services ------------------------------------------------------------- */

export const servicesSection = {
  eyebrow: "Our Services",
  link: { label: "View all services", href: "/residential" },
};

/** The four service lines the live homepage surfaces, in the same order. */
export const homeServiceIds = ["1", "2", "3", "7"];

/**
 * Homepage-only overrides. "Shop Fitouts" is the right name on /commercial,
 * where the whole page is commercial work; on a homepage row sitting under
 * three residential lines it has to say which side of the business it is.
 */
export const homeServiceLabels: Record<string, string> = {
  "7": "Commercial & Shop Fitouts",
};

/**
 * One photograph per service line, shown in the frame beside the rows and
 * swapped as the pointer walks down them. Keyed by service id, so a row with
 * no photograph of its own simply leaves the frame on the one before it.
 */
export const homeServiceMedia: Record<string, { src: string; alt: string }> = {
  "1": {
    src: "/projects/14-verona-st-pallara/hero.webp",
    alt: "Aurelia Residence, Pallara — a custom family home",
  },
  "2": {
    src: "/projects/25-langford-st/gallery-05.webp",
    alt: "A renovated ensuite in stone and timber, Eight Mile Plains",
  },
  "3": {
    src: "/projects/49-herbert-st/gallery-03.webp",
    alt: "A rear extension opening onto lawn and pool, Camp Hill",
  },
  "7": {
    src: "/projects/commercial-fitout.jpg",
    alt: "A commercial reception fitout in oak joinery and stone",
  },
};

/* -- Process -------------------------------------------------------------- */

export const processSection = {
  eyebrow: "Our Process",
  link: { label: "The full process", href: "/process" },
};

/* -- Locations ------------------------------------------------------------ */

export const locationsSection = {
  eyebrow: "Locations We Build",
  link: { label: "View all locations", href: "/locations" },
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

/* -- Testimonials --------------------------------------------------------- */

/**
 * The band shows one review at a time against a photograph of the kind of work
 * it is about. `media` is indexed by position in `testimonials`, so the two
 * lists stay in step — a review added there wants a photograph added here, and
 * the band falls back to the first if one is missing.
 */
export const reviewsSection = {
  eyebrow: "Testimonial",
  action: { label: "Book a consultation", href: "/contact" },
  previous: "Previous review",
  next: "Next review",
  media: [
    {
      src: "/process/stage-02-planning.webp",
      alt: "A kitchen with a stone island and timber joinery",
    },
    {
      src: "/projects/35-ayesha-place-calamvale/hero.webp",
      alt: "Elmsworth Residence, Calamvale",
    },
    {
      src: "/projects/17-ormskirk-st-calamvale/gallery-15.webp",
      alt: "A double-height entry with a pendant fitting, Calamvale",
    },
    {
      src: "/projects/14-verona-st-pallara/hero.webp",
      alt: "Aurelia Residence, Pallara",
    },
    {
      src: "/projects/commercial-fitout.jpg",
      alt: "A medical centre reception in oak joinery and stone",
    },
  ],
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
      value: site.projectsDelivered,
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

    /**
     * The rows the panel offers where it has no leading button — on /contact,
     * where "Schedule a Consultation" would point at the page already open.
     * Each is a white row in the same hand as the call above it; the call
     * itself is built from `site.contact` and so is not listed here. Booking
     * goes to the enquiry form, which is the booking on this site.
     */
    actions: {
      whatsapp: "WhatsApp Us",
      email: "Email Us",
      book: { label: "Book Online", href: "/contact#enquiry" },
    },

    /** Labels only — every number and link is read from `site.contact`. */
    channels: {
      phone: "Call Us",
      email: "Email Us",
      whatsapp: "WhatsApp",
      whatsappValue: "Chat with our team",
    },
  },
};
