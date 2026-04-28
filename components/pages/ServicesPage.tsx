"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { serviceImages } from "@/app/assets/images";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import ReactMarkdown from "react-markdown";
import { SITE_CONFIG } from "@/lib/constants";
import PillarsSection from "@/components/sections/PillarsSection";
import VisitFlowSection from "@/components/sections/VisitFlowSection";
import QuoteSlider from "@/components/sections/QuoteSlider";
import PageHero from "@/components/sections/PageHero";
import TerminalCTA from "@/components/sections/TerminalCTA";
import { Button } from "@/components/ui/button";
import ContactTestimonialsSlider from "@/components/sections/ContactTestimonialsSlider";
import FadeIn from "@/components/ui/FadeIn";
import { openVelloModal } from "@/lib/openVelloModal";

const FAQ = dynamic(() =>
  import("@/components/FAQ").then((module) => module.FAQ),
);

type TerminalCTAButton = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type ServiceItem = {
  title: string;
  body: string;
  cta: string;
};

const cardEase = [0.25, 0.1, 0.25, 1] as const;

function serviceCardPart(cardIndex: number, stepDelay: number, duration = 0.7) {
  return {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration,
      delay: cardIndex * 0.08 + stepDelay,
      ease: cardEase,
    },
  };
}

/** Text blocks: opacity only so they don’t compound y with the panel shell motion. */
function serviceCardTextReveal(cardIndex: number, stepDelay: number) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: 0.55,
      delay: cardIndex * 0.08 + stepDelay,
      ease: cardEase,
    },
  };
}

export default function ServicesPage() {
  const t = useTranslations("page.services");
  const tFooter = useTranslations("component.footer");
  const locale = useLocale();

  const contactHref = `/${locale}/${SITE_CONFIG.i18n.routes.contact[locale as keyof typeof SITE_CONFIG.i18n.routes.contact]}`;
  const pricingHref = `/${locale}/${SITE_CONFIG.i18n.routes.pricing[locale as keyof typeof SITE_CONFIG.i18n.routes.pricing]}`;
  const items = t.raw("items") as ServiceItem[];
  const cardQuote = t("cardQuote");
  const terminalButtons: TerminalCTAButton[] = [
    { label: tFooter("ctaButton"), href: contactHref },
  ];

  return (
    <>
      <PageHero
        heading={t("hero.heading")}
        ingress={t("hero.ingress")}
        ctaLabel={t("hero.cta")}
        headingClassName="max-w-[20ch] md:mx-auto text-balance"
        ctaHref={contactHref}
        onCtaClick={openVelloModal}
      />

      <section className="container pb-16 md:pb-24">
        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden"
            >
              <motion.div
                className="relative aspect-square w-full md:aspect-auto md:h-full md:min-h-0"
                {...serviceCardPart(i, 0)}
              >
                <Image
                  src={serviceImages[i % serviceImages.length]}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                className="bg-brand-card pl-8 pr-6 py-8 md:px-16 md:py-20 flex flex-col justify-center"
                {...serviceCardPart(i, 0)}
              >
                <motion.h2 className="mb-6" {...serviceCardTextReveal(i, 0.18)}>
                  {item.title}
                </motion.h2>
                <motion.div
                  className="prose prose-base text-black/70 mb-8 [&_h3]:font-normal [&_strong]:text-black/80 [&_strong]:font-medium [&_li::marker]:text-black/70 [&_li]:leading-snug"
                  {...serviceCardTextReveal(i, 0.3)}
                >
                  <ReactMarkdown>{item.body}</ReactMarkdown>
                </motion.div>
                <motion.div
                  className="self-start mb-8"
                  {...serviceCardTextReveal(i, 0.42)}
                >
                  <Button onClick={openVelloModal}>{item.cta}</Button>
                </motion.div>
                <motion.p
                  className="text-black/50 text-sm"
                  {...serviceCardTextReveal(i, 0.54)}
                >
                  {cardQuote}
                </motion.p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      <FadeIn>
        <VisitFlowSection />
      </FadeIn>

      {/* Testimonials */}
      <ContactTestimonialsSlider showHeading />

      <FAQ />

      <TerminalCTA
        title={t("terminalCta.title")}
        paragraph={t("terminalCta.paragraph")}
        buttons={terminalButtons}
      />
    </>
  );
}
