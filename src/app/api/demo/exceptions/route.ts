import { NextResponse } from "next/server";
import { exceptions } from "@/lib/demo-data";

/**
 * Read-only demo endpoint. It returns seeded fixtures only.
 * This route intentionally has no mutation or PayPal execution behavior.
 */
export async function GET() {
  return NextResponse.json({
    mode: "demo",
    liveProviderConnected: false,
    externalActionsEnabled: false,
    records: exceptions,
    notice: "Illustrative fixture data only. No live PayPal state is queried."
  }, {
    headers: { "Cache-Control": "no-store" }
  });
}