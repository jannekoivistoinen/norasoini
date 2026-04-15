import { Metadata } from "next";
import { COMPANY_METADATA } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import HomePage from "@/components/pages/HomePage";

// Update Props type to use PageProps
type Props = {
  params: Promise<{ locale: string }>;
};

type FaqItem = {
  question: string;
  answer: string;
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
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: COMPANY_METADATA.name,
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

// Update Page component to handle Promise params
export default async function Page({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "page.homepage",
  });
  const faqItems = t.raw("faq.items") as FaqItem[];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY_METADATA.name,
    url: COMPANY_METADATA.url,
    inLanguage: ["fi", "en"],
  };

  const personLocalBusinessSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: COMPANY_METADATA.name,
        url: COMPANY_METADATA.url,
        email: COMPANY_METADATA.contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Espoo",
          addressCountry: "FI",
        },
      },
      {
        "@type": "LocalBusiness",
        name: COMPANY_METADATA.name,
        url: COMPANY_METADATA.url,
        email: COMPANY_METADATA.contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Espoo",
          addressCountry: "FI",
        },
        areaServed: ["Espoo", "Finland", "Online"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Therapy services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Short-term therapy",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Craniosacral therapy",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Combination session",
              },
            },
          ],
        },
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLocalBusinessSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomePage />
    </>
  );
}
