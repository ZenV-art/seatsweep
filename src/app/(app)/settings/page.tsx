"use client";

import { useState } from "react";
import { Topbar } from "@/components/app/topbar";
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, CreditCard, Lock, Users, Sparkles, Check, ArrowRight } from "lucide-react";

export default function SettingsPage() {
  const [tab, setTab] = useState<"workspace" | "team" | "security" | "billing">("workspace");

  return (
    <>
      <Topbar title="Settings" subtitle="Manage your workspace, team, security, and billing." />
      <div className="px-6 py-6 md:px-8 md:py-8 max-w-[1100px] mx-auto">
        <div className="flex gap-1 border-b border-[var(--color-border)] mb-6">
          {[
            { k: "workspace" as const, label: "Workspace", icon: Building2 },
            { k: "team" as const, label: "Team", icon: Users },
            { k: "security" as const, label: "Security", icon: Lock },
            { k: "billing" as const, label: "Billing", icon: CreditCard },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors ${
                tab === t.k
                  ? "border-[var(--color-primary)] text-foreground font-medium"
                  : "border-transparent text-[var(--color-muted-foreground)] hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "workspace" && <WorkspaceTab />}
        {tab === "team" && <TeamTab />}
        {tab === "security" && <SecurityTab />}
        {tab === "billing" && <BillingTab />}
      </div>
    </>
  );
}

function WorkspaceTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Workspace profile</CardTitle>
          <CardDescription>This name appears in reports and email notifications.</CardDescription>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium">Workspace name</label>
              <Input className="mt-1" defaultValue="Acme, Inc." />
            </div>
            <div>
              <label className="text-xs font-medium">Primary domain</label>
              <Input className="mt-1" defaultValue="acme.co" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium">Currency</label>
            <select className="mt-1 h-10 w-full md:w-[260px] rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-3 text-sm shadow-[var(--shadow-soft)]">
              <option>USD – US Dollar</option>
              <option>EUR – Euro</option>
              <option>GBP – British Pound</option>
            </select>
          </div>
          <div className="flex justify-end">
            <Button>Save changes</Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scan schedule</CardTitle>
          <CardDescription>When should SeatSweep run its weekly audit?</CardDescription>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium">Day</label>
              <select className="mt-1 h-10 w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-3 text-sm shadow-[var(--shadow-soft)]">
                <option>Monday</option><option>Tuesday</option><option>Wednesday</option>
                <option>Thursday</option><option>Friday</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium">Time (local)</label>
              <Input className="mt-1" type="time" defaultValue="09:00" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save schedule</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function TeamTab() {
  const members = [
    { n: "Anas Syed", e: "anas@acme.co", r: "Owner" },
    { n: "Priya Desai", e: "priya@acme.co", r: "Admin" },
    { n: "Jordan Hale", e: "jordan@acme.co", r: "Viewer" },
  ];
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex items-center justify-between flex-row">
          <div>
            <CardTitle>Invite teammates</CardTitle>
            <CardDescription>Finance can read reports. Admins can connect integrations.</CardDescription>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex gap-2">
            <Input placeholder="teammate@acme.co" className="flex-1" type="email" />
            <select className="h-10 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-3 text-sm shadow-[var(--shadow-soft)]">
              <option>Viewer</option><option>Admin</option>
            </select>
            <Button>Send invite</Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>Members</CardTitle></CardHeader>
        <CardBody className="p-0">
          {members.map((m, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-3 border-b border-[var(--color-border)] last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#fb7185] to-[#b91c1c] text-white text-xs font-semibold flex items-center justify-center">
                  {m.n.split(" ").map((x) => x[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium">{m.n}</div>
                  <div className="text-xs text-[var(--color-muted-foreground)]">{m.e}</div>
                </div>
              </div>
              <Badge tone={m.r === "Owner" ? "primary" : "neutral"}>{m.r}</Badge>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sign‑in</CardTitle>
          <CardDescription>Require 2FA and configure SSO (Business plan).</CardDescription>
        </CardHeader>
        <CardBody className="space-y-4">
          {[
            { title: "Two‑factor authentication", on: true },
            { title: "Require SSO for all members", on: false },
            { title: "Session timeout after 8h of inactivity", on: true },
          ].map((r) => (
            <div key={r.title} className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 py-3">
              <span className="text-sm">{r.title}</span>
              <Badge tone={r.on ? "success" : "neutral"}>{r.on ? "Enabled" : "Off"}</Badge>
            </div>
          ))}
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Connector credentials</CardTitle>
          <CardDescription>Encrypted at rest with AES‑256 per tenant. Rotate anytime.</CardDescription>
        </CardHeader>
        <CardBody>
          <Button variant="secondary">Rotate workspace encryption key</Button>
        </CardBody>
      </Card>
    </div>
  );
}

function BillingTab() {
  const plans = [
    { name: "Starter", price: "$0", desc: "1 integration, monthly scan", cta: "Current" },
    { name: "Team", price: "$99", desc: "All 5 integrations, weekly scans, alerts", cta: "Upgrade", featured: true },
    { name: "Business", price: "$399", desc: "Daily scans, SSO, HRIS sync", cta: "Contact sales" },
  ];
  return (
    <div className="space-y-6">
      <Card>
        <CardBody className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--color-primary-soft-foreground)] flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">On Team plan</div>
              <div className="text-xs text-[var(--color-muted-foreground)]">Renews May 17, 2026 · $99 / month</div>
            </div>
          </div>
          <form action="/api/stripe/portal" method="post">
            <Button variant="secondary" type="submit">Manage in Stripe <ArrowRight className="h-3.5 w-3.5" /></Button>
          </form>
        </CardBody>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-[var(--radius-xl)] border bg-white p-5 flex flex-col ${p.featured ? "border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/15" : "border-[var(--color-border)]"}`}
          >
            <div className="text-sm font-semibold">{p.name}</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight font-mono tabular-nums">{p.price}<span className="text-sm text-[var(--color-muted-foreground)]"> / mo</span></div>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{p.desc}</p>
            <form action="/api/stripe/checkout" method="post" className="mt-5">
              <input type="hidden" name="plan" value={p.name.toLowerCase()} />
              <Button type="submit" variant={p.featured ? "primary" : "secondary"} className="w-full">
                {p.cta}
              </Button>
            </form>
            <ul className="mt-4 space-y-2 text-xs text-[var(--color-muted-foreground)]">
              <li className="flex items-center gap-2"><Check className="h-3 w-3 text-[var(--color-success)]" /> 30‑day money‑back</li>
              <li className="flex items-center gap-2"><Check className="h-3 w-3 text-[var(--color-success)]" /> Cancel anytime</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
