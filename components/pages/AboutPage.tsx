import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { SITE_CONFIG } from "@/lib/constants";
import PillarsSection from "@/components/sections/PillarsSection";
import QuoteSlider from "@/components/sections/QuoteSlider";
import PageHero from "@/components/sections/PageHero";
import TerminalCTA from "@/components/sections/TerminalCTA";
import FadeIn from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { AnimatedSignature } from "@/components/AnimatedSignature";
import {
  noraStorySignatureColor,
  noraStorySignaturePaths,
  noraStorySignatureViewBox,
} from "@/components/noraStorySignaturePath";

const FAQ = dynamic(() =>
  import("@/components/FAQ").then((module) => module.FAQ),
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
  const paragraphsBeforeBento = t.raw(
    "intro.paragraphsBeforeBento",
  ) as string[];
  const afterBento = t.raw("intro.afterBento") as {
    ingress: string;
    paragraphs: string[];
  };
  const credentials = t.raw("credentials") as {
    titles: string[];
    teachersHeading: string;
    teachers: { name: string; url: string }[];
  };
  const bento = t.raw("bento") as {
    imageAlt1: string;
    imageAlt2: string;
    imageAlt3: string;
  };
  return (
    <>
      {/* Hero */}
      <PageHero
        heading={t("hero.heading")}
        ingress={t("hero.ingress")}
        ingressClassName="max-w-[50ch] mx-auto"
      />

      {/* Bento photo grid */}
      <div className="container pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FadeIn delay={0} className="min-w-0">
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: "706/935" }}
            >
              <Image
                src="/images/about-left.jpg"
                alt={bento.imageAlt1}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </FadeIn>
          <div className="flex flex-col gap-3 min-w-0">
            <FadeIn delay={0.1}>
              <div
                className="relative w-full rounded-2xl overflow-hidden flex-1"
                style={{ aspectRatio: "706/458" }}
              >
                <Image
                  src="/images/about-right-top.jpg"
                  alt={bento.imageAlt2}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div
                className="relative w-full rounded-2xl overflow-hidden flex-1"
                style={{ aspectRatio: "706/458" }}
              >
                <Image
                  src="/images/about-right-bottom.jpg"
                  alt={bento.imageAlt3}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Bio (before bento) */}
      <FadeIn>
        <section className="container py-12 md:py-20">
          <div className="max-w-[882px] mx-auto">
            <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl leading-snug text-black/85 mb-8 md:mb-12 max-w-full md:max-w-[70%] mx-auto text-balance">
              {t("intro.ingressBelowPhoto")}
            </p>
            <div className="md:ml-[15%] md:max-w-[70%]">
              {paragraphsBeforeBento.map((para, i) => (
                <p key={i} className=" text-black/70 mb-5 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Bio (after bento) */}
      <FadeIn>
        <div className="container pb-12 md:pb-20">
          <div className="max-w-[882px] mx-auto">
            <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl leading-snug text-black/85 mb-8 max-w-full md:max-w-[70%] mx-auto text-balance">
              {afterBento.ingress}
            </p>
            <div className="md:ml-[15%] md:max-w-[70%]">
              {afterBento.paragraphs.map((para, i) => (
                <p key={i} className=" text-black/70 mb-5 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Credentials & teachers */}
      <FadeIn>
        <div className="container pb-12 md:pb-20">
          <div className="max-w-[882px] mx-auto">
            <div className="md:ml-[15%] md:max-w-[70%]">
              <AnimatedSignature
                paths={[...noraStorySignaturePaths]}
                viewBox={noraStorySignatureViewBox}
                width={280}
                height={59}
                strokeWidth={2.25}
                strokeColor={noraStorySignatureColor}
                fillColor="none"
                duration={0.1}
                delay={0}
                stagger={0.04}
                className="flex justify-start mb-1 -ml-4 md:-ml-12 opacity-80"
              />
              {credentials.titles.map((title, i) => (
                <p key={i} className=" text-black/70 leading-relaxed">
                  {title}
                </p>
              ))}
              <p className=" text-black/70 mt-12 leading-relaxed text-sm">
                {credentials.teachersHeading}{" "}
                {credentials.teachers.map((teacher, i) => (
                  <span key={i}>
                    <Link
                      href={teacher.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black transition-colors font-body"
                    >
                      {teacher.name}
                    </Link>
                    {i < credentials.teachers.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Pillars */}
      <FadeIn>
        <PillarsSection />
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
