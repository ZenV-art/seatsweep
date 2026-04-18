import { NextResponse } from "next/server";
import Stripe from "stripe";

const PRICE_MAP: Record<string, string | undefined> = {
  team: process.env.STRIPE_PRICE_TEAM,
  business: process.env.STRIPE_PRICE_BUSINESS,
};

export async function POST(req: Request) {
  const form = await req.formData();
  const plan = String(form.get("plan") ?? "team").toLowerCase();
  const price = PRICE_MAP[plan];

  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";

  if (!process.env.STRIPE_SECRET_KEY || !price) {
    return NextResponse.redirect(`${origin}/settings?billing=unconfigured`, 303);
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    success_url: `${origin}/settings?billing=success`,
    cancel_url: `${origin}/settings?billing=cancelled`,
    allow_promotion_codes: true,
  });

  return NextResponse.redirect(session.url ?? `${origin}/settings`, 303);
}
