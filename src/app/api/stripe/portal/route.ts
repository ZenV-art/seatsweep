import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_TEST_CUSTOMER_ID) {
    return NextResponse.redirect(`${origin}/settings?portal=unconfigured`, 303);
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const portal = await stripe.billingPortal.sessions.create({
    customer: process.env.STRIPE_TEST_CUSTOMER_ID,
    return_url: `${origin}/settings`,
  });

  return NextResponse.redirect(portal.url, 303);
}
