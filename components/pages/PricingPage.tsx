"use client";

import ReactMarkdown from "react-markdown";
import { useTranslations } from "next-intl";
import PageHero from "@/components/sections/PageHero";
import FadeIn from "@/components/ui/FadeIn";

export default function PricingPage() {
  const t = useTranslations("page.pricing");

  return (
    <>
      <PageHero heading={t("hero.heading")} ingress={t("hero.ingress")} />
      <FadeIn>
        <section className="container py-10 pb-16 md:pb-24 max-w-2xl">
          <div className="text-sm md:text-base text-black/80 leading-relaxed [&_p]:mb-4 [&_strong]:text-black">
            <ReactMarkdown>{t("body")}</ReactMarkdown>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
