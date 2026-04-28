"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useId } from "react";

interface AnimatedSignatureProps {
  paths: string[]; // Array of SVG path data
  viewBox?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  className?: string;
}

export function AnimatedSignature({
  paths,
  viewBox = "0 0 1869.17 491.02",
  width = 220,
  height = 60,
  strokeWidth = 0,
  strokeColor = "#f7f8f8",
  fillColor = "#f7f8f8",
  duration = 2.5,
  delay = 0,
  stagger = 0.2,
  className = "",
}: AnimatedSignatureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const maskId = useId();

  const maskStrokeWidth =
    fillColor === "none"
      ? strokeWidth > 0
        ? strokeWidth
        : 1
      : strokeWidth || 2;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 1", "end start"],
  });

  // Calculate total animation duration including stagger
  const totalDuration = duration + delay + (paths.length - 1) * stagger;

  // Create pathLength transforms for each path with stagger
  const pathLengths = paths.map((_, index) => {
    const pathStart = (delay + index * stagger) / totalDuration;
    const pathEnd = pathStart + duration / totalDuration;
    return useTransform(scrollYProgress, [pathStart, pathEnd], [0, 1]);
  });

  // Create opacity for each path (fade in right before it starts drawing)
  const pathOpacities = paths.map((_, index) => {
    const pathStart = (delay + index * stagger) / totalDuration;
    const fadeStart = Math.max(0, pathStart - 0.05);
    const fadeEnd = pathStart + 0.05;
    return useTransform(scrollYProgress, [fadeStart, fadeEnd], [0, 1]);
  });

  // Fade in the entire signature as it starts drawing
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

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
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            {paths.map((pathData, index) => (
              <motion.path
                key={index}
                d={pathData}
                stroke="white"
                strokeWidth={maskStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{
                  pathLength: pathLengths[index],
                  opacity: pathOpacities[index],
                }}
              />
            ))}
          </mask>
        </defs>
        {paths.map((pathData, index) => (
          <path
            key={index}
            d={pathData}
            stroke={strokeColor}
            strokeWidth={fillColor === "none" ? maskStrokeWidth : strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={fillColor === "none" ? "none" : fillColor}
            vectorEffect="non-scaling-stroke"
            mask={`url(#${maskId})`}
          />
        ))}
      </motion.svg>
    </div>
  );
}
