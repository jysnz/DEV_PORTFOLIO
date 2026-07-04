import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  // Verify the secret to prevent unauthorized cache busting
  const secret = request.headers.get("x-revalidation-secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Invalidate the page cache (this also re-fetches all data on next request)
  revalidatePath("/", "page");

  console.log(
    `🔄 Cache invalidated at ${new Date().toISOString()}`,
    body ? `| Table: ${body.table} | Event: ${body.type}` : ""
  );

  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
    table: body?.table ?? "unknown",
    event: body?.type ?? "unknown",
  });
}
