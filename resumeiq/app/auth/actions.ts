"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  SignInSchema,
  SignUpSchema,
  ForgotSchema,
  ResetSchema,
  type SignInValues,
  type SignUpValues,
  type ForgotValues,
  type ResetValues,
  type ActionResult,
} from "@/lib/schemas/auth";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function safeNext(next?: string | null) {
  return next &&
    next.startsWith("/") &&
    !next.startsWith("//") &&
    !next.startsWith("/\\")
    ? next
    : "/reports";
}

export async function signIn(
  values: SignInValues,
  next?: string,
): Promise<ActionResult> {
  const parsed = SignInSchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return {
      error:
        error.code === "email_not_confirmed"
          ? "Please confirm your email first. Check your inbox."
          : "Incorrect email or password.",
    };
  }

  revalidatePath("/", "layout");
  redirect(safeNext(next));
}

export async function signUp(
  values: SignUpValues,
  next?: string,
): Promise<ActionResult> {
  const parsed = SignUpSchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const { email, password, fullName } = parsed.data;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${SITE}/auth/callback?next=${encodeURIComponent(safeNext(next))}`,
    },
  });
  if (error) return { error: error.message };

  // a session exists only when email confirmation is off
  if (data.user && data.session) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ id: data.user.id, full_name: fullName });
    if (profileError) {
      console.error("Profile insert failed:", profileError.message);
    }
    revalidatePath("/", "layout");
    redirect(safeNext(next));
  }

  return { message: "Check your email to confirm your account." };
}

export async function sendResetLink(
  values: ForgotValues,
): Promise<ActionResult> {
  const parsed = ForgotSchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${SITE}/auth/callback?next=/auth/reset-password`,
  });
  return {
    message: "If that email has an account, a reset link is on its way.",
  };
}

export async function updatePassword(
  values: ResetValues,
): Promise<ActionResult> {
  const parsed = ResetSchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });
  if (error) {
    return {
      error: error.message.toLowerCase().includes("session")
        ? "This reset link has expired. Request a new one."
        : error.message,
    };
  }

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  return { message: "Password updated." };
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
