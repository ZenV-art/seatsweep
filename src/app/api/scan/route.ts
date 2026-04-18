import { NextResponse } from "next/server";
import { integrations, totals } from "@/lib/seed";

export async function POST() {
  const t = totals();
  return NextResponse.json({
    ok: true,
    ranAt: new Date().toISOString(),
    summary: {
      totalSeats: t.totalSeats,
      ghostSeats: t.totalGhosts,
      inactiveSeats: t.totalInactive,
      monthlyWaste: t.monthlyWaste,
      yearlyWaste: t.yearlyWaste,
    },
    byIntegration: integrations.map((i) => ({
      key: i.key,
      name: i.name,
      seats: i.seats,
      ghostSeats: i.ghostSeats,
      inactiveSeats: i.inactiveSeats,
      monthlyWaste: i.ghostSeats * i.pricePerSeat,
    })),
  });
}
