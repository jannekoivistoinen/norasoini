import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import NoraSoinImage from "@/app/assets/NoraSoini.png";
import { useTranslations, useLocale } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { SITE_CONFIG } from "@/lib/constants";
import PillarsSection from "@/components/sections/PillarsSection";
import VisitFlowSection from "@/components/sections/VisitFlowSection";
import QuoteSlider from "@/components/sections/QuoteSlider";
import SituationsSlider from "@/components/sections/SituationsSlider";
import ServicesSlider from "@/components/sections/ServicesSlider";
import TerminalCTA from "@/components/sections/TerminalCTA";
import HomeAboutVideo from "@/components/sections/HomeAboutVideo";

const FAQ = dynamic(() =>
  import("@/components/FAQ").then((module) => module.FAQ),
);

type TerminalCTAButton = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export default function HomePage() {
  const t = useTranslations("page.homepage");
  const tFooter = useTranslations("component.footer");
  const locale = useLocale();

  const contactHref = `/${locale}/${SITE_CONFIG.i18n.routes.contact[locale as keyof typeof SITE_CONFIG.i18n.routes.contact]}`;
  const aboutHref = `/${locale}/${SITE_CONFIG.i18n.routes.about[locale as keyof typeof SITE_CONFIG.i18n.routes.about]}`;
  const pricingHref = `/${locale}/${SITE_CONFIG.i18n.routes.pricing[locale as keyof typeof SITE_CONFIG.i18n.routes.pricing]}`;
  const terminalButtons: TerminalCTAButton[] = [
    { label: tFooter("ctaButton"), href: contactHref },
    {
      label: tFooter("ctaButtonSecondary"),
      href: pricingHref,
      variant: "secondary",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="container pt-0 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center max-w-6xl mx-auto">
          <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-tighter mb-6">
              {t("hero.heading")}
            </h1>
            <p className="text-black/70 text-base md:text-lg max-w-md mb-8 mx-auto md:mx-0">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap gap-4 mb-10 justify-center md:justify-start">
              <Link
                href={contactHref}
                className="bg-brand-primary text-white text-sm px-7 py-4 rounded-full hover:opacity-90 transition"
              >
                {t("hero.cta")}
              </Link>
              <Link
                href={aboutHref}
                className="border border-black/30 text-black text-sm px-7 py-4 rounded-full hover:border-black transition"
              >
                {t("hero.secondaryCta")}
              </Link>
            </div>
            <ul className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center md:items-start">
              {[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")].map(
                (signal, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-black/60"
                  >
                    <span className="inline-block w-2 h-2 rotate-45 border border-black/40 flex-shrink-0" />
                    {signal}
                  </li>
                ),
              )}
            </ul>
          </div>
          <Image
            src={NoraSoinImage}
            alt=""
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Quote Slider */}
      <QuoteSlider />

      {/* Situations */}
      <SituationsSlider />

      {/* Services */}
      <ServicesSlider />

      {/* About */}
      <section className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: video */}
          <HomeAboutVideo />

          {/* Right: testimonial + content */}
          <div className="flex flex-col justify-between h-full">
            {/* Testimonial */}
            <div className="mb-16">
              <blockquote className="font-heading italic text-lg md:text-xl text-black/80 mb-3 leading-snug">
                {t("about.quote")}
              </blockquote>
              <p className="text-sm text-black/40">{t("about.attribution")}</p>
            </div>

            {/* Content */}
            <div>
              <h2 className="font-heading italic leading-tight mb-8">
                {t("about.heading")}
              </h2>
              <p className="text-sm md:text-base text-black/70 mb-4 leading-relaxed">
                {t("about.description")}
              </p>
              <p className="text-sm md:text-base text-black/70 mb-4 leading-relaxed">
                {t("about.description2")}
              </p>
              <p className="text-sm md:text-base text-black/70 mb-10 leading-relaxed">
                {t("about.description3")}
              </p>
              <Link
                href={aboutHref}
                className="inline-flex items-center gap-2 text-sm text-brand-primary hover:opacity-70 transition"
              >
                {t("about.cta")}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <FontAwesomeIcon
                  icon={faArrowRight as any}
                  className="w-3 h-3"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <PillarsSection />

      {/* Process */}
      <VisitFlowSection />

      {/* FAQ */}
      <FAQ />

      <TerminalCTA
        title={tFooter("cta")}
        paragraph={tFooter("ctaDescription")}
        buttons={terminalButtons}
      />
    </>
  );
}
