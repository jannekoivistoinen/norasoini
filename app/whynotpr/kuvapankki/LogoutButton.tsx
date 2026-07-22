"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/whynotpr/logout", { method: "POST" });
    router.replace("/login");
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
