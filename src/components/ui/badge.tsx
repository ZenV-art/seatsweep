import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border",
  {
    variants: {
      tone: {
        neutral:
          "bg-[var(--color-muted)] text-[var(--color-muted-foreground)] border-[var(--color-border)]",
        danger:
          "bg-[var(--color-danger-soft)] text-[var(--color-danger-soft-foreground)] border-[color-mix(in_oklab,var(--color-danger)_25%,white)]",
        success:
          "bg-[var(--color-success-soft)] text-[var(--color-success-soft-foreground)] border-[color-mix(in_oklab,var(--color-success)_25%,white)]",
        warning:
          "bg-[var(--color-warning-soft)] text-[var(--color-warning-soft-foreground)] border-[color-mix(in_oklab,var(--color-warning)_25%,white)]",
        primary:
          "bg-[var(--color-primary-soft)] text-[var(--color-primary-soft-foreground)] border-[color-mix(in_oklab,var(--color-primary)_20%,white)]",
      },
    },
    defaultVariants: { tone: "neutral" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
