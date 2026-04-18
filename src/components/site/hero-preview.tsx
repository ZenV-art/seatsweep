import { Badge } from "@/components/ui/badge";
import { IntegrationLogo } from "./integration-logos";
import { AlertTriangle, CheckCircle2, TrendingDown } from "lucide-react";

export function HeroPreview() {
  return (
    <div className="relative mx-auto max-w-[1040px]">
      <div className="absolute -inset-8 -z-10 bg-radial-red blur-2xl opacity-80" />
      <div className="rounded-[20px] border border-[var(--color-border)] bg-white shadow-[0_32px_80px_-20px_rgb(15_17_21/0.18),0_8px_24px_-8px_rgb(15_17_21/0.08)] overflow-hidden">
        {/* Top chrome */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-3 bg-[var(--color-subtle)]">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="text-xs text-[var(--color-muted-foreground)] font-mono">
            app.seatsweep.com / dashboard
          </div>
          <div className="w-10" />
        </div>

        <div className="grid grid-cols-12 gap-0">
          {/* Sidebar */}
          <div className="hidden md:block col-span-3 border-r border-[var(--color-border)] bg-[var(--color-subtle)] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)] mb-2 px-2">Workspace</div>
            {["Dashboard", "Integrations", "Employees", "Reports", "Settings"].map((l, i) => (
              <div key={l} className={`text-sm rounded-md px-2 py-1.5 mb-0.5 ${i === 0 ? "bg-white shadow-[var(--shadow-soft)] text-foreground font-medium" : "text-[var(--color-muted-foreground)]"}`}>{l}</div>
            ))}
          </div>

          {/* Main */}
          <div className="col-span-12 md:col-span-9 p-5 md:p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[var(--color-muted-foreground)]">Monthly savings found</div>
                <div className="text-3xl md:text-4xl font-semibold tracking-tight mt-1 font-mono tabular-nums">$2,847<span className="text-xl text-[var(--color-muted-foreground)]"> / mo</span></div>
              </div>
              <Badge tone="primary">
                <TrendingDown className="h-3 w-3" /> 23% waste found
              </Badge>
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <Stat label="Ghost seats" value="20" sub="across 5 apps" tone="danger" />
              <Stat label="Inactive 90d+" value="32" sub="worth reviewing" tone="warning" />
              <Stat label="Covered employees" value="128" sub="via HRIS + CSV" tone="neutral" />
            </div>

            {/* Table */}
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-white">
              <div className="grid grid-cols-12 px-4 py-2.5 bg-[var(--color-subtle)] text-[11px] uppercase tracking-wider text-[var(--color-muted-foreground)] border-b border-[var(--color-border)]">
                <div className="col-span-5">Employee</div>
                <div className="col-span-3">App</div>
                <div className="col-span-2">Reason</div>
                <div className="col-span-2 text-right">Monthly</div>
              </div>
              {[
                { n: "Sarah Chen", e: "sarah.chen@acme.co", app: "slack", r: "Offboarded", c: "$12.50", rTone: "danger" as const },
                { n: "James Liu", e: "james.liu@acme.co", app: "github", r: "Inactive 142d", c: "$21.00", rTone: "warning" as const },
                { n: "Priya Patel", e: "priya@acme.co", app: "notion", r: "Offboarded", c: "$10.00", rTone: "danger" as const },
                { n: "Alex Rivera", e: "alex.r@acme.co", app: "google", r: "Duplicate", c: "$18.00", rTone: "warning" as const },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-12 items-center px-4 py-3 text-sm border-b border-[var(--color-border)] last:border-0">
                  <div className="col-span-5">
                    <div className="font-medium">{row.n}</div>
                    <div className="text-xs text-[var(--color-muted-foreground)] truncate">{row.e}</div>
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <IntegrationLogo k={row.app as "slack"} className="h-4 w-4" />
                    <span className="capitalize">{row.app}</span>
                  </div>
                  <div className="col-span-2">
                    <Badge tone={row.rTone}>
                      {row.rTone === "danger" ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                      {row.r}
                    </Badge>
                  </div>
                  <div className="col-span-2 text-right font-mono tabular-nums">{row.c}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label, value, sub, tone,
}: { label: string; value: string; sub: string; tone: "danger" | "warning" | "neutral" }) {
  const toneRing = {
    danger: "bg-[var(--color-danger-soft)] text-[var(--color-danger-soft-foreground)]",
    warning: "bg-[var(--color-warning-soft)] text-[var(--color-warning-soft-foreground)]",
    neutral: "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]",
  }[tone];
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--color-muted-foreground)]">{label}</span>
        <span className={`h-1.5 w-1.5 rounded-full ${toneRing.split(" ")[0]}`} />
      </div>
      <div className="text-2xl font-semibold tracking-tight mt-1 font-mono tabular-nums">{value}</div>
      <div className="text-xs text-[var(--color-muted-foreground)] mt-0.5">{sub}</div>
    </div>
  );
}
