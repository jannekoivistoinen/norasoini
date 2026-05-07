"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  COMPANY_METADATA,
  NAVIGATION_LINKS,
  NAVIGATION_CTA,
  SITE_CONFIG,
} from "@/lib/constants";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNavigation from "./MobileNavigation";
import { getLocaleData, isActive, SCROLL_THRESHOLD } from "./utils";
import { desktopLinkStyles, linkStylesActive } from "./styles";
import { NavigationItem } from "./types";
import { openVelloModal } from "@/lib/openVelloModal";
import { Button } from "@/components/ui/button";

const navAnim = (delay: number) => ({
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null,
  );
  const locale = useLocale();
  const router = useRouter();

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
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

  // Close menu + reset submenu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  }, [pathname]);

  const toggleMobileSubmenu = (itemName: string) => {
    setOpenMobileSubmenu(openMobileSubmenu === itemName ? null : itemName);
  };

  return (
    <header
      className={`sticky z-[9999] top-0 w-full transition-all duration-300 ${
        mobileMenuOpen
          ? "bg-brand-bg"
          : isScrolled
            ? "bg-brand-bg/85 backdrop-blur-xl border-b border-black/10"
            : "bg-brand-bg"
      }`}
    >
      <nav
        aria-label="Global"
        className="relative z-[9992] w-full flex items-center justify-between px-6 md:px-10 py-6"
      >
        {/* Logo */}
        <motion.div {...navAnim(0)}>
          <Link
            href={locale === "fi" ? "/" : `/${locale}`}
            className="font-heading text-2xl md:text-3xl font-bold md:font-normal tracking-[-0.05rem] hover:opacity-70 transition text-brand-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            {COMPANY_METADATA.name}
          </Link>
        </motion.div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAVIGATION_LINKS.map((item: NavigationItem, index: number) => {
            const localeData = getLocaleData(item, locale);
            const active = isActive(localeData.href, pathname);
            return (
              <motion.div key={item.link} {...navAnim(0.1 + index * 0.07)}>
                <Link
                  href={localeData.href}
                  className={`${desktopLinkStyles} ${active ? linkStylesActive : ""}`}
                >
                  {localeData.name}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop right: language + CTA */}
        <motion.div
          {...navAnim(0.38)}
          className="hidden md:flex items-center gap-4"
        >
          {SITE_CONFIG.i18n.languageSwitcher.showOnDesktop && (
            <LanguageSwitcher />
          )}
          {NAVIGATION_CTA.map((item: NavigationItem) => {
            const localeData = getLocaleData(item, locale);
            return (
              <Button
                key={item.link}
                onClick={openVelloModal}
                className="whitespace-nowrap"
              >
                {localeData.name}
              </Button>
            );
          })}
        </motion.div>

        {/* Mobile hamburger / close toggle */}
        <motion.div {...navAnim(0.15)} className="md:hidden">
          <Button
            className="group"
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="pointer-events-none"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 12L20 12"
                className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
              />
              <path
                d="M4 12H20"
                className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
              />
              <path
                d="M4 12H20"
                className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
              />
            </svg>
          </Button>
        </motion.div>
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
