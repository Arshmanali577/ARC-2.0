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
    mapEmbed:
      "https://www.google.com/maps?q=25+Langford+Street,+Eight+Mile+Plains+QLD+4113,+Australia&output=embed",
    address: {
      street: "8 Clunies Ross Court",
      locality: "Eight Mile Plains",
      region: "QLD",
      postcode: "4113",
    },
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

/** The footer lists the routable pages; "Services" leads its own column. */
export const footerNav: NavItem[] = primaryNav.filter(
  (entry): entry is NavItem => !isNavGroup(entry),
);

export const footerServices: NavItem[] = [
  ...servicesNav,
  { label: "Custom Homes", href: "/residential#custom-homes" },
  { label: "Renovations", href: "/residential#renovations" },
  { label: "Extensions", href: "/residential#extensions" },
  { label: "Granny Flats", href: "/residential#granny-flats" },
  { label: "Shop Fitouts", href: "/commercial#shop-fitouts" },
  { label: "Medical Centres", href: "/commercial#medical-centres" },
];

/** The six suburbs the live footer lists, plus the index link. */
export const footerAreas: NavItem[] = [
  { label: "Brisbane Southside", href: "/locations/brisbane-southside" },
  { label: "Logan", href: "/locations/logan" },
  { label: "Rochedale", href: "/locations/rochedale" },
  { label: "Calamvale", href: "/locations/calamvale" },
  { label: "Pallara", href: "/locations/pallara" },
  { label: "Greenbank", href: "/locations/greenbank" },
  { label: "View All Areas", href: "/locations" },
];
