"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Slider } from "@/components/Slider";
import { visitFlowImages } from "@/app/assets/images";

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
    <section className="container py-12 md:py-20">
      <h2 className="mb-4 md:text-center md:mx-auto">
        {t("visitFlow.heading")}
      </h2>
      <p className="text-black/70 max-w-md mb-8 md:mb-12 md:text-center mx-auto">
        {t("visitFlow.description")}
      </p>
      <div className="flex flex-col gap-8 md:hidden">
        {steps.map((step, i) => (
          <div key={i} className="step-card">
            <div className="relative w-full rounded-2xl overflow-hidden mb-5 aspect-[4/5]">
              <Image
                src={visitFlowImages[i % visitFlowImages.length]}
                alt={step.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <span className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center font-heading italic text-3xl text-white">
                {i + 1}
              </span>
            </div>
            <h3 className="mb-2">{step.title}</h3>
            <p className=" text-black/70 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <Slider
          slidesPerView={VISIT_FLOW_SLIDES_PER_VIEW}
          spacing={20}
          mobileSpacing={16}
        >
          {steps.map((step, i) => (
            <div key={i} className="step-card">
              <div className="relative w-full rounded-2xl overflow-hidden mb-5 aspect-[4/5]">
                <Image
                  src={visitFlowImages[i % visitFlowImages.length]}
                  alt={step.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center font-heading italic text-3xl text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-2">{step.title}</h3>
              <p className=" text-black/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
