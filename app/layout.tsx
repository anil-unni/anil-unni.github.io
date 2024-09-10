import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anil Unni - Expert Web Developer from Kerala, India",
  description: "Welcome to the portfolio of Anil Unni, a skilled web developer from Kerala, India. Explore my work, projects, and expertise in web development, including React, Django, and FastAPI.",
  keywords: "Anil Unni, web developer, portfolio, React, Django, FastAPI, Kerala, India, software development",
  openGraph: {
    title: "Anil Unni - Expert Web Developer from Kerala, India",
    description: "Explore the portfolio of Anil Unni, showcasing expertise in web development technologies like React, Django, and FastAPI.",
    url: "https://anilunni.me",
    siteName: "Anil Unni Portfolio",
    images: [
      {
        url: "https://anilunni.me",
        width: 1200,
        height: 630,
        alt: "Anil Unni - Web Developer"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@anilunni123",
    title: "Anil Unni - Expert Web Developer from Kerala, India",
    description: "Explore the portfolio of Anil Unni, showcasing expertise in web development technologies like React, Django, and FastAPI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
