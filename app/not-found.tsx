import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <p className="text-label-sm tracking-[0.2em] text-accent uppercase mb-4">404</p>
      <h1 className="text-display-md font-semibold text-foreground mb-4">Page not found</h1>
      <p className="text-sm text-muted max-w-sm leading-relaxed mb-10">
        The page you&apos;re looking for doesn&apos;t exist or was moved. Let&apos;s get you back on track.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:border-accent/40 transition-colors"
        >
          Read the blog
        </Link>
      </div>
      <p className="mt-16 text-xs text-muted/40">{siteConfig.name}</p>
    </main>
  );
}
