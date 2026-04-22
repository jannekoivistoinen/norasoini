import type { ContactFormData } from "./schema";

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!,
  );

export function buildContactEmail(data: ContactFormData) {
  const rows: [string, string][] = [
    ["Name", `${data.firstName} ${data.lastName}`],
    ["Email", data.email],
    ["Phone", data.phone],
  ];
  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMessage:\n${data.message}`;
  const html = `
    <table style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding-right:12px"><strong>${k}:</strong></td><td>${escape(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">
      <strong>Message:</strong><br>${escape(data.message)}
    </p>
  `;
  return { text, html };
}
