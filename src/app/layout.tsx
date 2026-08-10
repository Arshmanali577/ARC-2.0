import type { Metadata, Viewport } from "next";
import { Inter, Questrial } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/content/site";

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
    default: `${site.name} — Custom Home Builders, Brisbane & South East Queensland`,
    template: `%s | ${site.name}`,
  },
  description:
    "ARC Builders takes your brief from first sketch to final handover — design, approvals, construction and finishes handled under one roof. QBCC licensed custom home builders in Brisbane.",
  keywords: [
    "custom home builders Brisbane",
    "new home builders South East Queensland",
    "renovations Brisbane",
    "granny flats",
    "shop fitouts",
    "ARC Builders",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "en_AU",
    title: `${site.name} — Build your vision, not a version of it`,
    description: site.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Build your vision, not a version of it`,
    description: site.shortDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#002B5C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${questrial.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
