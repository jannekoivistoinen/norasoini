import { useTranslations } from "next-intl";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const Footer = () => {
  const t = useTranslations("component.footer");

  return (
    <footer>
      {/* Bottom bar */}
      <div className="bg-brand-primary border-t border-white/[0.05] px-6 py-16 md:py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 text-brand-footer-text/70 md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
              <p className="font-link text-lg md:text-xl font-medium text-white">
                {t("name")}
              </p>
              <Link
                href="https://www.instagram.com/norasoini"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors mt-1.5 md:mt-1"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.5"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </Link>
            </div>
            <p className="text-base text-center md:text-left">{t("tagline")}</p>
          </div>
          <div className="text-center md:text-right">
            <a
              href={`mailto:${SITE_CONFIG.company.contact.email}`}
              className="text-white hover:opacity-80 transition text-lg md:text-xl font-medium"
            >
              {SITE_CONFIG.company.contact.email}
            </a>
            <p className="text-xs md:text-base mt-1.5">
              {t("copyrightPrefix")}
              <a
                href="https://damngood.fi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body hover:text-white transition-colors"
              >
                {t("siteCredit")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
