import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Sign in to your workspace.</p>

      <form action="/dashboard" className="mt-8 space-y-4">
        <div>
          <label className="text-xs font-medium">Work email</label>
          <Input className="mt-1" type="email" placeholder="you@company.com" required />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">Password</label>
            <Link href="/forgot" className="text-xs text-[var(--color-primary)] hover:underline">Forgot?</Link>
          </div>
          <Input className="mt-1" type="password" placeholder="••••••••" required />
        </div>
        <Button size="lg" type="submit" className="w-full">Sign in</Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-[var(--color-muted-foreground)]">
        <div className="flex-1 h-px bg-[var(--color-border)]" /> or <div className="flex-1 h-px bg-[var(--color-border)]" />
      </div>
      <Button variant="secondary" size="lg" className="w-full">Continue with Google</Button>

      <p className="mt-6 text-sm text-[var(--color-muted-foreground)] text-center">
        New to SeatSweep? <Link href="/signup" className="text-[var(--color-primary)] font-medium hover:underline">Create an account</Link>
      </p>
    </>
  );
}
