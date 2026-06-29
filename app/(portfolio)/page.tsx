import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import HeroSolutionsArchitect from "@/components/sections/HeroSolutionsArchitect";
import ERPSystemsGrid from "@/components/sections/ERPSystemsGrid";
import EnthusiastBento from "@/components/sections/EnthusiastBento";
import BlogPreview from "@/components/sections/BlogPreview";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Anil Unni — Solutions Consultant, Technologist & Photographer",
  description: "Architecting digital solutions. Capturing visual stories. Exploring the mechanics of technology and life.",
  alternates: { canonical: "https://anil-unni.github.io" },
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="pt-[65px]">
        <HeroSolutionsArchitect />

        <div aria-hidden className="mx-6 lg:mx-16 h-px bg-border" />

        <ERPSystemsGrid />

        <div aria-hidden className="mx-6 lg:mx-16 h-px bg-border" />

        <EnthusiastBento />

        <div aria-hidden className="mx-6 lg:mx-16 h-px bg-border" />

        <BlogPreview />

        <div aria-hidden className="mx-6 lg:mx-16 h-px bg-border" />

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
