import Link from "next/link";
import { MarketingNav } from "@/components/site/marketing-nav";
import { Footer } from "@/components/site/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroPreview } from "@/components/site/hero-preview";
import { IntegrationLogo } from "@/components/site/integration-logos";
import {
  ArrowRight,
  Check,
  Upload,
  Radar,
  Receipt,
  ShieldCheck,
  Zap,
  Clock,
  Lock,
  FileSpreadsheet,
  Bell,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <MarketingNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-red" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[620px] grid-bg mask-fade-b opacity-40" />
        <div className="mx-auto max-w-[1200px] px-6 pt-16 md:pt-24 pb-16">
          <div className="flex flex-col items-center text-center">
            <Link
              href="/changelog"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white/80 backdrop-blur px-3 py-1 text-xs text-[var(--color-muted-foreground)] shadow-[var(--shadow-soft)] hover:bg-white transition animate-in-fade"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-primary)]" />
              </span>
              New — Figma + Google Workspace detection
              <ArrowRight className="h-3 w-3" />
            </Link>

            <h1 className="mt-6 text-balance text-4xl md:text-6xl lg:text-[72px] font-semibold tracking-[-0.03em] leading-[1.02] animate-in-up">
              Stop paying for seats{" "}
              <span className="relative">
                <span className="bg-gradient-to-br from-[#fb7185] via-[#ef4444] to-[#b91c1c] bg-clip-text text-transparent">
                  nobody uses.
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-[17px] md:text-lg text-[var(--color-muted-foreground)] leading-relaxed animate-in-up" style={{ animationDelay: "80ms" }}>
              SeatSweep logs into every SaaS tool in your stack each week, finds
              ghost seats from ex‑employees, inactive licenses, and duplicate
              subscriptions — and shows you exactly how to cancel them.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 animate-in-up" style={{ animationDelay: "140ms" }}>
              <Link href="/signup">
                <Button size="xl" className="w-full sm:w-auto">
                  Start free scan <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  See how it works
                </Button>
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-xs text-[var(--color-muted-foreground)]">
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[var(--color-success)]"/>No credit card</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[var(--color-success)]"/>7‑day free trial</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[var(--color-success)]"/>Save $300/mo or it's free</span>
            </div>
          </div>

          <div className="mt-14 md:mt-20 animate-in-up" style={{ animationDelay: "220ms" }}>
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["$4,820", "avg saved / 10 employees / yr"],
            ["23%", "of SaaS spend is wasted"],
            ["5 min", "to first report"],
            ["40+", "tools we scan today"],
          ].map(([big, sm]) => (
            <div key={big} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-semibold tracking-tight font-mono tabular-nums">{big}</div>
              <div className="text-sm text-[var(--color-muted-foreground)] mt-1">{sm}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-[1200px] px-6 py-24">
        <div className="max-w-2xl">
          <Badge tone="primary">The problem</Badge>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight">
            Your SaaS bill is quietly{" "}
            <span className="text-[var(--color-primary)]">30% fiction.</span>
          </h2>
          <p className="mt-4 text-[17px] text-[var(--color-muted-foreground)] leading-relaxed">
            Finance teams at companies with 20–200 people waste an average of
            $4,800 per employee per year on SaaS seats nobody uses. The culprits?
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { icon: <AlertTriangle className="h-5 w-5" />, title: "Offboarding failures", body: "People leave. Slack, Notion, Figma seats stay. Nobody remembers to revoke them for months." },
            { icon: <Clock className="h-5 w-5" />, title: "Zombie licenses", body: "Seats that haven't been logged into in 90+ days — still billed monthly, still there next quarter." },
            { icon: <Receipt className="h-5 w-5" />, title: "Duplicate tools", body: "Two Figma orgs, three Notion workspaces, a Slack free plan nobody knew upgraded to Pro." },
          ].map((c) => (
            <div key={c.title} className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6">
              <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--color-primary-soft-foreground)] flex items-center justify-center">
                {c.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-1.5 text-sm text-[var(--color-muted-foreground)] leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-[var(--color-subtle)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-[1200px] px-6 py-24">
          <div className="max-w-2xl">
            <Badge>How it works</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight">
              Connect once. Savings forever.
            </h2>
            <p className="mt-4 text-[17px] text-[var(--color-muted-foreground)] leading-relaxed">
              No IT project. No vendor calls. Setup is 5 minutes, and the first
              report usually pays for a year of SeatSweep before you finish your coffee.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {[
              {
                n: "01",
                icon: <Upload className="h-5 w-5" />,
                title: "Upload your roster",
                body: "Drop in a CSV of active employees — or we auto-sync from Rippling / BambooHR (coming soon).",
              },
              {
                n: "02",
                icon: <Radar className="h-5 w-5" />,
                title: "Connect your tools",
                body: "Add admin credentials once, encrypted with AES-256. We log in weekly, scrape real usage, log out.",
              },
              {
                n: "03",
                icon: <DollarSign className="h-5 w-5" />,
                title: "Review + recover",
                body: "We email you a savings report every Monday with 1-click cancellation links and audit trail.",
              },
            ].map((s) => (
              <div key={s.n} className="relative rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--color-primary-soft-foreground)] flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="text-xs font-mono text-[var(--color-muted-foreground)]">{s.n}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1.5 text-sm text-[var(--color-muted-foreground)] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section id="integrations" className="mx-auto max-w-[1200px] px-6 py-24">
        <div className="max-w-2xl">
          <Badge tone="primary">Integrations</Badge>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight">
            Works with the tools you already pay for.
          </h2>
          <p className="mt-4 text-[17px] text-[var(--color-muted-foreground)] leading-relaxed">
            We ship with the 5 biggest seat-waste offenders. Need another? Tell us
            — most connectors ship in under a week.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            ["slack", "Slack", "Finds offboarded users still paying for Pro/Business seats."],
            ["google", "Google Workspace", "Catches inactive Gmail/Drive licenses and duplicate groups."],
            ["github", "GitHub", "Detects zombie org seats & unused Copilot licenses."],
            ["notion", "Notion", "Flags members who haven't loaded a page in 90+ days."],
            ["figma", "Figma", "Finds paid editors who only view files (downgrade candidates)."],
          ].map(([k, name, desc]) => (
            <div key={k} className="group rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-card)] transition-all">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-subtle)] flex items-center justify-center">
                  <IntegrationLogo k={k as "slack"} className="h-5 w-5" />
                </div>
                <div className="font-semibold">{name}</div>
              </div>
              <p className="mt-3 text-sm text-[var(--color-muted-foreground)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[var(--color-subtle)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-[1200px] px-6 py-24">
          <div className="max-w-2xl">
            <Badge>Features</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight">
              Everything you need to kill SaaS waste.
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: <Radar className="h-5 w-5" />, t: "Weekly auto‑scans", d: "Set it once. Every Monday we run the audit and ship you a report." },
              { icon: <Bell className="h-5 w-5" />, t: "Real‑time offboarding alerts", d: "Removed someone from your HRIS? We detect their dangling seats in 60 seconds." },
              { icon: <FileSpreadsheet className="h-5 w-5" />, t: "Exportable savings reports", d: "CSV + PDF for finance. CFO‑ready with audit trail per recovered seat." },
              { icon: <Zap className="h-5 w-5" />, t: "1‑click cancellation", d: "Deep links into each tool's admin panel, right to the cancel button." },
              { icon: <Lock className="h-5 w-5" />, t: "Zero‑trust credentials", d: "AES‑256 at rest, per‑tenant KMS keys, session isolation, SOC 2 roadmap." },
              { icon: <ShieldCheck className="h-5 w-5" />, t: "Money‑back guarantee", d: "$300/mo in savings in 30 days or your subscription is free. Period." },
            ].map((f) => (
              <div key={f.t} className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6">
                <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--color-primary-soft-foreground)] flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold">{f.t}</h3>
                <p className="mt-1.5 text-sm text-[var(--color-muted-foreground)] leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="mx-auto max-w-[1200px] px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <Badge tone="primary">Early customers</Badge>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight">
            Ops teams are already saving real money.
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { q: "Found $3,400/mo of ghost seats in our first scan — mostly Slack and Notion from a reorg two quarters ago. Paid for itself 14x.", n: "Mark Delaney", r: "Head of Ops, 38‑person fintech" },
            { q: "Finance asked for SaaS waste visibility. I was dreading building a spreadsheet. SeatSweep did it in an afternoon.", n: "Priya Desai", r: "IT Lead, Series B SaaS" },
            { q: "We turned it on before a seat renewal. Cancelled 11 of 42 Figma licenses. CFO actually smiled.", n: "Jordan Hale", r: "Founder, design agency" },
          ].map((t, i) => (
            <div key={i} className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 flex flex-col">
              <p className="text-[15px] leading-relaxed flex-1">"{t.q}"</p>
              <div className="mt-5 pt-5 border-t border-[var(--color-border)]">
                <div className="font-medium text-sm">{t.n}</div>
                <div className="text-xs text-[var(--color-muted-foreground)]">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-[var(--color-subtle)] border-y border-[var(--color-border)]">
        <div className="mx-auto max-w-[1200px] px-6 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <Badge tone="primary">Pricing</Badge>
            <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight">
              One flat fee. Guaranteed ROI.
            </h2>
            <p className="mt-4 text-[17px] text-[var(--color-muted-foreground)]">
              No per‑seat price. No % of savings. If we don't find $300/mo in
              recoverable spend in 30 days, you pay nothing.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <PricingCard
              name="Starter"
              price="Free"
              sub="Forever"
              desc="For founders auditing their own stack."
              features={[
                "1 integration",
                "CSV employee upload",
                "Monthly scan",
                "Email report",
              ]}
              cta="Start free"
              href="/signup"
            />
            <PricingCard
              name="Team"
              price="$99"
              sub="/month"
              desc="For 10–100 person companies. The sweet spot."
              features={[
                "All 5 integrations",
                "Weekly scans",
                "Real-time offboarding alerts",
                "PDF + CSV exports",
                "$300/mo savings guaranteed",
                "Email + chat support",
              ]}
              cta="Start 7‑day trial"
              href="/signup?plan=team"
              featured
            />
            <PricingCard
              name="Business"
              price="$399"
              sub="/month"
              desc="For scaleups with 100+ seats and compliance needs."
              features={[
                "Unlimited integrations",
                "Daily scans",
                "HRIS sync (Rippling/BambooHR)",
                "SSO + SCIM",
                "DPA + SOC 2 letter",
                "Dedicated Slack channel",
              ]}
              cta="Book a call"
              href="mailto:sales@seatsweep.com"
            />
          </div>
          <p className="mt-8 text-center text-xs text-[var(--color-muted-foreground)]">
            Prices in USD. Cancel anytime. All plans include SSL, weekly backups, and a 30-day money-back guarantee.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-[880px] px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge>FAQ</Badge>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight">
            Questions, answered.
          </h2>
        </div>
        <div className="divide-y divide-[var(--color-border)] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white">
          {[
            { q: "How is this different from Zylo, Torii, or Vendr?", a: "Those tools cost $15k–$50k/year and take 6 weeks to implement via IT procurement. SeatSweep costs $99/mo, takes 5 minutes, and is built for teams under 200 people." },
            { q: "Is giving you admin credentials safe?", a: "We store creds encrypted with AES-256 using per-tenant KMS keys. We only log in during scheduled scans, run in isolated sessions, and log every action. You can revoke access any time from the dashboard." },
            { q: "What if the SaaS tool changes its admin UI?", a: "We monitor every connector and auto-repair within 24 hours of any UI change. Customers get a notification. No manual fixes needed." },
            { q: "Do you work with SaaS tools that have admin APIs?", a: "Yes — we prefer APIs where available (Slack, Google). For tools without usable APIs, browser automation is the moat." },
            { q: "Can I try it without paying?", a: "Yes — the Starter plan is free forever. Team is a 7-day trial, no credit card required." },
          ].map((f, i) => (
            <details key={i} className="group px-6 py-5 cursor-pointer">
              <summary className="flex items-center justify-between list-none">
                <span className="text-[15px] font-medium pr-4">{f.q}</span>
                <span className="h-6 w-6 shrink-0 rounded-full border border-[var(--color-border-strong)] text-[var(--color-muted-foreground)] flex items-center justify-center text-xs group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-[var(--color-muted-foreground)] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1100px] relative overflow-hidden rounded-[var(--radius-2xl)] bg-gradient-to-br from-[#fb7185] via-[#ef4444] to-[#b91c1c] p-10 md:p-16 text-white shadow-[0_24px_60px_-20px_rgb(239_68_68/0.45)]">
          <div className="absolute inset-0 -z-10 opacity-20 grid-bg" />
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight">
              Your next SaaS renewal is coming.
            </h2>
            <p className="mt-4 text-white/85 text-[17px] leading-relaxed">
              Run a free scan in 5 minutes. If we don't find $300/mo of
              waste, close the tab and you've lost nothing but 5 minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/signup">
                <Button size="xl" variant="dark" className="bg-white text-[var(--color-primary)] hover:bg-white/95 w-full sm:w-auto">
                  Start free scan <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button size="xl" variant="ghost" className="text-white hover:bg-white/10 w-full sm:w-auto">
                  See pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function PricingCard({
  name, price, sub, desc, features, cta, href, featured,
}: {
  name: string;
  price: string;
  sub: string;
  desc: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[var(--radius-xl)] border bg-white p-6 flex flex-col ${
        featured
          ? "border-[var(--color-primary)] shadow-[0_12px_48px_-12px_rgb(239_68_68/0.25)] ring-1 ring-[var(--color-primary)]/20"
          : "border-[var(--color-border)]"
      }`}
    >
      {featured && (
        <div className="absolute -top-2.5 left-6 inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)] text-white px-2.5 py-0.5 text-[11px] font-medium">
          Most popular
        </div>
      )}
      <div className="text-sm font-semibold">{name}</div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight font-mono tabular-nums">{price}</span>
        <span className="text-sm text-[var(--color-muted-foreground)]">{sub}</span>
      </div>
      <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{desc}</p>
      <ul className="mt-6 space-y-2.5 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-[var(--color-success)] mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link href={href} className="mt-6">
        <Button
          size="lg"
          variant={featured ? "primary" : "secondary"}
          className="w-full"
        >
          {cta}
        </Button>
      </Link>
    </div>
  );
}
