import { cache } from "react";
import { parseCsvToObjects } from "./csv";
import {
  IMAGE_BASE_PATH,
  PRODUCTS_CACHE_TAG,
  SHEET_CSV_URL,
  SHEET_REVALIDATE_SECONDS,
} from "./config";
import {
  applyOverride,
  getOverrides,
  hiddenFiles,
  type OverrideMap,
} from "./overrides";

export type Product = {
  id: string;
  name: string;
  brand: string;
  descriptionHtml: string;
  informationHtml: string;
  categories: string[]; // human-readable leaf categories
  imageFiles: string[]; // raw filenames from the sheet (full, unfiltered)
  images: string[]; // public URLs of visible images, ordered (override applied)
  price: string; // formatted, e.g. "7,90 €"
  priceWithoutTax: string;
  supplierCode: string;
};

// Minimal payload for the kuvapankki product grid (no HTML bodies).
export type ProductListItem = {
  id: string;
  name: string;
  brand: string;
  categories: string[];
  price: string;
  image?: string;
};

// One image as seen by the admin editor.
export type AdminImage = { filename: string; url: string; hidden: boolean };
export type AdminProduct = {
  id: string;
  name: string;
  brand: string;
  images: AdminImage[]; // visible (in order) first, then hidden
};

// Build the public URL for an image filename synced into public/whynotpr/products.
export function imageUrl(filename: string): string {
  return `${IMAGE_BASE_PATH}/${encodeURIComponent(filename.trim())}`;
}

// Strip Office "StartFragment/EndFragment" comments and dangerous markup,
// keeping the basic formatting tags used in the sheet.
function sanitizeHtml(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/<!--[\s\S]*?-->/g, "") // HTML comments (StartFragment etc.)
    .replace(/<\s*(script|style)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "") // inline handlers
    .replace(/javascript:/gi, "")
    .trim();
}

// "Kosmetiikka/Kasvojenhoito/Naamiot ja kuorinnat" -> "Naamiot ja kuorinnat"
function toCategories(raw: string): string[] {
  if (!raw) return [];
  const leaves = raw
    .split("|")
    .map((segment) => segment.split("/").pop()?.trim() ?? "")
    .filter(Boolean)
    // Drop noisy stock/availability buckets.
    .filter((c) => !/^jatkuvasti$/i.test(c) && !/^saatavuus$/i.test(c));
  return Array.from(new Set(leaves));
}

function formatPrice(raw: string): string {
  const value = Number.parseFloat((raw ?? "").replace(",", "."));
  if (!Number.isFinite(value)) return "";
  return `${value.toFixed(2).replace(".", ",")} €`;
}

function mapRow(row: Record<string, string>): Product {
  const imageFiles = (row.ProductImages ?? "")
    .split("|")
    .map((f) => f.trim())
    .filter(Boolean);

  return {
    id: (row.ProductID ?? "").trim(),
    name: (row.ProductName ?? "").trim(),
    brand: (row.ProductBrandName ?? "").trim(),
    descriptionHtml: sanitizeHtml(row.ProductDescription ?? ""),
    informationHtml: sanitizeHtml(row.ProductInformation ?? ""),
    categories: toCategories(row.ProductCategoryNames ?? ""),
    imageFiles,
    images: imageFiles.map(imageUrl), // replaced once overrides are applied
    price: formatPrice(row.ProductPrice ?? ""),
    priceWithoutTax: formatPrice(row.ProductPriceWithoutTax ?? ""),
    supplierCode: (row.ProductSupplierCode ?? "").trim(),
  };
}

function withOverrides(raw: Product[], overrides: OverrideMap): Product[] {
  return raw.map((p) => ({
    ...p,
    images: applyOverride(p.imageFiles, overrides[p.id]).map(imageUrl),
  }));
}

function toListItem(p: Product): ProductListItem {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    categories: p.categories,
    price: p.price,
    image: p.images[0],
  };
}

// Fetch + parse the published sheet (visible products only). Cached via Next's
// data cache and tagged so /api/whynotpr/revalidate can purge it on demand.
async function fetchVisibleRaw(): Promise<Product[]> {
  const res = await fetch(SHEET_CSV_URL, {
    next: { revalidate: SHEET_REVALIDATE_SECONDS, tags: [PRODUCTS_CACHE_TAG] },
  });

  if (!res.ok) {
    throw new Error(`Failed to load product sheet: ${res.status} ${res.statusText}`);
  }

  const csv = await res.text();
  return parseCsvToObjects(csv)
    .filter((row) => (row.ProductVisibility ?? "").trim() === "1")
    .map(mapRow)
    .filter((p) => p.id && p.name);
}

const loadRaw = cache(fetchVisibleRaw);
const loadOverrides = cache(getOverrides);

const loadProducts = cache(async (): Promise<Product[]> => {
  const [raw, overrides] = await Promise.all([loadRaw(), loadOverrides()]);
  return withOverrides(raw, overrides);
});

// Kuvapankki-facing products with image overrides applied (hidden removed, reordered).
export async function fetchProducts(): Promise<Product[]> {
  return loadProducts();
}

export async function fetchProductList(): Promise<ProductListItem[]> {
  const products = await loadProducts();
  return products.map(toListItem);
}

export async function fetchProduct(id: string): Promise<Product | undefined> {
  const products = await loadProducts();
  return products.find((p) => p.id === id);
}

// Admin-facing view: every image with its current visible/hidden state and order.
function toAdminProduct(p: Product, overrides: OverrideMap): AdminProduct {
  const ov = overrides[p.id];
  const visible = applyOverride(p.imageFiles, ov);
  const hidden = hiddenFiles(p.imageFiles, ov);
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    images: [
      ...visible.map((f) => ({ filename: f, url: imageUrl(f), hidden: false })),
      ...hidden.map((f) => ({ filename: f, url: imageUrl(f), hidden: true })),
    ],
  };
}

export async function fetchAdminProducts(): Promise<AdminProduct[]> {
  const [raw, overrides] = await Promise.all([loadRaw(), loadOverrides()]);
  return raw.map((p) => toAdminProduct(p, overrides));
}

export async function fetchAdminProduct(
  id: string,
): Promise<AdminProduct | undefined> {
  const [raw, overrides] = await Promise.all([loadRaw(), loadOverrides()]);
  const p = raw.find((x) => x.id === id);
  return p ? toAdminProduct(p, overrides) : undefined;
}

type WithBrand = { brand: string };
type WithCategories = { categories: string[] };

// Distinct brands for the filter UI.
export function brandsOf(products: WithBrand[]): string[] {
  return Array.from(new Set(products.map((p) => p.brand).filter(Boolean))).sort(
    (a, b) => a.localeCompare(b, "fi"),
  );
}

// Distinct categories (alphabetical) for the filter UI.
export function categoriesOf(products: WithCategories[]): string[] {
  const set = new Set<string>();
  for (const p of products) for (const c of p.categories) set.add(c);
  return Array.from(set).sort((a, b) => a.localeCompare(b, "fi"));
}
