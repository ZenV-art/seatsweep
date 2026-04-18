"use client";

import { Button } from "@/components/ui/button";
import { Search, Bell, RefreshCcw } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="h-16 px-6 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[15px] font-semibold tracking-tight truncate">{title}</div>
          {subtitle && (
            <div className="text-xs text-[var(--color-muted-foreground)] truncate">{subtitle}</div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-white px-2.5 h-9 w-[260px] text-sm text-[var(--color-muted-foreground)] shadow-[var(--shadow-soft)]">
            <Search className="h-4 w-4" />
            <input className="flex-1 bg-transparent outline-none placeholder:text-[var(--color-muted-foreground)]" placeholder="Search seats, people, apps…" />
            <kbd className="text-[10px] font-mono bg-[var(--color-muted)] px-1.5 py-0.5 rounded">⌘K</kbd>
          </div>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Button size="sm">
            <RefreshCcw className="h-3.5 w-3.5" /> Run scan
          </Button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#fb7185] to-[#b91c1c] text-white text-xs font-semibold flex items-center justify-center">
            AS
          </div>
        </div>
      </div>
    </div>
  );
}
