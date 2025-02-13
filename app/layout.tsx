import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anil Unni | Full-Stack Developer & Software Consultant | Kerala",
  description: "Expert software developer specializing in custom web applications, mobile apps, and enterprise solutions. Proven track record in React, Django, FastAPI development. Available for freelance projects.",
  keywords: [
    "full stack developer",
    "software consultant",
    "react developer",
    "django developer",
    "fastapi expert",
    "web application development",
    "mobile app development",
    "freelance developer kerala",
    "software development services",
    "custom software solutions",
    "hire developer india",
    "enterprise software development",
    "anil unni",
    "kerala software developer",
    "remote developer",
  ].join(", "),
  
  openGraph: {
    title: "Hire Anil Unni | Expert Software Developer & Consultant",
    description: "Transform your business with custom software solutions. Specialized in React, Django, FastAPI, and full-stack development. Let's build something amazing together.",
    url: "https://anilunni.me",
    siteName: "Anil Unni - Software Development Services",
    images: [
      {
        url: "https://about.me/cdn-cgi/image/q=80,dpr=1,f=auto,fit=cover,w=105,h=70,gravity=0.281x0.212/https://assets.about.me/background/users/a/n/i/anilunni_1739437084_463.jpg",
        height: 630,
        alt: "Anil Unni - Professional Software Developer and Consultant"
      }
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@anilunni123",
    creator: "@anilunni123",
    title: "Hire Expert Software Developer | Web & Mobile Solutions",
    description: "Need a professional developer? I create custom web applications, mobile apps, and enterprise solutions. Expertise in React, Django, and FastAPI.",
    images: ["https://about.me/cdn-cgi/image/q=80,dpr=1,f=auto,fit=cover,w=105,h=70,gravity=0.281x0.212/https://assets.about.me/background/users/a/n/i/anilunni_1739437084_463.jpg"],
  },

  alternates: {
    canonical: "https://anilunni.me",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"/>
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Anil Unni" />
          <link rel="canonical" href="https://anilunni.me" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
