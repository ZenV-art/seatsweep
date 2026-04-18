# SeatSweep

Weekly SaaS audits that kill ghost seats and zombie subscriptions. Guaranteed $300/mo in savings — or it's free.

Next.js 16 · Tailwind 4 · TypeScript · Stripe

## Getting started

```bash
npm install
npm run dev
```

Copy `.env.example` → `.env.local` and fill in Stripe / Supabase keys when ready.

## Architecture

- `src/app/` — App Router (route groups: `(app)` dashboard, `(auth)` login/signup)
- `src/components/ui/` — primitives (Button, Card, Badge, Input, Logo)
- `src/components/site/` — marketing components (nav, hero preview, footer, logos)
- `src/components/app/` — authenticated app shell (sidebar, topbar)
- `src/lib/seed.ts` — demo data for V1 (replace with Supabase queries)
- `src/app/api/stripe/*` — Stripe Checkout + Billing Portal routes
- `src/app/api/scan/` — mock weekly scan endpoint (replace with Playwright workers)

## Design tokens

Stripe‑clean white + soft red (`#fb7185` → `#ef4444` → `#b91c1c`). See `src/app/globals.css`.
