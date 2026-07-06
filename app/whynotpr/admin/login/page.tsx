"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AGENCY } from "@/lib/whynotpr/config";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(false);
    const res = await fetch("/api/whynotpr/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
    } else {
      setError(true);
      setPending(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 py-20">
      <h1 className="text-3xl font-medium tracking-tighter">{AGENCY.name}</h1>
      <p className="mt-2 text-sm text-[var(--wnp-muted)]">
        Kuvien hallinta. Syötä ylläpidon salasana.
      </p>

      <form onSubmit={onSubmit} className="mt-8">
        <input
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ylläpidon salasana"
          className="w-full rounded-lg border border-[var(--wnp-line)] bg-[var(--wnp-surface)] px-4 py-3 outline-none focus:border-[var(--wnp-accent)]"
        />
        {error && <p className="mt-3 text-sm text-red-700">Väärä salasana.</p>}
        <button
          type="submit"
          disabled={pending || !password}
          className="mt-4 w-full rounded-full bg-[var(--wnp-accent)] px-6 py-3 text-sm font-medium text-[var(--wnp-accent-ink)] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Kirjaudutaan…" : "Kirjaudu"}
        </button>
      </form>
    </main>
  );
}
