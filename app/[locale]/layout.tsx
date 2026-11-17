import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VelloModal from "@/components/VelloModal";
import MotionProvider from "@/components/MotionProvider";
import { getTranslations } from "next-intl/server";
import { COMPANY_METADATA, SITE_CONFIG } from "@/lib/constants";
import { Metadata } from "next";
import { fontHtmlClassName } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY_METADATA.url),
  title: SITE_CONFIG.company.name,
  description: SITE_CONFIG.company.description,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function isValidLocale(
  locale: string,
): locale is (typeof routing.locales)[number] {
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

  const tA11y = await getTranslations("component.a11y");

  return (
    <html lang={locale} className={fontHtmlClassName}>
      <body className="flex flex-col min-h-screen bg-brand-bg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-brand-primary"
        >
          {tA11y("skipToContent")}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MotionProvider>
            <Navigation />
            <VelloModal />
            <main id="main" className="flex-grow overflow-x-clip">
              {children}
            </main>
            <Footer />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
