import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consulting",
  description: "Solutions consulting services — ERP implementation, system architecture, and process optimisation.",
  alternates: { canonical: "https://anil-unni.github.io/consulting" },
};

export default function ConsultingPage() {
  return (
    <main
      aria-label="Consulting services"
      className="min-h-screen bg-background flex items-center justify-center px-6"
    >
      <div className="text-center max-w-lg">
        <p className="text-label-sm tracking-[0.2em] text-accent uppercase mb-4">
          Solutions Consulting
        </p>
        <h1 className="text-display-md font-semibold text-foreground mb-4">
          Let&apos;s build something that actually works.
        </h1>
        <p className="text-sm text-muted leading-relaxed mb-8">
          ERP implementation, system architecture reviews, incident response, and
          process optimisation for organisations that can&apos;t afford to guess.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
        >
          Start a conversation
        </Link>
      </div>
    </main>
  );
}
