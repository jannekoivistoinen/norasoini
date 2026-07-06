"use client";

import { useState } from "react";
import ProductImage from "../ProductImage";

function filenameOf(url: string): string {
  try {
    return decodeURIComponent(url.split("/").pop() ?? "kuva");
  } catch {
    return "kuva";
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function download(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Lataus epäonnistui (${res.status})`);
  }
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filenameOf(url);
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
}

async function downloadAll(urls: string[]) {
  for (const url of urls) {
    await download(url);
    await wait(300);
  }
}

export default function Gallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const current = images[active];

  async function runDownload(task: () => Promise<void>) {
    setPending(true);
    setError(null);
    try {
      await task();
    } catch {
      setError("Kuvan lataus epäonnistui. Yritä uudelleen.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-xl border border-[var(--wnp-line)] bg-[var(--wnp-surface)] p-6">
        <div className="relative h-full w-full">
          <ProductImage
            src={current}
            alt={alt}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {images.length > 1 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {images.map((img, i) => (
            <li key={img}>
              <button
                onClick={() => setActive(i)}
                aria-label={`Kuva ${i + 1}`}
                className={`h-16 w-16 overflow-hidden rounded-lg border bg-[var(--wnp-surface)] p-1.5 ${
                  i === active
                    ? "border-[var(--wnp-accent)]"
                    : "border-[var(--wnp-line)]"
                }`}
              >
                <div className="relative h-full w-full">
                  <ProductImage
                    src={img}
                    alt={`${alt} – kuva ${i + 1}`}
                    sizes="64px"
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {images.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-3 text-sm">
            <button
              type="button"
              disabled={pending || !current}
              onClick={() => current && runDownload(() => download(current))}
              className="rounded-full bg-[var(--wnp-accent)] px-5 py-2 font-medium text-[var(--wnp-accent-ink)] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Lataa tämä kuva
            </button>
            {images.length > 1 && (
              <button
                type="button"
                disabled={pending}
                onClick={() => runDownload(() => downloadAll(images))}
                className="rounded-full border border-[var(--wnp-line)] px-5 py-2 transition-colors hover:border-[var(--wnp-accent)] disabled:opacity-50"
              >
                Lataa kaikki ({images.length})
              </button>
            )}
          </div>
          {error && (
            <p className="mt-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
