import { fetchAdminProducts } from "@/lib/whynotpr/products";
import AdminProductList from "./AdminProductList";

export default async function AdminHome() {
  const products = await fetchAdminProducts();
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-medium tracking-tighter">
          Kuvien hallinta
        </h1>
        <p className="mt-1 text-sm text-[var(--wnp-muted)]">
          Valitse tuote muokataksesi sen kuvia: piilota, järjestä tai aseta
          pääkuva. Muutokset näkyvät heti showroomissa.
        </p>
      </div>
      <AdminProductList products={products} />
    </>
  );
}
