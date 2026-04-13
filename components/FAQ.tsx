"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import MarkdownText from "@/components/MarkdownText";
import Image from "next/image";
import { images } from "@/app/assets/images";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

interface FAQProps {
  className?: string;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border-b border-neutral-200">
      <button
        className="flex w-full items-center py-4 text-left"
        onMouseDown={onClick}
      >
        <span className="mr-4 text-brand-brown">{isOpen ? "−" : "+"}</span>
        <span className="text-lg font-medium">{question}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <MarkdownText className="pb-8 pl-6 md:pl-12 p-base text-brand-brown">
              {answer}
            </MarkdownText>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQ({}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("component.faq");

  const items = t.raw("items") as Array<{
    question: string;
    answer: string;
  }>;

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="FAQ">
      <div className="container">
        <Image
          src={images.placeholderImage}
          alt="Test Image"
          className="w-full h-full object-cover aspect-[3/2] lg:aspect-[3/1] mb-8 lg:mb-16"
          quality={80}
          sizes="(min-width: 1920px) 2000px, (min-width: 1280px) 1440px, (min-width: 780px) 50vw, 90vw"
        />
      </div>
      <div className="container grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2">
        <div>
          <div className="mb-4 md:mb-8 max-w-[400px]">
            <MarkdownText>{t("title")}</MarkdownText>
          </div>
          <MarkdownText className="content p-base max-w-xl">
            {t("description")}
          </MarkdownText>
        </div>
        <div>
          <div className="max-w-3xl">
            {items.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
