import { Topbar } from "@/components/app/topbar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IntegrationLogo } from "@/components/site/integration-logos";
import {
  integrations,
  ghostSeats,
  activity,
  totals,
} from "@/lib/seed";
import { formatCurrency, formatRelative } from "@/lib/utils";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Gauge,
  TrendingDown,
  Users,
  RefreshCcw,
  FileDown,
  Bell,
  PlugZap,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const t = totals();
  const topGhosts = ghostSeats.slice(0, 6);

  return (
    <>
      <Topbar title="Dashboard" subtitle={`Last scan ${formatRelative("2026-04-17T09:16:00Z")} • Next scan Mon 9:00`} />
      <div className="px-6 py-6 md:px-8 md:py-8 max-w-[1360px] mx-auto space-y-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Kpi
            label="Monthly waste found"
            value={formatCurrency(t.monthlyWaste)}
            sub={`${formatCurrency(t.yearlyWaste)} / year`}
            icon={<DollarSign className="h-4 w-4" />}
            trend="+$282 vs last week"
            tone="danger"
          />
          <Kpi
            label="Ghost seats"
            value={String(t.totalGhosts)}
            sub={`across ${t.connectedApps} of ${t.totalApps} apps`}
            icon={<AlertTriangle className="h-4 w-4" />}
            trend="6 new this week"
            tone="warning"
          />
          <Kpi
            label="Inactive 90d+"
            value={String(t.totalInactive)}
            sub="worth reviewing"
            icon={<Gauge className="h-4 w-4" />}
            tone="neutral"
          />
          <Kpi
            label="Seats under management"
            value={String(t.totalSeats)}
            sub="128 employees covered"
            icon={<Users className="h-4 w-4" />}
            tone="neutral"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ghost seats table */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex items-center justify-between flex-row">
              <div>
                <CardTitle>Top ghost seats this week</CardTitle>
                <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                  Ranked by monthly cost. Click any row to see the audit trail.
                </p>
              </div>
              <Link href="/reports">
                <Button variant="ghost" size="sm">
                  View all <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardBody className="p-0">
              <div className="grid grid-cols-12 px-6 py-2.5 text-[11px] uppercase tracking-wider text-[var(--color-muted-foreground)] border-b border-[var(--color-border)]">
                <div className="col-span-5">Employee</div>
                <div className="col-span-3">App</div>
                <div className="col-span-2">Reason</div>
                <div className="col-span-2 text-right">Monthly</div>
              </div>
              {topGhosts.map((g) => (
                <div key={g.id} className="grid grid-cols-12 items-center px-6 py-3 text-sm border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-subtle)] transition-colors">
                  <div className="col-span-5 min-w-0">
                    <div className="font-medium truncate">{g.name}</div>
                    <div className="text-xs text-[var(--color-muted-foreground)] truncate">{g.email}</div>
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <IntegrationLogo k={g.integration} className="h-4 w-4" />
                    <span className="capitalize">{g.integration}</span>
                  </div>
                  <div className="col-span-2">
                    <ReasonBadge reason={g.reason} daysIdle={g.daysIdle} />
                  </div>
                  <div className="col-span-2 text-right font-mono tabular-nums">
                    {formatCurrency(g.monthlyCost, { maximumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Activity feed */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardBody className="p-0">
              <ol className="divide-y divide-[var(--color-border)]">
                {activity.map((a) => (
                  <li key={a.id} className="px-6 py-4 flex gap-3">
                    <span className={`mt-0.5 h-7 w-7 rounded-full shrink-0 flex items-center justify-center ${
                      a.type === "scan" ? "bg-[var(--color-muted)] text-foreground" :
                      a.type === "alert" ? "bg-[var(--color-danger-soft)] text-[var(--color-danger-soft-foreground)]" :
                      a.type === "saving" ? "bg-[var(--color-success-soft)] text-[var(--color-success-soft-foreground)]" :
                      "bg-[var(--color-primary-soft)] text-[var(--color-primary-soft-foreground)]"
                    }`}>
                      {a.type === "scan" ? <RefreshCcw className="h-3.5 w-3.5" /> :
                       a.type === "alert" ? <Bell className="h-3.5 w-3.5" /> :
                       a.type === "saving" ? <TrendingDown className="h-3.5 w-3.5" /> :
                       <PlugZap className="h-3.5 w-3.5" />}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{a.title}</div>
                      <div className="text-xs text-[var(--color-muted-foreground)]">{a.detail}</div>
                      <div className="text-[11px] text-[var(--color-muted-foreground)] mt-0.5">{formatRelative(a.at)}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        </div>

        {/* Integrations summary */}
        <Card>
          <CardHeader className="flex items-center justify-between flex-row">
            <div>
              <CardTitle>Integration health</CardTitle>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                Connections last verified today. Waste is calculated from this month's seat count × per-seat price.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm"><FileDown className="h-3.5 w-3.5" /> Export CSV</Button>
              <Link href="/integrations"><Button size="sm">Manage <ArrowRight className="h-3.5 w-3.5"/></Button></Link>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="grid grid-cols-12 px-6 py-2.5 text-[11px] uppercase tracking-wider text-[var(--color-muted-foreground)] border-b border-[var(--color-border)]">
              <div className="col-span-3">App</div>
              <div className="col-span-2">Seats</div>
              <div className="col-span-2">Inactive 90d</div>
              <div className="col-span-2">Ghost seats</div>
              <div className="col-span-2 text-right">Monthly waste</div>
              <div className="col-span-1 text-right">Status</div>
            </div>
            {integrations.map((i) => (
              <div key={i.key} className="grid grid-cols-12 items-center px-6 py-3 text-sm border-b border-[var(--color-border)] last:border-0">
                <div className="col-span-3 flex items-center gap-2.5">
                  <IntegrationLogo k={i.key} className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{i.name}</div>
                    <div className="text-[11px] text-[var(--color-muted-foreground)]">
                      {formatCurrency(i.pricePerSeat, { maximumFractionDigits: 2 })}/seat
                    </div>
                  </div>
                </div>
                <div className="col-span-2 font-mono tabular-nums">{i.seats}</div>
                <div className="col-span-2 font-mono tabular-nums">{i.inactiveSeats}</div>
                <div className="col-span-2">
                  <Badge tone={i.ghostSeats > 0 ? "danger" : "success"}>
                    {i.ghostSeats > 0 ? <AlertTriangle className="h-3 w-3"/> : <CheckCircle2 className="h-3 w-3"/>}
                    {i.ghostSeats} {i.ghostSeats === 1 ? "seat" : "seats"}
                  </Badge>
                </div>
                <div className="col-span-2 text-right font-mono tabular-nums">
                  {formatCurrency(i.ghostSeats * i.pricePerSeat)}
                </div>
                <div className="col-span-1 text-right">
                  <Badge tone={i.connected ? "success" : "warning"}>
                    {i.connected ? "Live" : "Not connected"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

function Kpi({
  label, value, sub, icon, trend, tone = "neutral",
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  trend?: string;
  tone?: "danger" | "warning" | "neutral";
}) {
  const toneCls = {
    danger: "bg-[var(--color-danger-soft)] text-[var(--color-danger-soft-foreground)]",
    warning: "bg-[var(--color-warning-soft)] text-[var(--color-warning-soft-foreground)]",
    neutral: "bg-[var(--color-muted)] text-foreground",
  }[tone];
  return (
    <Card>
      <CardBody className="py-5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--color-muted-foreground)]">{label}</span>
          <span className={`h-7 w-7 rounded-[var(--radius-sm)] flex items-center justify-center ${toneCls}`}>{icon}</span>
        </div>
        <div className="mt-3 text-3xl font-semibold tracking-tight font-mono tabular-nums">{value}</div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-[var(--color-muted-foreground)]">{sub}</span>
          {trend && <span className="text-[11px] text-[var(--color-primary)] font-medium">{trend}</span>}
        </div>
      </CardBody>
    </Card>
  );
}

function ReasonBadge({
  reason, daysIdle,
}: { reason: "offboarded" | "inactive90" | "duplicate" | "over-provisioned"; daysIdle: number }) {
  if (reason === "offboarded") return <Badge tone="danger"><AlertTriangle className="h-3 w-3"/>Offboarded</Badge>;
  if (reason === "inactive90") return <Badge tone="warning"><AlertTriangle className="h-3 w-3"/>Idle {daysIdle}d</Badge>;
  if (reason === "duplicate") return <Badge tone="warning">Duplicate</Badge>;
  return <Badge tone="neutral">Over‑provisioned</Badge>;
}
