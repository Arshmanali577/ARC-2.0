/**
 * Global site facts: brand, contact details, licence, navigation.
 * Nothing else in the codebase should hardcode a phone number or address.
 */

export const site = {
  name: "ARC Builders",
  legalName: "Aesthetic Residential and Commercial Builders",
  shortDescription:
    "Aesthetic Residential and Commercial Builders. Custom homes for modern families across Brisbane and South East Queensland.",
  url: "https://www.arcbuilders.com.au",
  region: "Brisbane & South East Queensland",
  copyrightYear: 2026,

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
    whatsappHref: "https://wa.me/61411878438",
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

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#capability" },
  { label: "The journey", href: "#journey" },
  { label: "About", href: "#studio" },
];

export const headerCta: NavItem = {
  label: "Book a consultation",
  href: "#enquire",
};

export const footerNav: NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#capability" },
  { label: "The journey", href: "#journey" },
  { label: "About", href: "#studio" },
  { label: "Contact", href: "#enquire" },
];

export const footerServices: NavItem[] = [
  { label: "Custom Homes", href: "#capability" },
  { label: "Renovations", href: "#capability" },
  { label: "Extensions", href: "#capability" },
  { label: "Granny Flats", href: "#capability" },
  { label: "Shop Fitouts", href: "#capability" },
];
