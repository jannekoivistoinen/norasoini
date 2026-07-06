"use client";

import Image from "next/image";
import { useState } from "react";

// next/image with a graceful fallback for filenames that aren't synced yet
// (the Drive folder may be incomplete or have name mismatches).
export default function ProductImage({
  src,
  alt,
  sizes,
  priority,
}: {
  src?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[var(--wnp-line)] text-xs text-[var(--wnp-muted)]">
        Ei kuvaa
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
      priority={priority}
      className="object-contain"
      onError={() => setFailed(true)}
    />
  );
}
