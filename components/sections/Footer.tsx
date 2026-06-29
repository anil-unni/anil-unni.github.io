"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

const socialIcons: Record<string, JSX.Element> = {
  github: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  linkedin: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  instagram: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  twitter: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
};

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return <>{time} IST</>;
}

const TICKER_ITEMS = [
  { label: "Location", value: "Mumbai, India" },
  { label: "Local time", value: <LocalTime /> },
  { label: "Based in", value: "India · Remote worldwide" },
  { label: "Discipline", value: "ERP · Solutions Architecture · Photography" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const tickerContent = (
    <>
      {TICKER_ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-2 px-8">
          <span className="text-muted/50">{item.label}</span>
          <span className="text-muted">{item.value}</span>
        </span>
      ))}
    </>
  );

  return (
    <footer aria-label="Site footer">
      {/* Marquee ticker */}
      <div className="border-t border-border overflow-hidden py-3" aria-hidden="true">
        <div
          className="flex whitespace-nowrap text-[10px] tracking-[0.12em] uppercase"
          style={{
            animation: "marquee-scroll 28s linear infinite",
            width: "max-content",
          }}
        >
          {tickerContent}
          {tickerContent}
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-border px-6 py-8 lg:px-16">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-foreground">{siteConfig.name}</p>
            <p className="text-[10px] text-muted mt-1">
              © {year} · {siteConfig.author.titles.join(" · ")}
            </p>
          </div>

          <nav aria-label="Social links" className="flex items-center gap-5">
            {Object.entries(siteConfig.social).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="text-muted hover:text-foreground transition-colors"
                aria-label={`${siteConfig.name} on ${key}`}
              >
                {socialIcons[key] ?? <span className="text-[10px] capitalize">{key}</span>}
              </a>
            ))}
            <a href="/blog" data-cursor="hover" className="text-[10px] tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors ml-2">
              Blog
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
