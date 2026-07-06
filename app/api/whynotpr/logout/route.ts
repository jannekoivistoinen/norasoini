import { NextResponse } from "next/server";
import { destroySession } from "@/lib/whynotpr/auth";

export async function POST() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
