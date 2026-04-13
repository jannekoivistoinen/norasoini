"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import { useTranslations } from "next-intl";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  botcheck: string;
};

const inputBase =
  "w-full bg-brand-card text-black px-4 py-3 rounded-xl font-body text-sm placeholder:text-black/40 border border-transparent focus:outline-none focus:ring-1 focus:ring-brand-primary/50 transition";
const inputError =
  "w-full bg-brand-card text-black px-4 py-3 rounded-xl font-body text-sm placeholder:text-black/40 border border-red-400/60 focus:outline-none focus:ring-1 focus:ring-red-400 transition";

const ContactFormContent = () => {
  const t = useTranslations("component.contactForm");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: "onTouched" });

  const { submit: onSubmit } = useWeb3Forms({
    access_key: process.env.PUBLIC_ACCESS_KEY || "",
    settings: {
      from_name: "Nora Soini",
      subject: "Uusi yhteydenotto – norasoini.fi",
    },
    onSuccess: () => {
      reset();
      setIsSuccess(true);
    },
    onError: (msg) => {
      setErrorMsg(msg);
    },
  });

  if (isSuccess) {
    return (
      <p className="font-body text-sm text-brand-primary py-6">
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-brand-primary text-white text-sm font-body px-6 py-3 rounded-full hover:opacity-90 transition disabled:opacity-60 mt-2"
      >
        {isSubmitting ? "…" : t("submitButton")}
      </button>

      {errorMsg && (
        <p className="text-xs text-red-500 text-center">{t("errorMessage")}</p>
      )}
    </form>
  );
};

export default function ContactForm() {
  return (
    <Suspense>
      <ContactFormContent />
    </Suspense>
  );
}
