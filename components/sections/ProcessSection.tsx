"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ProcessSection() {
  const t = useTranslations("page.homepage");
  const processSteps = t.raw("process.steps") as { number: string; title: string; description: string }[];

  return (
    <section className="px-6 py-20 max-w-[1200px] mx-auto">
      <h2 className="font-heading italic text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 text-center mx-auto">
        {t("process.heading")}
      </h2>
      <p className="text-black/60 font-body text-sm md:text-base max-w-md mb-12 text-center mx-auto">
        {t("process.description")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {processSteps.map((step, i) => (
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
            <p className="text-sm font-body text-black/60 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
