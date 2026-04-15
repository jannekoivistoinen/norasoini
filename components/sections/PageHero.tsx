import Link from "next/link";

interface PageHeroProps {
  heading: string;
  ingress?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function PageHero({
  heading,
  ingress,
  ctaLabel,
  ctaHref,
}: PageHeroProps) {
  return (
    <section className="px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center max-w-[1200px] mx-auto">
      <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl mx-auto text-balance">
        {heading}
      </h1>
      {ingress ? (
        <p className="mt-8 max-w-[682px] mx-auto text-sm md:text-base text-black/70 leading-relaxed">
          {ingress}
        </p>
      ) : null}
      {ctaLabel && ctaHref ? (
        <div className="mt-10">
          <Link
            href={ctaHref}
            className="inline-block bg-brand-primary text-white text-sm px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </section>
  );
}
