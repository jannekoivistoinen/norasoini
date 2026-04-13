import type { Variants } from "motion/react";

export const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.07,
      delayChildren: 0.0,
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      ease: "easeOut",
    },
  },
};

// Animation variants for bottom elements
export const bottomElementsVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      delay,
    },
  }),
};
