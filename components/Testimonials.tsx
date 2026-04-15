"use client";

import { useTranslations } from "next-intl";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Slider } from "./Slider";

interface TestimonialItem {
  name: string;
  quote: string;
}

const TESTIMONIALS_SLIDES_PER_VIEW = { mobile: 1.2, tablet: 1.5, desktop: 2 };

export default function Testimonials() {
  const t = useTranslations("component.testimonials");

  const testimonialItems = t.raw("items") as TestimonialItem[];

  return (
    <>
      <Slider
        slidesPerView={TESTIMONIALS_SLIDES_PER_VIEW}
        showPagination={false}
      >
        {testimonialItems &&
          Array.isArray(testimonialItems) &&
          testimonialItems.map((item) => (
            <TestimonialCard
              key={item.name}
              name={item.name}
              quote={item.quote}
              className="bg-[#EDEDDE]"
            />
          ))}
      </Slider>
    </>
  );
}
