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

type Mode = "signin" | "signup";

export default function AuthCard({ initialMode }: { initialMode: Mode }) {
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

  const switchTo = (next: Mode) => {
    if (next === mode) return;
    setDirection(next === "signup" ? "right" : "left");
    setMode(next);
    // keep the URL in sync without a navigation (so the animation isn't interrupted)
    window.history.replaceState(null, "", `/auth?mode=${next}`);
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
              <SignInForm onSwitch={() => switchTo("signup")} />
            ) : (
              <SignUpForm onSwitch={() => switchTo("signin")} />
            )}
          </div>
        </div>
      </div>
    </AuthShell>
  );
}

function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    // TODO: call your sign-in action with data.get("email") / data.get("password")
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <FormHeader
        title="Welcome back"
        subtitle="Sign in to your ResumeIQ account"
      />
      <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-5 w-full">
        <Field label="Email address" htmlFor="signin-email">
          <TextInput
            id="signin-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </Field>
        <Field
          label="Password"
          htmlFor="signin-password"
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
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
          />
        </Field>
        <SubmitButton loading={loading}>Sign in</SubmitButton>
      </form>
      <Divider />
      <GoogleButton />
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

function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    // TODO: call your sign-up action with name / email / password
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      <FormHeader
        title="Create your account"
        subtitle="Start getting actionable resume feedback"
      />
      <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-5 w-full">
        <Field label="Full name" htmlFor="signup-name">
          <TextInput
            id="signup-name"
            name="name"
            autoComplete="name"
            placeholder="Alex Kim"
            required
          />
        </Field>
        <Field label="Email address" htmlFor="signup-email">
          <TextInput
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </Field>
        <Field label="Password" htmlFor="signup-password">
          <PasswordInput
            id="signup-password"
            name="password"
            autoComplete="new-password"
            placeholder="8+ characters"
            minLength={8}
            required
          />
        </Field>
        <SubmitButton loading={loading}>Create account</SubmitButton>
      </form>
      <Divider />
      <GoogleButton />
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
