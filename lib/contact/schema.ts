export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  botcheck?: string;
};

export type ContactApiResult =
  | { ok: true }
  | { ok: false; error: string; code: "validation" | "server" | "config" };

export function validateContact(data: unknown): ContactFormData | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const required = ["firstName", "lastName", "email", "message"] as const;
  for (const key of required) {
    if (typeof d[key] !== "string" || !(d[key] as string).trim()) return null;
  }
  if (!/^\S+@\S+\.\S+$/.test(d.email as string)) return null;
  return {
    firstName: (d.firstName as string).trim().slice(0, 80),
    lastName: (d.lastName as string).trim().slice(0, 80),
    email: (d.email as string).trim().slice(0, 200),
    phone: typeof d.phone === "string" ? d.phone.trim().slice(0, 40) : "",
    message: (d.message as string).trim().slice(0, 5000),
    botcheck: typeof d.botcheck === "string" ? d.botcheck : undefined,
  };
}
