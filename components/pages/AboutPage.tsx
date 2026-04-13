import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { SITE_CONFIG } from "@/lib/constants";
import PillarsSection from "@/components/sections/PillarsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FaqSection from "@/components/sections/FaqSection";
import QuoteSlider from "@/components/sections/QuoteSlider";
import PageHero from "@/components/sections/PageHero";

export default function AboutPage() {
  const t = useTranslations("page.about");
  const locale = useLocale();

  const contactHref = `/${locale}/${SITE_CONFIG.i18n.routes.contact[locale as keyof typeof SITE_CONFIG.i18n.routes.contact]}`;
  const paragraphs = t.raw("intro.paragraphs") as string[];
  const testimonials = t.raw("testimonials") as { quote: string; attribution: string }[];

  return (
    <>
      {/* Hero */}
      <PageHero heading={t("hero.heading")} />

      {/* Full-width hero image with play button */}
      <section className="px-6">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "1440/776" }}>
          <Image
            src="/images/about-hero.jpg"
            alt="Nora Soini – terapiasessio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-brand-bg/80 flex items-center justify-center">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <FontAwesomeIcon icon={faCirclePlay as any} className="text-brand-primary w-8 h-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="px-6 py-20">
        <div className="max-w-[882px] mx-auto">
          <h2 className="font-heading italic text-3xl md:text-4xl lg:text-5xl leading-tight mb-12">
            {t("intro.heading")}
          </h2>
          <div className="md:ml-[15%] md:max-w-[70%]">
            {paragraphs.map((para, i) => (
              <p key={i} className="font-body text-sm md:text-base text-black/70 mb-5 leading-relaxed">
                {para}
              </p>
            ))}
            <div className="mt-10">
              <Link
                href={contactHref}
                className="bg-brand-primary text-white text-sm font-body px-6 py-3 rounded-full hover:opacity-90 transition"
              >
                {t("hero.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section className="px-6 pb-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "706/935" }}>
            <Image
              src="/images/about-left.jpg"
              alt="Nora Soini"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="relative w-full rounded-2xl overflow-hidden flex-1" style={{ aspectRatio: "706/458" }}>
              <Image
                src="/images/about-right-top.jpg"
                alt="Nora Soini"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden flex-1" style={{ aspectRatio: "706/458" }}>
              <Image
                src="/images/about-right-bottom.jpg"
                alt="Nora Soini"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="px-6 pb-20">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item, i) => (
              <div key={i} className="bg-brand-card rounded-2xl p-10 flex flex-col justify-between min-h-[280px]">
                <blockquote className="font-heading italic text-xl md:text-2xl leading-snug text-black/80">
                  {item.quote}
                </blockquote>
                <p className="text-xs font-body text-black/40 mt-8">{item.attribution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quote Slider */}
      <QuoteSlider />

      {/* Pillars */}
      <PillarsSection />

      {/* Process */}
      <ProcessSection />

      {/* FAQ */}
      <FaqSection />
    </>
  );
}
