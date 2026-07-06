"use client";

import { useMemo, useState } from "react";
import type { AdminImage, AdminProduct } from "@/lib/whynotpr/products";
import ProductImage from "@/app/whynotpr/showroom/ProductImage";
import { ArrowLeftIcon, ArrowRightIcon } from "@/app/whynotpr/ArrowIcon";

type Img = { filename: string; url: string };

export default function PhotoEditor({ product }: { product: AdminProduct }) {
  const initial = useMemo(
    () => ({
      visible: product.images.filter((i) => !i.hidden).map(strip),
      hidden: product.images.filter((i) => i.hidden).map(strip),
    }),
    [product.images],
  );

  const [visible, setVisible] = useState<Img[]>(initial.visible);
  const [hidden, setHidden] = useState<Img[]>(initial.hidden);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const dirty =
    keys(visible) !== keys(initial.visible) ||
    keys(hidden) !== keys(initial.hidden);

  function touch() {
    setSaved(false);
  }

  function move(index: number, delta: number) {
    setVisible((prev) => {
      const next = [...prev];
      const target = index + delta;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    touch();
  }

  function setMain(index: number) {
    setVisible((prev) => {
      if (index === 0) return prev;
      const next = [...prev];
      const [item] = next.splice(index, 1);
      next.unshift(item);
      return next;
    });
    touch();
  }

  function hide(index: number) {
    setVisible((prev) => {
      const next = [...prev];
      const [item] = next.splice(index, 1);
      setHidden((h) => [...h, item]);
      return next;
    });
    touch();
  }

  function restore(index: number) {
    setHidden((prev) => {
      const next = [...prev];
      const [item] = next.splice(index, 1);
      setVisible((v) => [...v, item]);
      return next;
    });
    touch();
  }

  async function save() {
    setSaving(true);
    const res = await fetch("/api/whynotpr/admin/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: product.id,
        order: visible.map((i) => i.filename),
        hidden: hidden.map((i) => i.filename),
      }),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
    else alert("Tallennus epäonnistui. Yritä uudelleen.");
  }

  return (
    <div className="pb-24">
      <h2 className="text-lg font-medium tracking-tighter">
        Näkyvät kuvat ({visible.length})
      </h2>
      <p className="mb-3 mt-1 text-xs text-[var(--wnp-muted)]">
        Ensimmäinen kuva on pääkuva (näkyy tuotelistassa).
      </p>
      {visible.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[var(--wnp-line)] p-6 text-sm text-[var(--wnp-muted)]">
          Ei näkyviä kuvia.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((img, i) => (
            <li
              key={img.filename}
              className="overflow-hidden rounded-xl border border-[var(--wnp-line)] bg-[var(--wnp-surface)]"
            >
              <div className="relative aspect-square p-8">
                <div className="relative h-full w-full">
                  <ProductImage src={img.url} alt="" />
                </div>
                {i === 0 && (
                  <span className="absolute left-2 top-2 rounded-full bg-[var(--wnp-accent)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--wnp-accent-ink)]">
                    Pääkuva
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1 border-t border-[var(--wnp-line)] p-2 text-xs">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Siirrä taakse"
                  className="group rounded px-2 py-1 hover:bg-[var(--wnp-line)] disabled:opacity-30"
                >
                  <ArrowLeftIcon />
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === visible.length - 1}
                  aria-label="Siirrä eteen"
                  className="group rounded px-2 py-1 hover:bg-[var(--wnp-line)] disabled:opacity-30"
                >
                  <ArrowRightIcon />
                </button>
                {i !== 0 && (
                  <button
                    onClick={() => setMain(i)}
                    className="rounded px-2 py-1 hover:bg-[var(--wnp-line)]"
                  >
                    Pääkuvaksi
                  </button>
                )}
                <button
                  onClick={() => hide(i)}
                  className="ml-auto rounded px-2 py-1 text-red-700 hover:bg-red-50"
                >
                  Piilota
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {hidden.length > 0 && (
        <>
          <h2 className="mt-10 text-sm font-medium">
            Piilotetut kuvat ({hidden.length})
          </h2>
          <p className="mb-3 mt-1 text-xs text-[var(--wnp-muted)]">
            Eivät näy showroomissa eivätkä latauksissa. Tiedostoja ei poisteta.
          </p>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {hidden.map((img, i) => (
              <li
                key={img.filename}
                className="overflow-hidden rounded-xl border border-[var(--wnp-line)] bg-[var(--wnp-surface)] opacity-70"
              >
                <div className="aspect-square p-8">
                  <div className="relative h-full w-full grayscale">
                    <ProductImage src={img.url} alt="" />
                  </div>
                </div>
                <div className="border-t border-[var(--wnp-line)] p-2 text-xs">
                  <button
                    onClick={() => restore(i)}
                    className="rounded px-2 py-1 hover:bg-[var(--wnp-line)]"
                  >
                    Näytä uudelleen
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="fixed inset-x-0 bottom-0 border-t border-[var(--wnp-line)] bg-[var(--wnp-bg)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-4 px-6 py-3">
          {saved && (
            <span className="text-sm text-[var(--wnp-muted)]">
              Tallennettu ✓
            </span>
          )}
          <button
            onClick={save}
            disabled={!dirty || saving}
            className="rounded-full bg-[var(--wnp-accent)] px-6 py-2.5 text-sm font-medium text-[var(--wnp-accent-ink)] transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {saving ? "Tallennetaan…" : "Tallenna muutokset"}
          </button>
        </div>
      </div>
    </div>
  );
}

function strip(i: AdminImage): Img {
  return { filename: i.filename, url: i.url };
}

function keys(list: Img[]): string {
  return list.map((i) => i.filename).join("|");
}
