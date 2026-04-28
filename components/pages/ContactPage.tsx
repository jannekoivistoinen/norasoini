import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";
import { noraSoiniPortrait } from "@/app/assets/images";
import PageHero from "@/components/sections/PageHero";
import ContactTestimonialsSlider from "@/components/sections/ContactTestimonialsSlider";
import VisitFlowSection from "@/components/sections/VisitFlowSection";
import TerminalCTA from "@/components/sections/TerminalCTA";
import FadeIn from "@/components/ui/FadeIn";
import { SITE_CONFIG } from "@/lib/constants";

const FAQ = dynamic(() =>
  import("@/components/FAQ").then((module) => module.FAQ),
);

export default function ContactPage() {
  const t = useTranslations("page.contact");
  const tFooter = useTranslations("component.footer");
  const contactHref = `mailto:${SITE_CONFIG.company.contact.email}`;

  return (
    <>
      <PageHero heading={t("hero.title")} ingress={t("hero.ingress")} />

      <ContactTestimonialsSlider />

      <section className="container py-10 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          {/* Info */}
          <div className="flex flex-col gap-6">
            <FadeIn delay={0}>
              <h2>{t("contact.title")}</h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div
                className="relative w-full rounded-2xl overflow-hidden"
                style={{ aspectRatio: "1024/683" }}
              >
                <Image
                  src={noraSoiniPortrait}
                  alt="Nora Soini – terapeutti Espoossa"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.14}>
              <div>
                <p className="font-medium text-black/90">
                  {SITE_CONFIG.company.name}
                </p>
                <p className="text-base text-black/70">
                  Lyhytterapeutti &amp; kraniosakraaliterapeutti
                </p>
                <a
                  href={`mailto:${SITE_CONFIG.company.contact.email}`}
                  className="text-base text-brand-primary hover:opacity-70 transition"
                >
                  {SITE_CONFIG.company.contact.email}
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Form */}
          <div className="flex flex-col">
            <FadeIn delay={0.06}>
              <h2 className="mb-8">{t("contact.formTitle")}</h2>
            </FadeIn>
            <FadeIn delay={0.12}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </section>

      <FadeIn>
        <VisitFlowSection />
      </FadeIn>

      <FAQ />

      <TerminalCTA
        title={tFooter("cta")}
        paragraph={tFooter("ctaDescription")}
        buttons={[{ label: tFooter("ctaButton"), href: contactHref }]}
      />
    </>
  );
}
