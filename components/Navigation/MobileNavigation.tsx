import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NAVIGATION_LINKS, NAVIGATION_CTA, locales, SITE_CONFIG } from "@/lib/constants";
import { NavigationItem } from "./types";
import { mobileLinkStyles, mobileLinkStylesActive } from "./styles";
import { getLocaleData, isActive, handleLanguageChange, localeNames } from "./utils";
import { containerVariants, itemVariants, bottomElementsVariants } from "./animations";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { openVelloModal } from "@/lib/openVelloModal";
import { Button } from "@/components/ui/button";

type MobileNavigationProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  openMobileSubmenu: string | null;
  toggleMobileSubmenu: (itemName: string) => void;
  pathname: string;
  locale: string;
  router: AppRouterInstance;
};

export default function MobileNavigation({
  mobileMenuOpen,
  setMobileMenuOpen,
  pathname,
  locale,
  router,
}: MobileNavigationProps) {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  if (!mobileMenuOpen) return null;

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[9990] bg-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setMobileMenuOpen(false)}
      />
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-x-0 top-0 z-[9991] bg-brand-bg pt-20 pb-8 px-6 shadow-lg"
      >
        <motion.div
          className="space-y-2 pt-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {NAVIGATION_LINKS.map((item: NavigationItem) => {
            const localeData = getLocaleData(item, locale);
            const active = isActive(localeData.href, pathname);
            return (
              <motion.div key={item.link} variants={itemVariants}>
                <Link
                  href={localeData.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${mobileLinkStyles} block text-lg py-3 ${active ? mobileLinkStylesActive : ""}`}
                >
                  {localeData.name}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col gap-4"
          variants={bottomElementsVariants}
          initial="hidden"
          animate="visible"
          custom={0.8}
        >
          {SITE_CONFIG.i18n.languageSwitcher.showOnMobile && (
            <div className="flex gap-3">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => { handleLanguageChange(loc, router, pathname); setMobileMenuOpen(false); }}
                  className={`text-sm px-3 py-1.5 rounded-full border transition ${
                    locale === loc
                      ? "border-brand-primary text-brand-primary"
                      : "border-black/30 text-black hover:border-black"
                  }`}
                >
                  {localeNames[loc]}
                </button>
              ))}
            </div>
          )}

          {NAVIGATION_CTA.map((item: NavigationItem) => {
            const localeData = getLocaleData(item, locale);
            return (
              <Button
                key={item.link}
                onClick={() => {
                  openVelloModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                {localeData.name}
              </Button>
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );
}
