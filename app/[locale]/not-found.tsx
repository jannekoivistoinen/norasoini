import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import TerminalCTA from "@/components/sections/TerminalCTA";
import { localePath, SITE_CONFIG } from "@/lib/constants";

export default function NotFound() {
  const locale = useLocale() as "fi" | "en";
  const t = useTranslations("component.notFound");
  const tFooter = useTranslations("component.footer");

  return (
    <>
      <div className="http-error-page flex-grow flex flex-col items-center justify-center py-64 px-6 text-center">
        <h1 className="mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-2">{t("title")}</p>
        <p className="text-gray-500 mb-10 max-w-md">{t("description")}</p>
        <Button asChild>
          <Link href={locale === "fi" ? "/" : `/${locale}`}>
            {t("backHome")}
          </Link>
        </Button>
      </div>
      <TerminalCTA
        title={tFooter("cta")}
        paragraph={tFooter("ctaDescription")}
        buttons={[
          {
            label: tFooter("ctaButton"),
            href: localePath(locale, SITE_CONFIG.i18n.routes.contact[locale]),
          },
        ]}
      />
    </>
  );
}
