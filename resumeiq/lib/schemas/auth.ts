import * as z from "zod";

const newPassword = z
  .string()
  .min(8, "Use at least 8 characters")
  .regex(/[a-z]/, "Add a lowercase letter")
  .regex(/[A-Z]/, "Add an uppercase letter")
  .regex(/[0-9]/, "Add a number")
  .regex(/[^A-Za-z0-9]/, "Add a symbol, like # + or -");

const email = z
  .string()
  .trim()
  .min(1, "Enter your email")
  .pipe(z.email("Enter a valid email"));

export const SignInSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password"),
});
export const SignUpSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name"),
  email,
  password: newPassword,
});

export const ResetSchema = z.object({
  password: newPassword,
});

export const ForgotSchema = z.object({ email });

export type SignInValues = z.infer<typeof SignInSchema>;
export type SignUpValues = z.infer<typeof SignUpSchema>;
export type ForgotValues = z.infer<typeof ForgotSchema>;
export type ResetValues = z.infer<typeof ResetSchema>;

export type ActionResult = { error?: string; message?: string };
