"use client";

import { useState, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { ContactApiResult, ContactFormData } from "@/lib/contact/schema";

const inputBase =
  "w-full bg-brand-card text-black px-4 py-3 rounded-xl  placeholder:text-black/40 border border-transparent outline-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary/50 focus-visible:outline-offset-0";
const inputError =
  "w-full bg-brand-card text-black px-4 py-3 rounded-xl  placeholder:text-black/40 border border-red-400/60 outline-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400 focus-visible:outline-offset-0";

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
      <input
        type="checkbox"
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
        {...register("botcheck")}
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="contact-firstName" className="sr-only">
            {t("placeholders.firstName")}
          </label>
          <input
            type="text"
            id="contact-firstName"
            placeholder={t("placeholders.firstName")}
            autoComplete="given-name"
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={
              errors.firstName ? "contact-firstName-error" : undefined
            }
            className={errors.firstName ? inputError : inputBase}
            {...register("firstName", {
              required: t("validation.firstNameRequired"),
            })}
          />
          {errors.firstName && (
            <p
              id="contact-firstName-error"
              className="mt-1 text-sm text-red-700"
            >
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <label htmlFor="contact-lastName" className="sr-only">
            {t("placeholders.lastName")}
          </label>
          <input
            type="text"
            id="contact-lastName"
            placeholder={t("placeholders.lastName")}
            autoComplete="family-name"
            aria-invalid={errors.lastName ? true : undefined}
            aria-describedby={
              errors.lastName ? "contact-lastName-error" : undefined
            }
            className={errors.lastName ? inputError : inputBase}
            {...register("lastName", {
              required: t("validation.lastNameRequired"),
            })}
          />
          {errors.lastName && (
            <p
              id="contact-lastName-error"
              className="mt-1 text-sm text-red-700"
            >
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="sr-only">
          {t("placeholders.email")}
        </label>
        <input
          type="email"
          id="contact-email"
          placeholder={t("placeholders.email")}
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
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
          <p id="contact-email-error" className="mt-1 text-sm text-red-700">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-phone" className="sr-only">
          {t("placeholders.phone")}
        </label>
        <input
          type="tel"
          id="contact-phone"
          placeholder={t("placeholders.phone")}
          autoComplete="tel"
          aria-invalid={errors.phone ? true : undefined}
          className={errors.phone ? inputError : inputBase}
          {...register("phone")}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          {t("placeholders.message")}
        </label>
        <textarea
          rows={5}
          id="contact-message"
          placeholder={t("placeholders.message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className={`resize-none ${errors.message ? inputError : inputBase}`}
          {...register("message", {
            required: t("validation.messageRequired"),
          })}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1 text-sm text-red-700">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            <span>{t("submitButton")}</span>
          </>
        ) : (
          t("submitButton")
        )}
      </Button>

      <div role="status" aria-live="polite">
        {isSuccess && (
          <p className="text-brand-primary text-center">
            {t("successMessage")}
          </p>
        )}
      </div>

      <div role="alert">
        {errorMsg && (
          <p className="text-sm text-red-700 text-center">
            {t("errorMessage")}
          </p>
        )}
      </div>
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
