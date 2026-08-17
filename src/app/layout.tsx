import type { Metadata, Viewport } from "next";
import { Inter, Questrial } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { allServices } from "@/content/services";
import { defaultKeywords, serviceAreaNames, site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/** Web-safe stand-in for Century Gothic, which the brand guide specifies. */
const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Custom Home Builder in Brisbane & South East Queensland`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  keywords: defaultKeywords,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "en_AU",
    title: `${site.name} | Custom Home Builder in Brisbane & South East Queensland`,
    description: site.tagline,
    images: [absoluteUrl("/hero.webp")],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Custom Home Builder in Brisbane & South East Queensland`,
    description: site.tagline,
    images: [absoluteUrl("/hero.webp")],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#002B5C",
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  legalName: site.legalName,
  description: site.tagline,
  url: site.url,
  telephone: site.contact.phone,
  email: site.contact.email,
  image: absoluteUrl("/hero.webp"),
  logo: absoluteUrl("/arc-logo.svg"),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.street,
    addressLocality: site.contact.address.locality,
    addressRegion: site.contact.address.region,
    postalCode: site.contact.address.postcode,
    addressCountry: "AU",
  },
  areaServed: serviceAreaNames,
  identifier: {
    "@type": "PropertyValue",
    name: "QBCC Licence",
    value: site.licence.number,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Building services",
    itemListElement: allServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${questrial.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationSchema),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:bg-brand focus:px-6 focus:py-3.5 focus:text-[13px] focus:font-semibold focus:uppercase focus:tracking-[0.12em] focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
