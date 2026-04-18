"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import {
  LayoutDashboard,
  Plug,
  Users,
  FileBarChart2,
  Settings,
  Sparkles,
  LifeBuoy,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/integrations", label: "Integrations", icon: Plug },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/reports", label: "Reports", icon: FileBarChart2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden lg:flex w-[240px] shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-subtle)] h-[100dvh] sticky top-0">
      <div className="px-5 h-16 flex items-center border-b border-[var(--color-border)]">
        <Link href="/dashboard"><Logo /></Link>
      </div>
      <div className="p-3 flex-1 overflow-auto">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)] px-2 mb-1.5">Workspace</div>
        <nav className="space-y-0.5">
          {nav.map((n) => {
            const active =
              path === n.href ||
              (n.href !== "/dashboard" && path.startsWith(n.href));
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "group flex items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-white text-foreground shadow-[var(--shadow-soft)] font-medium"
                    : "text-[var(--color-muted-foreground)] hover:text-foreground hover:bg-white/60"
                )}
              >
                <Icon className={cn("h-4 w-4", active ? "text-[var(--color-primary)]" : "")} />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-3">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-primary)]" />
            On Team plan
          </div>
          <div className="mt-1 text-[11px] text-[var(--color-muted-foreground)] leading-snug">
            Next scan runs Mon 9am.
          </div>
          <Link href="/settings/billing" className="mt-2 block text-[11px] text-[var(--color-primary)] hover:underline">
            Manage billing →
          </Link>
        </div>
      </div>
      <div className="p-3 border-t border-[var(--color-border)]">
        <Link href="mailto:support@seatsweep.com" className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)] hover:text-foreground px-2 py-1.5">
          <LifeBuoy className="h-3.5 w-3.5" />
          Help & support
        </Link>
      </div>
    </aside>
  );
}
