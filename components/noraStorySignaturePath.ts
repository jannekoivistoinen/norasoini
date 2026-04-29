/** Three stroked paths (separate exports); composed in one view with per-path `translate`. */

/**
 * Layout from `public/signature3.svg`: each `<use>` x/y (raster) × (vector viewBox /
 * raster px) gives where that fragment sits in unified space vs the first glyph.
 */
export const noraStorySignatureViewBox = "0 0 150 113";

export const noraStorySignatureFillRule = "evenodd" as const;

/** Matches export: `stroke="color(display-p3 0.000 0.000 0.000)"` */
export const noraStorySignatureStrokeColor =
  "color(display-p3 0.000 0.000 0.000)" as const;

/** Design stroke width from SVG `stroke-width="4"` (user units). */
export const noraStorySignatureStrokeWidth = 3;

/** Stroke-only — use with `AnimatedSignature` `fillColor={noraStorySignatureFillColor}`. */
export const noraStorySignatureFillColor = "none";

export const noraStorySignaturePathTransforms = [
  undefined,
  "translate(64,65)",
  "translate(99,45)",
] as const;

export const noraStorySignaturePaths = [
  `M30.679 60.576C14.785 36.211 1.859 65.604 2 81.12c.143 15.516 8.017 31.043 23.325 29.759 15.309-1.285 27.492-28.07 28.077-43.084.05-1.278 7.794 44.476 4.682 34.44-3.112-10.035-13.58-27.679-16.422-62.45S61.44 4.466 72.756 1.952`,
  `M3.447 8.143c.319 10.653.856 25.314 6.759 22.634 5.903-2.681 5.39-29.264-2.214-28.769-9.404.613-6.861 21.287 1.597 23.895 4.524 1.395 9.59-19.483 14.498-18.733s1.205 27.527 8.7 14.495c.861-1.496 4.753-14.087 6.079-18.596`,
  `M11.06 19.727C-.82 14.771.05 41.218 7.551 41.624c5.553.3 6.444-17.379 3.962-21.63-.99-1.696.303 5.038.726 7.064.565 2.703.484 7.083 1.847 9.485 1.168 2.058 3.254 5.138 6.22 3.614C23.27 38.634 30.787 33.398 32.551.106`,
] as const;
