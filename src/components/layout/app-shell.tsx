import type { ReactNode } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-background"
        aria-hidden
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--brand-muted)),transparent)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--surface))_0%,hsl(var(--background))_40%)]"
          aria-hidden
        />
      </div>
      <SiteHeader />
      <main
        className={cn(
          "mx-auto w-full max-w-6xl flex-1 px-4 py-5 sm:px-6 sm:py-6 md:py-7",
          className,
        )}
      >
        {children}
      </main>
      <footer className="mt-auto border-t border-border/80 bg-card/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-1.5 px-4 py-4 text-center text-xs text-muted-foreground sm:flex-row sm:px-6 sm:text-left">
          <span>Client Intake Dashboard</span>
          <span>Lead qualification for service businesses</span>
        </div>
      </footer>
    </div>
  );
}
