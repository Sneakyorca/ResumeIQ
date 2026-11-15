import AuthCard from "@/components/auth/auth-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; next?: string }>;
}) {
  const { mode, next } = await searchParams;
  return (
    <AuthCard
      initialMode={mode === "signup" ? "signup" : "signin"}
      redirectTo={next}
    />
  );
}
