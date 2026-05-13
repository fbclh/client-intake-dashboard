import type { LeadStatus } from "@/types/lead";

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  lost: "Lost",
};

export const allStatuses: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "lost",
];
