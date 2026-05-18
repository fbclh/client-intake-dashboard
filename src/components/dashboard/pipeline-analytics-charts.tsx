"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  buildAverageScoreByService,
  buildStatusDistribution,
  buildWeeklySubmissions,
  chartColors,
} from "@/lib/dashboard-analytics";
import type { StoredLead } from "@/types/lead";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {
    value: number;
    name?: string;
    payload?: { count?: number; service?: string; name?: string };
  }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const entry = payload[0];
  const detail = entry.payload;
  const title = label ?? detail?.service ?? detail?.name;
  const countNote =
    detail?.count !== undefined && entry.name === "Avg score"
      ? ` · ${detail.count} lead${detail.count === 1 ? "" : "s"}`
      : "";

  return (
    <div className="rounded-md border border-border/80 bg-card px-2.5 py-1.5 text-xs shadow-sm">
      {title ? <p className="mb-0.5 font-medium text-foreground">{title}</p> : null}
      <p className="text-muted-foreground">
        {entry.name ?? "Value"}:{" "}
        <span className="font-medium tabular-nums text-foreground">
          {entry.value}
          {countNote}
        </span>
      </p>
    </div>
  );
}

export function PipelineAnalyticsCharts({ leads }: { leads: StoredLead[] }) {
  const weeklyData = useMemo(() => buildWeeklySubmissions(leads), [leads]);
  const statusData = useMemo(() => buildStatusDistribution(leads), [leads]);
  const serviceScoreData = useMemo(
    () =>
      buildAverageScoreByService(leads).map((item) => ({
        ...item,
        fill: chartColors.brand,
      })),
    [leads],
  );

  const hasLeads = leads.length > 0;

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Pipeline analytics
        </h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Submission volume, status mix, and score trends across service lines.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border/60 bg-surface/40 py-3.5">
            <CardTitle className="text-sm">Weekly submissions</CardTitle>
            <CardDescription className="text-xs">
              Leads submitted per week, last 8 weeks
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 pb-3 pt-3 sm:px-4">
            <div className="h-[220px] w-full">
              {hasLeads ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{ top: 4, right: 4, left: -18, bottom: 0 }}
                  >
                    <CartesianGrid
                      stroke={chartColors.surface}
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: chartColors.muted, fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      interval={0}
                      angle={-25}
                      textAnchor="end"
                      height={52}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: chartColors.muted, fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      width={28}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar
                      dataKey="count"
                      name="Leads"
                      fill={chartColors.brand}
                      radius={[4, 4, 0, 0]}
                      maxBarSize={36}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <EmptyChart message="No submission data yet." />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border/60 bg-surface/40 py-3.5">
            <CardTitle className="text-sm">Status distribution</CardTitle>
            <CardDescription className="text-xs">
              Pipeline breakdown by current status
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 pb-3 pt-3 sm:px-4">
            <div className="h-[220px] w-full">
              {hasLeads ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={78}
                      paddingAngle={2}
                      stroke="hsl(var(--card))"
                      strokeWidth={2}
                    >
                      {statusData.map((entry) => (
                        <Cell key={entry.status} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <EmptyChart message="No status data yet." />
              )}
            </div>
            {hasLeads ? (
              <ul className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1 px-1">
                {statusData.map((item) => (
                  <li
                    key={item.status}
                    className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.fill }}
                      aria-hidden
                    />
                    {item.name} ({item.value})
                  </li>
                ))}
              </ul>
            ) : null}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border/60 bg-surface/40 py-3.5">
            <CardTitle className="text-sm">Score by service type</CardTitle>
            <CardDescription className="text-xs">
              Average qualification score by analytics line
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 pb-3 pt-3 sm:px-4">
            <div className="h-[220px] w-full">
              {hasLeads ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={serviceScoreData}
                    layout="vertical"
                    margin={{ top: 4, right: 8, left: 4, bottom: 0 }}
                  >
                    <CartesianGrid
                      stroke={chartColors.surface}
                      strokeDasharray="3 3"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tick={{ fill: chartColors.muted, fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="service"
                      width={108}
                      tick={{ fill: chartColors.muted, fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      content={
                        <ChartTooltip />
                      }
                    />
                    <Bar
                      dataKey="averageScore"
                      name="Avg score"
                      radius={[0, 4, 4, 0]}
                      maxBarSize={22}
                    >
                      {serviceScoreData.map((entry, index) => (
                        <Cell
                          key={entry.service}
                          fill={
                            index === 0
                              ? chartColors.brand
                              : index === 1
                                ? chartColors.accent
                                : chartColors.brandMuted
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <EmptyChart message="No service score data yet." />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border/70 bg-surface/30 px-4 text-center text-xs text-muted-foreground">
      {message}
    </div>
  );
}
