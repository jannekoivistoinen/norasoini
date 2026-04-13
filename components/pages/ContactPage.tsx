import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/sections/PageHero";
import FaqSection from "@/components/sections/FaqSection";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactPage() {
  const t = useTranslations("page.contact");

  return (
    <>
      <PageHero heading={t("hero.title")} />

      <section className="px-6 py-10 pb-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Info */}
          <div>
            <h2 className="font-heading italic text-3xl md:text-4xl leading-tight mb-6">
              {t("contact.title")}
            </h2>
            <p className="font-body text-sm md:text-base text-black/70 mb-6 leading-relaxed">
              {t("hero.description")}
            </p>
            <p className="font-body text-sm md:text-base text-black/60 mb-6 leading-relaxed">
              {t("contact.info")}
            </p>
            <a
              href={`mailto:${SITE_CONFIG.company.contact.email}`}
              className="font-body text-sm text-brand-primary hover:opacity-70 transition"
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

      <FaqSection />
    </>
  );
}
