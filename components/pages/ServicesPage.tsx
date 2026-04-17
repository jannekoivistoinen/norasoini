"use client";

import Image from "next/image";
import Link from "next/link";
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
        ctaHref={contactHref}
        onCtaClick={openVelloModal}
      />

      <section className="container pb-24">
        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative">
                <Image
                  src={`/images/service-${i + 1}.jpg`}
                  alt={item.title}
                  fill
                  className="object-cover relative"
                />
              </div>
              <div className="bg-brand-card px-10 py-16 md:px-16 md:py-20 flex flex-col justify-center">
                <h2 className="font-heading italic text-3xl lg:text-4xl mb-6">
                  {item.title}
                </h2>
                <div className="prose prose-sm text-black/70 mb-8 [&_strong]:text-black/80 [&_strong]:font-medium [&_li::marker]:text-black/70">
                  <ReactMarkdown>{item.body}</ReactMarkdown>
                </div>
                <Button
                  type="button"
                  onClick={openVelloModal}
                  className="self-start rounded-full px-7 py-4 text-sm mb-8 h-auto"
                >
                  {item.cta}
                </Button>
                <p className="text-black/50 text-sm">{cardQuote}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <VisitFlowSection />

      <FAQ />

      <TerminalCTA
        title={t("terminalCta.title")}
        paragraph={t("terminalCta.paragraph")}
        buttons={terminalButtons}
        onPrimaryClick={openVelloModal}
      />
    </>
  );
}
