"use client";

import { useEffect } from "react";

export default function KuvapankkiError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-16 text-center">
      <h2 className="text-xl font-medium tracking-tighter">
        Tuotteita ei voitu ladata
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-[var(--wnp-muted)]">
        Tuotetiedot eivät ole juuri nyt saatavilla. Yritä hetken kuluttua
        uudelleen.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-[var(--wnp-accent)] px-6 py-2.5 text-sm font-medium text-[var(--wnp-accent-ink)] transition-opacity hover:opacity-90"
      >
        Yritä uudelleen
      </button>
    </div>
  );
}
