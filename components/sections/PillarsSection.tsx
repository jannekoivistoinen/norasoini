"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Clover, MessagesSquare, Sprout } from "lucide-react";

const pillarIcons = [MessagesSquare, Clover, Sprout] as const;

export default function PillarsSection() {
  const t = useTranslations("page.homepage");
  const pillars = t.raw("pillars.items") as {
    icon: string;
    title: string;
    description: string;
  }[];

  return (
    <section className="container py-20">
      <h2 className="mb-4 text-center">
        {t("pillars.heading")}
      </h2>
      <p className="text-black/70 text-sm md:text-base mb-12 text-center max-w-2xl mx-auto">
        {t("pillars.description")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pillars.map((pillar, i) => {
          const Icon = pillarIcons[i];
          return (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "467/418" }}
            >
              <div className="absolute inset-0 bg-[#d8cdbb]/80" />
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <Icon
                    className="text-brand-primary w-7 h-7"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <div>
                  <h3 className="mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-black/70">{pillar.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
