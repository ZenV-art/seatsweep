# SeatSweep — Setup

This doc covers how to run SeatSweep locally and how to wire a **real** Slack scan against a workspace you control.

Everything else in the app (Google Workspace, GitHub, Notion, Figma, Stripe billing, auth) is currently mocked UI — Slack is the first live connector.

---

## 1. Run locally

```bash
cd seatsweep
npm install
npm run dev
```

Open http://localhost:3000. The landing page, dashboard, employees, reports, integrations, and settings pages all work without any environment variables.

---

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill in what you need:

```bash
cp .env.example .env.local
```

| Variable | Required for | Notes |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Auth redirects | Defaults to `http://localhost:3000` |
| `SLACK_BOT_TOKEN` | `/api/scan/slack` fallback | Optional — the UI lets you paste a token per-scan instead |
| `STRIPE_SECRET_KEY` | `/api/stripe/*` | Checkout + portal routes degrade gracefully without this |
| `STRIPE_PRICE_TEAM` / `STRIPE_PRICE_BUSINESS` | Stripe Checkout | Price IDs from your Stripe dashboard |
| `NEXT_PUBLIC_SUPABASE_*` | Auth + persistence | Not yet wired — reserved for future |

---

## 3. Run a real Slack scan

### 3a. Create a Slack app

1. Go to https://api.slack.com/apps and click **Create New App → From scratch**.
2. Name it `SeatSweep` (or whatever you like) and pick the workspace you want to scan.
3. In the left sidebar, open **OAuth & Permissions**.
4. Scroll to **Bot Token Scopes** and add:
   - `users:read`
   - `users:read.email`
5. Scroll back up and click **Install to Workspace**. Approve.
6. Copy the **Bot User OAuth Token** — it starts with `xoxb-`.

### 3b. Test it from the Integrations page

1. Run `npm run dev` and open http://localhost:3000/integrations.
2. Click **Connect** on the Slack card.
3. Paste the `xoxb-…` token.
4. Click **Test scan**.

You'll get a live count of workspace members, ghost seats, and estimated monthly waste.

### 3c. Test it from the API directly

```bash
curl -X POST http://localhost:3000/api/scan/slack \
  -H "Content-Type: application/json" \
  -d '{
    "token": "xoxb-your-token",
    "pricePerSeat": 12.5,
    "roster": [
      { "email": "alice@yourco.com", "status": "active" },
      { "email": "bob@yourco.com",   "status": "offboarded" }
    ]
  }'
```

Response shape:

```json
{
  "ok": true,
  "ranAt": "2026-04-18T12:34:56.000Z",
  "integration": "slack",
  "totals": { "members": 48, "active": 42, "bots": 3, "ghosts": 3 },
  "pricePerSeat": 12.5,
  "monthlyWaste": 37.5,
  "yearlyWaste": 450,
  "ghosts": [
    { "memberId": "U123", "name": "Bob Example", "email": "bob@yourco.com", "reason": "offboarded", "daysSinceUpdate": 74 }
  ]
}
```

### How the scan decides what's a ghost

A Slack member is flagged when any of these are true:

| Reason | Trigger |
|---|---|
| `deactivated` | `deleted: true` on the Slack user object — they're offboarded in Slack but the seat is still being paid for until you run a cleanup |
| `offboarded` | Email matches a roster entry where `status !== "active"` |
| `not-in-roster` | Email exists in Slack but not in the roster you uploaded |
| `guest-stale` | Restricted / ultra-restricted guest that hasn't been updated in 90+ days |

Bots (including Slackbot) are skipped.

---

## 4. Load a real roster

The **Employees** page accepts a CSV with columns:

- `email` (required)
- `name` or `first_name` + `last_name`
- `status` — `active`, `offboarded`, etc. (defaults to `active`)
- `department`

Rows with `status === "active"` form the "who should be in the tools" list. Anyone in Slack whose email is missing or marked non-active gets flagged.

---

## 5. Deploy

Vercel picks up the Next.js project automatically:

```bash
vercel --prod
```

Set the same env vars in the Vercel project dashboard → **Settings → Environment Variables**. `SLACK_BOT_TOKEN` only needs to be set if you want a workspace-wide default; otherwise the UI collects it per-scan and nothing gets persisted.

---

## 6. What's still mocked

Be honest with early pilots:

- **Auth** — `/api/auth/[provider]` is a placeholder redirect. Wire Supabase Auth or NextAuth before real users sign in.
- **Google / GitHub / Notion / Figma connectors** — UI only. Slack is the template for building the rest.
- **Credential vault** — UI claims AES-256 encryption at rest. Implement it before storing any real customer token (suggested: Supabase Vault or `@upstash/redis` + `node:crypto` AES-256-GCM).
- **Weekly scans** — `/api/scan` returns seeded data. Replace with a scheduled job (Vercel Cron or Upstash QStash) calling the per-integration scan routes.
- **Stripe** — routes exist but need real price IDs and a webhook handler before charging anyone.

Slack is the proof that the real version is buildable in a day per connector.
