import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ provider: string }> }
) {
  const { provider } = await ctx.params;
  // Placeholder until Supabase Auth is wired. Real flow will call
  // supabase.auth.signInWithOAuth({ provider }) and redirect to the
  // provider's consent screen. For now we just route to dashboard.
  const url = new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000");
  url.searchParams.set("auth", provider);
  return NextResponse.redirect(url, 302);
}
