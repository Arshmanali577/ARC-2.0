/**
 * Residential and commercial service lines, migrated verbatim from the live
 * site's `residentialServices` / `commercialServices` arrays.
 */

export type Service = {
  id: string;
  title: string;
  description: string;
  /** Anchor id on its service page — matches the live site's `href`. */
  anchor: string;
  href: string;
};

export const residentialServices: Service[] = [
  {
    id: "1",
    title: "Custom Homes",
    description:
      "From concept to completion, we design and build bespoke homes tailored to your lifestyle, site, and budget.",
    anchor: "custom-homes",
    href: "/residential#custom-homes",
  },
  {
    id: "2",
    title: "Renovations",
    description:
      "Transform your existing home with expertly managed renovations that enhance space, light, and value.",
    anchor: "renovations",
    href: "/residential#renovations",
  },
  {
    id: "3",
    title: "Extensions",
    description:
      "Expand your living area with thoughtfully designed extensions that blend seamlessly with your home.",
    anchor: "extensions",
    href: "/residential#extensions",
  },
  {
    id: "4",
    title: "Granny Flats & Duplex",
    description:
      "Maximise your property's potential with dual-occupancy builds and self-contained granny flats.",
    anchor: "granny-flats",
    href: "/residential#granny-flats",
  },
  {
    id: "5",
    title: "Designer Homes",
    description:
      "Premium architectural homes with exceptional finishes and cutting-edge design for the discerning homeowner.",
    anchor: "designer-homes",
    href: "/residential#designer-homes",
  },
  {
    id: "6",
    title: "Units & Townhouses",
    description:
      "Multi-dwelling developments built to the highest standards, maximising livability and return on investment.",
    anchor: "units",
    href: "/residential#units",
  },
];

export const commercialServices: Service[] = [
  {
    id: "7",
    title: "Shop Fitouts",
    description:
      "Complete commercial fitout solutions for retail spaces, delivering on time and on budget.",
    anchor: "shop-fitouts",
    href: "/commercial#shop-fitouts",
  },
  {
    id: "8",
    title: "Medical Centres",
    description:
      "Specialist medical centre construction meeting all healthcare regulations and compliance requirements.",
    anchor: "medical-centres",
    href: "/commercial#medical-centres",
  },
  {
    id: "9",
    title: "Childcare Centres",
    description:
      "Purpose-built childcare facilities designed for safety, functionality, and inspiring learning environments.",
    anchor: "childcare",
    href: "/commercial#childcare",
  },
  {
    id: "10",
    title: "Commercial Buildings",
    description:
      "End-to-end commercial construction for offices, warehouses, and mixed-use developments.",
    anchor: "commercial-buildings",
    href: "/commercial#commercial-buildings",
  },
];

export const allServices: Service[] = [
  ...residentialServices,
  ...commercialServices,
];
