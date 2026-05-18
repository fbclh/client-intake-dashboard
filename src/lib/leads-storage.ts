import { getDemoLeads } from "@/lib/demo-leads";
import type { StoredLead } from "@/types/lead";

const STORAGE_KEY = "client-intake-dashboard:leads";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function isStoredLead(v: unknown): v is StoredLead {
  if (!isRecord(v)) return false;
  return (
    typeof v.id === "string" &&
    typeof v.createdAt === "string" &&
    typeof v.name === "string" &&
    typeof v.email === "string" &&
    typeof v.status === "string"
  );
}

/** Seeds sample leads when storage is empty (first visit only). */
export function ensureDemoLeads(): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return;
    }
    writeLeads(getDemoLeads());
  } catch {
    writeLeads(getDemoLeads());
  }
}

export function readLeads(): StoredLead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isStoredLead) as StoredLead[];
  } catch {
    return [];
  }
}

export function writeLeads(leads: StoredLead[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function appendLead(lead: StoredLead): void {
  const next = [lead, ...readLeads()];
  writeLeads(next);
}

export function updateLead(
  id: string,
  patch: Partial<Pick<StoredLead, "status" | "score">>,
): void {
  const leads = readLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return;
  leads[idx] = { ...leads[idx], ...patch };
  writeLeads(leads);
}

export function getLeadById(id: string): StoredLead | undefined {
  return readLeads().find((l) => l.id === id);
}
