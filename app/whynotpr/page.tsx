import Link from "next/link";
import Image from "next/image";
import { AGENCY } from "@/lib/whynotpr/config";
import WhyNotPrLogo from "./WhyNotPrLogo";

export default function WhyNotPrLanding() {
  const [firstParagraph, ...restParagraphs] = AGENCY.introBody;

  return (
    <main className="wnp-landing min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[440px] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center sm:min-h-[520px] lg:min-h-[600px]">
        <Image
          src="/whynotpr/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <WhyNotPrLogo className="wnp-hero-text h-5 w-auto text-white sm:h-6" />
        <h1 className="wnp-hero-text mt-8 max-w-3xl text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
          {AGENCY.introHeadline}
        </h1>
        <Link
          href="/kuvapankki"
          className="mt-8 inline-flex items-center rounded-full bg-[var(--wnp-accent)] px-7 py-3 text-base font-[family-name:var(--wnp-font-link)] !text-white transition-opacity hover:opacity-90"
        >
          Kuvapankki
        </Link>
      </section>

      {/* Intro + contact */}
      <section className="mx-auto max-w-xl px-6 py-16 sm:py-24">
        <p className="text-xl font-semibold leading-snug sm:text-2xl">
          {firstParagraph}
        </p>
        <div className="mt-6 space-y-6 text-lg leading-relaxed">
          {restParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-6 text-lg font-semibold">{AGENCY.introTagline}</p>

        <Image
          src="/whynotpr/signature.png"
          alt={AGENCY.contact.name}
          width={100}
          height={76}
          className="mt-14 h-auto w-28"
        />

        <div className="mt-4 text-lg">
          <p>{AGENCY.contact.name}</p>
          <p>{AGENCY.contact.company}</p>
          <p className="mt-4">
            <a
              href={`mailto:${AGENCY.contact.email}`}
              className="hover:text-[var(--wnp-accent)]"
            >
              {AGENCY.contact.email}
            </a>
          </p>
          <p>
            <a
              href={`tel:${AGENCY.contact.phone.replace(/\s/g, "")}`}
              className="hover:text-[var(--wnp-accent)]"
            >
              {AGENCY.contact.phone}
            </a>
          </p>
          <p className="mt-4">
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
      </section>
    </main>
  );
}
