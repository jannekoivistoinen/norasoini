"use client";

import { useTranslations } from "next-intl";
import { Slider } from "@/components/Slider";
import FadeIn from "@/components/ui/FadeIn";

type ContactTestimonialsSliderProps = {
  showHeading?: boolean;
};

export default function ContactTestimonialsSlider({
  showHeading = false,
}: ContactTestimonialsSliderProps) {
  const t = useTranslations("page.contact");
  const tServices = useTranslations("page.services");
  const items = t.raw("testimonials.items") as {
    text: string;
    attribution: string;
  }[];

  const cardDelayBase = showHeading ? 0.12 : 0;

  return (
    <section className={`container${showHeading ? " py-16 md:py-20" : ""}`}>
      {showHeading ? (
        <FadeIn>
          <h2 className="text-center mx-auto mb-10">
            {tServices("testimonialsHeading")}
          </h2>
        </FadeIn>
      ) : null}
      <Slider
        slidesPerView={{ mobile: 1.2, tablet: 2, desktop: 3 }}
        spacing={20}
        mobileSpacing={16}
      >
        {items.map((item, i) => (
          <FadeIn
            key={i}
            delay={cardDelayBase + i * 0.12}
            className="h-full min-h-0"
          >
            <div className="relative overflow-hidden rounded-2xl bg-brand-card h-full flex flex-col">
              <div className="flex flex-col flex-1 p-6 md:p-8 justify-between gap-6">
                <p className="text-sm text-black/80 italic leading-relaxed overflow-y-auto whitespace-pre-line mb-8">
                  {item.text}
                </p>
                <p className="font-heading italic text-lg md:text-xl text-black/90 shrink-0">
                  {item.attribution}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </Slider>
    </section>
  );
}
