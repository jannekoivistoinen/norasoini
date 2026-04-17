import { FAQ } from "@/components/FAQ";
import MarkdownText from "@/components/MarkdownText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

type TermsContent = {
  hero: {
    title: string;
    description: string;
    buttonText: string;
  };
  terms: {
    title: string;
    description: string;
  };
};

interface TermsPageProps {
  content: TermsContent;
}

export default function TermsPage({ content }: TermsPageProps) {

  return (
    <>
      <FadeIn>
        <section className="container">
          <div className="mx-auto text-center max-w-4xl mb-8 lg:mb-24">
            <MarkdownText className="text-brand-dark mb-3 md:mb-6">
              {content.hero.title}
            </MarkdownText>
            <MarkdownText className="p-lg content">
              {content.hero.description}
            </MarkdownText>
            <Button
              size="lg"
              className="mx-auto mt-8 !text-white hover:no-underline"
              asChild
            >
              <Link href="#" className="hover:no-underline" target="_blank">
                {content.hero.buttonText}
              </Link>
            </Button>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section id="terms" className="container content">
          <div className="md:mx-auto md:text-center max-w-4xl">
            <MarkdownText className="text-brand-dark mb-6">
              {content.terms.title}
            </MarkdownText>
            <MarkdownText className="mb-12 p-lg">
              {content.terms.description}
            </MarkdownText>
          </div>
        </section>
      </FadeIn>
      <FadeIn>
        <FAQ />
      </FadeIn>
    </>
  );
}
