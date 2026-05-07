import { Metadata } from "next";
import { COMPANY_METADATA, SITE_CONFIG, localePath } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import ServicesPage from "@/components/pages/ServicesPage";

// Update Props type to use PageProps
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "page.services.metadata",
  });
  const canonicalUrl = `${COMPANY_METADATA.url}${localePath(locale, SITE_CONFIG.i18n.routes.services[locale as keyof typeof SITE_CONFIG.i18n.routes.services])}`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fi: `${COMPANY_METADATA.url}/${SITE_CONFIG.i18n.routes.services.fi}`,
        en: `${COMPANY_METADATA.url}/en/${SITE_CONFIG.i18n.routes.services.en}`,
        "x-default": `${COMPANY_METADATA.url}/${SITE_CONFIG.i18n.routes.services.fi}`,
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

type ServiceItem = { title: string; intro: string };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  const tServices = await getTranslations({ locale, namespace: "page.services" });
  const serviceItems = tServices.raw("items") as ServiceItem[];

  const serviceSchemas = serviceItems.map((item, i) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${COMPANY_METADATA.url}#service-${i + 1}`,
    name: item.title,
    description: item.intro,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${COMPANY_METADATA.url}#localbusiness`,
      name: COMPANY_METADATA.name,
      url: COMPANY_METADATA.url,
    },
    areaServed: i === 0
      ? [{ "@type": "City", name: "Espoo" }, locale === "fi" ? "Verkossa" : "Online"]
      : { "@type": "City", name: "Espoo" },
  }));

  return (
    <>
      {serviceSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ServicesPage />
    </>
  );
}
