"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { COMPANY_METADATA, NAVIGATION_LINKS, NAVIGATION_CTA, SITE_CONFIG } from "@/lib/constants";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNavigation from "./MobileNavigation";
import { getLocaleData, isActive, SCROLL_THRESHOLD } from "./utils";
import { desktopLinkStyles, linkStylesActive } from "./styles";
import { NavigationItem } from "./types";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.paddingRight = "0px";
      document.body.style.overflow = "unset";
    }
    return () => {
      document.documentElement.style.paddingRight = "0px";
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const toggleMobileSubmenu = (itemName: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === itemName ? null : itemName);
  };

  return (
    <header
      className={`sticky z-[9999] top-0 w-full transition-all duration-300 bg-brand-bg ${
        isScrolled ? "border-b border-black/10" : ""
      }`}
    >
      <nav
        aria-label="Global"
        className="mx-auto max-w-[1440px] flex items-center justify-between px-6 md:px-10 py-4"
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="font-heading text-base font-normal text-black hover:opacity-70 transition"
          onClick={() => setMobileMenuOpen(false)}
        >
          {COMPANY_METADATA.name}
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAVIGATION_LINKS.map((item: NavigationItem) => {
            const localeData = getLocaleData(item, locale);
            const active = isActive(localeData.href, pathname);
            return (
              <Link
                key={item.link}
                href={localeData.href}
                className={`${desktopLinkStyles} ${active ? linkStylesActive : ""}`}
              >
                {localeData.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop right: language + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {SITE_CONFIG.i18n.languageSwitcher.showOnDesktop && <LanguageSwitcher />}
          {NAVIGATION_CTA.map((item: NavigationItem) => {
            const localeData = getLocaleData(item, locale);
            return (
              <Link
                key={item.link}
                href={localeData.href}
                className="bg-brand-primary text-white text-sm font-body px-5 py-2.5 rounded-full hover:opacity-90 transition whitespace-nowrap"
              >
                {localeData.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block h-0.5 w-6 bg-black transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-black transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-black transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileNavigation
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            openMobileSubmenu={openMobileSubmenu}
            toggleMobileSubmenu={toggleMobileSubmenu}
            pathname={pathname}
            locale={locale}
            router={router}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
