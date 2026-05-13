"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
import {
  labelBudget,
  labelCompanySize,
  labelServiceType,
  labelTimeline,
  labelUrgency,
} from "@/lib/intake-labels";
import { leadStatusLabels } from "@/lib/lead-status";
import { computeLeadScore, computeScoreBreakdown } from "@/lib/lead-score";
import { getLeadById } from "@/lib/leads-storage";
import type { StoredLead } from "@/types/lead";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:items-start">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="text-sm whitespace-pre-wrap">{value}</div>
    </div>
  );
}

export function LeadDetailView({ leadId }: { leadId: string }) {
  const [lead, setLead] = useState<StoredLead | null | undefined>(undefined);

  useEffect(() => {
    setLead(getLeadById(leadId) ?? null);
  }, [leadId]);

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

  const score = lead.score ?? computeLeadScore(lead);

  return (
    <div className="space-y-8">
      <div>
        <Button variant="ghost" size="sm" className="-ml-2 mb-2" asChild>
          <Link href="/dashboard">← Dashboard</Link>
        </Button>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{lead.name}</h1>
            <p className="text-muted-foreground">{lead.company}</p>
            <p className="text-sm text-muted-foreground">
              Submitted{" "}
              {new Date(lead.createdAt).toLocaleString(undefined, {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <ScoreBadge score={score} />
            <Badge variant="secondary">{leadStatusLabels[lead.status]}</Badge>
            <p className="text-xs text-muted-foreground">
              Status is managed on the dashboard.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submission</CardTitle>
          <CardDescription>What they told you on the intake form.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            <DetailRow label="Email" value={lead.email} />
            <DetailRow label="Phone" value={lead.phone} />
            <DetailRow label="Company" value={lead.company} />
            <DetailRow
              label="Service"
              value={labelServiceType(lead.serviceType)}
            />
            <DetailRow label="Description" value={lead.description} />
            <DetailRow label="Budget" value={labelBudget(lead.budget)} />
            <DetailRow label="Urgency" value={labelUrgency(lead.urgency)} />
            <DetailRow label="Timeline" value={labelTimeline(lead.timeline)} />
            <DetailRow
              label="Company size"
              value={labelCompanySize(lead.companySize)}
            />
          </div>
        </CardContent>
      </Card>

      {breakdown && (
        <Card>
          <CardHeader>
            <CardTitle>Score explanation</CardTitle>
            <CardDescription>
              Points are based on budget, urgency, timeline, and company size.
              The total is capped at 100.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-xs font-medium uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2">Signal</th>
                    <th className="px-4 py-2">Answer</th>
                    <th className="px-4 py-2 text-right">Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3 font-medium">Budget</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {labelBudget(lead.budget)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {breakdown.budget}
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 font-medium">Urgency</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {labelUrgency(lead.urgency)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {breakdown.urgency}
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 font-medium">Timeline</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {labelTimeline(lead.timeline)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {breakdown.timeline}
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3 font-medium">Company size</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {labelCompanySize(lead.companySize)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {breakdown.companySize}
                    </td>
                  </tr>
                  <tr className="border-t bg-muted/40 font-semibold">
                    <td className="px-4 py-3" colSpan={2}>
                      Total
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {breakdown.total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground">
              Shown score ({score}) matches the current model applied to this
              submission. Older leads without a stored score use the same
              calculation from their answers.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
