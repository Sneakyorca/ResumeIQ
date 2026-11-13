"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

export const inputClass =
  "w-full h-10 sm:h-11 rounded-lg border border-border bg-white px-3 sm:px-3.5 text-[13px] sm:text-sm text-black outline-none transition placeholder:text-dark-gray/60 focus:border-primary-600 focus:ring-3 focus:ring-primary-600/15 aria-[invalid=true]:border-red-500";

export const linkClass =
  "font-semibold text-primary-600 hover:text-primary-700 transition-colors";

export function FormHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <h1 className="text-xl sm:text-2xl font-bold text-black">{title}</h1>
      <p className="text-xs sm:text-sm text-dark-gray">{subtitle}</p>
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  aside,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  aside?: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="text-xs sm:text-[13px] font-semibold text-black"
        >
          {label}
        </label>
        {aside}
      </div>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput(props: ComponentProps<"input">) {
  return (
    <input {...props} className={`${inputClass} ${props.className ?? ""}`} />
  );
}

export function PasswordInput({
  placeholder,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative w-full">
      <input
        {...props}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        className={`${inputClass} pr-11 placeholder:font-mono placeholder:text-xs sm:placeholder:text-[13px]`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-gray hover:text-black transition-colors"
      >
        {visible ? (
          <Eye className="size-4 sm:size-4.5" />
        ) : (
          <EyeOff className="size-4 sm:size-4.5" />
        )}
      </button>
    </div>
  );
}

export function SubmitButton({
  loading,
  children,
}: {
  loading?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full h-10 sm:h-11 rounded-lg bg-primary-600 hover:bg-primary-700 active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none transition text-white text-[13px] sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer bg-primary"
    >
      {loading && <LoaderCircle className="size-4 animate-spin" />}
      {children}
    </button>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-3 w-full text-xs sm:text-[13px] text-dark-gray">
      <span className="h-px flex-1 bg-border" />
      or
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function GoogleButton() {
  return (
    <button
      type="button"
      className="w-full h-10 sm:h-11 rounded-lg border border-border bg-white hover:bg-background transition-colors text-[13px] sm:text-sm font-semibold text-black flex items-center justify-center gap-2.5 cursor-pointer"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4 sm:size-4.5"
        aria-hidden="true"
      >
        <path
          fill="#4285F4"
          d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.51 5.51 0 0 1-2.39 3.62v3h3.87c2.27-2.09 3.57-5.17 3.57-8.81Z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.29v3.09A12 12 0 0 0 12 24Z"
        />
        <path
          fill="#FBBC05"
          d="M5.29 14.3a7.2 7.2 0 0 1 0-4.6V6.61H1.29a12 12 0 0 0 0 10.78l4-3.09Z"
        />
        <path
          fill="#EA4335"
          d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.29 6.61l4 3.09C6.23 6.86 8.88 4.75 12 4.75Z"
        />
      </svg>
      Continue with Google
    </button>
  );
}
