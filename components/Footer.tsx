import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { SITE_CONFIG } from "@/lib/constants";

const Footer = () => {
  const t = useTranslations("component.footer");
  const locale = useLocale();
  const contactHref = `/${locale}/${SITE_CONFIG.i18n.routes.contact[locale as keyof typeof SITE_CONFIG.i18n.routes.contact]}`;

  return (
    <footer>
      {/* CTA Section */}
      <div className="bg-brand-primary text-brand-footer-text py-20 px-6 text-center">
        <h2 className="font-heading italic text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 max-w-2xl mx-auto">
          {t("cta")}
        </h2>
        <p className="text-brand-footer-text/80 text-sm md:text-base max-w-md mx-auto mb-8 font-body">
          {t("ctaDescription")}
        </p>
        <Link
          href={contactHref}
          className="inline-block border border-brand-footer-text text-brand-footer-text text-sm font-body px-6 py-3 rounded-full hover:bg-brand-footer-text hover:text-brand-primary transition"
        >
          {t("ctaButton")}
        </Link>
      </div>

      {/* Bottom bar */}
      <div className="bg-brand-primary border-t border-brand-footer-text/20 px-6 py-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-brand-footer-text/70 text-xs font-body">
          <div>
            <p className="text-brand-footer-text font-body text-sm font-medium">{t("name")}</p>
            <p className="mt-0.5">{t("tagline")}</p>
          </div>
          <div className="text-right">
            <a
              href={`mailto:${SITE_CONFIG.company.contact.email}`}
              className="text-brand-footer-text hover:opacity-80 transition text-sm"
            >
              {SITE_CONFIG.company.contact.email}
            </a>
            <p className="mt-1">{t("copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
