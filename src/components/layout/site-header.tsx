"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const leftNav = [{ href: "/", label: "Home", exact: true }] as const;

const rightNav = [
  { href: "/intake", label: "Intake", exact: false },
  { href: "/dashboard", label: "Dashboard", exact: false },
] as const;

function NavLink({
  href,
  label,
  exact,
}: {
  href: string;
  label: string;
  exact: boolean;
}) {
  const pathname = usePathname();
  const active = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-card text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-card/60 hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
}

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/70 bg-card/75 shadow-sm shadow-foreground/[0.03] backdrop-blur-md supports-[backdrop-filter]:bg-card/65",
        className,
      )}
    >
      <div className="mx-auto flex h-12 min-w-0 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center gap-0.5 rounded-lg border border-border/60 bg-surface/80 p-0.5 sm:p-1"
          aria-label="Primary left"
        >
          {leftNav.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <nav
          className="flex items-center gap-0.5 rounded-lg border border-border/60 bg-surface/80 p-0.5 sm:gap-1 sm:p-1"
          aria-label="Primary right"
        >
          {rightNav.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>
      </div>
    </header>
  );
}
