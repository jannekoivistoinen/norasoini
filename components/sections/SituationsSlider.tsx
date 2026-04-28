"use client";

import { useTranslations } from "next-intl";
import { BatteryLow, Milestone, Compass, Eye, Leaf } from "lucide-react";
import { Slider } from "@/components/Slider";

const SITUATIONS_SLIDES_PER_VIEW = { mobile: 1.2, tablet: 2, desktop: 3 };

const situationIcons = [BatteryLow, Milestone, Compass, Eye, Leaf] as const;

export default function SituationsSlider() {
  const t = useTranslations("page.homepage");
  const cards = t.raw("situations.cards") as {
    title: string;
    description: string;
  }[];

  return (
    <section className="container">
      <h2 className="mb-4">{t("situations.heading")}</h2>
      <p className="text-black/70  max-w-2xl mb-8">
        {t("situations.description")}
      </p>
      <Slider
        slidesPerView={SITUATIONS_SLIDES_PER_VIEW}
        spacing={20}
        mobileSpacing={16}
      >
        {cards.map((card, i) => {
          const Icon = situationIcons[i];
          return (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl bg-[#d8cdbb]"
              style={{ aspectRatio: "467/418" }}
            >
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <Icon
                    className="text-brand-primary w-7 h-7"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <div>
                  <h3 className="mb-3">{card.title}</h3>
                  <p className=" text-black/70">{card.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
}
