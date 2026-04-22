"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import type {
  ContactApiResult,
  ContactFormData,
} from "@/lib/contact/schema";

const inputBase =
  "w-full bg-brand-card text-black px-4 py-3 rounded-xl text-sm placeholder:text-black/40 border border-transparent focus:outline-none focus:ring-1 focus:ring-brand-primary/50 transition";
const inputError =
  "w-full bg-brand-card text-black px-4 py-3 rounded-xl text-sm placeholder:text-black/40 border border-red-400/60 focus:outline-none focus:ring-1 focus:ring-red-400 transition";

const ContactFormContent = () => {
  const t = useTranslations("component.contactForm");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ mode: "onTouched" });

  const onSubmit = async (data: ContactFormData) => {
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as ContactApiResult;
      if (!res.ok || !json.ok) {
        throw new Error("error" in json ? json.error : "Failed");
      }
      reset();
      setIsSuccess(true);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "");
    }
  };

  if (isSuccess) {
    return (
      <p className="text-sm text-brand-primary py-6">
        {t("successMessage")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input type="checkbox" className="hidden" {...register("botcheck")} />

      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={t("placeholders.firstName")}
            autoComplete="given-name"
            className={errors.firstName ? inputError : inputBase}
            {...register("firstName", {
              required: t("validation.firstNameRequired"),
            })}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder={t("placeholders.lastName")}
            autoComplete="family-name"
            className={errors.lastName ? inputError : inputBase}
            {...register("lastName", {
              required: t("validation.lastNameRequired"),
            })}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <input
          type="email"
          placeholder={t("placeholders.email")}
          autoComplete="email"
          className={errors.email ? inputError : inputBase}
          {...register("email", {
            required: t("validation.emailRequired"),
            pattern: {
              value: /^\S+@\S+$/i,
              message: t("validation.emailInvalid"),
            },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="tel"
          placeholder={t("placeholders.phone")}
          autoComplete="tel"
          className={errors.phone ? inputError : inputBase}
          {...register("phone")}
        />
      </div>

      <div>
        <textarea
          rows={5}
          placeholder={t("placeholders.message")}
          className={`resize-none ${errors.message ? inputError : inputBase}`}
          {...register("message", {
            required: t("validation.messageRequired"),
          })}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2"
      >
        {isSubmitting ? "…" : t("submitButton")}
      </Button>

      {errorMsg && (
        <p className="text-xs text-red-500 text-center">{t("errorMessage")}</p>
      )}
    </form>
  );
};

export default function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormContent />
    </Suspense>
  );
}
