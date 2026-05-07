"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { noraSoiniAboutPortrait } from "@/app/assets/images";
import { SITE_CONFIG, localePath } from "@/lib/constants";
import QuoteSlider from "@/components/sections/QuoteSlider";
import SituationsSlider from "@/components/sections/SituationsSlider";
import ServicesSlider from "@/components/sections/ServicesSlider";
import TerminalCTA from "@/components/sections/TerminalCTA";
import HomeAboutVideo from "@/components/sections/HomeAboutVideo";
import MarkdownText from "@/components/MarkdownText";
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

  const contactHref = localePath(locale, SITE_CONFIG.i18n.routes.contact[locale as keyof typeof SITE_CONFIG.i18n.routes.contact]);
  const aboutHref = localePath(locale, SITE_CONFIG.i18n.routes.about[locale as keyof typeof SITE_CONFIG.i18n.routes.about]);
  const terminalButtons: TerminalCTAButton[] = [
    { label: tFooter("ctaButton"), href: contactHref },
  ];

  return (
    <>
      {/* Hero */}
      <section className="md:text-center container">
        <motion.h1 {...heroAnim(0.05)}>{t("hero.heading")}</motion.h1>
        <motion.p
          {...heroAnim(0.18)}
          className="mt-4 max-w-[50ch] md:mx-auto  text-black/70 leading-relaxed"
        >
          {t("hero.description")}
        </motion.p>
        <motion.div
          {...heroAnim(0.3)}
          className="mt-6 md:mt-10 flex flex-wrap gap-4 md:justify-center"
        >
          <Button onClick={openVelloModal}>{t("hero.cta")}</Button>
          <Button variant="outline" asChild>
            <Link href={aboutHref}>{t("hero.secondaryCta")}</Link>
          </Button>
        </motion.div>
        <ul className="flex flex-col sm:flex-row gap-2 sm:gap-8 md:items-center md:justify-center mt-8 sm:mt-24 md:mt-36 mb-10 text-black/70">
          {[t("hero.trust1"), t("hero.trust2"), t("hero.trust3")].map(
            (signal, i) => (
              <motion.li
                key={i}
                {...heroAnim(0.42 + i * 0.1)}
                className="flex items-center gap-2 text-md"
              >
                <span className="inline-block w-2 h-2 rotate-45 border border-black/40 flex-shrink-0" />
                {signal}
              </motion.li>
            ),
          )}
        </ul>
        <FadeIn>
          <HomeAboutVideo />
        </FadeIn>
      </section>

      {/* Video */}

      {/* Services */}
      <FadeIn>
        <ServicesSlider />
      </FadeIn>

      {/* Quote Slider */}
      <FadeIn>
        <QuoteSlider />
      </FadeIn>

      {/* About */}
      <FadeIn>
        <section className="container py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: "706/935" }}
            >
              <Image
                src={noraSoiniAboutPortrait}
                alt="Nora Soini"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-col justify-between h-full">
              <div className="mb-16">
                <blockquote className="font-heading italic text-xl md:text-2xl text-black/80 mb-2 md:mb-3 md:text-balance max-w-[50ch]">
                  {t("about.quote")}
                </blockquote>
                <p className="text-base text-black/70">
                  {t("about.attribution")}
                </p>
              </div>
              <div>
                <h2 className="mb-4 md:mb-8">{t("about.heading")}</h2>
                <MarkdownText className=" text-black/70 mb-10 leading-relaxed space-y-4 max-w-[50ch]">
                  {t("about.description")}
                </MarkdownText>
                <Link
                  href={aboutHref}
                  className="group inline-flex items-center gap-2 text-base text-brand-primary hover:opacity-70 transition font-semibold"
                >
                  {t("about.cta")}
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <FontAwesomeIcon
                    icon={faArrowRight as any}
                    className="w-3 h-3 mt-1 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-[10px]"
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
      <FAQ />

      <TerminalCTA
        title={tFooter("cta")}
        paragraph={tFooter("ctaDescription")}
        buttons={terminalButtons}
      />
    </>
  );
}
