import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="bg-brand-primary text-brand-footer-text py-[15vh] px-6 text-center">
      <h2 className="font-heading italic text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 max-w-2xl mx-auto">
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
          ) : onPrimaryClick ? (
            <Button key={i} variant="terminal" onClick={onPrimaryClick}>
              {btn.label}
            </Button>
          ) : (
            <Button key={i} asChild variant="terminal">
              <Link href={btn.href}>{btn.label}</Link>
            </Button>
          ),
        )}
      </div>
    </div>
  );
}
