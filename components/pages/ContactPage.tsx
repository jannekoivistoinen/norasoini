import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";
import { noraSoiniPortrait } from "@/app/assets/images";
import PageHero from "@/components/sections/PageHero";
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

      <FadeIn>
        <section className="container py-10 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Info */}
            <div className="flex flex-col gap-6">
              <h2 className="font-heading italic text-3xl md:text-4xl leading-tight">
                {t("contact.title")}
              </h2>
              <p className="text-sm md:text-base text-black/70 leading-relaxed">
                {t("hero.description")}
              </p>
              <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "1024/683" }}>
                <Image
                  src={noraSoiniPortrait}
                  alt="Nora Soini – terapeutti Espoossa"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-black/90">{SITE_CONFIG.company.name}</p>
                <p className="text-sm text-black/60">Lyhytterapeutti &amp; kraniosakraaliterapeutti</p>
              </div>
              <a
                href={`mailto:${SITE_CONFIG.company.contact.email}`}
                className="text-base md:text-lg text-brand-primary hover:opacity-70 transition"
              >
                {SITE_CONFIG.company.contact.email}
              </a>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-heading italic text-3xl md:text-4xl leading-tight mb-8">
                {t("contact.formTitle")}
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <VisitFlowSection />
      </FadeIn>

      <FadeIn>
        <FAQ />
      </FadeIn>

      <FadeIn>
        <TerminalCTA
          title={tFooter("cta")}
          paragraph={tFooter("ctaDescription")}
          buttons={[{ label: tFooter("ctaButton"), href: contactHref }]}
        />
      </FadeIn>
    </>
  );
}
