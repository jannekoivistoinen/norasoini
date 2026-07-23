"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
  type Transition,
} from "motion/react";
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

type SharedSignatureProps = {
  paths: string[];
  src?: string;
  outerTransform?: string;
  pathTransforms?: (string | undefined)[];
  viewBox: string;
  width: number;
  height: number;
  strokeWidth: number;
  strokeColor: string;
  fillColor: string;
  fillRule: "nonzero" | "evenodd";
  className: string;
};

type PathTiming = { pathStart: number; pathEnd: number; fadeEnd: number };

function pathTimings(
  n: number,
  duration: number,
  delay: number,
  stagger: number,
  timeline: "overlap" | "sequential",
): PathTiming[] {
  const totalDuration =
    timeline === "sequential" && n > 0
      ? delay + duration
      : duration + delay + Math.max(n - 1, 0) * stagger;

  return Array.from({ length: n }, (_, index) => {
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
    return { pathStart, pathEnd, fadeEnd };
  });
}

function SignatureSvg({
  paths,
  outerTransform,
  pathTransforms,
  viewBox,
  width,
  height,
  strokeWidth,
  strokeColor,
  fillColor,
  fillRule,
  className,
  maskId,
  minX,
  minY,
  vbW,
  vbH,
  resolvedStrokeWidth,
  maskRevealStrokeWidth,
  strokeRevealMode,
  renderMaskPath,
  svgOpacity = 1,
  svgOpacityMotion,
}: SharedSignatureProps & {
  maskId: string;
  minX: number;
  minY: number;
  vbW: number;
  vbH: number;
  resolvedStrokeWidth: number;
  maskRevealStrokeWidth: number;
  strokeRevealMode: boolean;
  renderMaskPath: (index: number) => ReactNode;
  svgOpacity?: number;
  svgOpacityMotion?: MotionValue<number>;
}) {
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
    <div className={className}>
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
          opacity: svgOpacityMotion ?? svgOpacity,
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
            {transformTree(renderMaskPath)}
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

function resolveStrokeMetrics(
  strokeWidth: number,
  fillColor: string,
  vbW: number,
  vbH: number,
) {
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
  return { strokeRevealMode, resolvedStrokeWidth, maskRevealStrokeWidth };
}

interface AnimatedSignatureProps {
  paths?: string[];
  src?: string;
  outerTransform?: string;
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
  timeline?: "overlap" | "sequential";
  scrollSegment?: [number, number];
  scrollOffset?: NonNullable<Parameters<typeof useScroll>[0]>["offset"];
  /** Scroll-driven (long pages) or time-driven when element enters view. */
  playMode?: "scroll" | "inView";
  className?: string;
}

function ScrollAnimatedSignature({
  paths,
  src,
  outerTransform,
  pathTransforms,
  viewBox,
  width,
  height,
  strokeWidth,
  strokeColor,
  fillColor,
  fillRule,
  duration,
  delay,
  stagger,
  timeline,
  scrollSegment,
  scrollOffset,
  className,
}: Required<
  Pick<
    AnimatedSignatureProps,
    | "paths"
    | "viewBox"
    | "width"
    | "height"
    | "strokeWidth"
    | "strokeColor"
    | "fillColor"
    | "fillRule"
    | "duration"
    | "delay"
    | "stagger"
    | "timeline"
    | "scrollSegment"
    | "scrollOffset"
    | "className"
  >
> &
  Pick<AnimatedSignatureProps, "src" | "outerTransform" | "pathTransforms">) {
  const ref = useRef<HTMLDivElement>(null);
  const maskId = useId();
  const { minX, minY, width: vbW, height: vbH } = parseViewBox(viewBox);
  const { strokeRevealMode, resolvedStrokeWidth, maskRevealStrokeWidth } =
    resolveStrokeMetrics(strokeWidth, fillColor, vbW, vbH);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: scrollOffset,
  });

  const signatureProgress = useTransform(
    scrollYProgress,
    [scrollSegment[0], scrollSegment[1]],
    [0, 1],
    { clamp: true },
  );

  const timings = pathTimings(paths.length, duration, delay, stagger, timeline);
  const pathLengths = timings.map(({ pathStart, pathEnd }) =>
    useTransform(signatureProgress, [pathStart, pathEnd], [0, 1]),
  );
  const pathOpacities = timings.map(({ pathStart, fadeEnd }) =>
    useTransform(signatureProgress, [pathStart, fadeEnd], [0, 1]),
  );
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

  return (
    <div ref={ref}>
      <SignatureSvg
        paths={paths}
        outerTransform={outerTransform}
        pathTransforms={pathTransforms}
        viewBox={viewBox}
        width={width}
        height={height}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor}
        fillColor={fillColor}
        fillRule={fillRule}
        className={className}
        maskId={maskId}
        minX={minX}
        minY={minY}
        vbW={vbW}
        vbH={vbH}
        resolvedStrokeWidth={resolvedStrokeWidth}
        maskRevealStrokeWidth={maskRevealStrokeWidth}
        strokeRevealMode={strokeRevealMode}
        svgOpacityMotion={opacity}
        renderMaskPath={(index) => (
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
        )}
      />
    </div>
  );
}

function InViewAnimatedSignature({
  paths,
  src,
  outerTransform,
  pathTransforms,
  viewBox,
  width,
  height,
  strokeWidth,
  strokeColor,
  fillColor,
  fillRule,
  duration,
  delay,
  stagger,
  timeline,
  className,
}: Required<
  Pick<
    AnimatedSignatureProps,
    | "paths"
    | "viewBox"
    | "width"
    | "height"
    | "strokeWidth"
    | "strokeColor"
    | "fillColor"
    | "fillRule"
    | "duration"
    | "delay"
    | "stagger"
    | "timeline"
    | "className"
  >
> &
  Pick<AnimatedSignatureProps, "src" | "outerTransform" | "pathTransforms">) {
  const ref = useRef<HTMLDivElement>(null);
  const maskId = useId();
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const { minX, minY, width: vbW, height: vbH } = parseViewBox(viewBox);
  const { strokeRevealMode, resolvedStrokeWidth, maskRevealStrokeWidth } =
    resolveStrokeMetrics(strokeWidth, fillColor, vbW, vbH);

  const n = paths.length;
  const totalDuration =
    timeline === "sequential" && n > 0
      ? delay + duration
      : duration + delay + Math.max(n - 1, 0) * stagger;

  function pathTransition(index: number): Transition {
    let pathDelay: number;
    let pathDuration: number;
    if (timeline === "sequential" && n > 0) {
      const segment = duration / n;
      pathDelay = delay + index * segment;
      pathDuration = segment;
    } else {
      pathDelay = delay + index * stagger;
      pathDuration = duration;
    }
    return {
      duration: pathDuration,
      delay: pathDelay,
      ease: "easeOut",
    };
  }

  if (src) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
        animate={
          inView
            ? { opacity: 1, clipPath: "inset(0 0% 0 0)" }
            : { opacity: 0, clipPath: "inset(0 100% 0 0)" }
        }
        transition={{ duration: totalDuration, ease: "easeOut" }}
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

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      >
        <SignatureSvg
          paths={paths}
          outerTransform={outerTransform}
          pathTransforms={pathTransforms}
          viewBox={viewBox}
          width={width}
          height={height}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          fillColor={fillColor}
          fillRule={fillRule}
          className={className}
          maskId={maskId}
          minX={minX}
          minY={minY}
          vbW={vbW}
          vbH={vbH}
          resolvedStrokeWidth={resolvedStrokeWidth}
          maskRevealStrokeWidth={maskRevealStrokeWidth}
          strokeRevealMode={strokeRevealMode}
          svgOpacity={1}
          renderMaskPath={(index) => (
            <motion.path
              key={index}
              d={paths[index]}
              stroke="white"
              strokeWidth={maskRevealStrokeWidth}
              strokeLinecap="butt"
              strokeLinejoin="round"
              fill="none"
              fillRule={fillRule}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
              }
              transition={pathTransition(index)}
            />
          )}
        />
      </motion.div>
    </div>
  );
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
  scrollOffset = [...DEFAULT_SCROLL_OFFSET],
  playMode = "scroll",
  className = "",
}: AnimatedSignatureProps) {
  const shared = {
    paths,
    src,
    outerTransform,
    pathTransforms,
    viewBox,
    width,
    height,
    strokeWidth,
    strokeColor,
    fillColor,
    fillRule,
    duration,
    delay,
    stagger,
    timeline,
    className,
  };

  if (playMode === "inView") {
    return <InViewAnimatedSignature {...shared} />;
  }

  return (
    <ScrollAnimatedSignature
      {...shared}
      scrollSegment={scrollSegment}
      scrollOffset={scrollOffset}
    />
  );
}
