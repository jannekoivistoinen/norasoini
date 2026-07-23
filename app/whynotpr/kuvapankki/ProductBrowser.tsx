"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ProductListItem } from "@/lib/whynotpr/products";
import ProductImage from "./ProductImage";

function FilterSelect({
  value,
  onChange,
  allLabel,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  allLabel: string;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-[var(--wnp-line)] bg-[var(--wnp-surface)] py-2.5 pl-4 pr-11 outline-none focus:border-[var(--wnp-accent)] sm:w-auto"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--wnp-muted)]"
      >
        <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function ProductBrowser({
  products,
  brands,
  categories,
}: {
  products: ProductListItem[];
  brands: string[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (brand && p.brand !== brand) return false;
      if (category && !p.categories.includes(category)) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categories.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [products, query, brand, category]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Hae tuotetta…"
          className="w-full rounded-lg border border-[var(--wnp-line)] bg-[var(--wnp-surface)] px-4 py-2.5 outline-none focus:border-[var(--wnp-accent)] sm:max-w-xs"
        />
        <FilterSelect
          value={brand}
          onChange={setBrand}
          allLabel="Kaikki brändit"
          options={brands}
        />
        <FilterSelect
          value={category}
          onChange={setCategory}
          allLabel="Kaikki kategoriat"
          options={categories}
        />
      </div>

      <p className="mb-4 text-xs text-[var(--wnp-muted)]">
        {filtered.length} / {products.length} tuotetta
      </p>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-[var(--wnp-muted)]">
          Ei tuloksia haulle.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <li key={p.id} className="wnp-product-card h-full">
              <Link
                href={`/kuvapankki/${p.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--wnp-line)] bg-[var(--wnp-surface)] transition-shadow hover:shadow-md"
              >
                <div className="aspect-square p-8">
                  <div className="relative h-full w-full">
                    <ProductImage src={p.image} alt={p.name} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3">
                  <p className="text-xs uppercase tracking-wide text-[var(--wnp-muted)]">
                    {p.brand}
                  </p>
                  <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm">
                    {p.name}
                  </p>
                  <p className="mt-auto pt-1 text-sm text-[var(--wnp-muted)]">
                    {p.price || " "}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
