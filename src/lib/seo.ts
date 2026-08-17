import type { Metadata } from "next";

import { defaultKeywords, site } from "@/content/site";

/** Page metadata helper, migrated from the live site's `createPageMetadata`. */

export function absoluteUrl(pathname = "/") {
  if (!pathname || pathname === "/") return `${site.url}/`;
  return `${site.url}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
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
  const imageUrls = images.map((imagePath) => absoluteUrl(imagePath));

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: site.name,
      locale: "en_AU",
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
      ? { index: false, follow: false, nocache: true }
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
