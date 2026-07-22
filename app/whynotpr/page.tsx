import Link from "next/link";
import { AGENCY } from "@/lib/whynotpr/config";
import WhyNotPrLogo from "./WhyNotPrLogo";

export default function WhyNotPrLanding() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-20">
      <header>
        <h1 className="mt-6">
          <WhyNotPrLogo className="h-6 w-auto sm:h-6" />
        </h1>
        <h2 className="mt-12 max-w-xl text-2xl sm:text-3xl font-medium tracking-tighter">
          {AGENCY.introHeadline}
        </h2>
        <div className="mt-8 max-w-xl space-y-4 text-[var(--wnp-muted)]">
          {AGENCY.introBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-8 max-w-xl font-medium text-[var(--wnp-ink)]">
          {AGENCY.introTagline}
        </p>
      </header>

      <div className="mt-12">
        <Link
          href="/kuvapankki"
          className="inline-flex items-center rounded-full bg-[var(--wnp-accent)] px-7 py-3 text-sm font-medium !text-white transition-opacity hover:opacity-90"
        >
          Kuvapankki
        </Link>
      </div>

      <div className="mt-12 text-sm">
        <p>{AGENCY.contact.name}</p>
        <p>{AGENCY.contact.company}</p>
        <p className="mt-3">
          <a
            href={`mailto:${AGENCY.contact.email}`}
            className="hover:text-[var(--wnp-accent)]"
          >
            {AGENCY.contact.email}
          </a>
        </p>
        <p className="mt-1">
          <a
            href={`tel:${AGENCY.contact.phone.replace(/\s/g, "")}`}
            className="hover:text-[var(--wnp-accent)]"
          >
            {AGENCY.contact.phone}
          </a>
        </p>
        <p className="mt-3">
          <a
            href={AGENCY.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--wnp-accent)]"
          >
            Instagram {AGENCY.instagram.handle}
          </a>
        </p>
      </div>
    </main>
  );
}
