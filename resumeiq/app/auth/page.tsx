import AuthCard from "@/components/auth/auth-card";

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
