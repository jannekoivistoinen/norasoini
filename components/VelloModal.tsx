"use client";

import { useEffect, useRef, useState } from "react";

const VELLO_EVENT_NAME = "vello:open";

export default function VelloModal() {
  const [isOpen, setIsOpen] = useState(false);
  const embedContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openModal = () => setIsOpen(true);
    window.addEventListener(VELLO_EVENT_NAME, openModal);

    return () => window.removeEventListener(VELLO_EVENT_NAME, openModal);
  }, []);

  useEffect(() => {
    if (!isOpen || !embedContainerRef.current) return;

    embedContainerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://static.vello.fi/embed/v1.js";
    script.async = true;
    script.setAttribute("data-url", "norasoini");
    script.setAttribute("data-lang", "fi");

    embedContainerRef.current.appendChild(script);

    return () => {
      if (embedContainerRef.current) {
        embedContainerRef.current.innerHTML = "";
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white p-6 md:p-8">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4  text-black/70 hover:text-black"
          aria-label="Close booking modal"
        >
          Sulje
        </button>
        <div ref={embedContainerRef} />
      </div>
    </div>
  );
}
