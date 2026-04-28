import { Metadata } from "next";
import { COMPANY_METADATA, SITE_CONFIG } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import PricingPage from "@/components/pages/PricingPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "page.pricing.metadata",
  });
  const canonicalUrl = `${COMPANY_METADATA.url}/${locale}/${SITE_CONFIG.i18n.routes.pricing[locale as keyof typeof SITE_CONFIG.i18n.routes.pricing]}`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fi: `${COMPANY_METADATA.url}/fi/${SITE_CONFIG.i18n.routes.pricing.fi}`,
        en: `${COMPANY_METADATA.url}/en/${SITE_CONFIG.i18n.routes.pricing.en}`,
        "x-default": `${COMPANY_METADATA.url}/fi/${SITE_CONFIG.i18n.routes.pricing.fi}`,
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

  const priceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "fi" ? "Hinnasto" : "Pricing",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Offer",
          name: locale === "fi" ? "Lyhytterapia" : "Short-term therapy",
          description:
            locale === "fi"
              ? "Tavoitteellista ja käytännönläheistä keskusteluapua, 60 min, Espoossa tai etänä"
              : "Goal-oriented conversational support, 60 min, in Espoo or online",
          price: "89",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "89",
            priceCurrency: "EUR",
          },
          seller: {
            "@type": "LocalBusiness",
            "@id": `${COMPANY_METADATA.url}#localbusiness`,
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Offer",
          name:
            locale === "fi"
              ? "Kraniosakraaliterapia (opiskelijahinta)"
              : "Craniosacral therapy (student rate)",
          description:
            locale === "fi"
              ? "Lempeä ja syvärentouttava hoitomuoto, 60 min, Espoossa (voimassa elokuuhun 2026)"
              : "Gentle, deeply relaxing treatment, 60 min, in Espoo (valid until August 2026)",
          price: "69",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "69",
            priceCurrency: "EUR",
            validThrough: "2026-08-31",
          },
          seller: {
            "@type": "LocalBusiness",
            "@id": `${COMPANY_METADATA.url}#localbusiness`,
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Offer",
          name:
            locale === "fi"
              ? "Kraniosakraaliterapia"
              : "Craniosacral therapy",
          description:
            locale === "fi"
              ? "Lempeä ja syvärentouttava hoitomuoto, 60 min, Espoossa"
              : "Gentle, deeply relaxing treatment, 60 min, in Espoo",
          price: "95",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "95",
            priceCurrency: "EUR",
            validFrom: "2026-09-01",
          },
          seller: {
            "@type": "LocalBusiness",
            "@id": `${COMPANY_METADATA.url}#localbusiness`,
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Offer",
          name:
            locale === "fi"
              ? "Yhdistelmähoito: lyhytterapia + kraniosakraaliterapia"
              : "Combination session: short-term therapy + craniosacral therapy",
          description:
            locale === "fi"
              ? "Kokonaisvaltainen hoito, 90 min, Espoossa"
              : "Holistic care for both mind and body, 90 min, in Espoo",
          price: "129",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "129",
            priceCurrency: "EUR",
          },
          seller: {
            "@type": "LocalBusiness",
            "@id": `${COMPANY_METADATA.url}#localbusiness`,
          },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(priceSchema) }}
      />
      <PricingPage />
    </>
  );
}
