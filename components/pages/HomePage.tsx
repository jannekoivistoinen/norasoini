import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { SITE_CONFIG } from "@/lib/constants";
import PillarsSection from "@/components/sections/PillarsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FaqSection from "@/components/sections/FaqSection";
import QuoteSlider from "@/components/sections/QuoteSlider";
import ServicesSlider from "@/components/sections/ServicesSlider";

export default function HomePage() {
  const t = useTranslations("page.homepage");
  const locale = useLocale();

  const contactHref = `/${locale}/${SITE_CONFIG.i18n.routes.contact[locale as keyof typeof SITE_CONFIG.i18n.routes.contact]}`;
  const aboutHref = `/${locale}/${SITE_CONFIG.i18n.routes.about[locale as keyof typeof SITE_CONFIG.i18n.routes.about]}`;

  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-[60px] lg:px-[100px] pt-16 pb-20 md:pt-24 md:pb-28 max-w-[1440px] mx-auto">
        <div className="max-w-2xl">
          <h1 className="font-heading italic text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            {t("hero.heading")}
          </h1>
          <p className="text-black/70 text-base md:text-lg font-body max-w-md mb-8">
            {t("hero.description")}
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <Link
              href={contactHref}
              className="bg-brand-primary text-white text-sm font-body px-7 py-4 rounded-full hover:opacity-90 transition"
            >
              {t("hero.cta")}
            </Link>
            <Link
              href={aboutHref}
              className="border border-black/30 text-black text-sm font-body px-7 py-4 rounded-full hover:border-black transition"
            >
              {t("hero.secondaryCta")}
            </Link>
          </div>
          <ul className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            {[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")].map((signal, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-body text-black/60">
                <span className="inline-block w-2 h-2 rotate-45 border border-black/40 flex-shrink-0" />
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quote Slider */}
      <QuoteSlider />

      {/* Situations / Services Slider */}
      <ServicesSlider />

      {/* About */}
      <section className="px-6 md:px-[60px] lg:px-[100px] py-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: video placeholder */}
          <div
            className="relative w-full bg-[#d8d8d8] rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ aspectRatio: "709/921" }}
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <FontAwesomeIcon icon={faCirclePlay as any} className="text-white w-10 h-10" />
            </div>
          </div>

          {/* Right: testimonial + content */}
          <div className="flex flex-col justify-between h-full">
            {/* Testimonial */}
            <div className="mb-16">
              <blockquote className="font-heading italic text-lg md:text-xl text-black/80 mb-3 leading-snug">
                {t("about.quote")}
              </blockquote>
              <p className="text-sm font-body text-black/40">{t("about.attribution")}</p>
            </div>

            {/* Content */}
            <div>
              <h2 className="font-heading italic text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
                {t("about.heading")}
              </h2>
              <p className="font-body text-sm md:text-base text-black/70 mb-4 leading-relaxed">
                {t("about.description")}
              </p>
              <p className="font-body text-sm md:text-base text-black/70 mb-4 leading-relaxed">
                {t("about.description2")}
              </p>
              <p className="font-body text-sm md:text-base text-black/70 mb-10 leading-relaxed">
                {t("about.description3")}
              </p>
              <Link
                href={aboutHref}
                className="inline-flex items-center gap-2 text-sm font-body text-brand-primary hover:opacity-70 transition"
              >
                {t("about.cta")}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <FontAwesomeIcon icon={faArrowRight as any} className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <PillarsSection />

      {/* Process */}
      <ProcessSection />

      {/* FAQ */}
      <FaqSection />
    </>
  );
}
