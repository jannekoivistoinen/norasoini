"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Slider } from "@/components/Slider";
import { serviceImages } from "@/app/assets/images";

type ServiceItem = {
  title: string;
  intro: string;
  details: string[];
};

export default function ServicesSlider() {
  const tHome = useTranslations("page.homepage");
  const tServices = useTranslations("page.services");
  const items = tServices.raw("items") as ServiceItem[];

  return (
    <section className="container">
      <h2 className="font-heading italic text-4xl md:text-3xl lg:text-5xl leading-tight mb-4">
        {tHome("servicesSlider.heading")}
      </h2>
      <p className="text-black/60 text-sm md:text-base max-w-2xl mb-8">
        {tHome("servicesSlider.description")}
      </p>
      <Slider
        slidesPerView={{ mobile: 1.2, tablet: 2, desktop: 2 }}
        spacing={20}
        mobileSpacing={16}
      >
        {items.map((item, i) => (
          <div key={i} className="flex flex-col">
            <div className="relative w-full rounded-2xl overflow-hidden mb-5 aspect-square">
              <Image
                src={serviceImages[i % serviceImages.length]}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 83vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <h3 className="font-heading italic text-2xl mb-2">{item.title}</h3>
            <p className="text-sm text-black/60 leading-relaxed mb-2">
              {item.intro}
            </p>
            <Link
              href="/services"
              className="text-sm underline underline-offset-2"
            >
              Lue lisää
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
}
