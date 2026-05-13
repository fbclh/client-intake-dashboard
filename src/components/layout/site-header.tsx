import Link from "next/link";

import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/intake", label: "Intake" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="container flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Client Intake
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
