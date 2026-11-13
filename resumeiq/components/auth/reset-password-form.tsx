"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import {
  Field,
  FormHeader,
  PasswordInput,
  SubmitButton,
  linkClass,
} from "./form-controls";

export default function ResetPasswordForm({ token }: { token?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = String(data.get("password"));
    const confirm = String(data.get("confirm"));

    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords don't match.");

    setError(undefined);
    setLoading(true);
    // TODO: call your reset action with `token` and `password`
    setLoading(false);
    setDone(true);
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-5 sm:gap-6 w-full animate-auth-in-up motion-reduce:animate-none">
        <div className="flex flex-col gap-1 items-center text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-black">
            Link is invalid or expired
          </h1>
          <p className="text-xs sm:text-sm text-dark-gray">
            Reset links only work once and expire after a short time. Request a
            new one to continue.
          </p>
        </div>
        <Link
          href="/auth/forgot-password"
          className="w-full h-10 sm:h-11 rounded-lg bg-primary-600 hover:bg-primary-700 transition text-white text-[13px] sm:text-sm font-semibold flex items-center justify-center"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-5 sm:gap-6 w-full animate-auth-in-up motion-reduce:animate-none">
        <div className="size-11 sm:size-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center">
          <CircleCheck className="size-5 sm:size-6" />
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-black">
            Password updated
          </h1>
          <p className="text-xs sm:text-sm text-dark-gray">
            You can now sign in with your new password.
          </p>
        </div>
        <Link
          href="/auth?mode=signin"
          className="w-full h-10 sm:h-11 rounded-lg bg-primary-600 hover:bg-primary-700 transition text-white text-[13px] sm:text-sm font-semibold flex items-center justify-center"
        >
          Continue to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full animate-auth-in-up motion-reduce:animate-none">
      <FormHeader
        title="Set a new password"
        subtitle="Choose a password you haven't used before"
      />
      <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-5 w-full">
        <Field label="New password" htmlFor="reset-password">
          <PasswordInput
            id="reset-password"
            name="password"
            autoComplete="new-password"
            placeholder="8+ characters"
            minLength={8}
            required
          />
        </Field>
        <Field label="Confirm password" htmlFor="reset-confirm" error={error}>
          <PasswordInput
            id="reset-confirm"
            name="confirm"
            autoComplete="new-password"
            placeholder="Re-enter password"
            aria-invalid={!!error}
            required
          />
        </Field>
        <SubmitButton loading={loading}>Reset password</SubmitButton>
      </form>
      <p className="text-xs sm:text-sm text-dark-gray text-center">
        Remembered it?{" "}
        <Link href="/auth?mode=signin" className={linkClass}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
