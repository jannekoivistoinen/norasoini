"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Slider } from "@/components/Slider";

type VisitStep = {
  number: string;
  title: string;
  description: string;
};

const VISIT_FLOW_SLIDES_PER_VIEW = { mobile: 1.2, tablet: 2, desktop: 3 };

export default function VisitFlowSection() {
  const t = useTranslations("page.services");
  const steps = t.raw("visitFlow.steps") as VisitStep[];

  return (
    <section className="container py-20">
      <h2 className="font-heading italic mb-4 text-center mx-auto">
        {t("visitFlow.heading")}
      </h2>
      <p className="text-black/60 text-sm md:text-base max-w-md mb-12 text-center mx-auto">
        {t("visitFlow.description")}
      </p>
      <Slider
        slidesPerView={VISIT_FLOW_SLIDES_PER_VIEW}
        spacing={20}
        mobileSpacing={16}
      >
        {steps.map((step, i) => (
          <div key={i}>
            <div
              className="relative w-full rounded-2xl overflow-hidden mb-5"
              style={{ aspectRatio: "467/584" }}
            >
              <Image
                src={`/images/process-${i + 1}.jpg`}
                alt={step.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-brand-bg/90 flex items-center justify-center font-heading italic text-2xl text-black">
                  {i + 1}
                </span>
              </div>
            </div>
            <h3 className="font-heading italic text-xl mb-2">{step.title}</h3>
            <p className="text-sm text-black/60 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </Slider>
    </section>
  );
}
