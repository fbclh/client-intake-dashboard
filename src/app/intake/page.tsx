import type { Metadata } from "next";

import { IntakeWizard } from "@/components/intake/intake-wizard";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Client intake",
  description: "Submit a structured intake for your project or engagement.",
};

export default function IntakePage() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <PageHeader
        title="Client intake"
        description="Share your contact details, project scope, and timeline. Most people finish in under two minutes."
      />
      <IntakeWizard />
    </div>
  );
}
