import { Metadata } from "next";
import { COMPANY_METADATA } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import HomePage from "@/components/pages/HomePage";

type Props = {
  params: Promise<{ locale: string }>;
};

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  name: string;
  items: FaqItem[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "page.homepage.metadata",
  });
  const canonicalUrl = `${COMPANY_METADATA.url}/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fi: `${COMPANY_METADATA.url}/fi`,
        en: `${COMPANY_METADATA.url}/en`,
        "x-default": `${COMPANY_METADATA.url}/fi`,
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
  const tComponent = await getTranslations({ locale, namespace: "component.faq" });
  const faqCategories = tComponent.raw("categories") as FaqCategory[];
  const allFaqItems = faqCategories.flatMap((cat) => cat.items);

  const serviceNames =
    locale === "fi"
      ? ["Lyhytterapia", "Kraniosakraaliterapia", "Yhdistelmähoito"]
      : ["Short-term therapy", "Craniosacral therapy", "Combination session"];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${COMPANY_METADATA.url}#website`,
    name: COMPANY_METADATA.name,
    url: COMPANY_METADATA.url,
    inLanguage: ["fi", "en"],
  };

  const personLocalBusinessSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${COMPANY_METADATA.url}#person`,
        name: "Nora Soini",
        url: COMPANY_METADATA.url,
        email: COMPANY_METADATA.contact.email,
        image: `${COMPANY_METADATA.url}/og-image.jpg`,
        jobTitle:
          locale === "fi"
            ? "Läsnäolon ja systeemisyyden lyhytterapeutti"
            : "Short-term Therapist",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Espoo",
          addressCountry: "FI",
        },
        worksFor: { "@id": `${COMPANY_METADATA.url}#localbusiness` },
      },
      {
        "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
        "@id": `${COMPANY_METADATA.url}#localbusiness`,
        name: COMPANY_METADATA.name,
        url: COMPANY_METADATA.url,
        email: COMPANY_METADATA.contact.email,
        image: `${COMPANY_METADATA.url}/og-image.jpg`,
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Espoo",
          addressCountry: "FI",
        },
        areaServed: [
          { "@type": "City", name: "Espoo" },
          locale === "fi"
            ? { "@type": "Country", name: "Suomi" }
            : { "@type": "Country", name: "Finland" },
          locale === "fi" ? "Verkossa" : "Online",
        ],
        employee: { "@id": `${COMPANY_METADATA.url}#person` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "fi" ? "Terapiapalvelut" : "Therapy services",
          itemListElement: serviceNames.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personLocalBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePage />
    </>
  );
}
