import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: ClipboardList,
    label: "Structured intake",
    text: "Multi-step form with validation",
  },
  {
    icon: BarChart3,
    label: "Lead scoring",
    text: "0–100 score from budget & urgency",
  },
  {
    icon: ShieldCheck,
    label: "Pipeline status",
    text: "New → Contacted → Qualified → Lost",
  },
] as const;

function DotGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.35]",
        className,
      )}
      aria-hidden
    />
  );
}

export default function HomePage() {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-5xl px-1 pb-16 pt-4 sm:pt-8 md:pb-20 md:pt-12">
      <DotGrid className="-left-6 top-16 hidden h-72 w-28 sm:block" />
      <DotGrid className="-right-6 top-24 hidden h-72 w-28 sm:block" />

      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[min(100%,42rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--brand-muted)/0.85)_0%,transparent_68%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-brand-muted/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-32 h-56 w-56 rounded-full bg-accent/40 blur-3xl"
        aria-hidden
      />

      <section className="relative flex flex-col items-center px-2 text-center sm:px-4">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/90 px-3.5 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden />
          Lead qualification workspace
        </p>

        <h1 className="mt-8 max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:mt-9 sm:text-5xl sm:leading-[1.1] md:text-[3.25rem] md:leading-[1.08]">
          Turn intake submissions into a{" "}
          <span className="text-brand">qualified pipeline</span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-7 sm:text-lg sm:leading-relaxed">
          Capture structured client details, score fit automatically, and manage
          follow-up from one internal dashboard — built for service teams who
          need clarity without complexity.
        </p>

        <div className="mt-9 flex w-full max-w-2xl flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
          <Button
            asChild
            size="lg"
            className="h-11 min-w-[11rem] rounded-lg bg-brand px-6 text-sm font-semibold text-primary-foreground shadow-md hover:bg-brand/90"
          >
            <Link href="/intake">
              Start intake
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <p className="text-center text-sm leading-relaxed text-muted-foreground">
            Already submitted?{" "}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-0.5 font-medium text-brand underline-offset-4 hover:underline"
            >
              Review leads in the dashboard
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <section className="relative mt-14 w-full sm:mt-16 md:mt-20">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3.5 rounded-xl border border-border/70 bg-card px-4 py-4 shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand/15 bg-brand-muted">
                <item.icon className="h-4 w-4 text-brand" aria-hidden />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-sm font-semibold leading-tight text-foreground">
                  {item.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
