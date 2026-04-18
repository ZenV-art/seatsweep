"use client";

import { useState } from "react";
import { Topbar } from "@/components/app/topbar";
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IntegrationLogo } from "@/components/site/integration-logos";
import { integrations as seed } from "@/lib/seed";
import { CheckCircle2, Lock, Plus, ShieldCheck } from "lucide-react";
import { formatRelative } from "@/lib/utils";

export default function IntegrationsPage() {
  const [items, setItems] = useState(seed);
  const [modal, setModal] = useState<string | null>(null);

  return (
    <>
      <Topbar title="Integrations" subtitle="Admin access required. We encrypt credentials with AES‑256 and only log in during scheduled scans." />
      <div className="px-6 py-6 md:px-8 md:py-8 max-w-[1200px] mx-auto space-y-6">
        <Card>
          <CardHeader className="flex items-center justify-between flex-row">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--color-primary-soft-foreground)] flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Zero‑trust credentials</CardTitle>
                <CardDescription>
                  Session keys are encrypted per‑tenant. You can rotate or revoke access any time.
                </CardDescription>
              </div>
            </div>
            <Badge tone="success"><Lock className="h-3 w-3" /> Encrypted at rest</Badge>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((i) => (
            <Card key={i.key}>
              <CardBody className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-subtle)] flex items-center justify-center">
                  <IntegrationLogo k={i.key} className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold truncate">{i.name}</div>
                    <Badge tone={i.connected ? "success" : "warning"}>
                      {i.connected ? <><CheckCircle2 className="h-3 w-3" /> Connected</> : "Disconnected"}
                    </Badge>
                  </div>
                  <div className="text-xs text-[var(--color-muted-foreground)] truncate">
                    {i.connected
                      ? `${i.seats} seats • ${i.ghostSeats} ghost • Last scan ${formatRelative(i.lastScan)}`
                      : "Not connected — we'll show savings after the first scan."}
                  </div>
                </div>
                <Button
                  variant={i.connected ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => setModal(i.key)}
                >
                  {i.connected ? "Manage" : "Connect"}
                </Button>
              </CardBody>
            </Card>
          ))}

          <Card className="border-dashed">
            <CardBody className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-subtle)] flex items-center justify-center text-[var(--color-muted-foreground)]">
                <Plus className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Request an integration</div>
                <div className="text-xs text-[var(--color-muted-foreground)]">Zoom, Linear, Jira, Asana, Dropbox — most ship in under a week.</div>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setModal("request")}>
                Request
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      {modal && (
        <ConnectModal
          k={modal}
          name={seed.find((s) => s.key === modal)?.name ?? "Integration"}
          onClose={() => setModal(null)}
          onConnect={() => {
            setItems((prev) =>
              prev.map((p) =>
                p.key === modal ? { ...p, connected: true, lastScan: new Date().toISOString() } : p
              )
            );
            setModal(null);
          }}
        />
      )}
    </>
  );
}

function ConnectModal({
  k, name, onClose, onConnect,
}: { k: string; name: string; onClose: () => void; onConnect: () => void }) {
  const isRequest = k === "request";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-in-fade">
      <div className="w-full max-w-[440px] rounded-[var(--radius-xl)] bg-white shadow-[var(--shadow-pop)] border border-[var(--color-border)] animate-in-up">
        <div className="p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            {!isRequest && (
              <div className="h-10 w-10 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-subtle)] flex items-center justify-center">
                <IntegrationLogo k={k as "slack"} className="h-5 w-5" />
              </div>
            )}
            <div>
              <div className="text-base font-semibold">
                {isRequest ? "Request an integration" : `Connect ${name}`}
              </div>
              <div className="text-xs text-[var(--color-muted-foreground)]">
                {isRequest ? "Tell us which tool to add next." : "Provide admin credentials. We'll verify and start scanning."}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {isRequest ? (
            <>
              <div>
                <label className="text-xs font-medium">Tool name</label>
                <Input className="mt-1" placeholder="e.g. Linear, Zoom, Dropbox" />
              </div>
              <div>
                <label className="text-xs font-medium">Why it matters to you</label>
                <Input className="mt-1" placeholder="Roughly how many seats? Monthly cost?" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-medium">Admin email</label>
                <Input className="mt-1" type="email" placeholder="admin@yourcompany.com" />
              </div>
              <div>
                <label className="text-xs font-medium">Admin password</label>
                <Input className="mt-1" type="password" placeholder="••••••••••" />
              </div>
              <div className="rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--color-primary-soft-foreground)] text-xs p-3 leading-relaxed">
                <strong>How we keep this safe:</strong> Credentials are encrypted with AES‑256 using a key scoped to your workspace. Sessions run in isolated containers. You can revoke access any time.
              </div>
            </>
          )}
        </div>
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-subtle)] rounded-b-[var(--radius-xl)] flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={onConnect}>{isRequest ? "Send request" : "Connect"}</Button>
        </div>
      </div>
    </div>
  );
}
