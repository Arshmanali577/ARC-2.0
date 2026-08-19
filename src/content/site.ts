/**
 * Global site facts: brand, contact details, licence, navigation.
 * Nothing else in the codebase should hardcode a phone number or address.
 *
 * Every value here is migrated verbatim from the live site's `companyInfo`
 * (Content-Extraction/Assets/Text/Original-Content-Sources/src/lib/data.ts).
 */

export const site = {
  name: "ARC Builders",
  legalName: "Aesthetic Residential and Commercial Builders",
  tagline:
    "Custom Homes Designed for Modern Families - Trusted Builders in Brisbane & South East Queensland.",
  shortDescription:
    "Custom Homes Designed for Modern Families - Trusted Builders in Brisbane & South East Queensland.",
  url: "https://arcbuilders.com.au",
  region: "Brisbane & South East Queensland",
  copyrightYear: 2026,
  experience: "18+",

  /**
   * The headline delivery figure the proof bands quote. It counts the whole
   * build history, not the twelve case studies kept in `projects.ts`, so it is
   * stated here rather than derived from that array.
   */
  projectsDelivered: "100+",

  licence: {
    label: "QBCC Licensed Builder",
    authority: "QBCC",
    number: "15090326",
  },

  contact: {
    phone: "0411 878 438",
    phoneHref: "tel:+61411878438",
    email: "admin@arcbuilders.com.au",
    emailHref: "mailto:admin@arcbuilders.com.au",
    whatsappHref:
      "https://wa.me/61411878438?text=Hi%20ARC%20Builders%2C%20I%27m%20interested%20in%20discussing%20a%20project.",
    /** The floating chat button in the corner of every page. */
    whatsappLabel: "Message on WhatsApp",
    mapEmbed:
      "https://www.google.com/maps?q=25+Langford+Street,+Eight+Mile+Plains+QLD+4113,+Australia&output=embed",
    directionsHref:
      "https://www.google.com/maps/dir/?api=1&destination=8+Clunies+Ross+Court,+Eight+Mile+Plains+QLD+4113,+Australia",
    address: {
      street: "8 Clunies Ross Court",
      locality: "Eight Mile Plains",
      region: "QLD",
      postcode: "4113",
    },
    /**
     * Trading hours, as two rows so the contact page can set the days apart
     * from the times. Not present in the migrated `companyInfo` — taken from
     * the contact-page design; correct here if the office keeps other hours.
     */
    hours: [
      { days: "Mon – Fri", time: "7:00am – 5:00pm" },
      { days: "Sat", time: "8:00am – 12:00pm" },
    ],
  },
} as const;

export const addressLine1 = site.contact.address.street;
export const addressLine2 = `${site.contact.address.locality} ${site.contact.address.region} ${site.contact.address.postcode}`;
export const addressFull = `${addressLine1}, ${addressLine2}`;

/** Areas the business advertises. Mirrors `siteConfig.serviceAreas`. */
export const serviceAreaNames: string[] = [
  "Brisbane",
  "Brisbane Southside",
  "Logan",
  "Rochedale",
  "Calamvale",
  "Pallara",
  "Greenbank",
  "Eight Mile Plains",
  "Mount Gravatt",
  "Bahrs Scrub",
  "South East Queensland",
];

export const defaultKeywords: string[] = [
  "custom home builder Brisbane",
  "builder Logan",
  "custom home builder Rochedale",
  "custom home builder South East Queensland",
  "home builder South East Queensland",
  "Indian Australian home builder",
  "multi-generational home builder",
  "duplex builder Queensland",
  "transparent pricing builder",
  "residential and commercial builder Brisbane",
  "ARC Builders",
];

export type NavItem = { label: string; href: string };

/** A nav entry that opens a dropdown instead of routing anywhere itself. */
export type NavGroup = { label: string; children: NavItem[] };

export type NavEntry = NavItem | NavGroup;

export const isNavGroup = (entry: NavEntry): entry is NavGroup =>
  "children" in entry;

/** The two service pages, offered under the "Services" nav dropdown. */
export const servicesNav: NavItem[] = [
  { label: "Residential", href: "/residential" },
  { label: "Commercial", href: "/commercial" },
];

/** Every nav item routes to its own page — no in-page anchors. */
export const primaryNav: NavEntry[] = [
  { label: "Home", href: "/" },
  { label: "Services", children: servicesNav },
  { label: "Projects", href: "/projects" },
  { label: "Locations", href: "/locations" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const headerCta: NavItem = {
  label: "Book a consultation",
  href: "/contact",
};

/**
 * Every footer service carries the glyph it is listed with. The name resolves
 * to a drawing in `components/ui/icon.tsx` — keeping the key here rather than a
 * component reference is what lets this file stay free of JSX.
 */
export type ServiceIconName =
  | "home"
  | "building"
  | "draft"
  | "hammer"
  | "extend"
  | "cabin"
  | "store"
  | "medical";

export type ServiceNavItem = NavItem & { icon: ServiceIconName };

export const footerServices: ServiceNavItem[] = [
  { label: "Residential", href: "/residential", icon: "home" },
  { label: "Commercial", href: "/commercial", icon: "building" },
  { label: "Custom Homes", href: "/residential#custom-homes", icon: "draft" },
  { label: "Renovations", href: "/residential#renovations", icon: "hammer" },
  { label: "Extensions", href: "/residential#extensions", icon: "extend" },
  { label: "Granny Flats", href: "/residential#granny-flats", icon: "cabin" },
  { label: "Shop Fitouts", href: "/commercial#shop-fitouts", icon: "store" },
  {
    label: "Medical Centres",
    href: "/commercial#medical-centres",
    icon: "medical",
  },
];

/** The six suburbs the live footer lists. The index link is separate: the
    footer renders it as an action, not as a seventh suburb. */
export const footerAreas: NavItem[] = [
  { label: "Brisbane Southside", href: "/locations/brisbane-southside" },
  { label: "Logan", href: "/locations/logan" },
  { label: "Rochedale", href: "/locations/rochedale" },
  { label: "Calamvale", href: "/locations/calamvale" },
  { label: "Pallara", href: "/locations/pallara" },
  { label: "Greenbank", href: "/locations/greenbank" },
];

export const allAreasLink: NavItem = {
  label: "View All Areas",
  href: "/locations",
};

/* -- Footer -------------------------------------------------------------- */

/**
 * Social profiles. The hrefs are `#` in the live site's `companyInfo.socials`
 * and are migrated verbatim — swap in the real profile URLs when they exist.
 */
export type SocialNetwork = "facebook" | "instagram" | "linkedin" | "youtube";

export type SocialLink = { label: string; href: string; network: SocialNetwork };

export const socials: SocialLink[] = [
  { label: "Facebook", href: "#", network: "facebook" },
  { label: "Instagram", href: "#", network: "instagram" },
  { label: "LinkedIn", href: "#", network: "linkedin" },
  { label: "YouTube", href: "#", network: "youtube" },
];

/** The two-line statement the footer's bottom bar opens with. */
export const footerCreed = {
  lead: "Building spaces that inspire.",
  echo: "Crafted with trust. Built for life.",
} as const;

/** Its answering line, set in the same hand further along the bottom bar. */
export const footerCreedEcho = {
  lead: "Quality is never an accident.",
  echo: "It is drawn, then it is built.",
} as const;

/** Column headings, so the footer component carries no copy of its own. */
export const footerLabels = {
  services: "Services",
  contact: "Contact",
  areas: "Service Areas",
  follow: "Follow Us",
  rights: "All rights reserved.",
} as const;
