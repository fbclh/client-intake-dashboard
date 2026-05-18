import type { Metadata } from "next";

import { LeadsDashboard } from "@/components/dashboard/leads-dashboard";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Review and manage submitted client leads.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <PageHeader
        title="Lead dashboard"
        description="Status, filters, and next steps for every intake submission."
      />
      <LeadsDashboard />
    </div>
  );
}
