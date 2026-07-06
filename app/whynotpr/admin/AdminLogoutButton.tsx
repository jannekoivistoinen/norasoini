"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/whynotpr/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="text-sm text-[var(--wnp-muted)] hover:text-[var(--wnp-ink)]"
    >
      Kirjaudu ulos
    </button>
  );
}
