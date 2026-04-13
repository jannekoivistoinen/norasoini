"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FaqSection() {
  const t = useTranslations("page.homepage");
  const faqItems = t.raw("faq.items") as { question: string; answer: string }[];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="px-6 py-20 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        <div className="md:sticky md:top-28 md:self-start">
          <h2 className="font-heading italic text-3xl md:text-4xl leading-tight mb-6">
            {t("faq.heading")}
          </h2>
          <p className="font-body text-sm md:text-base text-black/60 leading-relaxed">
            {t("faq.description")}
          </p>
        </div>
        <div className="divide-y divide-black/10">
          {faqItems.map((item, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center justify-between py-5 text-left gap-4"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-heading italic text-base md:text-lg">{item.question}</span>
                <span className="text-black/40 text-xl leading-none flex-shrink-0">
                  {openFaq === i ? "–" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <p className="pb-5 text-sm font-body text-black/60 leading-relaxed">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
