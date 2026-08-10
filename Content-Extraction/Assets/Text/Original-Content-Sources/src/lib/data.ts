import { Project, Service, Testimonial, ProcessStep } from "./types";

const buildProjectGallery = (slug: string, galleryCount = 9) =>
  Array.from(
    { length: galleryCount },
    (_, index) => `/projects/${slug}/gallery-${String(index + 1).padStart(2, "0")}.webp`
  );

/* â”€â”€ Projects â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export const projects: Project[] = [
  {
    id: "1",
    title: "Aurelia Residence",
    slug: "14-verona-st-pallara",
    location: "Pallara, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Full design & build - luxury family home",
    description:
      "A beautifully crafted family residence in Pallara featuring modern architectural lines, premium finishes, and spacious open-plan living. Designed to embrace the Queensland lifestyle with seamless indoor-outdoor flow.",
    projectNarrative:
      "Planned as a refined family residence, Aurelia Residence balances calm interiors, warm timber tones, and generous glazing to create a home that feels open, bright, and easy to live in every day.",
    heroImage: "/projects/14-verona-st-pallara/hero.webp",
    images: buildProjectGallery("14-verona-st-pallara", 11),
    featured: true,
  },
  {
    id: "2",
    title: "Solstice Residence",
    slug: "25-langford-st",
    location: "Eight Mile Plains, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Custom home - contemporary design & build",
    description:
      "A striking contemporary residence showcasing bold architectural design, high-end interiors, and expansive living spaces. Built with meticulous attention to detail and quality craftsmanship throughout.",
    projectNarrative:
      "From the dark joinery and sculpted kitchen detailing to the layered living zones, Solstice Residence was delivered as a contemporary home with strong visual impact and practical spaces for modern family routines.",
    heroImage: "/projects/25-langford-st/hero.webp",
    images: buildProjectGallery("25-langford-st", 13),
    featured: true,
  },
  {
    id: "3",
    title: "Lumiere Residence",
    slug: "49-herbert-st",
    location: "Camp Hill, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Full design & build - modern family home",
    description:
      "A sophisticated modern family home featuring clean architectural lines, premium material selections, and thoughtfully designed living spaces that maximise natural light and ventilation.",
    projectNarrative:
      "Every decision on Lumiere Residence centred on light, proportion, and finish quality, resulting in a home that feels elegant, welcoming, and highly functional for day-to-day family living.",
    heroImage: "/projects/49-herbert-st/hero.webp",
    images: buildProjectGallery("49-herbert-st", 15),
    featured: true,
  },
  {
    id: "4",
    title: "Evercrest Residence",
    slug: "3-brooklyn-st-spring-mountain",
    location: "Spring Mountain, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Custom home - new build",
    description:
      "A stunning custom home in the Spring Mountain estate featuring contemporary architecture, premium finishes, and generous living areas designed for modern family living in one of Brisbane's most sought-after growth corridors.",
    projectNarrative:
      "Set within Spring Mountain, Evercrest Residence was shaped to make the most of its estate setting with modern street appeal, efficient planning, and flexible living areas that support a growing household.",
    heroImage: "/projects/3-brooklyn-st-spring-mountain/hero.webp",
    images: buildProjectGallery("3-brooklyn-st-spring-mountain", 6),
    featured: false,
  },
  {
    id: "5",
    title: "Willowmere Residence",
    slug: "3-dart-ave-kingston",
    location: "Kingston, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Full design & build - family home",
    description:
      "A well-appointed family home in Kingston combining functional design with stylish contemporary finishes. Every space has been carefully planned to deliver comfort, practicality, and lasting quality.",
    projectNarrative:
      "Willowmere Residence focused on liveability first, with a practical layout, durable finishes, and comfortable shared spaces that make the home as functional as it is visually polished.",
    heroImage: "/projects/3-dart-ave-kingston/hero.webp",
    images: buildProjectGallery("3-dart-ave-kingston", 7),
    featured: false,
  },
  {
    id: "6",
    title: "Halcyon Residence",
    slug: "3-stanley-st-mount-gravatt",
    location: "Mount Gravatt, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Full design & build - luxury home",
    description:
      "An impressive custom build in Mount Gravatt showcasing architectural excellence and superior craftsmanship. Featuring high ceilings, premium kitchen design, and beautifully appointed interiors throughout.",
    projectNarrative:
      "Halcyon Residence combines elevated detailing with strong everyday usability, bringing together feature ceilings, bespoke kitchen elements, and carefully resolved interiors in a confidently finished family home.",
    heroImage: "/projects/3-stanley-st-mount-gravatt/hero.webp",
    images: buildProjectGallery("3-stanley-st-mount-gravatt", 13),
    featured: true,
  },
  {
    id: "7",
    title: "Elmsworth Residence",
    slug: "35-ayesha-place-calamvale",
    location: "Calamvale, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Custom home - modern family build",
    description:
      "A modern family home in Calamvale designed with thoughtful attention to space, light, and lifestyle. Featuring contemporary interiors, quality finishes, and functional living areas perfect for family life.",
    projectNarrative:
      "Designed for relaxed family living, Elmsworth Residence pairs contemporary styling with thoughtful zoning, quality joinery, and bright internal spaces that feel connected from front to rear.",
    heroImage: "/projects/35-ayesha-place-calamvale/hero.webp",
    images: buildProjectGallery("35-ayesha-place-calamvale", 10),
    featured: false,
  },
  {
    id: "8",
    title: "Oakmont Residence",
    slug: "8-vineyard-drive-greenbank",
    location: "Greenbank, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Full design & build - acreage home",
    description:
      "A spacious acreage home in Greenbank set against lush surroundings. This build features expansive living areas, a chef-grade kitchen, and outdoor entertaining spaces that make the most of the tranquil semi-rural setting.",
    projectNarrative:
      "With its acreage context in mind, Oakmont Residence was composed around spacious entertaining, expansive sight lines, and a layout that feels generous, grounded, and well suited to semi-rural living.",
    heroImage: "/projects/8-vineyard-drive-greenbank/hero.webp",
    images: buildProjectGallery("8-vineyard-drive-greenbank", 7),
    featured: true,
  },
  {
    id: "9",
    title: "Celeste Residence",
    slug: "hi-def-project",
    location: "Brisbane, QLD",
    type: "custom-home",
    year: "2024",
    architect: "ARC Design Studio",
    scope: "Full design & build - premium residence",
    description:
      "A premium custom residence showcasing ARC Builders' commitment to exceptional quality. This project features striking exterior design, luxurious interiors, and the finest material selections throughout.",
    projectNarrative:
      "Celeste Residence was curated as a premium showcase project, pairing bold presentation with luxurious finishes and a strong focus on craftsmanship, flow, and everyday comfort.",
    heroImage: "/projects/hi-def-project/hero.webp",
    images: buildProjectGallery("hi-def-project", 9),
    featured: false,
  },
  {
    id: "10",
    title: "Ormskirk Residence",
    slug: "17-ormskirk-st-calamvale",
    location: "Calamvale, QLD",
    type: "custom-home",
    year: "2026",
    architect: "ARC Design Studio",
    scope: "Custom home - completed family residence",
    description:
      "A contemporary Calamvale residence with a strong street presence, considered internal planning, and refined finishes throughout. The home balances family functionality with clean architectural presentation.",
    projectNarrative:
      "Ormskirk Residence was shaped around a polished everyday living experience, bringing together confident exterior form, practical zoning, and carefully finished interiors suited to modern family life.",
    heroImage: "/projects/17-ormskirk-st-calamvale/hero.webp",
    images: buildProjectGallery("17-ormskirk-st-calamvale", 29),
    featured: false,
  },
  {
    id: "11",
    title: "Binnalong Residence",
    slug: "25-binnalong-st-rochedale-south",
    location: "Rochedale South, QLD",
    type: "custom-home",
    year: "2026",
    architect: "ARC Design Studio",
    scope: "Custom home - full build",
    description:
      "A thoughtfully completed Rochedale South home featuring crisp exterior detailing, warm interior selections, and practical living spaces designed for comfort, durability, and day-to-day ease.",
    projectNarrative:
      "Binnalong Residence brings a composed, functional approach to the family home, with a gallery that follows the project from its exterior presence through to finished internal spaces and key living zones.",
    heroImage: "/projects/25-binnalong-st-rochedale-south/hero.webp",
    images: buildProjectGallery("25-binnalong-st-rochedale-south", 30),
    featured: false,
  },
  {
    id: "12",
    title: "Skye Court Residence",
    slug: "18-skye-court-bahrs-scrub",
    location: "Bahrs Scrub, QLD",
    type: "custom-home",
    year: "2026",
    architect: "ARC Design Studio",
    scope: "Custom home - new residence",
    description:
      "A fresh custom residence in Bahrs Scrub with bright internal spaces, contemporary finishes, and a clean, practical layout designed to support relaxed family living.",
    projectNarrative:
      "Skye Court Residence captures ARC Builders' focus on liveable design, resolved detailing, and polished presentation, with a gallery that highlights both the home's finished exterior and internal flow.",
    heroImage: "/projects/18-skye-court-bahrs-scrub/hero.webp",
    images: buildProjectGallery("18-skye-court-bahrs-scrub", 21),
    featured: false,
  },
];

/* â”€â”€ Services â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export const residentialServices: Service[] = [
  {
    id: "1",
    title: "Custom Homes",
    description:
      "From concept to completion, we design and build bespoke homes tailored to your lifestyle, site, and budget.",
    icon: "Home",
    href: "/residential#custom-homes",
  },
  {
    id: "2",
    title: "Renovations",
    description:
      "Transform your existing home with expertly managed renovations that enhance space, light, and value.",
    icon: "Hammer",
    href: "/residential#renovations",
  },
  {
    id: "3",
    title: "Extensions",
    description:
      "Expand your living area with thoughtfully designed extensions that blend seamlessly with your home.",
    icon: "Expand",
    href: "/residential#extensions",
  },
  {
    id: "4",
    title: "Granny Flats & Duplex",
    description:
      "Maximise your property's potential with dual-occupancy builds and self-contained granny flats.",
    icon: "Building2",
    href: "/residential#granny-flats",
  },
  {
    id: "5",
    title: "Designer Homes",
    description:
      "Premium architectural homes with exceptional finishes and cutting-edge design for the discerning homeowner.",
    icon: "Gem",
    href: "/residential#designer-homes",
  },
  {
    id: "6",
    title: "Units & Townhouses",
    description:
      "Multi-dwelling developments built to the highest standards, maximising livability and return on investment.",
    icon: "Building",
    href: "/residential#units",
  },
];

export const commercialServices: Service[] = [
  {
    id: "7",
    title: "Shop Fitouts",
    description:
      "Complete commercial fitout solutions for retail spaces, delivering on time and on budget.",
    icon: "Store",
    href: "/commercial#shop-fitouts",
  },
  {
    id: "8",
    title: "Medical Centres",
    description:
      "Specialist medical centre construction meeting all healthcare regulations and compliance requirements.",
    icon: "HeartPulse",
    href: "/commercial#medical-centres",
  },
  {
    id: "9",
    title: "Childcare Centres",
    description:
      "Purpose-built childcare facilities designed for safety, functionality, and inspiring learning environments.",
    icon: "Baby",
    href: "/commercial#childcare",
  },
  {
    id: "10",
    title: "Commercial Buildings",
    description:
      "End-to-end commercial construction for offices, warehouses, and mixed-use developments.",
    icon: "Factory",
    href: "/commercial#commercial-buildings",
  },
];

/* â”€â”€ Testimonials â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Jaswinder & Reet",
    role: "Custom Family Home",
    quote:
      "Building our home with ARC Builders happened during one of the most important times of our lives. We were preparing to welcome our baby, and their team became a source of calm and reassurance. They didn't just build us a house; they created a warm, safe space where our new journey as a family could begin. We are deeply grateful to ARC Builders for turning such a special chapter of our lives into a truly beautiful experience.",
  },
  {
    id: "2",
    name: "Dr Tarunveer Bakshi & Dr Inderpreet Kaur",
    role: "Custom Home Abode",
    quote:
      "Our home build journey with ARC Builders was nothing short of exceptional. They brought our abode to life with a refined approach, blending modern design with practical functionality. The project was managed with precision and a strong sense of organisation, ensuring timelines were met without compromising on quality. We are extremely satisfied and would highly recommend ARC Builders for any custom home build.",
  },
  {
    id: "3",
    name: "Shakar Rahim and Shezadi Naz",
    role: "Custom Home",
    quote:
      "ARC Builders brought our vision of a custom home to life with remarkable precision. The finished home embodies warmth and individuality that truly reflects who we are. We would highly recommend ARC Builders to anyone seeking a home that blends comfort with modern elegance.",
  },
  {
    id: "4",
    name: "Dr Amer Malik and Dr Anum Cheema",
    role: "Modern Family Home",
    quote:
      "Building our home with ARC Builders was an exceptional experience. They understood the essence of modern family living, creating a space that balances openness, functionality, and refined design. Delivered with precision, clear communication, and impeccable attention to detail, the entire process was seamless.",
  },
  {
    id: "5",
    name: "Amer Chowdry and Dr Maimuna Akbar",
    role: "Medical Centre Development",
    quote:
      "Engaging ARC Builders for our medical centre was a truly outstanding experience. Their professionalism, transparent communication, and disciplined adherence to timelines ensured a seamless and stress-free process. ARC Builders have delivered a space that reflects excellence in every sense, and we would confidently recommend them for commercial and specialised developments.",
  },
];

/* â”€â”€ Process Steps â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Consultation",
    description:
      "We meet to understand your vision, requirements, and budget. We listen first, advise second, and always put your goals at the centre.",
  },
  {
    id: 2,
    title: "Planning & Design",
    description:
      "Our team develops detailed plans, provides upfront pricing, completes documentation, manages council approvals, and prepares for construction.",
  },
  {
    id: 3,
    title: "Construction",
    description:
      "Experienced trades bring your project to life with meticulous craftsmanship, regular updates, and on-time delivery.",
  },
  {
    id: 4,
    title: "Completion & Handover",
    description:
      "A thorough quality inspection, walkthrough, and handover. We stand behind our work with comprehensive warranties.",
  },
];

/* â”€â”€ Navigation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export const navLinks = [

  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Locations", href: "/locations" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/* â”€â”€ Company info â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export const companyInfo = {
  name: "ARC Builders",
  fullName: "Aesthetic Residential and Commercial Builders",
  phone: "0411 878 438",
  email: "admin@arcbuilders.com.au",
  address: "8 Clunies Ross Court, Eight Mile Plains QLD 4113",
  streetAddress: "8 Clunies Ross Court",
  suburb: "Eight Mile Plains",
  postcode: "4113",
  experience: "18+",
  tagline:
    "Custom Homes Designed for Modern Families - Trusted Builders in Brisbane & South East Queensland.",
  qbccLicence: "15090326",
  socials: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#",
  },
};
