"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Slider } from "@/components/Slider";

export default function QuoteSlider() {
  const t = useTranslations("component.quoteSlider");
  const slides = t.raw("slides") as { quote: string; description: string }[];

  return (
    <section className="overflow-hidden">
      <Slider slidesPerView={1} spacing={0} showPagination>
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative w-full min-h-[400px] md:min-h-0"
            style={{ aspectRatio: "1440/776" }}
          >
            <Image
              src="/images/services-quote-bg.jpg"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <div className="text-center max-w-[834px]">
                <blockquote className="font-heading italic text-3xl md:text-4xl lg:text-5xl leading-snug mb-8">
                  {slide.quote}
                </blockquote>
                <p className="font-body text-sm md:text-base text-black/70 max-w-lg mx-auto">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
