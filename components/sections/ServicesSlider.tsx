"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Slider } from "@/components/Slider";
import { serviceImages } from "@/app/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
    <section className="container !pt-0">
      <h2 className="mb-4">{tHome("servicesSlider.heading")}</h2>
      <p className="text-black/70  max-w-2xl mb-8">
        {tHome("servicesSlider.description")}
      </p>
      <Slider
        slidesPerView={{ mobile: 1.2, tablet: 2, desktop: 2 }}
        spacing={20}
        mobileSpacing={16}
      >
        {items.map((item, i) => (
          <Link
            key={i}
            href="/services"
            className="group flex flex-col text-left rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <div className="relative w-full rounded-2xl overflow-hidden mb-6 aspect-square">
              <Image
                src={serviceImages[i % serviceImages.length]}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 83vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover hover:scale-[101%] transition-transform duration-500"
                priority={i === 0}
              />
            </div>
            <h3 className="mb-3">{item.title}</h3>
            <p className=" text-black/70 leading-relaxed mb-4 font-body">
              {item.intro}
            </p>
            <span className="inline-flex items-center gap-2 font-body text-base font-semibold text-brand-primary transition-colors duration-300 group-hover:text-brand-text">
              {tHome("servicesSlider.readMore")}
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <FontAwesomeIcon
                icon={faArrowRight as any}
                className="w-3 h-3 mt-1 shrink-0 text-current transition-transform duration-300 ease-out group-hover:translate-x-[10px]"
              />
            </span>
          </Link>
        ))}
      </Slider>
    </section>
  );
}
