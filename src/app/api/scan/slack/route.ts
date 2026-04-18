import { NextResponse } from "next/server";
import { listSlackMembers, diffAgainstRoster, type RosterEntry } from "@/lib/slack";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  token?: string;
  roster?: RosterEntry[];
  pricePerSeat?: number;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const token = body.token ?? process.env.SLACK_BOT_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "missing_token", hint: "Pass `token` in body or set SLACK_BOT_TOKEN. Needs users:read + users:read.email scopes." },
      { status: 400 }
    );
  }

  const roster = Array.isArray(body.roster) ? body.roster : [];
  const pricePerSeat = typeof body.pricePerSeat === "number" ? body.pricePerSeat : 12.5;

  try {
    const members = await listSlackMembers(token);
    const { ghosts, activeCount, botCount } = diffAgainstRoster(members, roster);

    const monthlyWaste = ghosts.length * pricePerSeat;

    return NextResponse.json({
      ok: true,
      ranAt: new Date().toISOString(),
      integration: "slack",
      totals: {
        members: members.length,
        active: activeCount,
        bots: botCount,
        ghosts: ghosts.length,
      },
      pricePerSeat,
      monthlyWaste,
      yearlyWaste: monthlyWaste * 12,
      ghosts,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "scan_failed";
    const status = message.startsWith("slack_api_error:") ? 502 : 500;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
