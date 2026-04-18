import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] grid lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex flex-col">
        <div className="px-6 md:px-10 h-16 flex items-center">
          <Link href="/"><Logo /></Link>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
        <div className="px-6 md:px-10 py-6 text-xs text-[var(--color-muted-foreground)] flex items-center justify-between">
          <span>© {new Date().getFullYear()} SeatSweep</span>
          <div className="flex gap-4">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </div>

      {/* Right — marketing panel */}
      <div className="relative hidden lg:block bg-[var(--color-subtle)] overflow-hidden">
        <div className="absolute inset-0 bg-radial-red opacity-80" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative h-full flex flex-col justify-between p-10">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white/80 backdrop-blur px-3 py-1 text-xs shadow-[var(--shadow-soft)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
              Live audit running somewhere right now
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.02em] leading-tight">
              The average SeatSweep customer recovers{" "}
              <span className="text-[var(--color-primary)]">$2,847/month</span> of wasted SaaS spend — within 7 days.
            </h2>
          </div>

          <blockquote className="max-w-md rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
            <p className="text-[15px] leading-relaxed">
              "We found $3,400/mo of ghost seats in the first scan — mostly Slack and Notion from a reorg two quarters ago. Paid for itself 14x."
            </p>
            <div className="mt-4 flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#fb7185] to-[#b91c1c] text-white text-xs font-semibold flex items-center justify-center">MD</div>
              <div>
                <div className="text-sm font-medium">Mark Delaney</div>
                <div className="text-xs text-[var(--color-muted-foreground)]">Head of Ops, 38‑person fintech</div>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
