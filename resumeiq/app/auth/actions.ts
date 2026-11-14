"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// TEMP test action: hardcoded values, delete before shipping
export async function signUpNewUser(
  email: string,
  password: string,
  full_name: string,
) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
      emailRedirectTo: SITE + "/",
    },
  });
  if (error) return { error: error.message };
  return { ok: true };
}

// TEMP test action: hardcoded values, delete before shipping
export async function signInWithEmail() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: "valid.email@supabase.io",
    password: "example-password",
  });
  if (error) return { error: error.message };
  return { ok: true };
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const navUser = user
    ? {
        email: user.email ?? "",
        initials: (user.user_metadata?.full_name ?? user.email ?? "?")
          .split(/[\s@.]+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((s: string) => s[0].toUpperCase())
          .join(""),
      }
    : null;

  return { navUser };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error signing out:", error.message);
  revalidatePath("/", "layout");
  redirect("/auth");
}

export async function resetPassword(email: string) {
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: SITE + "/auth/reset-password",
  });
  return {
    message: "If that email has an account, a reset link is on its way.",
  };
}

export async function updatePassword(newPassword: string) {
  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { error: error.message };
  return { ok: true };
}
