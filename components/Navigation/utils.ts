import { setLanguageCookie } from "@/lib/utils";
import type { useRouter as UseRouter } from "next/navigation";
import { LocaleData, NavigationItem, isLocaleData } from "./types";

// Locale names mapping
export const localeNames: Record<string, string> = {
  fi: "FI",
  en: "EN",
};

// Shared language switching function
export function handleLanguageChange(
  newLocale: string,
  router: ReturnType<typeof UseRouter>,
  pathname: string
) {
  setLanguageCookie(newLocale);
  const segments = pathname.split("/");
  segments[1] = newLocale;
  const newPathname = segments.join("/");
  router.push(newPathname);
}

// Helper function to check if a link is active
export function isActive(itemHref: string, pathname: string) {
  if (itemHref === "#") return false;

  // For locale-specific paths like "/fi" and "/en" (homepage),
  // only activate on exact match
  if (itemHref.match(/^\/[a-z]{2}$/)) {
    return pathname === itemHref;
  }

  // For all other pages, check for exact match or subpaths
  return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
}

// Helper function to get locale data safely
export function getLocaleData(
  item: NavigationItem,
  locale: string
): LocaleData {
  const data = item[locale];
  if (!isLocaleData(data)) {
    throw new Error(`Missing locale data for ${locale}`);
  }
  return data;
}

export const SCROLL_THRESHOLD = 10;
