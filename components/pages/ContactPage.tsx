import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/sections/PageHero";
import ProcessSection from "@/components/sections/ProcessSection";
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
      <PageHero heading={t("hero.title")} />

      <FadeIn>
        <section className="container py-10 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Info */}
            <div>
              <h2 className="font-heading italic text-3xl md:text-4xl leading-tight mb-6">
                {t("contact.title")}
              </h2>
              <p className="text-sm md:text-base text-black/70 mb-6 leading-relaxed">
                {t("hero.description")}
              </p>
              <p className="text-sm md:text-base text-black/60 mb-6 leading-relaxed">
                {t("contact.info")}
              </p>
              <a
                href={`mailto:${SITE_CONFIG.company.contact.email}`}
                className="text-sm text-brand-primary hover:opacity-70 transition"
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
        <ProcessSection />
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
