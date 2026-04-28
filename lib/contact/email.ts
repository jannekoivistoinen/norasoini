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
  const brandPrimary = "#2F4F46";
  const brandCard = "#D8CDBB";
  const brandBg = "#E1D9CB";

  const rows: [string, string][] = [
    ["Etunimi", data.firstName],
    ["Sukunimi", data.lastName],
    ["Sähköposti", data.email],
    ["Puhelin", data.phone],
  ];

  const now = new Date().toLocaleString("fi-FI", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const text =
    `Heippa Nora,\nuusi viesti saapui nettisivujesi kautta. Aurinkoista päivää!\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nViesti:\n${data.message}\n\n${now}`;

  const html = `<!DOCTYPE html>
<html lang="fi" style="color-scheme:light">
<head>
  <meta charset="UTF-8">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
</head>
<body style="margin:0;padding:0;background:${brandBg};color-scheme:light">
  <div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:${brandBg};padding:40px 24px;color:#000000">
    <div style="max-width:560px;margin:0 auto;background:${brandCard};border-radius:8px;padding:32px 36px 28px">
      <p style="margin:0 0 4px;font-size:18px;font-weight:700;line-height:1.4;color:#000000">Heippa Nora,</p>
      <p style="margin:0 0 28px;font-size:16px;line-height:1.5;color:#000000">uusi viesti saapui nettisivujesi kautta. Aurinkoista päivää!</p>
      ${rows
        .map(
          ([k, v]) => `
      <div style="margin:0 0 20px">
        <p style="margin:0 0 2px;font-size:16px;font-weight:700;color:${brandPrimary}">${k}</p>
        <p style="margin:0;font-size:16px;line-height:1.5;color:#000000">${escape(v)}</p>
      </div>`,
        )
        .join("")}
      <div style="margin:0 0 32px">
        <p style="margin:0 0 2px;font-size:16px;font-weight:700;color:${brandPrimary}">Viesti</p>
        <p style="margin:0;font-size:16px;line-height:1.6;white-space:pre-wrap;color:#000000">${escape(data.message)}</p>
      </div>
      <p style="margin:0;font-size:12px;color:#00000099">${now}</p>
    </div>
  </div>
</body>
</html>`;
  return { text, html };
}
