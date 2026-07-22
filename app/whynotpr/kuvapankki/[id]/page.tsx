import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/app/whynotpr/ArrowIcon";
import { fetchProduct } from "@/lib/whynotpr/products";
import Gallery from "./Gallery";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(id);
  if (!product) notFound();

  return (
    <article>
      <Link
        href="/kuvapankki"
        className="group inline-flex items-center gap-2 text-sm text-[var(--wnp-muted)] hover:text-[var(--wnp-ink)]"
      >
        <ArrowLeftIcon />
        Kaikki tuotteet
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-2">
          <Gallery images={product.images} alt={product.name} />
        </div>

        <div className="md:col-span-2 lg:col-span-1">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--wnp-muted)]">
            {product.brand}
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tighter">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 text-sm text-[var(--wnp-muted)]">
            {product.price && (
              <span className="text-base text-[var(--wnp-ink)]">
                {product.price}
              </span>
            )}
            {product.priceWithoutTax && (
              <span>({product.priceWithoutTax} alv 0%)</span>
            )}
          </div>

          {product.categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[var(--wnp-line)] px-3 py-1 text-xs text-[var(--wnp-muted)]"
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          {product.descriptionHtml && (
            <div
              className="wnp-prose mt-6 text-sm"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}

          {product.informationHtml && (
            <details className="mt-6 border-t border-[var(--wnp-line)] pt-4">
              <summary className="cursor-pointer text-sm font-medium">
                Brändistä
              </summary>
              <div
                className="wnp-prose mt-3 text-sm"
                dangerouslySetInnerHTML={{ __html: product.informationHtml }}
              />
            </details>
          )}

          {product.supplierCode && (
            <p className="mt-6 text-xs text-[var(--wnp-muted)]">
              Tuotekoodi: {product.supplierCode}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
