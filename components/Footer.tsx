import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const Footer = () => {
  const t = useTranslations("component.footer");
  const locale = useLocale();

  return (
    <footer>
      {/* Bottom bar */}
      <div className="bg-brand-primary border-t border-white/[0.05] px-6 py-12">
        <div className="container flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-brand-footer-text/70 text-xs">
          <div>
            <p className="font-link text-xl font-medium text-white mb-1.5">
              {t("name")}
            </p>
            <p className="text-base">{t("tagline")}</p>
          </div>
          <div className="text-right">
            <a
              href={`mailto:${SITE_CONFIG.company.contact.email}`}
              className="text-white hover:opacity-80 transition text-xl font-medium"
            >
              {SITE_CONFIG.company.contact.email}
            </a>
            <p className="text-base mt-1.5">{t("copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
