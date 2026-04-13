import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Instrument_Serif, Kaisei_Decol } from "next/font/google";
import { SITE_CONFIG } from "@/lib/constants";
import { Metadata } from "next";
import "../globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const kaiseiDecol = Kaisei_Decol({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-kaisei-decol",
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_CONFIG.company.name,
  description: SITE_CONFIG.company.description,
  alternates: { canonical: SITE_CONFIG.company.url },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function isValidLocale(locale: string): locale is (typeof routing.locales)[number] {
  return routing.locales.includes(locale as (typeof routing.locales)[number]);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  setRequestLocale(locale);

  let messages;
  try {
    messages = await getMessages();
  } catch {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${instrumentSerif.variable} ${kaiseiDecol.variable}`}
    >
      <body className="flex flex-col min-h-screen bg-brand-bg font-body">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navigation />
          <main className="flex-grow overflow-x-hidden">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
