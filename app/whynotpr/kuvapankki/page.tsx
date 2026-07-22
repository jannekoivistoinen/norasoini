import {
  brandsOf,
  categoriesOf,
  fetchProductList,
} from "@/lib/whynotpr/products";
import ProductBrowser from "./ProductBrowser";

export default async function PortalPage() {
  const products = await fetchProductList();
  const brands = brandsOf(products);
  const categories = categoriesOf(products);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-medium tracking-tighter">Tuotteet</h1>
      </div>
      <ProductBrowser
        products={products}
        brands={brands}
        categories={categories}
      />
    </>
  );
}
