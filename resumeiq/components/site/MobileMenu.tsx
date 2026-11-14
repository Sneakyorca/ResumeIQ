"use client";
import { signOut } from "@/app/auth/actions";
import {
  ArrowRight,
  ChevronRight,
  FileScan,
  House,
  Loader2,
  LogOut,
  Summary,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

const menuItems = [
  { label: "Home", icon: House, route: "/" },
  { label: "Analyze resume", icon: FileScan, route: "/analyze" },
  { label: "My reports", icon: Summary, route: "/reports" },
  { label: "Sign in", icon: ArrowRight, separated: true, route: "/auth" },
];

const MobileMenuBar = ({
  isOpen,
  setIsOpen,
  isLoggedIn,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
}) => {
  const pathname = usePathname();

  const items = menuItems.filter(
    (item) => !(isLoggedIn && item.route === "/auth"),
  );

  const [isPending, startTransition] = useTransition();

  const logout = () => {
    startTransition(async () => {
      await signOut();
    });
  };

  return (
    <div
      className={`absolute left-0 top-15 w-full p-2 transition-all duration-150 ease-in-out md:ml-auto md:max-w-96 ${
        isOpen
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-3 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex w-full flex-col gap-1 rounded-b-xl border border-[#e5e7eb] bg-white p-2 shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
        {items.map((item) => {
          const active = pathname === item.route;
          return (
            <div
              className={
                item.separated ? "border-t border-[#e5e7eb] pt-1" : undefined
              }
              key={item.label}
            >
              <Link
                href={item.route}
                onClick={() => setIsOpen(false)}
                className={`flex h-12 w-full items-center justify-between rounded-lg px-4 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#16a34a] ${
                  active ? "bg-[#f0fdf4]" : "bg-white hover:bg-[#f9fafb]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <item.icon
                    className={`size-4.5 stroke-3 ${
                      active ? "text-primary/80" : "text-muted-gray"
                    }`}
                  />
                  <span
                    className={`text-[14px] leading-normal ${
                      active
                        ? "font-semibold text-[#16a34a]"
                        : "font-medium text-[#111827]"
                    }`}
                  >
                    {item.label}
                  </span>
                </span>

                <ChevronRight
                  className={`size-3.5 stroke-3 ${
                    active ? "text-primary" : "text-light-gray"
                  }`}
                />
              </Link>
            </div>
          );
        })}

        {isLoggedIn && (
          <button
            type="button"
            onClick={logout}
            disabled={isPending}
            aria-busy={isPending}
            className="flex h-12 w-full items-center gap-3 rounded-lg px-4 text-left text-[14px] font-medium text-red-600 transition-colors hover:bg-[#f9fafb] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-red-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
          >
            {isPending ? (
              <Loader2 className="size-4.5 animate-spin" />
            ) : (
              <LogOut className="size-4.5 stroke-3" />
            )}
            {isPending ? "Logging out…" : "Log out"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileMenuBar;
