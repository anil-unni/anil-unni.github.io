"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const ids = siteConfig.nav
      .map((l) => l.href)
      .filter((h) => h.startsWith("#"))
      .map((h) => h.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-16">
        <Link
          href="/"
          data-cursor="hover"
          className="text-[11px] font-semibold tracking-[0.15em] uppercase text-foreground hover:text-accent transition-colors"
          aria-label={`${siteConfig.name} — home`}
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((link) => {
            const sectionId = link.href.startsWith("#") ? link.href.slice(1) : null;
            const isActive = sectionId ? activeSection === sectionId : false;
            return (
              <a
                key={link.href}
                href={link.href}
                data-cursor="hover"
                className="relative text-[11px] tracking-[0.15em] uppercase transition-colors"
                style={{ color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted))" }}
              >
                {isActive && (
                  <span
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        <button
          className="md:hidden text-muted hover:text-foreground transition-colors"
          data-cursor="hover"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            ) : (
              <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/></>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="md:hidden border-t border-border bg-background px-6 py-5">
          <ul className="flex flex-col gap-5">
            {siteConfig.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor="hover"
                  className="text-[11px] tracking-[0.15em] uppercase text-muted hover:text-foreground transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
