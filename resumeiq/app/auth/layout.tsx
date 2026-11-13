import SignInNotice from "@/components/auth/SignInNotice";
import { CircleAlert } from "lucide-react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 bg-background w-full flex flex-col items-center justify-start">
      <SignInNotice />
      {children}
    </main>
  );
}
