"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home", exact: true },
  { href: "/intake", label: "Intake", exact: false },
  { href: "/dashboard", label: "Dashboard", exact: false },
] as const;

export function SiteHeader({ className }: { className?: string }) {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/70 bg-card/75 shadow-sm shadow-foreground/[0.03] backdrop-blur-md supports-[backdrop-filter]:bg-card/65",
        className,
      )}
    >
      <div className="mx-auto flex h-12 min-w-0 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 shrink-0 items-center gap-2 font-semibold tracking-tight text-foreground sm:gap-2.5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-brand-muted shadow-sm transition-shadow group-hover:shadow-card">
            <Sparkles className="h-4 w-4 text-brand" aria-hidden />
          </span>
          <span className="hidden sm:inline">Client Intake</span>
        </Link>

        <nav
          className="flex max-w-[min(100%,14rem)] shrink-0 items-center gap-0.5 overflow-x-auto rounded-lg border border-border/60 bg-surface/80 p-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:max-w-none sm:gap-1 sm:p-1 [&::-webkit-scrollbar]:hidden"
          aria-label="Main"
        >
          {nav.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
                  active
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
