import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { SITE_CONFIG } from "@/lib/constants";

const generatePathnames = () => {
  const pathnames: Record<string, Record<string, string>> = {};

  Object.entries(SITE_CONFIG.i18n.routes).forEach(([routeKey, localeValues]) => {
    const path = `/${routeKey}`;
    pathnames[path] = {};

    SITE_CONFIG.i18n.locales.forEach((locale) => {
      const localePath = localeValues[locale as keyof typeof localeValues];
      pathnames[path][locale] = `/${localePath}`;
    });
  });

  return pathnames;
};

export const routing = defineRouting({
  locales: SITE_CONFIG.i18n.locales,
  defaultLocale: SITE_CONFIG.i18n.defaultLocale,
  localeDetection: false,
  localePrefix: "as-needed",
  pathnames: generatePathnames(),
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
