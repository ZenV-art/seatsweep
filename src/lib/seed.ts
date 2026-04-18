export type IntegrationKey =
  | "slack"
  | "google"
  | "github"
  | "notion"
  | "figma";

export type Integration = {
  key: IntegrationKey;
  name: string;
  logo: string;
  color: string;
  pricePerSeat: number;
  seats: number;
  inactiveSeats: number;
  ghostSeats: number;
  connected: boolean;
  lastScan: string;
};

export type GhostSeat = {
  id: string;
  name: string;
  email: string;
  integration: IntegrationKey;
  reason: "offboarded" | "inactive90" | "duplicate" | "over-provisioned";
  daysIdle: number;
  monthlyCost: number;
  leftCompanyAt?: string;
};

export type ActivityEvent = {
  id: string;
  type: "scan" | "saving" | "alert" | "integration";
  title: string;
  detail: string;
  at: string;
};

export const integrations: Integration[] = [
  {
    key: "slack",
    name: "Slack",
    logo: "S",
    color: "#611F69",
    pricePerSeat: 12.5,
    seats: 48,
    inactiveSeats: 11,
    ghostSeats: 6,
    connected: true,
    lastScan: "2026-04-17T09:12:00Z",
  },
  {
    key: "google",
    name: "Google Workspace",
    logo: "G",
    color: "#4285F4",
    pricePerSeat: 18,
    seats: 44,
    inactiveSeats: 5,
    ghostSeats: 4,
    connected: true,
    lastScan: "2026-04-17T09:13:00Z",
  },
  {
    key: "github",
    name: "GitHub",
    logo: "H",
    color: "#0d1117",
    pricePerSeat: 21,
    seats: 26,
    inactiveSeats: 4,
    ghostSeats: 3,
    connected: true,
    lastScan: "2026-04-17T09:15:00Z",
  },
  {
    key: "notion",
    name: "Notion",
    logo: "N",
    color: "#0f0f0f",
    pricePerSeat: 10,
    seats: 40,
    inactiveSeats: 9,
    ghostSeats: 5,
    connected: true,
    lastScan: "2026-04-17T09:16:00Z",
  },
  {
    key: "figma",
    name: "Figma",
    logo: "F",
    color: "#0ACF83",
    pricePerSeat: 15,
    seats: 18,
    inactiveSeats: 3,
    ghostSeats: 2,
    connected: false,
    lastScan: "—",
  },
];

const firstNames = [
  "Ava", "Noah", "Mia", "Liam", "Zoe", "Ethan", "Ivy", "Leo",
  "Maya", "Jude", "Nora", "Finn", "Sana", "Kai", "Riya", "Theo",
  "Lena", "Max", "Iris", "Owen", "Ada", "Seth", "Luna", "Eli",
];
const lastNames = [
  "Chen", "Patel", "Singh", "Rivera", "Khan", "Liu", "Lopez", "Okafor",
  "Martin", "Kim", "Wright", "Graham", "Rao", "Carter", "Holloway", "Park",
];

function makeName(i: number) {
  const f = firstNames[i % firstNames.length];
  const l = lastNames[(i * 3) % lastNames.length];
  return `${f} ${l}`;
}

function seedGhosts(): GhostSeat[] {
  const seats: GhostSeat[] = [];
  let id = 0;
  const reasons: GhostSeat["reason"][] = [
    "offboarded", "inactive90", "duplicate", "over-provisioned",
  ];
  for (const int of integrations) {
    for (let i = 0; i < int.ghostSeats; i++) {
      const name = makeName(id);
      const email =
        name.toLowerCase().replace(" ", ".") + "@acme.co";
      const reason = reasons[(id + int.key.length) % reasons.length];
      const daysIdle = 60 + ((id * 11) % 240);
      seats.push({
        id: `g-${id}`,
        name,
        email,
        integration: int.key,
        reason,
        daysIdle,
        monthlyCost: int.pricePerSeat,
        leftCompanyAt:
          reason === "offboarded"
            ? new Date(Date.now() - daysIdle * 86400000).toISOString()
            : undefined,
      });
      id++;
    }
  }
  return seats;
}

export const ghostSeats = seedGhosts();

export const activity: ActivityEvent[] = [
  { id: "a1", type: "scan", title: "Weekly scan complete", detail: "5 integrations • 176 seats inspected", at: "2026-04-17T09:16:00Z" },
  { id: "a2", type: "alert", title: "6 new ghost seats flagged", detail: "Slack: 3 • Notion: 2 • GitHub: 1", at: "2026-04-17T09:16:30Z" },
  { id: "a3", type: "saving", title: "$282 in savings identified", detail: "Offboard 6 Slack/Notion users to recover", at: "2026-04-17T09:17:00Z" },
  { id: "a4", type: "integration", title: "GitHub reconnected", detail: "Admin session refreshed by Alex", at: "2026-04-15T14:02:00Z" },
  { id: "a5", type: "saving", title: "Saved $840 this month", detail: "Offboarded 4 users across 3 tools", at: "2026-04-10T12:44:00Z" },
];

export function totals() {
  const totalSeats = integrations.reduce((a, b) => a + b.seats, 0);
  const totalInactive = integrations.reduce((a, b) => a + b.inactiveSeats, 0);
  const totalGhosts = integrations.reduce((a, b) => a + b.ghostSeats, 0);
  const monthlyWaste = integrations.reduce(
    (a, b) => a + b.ghostSeats * b.pricePerSeat,
    0
  );
  const yearlyWaste = monthlyWaste * 12;
  const connectedApps = integrations.filter((i) => i.connected).length;
  return {
    totalSeats,
    totalInactive,
    totalGhosts,
    monthlyWaste,
    yearlyWaste,
    connectedApps,
    totalApps: integrations.length,
  };
}
