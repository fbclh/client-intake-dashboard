import type { IntakeFormValues } from "@/lib/intake-schema";

export type ScoreBreakdown = {
  budget: number;
  urgency: number;
  timeline: number;
  companySize: number;
  total: number;
};

const budgetPoints: Record<IntakeFormValues["budget"], number> = {
  unsure: 8,
  under_5k: 12,
  "5k_25k": 18,
  "25k_100k": 25,
  "100k_plus": 30,
};

const urgencyPoints: Record<IntakeFormValues["urgency"], number> = {
  low: 6,
  medium: 12,
  high: 18,
  critical: 25,
};

const timelinePoints: Record<IntakeFormValues["timeline"], number> = {
  exploring: 6,
  six_plus_months: 10,
  three_to_six_months: 14,
  one_to_three_months: 18,
  asap: 25,
};

const companySizePoints: Record<IntakeFormValues["companySize"], number> = {
  solo: 6,
  "2_10": 10,
  "11_50": 14,
  "51_200": 16,
  "201_plus": 20,
};

/** Simple additive model (max 100) from budget, urgency, timeline, and company size. */
export function computeScoreBreakdown(
  values: IntakeFormValues,
): ScoreBreakdown {
  const budget = budgetPoints[values.budget];
  const urgency = urgencyPoints[values.urgency];
  const timeline = timelinePoints[values.timeline];
  const companySize = companySizePoints[values.companySize];
  const raw = budget + urgency + timeline + companySize;
  const total = Math.min(100, Math.round(raw));
  return { budget, urgency, timeline, companySize, total };
}

export function computeLeadScore(values: IntakeFormValues): number {
  return computeScoreBreakdown(values).total;
}

export function scoreTier(score: number): "strong" | "moderate" | "early" {
  if (score >= 70) return "strong";
  if (score >= 40) return "moderate";
  return "early";
}
