"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const VELLO_EVENT_NAME = "vello:open";
const VELLO_LANGS = ["fi", "en", "sv", "de", "fr"];

export default function VelloModal() {
  const [isOpen, setIsOpen] = useState(false);
  const embedContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const locale = useLocale();
  const t = useTranslations("component.a11y");

  useEffect(() => {
    const openModal = () => setIsOpen(true);
    window.addEventListener(VELLO_EVENT_NAME, openModal);

    return () => window.removeEventListener(VELLO_EVENT_NAME, openModal);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const container = embedContainerRef.current;
    if (!isOpen || !container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://static.vello.fi/embed/v1.js";
    script.async = true;
    script.setAttribute("data-url", "norasoini");
    script.setAttribute(
      "data-lang",
      VELLO_LANGS.includes(locale) ? locale : "fi",
    );

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [isOpen, locale]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("bookingDialog")}
        className="relative w-full max-w-4xl max-h-[90dvh] overflow-y-auto rounded-2xl bg-white p-6 pt-14 md:p-8 md:pt-14"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-2 min-h-11 min-w-11 px-3 rounded-lg text-black/70 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
        >
          {t("close")}
        </button>
        <div ref={embedContainerRef} />
      </div>
    </div>
  );
}
