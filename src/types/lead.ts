import type { IntakeFormValues } from "@/lib/intake-schema";

export const leadStatuses = [
  "new",
  "contacted",
  "qualified",
  "lost",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

/** Persisted lead from the intake form (score added in a later phase). */
export type StoredLead = IntakeFormValues & {
  id: string;
  createdAt: string;
  status: LeadStatus;
  score?: number;
};
