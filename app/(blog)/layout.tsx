export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="text-sm font-semibold text-foreground hover:text-accent transition-colors">
            Anil Unni
          </a>
          <nav aria-label="Blog navigation">
            <a href="/blog" className="text-xs text-muted hover:text-foreground transition-colors">
              All posts
            </a>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
