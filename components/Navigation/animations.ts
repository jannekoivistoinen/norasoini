import type { Variants } from "motion/react";

// The outer container's only job is to propagate the hidden/visible states to
// its descendants. Each item declares its own ordered delay via `custom`
// (itemVariants below), so the sequence is fully deterministic even when
// children are grouped by layout wrappers.
export const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

// Step between items in seconds — tweak here to retune tempo globally.
export const ITEM_DELAY_STEP = 0.1;

// Base delay matching the drawer slide-in duration so items only start
// fading in once the drawer is fully visible (drawer uses overflow-hidden,
// so any animation that runs while it is above the viewport is invisible).
export const ITEM_DELAY_BASE = 0.3;

// Soft ease-out curve (roughly quintic out) — long, graceful tail.
const EASE_OUT_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ITEM_DURATION = 0.55;

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    transition: {
      duration: ITEM_DURATION,
      ease: EASE_OUT_SOFT,
    },
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        duration: ITEM_DURATION,
        ease: EASE_OUT_SOFT,
        delay: ITEM_DELAY_BASE + i * ITEM_DELAY_STEP,
      },
      y: {
        duration: ITEM_DURATION * 0.75,
        ease: EASE_OUT_SOFT,
        delay: ITEM_DELAY_BASE + i * ITEM_DELAY_STEP,
      },
    },
  }),
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
