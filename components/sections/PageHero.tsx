"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  heading: string;
  ingress?: string;
  headingClassName?: string;
  ingressClassName?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

// The h1 is the LCP element: keep it visible in the server HTML and only
// slide it in, so it never depends on JS to become readable.
const headingAnim = {
  initial: { y: 14 },
  animate: { y: 0 },
  transition: {
    duration: 0.75,
    delay: 0.05,
    ease: [0.25, 0.1, 0.25, 1] as const,
  },
};

const heroAnim = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] as const },
});

export default function PageHero({
  heading,
  ingress,
  headingClassName,
  ingressClassName,
  ctaLabel,
  ctaHref,
  onCtaClick,
}: PageHeroProps) {
  return (
    <section className="px-6 pt-12 pb-12 md:pt-24 md:pb-28 md:text-center max-w-[1200px] md:mx-auto">
      <motion.h1 {...headingAnim} className={headingClassName}>
        {heading}
      </motion.h1>
      {ingress ? (
        <motion.p
          {...heroAnim(0.18)}
          className={cn(
            "mt-6 md:mt-8 max-w-[682px] mx-auto  text-black/70",
            ingressClassName,
          )}
        >
          {ingress}
        </motion.p>
      ) : null}
      {ctaLabel && ctaHref ? (
        <motion.div {...heroAnim(0.3)} className="mt-8 md:mt-10">
          {onCtaClick ? (
            <Button onClick={onCtaClick}>{ctaLabel}</Button>
          ) : (
            <Button asChild>
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          )}
        </motion.div>
      ) : null}
    </section>
  );
}
