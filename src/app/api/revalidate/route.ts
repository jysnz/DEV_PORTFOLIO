import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Webhook endpoint for on-demand revalidation.
 * Call this from Supabase Database Webhooks when data changes.
 * 
 * Expects a secret token in the `x-revalidate-token` header or
 * `secret` query parameter to prevent unauthorized revalidation.
 */
export async function POST(request: NextRequest) {
  const token =
    request.headers.get("x-revalidate-token") ??
    request.nextUrl.searchParams.get("secret");

  const expectedToken = process.env.REVALIDATION_SECRET;

  if (!expectedToken || token !== expectedToken) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }

  try {
    // Revalidate the home page — forces regeneration on next visit
    revalidatePath("/");

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
