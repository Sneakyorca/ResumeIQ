import AuthCard from "@/components/auth/auth-card";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode } = await searchParams;

  return <AuthCard initialMode={mode === "signup" ? "signup" : "signin"} />;
}
