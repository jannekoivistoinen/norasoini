import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { SITE_CONFIG } from "@/lib/constants";
import PillarsSection from "@/components/sections/PillarsSection";
import VisitFlowSection from "@/components/sections/VisitFlowSection";
import QuoteSlider from "@/components/sections/QuoteSlider";
import PageHero from "@/components/sections/PageHero";
import TerminalCTA from "@/components/sections/TerminalCTA";
import AboutHeroVideo from "@/components/sections/AboutHeroVideo";

const FAQ = dynamic(
  () => import("@/components/FAQ").then((module) => module.FAQ),
);

type TerminalCTAButton = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export default function AboutPage() {
  const t = useTranslations("page.about");
  const tFooter = useTranslations("component.footer");
  const locale = useLocale();

  const contactHref = `/${locale}/${SITE_CONFIG.i18n.routes.contact[locale as keyof typeof SITE_CONFIG.i18n.routes.contact]}`;
  const pricingHref = `/${locale}/${SITE_CONFIG.i18n.routes.pricing[locale as keyof typeof SITE_CONFIG.i18n.routes.pricing]}`;
  const terminalButtons: TerminalCTAButton[] = [
    { label: tFooter("ctaButton"), href: contactHref },
  ];
  const paragraphsBeforeBento = t.raw("intro.paragraphsBeforeBento") as string[];
  const afterBento = t.raw("intro.afterBento") as { ingress: string; paragraphs: string[] };
  return (
    <>
      {/* Hero */}
      <PageHero heading={t("hero.heading")} ingress={t("hero.ingress")} />

      <AboutHeroVideo />

      {/* Bio (before bento) */}
      <section className="container py-20">
        <div className="max-w-[882px] mx-auto">
          <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl leading-snug text-black/85 mb-12 md:ml-[15%] md:max-w-[70%]">
            {t("intro.ingressBelowPhoto")}
          </p>
          <div className="md:ml-[15%] md:max-w-[70%]">
            {paragraphsBeforeBento.map((para, i) => (
              <p key={i} className="text-sm md:text-base text-black/70 mb-5 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Bento photo grid */}
      <section className="container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "706/935" }}>
            <Image
              src="/images/about-left.jpg"
              alt="Nora Soini"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="relative w-full rounded-2xl overflow-hidden flex-1" style={{ aspectRatio: "706/458" }}>
              <Image
                src="/images/about-right-top.jpg"
                alt="Nora Soini"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden flex-1" style={{ aspectRatio: "706/458" }}>
              <Image
                src="/images/about-right-bottom.jpg"
                alt="Nora Soini"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bio (after bento) */}
      <section className="container pb-20">
        <div className="max-w-[882px] mx-auto">
          <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl leading-snug text-black/85 mb-8 md:ml-[15%] md:max-w-[70%]">
            {afterBento.ingress}
          </p>
          <div className="md:ml-[15%] md:max-w-[70%]">
            {afterBento.paragraphs.map((para, i) => (
              <p key={i} className="text-sm md:text-base text-black/70 mb-5 leading-relaxed">
                {para}
              </p>
            ))}
            <div className="mt-10">
              <Link
                href={contactHref}
                className="bg-brand-primary text-white text-sm px-6 py-3 rounded-full hover:opacity-90 transition"
              >
                {t("hero.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Slider */}
      <QuoteSlider />

      {/* Pillars */}
      <PillarsSection />

      {/* Visit Flow */}
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
