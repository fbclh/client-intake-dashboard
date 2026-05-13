import type { Metadata } from "next";

import { LeadDetailView } from "@/components/dashboard/lead-detail-view";

export const metadata: Metadata = {
  title: "Lead detail",
  description: "Review a single lead, score, and intake answers.",
};

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto w-full max-w-3xl py-2">
      <LeadDetailView leadId={id} />
    </div>
  );
}
