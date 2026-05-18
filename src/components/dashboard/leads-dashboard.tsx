"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ChevronRight,
  Filter,
  Inbox,
  Search,
  SearchX,
  Users,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allStatuses, leadStatusLabels } from "@/lib/lead-status";
import { computeLeadScore } from "@/lib/lead-score";
import { ensureDemoLeads, readLeads, updateLead } from "@/lib/leads-storage";
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

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof Inbox;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-surface/40 px-5 py-10 text-center">
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-card shadow-sm">
        <Icon className="h-5 w-5 text-brand" aria-hidden />
      </span>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-xs leading-snug text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function LeadsDashboard() {
  const [leads, setLeads] = useState<StoredLead[]>([]);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    function refresh() {
      ensureDemoLeads();
      setLeads(readLeads());
    }
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) {
        return false;
      }
      if (!q) return true;
      const hay = [
        lead.name,
        lead.email,
        lead.company,
        lead.description,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [leads, statusFilter, search]);

  function setStatus(id: string, status: LeadStatus) {
    updateLead(id, { status });
    setLeads(readLeads());
  }

  const stats = useMemo(() => {
    const scores = leads.map((lead) => lead.score ?? computeLeadScore(lead));
    const qualified = leads.filter((lead) => lead.status === "qualified").length;
    const hot = scores.filter((score) => score >= 70).length;
    const averageScore =
      scores.length > 0
        ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
        : 0;

    return {
      total: leads.length,
      qualified,
      averageScore,
      hot,
    };
  }, [leads]);

  const kpiItems = [
    {
      label: "Total leads",
      value: stats.total.toString(),
      hint: "Loaded demo pipeline",
    },
    {
      label: "Qualified leads",
      value: stats.qualified.toString(),
      hint: "Ready for follow-up",
    },
    {
      label: "Average score",
      value: stats.total > 0 ? `${stats.averageScore}` : "—",
      hint: "Across active leads",
    },
    {
      label: "Hot leads",
      value: stats.hot.toString(),
      hint: "Score 70+",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpiItems.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border/80 bg-card px-4 py-3 shadow-card"
          >
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-foreground">
              {item.value}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground/90">
              {item.hint}
            </p>
          </div>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border/60 bg-surface/40 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border/80 bg-card shadow-sm">
              <Filter className="h-3.5 w-3.5 text-brand" aria-hidden />
            </span>
            <div>
              <CardTitle>Filters</CardTitle>
              <CardDescription>
                Narrow leads by pipeline status or free-text search.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-3.5">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,200px)_1fr] sm:items-end">
            <div className="grid gap-2">
              <Label htmlFor="status-filter" className="text-xs uppercase tracking-wide text-muted-foreground">
                Status
              </Label>
              <Select
                value={statusFilter}
                onValueChange={(v) =>
                  setStatusFilter(v as LeadStatus | "all")
                }
              >
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {allStatuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {leadStatusLabels[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lead-search" className="text-xs uppercase tracking-wide text-muted-foreground">
                Search
              </Label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  id="lead-search"
                  className="pl-9"
                  placeholder="Name, email, company, or notes…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row flex-wrap items-end justify-between gap-2 border-b border-border/60 bg-surface/40 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border/80 bg-card shadow-sm">
              <Users className="h-3.5 w-3.5 text-brand" aria-hidden />
            </span>
            <div>
              <CardTitle>Leads</CardTitle>
              <CardDescription>
                {filtered.length} of {leads.length} shown
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-0">
          {filtered.length === 0 ? (
            <div className="p-4">
              <EmptyState
                icon={leads.length === 0 ? Inbox : SearchX}
                title={leads.length === 0 ? "No leads yet" : "No matching leads"}
                description={
                  leads.length === 0
                    ? "Submit the intake form to add your first lead."
                    : "Try clearing your search or choosing a different status filter."
                }
                action={
                  leads.length === 0 ? (
                    <Button asChild>
                      <Link href="/intake">Go to intake</Link>
                    </Button>
                  ) : undefined
                }
              />
            </div>
          ) : (
            <Table className="[&_th]:h-8 [&_td]:py-2">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="min-w-[160px]">Status</TableHead>
                  <TableHead className="w-[88px] text-right"> </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((lead) => {
                  const score = lead.score ?? computeLeadScore(lead);
                  return (
                    <TableRow
                      key={lead.id}
                      className="group transition-colors hover:bg-accent/50"
                    >
                      <TableCell className="font-medium transition-colors group-hover:text-foreground">
                        {lead.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {lead.company}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-muted-foreground">
                        {lead.email}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </TableCell>
                      <TableCell>
                        <ScoreBadge
                          score={score}
                          className="px-2 py-0 text-[11px] font-medium leading-tight"
                        />
                      </TableCell>
                      <TableCell className="relative z-10">
                        <div
                          className="flex flex-col gap-1.5 sm:flex-row sm:items-center"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        >
                          <Badge
                            variant={statusBadgeVariant(lead.status)}
                            className="w-fit px-2 py-0 text-[11px] font-medium leading-tight"
                          >
                            {leadStatusLabels[lead.status]}
                          </Badge>
                          <Select
                            value={lead.status}
                            onValueChange={(v) =>
                              setStatus(lead.id, v as LeadStatus)
                            }
                          >
                            <SelectTrigger className="h-7 w-full min-w-[8.5rem] cursor-pointer text-xs">
                              <SelectValue placeholder="Set status" />
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
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1 border border-transparent px-2.5 text-xs font-medium text-muted-foreground hover:border-border/80 hover:bg-card hover:text-foreground hover:shadow-sm group-hover:text-foreground"
                        >
                          <Link href={`/dashboard/leads/${lead.id}`}>
                            View
                            <ChevronRight
                              className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                              aria-hidden
                            />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
