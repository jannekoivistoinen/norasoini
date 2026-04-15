"use client";

import { useTranslations } from "next-intl";
import MarkdownText from "./MarkdownText";
import { ValueCard } from "@/components/ValueCard";
import { Slider } from "./Slider";

interface ValueItem {
  title: string;
  text: string;
}

const VALUES_SLIDES_PER_VIEW = { mobile: 1.2, tablet: 1.5, desktop: 2 };

export default function Values() {
  const t = useTranslations("component.values");

  const valueItems = t.raw("items") as ValueItem[];

  return (
    <section className="container">
      <MarkdownText className="p-lg mb-8 content">
        {t("sectionTitle")}
      </MarkdownText>
      <Slider
        slidesPerView={VALUES_SLIDES_PER_VIEW}
        showPagination={false}
      >
        {valueItems &&
          Array.isArray(valueItems) &&
          valueItems.map((item) => (
            <ValueCard
              key={item.title}
              title={item.title}
              description={item.text}
              className="bg-[#EDEDDE]"
            />
          ))}
      </Slider>
    </section>
  );
}
