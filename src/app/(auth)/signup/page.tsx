import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

export default function SignupPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Start your free scan</h1>
      <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
        Get to your first savings report in under 5 minutes. No credit card required.
      </p>

      <ul className="mt-5 space-y-1.5 text-xs text-[var(--color-muted-foreground)]">
        {[
          "$300/mo savings guaranteed or your plan is free",
          "SOC 2 roadmap · AES-256 encryption",
          "Cancel in one click anytime",
        ].map((t) => (
          <li key={t} className="flex items-center gap-2">
            <Check className="h-3 w-3 text-[var(--color-success)]" /> {t}
          </li>
        ))}
      </ul>

      <form action="/dashboard" className="mt-7 space-y-4">
        <div>
          <label className="text-xs font-medium">Full name</label>
          <Input className="mt-1" placeholder="Ada Lovelace" required />
        </div>
        <div>
          <label className="text-xs font-medium">Work email</label>
          <Input className="mt-1" type="email" placeholder="you@company.com" required />
        </div>
        <div>
          <label className="text-xs font-medium">Create a password</label>
          <Input className="mt-1" type="password" placeholder="8+ characters" required />
        </div>
        <Button size="lg" type="submit" className="w-full">Create workspace</Button>
      </form>

      <p className="mt-6 text-xs text-[var(--color-muted-foreground)] text-center">
        By continuing, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>
      <p className="mt-3 text-sm text-[var(--color-muted-foreground)] text-center">
        Already have an account? <Link href="/login" className="text-[var(--color-primary)] font-medium hover:underline">Sign in</Link>
      </p>
    </>
  );
}
