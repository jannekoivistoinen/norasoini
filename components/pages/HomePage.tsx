"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import NoraSoinImage from "@/app/assets/NoraSoini.png";
import { useTranslations, useLocale } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { SITE_CONFIG } from "@/lib/constants";
import QuoteSlider from "@/components/sections/QuoteSlider";
import SituationsSlider from "@/components/sections/SituationsSlider";
import ServicesSlider from "@/components/sections/ServicesSlider";
import TerminalCTA from "@/components/sections/TerminalCTA";
import MarkdownText from "@/components/MarkdownText";
import HomeAboutVideo from "@/components/sections/HomeAboutVideo";
import FadeIn from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { openVelloModal } from "@/lib/openVelloModal";

const heroAnim = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

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
  ];

  return (
    <>
      {/* Hero */}
      <section className="container pt-0 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch max-w-6xl mx-auto">
          <div className="flex flex-col max-w-xl mx-auto md:mx-0 text-center md:text-left">
            <div className="my-auto">
              <motion.h1
                {...heroAnim(0.05)}
                className="font-heading text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight"
              >
                {t("hero.heading")}
              </motion.h1>
              <motion.p
                {...heroAnim(0.18)}
                className="text-black/70 text-base md:text-lg max-w-md mb-8 mx-auto md:mx-0"
              >
                {t("hero.description")}
              </motion.p>
              <motion.div
                {...heroAnim(0.3)}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
              >
                <Button onClick={openVelloModal}>{t("hero.cta")}</Button>
                <Button variant="outline" asChild>
                  <Link href={aboutHref}>{t("hero.secondaryCta")}</Link>
                </Button>
              </motion.div>
            </div>
            <motion.ul
              {...heroAnim(0.42)}
              className="flex flex-col sm:flex-row gap-1 sm:gap-8 items-center md:items-start mb-8 mt-10 text-black/70"
            >
              {[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")].map(
                (signal, i) => (
                  <li key={i} className="flex items-center gap-2 text-md">
                    <span className="inline-block w-2 h-2 rotate-45 border border-black/40 flex-shrink-0" />
                    {signal}
                  </li>
                ),
              )}
            </motion.ul>
          </div>
          <motion.div {...heroAnim(0.2)} className="pl-12">
            <Image
              src={NoraSoinImage}
              alt=""
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Quote Slider */}
      <FadeIn>
        <QuoteSlider />
      </FadeIn>

      {/* Services */}
      <FadeIn>
        <ServicesSlider />
      </FadeIn>

      {/* About */}
      <FadeIn>
        <section className="container py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Left: video */}
            <HomeAboutVideo />

            {/* Right: testimonial + content */}
            <div className="flex flex-col justify-between h-full">
              {/* Testimonial */}
              <div className="mb-16">
                <blockquote className="font-heading italic text-lg md:text-2xl text-black/80 mb-3 leading-snug text-balance">
                  {t("about.quote")}
                </blockquote>
                <p className="text-base text-black/70">
                  {t("about.attribution")}
                </p>
              </div>

              {/* Content */}
              <div>
                <h2 className="font-heading italic leading-tighter mb-8">
                  {t("about.heading")}
                </h2>
                <MarkdownText className="text-sm md:text-base text-black/70 mb-10 leading-relaxed space-y-4">
                  {t("about.description")}
                </MarkdownText>
                <Link
                  href={aboutHref}
                  className="inline-flex items-center gap-2 text-base text-brand-primary hover:opacity-70 transition"
                >
                  {t("about.cta")}
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <FontAwesomeIcon
                    icon={faArrowRight as any}
                    className="w-3 h-3 mt-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Situations */}
      <FadeIn>
        <SituationsSlider />
      </FadeIn>

      {/* FAQ */}
      <FadeIn>
        <FAQ />
      </FadeIn>

      <TerminalCTA
        title={tFooter("cta")}
        paragraph={tFooter("ctaDescription")}
        buttons={terminalButtons}
        onPrimaryClick={openVelloModal}
      />
    </>
  );
}
