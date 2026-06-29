"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <p className="text-label-sm tracking-[0.2em] text-error uppercase mb-4">Error</p>
      <h1 className="text-display-md font-semibold text-foreground mb-4">Something went wrong</h1>
      <p className="text-sm text-muted max-w-sm leading-relaxed mb-10">
        An unexpected error occurred. You can try again, or head back to the home page.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:border-accent/40 transition-colors"
        >
          Go home
        </Link>
      </div>
      {error.digest && (
        <p className="mt-8 text-[10px] text-muted/40 font-mono">Error ID: {error.digest}</p>
      )}
    </main>
  );
}
