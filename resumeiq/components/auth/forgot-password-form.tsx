"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";
import {
  Field,
  FormHeader,
  SubmitButton,
  TextInput,
  linkClass,
} from "./form-controls";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const email = String(new FormData(e.currentTarget).get("email"));
    // TODO: call your "send reset link" action with `email`
    setLoading(false);
    setSentTo(email);
  }

  if (sentTo) {
    return (
      <div className="flex flex-col items-center gap-5 sm:gap-6 w-full animate-auth-in-up motion-reduce:animate-none">
        <div className="size-11 sm:size-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center">
          <MailCheck className="size-5 sm:size-6" />
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-black">
            Check your email
          </h1>
          <p className="text-xs sm:text-sm text-dark-gray">
            If an account exists for{" "}
            <span className="font-semibold text-black break-all">{sentTo}</span>
            , we&apos;ve sent a link to reset your password.
          </p>
        </div>
        <p className="text-xs sm:text-sm text-dark-gray text-center">
          Didn&apos;t get it?{" "}
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className={`${linkClass} cursor-pointer`}
          >
            Try again
          </button>
        </p>
        <BackToSignIn />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full animate-auth-in-up motion-reduce:animate-none">
      <FormHeader
        title="Forgot your password?"
        subtitle="Enter your email and we'll send you a reset link"
      />
      <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-5 w-full">
        <Field label="Email address" htmlFor="forgot-email">
          <TextInput
            id="forgot-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </Field>
        <SubmitButton loading={loading}>Send reset link</SubmitButton>
      </form>
      <div className="flex justify-center">
        <BackToSignIn />
      </div>
    </div>
  );
}

function BackToSignIn() {
  return (
    <Link
      href="/auth?mode=signin"
      className="text-xs sm:text-sm font-semibold text-dark-gray hover:text-black transition-colors inline-flex items-center gap-1.5"
    >
      <ArrowLeft className="size-3.5 sm:size-4" />
      Back to sign in
    </Link>
  );
}
