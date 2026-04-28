"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { openVelloModal } from "@/lib/openVelloModal";

interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface TerminalCTAProps {
  title: string;
  paragraph: string;
  buttons: CTAButton[];
  onPrimaryClick?: () => void;
}

export default function TerminalCTA({
  title,
  paragraph,
  buttons,
  onPrimaryClick,
}: TerminalCTAProps) {
  return (
    <div className="terminal-cta bg-brand-primary text-brand-footer-text py-12 md:py-[15vh] px-6 text-center">
      <h2 className="mb-3 md:mb-6 max-w-2xl mx-auto text-3xl md:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="text-brand-footer-text/80 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
        {paragraph}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {buttons.map((btn, i) =>
          btn.variant === "secondary" ? (
            <Button key={i} asChild variant="terminal-outline">
              <Link href={btn.href}>{btn.label}</Link>
            </Button>
          ) : (
            <Button
              key={i}
              variant="terminal"
              onClick={onPrimaryClick ?? openVelloModal}
            >
              {btn.label}
            </Button>
          ),
        )}
      </div>
    </div>
  );
}
