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
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main
        className={cn(
          "container flex-1 max-w-5xl px-4 py-8 md:py-10",
          className,
        )}
      >
        {children}
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="container max-w-5xl px-4">
          Lead qualification for service businesses.
        </div>
      </footer>
    </div>
  );
}
