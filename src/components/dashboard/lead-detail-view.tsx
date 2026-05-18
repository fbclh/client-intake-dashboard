"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  Mail,
  MessageSquare,
  StickyNote,
  Workflow,
} from "lucide-react";

import { ScoreBadge } from "@/components/dashboard/score-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  labelBudget,
  labelCompanySize,
  labelServiceType,
  labelTimeline,
  labelUrgency,
} from "@/lib/intake-labels";
import {
  getLeadDetailMeta,
  saveLeadDetailMeta,
  type LeadActivity,
} from "@/lib/lead-detail-storage";
import { allStatuses, leadStatusLabels } from "@/lib/lead-status";
import {
  computeLeadScore,
  computeScoreBreakdown,
  scoreTier,
} from "@/lib/lead-score";
import { ensureDemoLeads, getLeadById, updateLead } from "@/lib/leads-storage";
import type { LeadStatus, StoredLead } from "@/types/lead";

function statusBadgeVariant(
  status: LeadStatus,
): "default" | "secondary" | "success" | "destructive" | "outline" {
  switch (status) {
    case "new":
      return "default";
    case "contacted":
      return "secondary";
    case "qualified":
      return "success";
    case "lost":
      return "destructive";
    default:
      return "outline";
  }
}

const tierGuidance: Record<ReturnType<typeof scoreTier>, string> = {
  strong: "Prioritize outreach — strong budget, urgency, and fit signals.",
  moderate: "Worth a discovery call; confirm scope and timeline.",
  early: "Nurture or qualify further before heavy sales effort.",
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5 border-b border-border/50 py-2.5 last:border-0 sm:grid-cols-[9.5rem_1fr] sm:items-start">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="text-sm whitespace-pre-wrap text-foreground">{value}</div>
    </div>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 gap-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/80 bg-card shadow-sm">
        <Icon className="h-3.5 w-3.5 text-brand" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}

function activityIcon(type: LeadActivity["type"]) {
  switch (type) {
    case "note":
      return StickyNote;
    case "status":
      return Workflow;
    default:
      return Clock;
  }
}

function seedActivities(lead: StoredLead, score: number): LeadActivity[] {
  return [
    {
      id: `${lead.id}-submitted`,
      at: lead.createdAt,
      type: "system",
      title: "Intake submitted",
      detail: "Lead received from the client intake form.",
    },
    {
      id: `${lead.id}-scored`,
      at: lead.createdAt,
      type: "system",
      title: "Score calculated",
      detail: `Qualification score set to ${score} based on intake answers.`,
    },
  ];
}

export function LeadDetailView({ leadId }: { leadId: string }) {
  const [lead, setLead] = useState<StoredLead | null | undefined>(undefined);
  const [notes, setNotes] = useState("");
  const [activities, setActivities] = useState<LeadActivity[]>([]);
  const [notesSaved, setNotesSaved] = useState(false);

  const refreshLead = useCallback(() => {
    ensureDemoLeads();
    setLead(getLeadById(leadId) ?? null);
  }, [leadId]);

  useEffect(() => {
    refreshLead();
  }, [refreshLead]);

  useEffect(() => {
    if (!lead) return;
    const meta = getLeadDetailMeta(leadId);
    const score = lead.score ?? computeLeadScore(lead);
    const initialActivities =
      meta.activities.length > 0
        ? meta.activities
        : seedActivities(lead, score);

    if (meta.activities.length === 0) {
      saveLeadDetailMeta(leadId, { notes: meta.notes, activities: initialActivities });
    }

    setNotes(meta.notes);
    setActivities(initialActivities);
  }, [lead, leadId]);

  const breakdown = useMemo(() => {
    if (!lead) return null;
    return computeScoreBreakdown(lead);
  }, [lead]);

  if (lead === undefined) {
    return (
      <p className="text-sm text-muted-foreground">Loading lead details…</p>
    );
  }

  if (lead === null) {
    return (
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Lead not found</CardTitle>
          <CardDescription>
            This ID is not in local storage for this browser. Submit a new
            intake or open a lead from the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const activeLead = lead;
  const score = activeLead.score ?? computeLeadScore(activeLead);
  const tier = scoreTier(score);
  const submittedLabel = new Date(activeLead.createdAt).toLocaleString(
    undefined,
    {
      dateStyle: "long",
      timeStyle: "short",
    },
  );

  function handleStatusChange(status: LeadStatus) {
    if (status === activeLead.status) return;
    updateLead(leadId, { status });
    const entry: LeadActivity = {
      id: crypto.randomUUID(),
      at: new Date().toISOString(),
      type: "status",
      title: `Status updated to ${leadStatusLabels[status]}`,
    };
    const nextActivities = [entry, ...activities];
    saveLeadDetailMeta(leadId, { notes, activities: nextActivities });
    setActivities(nextActivities);
    setLead({ ...activeLead, status });
  }

  function handleSaveNotes() {
    const trimmed = notes.trim();
    const prev = getLeadDetailMeta(leadId);
    let nextActivities = [...prev.activities];

    if (trimmed && trimmed !== prev.notes.trim()) {
      nextActivities = [
        {
          id: crypto.randomUUID(),
          at: new Date().toISOString(),
          type: "note",
          title: "Internal note updated",
          detail:
            trimmed.length > 140 ? `${trimmed.slice(0, 140)}…` : trimmed,
        },
        ...nextActivities,
      ];
    }

    saveLeadDetailMeta(leadId, { notes, activities: nextActivities });
    setActivities(nextActivities);
    setNotesSaved(true);
    window.setTimeout(() => setNotesSaved(false), 2000);
  }

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
  );

  return (
    <div className="space-y-4">
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 mb-2 gap-1.5 text-muted-foreground"
          asChild
        >
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Dashboard
          </Link>
        </Button>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {activeLead.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Lead record · review intake, score, and next steps
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ScoreBadge score={score} />
            <Badge variant={statusBadgeVariant(activeLead.status)}>
              {leadStatusLabels[activeLead.status]}
            </Badge>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border/60 bg-surface/40 py-3.5">
          <CardTitle className="text-base">Overview</CardTitle>
          <CardDescription>Key fields for triage and follow-up.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 py-4 sm:grid-cols-2">
          <MetaItem icon={Building2} label="Company" value={activeLead.company} />
          <MetaItem icon={Mail} label="Email" value={activeLead.email} />
          <MetaItem icon={Calendar} label="Submitted" value={submittedLabel} />
          <div className="flex min-w-0 gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/80 bg-card shadow-sm">
              <Workflow className="h-3.5 w-3.5 text-brand" aria-hidden />
            </span>
            <div className="min-w-0 flex-1 space-y-1.5">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Status
              </p>
              <Select value={activeLead.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="h-8 max-w-[11rem] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allStatuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {leadStatusLabels[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border/60 bg-surface/40 py-3.5">
              <CardTitle className="text-base">Intake details</CardTitle>
              <CardDescription>
                Full submission from the client intake form.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 py-1 sm:px-5">
              <DetailRow label="Phone" value={activeLead.phone} />
              <DetailRow label="Service" value={labelServiceType(activeLead.serviceType)} />
              <DetailRow label="Description" value={activeLead.description} />
              <DetailRow label="Budget" value={labelBudget(activeLead.budget)} />
              <DetailRow label="Urgency" value={labelUrgency(activeLead.urgency)} />
              <DetailRow label="Timeline" value={labelTimeline(activeLead.timeline)} />
              <DetailRow
                label="Company size"
                value={labelCompanySize(activeLead.companySize)}
              />
            </CardContent>
          </Card>

          {breakdown && (
            <Card className="overflow-hidden">
              <CardHeader className="border-b border-border/60 bg-surface/40 py-3.5">
                <CardTitle className="text-base">Qualification & score</CardTitle>
                <CardDescription>
                  How this lead was scored from intake signals (max 100).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 py-4">
                <div className="rounded-lg border border-border/80 bg-surface/40 px-3.5 py-3">
                  <p className="text-sm font-medium text-foreground">
                    {tier === "strong"
                      ? "Strong fit"
                      : tier === "moderate"
                        ? "Warm lead"
                        : "Early-stage lead"}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    {tierGuidance[tier]}
                  </p>
                </div>
                <div className="overflow-x-auto rounded-lg border border-border/80">
                  <table className="w-full min-w-[20rem] text-sm">
                    <thead className="bg-surface text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-3 py-1.5">Signal</th>
                        <th className="px-3 py-1.5">Answer</th>
                        <th className="px-3 py-1.5 text-right">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2 font-medium">Budget</td>
                        <td className="px-3 py-2 text-muted-foreground">
                          {labelBudget(activeLead.budget)}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {breakdown.budget}
                        </td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2 font-medium">Urgency</td>
                        <td className="px-3 py-2 text-muted-foreground">
                          {labelUrgency(activeLead.urgency)}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {breakdown.urgency}
                        </td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2 font-medium">Timeline</td>
                        <td className="px-3 py-2 text-muted-foreground">
                          {labelTimeline(activeLead.timeline)}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {breakdown.timeline}
                        </td>
                      </tr>
                      <tr className="border-t border-border/60">
                        <td className="px-3 py-2 font-medium">Company size</td>
                        <td className="px-3 py-2 text-muted-foreground">
                          {labelCompanySize(activeLead.companySize)}
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {breakdown.companySize}
                        </td>
                      </tr>
                      <tr className="border-t border-border/60 bg-muted/40 font-semibold">
                        <td className="px-3 py-2" colSpan={2}>
                          Total score
                        </td>
                        <td className="px-3 py-2 text-right tabular-nums">
                          {breakdown.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] leading-snug text-muted-foreground">
                  Stored score ({score}) uses budget, urgency, timeline, and
                  company size. Hot leads are typically 70+.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border/60 bg-surface/40 py-3.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border/80 bg-card shadow-sm">
                  <MessageSquare className="h-3.5 w-3.5 text-brand" aria-hidden />
                </span>
                <div>
                  <CardTitle className="text-base">Internal notes</CardTitle>
                  <CardDescription>
                    Saved in this browser only — not synced.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-3.5">
              <div className="grid gap-2">
                <Label htmlFor="lead-notes" className="sr-only">
                  Internal notes
                </Label>
                <Textarea
                  id="lead-notes"
                  placeholder="Context for follow-up, objections, next steps…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  className="min-h-[7.5rem] resize-y text-sm"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] text-muted-foreground">
                  For your team&apos;s workflow — not visible to the lead.
                </p>
                <Button type="button" size="sm" onClick={handleSaveNotes}>
                  {notesSaved ? "Saved" : "Save note"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader className="border-b border-border/60 bg-surface/40 py-3.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border/80 bg-card shadow-sm">
                  <Clock className="h-3.5 w-3.5 text-brand" aria-hidden />
                </span>
                <div>
                  <CardTitle className="text-base">Activity</CardTitle>
                  <CardDescription>
                    Timeline of submission and internal updates.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-3.5">
              <ol className="relative space-y-0 border-l border-border/80 pl-4">
                {sortedActivities.map((item) => {
                  const Icon = activityIcon(item.type);
                  return (
                    <li key={item.id} className="relative pb-4 last:pb-0">
                      <span
                        className="absolute -left-[1.3rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-border/80 bg-card shadow-sm"
                        aria-hidden
                      >
                        <Icon className="h-2.5 w-2.5 text-brand" />
                      </span>
                      <p className="text-sm font-medium leading-tight text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {new Date(item.at).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                      {item.detail ? (
                        <p className="mt-1 text-xs leading-snug text-muted-foreground">
                          {item.detail}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
