"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AdminProduct } from "@/lib/whynotpr/products";
import ProductImage from "@/app/whynotpr/showroom/ProductImage";

export default function AdminProductList({
  products,
}: {
  products: AdminProduct[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
    );
  }, [products, query]);

  return (
    <>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Hae tuotetta…"
        className="mb-6 w-full rounded-lg border border-[var(--wnp-line)] bg-[var(--wnp-surface)] px-4 py-2.5 outline-none focus:border-[var(--wnp-accent)] sm:max-w-xs"
      />

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => {
          const visible = p.images.filter((i) => !i.hidden);
          const hiddenCount = p.images.length - visible.length;
          return (
            <li key={p.id} className="h-full">
              <Link
                href={`/admin/${p.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--wnp-line)] bg-[var(--wnp-surface)] transition-shadow hover:shadow-md"
              >
                <div className="aspect-square p-8">
                  <div className="relative h-full w-full">
                    <ProductImage src={visible[0]?.url} alt={p.name} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3">
                  <p className="text-xs uppercase tracking-wide text-[var(--wnp-muted)]">
                    {p.brand}
                  </p>
                  <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm">
                    {p.name}
                  </p>
                  <p className="mt-auto pt-1 text-xs text-[var(--wnp-muted)]">
                    {visible.length} kuvaa
                    {hiddenCount > 0 ? ` · ${hiddenCount} piilotettu` : ""}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
