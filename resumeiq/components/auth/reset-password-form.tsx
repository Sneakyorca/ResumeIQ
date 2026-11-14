"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema, type ResetValues } from "@/lib/schemas/auth";
import { updatePassword } from "@/app/auth/actions";
import {
  Field,
  FormHeader,
  PasswordInput,
  SubmitButton,
  linkClass,
} from "./form-controls";

export default function ResetPasswordForm({
  hasSession,
}: {
  hasSession: boolean;
}) {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetValues>({ resolver: zodResolver(ResetSchema) });

  async function onSubmit(values: ResetValues) {
    const res = await updatePassword(values);
    if (res?.error) return setError("root", { message: res.error });
    setDone(true);
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
          className="w-full h-10 sm:h-11 rounded-lg bg-primary-600 hover:bg-primary-700 transition text-white text-[13px] sm:text-sm font-semibold flex items-center justify-center bg-primary"
        >
          Continue to sign in
        </Link>
      </div>
    );
  }

  if (!hasSession) {
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
          className="w-full h-10 sm:h-11 rounded-lg bg-primary-600 hover:bg-primary-700 transition text-white text-[13px] sm:text-sm font-semibold flex items-center justify-center bg-primary"
        >
          Request a new link
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4 sm:gap-5 w-full"
      >
        <Field
          label="New password"
          htmlFor="reset-password"
          error={errors.password?.message}
        >
          <PasswordInput
            id="reset-password"
            autoComplete="new-password"
            placeholder="8+ characters"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
        </Field>
        <Field
          label="New password"
          htmlFor="reset-password"
          error={errors.password?.message ?? errors.root?.message}
        >
          <PasswordInput
            id="reset-password"
            autoComplete="new-password"
            placeholder="8+ characters"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <p className="text-[11px] sm:text-xs text-dark-gray">
            8+ characters with upper and lower case, a number, and a symbol.
          </p>
        </Field>
        <SubmitButton loading={isSubmitting}>Reset password</SubmitButton>
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
