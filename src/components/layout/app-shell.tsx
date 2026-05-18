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
          "mx-auto w-full min-w-0 max-w-6xl flex-1 px-4 py-5 sm:px-6 sm:py-6 md:py-7 lg:px-8",
          className,
        )}
      >
        {children}
      </main>
      <footer className="mt-auto border-t border-border/40">
        <p className="mx-auto max-w-6xl px-4 py-3 text-center text-[11px] leading-relaxed text-muted-foreground/75 sm:px-6">
          Client Intake · Lead qualification for service businesses
        </p>
      </footer>
    </div>
  );
}
