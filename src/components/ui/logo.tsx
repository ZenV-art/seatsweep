import { cn } from "@/lib/utils";

export function Logo({ className, mark = false }: { className?: string; mark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="relative inline-flex h-7 w-7 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#fb7185] to-[#e11d48] text-white shadow-[0_2px_4px_rgb(225_29_72/0.25),inset_0_1px_0_rgb(255_255_255/0.2)]"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
          <path
            d="M4 6h12M4 10h12M4 14h7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="16" cy="14" r="2.3" fill="currentColor" />
        </svg>
      </span>
      {!mark && (
        <span className="text-[15px] font-semibold tracking-tight">SeatSweep</span>
      )}
    </span>
  );
}
