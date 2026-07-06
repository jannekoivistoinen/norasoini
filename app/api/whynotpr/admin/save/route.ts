import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { isAdmin } from "@/lib/whynotpr/auth";
import { setProductOverride } from "@/lib/whynotpr/overrides";
import { PRODUCTS_CACHE_TAG } from "@/lib/whynotpr/config";

// POST { id, order: string[], hidden: string[] }
// order  = visible filenames in desired order (first = main photo)
// hidden = filenames to hide from this product
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let id = "";
  let order: string[] = [];
  let hidden: string[] = [];
  try {
    const body = await req.json();
    id = typeof body?.id === "string" ? body.id : "";
    order = Array.isArray(body?.order) ? body.order.filter((x: unknown) => typeof x === "string") : [];
    hidden = Array.isArray(body?.hidden) ? body.hidden.filter((x: unknown) => typeof x === "string") : [];
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  await setProductOverride(id, { order, hidden });
  // Portal reads overrides live, but purge the sheet cache tag so any cached
  // render is refreshed too.
  revalidateTag(PRODUCTS_CACHE_TAG, { expire: 0 });

  return NextResponse.json({ ok: true });
}
