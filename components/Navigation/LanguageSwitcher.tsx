"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/constants";
import { handleLanguageChange, localeNames } from "./utils";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          <button
            onClick={() => handleLanguageChange(loc, router, pathname)}
            className={`text-sm font-body transition ${
              locale === loc
                ? "text-black font-medium"
                : "text-black/50 hover:text-black"
            }`}
          >
            {localeNames[loc]}
          </button>
          {i < locales.length - 1 && (
            <span className="text-black/30 mx-1 text-xs">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
