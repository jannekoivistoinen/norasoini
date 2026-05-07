import { Metadata } from "next";
import { COMPANY_METADATA, SITE_CONFIG, localePath } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import ContactPage from "@/components/pages/ContactPage";

// Update Props type to use PageProps
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "page.contact.metadata",
  });
  const canonicalUrl = `${COMPANY_METADATA.url}${localePath(locale, SITE_CONFIG.i18n.routes.contact[locale as keyof typeof SITE_CONFIG.i18n.routes.contact])}`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fi: `${COMPANY_METADATA.url}/${SITE_CONFIG.i18n.routes.contact.fi}`,
        en: `${COMPANY_METADATA.url}/en/${SITE_CONFIG.i18n.routes.contact.en}`,
        "x-default": `${COMPANY_METADATA.url}/${SITE_CONFIG.i18n.routes.contact.fi}`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: COMPANY_METADATA.name,
      locale: locale === "fi" ? "fi_FI" : "en_US",
      type: "website",
      images: [
        {
          url: `${COMPANY_METADATA.url}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${COMPANY_METADATA.url}/og-image.jpg`],
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${COMPANY_METADATA.url}#localbusiness`,
    name: COMPANY_METADATA.name,
    url: COMPANY_METADATA.url,
    email: COMPANY_METADATA.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Espoo",
      addressCountry: "FI",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: COMPANY_METADATA.contact.email,
      contactType: "customer service",
      availableLanguage: ["Finnish", "English"],
      contactOption: "TollFree",
    },
    areaServed: [
      { "@type": "City", name: "Espoo" },
      locale === "fi" ? "Verkossa" : "Online",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactPage />
    </>
  );
}
