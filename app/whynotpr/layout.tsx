import type { Metadata } from "next";
import { Bodoni_Moda, Inter, Kaisei_Decol } from "next/font/google";
import { AGENCY } from "@/lib/whynotpr/config";
import "./whynotpr.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--wnp-font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--wnp-font-sans",
  display: "swap",
});

const link = Kaisei_Decol({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--wnp-font-link",
  display: "swap",
});

export const metadata: Metadata = {
  title: AGENCY.name,
  description: AGENCY.tagline,
  robots: { index: false, follow: false },
};

export default function WhyNotPrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fi"
      className={`${display.variable} ${sans.variable} ${link.variable}`}
    >
      <body className="wnp">{children}</body>
    </html>
  );
}
