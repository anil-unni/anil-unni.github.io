import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070709",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anilunni.me"),
  title: {
    default: "Anil Unni — Lead Full-Stack Engineer",
    template: "%s | Anil Unni",
  },
  description:
    "Anil Unni is a Lead Full-Stack Engineer and Technical Lead specialising in React, Python, Node.js, enterprise architecture, and advanced AI-assisted workflows.",
  keywords: [
    "Anil Unni",
    "Lead Engineer",
    "Technical Lead",
    "Full-Stack Architect",
    "React developer",
    "Next.js developer",
    "Python developer",
    "Django",
    "FastAPI",
    "TypeScript",
    "AI workflows",
    "Enterprise Architecture",
  ],
  authors: [{ name: "Anil Unni", url: "https://anilunni.me" }],
  creator: "Anil Unni",
  publisher: "Anil Unni",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anilunni.me",
    siteName: "Anil Unni",
    title: "Anil Unni — Lead Full-Stack Engineer",
    description:
      "Lead Full-Stack Engineer and Technical Lead. Building high-end digital experiences, directing technical teams, and architecting robust enterprise systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anil Unni — Lead Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@anilunni123",
    creator: "@anilunni123",
    title: "Anil Unni — Lead Full-Stack Engineer",
    description:
      "Lead Full-Stack Engineer and Technical Lead. Building high-end digital experiences.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://anilunni.me",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://anilunni.me/#website",
      "url": "https://anilunni.me",
      "name": "Anil Unni Portfolio",
      "description": "Personal portfolio of Anil Unni, Lead Full-Stack Engineer and Product Builder.",
      "publisher": {
        "@id": "https://anilunni.me/#person"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://anilunni.me/#profilepage",
      "url": "https://anilunni.me",
      "mainEntity": {
        "@id": "https://anilunni.me/#person"
      }
    },
    {
      "@type": "Person",
      "@id": "https://anilunni.me/#person",
      "name": "Anil Unni",
      "url": "https://anilunni.me",
      "jobTitle": "Lead Full-Stack Engineer & Technical Lead",
      "description": "Lead Full-Stack Engineer and Technical Lead specializing in React, Next.js, TypeScript, Python, and enterprise systems architecture.",
      "image": "https://anilunni.me/og-image.png",
      "email": "anilunni@outlook.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kerala",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://github.com/anil-unni",
        "https://linkedin.com/in/anilunni",
        "https://twitter.com/anilunni123"
      ],
      "knowsAbout": [
        "React",
        "Next.js",
        "TypeScript",
        "Python",
        "Django",
        "FastAPI",
        "Node.js",
        "PostgreSQL",
        "Enterprise Architecture",
        "Technical Leadership",
        "AI-Assisted Workflows"
      ],
      "publishingPrinciples": "https://anilunni.me/llms.txt"
    },
    {
      "@type": "ItemList",
      "@id": "https://anilunni.me/#projects",
      "name": "Selected Projects",
      "description": "A highly selective showcase of enterprise architectures, scaling initiatives, and product launches.",
      "numberOfItems": 3,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "CreativeWork",
            "name": "Enterprise Business Suite",
            "description": "Architecture and UI development for a comprehensive business management suite featuring HRMS, accounting, and task modules.",
            "creator": {
              "@id": "https://anilunni.me/#person"
            },
            "keywords": ["ERP", "Full-Stack", "Lead"]
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "CreativeWork",
            "name": "FinTax Compliance Platform",
            "description": "Engineered backend services and strict compliance adherence for digital tax requirement integrations.",
            "creator": {
              "@id": "https://anilunni.me/#person"
            },
            "keywords": ["Backend", "API", "FinTech"]
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "CreativeWork",
            "name": "Global Travel Portal",
            "description": "Development of custom download architectures and secure itinerary generation for a B2B/B2C travel booking suite.",
            "creator": {
              "@id": "https://anilunni.me/#person"
            },
            "keywords": ["Web", "UI/UX", "Booking"]
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
