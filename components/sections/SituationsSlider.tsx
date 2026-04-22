"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Slider } from "@/components/Slider";

const SITUATIONS_SLIDES_PER_VIEW = { mobile: 1.2, tablet: 2, desktop: 3 };

export default function SituationsSlider() {
  const t = useTranslations("page.homepage");
  const cards = t.raw("situations.cards") as {
    title: string;
    description: string;
  }[];

  return (
    <section className="container">
      <h2 className="font-heading italic text-4xl md:text-3xl lg:text-5xl leading-tight mb-4">
        {t("situations.heading")}
      </h2>
      <p className="text-black/60 text-sm md:text-base max-w-2xl mb-8">
        {t("situations.description")}
      </p>
      <Slider
        slidesPerView={SITUATIONS_SLIDES_PER_VIEW}
        spacing={20}
        mobileSpacing={16}
      >
        {cards.map((card, i) => (
          <div key={i} className="flex flex-col">
            <div className="relative w-full rounded-2xl overflow-hidden mb-5 aspect-[467/700]">
              <Image
                src={`/images/situation-${i + 1}.jpg`}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 83vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <h3 className="font-heading italic text-2xl mb-2">{card.title}</h3>
            <p className="text-sm text-black/60 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </Slider>
    </section>
  );
}
