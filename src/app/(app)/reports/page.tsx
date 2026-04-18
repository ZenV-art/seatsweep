"use client";

import { useMemo, useState } from "react";
import { Topbar } from "@/components/app/topbar";
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IntegrationLogo } from "@/components/site/integration-logos";
import { ghostSeats, integrations, totals } from "@/lib/seed";
import { formatCurrency, formatRelative } from "@/lib/utils";
import { AlertTriangle, Download, Filter, TrendingDown, ExternalLink } from "lucide-react";

type ReasonFilter = "all" | "offboarded" | "inactive90" | "duplicate" | "over-provisioned";

export default function ReportsPage() {
  const t = totals();
  const [q, setQ] = useState("");
  const [reason, setReason] = useState<ReasonFilter>("all");
  const [app, setApp] = useState<string>("all");

  const rows = useMemo(() => {
    return ghostSeats.filter((g) => {
      if (reason !== "all" && g.reason !== reason) return false;
      if (app !== "all" && g.integration !== app) return false;
      if (q) {
        const n = q.toLowerCase();
        if (!g.name.toLowerCase().includes(n) && !g.email.toLowerCase().includes(n)) return false;
      }
      return true;
    });
  }, [q, reason, app]);

  function exportCSV() {
    const header = "name,email,app,reason,days_idle,monthly_cost\n";
    const body = rows
      .map((r) => [r.name, r.email, r.integration, r.reason, r.daysIdle, r.monthlyCost].join(","))
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seatsweep-ghosts-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Topbar title="Reports" subtitle={`${t.totalGhosts} recoverable seats identified • ${formatCurrency(t.monthlyWaste)} / mo`} />
      <div className="px-6 py-6 md:px-8 md:py-8 max-w-[1360px] mx-auto space-y-6">
        {/* Savings summary */}
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-3">
            <div className="p-6 md:border-r border-[var(--color-border)] bg-gradient-to-br from-[var(--color-primary-soft)] to-white">
              <div className="text-xs text-[var(--color-primary-soft-foreground)] uppercase tracking-wider font-semibold">Savings this report</div>
              <div className="mt-2 text-4xl font-semibold tracking-tight font-mono tabular-nums text-[var(--color-primary)]">
                {formatCurrency(t.monthlyWaste)}
              </div>
              <div className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                = <span className="font-mono tabular-nums">{formatCurrency(t.yearlyWaste)}</span> / year
              </div>
            </div>
            <div className="p-6 md:border-r border-[var(--color-border)]">
              <div className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-wider font-semibold">Breakdown</div>
              <div className="mt-3 space-y-2">
                {integrations
                  .filter((i) => i.ghostSeats > 0)
                  .map((i) => {
                    const amount = i.ghostSeats * i.pricePerSeat;
                    const pct = (amount / t.monthlyWaste) * 100;
                    return (
                      <div key={i.key}>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <IntegrationLogo k={i.key} className="h-3.5 w-3.5" />
                            <span>{i.name}</span>
                          </div>
                          <span className="font-mono tabular-nums">{formatCurrency(amount)}</span>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-[var(--color-muted)] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#fb7185] to-[#b91c1c]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="text-xs text-[var(--color-muted-foreground)] uppercase tracking-wider font-semibold">Actions</div>
              <Button onClick={exportCSV} variant="secondary" className="w-full justify-start">
                <Download className="h-3.5 w-3.5" /> Export as CSV
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Download className="h-3.5 w-3.5" /> Download PDF report
              </Button>
              <Button className="w-full justify-start">
                <TrendingDown className="h-3.5 w-3.5" /> Email to CFO
              </Button>
            </div>
          </div>
        </Card>

        {/* Filters + table */}
        <Card>
          <CardHeader className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <CardTitle>All ghost seats</CardTitle>
              <CardDescription>{rows.length} result{rows.length === 1 ? "" : "s"}</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                <Filter className="h-3.5 w-3.5" /> Filter
              </div>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as ReasonFilter)}
                className="h-9 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-2.5 text-sm shadow-[var(--shadow-soft)]"
              >
                <option value="all">All reasons</option>
                <option value="offboarded">Offboarded</option>
                <option value="inactive90">Inactive 90d+</option>
                <option value="duplicate">Duplicate</option>
                <option value="over-provisioned">Over‑provisioned</option>
              </select>
              <select
                value={app}
                onChange={(e) => setApp(e.target.value)}
                className="h-9 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-2.5 text-sm shadow-[var(--shadow-soft)]"
              >
                <option value="all">All apps</option>
                {integrations.map((i) => (
                  <option key={i.key} value={i.key}>{i.name}</option>
                ))}
              </select>
              <Input
                placeholder="Search name or email"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="max-w-[220px]"
              />
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="grid grid-cols-12 px-6 py-2.5 text-[11px] uppercase tracking-wider text-[var(--color-muted-foreground)] border-b border-[var(--color-border)]">
              <div className="col-span-4">Employee</div>
              <div className="col-span-2">App</div>
              <div className="col-span-2">Reason</div>
              <div className="col-span-2">Idle</div>
              <div className="col-span-1 text-right">Monthly</div>
              <div className="col-span-1 text-right">Action</div>
            </div>
            {rows.length === 0 && (
              <div className="px-6 py-10 text-center text-sm text-[var(--color-muted-foreground)]">
                No ghost seats match your filters. 🎉
              </div>
            )}
            {rows.map((g) => (
              <div key={g.id} className="grid grid-cols-12 items-center px-6 py-3 text-sm border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-subtle)]">
                <div className="col-span-4 min-w-0">
                  <div className="font-medium truncate">{g.name}</div>
                  <div className="text-xs text-[var(--color-muted-foreground)] truncate">{g.email}</div>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <IntegrationLogo k={g.integration} className="h-4 w-4" />
                  <span className="capitalize">{g.integration}</span>
                </div>
                <div className="col-span-2">
                  {g.reason === "offboarded" ? (
                    <Badge tone="danger"><AlertTriangle className="h-3 w-3" /> Offboarded</Badge>
                  ) : g.reason === "inactive90" ? (
                    <Badge tone="warning">Idle</Badge>
                  ) : g.reason === "duplicate" ? (
                    <Badge tone="warning">Duplicate</Badge>
                  ) : (
                    <Badge tone="neutral">Over‑provisioned</Badge>
                  )}
                </div>
                <div className="col-span-2 text-[var(--color-muted-foreground)]">
                  {g.daysIdle}d {g.leftCompanyAt && <span className="text-[11px]">· left {formatRelative(g.leftCompanyAt)}</span>}
                </div>
                <div className="col-span-1 text-right font-mono tabular-nums">
                  {formatCurrency(g.monthlyCost, { maximumFractionDigits: 2 })}
                </div>
                <div className="col-span-1 text-right">
                  <Button variant="ghost" size="sm" aria-label="Open admin">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
