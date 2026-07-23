import Link from "next/link";
import Image from "next/image";
import { AGENCY } from "@/lib/whynotpr/config";
import { AnimatedSignature } from "@/components/AnimatedSignature";
import {
  noraStorySignatureFillColor,
  noraStorySignatureFillRule,
  noraStorySignaturePaths,
  noraStorySignaturePathTransforms,
  noraStorySignatureStrokeColor,
  noraStorySignatureStrokeWidth,
  noraStorySignatureViewBox,
} from "@/components/noraStorySignaturePath";
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
        <h1 className="wnp-hero-text mt-12 max-w-[1000px] text-3xl font-medium !leading-[110%] text-white sm:text-4xl lg:text-[2.625rem] !tracking-tight">
          {AGENCY.introHeadline}
        </h1>
        <Link
          href="/kuvapankki"
          className="mt-12 inline-flex items-center rounded-full bg-[var(--wnp-accent)] px-7 py-3 text-base font-[family-name:var(--wnp-font-link)] !text-white transition-opacity hover:opacity-90"
        >
          Kuvapankki
        </Link>
      </section>

      {/* Intro + contact */}
      <section className="container mx-auto max-w-[800px] px-6 py-8 sm:py-24">
        <p className="text-xl font-bold leading-snug sm:text-2xl tracking-tighter">
          {firstParagraph}
        </p>
        <div className="mt-6 space-y-6 text-lg md:text-xl leading-relaxed tracking-tight">
          {restParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-6 text-lg md:text-xl font-bold tracking-tight">
          {AGENCY.introTagline}
        </p>

        <AnimatedSignature
          paths={[...noraStorySignaturePaths]}
          pathTransforms={[...noraStorySignaturePathTransforms]}
          viewBox={noraStorySignatureViewBox}
          width={130}
          height={98}
          strokeWidth={noraStorySignatureStrokeWidth}
          strokeColor={noraStorySignatureStrokeColor}
          fillColor={noraStorySignatureFillColor}
          fillRule={noraStorySignatureFillRule}
          playMode="inView"
          duration={0.85}
          delay={0}
          stagger={0}
          timeline="sequential"
          className="mt-14 opacity-80"
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
