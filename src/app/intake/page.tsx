import type { Metadata } from "next";

import { IntakePageIntro } from "@/components/intake/intake-page-intro";
import { IntakeWizard } from "@/components/intake/intake-wizard";

export const metadata: Metadata = {
  title: "Client intake",
  description: "Submit a structured intake for your project or engagement.",
};

export default function IntakePage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-3xl space-y-4 pb-1">
      <header className="space-y-2 border-b border-border/60 pb-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Client intake
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Submit a structured intake
        </h1>
        <p className="max-w-xl text-sm leading-snug text-muted-foreground">
          A guided form for prospects and referrals. Answers feed directly into
          your lead pipeline with scoring and status tracking.
        </p>
      </header>

      <IntakePageIntro />

      <section aria-labelledby="intake-form-label" className="space-y-2.5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
          <h2
            id="intake-form-label"
            className="text-sm font-medium text-foreground"
          >
            Intake form
          </h2>
          <p className="text-xs text-muted-foreground">All fields required</p>
        </div>
        <IntakeWizard />
      </section>
    </div>
  );
}
