import Link from "next/link";

interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface TerminalCTAProps {
  title: string;
  paragraph: string;
  buttons: CTAButton[];
}

export default function TerminalCTA({
  title,
  paragraph,
  buttons,
}: TerminalCTAProps) {
  return (
    <section className="bg-brand-primary text-brand-footer-text py-[15vh] px-6 text-center">
      <h2 className="font-heading italic text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 max-w-2xl mx-auto">
        {title}
      </h2>
      <p className="text-brand-footer-text/80 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
        {paragraph}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {buttons.map((btn, i) =>
          btn.variant === "secondary" ? (
            <Link
              key={i}
              href={btn.href}
              className="inline-block border border-brand-footer-text text-brand-footer-text text-sm px-6 py-3 rounded-full bg-transparent hover:bg-brand-footer-text/10 transition"
            >
              {btn.label}
            </Link>
          ) : (
            <Link
              key={i}
              href={btn.href}
              className="inline-block bg-brand-footer-text text-brand-primary text-sm px-6 py-3 rounded-full border border-brand-footer-text hover:opacity-90 transition"
            >
              {btn.label}
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
