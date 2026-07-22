import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/whynotpr/auth";
import { AGENCY } from "@/lib/whynotpr/config";
import LogoutButton from "./LogoutButton";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }

  return (
    <div className="wnp-showroom min-h-screen">
      <header className="sticky top-0 z-10 border-b border-[var(--wnp-line)] bg-[var(--wnp-bg)]/90 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/showroom" className="text-lg tracking-tight">
            {AGENCY.name}{" "}
            <span className="text-[var(--wnp-muted)]">/ Kuvapankki</span>
          </Link>
          <LogoutButton />
        </div>
      </header>
      <main className="container px-6 py-8 mx-auto">{children}</main>
    </div>
  );
}
