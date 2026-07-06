import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { PRODUCTS_CACHE_TAG } from "@/lib/whynotpr/config";

// Manual refresh: GET/POST /api/whynotpr/revalidate?token=...
// Set WHYNOTPR_REVALIDATE_TOKEN in the environment. Visiting this URL forces
// the portal to re-read the Google Sheet on the next request.
const TOKEN = process.env.WHYNOTPR_REVALIDATE_TOKEN ?? "refresh";

function handle(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (token !== TOKEN) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  // expire: 0 purges the cached sheet data immediately.
  revalidateTag(PRODUCTS_CACHE_TAG, { expire: 0 });
  return NextResponse.json({ ok: true, revalidated: PRODUCTS_CACHE_TAG });
}

export const GET = handle;
export const POST = handle;
