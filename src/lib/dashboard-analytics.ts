import type { IntakeFormValues } from "@/lib/intake-schema";
import { computeLeadScore } from "@/lib/lead-score";
import { leadStatusLabels } from "@/lib/lead-status";
import type { LeadStatus, StoredLead } from "@/types/lead";

export const analyticsServiceLabels: Record<
  "audit" | "implementation" | "consulting",
  string
> = {
  audit: "Data Analytics",
  implementation: "AI Automation",
  consulting: "Analytics Consulting",
};

export const chartColors = {
  brand: "hsl(217 70% 45%)",
  brandMuted: "hsl(217 45% 75%)",
  accent: "hsl(217 55% 65%)",
  secondary: "hsl(220 25% 72%)",
  muted: "hsl(220 12% 55%)",
  success: "hsl(142 55% 40%)",
  warning: "hsl(38 92% 50%)",
  destructive: "hsl(0 65% 52%)",
  surface: "hsl(220 28% 88%)",
} as const;

export const statusChartColors: Record<LeadStatus, string> = {
  new: chartColors.brand,
  contacted: chartColors.accent,
  qualified: chartColors.success,
  lost: chartColors.destructive,
};

export type WeeklySubmission = {
  label: string;
  count: number;
};

export type StatusSlice = {
  status: LeadStatus;
  name: string;
  value: number;
  fill: string;
};

export type ServiceScoreBar = {
  service: string;
  averageScore: number;
  count: number;
};

export function buildWeeklySubmissions(leads: StoredLead[]): WeeklySubmission[] {
  const buckets: WeeklySubmission[] = [];

  for (let i = 7; i >= 0; i--) {
    const weekEnd = new Date();
    weekEnd.setHours(23, 59, 59, 999);
    weekEnd.setDate(weekEnd.getDate() - i * 7);

    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekStart.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);

    const label =
      i === 0
        ? "This week"
        : weekStart.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          });

    const count = leads.filter((lead) => {
      const created = new Date(lead.createdAt).getTime();
      return created >= weekStart.getTime() && created <= weekEnd.getTime();
    }).length;

    buckets.push({ label, count });
  }

  return buckets;
}

export function buildStatusDistribution(leads: StoredLead[]): StatusSlice[] {
  const statuses: LeadStatus[] = ["new", "contacted", "qualified", "lost"];

  return statuses.map((status) => ({
    status,
    name: leadStatusLabels[status],
    value: leads.filter((lead) => lead.status === status).length,
    fill: statusChartColors[status],
  }));
}

function analyticsServiceKey(
  serviceType: IntakeFormValues["serviceType"],
): keyof typeof analyticsServiceLabels | null {
  if (serviceType in analyticsServiceLabels) {
    return serviceType as keyof typeof analyticsServiceLabels;
  }
  return null;
}

export function buildAverageScoreByService(
  leads: StoredLead[],
): ServiceScoreBar[] {
  const groups: Record<
    keyof typeof analyticsServiceLabels,
    { total: number; count: number }
  > = {
    audit: { total: 0, count: 0 },
    implementation: { total: 0, count: 0 },
    consulting: { total: 0, count: 0 },
  };

  for (const lead of leads) {
    const key = analyticsServiceKey(lead.serviceType);
    if (!key) continue;
    groups[key].total += lead.score ?? computeLeadScore(lead);
    groups[key].count += 1;
  }

  return (Object.keys(analyticsServiceLabels) as Array<
    keyof typeof analyticsServiceLabels
  >).map((key) => ({
    service: analyticsServiceLabels[key],
    averageScore:
      groups[key].count > 0
        ? Math.round(groups[key].total / groups[key].count)
        : 0,
    count: groups[key].count,
  }));
}
