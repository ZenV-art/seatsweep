import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-subtle)]">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-3 text-sm text-[var(--color-muted-foreground)] max-w-xs">
              Weekly SaaS audits that pay for themselves. Ghost seats, inactive
              licenses, duplicate tools — gone.
            </p>
          </div>
          <FooterCol title="Product" links={[
            ["How it works", "/#how"],
            ["Integrations", "/#integrations"],
            ["Pricing", "/#pricing"],
            ["Security", "/security"],
          ]} />
          <FooterCol title="Company" links={[
            ["About", "/about"],
            ["Changelog", "/changelog"],
            ["Contact", "mailto:hi@seatsweep.com"],
          ]} />
          <FooterCol title="Legal" links={[
            ["Privacy", "/privacy"],
            ["Terms", "/terms"],
            ["DPA", "/dpa"],
          ]} />
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[var(--color-muted-foreground)]">
          <span>© {new Date().getFullYear()} SeatSweep, Inc. All rights reserved.</span>
          <span>Built for finance teams who hate waste.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title, links,
}: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-3">
        {title}
      </div>
      <ul className="space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-[var(--color-muted-foreground)] hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
