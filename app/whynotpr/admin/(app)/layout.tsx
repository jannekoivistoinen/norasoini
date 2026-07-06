import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdmin } from "@/lib/whynotpr/auth";
import { AGENCY } from "@/lib/whynotpr/config";
import AdminLogoutButton from "../AdminLogoutButton";

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }

  return (
    <div className="wnp-admin min-h-screen">
      <header className="sticky top-0 z-10 border-b border-[var(--wnp-line)] bg-[var(--wnp-bg)]/90 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/admin" className="text-lg tracking-tight">
            {AGENCY.name}{" "}
            <span className="text-[var(--wnp-muted)]">/ Kuvien hallinta</span>
          </Link>
          <AdminLogoutButton />
        </div>
      </header>
      <main className="container px-6 py-8 mx-auto">{children}</main>
    </div>
  );
}
