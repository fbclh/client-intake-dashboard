import type { Metadata } from "next";

import { IntakeWizard } from "@/components/intake/intake-wizard";

export const metadata: Metadata = {
  title: "Client intake",
  description: "Submit a structured intake for your project or engagement.",
};

export default function IntakePage() {
  return (
    <div className="mx-auto w-full max-w-xl py-2">
      <IntakeWizard />
    </div>
  );
}
