"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Slider } from "@/components/Slider";

export default function ServicesSlider() {
  const t = useTranslations("page.homepage");
  const cards = t.raw("situations.cards") as { title: string; description: string }[];

  return (
    <section className="overflow-hidden py-20">
      <div className="px-6 md:px-[60px] lg:px-[100px] mb-12">
        <h2 className="font-heading italic text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 max-w-xl">
          {t("situations.heading")}
        </h2>
        <p className="text-black/60 font-body text-sm md:text-base max-w-2xl">
          {t("situations.description")}
        </p>
      </div>

      <div className="pl-6 md:pl-[60px] lg:pl-[100px]">
        <Slider
          slidesPerView={{ mobile: 1.3, tablet: 2.2, desktop: 3.2 }}
          spacing={20}
          mobileSpacing={16}
        >
          {cards.map((card, i) => (
            <div key={i} className="flex flex-col">
              <div
                className="relative w-full rounded-2xl overflow-hidden mb-5"
                style={{ aspectRatio: "467/700" }}
              >
                <Image
                  src={`/images/situation-${i + 1}.jpg`}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading italic text-2xl mb-2">{card.title}</h3>
              <p className="text-sm font-body text-black/60 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
