const STORAGE_KEY = "client-intake-dashboard:lead-detail-meta";

export type LeadActivityType = "system" | "note" | "status";

export type LeadActivity = {
  id: string;
  at: string;
  type: LeadActivityType;
  title: string;
  detail?: string;
};

export type LeadDetailMeta = {
  notes: string;
  activities: LeadActivity[];
};

function readAll(): Record<string, LeadDetailMeta> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as Record<string, LeadDetailMeta>;
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, LeadDetailMeta>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getLeadDetailMeta(leadId: string): LeadDetailMeta {
  const entry = readAll()[leadId];
  if (!entry) return { notes: "", activities: [] };
  return {
    notes: typeof entry.notes === "string" ? entry.notes : "",
    activities: Array.isArray(entry.activities) ? entry.activities : [],
  };
}

export function saveLeadDetailMeta(leadId: string, meta: LeadDetailMeta): void {
  const all = readAll();
  all[leadId] = meta;
  writeAll(all);
}
