"use client";

import { useEffect, useRef, useState } from "react";
import AuthShell from "./auth-shell";
import {
  Divider,
  Field,
  FormHeader,
  GoogleButton,
  PasswordInput,
  SubmitButton,
  TextInput,
  linkClass,
} from "./form-controls";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInSchema,
  SignUpSchema,
  type SignInValues,
  type SignUpValues,
} from "@/lib/schemas/auth";
import { signIn, signUp } from "@/app/auth/actions";

type Mode = "signin" | "signup";

export default function AuthCard({
  initialMode,
  redirectTo,
}: {
  initialMode: Mode;
  redirectTo?: string;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [height, setHeight] = useState<number>();
  const contentRef = useRef<HTMLDivElement>(null);

  // Animate the card height when the form content changes size
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const switchTo = (target: Mode) => {
    if (target === mode) return;
    setDirection(target === "signup" ? "right" : "left");
    setMode(target);
    // keep the URL in sync (and keep ?next) without a navigation
    const params = new URLSearchParams(window.location.search);
    params.set("mode", target);
    window.history.replaceState(null, "", `/auth?${params}`);
  };

  return (
    <AuthShell>
      {/* Tabs */}
      <div
        role="tablist"
        className="p-0.75 sm:p-1 bg-background rounded-md flex items-center w-full"
      >
        <div className="relative flex w-full">
          <span
            aria-hidden
            className={`absolute inset-y-0 left-0 w-1/2 rounded-[5px] bg-white shadow-sm transition-transform duration-300 ease-out motion-reduce:transition-none ${
              mode === "signup" ? "translate-x-full" : "translate-x-0"
            }`}
          />
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              type="button"
              aria-selected={mode === m}
              onClick={() => switchTo(m)}
              className={`relative z-10 text-xs sm:text-[13px] font-semibold py-1.5 sm:py-2 flex-1 text-center transition-colors duration-300 cursor-pointer ${
                mode === m ? "text-black" : "text-dark-gray"
              }`}
            >
              {m === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>
      </div>

      {/* Animated form area: height tweens, content slides + fades in */}
      <div
        className="w-full -m-1 overflow-hidden transition-[height] duration-300 ease-out motion-reduce:transition-none"
        style={{ height }}
      >
        <div ref={contentRef} className="p-1">
          <div
            key={mode}
            className={`motion-reduce:animate-none ${
              direction === "right"
                ? "animate-auth-in-right"
                : "animate-auth-in-left"
            }`}
          >
            {mode === "signin" ? (
              <SignInForm
                onSwitch={() => switchTo("signup")}
                redirectTo={redirectTo}
              />
            ) : (
              <SignUpForm
                onSwitch={() => switchTo("signin")}
                redirectTo={redirectTo}
              />
            )}
          </div>
        </div>
      </div>
    </AuthShell>
  );
}

function RootError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-xs sm:text-[13px] text-red-600 font-medium">
      {message}
    </p>
  );
}

function SignInForm({
  onSwitch,
  redirectTo,
}: {
  onSwitch: () => void;
  redirectTo?: string;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({ resolver: zodResolver(SignInSchema) });

  async function onSubmit(values: SignInValues) {
    const res = await signIn(values, redirectTo); // redirects on success
    if (res?.error) setError("root", { message: res.error });
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <FormHeader
        title="Welcome back"
        subtitle="Sign in to your ResumeIQ account"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4 sm:gap-5 w-full"
      >
        <Field
          label="Email address"
          htmlFor="signin-email"
          error={errors.email?.message}
        >
          <TextInput
            id="signin-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
        <Field
          label="Password"
          htmlFor="signin-password"
          error={errors.password?.message}
          aside={
            <Link
              href="/auth/forgot-password"
              className="text-xs sm:text-[13px] text-dark-gray underline underline-offset-2 hover:text-black transition-colors"
            >
              Forgot password?
            </Link>
          }
        >
          <PasswordInput
            id="signin-password"
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
        </Field>
        <RootError message={errors.root?.message} />
        <SubmitButton loading={isSubmitting}>Sign in</SubmitButton>
      </form>
      {/* <Divider /> */}
      {/* <GoogleButton /> */}
      <p className="text-xs sm:text-sm text-dark-gray text-center">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className={`${linkClass} cursor-pointer`}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}

function SignUpForm({
  onSwitch,
  redirectTo,
}: {
  onSwitch: () => void;
  redirectTo?: string;
}) {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({ resolver: zodResolver(SignUpSchema) });

  async function onSubmit(values: SignUpValues) {
    const res = await signUp(values, redirectTo); // redirects if no confirmation needed
    if (res?.error) return setError("root", { message: res.error });
    if (res?.message) setSentTo(values.email);
  }

  if (sentTo) {
    return (
      <div className="flex flex-col items-center gap-5 sm:gap-6 w-full">
        <div className="size-11 sm:size-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center">
          <MailCheck className="size-5 sm:size-6" />
        </div>
        <div className="flex flex-col gap-1 items-center text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-black">
            Check your email
          </h1>
          <p className="text-xs sm:text-sm text-dark-gray">
            We sent a confirmation link to{" "}
            <span className="font-semibold text-black break-all">{sentTo}</span>
            . Click it to finish creating your account.
          </p>
        </div>
        <button
          type="button"
          onClick={onSwitch}
          className={`${linkClass} text-xs sm:text-sm cursor-pointer`}
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <FormHeader
        title="Create your account"
        subtitle="Start getting actionable resume feedback"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4 sm:gap-5 w-full"
      >
        <Field
          label="Full name"
          htmlFor="signup-name"
          error={errors.fullName?.message}
        >
          <TextInput
            id="signup-name"
            autoComplete="name"
            placeholder="Alex Kim"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
        </Field>
        <Field
          label="Email address"
          htmlFor="signup-email"
          error={errors.email?.message}
        >
          <TextInput
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
        <Field
          label="Password"
          htmlFor="signup-password"
          error={errors.password?.message}
        >
          <PasswordInput
            id="signup-password"
            autoComplete="new-password"
            placeholder="8+ characters"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <p className="text-[11px] sm:text-xs text-dark-gray">
            8+ characters with upper and lower case, a number, and a symbol.
          </p>
        </Field>
        <RootError message={errors.root?.message} />
        <SubmitButton loading={isSubmitting}>Create account</SubmitButton>
      </form>
      {/* <Divider /> */}
      {/* <GoogleButton /> */}
      <div className="flex flex-col gap-3 sm:gap-4 items-center">
        <p className="text-xs sm:text-sm text-dark-gray text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitch}
            className={`${linkClass} cursor-pointer`}
          >
            Sign in
          </button>
        </p>
        <p className="text-[11px] sm:text-xs text-dark-gray text-center leading-relaxed">
          By creating an account, you agree to our{" "}
          <Link
            href="/terms"
            className="text-black underline underline-offset-2"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-black underline underline-offset-2"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
