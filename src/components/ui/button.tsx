import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-[var(--shadow-soft)] hover:bg-[var(--color-primary-hover)]",
        secondary:
          "bg-white text-foreground border border-[var(--color-border-strong)] shadow-[var(--shadow-soft)] hover:bg-[var(--color-muted)]",
        ghost: "text-foreground hover:bg-[var(--color-muted)]",
        soft: "bg-[var(--color-primary-soft)] text-[var(--color-primary-soft-foreground)] hover:bg-[color-mix(in_oklab,var(--color-primary-soft)_80%,white)]",
        dark: "bg-[var(--color-foreground)] text-white hover:bg-[color-mix(in_oklab,var(--color-foreground)_85%,white)]",
        danger:
          "bg-[var(--color-danger)] text-white hover:bg-[var(--color-primary-hover)]",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline h-auto p-0",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-11 px-5 text-[15px]",
        xl: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
