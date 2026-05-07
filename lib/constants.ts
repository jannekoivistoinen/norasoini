import { IconKey } from "@/app/assets/icons";

export const SITE_CONFIG = {
  company: {
    name: "Nora Soini",
    domain: "norasoini.fi",
    url: "https://norasoini.fi",
    description:
      "Laillistettu läsnäolon ja systeemisyyden lyhytterapeutti Espoosta. Tarjoan yksilöterapiaa sekä kraniosakraaliterapiaa elämän muutoskohtiin.",
    sitemapUrl: "https://norasoini.fi/sitemap.xml",
    logo: {
      default: "/logo.svg",
      dark: "/logo-dark.svg",
      alt: "Nora Soini",
    },
    contact: {
      email: "nora@norasoini.fi",
      phone: "",
      address: "Espoo, Finland",
    },
    social: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  },

  i18n: {
    locales: ["fi", "en"] as const,
    defaultLocale: "fi" as const,
    routes: {
      services: {
        fi: "palvelut",
        en: "services",
      },
      about: {
        fi: "noran-tarina",
        en: "about",
      },
      contact: {
        fi: "yhteystiedot",
        en: "contact",
      },
      pricing: {
        fi: "hinnasto",
        en: "pricing",
      },
      terms: {
        fi: "kayttoehdot",
        en: "terms",
      },
    },
    languageSwitcher: {
      showOnDesktop: true,
      showOnMobile: true,
    },
  },

  theme: {
    colors: {
      primary: "#2F4F46",
      secondary: "#000000",
      background: "#E1D9CB",
    },
    fonts: {
      heading: "Instrument Serif, serif",
      body: "Instrument Sans, system-ui, sans-serif",
      link: "Kaisei Decol, serif",
    },
  },
};

export const COMPANY_METADATA = SITE_CONFIG.company;
export const locales = SITE_CONFIG.i18n.locales;
export const defaultLocale = SITE_CONFIG.i18n.defaultLocale;

export const localePath = (locale: string, path: string) =>
  locale === defaultLocale ? `/${path}` : `/${locale}/${path}`;

export type NavigationItem = {
  link: string;
  fi: { name: string; href: string; description?: string };
  en: { name: string; href: string; description?: string };
  sublinks?: Array<{
    link: string;
    icon?: IconKey;
    fi: { name: string; href: string; description?: string };
    en: { name: string; href: string; description?: string };
  }>;
};

export const NAVIGATION_LINKS: NavigationItem[] = [
  {
    link: "about",
    fi: {
      name: "Noran tarina",
      href: `/${SITE_CONFIG.i18n.routes.about.fi}`,
    },
    en: {
      name: "About Nora",
      href: `/en/${SITE_CONFIG.i18n.routes.about.en}`,
    },
  },
  {
    link: "services",
    fi: {
      name: "Palvelut",
      href: `/${SITE_CONFIG.i18n.routes.services.fi}`,
    },
    en: {
      name: "Services",
      href: `/en/${SITE_CONFIG.i18n.routes.services.en}`,
    },
  },
  {
    link: "contact",
    fi: {
      name: "Yhteystiedot",
      href: `/${SITE_CONFIG.i18n.routes.contact.fi}`,
    },
    en: {
      name: "Contact",
      href: `/en/${SITE_CONFIG.i18n.routes.contact.en}`,
    },
  },
];

export const NAVIGATION_CTA: NavigationItem[] = [
  {
    link: "cta",
    fi: {
      name: "Varaa aika",
      href: `/${SITE_CONFIG.i18n.routes.contact.fi}`,
    },
    en: {
      name: "Book a session",
      href: `/en/${SITE_CONFIG.i18n.routes.contact.en}`,
    },
  },
];
