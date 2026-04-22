import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import {
  NAVIGATION_LINKS,
  NAVIGATION_CTA,
  locales,
  SITE_CONFIG,
} from "@/lib/constants";
import { images } from "@/app/assets/images";
import { NavigationItem } from "./types";
import {
  mobileLinkStyles,
  mobileLinkStylesActive,
  mobileDescriptionStyles,
  mobileSubmenuLinkStyles,
  mobileSubmenuLinkStylesActive,
} from "./styles";
import {
  getLocaleData,
  isActive,
  handleLanguageChange,
  localeNames,
} from "./utils";
import { containerVariants, itemVariants } from "./animations";
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
  openMobileSubmenu,
  toggleMobileSubmenu,
  pathname,
  locale,
  router,
}: MobileNavigationProps) {
  // Close on ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [mobileMenuOpen, setMobileMenuOpen]);

  if (!mobileMenuOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[9990] h-[100vh] bg-black/25 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-x-0 top-0 z-[9991] flex h-[95dvh] w-full flex-col overflow-hidden rounded-b-2xl bg-brand-bg pt-24 shadow-2xl md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-1 min-h-0 flex-col overflow-y-auto px-6 pb-6">
          {/* Everything flows from the bottom up */}
          <div className="mt-auto">
            {/* Links */}
            <motion.div
              className="space-y-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {NAVIGATION_LINKS.map((item: NavigationItem, idx: number) => {
                const localeData = getLocaleData(item, locale);
                const active = isActive(localeData.href, pathname);

                if (item.sublinks && item.sublinks.length > 0) {
                  const isSubmenuOpen = openMobileSubmenu === item.link;
                  return (
                    <motion.div
                      key={item.link}
                      className="space-y-2"
                      variants={itemVariants}
                      custom={idx}
                    >
                      <button
                        onClick={() => toggleMobileSubmenu(item.link)}
                        className={`${mobileLinkStyles} w-full flex items-center justify-between ${
                          active ? mobileLinkStylesActive : ""
                        }`}
                        aria-expanded={isSubmenuOpen}
                      >
                        <span>{localeData.name}</span>
                        <motion.span
                          animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="inline-flex"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isSubmenuOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <motion.div
                              className="mb-4 space-y-1"
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {item.sublinks.map((sublink) => {
                                const sub = getLocaleData(sublink, locale);
                                const subActive = isActive(sub.href, pathname);
                                return (
                                  <Link
                                    key={sublink.link}
                                    href={sub.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`${mobileSubmenuLinkStyles} flex items-center gap-4 ${
                                      subActive
                                        ? mobileSubmenuLinkStylesActive
                                        : ""
                                    }`}
                                  >
                                    {sublink.icon && sublink.icon in images && (
                                      <Image
                                        src={
                                          images[
                                            sublink.icon as keyof typeof images
                                          ]
                                        }
                                        alt=""
                                        className="h-5 w-5 object-contain"
                                        width={20}
                                        height={20}
                                      />
                                    )}
                                    <div>
                                      <span className="text-[15px] font-medium text-black">
                                        {sub.name}
                                      </span>
                                      {sub.description && (
                                        <p className={mobileDescriptionStyles}>
                                          {sub.description}
                                        </p>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={item.link}
                    variants={itemVariants}
                    custom={idx}
                  >
                    <Link
                      href={localeData.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`${mobileLinkStyles} block ${
                        active ? mobileLinkStylesActive : ""
                      }`}
                    >
                      <span>{localeData.name}</span>
                      {localeData.description && (
                        <p className={mobileDescriptionStyles}>
                          {localeData.description}
                        </p>
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {SITE_CONFIG.i18n.languageSwitcher.showOnMobile && (
                <div className="flex items-center gap-3 pt-12 pb-6">
                  {locales.map((loc, i) => (
                    <motion.button
                      key={loc}
                      variants={itemVariants}
                      custom={NAVIGATION_LINKS.length + i}
                      onClick={() => {
                        handleLanguageChange(loc, router, pathname);
                        setMobileMenuOpen(false);
                      }}
                      aria-current={locale === loc ? "true" : undefined}
                      className={`flex items-center gap-2 py-2 px-4 rounded-full border text-sm transition-colors ${
                        locale === loc
                          ? "border-brand-primary text-brand-primary bg-brand-card"
                          : "border-black/20 text-black hover:border-black"
                      }`}
                    >
                      <Globe className="h-4 w-4" />
                      <span className="font-medium">{localeNames[loc]}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              <motion.div
                variants={itemVariants}
                custom={NAVIGATION_LINKS.length + locales.length}
                className="flex flex-col gap-3 pt-3"
              >
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
                      size="lg"
                    >
                      {localeData.name}
                    </Button>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Drag-to-close handle, pinned to drawer bottom */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(_e, { offset, velocity }) => {
            if (offset.y < -50 || velocity.y < -500) {
              setMobileMenuOpen(false);
            }
          }}
          className="flex h-8 shrink-0 cursor-grab items-center justify-center bg-brand-bg touch-none active:cursor-grabbing"
          aria-hidden="true"
          key="drag-handle"
        >
          <div className="h-1 w-16 rounded-full bg-black/30" />
        </motion.div>
      </motion.div>
    </>
  );
}
