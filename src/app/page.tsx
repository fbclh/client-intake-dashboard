import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          <div className="flex flex-wrap gap-2.5 pt-0.5">
            <Button asChild>
              <Link href="/intake">
                Start intake
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
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

      <section className="space-y-3">
        <div className="space-y-0.5">
          <h2 className="text-base font-semibold tracking-tight">Get started</h2>
          <p className="text-sm text-muted-foreground">
            Choose how you want to work with leads today.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="group transition-shadow hover:shadow-card-hover">
            <CardHeader>
              <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-brand-muted">
                <ClipboardList className="h-4 w-4 text-brand" aria-hidden />
              </div>
              <CardTitle>Submit intake</CardTitle>
              <CardDescription>
                Guided form for prospects — contact, project scope, budget, and
                timeline in a few steps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full group-hover:shadow-sm">
                <Link href="/intake">
                  Start intake
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="group transition-shadow hover:shadow-card-hover">
            <CardHeader>
              <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-surface">
                <BarChart3 className="h-4 w-4 text-brand" aria-hidden />
              </div>
              <CardTitle>Review leads</CardTitle>
              <CardDescription>
                Internal dashboard with filters, status updates, scores, and
                per-lead detail views.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/dashboard">Open dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
