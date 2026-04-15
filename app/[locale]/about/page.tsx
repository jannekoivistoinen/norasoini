import { Metadata } from "next";
import { COMPANY_METADATA, SITE_CONFIG } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import AboutPage from "@/components/pages/AboutPage";

// Update Props type to use PageProps
type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "page.about.metadata",
  });
  const canonicalUrl = `${COMPANY_METADATA.url}/${locale}/${SITE_CONFIG.i18n.routes.about[locale as keyof typeof SITE_CONFIG.i18n.routes.about]}`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fi: `${COMPANY_METADATA.url}/fi/${SITE_CONFIG.i18n.routes.about.fi}`,
        en: `${COMPANY_METADATA.url}/en/${SITE_CONFIG.i18n.routes.about.en}`,
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
  await params; // Ensure params are resolved
  return <AboutPage />;
}
