"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface PageHeroProps {
  heading: string;
  ingress?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

const heroAnim = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export default function PageHero({
  heading,
  ingress,
  ctaLabel,
  ctaHref,
  onCtaClick,
}: PageHeroProps) {
  return (
    <section className="px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center max-w-[1200px] mx-auto">
      <motion.h1
        {...heroAnim(0.05)}
        className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl mx-auto text-balance"
      >
        {heading}
      </motion.h1>
      {ingress ? (
        <motion.p
          {...heroAnim(0.18)}
          className="mt-8 max-w-[682px] mx-auto text-sm md:text-base text-black/70 leading-relaxed"
        >
          {ingress}
        </motion.p>
      ) : null}
      {ctaLabel && ctaHref ? (
        <motion.div {...heroAnim(0.3)} className="mt-10">
          {onCtaClick ? (
            <button
              type="button"
              onClick={onCtaClick}
              className="inline-block bg-brand-primary text-white text-sm px-6 py-3 rounded-full hover:opacity-90 transition"
            >
              {ctaLabel}
            </button>
          ) : (
            <Link
              href={ctaHref}
              className="inline-block bg-brand-primary text-white text-sm px-6 py-3 rounded-full hover:opacity-90 transition"
            >
              {ctaLabel}
            </Link>
          )}
        </motion.div>
      ) : null}
    </section>
  );
}
