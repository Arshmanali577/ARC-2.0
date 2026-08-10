export type LocalArea = {
  slug: string;
  name: string;
  regionLabel: string;
  title: string;
  metaDescription: string;
  heroImage: string;
  intro: string;
  strengths: string[];
  projectSlugs: string[];
};

export const localAreas: LocalArea[] = [
  {
    slug: "brisbane-southside",
    name: "Brisbane Southside",
    regionLabel: "Brisbane, QLD",
    title: "Custom Home Builder Brisbane Southside",
    metaDescription:
      "ARC Builders designs and builds custom homes, renovations and premium family residences across Brisbane Southside with clear pricing and quality-first delivery.",
    heroImage: "/projects/25-langford-st/hero.webp",
    intro:
      "ARC Builders supports Brisbane Southside families with custom homes, renovations, extensions and practical family residences shaped around lifestyle, budget clarity and long-term build quality.",
    strengths: [
      "Custom home planning for established southside blocks",
      "Renovation and extension guidance for growing households",
      "Transparent scope review before construction commitments",
    ],
    projectSlugs: ["25-langford-st", "3-stanley-st-mount-gravatt", "17-ormskirk-st-calamvale"],
  },
  {
    slug: "logan",
    name: "Logan",
    regionLabel: "Logan, QLD",
    title: "Custom Home Builder Logan",
    metaDescription:
      "Custom homes, duplex projects, renovations and family builds by ARC Builders for Logan and South East Queensland homeowners.",
    heroImage: "/projects/3-dart-ave-kingston/hero.webp",
    intro:
      "For Logan homeowners, ARC Builders brings a measured design-and-build process with practical guidance on budget, approvals, site conditions and finishes.",
    strengths: [
      "Custom homes and duplex-ready planning",
      "Straightforward communication from consultation to handover",
      "Project pages and build examples from nearby South East Queensland suburbs",
    ],
    projectSlugs: ["3-dart-ave-kingston", "18-skye-court-bahrs-scrub", "8-vineyard-drive-greenbank"],
  },
  {
    slug: "rochedale",
    name: "Rochedale",
    regionLabel: "Rochedale, QLD",
    title: "Custom Home Builder Rochedale",
    metaDescription:
      "ARC Builders delivers custom homes and premium family residences for Rochedale and Rochedale South clients with clear pricing and refined finishes.",
    heroImage: "/projects/25-binnalong-st-rochedale-south/hero.webp",
    intro:
      "Rochedale and Rochedale South families often need homes that balance premium finishes with practical planning. ARC Builders helps shape each build around site realities, family routines and confident project management.",
    strengths: [
      "Premium family-home planning for Rochedale and nearby suburbs",
      "Detailed scope conversations before quoting",
      "Finished project references from Rochedale South and Brisbane Southside",
    ],
    projectSlugs: ["25-binnalong-st-rochedale-south", "25-langford-st", "49-herbert-st"],
  },
  {
    slug: "calamvale",
    name: "Calamvale",
    regionLabel: "Calamvale, QLD",
    title: "Custom Home Builder Calamvale",
    metaDescription:
      "Calamvale custom homes and family residences by ARC Builders, with modern layouts, quality finishes and transparent project guidance.",
    heroImage: "/projects/17-ormskirk-st-calamvale/hero.webp",
    intro:
      "ARC Builders has a strong project base around Calamvale, helping families plan modern residences with polished street appeal, liveable layouts and carefully selected finishes.",
    strengths: [
      "Local custom-home examples in Calamvale",
      "Family-focused layouts and multi-generational planning options",
      "Clear build process from first consultation through completion",
    ],
    projectSlugs: ["17-ormskirk-st-calamvale", "35-ayesha-place-calamvale", "25-binnalong-st-rochedale-south"],
  },
  {
    slug: "pallara",
    name: "Pallara",
    regionLabel: "Pallara, QLD",
    title: "Custom Home Builder Pallara",
    metaDescription:
      "ARC Builders creates custom homes and premium family residences for Pallara homeowners across Brisbane and South East Queensland.",
    heroImage: "/projects/14-verona-st-pallara/hero.webp",
    intro:
      "Pallara is a strong fit for modern family builds, and ARC Builders helps clients plan custom homes with careful attention to space, finishes, outdoor connection and everyday comfort.",
    strengths: [
      "Custom design-and-build support for new estates and family blocks",
      "Premium finish planning without losing budget discipline",
      "Relevant Pallara project imagery and case-study context",
    ],
    projectSlugs: ["14-verona-st-pallara", "17-ormskirk-st-calamvale", "8-vineyard-drive-greenbank"],
  },
  {
    slug: "greenbank",
    name: "Greenbank",
    regionLabel: "Greenbank, QLD",
    title: "Custom Home Builder Greenbank",
    metaDescription:
      "Greenbank acreage homes and custom family builds by ARC Builders, designed for space, lifestyle and transparent project delivery.",
    heroImage: "/projects/8-vineyard-drive-greenbank/hero.webp",
    intro:
      "Greenbank sites often call for generous planning, strong outdoor connection and practical decisions around access, services and lifestyle. ARC Builders helps clients shape acreage homes with clarity from the start.",
    strengths: [
      "Acreage and larger-block home planning",
      "Outdoor entertaining and family-lifestyle design thinking",
      "Scope clarity for site-specific requirements",
    ],
    projectSlugs: ["8-vineyard-drive-greenbank", "18-skye-court-bahrs-scrub", "3-brooklyn-st-spring-mountain"],
  },
  {
    slug: "eight-mile-plains",
    name: "Eight Mile Plains",
    regionLabel: "Eight Mile Plains, QLD",
    title: "Custom Home Builder Eight Mile Plains",
    metaDescription:
      "ARC Builders delivers custom homes, renovations and premium family residences in Eight Mile Plains and Brisbane Southside.",
    heroImage: "/projects/25-langford-st/hero.webp",
    intro:
      "Based around Eight Mile Plains, ARC Builders works with homeowners who want a clear design-to-handover process, premium presentation and practical advice before the build begins.",
    strengths: [
      "Local builder presence in Eight Mile Plains",
      "Premium family homes, renovations and extension guidance",
      "Fast access to Brisbane Southside and South East Queensland service areas",
    ],
    projectSlugs: ["25-langford-st", "3-stanley-st-mount-gravatt", "25-binnalong-st-rochedale-south"],
  },
  {
    slug: "mount-gravatt",
    name: "Mount Gravatt",
    regionLabel: "Mount Gravatt, QLD",
    title: "Custom Home Builder Mount Gravatt",
    metaDescription:
      "Mount Gravatt custom homes and premium renovations by ARC Builders, with quality workmanship and transparent project guidance.",
    heroImage: "/projects/3-stanley-st-mount-gravatt/hero.webp",
    intro:
      "ARC Builders supports Mount Gravatt clients with custom homes and renovation planning that respects established streetscapes while delivering modern family comfort.",
    strengths: [
      "Experience with premium residential detailing",
      "Practical planning for established Brisbane suburbs",
      "Strong project references across nearby southside locations",
    ],
    projectSlugs: ["3-stanley-st-mount-gravatt", "25-langford-st", "49-herbert-st"],
  },
  {
    slug: "bahrs-scrub",
    name: "Bahrs Scrub",
    regionLabel: "Bahrs Scrub, QLD",
    title: "Custom Home Builder Bahrs Scrub",
    metaDescription:
      "Bahrs Scrub custom homes and new family residences by ARC Builders for Logan and South East Queensland clients.",
    heroImage: "/projects/18-skye-court-bahrs-scrub/hero.webp",
    intro:
      "For Bahrs Scrub homeowners, ARC Builders provides a practical custom-home pathway with guidance on layouts, finishes, site needs and long-term family liveability.",
    strengths: [
      "New-home planning for growing Logan-region communities",
      "Clear consultation and scope review before quoting",
      "Relevant Bahrs Scrub and nearby project examples",
    ],
    projectSlugs: ["18-skye-court-bahrs-scrub", "3-dart-ave-kingston", "8-vineyard-drive-greenbank"],
  },
  {
    slug: "south-east-queensland",
    name: "South East Queensland",
    regionLabel: "South East Queensland",
    title: "Custom Home Builder South East Queensland",
    metaDescription:
      "ARC Builders designs and builds custom homes, renovations, extensions and selected commercial projects across South East Queensland.",
    heroImage: "/projects/49-herbert-st/hero.webp",
    intro:
      "Across South East Queensland, ARC Builders focuses on custom homes, renovations, extensions and selected commercial projects where clear communication and quality workmanship matter.",
    strengths: [
      "Residential and selected commercial delivery across the region",
      "Transparent pricing and practical build-stage communication",
      "A growing project portfolio across Brisbane, Logan and surrounding suburbs",
    ],
    projectSlugs: ["49-herbert-st", "14-verona-st-pallara", "17-ormskirk-st-calamvale"],
  },
];

export function getLocalArea(slug: string) {
  return localAreas.find((area) => area.slug === slug);
}
