"use client";

import { useTranslations } from "next-intl";
import { Slider } from "@/components/Slider";

export default function QuoteSlider() {
  const t = useTranslations("component.quoteSlider");
  const slides = t.raw("slides") as { quote: string; description: string }[];

  return (
    <section className="container">
      <Slider slidesPerView={1} spacing={20} mobileSpacing={16} showPagination>
        {slides.map((slide, i) => (
          <div
            key={i}
            className="w-full min-h-[400px] md:min-h-0 flex items-center justify-center px-6 bg-[#D8CDBB] aspect-video rounded-2xl"
          >
            <div className="text-center max-w-[834px]">
              <blockquote className="font-heading italic text-3xl md:text-4xl lg:text-5xl mb-4 text-balance">
                {slide.quote}
              </blockquote>
              <p className="text-sm md:text-base text-black/70 max-w-lg mx-auto whitespace-pre-line">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
