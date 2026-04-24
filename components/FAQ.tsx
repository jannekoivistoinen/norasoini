"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import MarkdownText from "@/components/MarkdownText";

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
        <span className="font-heading text-xl italic font-semibold tracking-looser text-black">
          {index + 1}. {category.name}
        </span>
        <span
          className="flex-shrink-0 text-[20px] font-medium leading-none text-brand-primary"
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
                  <p className="text-[15px] font-semibold leading-snug text-black">
                    {item.question}
                  </p>
                  <MarkdownText className="mt-1 text-base leading-relaxed text-black/70 [&_p]:mb-0 [&_p+p]:mt-2">
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
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="md:sticky md:top-28 md:self-start">
          <h2 className="font-heading text-4xl italic tracking-looser leading-[1.1] text-black md:text-[56px] md:leading-[1.1]">
            {t("title")}
          </h2>
          <MarkdownText className="mt-6 text-[18px] leading-relaxed text-black/70 [&_p]:mb-0">
            {t("description")}
          </MarkdownText>
        </div>
        <div className="min-w-0">
          {categories.map((category, index) => (
            <FAQCategory
              key={index}
              category={category}
              index={index}
              isOpen={openIndices.has(index)}
              onClick={() => handleClick(index)}
            />
          ))}
          <div className="border-t border-black/10" />
        </div>
      </div>
    </section>
  );
}
