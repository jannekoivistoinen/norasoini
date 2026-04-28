"use client";

import { useTranslations } from "next-intl";
import { Slider } from "@/components/Slider";

export default function QuoteSlider() {
  const t = useTranslations("component.quoteSlider");
  const slides = t.raw("slides") as {
    name: string;
    quote: string;
    description: string;
  }[];

  return (
    <div className="container mb-12 md:mb-24">
      <Slider slidesPerView={1} spacing={20} mobileSpacing={16} showPagination>
        {slides.map((slide, i) => (
          <div
            key={i}
            className="w-full min-h-0 flex items-center justify-center px-6 bg-brand-card md:aspect-video rounded-2xl aspect-[3/4] p-12"
          >
            <div className="text-center max-w-[834px]">
              <p className=" text-black opacity-50 mb-3 md:mb-4 lg:mb-6 text-balance">
                {slide.name}
              </p>
              <blockquote className="!leading-[120%] font-heading italic text-2xl md:text-3xl lg:text-5xl mb-3 md:mb-4 lg:mb-6 text-balance">
                <span
                  aria-hidden="true"
                  className="select-none italic text-2xl md:text-4xl lg:text-5xl"
                >
                  “
                </span>
                {slide.quote}
                <span
                  aria-hidden="true"
                  className="select-none italic text-2xl md:text-4xl lg:text-5xl"
                >
                  ”
                </span>
              </blockquote>
              <p className=" text-black/70 max-w-lg mx-auto whitespace-pre-line">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
