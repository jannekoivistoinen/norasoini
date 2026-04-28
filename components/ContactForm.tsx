"use client";

import { useState, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import type {
  ContactApiResult,
  ContactFormData,
} from "@/lib/contact/schema";

const inputBase =
  "w-full bg-brand-card text-black px-4 py-3 rounded-xl text-sm placeholder:text-black/40 border border-transparent outline-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary/50 focus-visible:outline-offset-0";
const inputError =
  "w-full bg-brand-card text-black px-4 py-3 rounded-xl text-sm placeholder:text-black/40 border border-red-400/60 outline-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400 focus-visible:outline-offset-0";

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-busy={isSubmitting}
      className="contact-form flex flex-col gap-4"
    >
      <input type="checkbox" className="hidden" {...register("botcheck")} />

      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={t("placeholders.firstName")}
            autoComplete="given-name"
            aria-invalid={errors.firstName ? true : undefined}
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
            aria-invalid={errors.lastName ? true : undefined}
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
          aria-invalid={errors.email ? true : undefined}
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
          aria-invalid={errors.phone ? true : undefined}
          className={errors.phone ? inputError : inputBase}
          {...register("phone")}
        />
      </div>

      <div>
        <textarea
          rows={5}
          placeholder={t("placeholders.message")}
          aria-invalid={errors.message ? true : undefined}
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
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            <span>{t("submitButton")}</span>
          </>
        ) : (
          t("submitButton")
        )}
      </Button>

      {isSuccess && (
        <p className="text-sm text-brand-primary text-center">{t("successMessage")}</p>
      )}

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
