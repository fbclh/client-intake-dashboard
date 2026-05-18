import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 pb-2 md:gap-6">
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card px-5 py-5 shadow-card sm:px-7 sm:py-6">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-muted blur-3xl"
          aria-hidden
        />
        <div className="relative space-y-3">
          <p className="inline-flex items-center rounded-full border border-border/80 bg-surface px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            Lead qualification workspace
          </p>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem] sm:leading-tight">
              Turn intake submissions into a qualified pipeline
            </h1>
            <p className="max-w-lg text-sm leading-snug text-muted-foreground">
              Capture structured client details, score fit automatically, and
              manage follow-up from one internal dashboard — built for service
              teams who need clarity without complexity.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 pt-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
            <Button asChild>
              <Link href="/intake">
                Start intake
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Already submitted?{" "}
              <Link
                href="/dashboard"
                className="font-medium text-brand underline-offset-4 hover:underline"
              >
                Review leads in the dashboard
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-2 sm:grid-cols-3">
        {[
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
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface/60 px-3 py-2"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/80 bg-card shadow-sm">
              <item.icon className="h-3.5 w-3.5 text-brand" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-tight text-foreground">
                {item.label}
              </p>
              <p className="text-[11px] leading-snug text-muted-foreground">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
