"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { locales } from "@/lib/constants";
import {
  desktopPopoverContentStyles,
  desktopPopoverLinkStyles,
  desktopPopoverLinkTitleStyles,
  desktopPopoverTriggerStyles,
  linkStyles,
} from "./styles";
import { handleLanguageChange, localeNames } from "./utils";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Popover>
      <PopoverTrigger className={`${linkStyles} group`}>
        <span className={desktopPopoverTriggerStyles}>
          <Globe className="h-4 w-4 mr-1" />
          {locale.toUpperCase()}
          <motion.div className="transition-transform duration-200 group-data-[state=open]:rotate-180">
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </span>
      </PopoverTrigger>
      <PopoverContent
        className={desktopPopoverContentStyles}
        align="start"
        sideOffset={30}
      >
        <div className="p-2">
          <div>
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLanguageChange(loc, router, pathname)}
                className={desktopPopoverLinkStyles}
              >
                <span className={desktopPopoverLinkTitleStyles}>
                  {localeNames[loc]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
