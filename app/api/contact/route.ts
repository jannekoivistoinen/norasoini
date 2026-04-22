import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact } from "@/lib/contact/schema";
import { buildContactEmail } from "@/lib/contact/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const {
    RESEND_API_KEY,
    CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL,
    CONTACT_FROM_NAME,
    CONTACT_SUBJECT,
  } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json(
      { ok: false, error: "Email service not configured", code: "config" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON", code: "validation" },
      { status: 400 },
    );
  }

  if (
    body &&
    typeof body === "object" &&
    (body as Record<string, unknown>).botcheck
  ) {
    return NextResponse.json({ ok: true });
  }

  const data = validateContact(body);
  if (!data) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid fields", code: "validation" },
      { status: 400 },
    );
  }

  const { text, html } = buildContactEmail(data);
  const from = CONTACT_FROM_NAME
    ? `${CONTACT_FROM_NAME} <${CONTACT_FROM_EMAIL}>`
    : CONTACT_FROM_EMAIL;

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from,
      to: CONTACT_TO_EMAIL,
      subject: CONTACT_SUBJECT || "New contact form submission",
      text,
      html,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message", code: "server" },
      { status: 502 },
    );
  }
}
