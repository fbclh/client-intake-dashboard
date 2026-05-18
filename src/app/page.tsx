import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

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

export default function HomePage() {
  return (
    <div className="relative isolate pb-16 pt-4 sm:pt-8 md:pb-20 md:pt-12">
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-[100vw] max-w-[100vw] -translate-x-1/2"
        aria-hidden
      >
        <div className="absolute inset-0 bg-background" />
        <div className="absolute -left-[8%] -top-[12%] h-[min(52vh,28rem)] w-[min(52vw,26rem)] rounded-full bg-[hsl(258_52%_96%)] opacity-90 blur-3xl" />
        <div className="absolute -right-[6%] -top-[10%] h-[min(48vh,26rem)] w-[min(48vw,24rem)] rounded-full bg-brand-muted/95 blur-3xl" />
        <div className="absolute -bottom-[8%] left-[8%] h-[min(40vh,20rem)] w-[min(42vw,22rem)] rounded-full bg-[hsl(258_40%_97%)]/80 blur-3xl" />
        <div className="absolute -bottom-[6%] right-[6%] h-[min(38vh,18rem)] w-[min(40vw,20rem)] rounded-full bg-brand-muted/70 blur-3xl" />
        <div className="absolute left-1/2 top-[2%] h-[min(72vh,36rem)] w-[min(92vw,44rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(0_0%_100%/0.92)_0%,hsl(0_0%_100%/0.55)_42%,transparent_72%)]" />
        <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(to_bottom,hsl(var(--background)/0.2)_0%,transparent_28%,transparent_62%,hsl(258_35%_97%/0.45)_100%)]" />
        <div
          className="absolute inset-x-0 bottom-0 h-[min(42vh,17rem)] bg-[radial-gradient(hsl(var(--border)/0.85)_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.38] [mask-image:linear-gradient(to_top,hsl(0_0%_0%/0.55)_0%,hsl(0_0%_0%/0.35)_35%,transparent_88%)]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-5xl px-1">
        <section className="relative flex flex-col items-center px-2 text-center sm:px-4">
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl sm:leading-[1.1] md:text-[3.25rem] md:leading-[1.08]">
            Turn intake submissions into a{" "}
            <span className="text-brand">qualified pipeline</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-7 sm:text-lg sm:leading-relaxed">
            Capture structured client details, score fit automatically, and
            manage follow-up from one internal dashboard — built for service teams
            who need clarity without complexity.
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
          <div className="mx-auto grid max-w-3xl grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-5 lg:max-w-[46rem] lg:grid-cols-3 lg:gap-6">
            {features.map((item) => (
              <div
                key={item.label}
                className="flex w-full max-w-[14.25rem] items-start gap-3 rounded-xl border border-border/70 bg-card px-3.5 py-3.5 shadow-sm sm:max-w-[14.75rem]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand/15 bg-brand-muted">
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
    </div>
  );
}
