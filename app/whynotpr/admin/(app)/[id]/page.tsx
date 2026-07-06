import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/app/whynotpr/ArrowIcon";
import { fetchAdminProduct } from "@/lib/whynotpr/products";
import PhotoEditor from "./PhotoEditor";

export default async function AdminEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchAdminProduct(id);
  if (!product) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="group inline-flex items-center gap-2 text-sm text-[var(--wnp-muted)] hover:text-[var(--wnp-ink)]"
      >
        <ArrowLeftIcon />
        Kaikki tuotteet
      </Link>
      <div className="mt-4 mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--wnp-muted)]">
          {product.brand}
        </p>
        <h1 className="mt-1 text-2xl font-medium tracking-tighter">
          {product.name}
        </h1>
      </div>
      <PhotoEditor product={product} />
    </div>
  );
}
