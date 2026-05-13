import type { Metadata } from "next";

import { LeadsDashboard } from "@/components/dashboard/leads-dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Review and manage submitted client leads.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-2 py-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Lead dashboard</h1>
        <p className="text-muted-foreground">
          Status, filters, and next steps for every intake.
        </p>
      </div>
      <LeadsDashboard />
    </div>
  );
}
