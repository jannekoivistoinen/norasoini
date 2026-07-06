import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/whynotpr/auth";

export async function POST(req: NextRequest) {
  let password = "";
  try {
    const body = await req.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ ok: true });
}
