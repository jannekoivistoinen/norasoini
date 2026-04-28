"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ProcessSection() {
  const t = useTranslations("page.homepage");
  const processSteps = t.raw("process.steps") as {
    number: string;
    title: string;
    description: string;
  }[];

  return (
    <section className="container py-12 md:py-20">
      <h2 className="mb-4 text-center mx-auto">
        {t("process.heading")}
      </h2>
      <p className="text-black/70 text-sm md:text-base max-w-md mb-8 md:mb-12 text-center mx-auto">
        {t("process.description")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {processSteps.map((step, i) => (
          <div key={i} className="step-card">
            <div
              className="relative w-full rounded-2xl overflow-hidden mb-5"
              style={{ aspectRatio: "467/584" }}
            >
              <Image
                src={`/images/process-${i + 1}.jpg`}
                alt={step.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-brand-bg/90 flex items-center justify-center font-heading italic text-2xl text-black">
                  {i + 1}
                </span>
              </div>
            </div>
            <h3 className="mb-2">{step.title}</h3>
            <p className="text-sm md:text-base text-black/70 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
