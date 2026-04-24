import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { SITE_CONFIG } from "@/lib/constants";
import PillarsSection from "@/components/sections/PillarsSection";
import QuoteSlider from "@/components/sections/QuoteSlider";
import PageHero from "@/components/sections/PageHero";
import TerminalCTA from "@/components/sections/TerminalCTA";
import AboutHeroVideo from "@/components/sections/AboutHeroVideo";
import FadeIn from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";

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
  return (
    <>
      {/* Hero */}
      <PageHero heading={t("hero.heading")} ingress={t("hero.ingress")} />

      <FadeIn>
        <AboutHeroVideo />
      </FadeIn>

      {/* Bio (before bento) */}
      <FadeIn>
        <section className="container py-20">
          <div className="max-w-[882px] mx-auto">
            <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl leading-snug text-black/85 mb-12 md:ml-[15%] md:max-w-[70%]">
              {t("intro.ingressBelowPhoto")}
            </p>
            <div className="md:ml-[15%] md:max-w-[70%]">
              {paragraphsBeforeBento.map((para, i) => (
                <p
                  key={i}
                  className="text-sm md:text-base text-black/70 mb-5 leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Bento photo grid */}
      <FadeIn>
        <div className="container pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: "706/935" }}
            >
              <Image
                src="/images/about-left.jpg"
                alt="Nora Soini"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div
                className="relative w-full rounded-2xl overflow-hidden flex-1"
                style={{ aspectRatio: "706/458" }}
              >
                <Image
                  src="/images/about-right-top.jpg"
                  alt="Nora Soini"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div
                className="relative w-full rounded-2xl overflow-hidden flex-1"
                style={{ aspectRatio: "706/458" }}
              >
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
        </div>
      </FadeIn>

      {/* Bio (after bento) */}
      <FadeIn>
        <div className="container pb-20">
          <div className="max-w-[882px] mx-auto">
            <p className="font-heading italic text-2xl md:text-3xl lg:text-4xl leading-snug text-black/85 mb-8 md:ml-[15%] md:max-w-[70%]">
              {afterBento.ingress}
            </p>
            <div className="md:ml-[15%] md:max-w-[70%]">
              {afterBento.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-sm md:text-base text-black/70 mb-5 leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Credentials & teachers */}
      <FadeIn>
        <div className="container pb-20">
          <div className="max-w-[882px] mx-auto">
            <div className="md:ml-[15%] md:max-w-[70%]">
              <p className="text-sm md:text-base font-semibold text-black/85 mb-1">
                Nora Soini
              </p>
              {credentials.titles.map((title, i) => (
                <p key={i} className="text-sm md:text-base text-black/70 leading-relaxed">
                  {title}
                </p>
              ))}
              <p className="text-sm md:text-base text-black/70 mt-5 leading-relaxed">
                {credentials.teachersHeading}{" "}
                {credentials.teachers.map((teacher, i) => (
                  <span key={i}>
                    <Link
                      href={teacher.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black transition-colors"
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
      <FadeIn>
        <FAQ />
      </FadeIn>

      <TerminalCTA
        title={tFooter("cta")}
        paragraph={tFooter("ctaDescription")}
        buttons={terminalButtons}
      />
    </>
  );
}
