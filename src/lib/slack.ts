export type SlackMember = {
  id: string;
  name: string;
  realName: string;
  email: string | null;
  deleted: boolean;
  isBot: boolean;
  isRestricted: boolean;
  isUltraRestricted: boolean;
  updated: number;
};

type RawSlackUser = {
  id: string;
  name: string;
  real_name?: string;
  deleted?: boolean;
  is_bot?: boolean;
  is_restricted?: boolean;
  is_ultra_restricted?: boolean;
  updated?: number;
  profile?: { email?: string; real_name?: string };
};

type UsersListResponse = {
  ok: boolean;
  error?: string;
  members?: RawSlackUser[];
  response_metadata?: { next_cursor?: string };
};

const API = "https://slack.com/api";

export async function listSlackMembers(token: string): Promise<SlackMember[]> {
  const members: SlackMember[] = [];
  let cursor: string | undefined;

  do {
    const url = new URL(`${API}/users.list`);
    url.searchParams.set("limit", "200");
    if (cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data: UsersListResponse = await res.json();

    if (!data.ok) {
      throw new Error(`slack_api_error:${data.error ?? "unknown"}`);
    }

    for (const m of data.members ?? []) {
      members.push({
        id: m.id,
        name: m.name,
        realName: m.real_name ?? m.profile?.real_name ?? m.name,
        email: m.profile?.email ?? null,
        deleted: Boolean(m.deleted),
        isBot: Boolean(m.is_bot) || m.id === "USLACKBOT",
        isRestricted: Boolean(m.is_restricted),
        isUltraRestricted: Boolean(m.is_ultra_restricted),
        updated: m.updated ?? 0,
      });
    }

    cursor = data.response_metadata?.next_cursor || undefined;
  } while (cursor);

  return members;
}

export type RosterEntry = { name?: string; email: string; status?: string };

export type SlackGhost = {
  memberId: string;
  name: string;
  email: string | null;
  reason: "offboarded" | "deactivated" | "not-in-roster" | "guest-stale";
  daysSinceUpdate: number;
};

export function diffAgainstRoster(
  members: SlackMember[],
  roster: RosterEntry[]
): { ghosts: SlackGhost[]; activeCount: number; botCount: number } {
  const now = Date.now();
  const rosterEmails = new Set(
    roster
      .filter((r) => !r.status || r.status.toLowerCase() === "active")
      .map((r) => r.email.trim().toLowerCase())
      .filter(Boolean)
  );
  const offboardedEmails = new Set(
    roster
      .filter((r) => r.status && r.status.toLowerCase() !== "active")
      .map((r) => r.email.trim().toLowerCase())
      .filter(Boolean)
  );

  const ghosts: SlackGhost[] = [];
  let activeCount = 0;
  let botCount = 0;

  for (const m of members) {
    if (m.isBot) {
      botCount++;
      continue;
    }
    const email = m.email?.toLowerCase() ?? null;
    const daysSinceUpdate = m.updated
      ? Math.floor((now / 1000 - m.updated) / 86400)
      : 0;

    if (m.deleted) {
      ghosts.push({
        memberId: m.id,
        name: m.realName,
        email,
        reason: "deactivated",
        daysSinceUpdate,
      });
      continue;
    }

    if (email && offboardedEmails.has(email)) {
      ghosts.push({
        memberId: m.id,
        name: m.realName,
        email,
        reason: "offboarded",
        daysSinceUpdate,
      });
      continue;
    }

    if (email && !rosterEmails.has(email)) {
      ghosts.push({
        memberId: m.id,
        name: m.realName,
        email,
        reason: "not-in-roster",
        daysSinceUpdate,
      });
      continue;
    }

    if (
      (m.isRestricted || m.isUltraRestricted) &&
      daysSinceUpdate > 90
    ) {
      ghosts.push({
        memberId: m.id,
        name: m.realName,
        email,
        reason: "guest-stale",
        daysSinceUpdate,
      });
      continue;
    }

    activeCount++;
  }

  return { ghosts, activeCount, botCount };
}
