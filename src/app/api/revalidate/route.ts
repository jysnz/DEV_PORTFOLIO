import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Track last invalidation time in module scope (persists across requests on same instance)
let lastInvalidation: { timestamp: string; table: string; event: string } | null = null;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  // Verify the secret to prevent unauthorized cache busting
  const secret = request.headers.get("x-revalidation-secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Invalidate the page cache (this also re-fetches all data on next request)
  revalidatePath("/", "page");

  lastInvalidation = {
    timestamp: new Date().toISOString(),
    table: body?.table ?? "unknown",
    event: body?.type ?? "unknown",
  };

  console.log(
    `\n🔴 CACHE INVALIDATED | ${lastInvalidation.event} on "${lastInvalidation.table}" | ${lastInvalidation.timestamp}`
  );

  return NextResponse.json({
    revalidated: true,
    ...lastInvalidation,
  });
}

// GET endpoint to check cache status
export async function GET(request: NextRequest) {
  const secret = request.headers.get("x-revalidation-secret") || request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    status: lastInvalidation ? "invalidated" : "fresh_deploy",
    lastInvalidation,
  });
}
