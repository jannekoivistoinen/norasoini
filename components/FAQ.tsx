"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import MarkdownText from "@/components/MarkdownText";
import FadeIn from "@/components/ui/FadeIn";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  items: FAQItem[];
}

interface FAQProps {
  className?: string;
}

const FAQCategory = ({
  category,
  index,
  isOpen,
  onClick,
}: {
  category: FAQCategory;
  index: number;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className={`${index !== 0 ? "border-t border-black/10" : ""}`}>
      <button
        type="button"
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={onClick}
      >
        <h3>
          {index + 1}. {category.name}
        </h3>
        <span
          className="flex-shrink-0 font-medium leading-none text-brand-primary"
          aria-hidden
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-5 pb-6 pl-4">
              {category.items.map((item, i) => (
                <div key={i}>
                  <p className="content font-medium text-black">
                    {item.question}
                  </p>
                  <MarkdownText className="content mt-3 text-base text-black/70 [&_p]:mb-6 mb-6 md:mb-10 [&_p+p]:mt-6 md:[&_p+p]:mt-10">
                    {item.answer}
                  </MarkdownText>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQ({}: FAQProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set([0]),
  );
  const t = useTranslations("component.faq");

  const categories = t.raw("categories") as FAQCategory[];

  const handleClick = (index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section id="FAQ" className="container">
      <div className="grid grid-cols-1 items-start gap-8 md:gap-12 md:grid-cols-2">
        <div className="md:sticky md:top-36 md:z-10 md:self-start">
          <h2>{t("title")}</h2>
          <MarkdownText className="mt-6 text-base md:text-[18px] leading-relaxed text-black/70 [&_p]:mb-0">
            {t("description")}
          </MarkdownText>
        </div>
        <FadeIn className="min-w-0">
          {categories.map((category, index) => (
            <FAQCategory
              key={index}
              category={category}
              index={index}
              isOpen={openIndices.has(index)}
              onClick={() => handleClick(index)}
            />
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
