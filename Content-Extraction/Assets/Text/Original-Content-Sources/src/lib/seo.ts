import type { Metadata } from "next";
import { companyInfo } from "./data";

const normalizedSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://arcbuilders.com.au").replace(/\/+$/, "");

export const siteConfig = {
  name: companyInfo.name,
  fullName: companyInfo.fullName,
  description: companyInfo.tagline,
  url: normalizedSiteUrl,
  locale: "en_AU",
  serviceAreas: [
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
  ],
};

export const defaultKeywords = [
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

export function absoluteUrl(path = "/") {
  if (!path || path === "/") {
    return `${siteConfig.url}/`;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  images?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  images = ["/hero.webp"],
  type = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const imageUrls = images.map((imagePath) => absoluteUrl(imagePath));

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: imageUrls,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrls,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
