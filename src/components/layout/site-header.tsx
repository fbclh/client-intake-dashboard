"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
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
        "sticky top-0 z-50 w-full border-b border-border/80 bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/70",
        className,
      )}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-semibold tracking-tight text-foreground"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 bg-brand-muted shadow-sm transition-shadow group-hover:shadow-card">
            <Sparkles className="h-4 w-4 text-brand" aria-hidden />
          </span>
          <span className="hidden sm:inline">Client Intake</span>
        </Link>

        <nav
          className="flex items-center gap-1 rounded-lg border border-border/60 bg-surface/80 p-1"
          aria-label="Main"
        >
          {nav.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
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

        <Button asChild size="sm" className="hidden sm:inline-flex">
          <Link href="/dashboard">
            <LayoutDashboard className="h-4 w-4" aria-hidden />
            Dashboard
          </Link>
        </Button>
      </div>
    </header>
  );
}
