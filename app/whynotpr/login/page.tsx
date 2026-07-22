"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AGENCY } from "@/lib/whynotpr/config";
import { ArrowLeftIcon } from "@/app/whynotpr/ArrowIcon";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(false);
    const res = await fetch("/api/whynotpr/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.replace("/kuvapankki");
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
        Syötä salasana päästäksesi Kuvapankkiin.
      </p>

      <form onSubmit={onSubmit} className="mt-8">
        <label htmlFor="password" className="sr-only">
          Salasana
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Salasana"
          className="w-full rounded-lg border border-[var(--wnp-line)] bg-[var(--wnp-surface)] px-4 py-3 outline-none focus:border-[var(--wnp-accent)]"
        />
        {error && (
          <p className="mt-3 text-sm text-red-700">
            Väärä salasana. Yritä uudelleen.
          </p>
        )}
        <button
          type="submit"
          disabled={pending || !password}
          className="mt-4 w-full rounded-full bg-[var(--wnp-accent)] px-6 py-3 text-sm font-medium text-[var(--wnp-accent-ink)] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Kirjaudutaan…" : "Kirjaudu"}
        </button>
      </form>

      <a
        href="/"
        className="group mt-8 inline-flex items-center gap-2 text-xs text-[var(--wnp-muted)] hover:text-[var(--wnp-ink)]"
      >
        <ArrowLeftIcon />
        Takaisin
      </a>
    </main>
  );
}
