import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/config";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} — ${siteConfig.author.titles.join(", ")}`,
  },
  description: siteConfig.tagline,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.author.titles.join(", ")}`,
    description: siteConfig.tagline,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.author.titles.join(", ")}`,
    description: siteConfig.tagline,
    images: [siteConfig.ogImage],
  },
  alternates: { canonical: siteConfig.url },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  jobTitle: siteConfig.author.titles,
  sameAs: Object.values(siteConfig.social),
  knowsAbout: [
    "ERP Systems", "Solutions Architecture", "Business Process Automation",
    "Photography", "System Recovery", "SOP Implementation", "Next.js", "TypeScript",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
      <head>
        <JsonLd data={personJsonLd} />
      </head>
      <body className="bg-background text-foreground antialiased">
        <GrainOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
