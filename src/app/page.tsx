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
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 md:gap-9">
      <section className="relative overflow-hidden rounded-2xl border border-border/80 bg-card px-5 py-7 shadow-card sm:px-8 sm:py-8">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-muted blur-3xl"
          aria-hidden
        />
        <div className="relative space-y-4">
          <p className="inline-flex items-center rounded-full border border-border/80 bg-surface px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            Lead qualification workspace
          </p>
          <div className="space-y-2.5">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl sm:leading-tight">
              Turn intake submissions into a qualified pipeline
            </h1>
            <p className="max-w-xl text-sm leading-snug text-muted-foreground sm:text-base">
              Capture structured client details, score fit automatically, and
              manage follow-up from one internal dashboard — built for service
              teams who need clarity without complexity.
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
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

      <section className="grid gap-2.5 sm:grid-cols-3">
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
            className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-surface/60 px-3.5 py-2.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-card shadow-sm">
              <item.icon className="h-3.5 w-3.5 text-brand" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs leading-snug text-muted-foreground">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
