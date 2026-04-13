import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { SITE_CONFIG } from "@/lib/constants";
import PillarsSection from "@/components/sections/PillarsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FaqSection from "@/components/sections/FaqSection";
import QuoteSlider from "@/components/sections/QuoteSlider";
import PageHero from "@/components/sections/PageHero";

export default function ServicesPage() {
  const t = useTranslations("page.services");
  const locale = useLocale();

  const contactHref = `/${locale}/${SITE_CONFIG.i18n.routes.contact[locale as keyof typeof SITE_CONFIG.i18n.routes.contact]}`;
  const items = t.raw("items") as { title: string; subtitle: string; cta: string }[];
  const cardQuote = t("cardQuote");

  return (
    <>
      {/* Hero */}
      <PageHero
        heading={t("hero.heading")}
        ctaLabel={t("hero.cta")}
        ctaHref={contactHref}
      />

      {/* Service Cards */}
      <section className="pb-24">
        <div className="flex flex-col">
          {items.map((item, i) => (
            <div key={i} className="w-full overflow-hidden">
              <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[480px] md:min-h-[540px]">
                <div className="relative min-h-[320px] md:min-h-0">
                  <Image
                    src={`/images/service-${i + 1}.jpg`}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-brand-card px-10 py-16 md:px-16 md:py-20 flex flex-col justify-between">
                  <h2 className="font-heading italic text-3xl md:text-4xl lg:text-5xl leading-tight">
                    {item.title}
                  </h2>
                  <div>
                    <p className="font-body text-sm md:text-base text-black/70 mb-5 leading-relaxed">
                      {item.subtitle}
                    </p>
                    <p className="font-body text-sm md:text-base text-black/50 leading-relaxed">
                      {cardQuote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <PillarsSection />

      {/* Quote Slider */}
      <QuoteSlider />

      {/* Process */}
      <ProcessSection />

      {/* FAQ */}
      <FaqSection />
    </>
  );
}
