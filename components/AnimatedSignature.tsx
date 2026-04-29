"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useId } from "react";
import type { ReactNode } from "react";

/** Default useScroll offset — narrower than ["start end","end start"] (full traverse). */
const DEFAULT_SCROLL_OFFSET = ["start end", "start center"] as const;

/**
 * Maps scrollYProgress → animation progress (0–1). Smaller gap between bounds =
 * animation completes after less scrolling (duration/stagger props only subdivide this).
 */
const DEFAULT_SCROLL_SEGMENT: [number, number] = [0.5, 1];

function parseViewBox(viewBox: string): {
  minX: number;
  minY: number;
  width: number;
  height: number;
} {
  const parts = viewBox
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) {
    return { minX: 0, minY: 0, width: 100, height: 100 };
  }
  return { minX: parts[0], minY: parts[1], width: parts[2], height: parts[3] };
}

interface AnimatedSignatureProps {
  paths?: string[]; // Array of SVG path data
  src?: string;
  /** Wrap all paths (e.g. frame translate). */
  outerTransform?: string;
  /** Per-path `<g transform>` matching export transforms. */
  pathTransforms?: (string | undefined)[];
  viewBox?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  fillRule?: "nonzero" | "evenodd";
  duration?: number;
  delay?: number;
  stagger?: number;
  /**
   * `overlap`: paths can draw concurrently (controlled by stagger + duration).
   * `sequential`: each path completes before the next starts (spread across `duration`).
   */
  timeline?: "overlap" | "sequential";
  /** Map a slice of scrollYProgress (0–1) to full draw progress (0–1). Tighter = less scroll. */
  scrollSegment?: [number, number];
  className?: string;
}

export function AnimatedSignature({
  paths = [],
  src,
  outerTransform,
  pathTransforms,
  viewBox = "0 0 1869.17 491.02",
  width = 220,
  height = 60,
  strokeWidth = 0,
  strokeColor = "#f7f8f8",
  fillColor = "#f7f8f8",
  fillRule = "nonzero",
  duration = 2.5,
  delay = 0,
  stagger = 0.2,
  timeline = "overlap",
  scrollSegment = DEFAULT_SCROLL_SEGMENT,
  className = "",
}: AnimatedSignatureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const maskId = useId();
  const { minX, minY, width: vbW, height: vbH } = parseViewBox(viewBox);

  /** Outline mode: thin stroke outline. Else: thick mask corridor reveals filled silhouette. */
  const strokeRevealMode = fillColor === "none";

  const resolvedStrokeWidth = strokeRevealMode
    ? strokeWidth > 0
      ? strokeWidth
      : 2
    : strokeWidth > 0
      ? strokeWidth
      : 1.35;

  const maskRevealStrokeWidth = strokeRevealMode
    ? strokeWidth > 0
      ? strokeWidth
      : 1
    : Math.min(Math.max(Math.max(vbW, vbH) * 0.28, 42), 80);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [...DEFAULT_SCROLL_OFFSET],
  });

  const signatureProgress = useTransform(
    scrollYProgress,
    [scrollSegment[0], scrollSegment[1]],
    [0, 1],
    { clamp: true },
  );

  const n = paths.length;
  /** Scroll-timeline denominator (dimensionless weights, same as before). */
  const totalDuration =
    timeline === "sequential" && n > 0
      ? delay + duration
      : duration + delay + Math.max(n - 1, 0) * stagger;

  // Create pathLength transforms — sequential = one-after-another slices of scroll
  const pathLengths = paths.map((_, index) => {
    let pathStart: number;
    let pathEnd: number;
    if (timeline === "sequential" && n > 0) {
      const segment = duration / n;
      pathStart = (delay + index * segment) / totalDuration;
      pathEnd = (delay + (index + 1) * segment) / totalDuration;
    } else {
      pathStart = (delay + index * stagger) / totalDuration;
      pathEnd = pathStart + duration / totalDuration;
    }
    return useTransform(signatureProgress, [pathStart, pathEnd], [0, 1]);
  });

  const pathOpacities = paths.map((_, index) => {
    let pathStart: number;
    let pathEnd: number;
    if (timeline === "sequential" && n > 0) {
      const segment = duration / n;
      pathStart = (delay + index * segment) / totalDuration;
      pathEnd = (delay + (index + 1) * segment) / totalDuration;
    } else {
      pathStart = (delay + index * stagger) / totalDuration;
      pathEnd = pathStart + duration / totalDuration;
    }
    const fadeEnd = Math.min(pathStart + 0.04, pathEnd);
    return useTransform(signatureProgress, [pathStart, fadeEnd], [0, 1]);
  });

  // Fade in the entire signature as it starts drawing
  const opacity = useTransform(signatureProgress, [0, 0.1], [0, 1]);
  const imageClip = useTransform(
    signatureProgress,
    [0, 0.85],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  if (src) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ opacity, clipPath: imageClip }}
      >
        <Image
          src={src}
          alt=""
          width={width}
          height={height}
          className="h-auto w-full"
          unoptimized
        />
      </motion.div>
    );
  }

  /** Same transform tree as visible strokes — required for mask alignment. */
  function transformTree(renderPath: (index: number) => ReactNode): ReactNode {
    const inner = paths.map((_, index) => {
      const pt = pathTransforms?.[index];
      const node = renderPath(index);
      return pt ? (
        <g key={index} transform={pt}>
          {node}
        </g>
      ) : (
        node
      );
    });
    return outerTransform ? <g transform={outerTransform}>{inner}</g> : inner;
  }

  return (
    <div ref={ref} className={className}>
      <motion.svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maxWidth: width,
          width: "100%",
          height: "auto",
          opacity,
        }}
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
            x={minX}
            y={minY}
            width={vbW}
            height={vbH}
          >
            <rect x={minX} y={minY} width={vbW} height={vbH} fill="black" />
            {transformTree((index) => (
              <motion.path
                key={index}
                d={paths[index]}
                stroke="white"
                strokeWidth={maskRevealStrokeWidth}
                strokeLinecap="butt"
                strokeLinejoin="round"
                fill="none"
                fillRule={fillRule}
                style={{
                  pathLength: pathLengths[index],
                  opacity: pathOpacities[index],
                }}
              />
            ))}
          </mask>
        </defs>
        <g mask={`url(#${maskId})`}>
          {transformTree((index) => (
            <path
              key={index}
              d={paths[index]}
              stroke={strokeColor}
              strokeWidth={resolvedStrokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={strokeRevealMode ? "none" : fillColor}
              fillRule={strokeRevealMode ? "nonzero" : fillRule}
            />
          ))}
        </g>
      </motion.svg>
    </div>
  );
}
