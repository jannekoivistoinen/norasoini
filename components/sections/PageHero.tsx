import Link from "next/link";

interface PageHeroProps {
  heading: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function PageHero({ heading, ctaLabel, ctaHref }: PageHeroProps) {
  return (
    <section className="px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center max-w-[1200px] mx-auto">
      <h1 className="font-heading italic text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl mx-auto">
        {heading}
      </h1>
      {ctaLabel && ctaHref ? (
        <div className="mt-10">
          <Link
            href={ctaHref}
            className="inline-block bg-brand-primary text-white text-sm font-body px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </section>
  );
}
