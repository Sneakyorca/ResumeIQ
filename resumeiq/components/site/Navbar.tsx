"use client";
import Image from "next/image";
import NavItem from "./NavItem";
import Link from "next/link";
import { Loader2, LogOut } from "lucide-react";
import MenuToggle from "../ui/MenuToggle";
import MobileMenuBar from "./MobileMenu";
import { useEffect, useRef, useState } from "react";
import { signOut } from "@/app/auth/actions";
import { useTransition } from "react";

const Navbar = ({
  user,
}: {
  user: { initials: string; email: string } | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState(0);
  const [isPending, startTransition] = useTransition();

  const logout = () => {
    startTransition(async () => {
      await signOut();
    });
  };

  useEffect(() => {
    const navBar = navRef.current;
    if (!navBar) return;
    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.target.getBoundingClientRect().height);
    });
    observer.observe(navBar);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ height }}>
      <nav
        ref={navRef}
        className="flex items-center justify-between py-3 px-4 sm:py-4 sm:px-10 lg:py-6 lg:px-14 border border-border z-30 w-full bg-white fixed left-0 top-0"
      >
        <Link
          href="/"
          className="text-black text-body-lg md:text-card font-sans font-bold flex items-center gap-2"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            className="size-6 md:size-8"
            width={32}
            height={32}
          />
          ResumeIQ
        </Link>

        <ul className="gap-8 items-center justify-center hidden sm:flex ">
          <NavItem />
        </ul>

        <ul className="flex gap-5 items-center justify-center">
          <li className="hidden sm:block">
            <Link
              href="/reports"
              className="font-sans text-body-sm text-muted-gray font-semibold hover:text-black hover:font-bold"
            >
              Feedback
            </Link>
          </li>

          {/* dynamic data */}
          <li>
            {user ? (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={accountOpen}
                  onClick={() => setAccountOpen((o) => !o)}
                  className="font-sans text-body-sm md:text-body-lg text-black font-semibold tracking-widest bg-lighter-gray p-2 rounded-full border border-border cursor-pointer hover:bg-background"
                >
                  {user.initials}
                </button>

                <div
                  role="menu"
                  className={`absolute right-0 top-full mt-2 w-56 origin-top-right rounded-lg border border-border bg-white p-1 shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-all duration-150 ease-out motion-reduce:transition-none ${
                    accountOpen
                      ? "visible scale-100 opacity-100"
                      : "invisible scale-95 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="truncate px-3 py-2 text-xs text-dark-gray">
                    {user.email}
                  </p>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={logout}
                    disabled={isPending}
                    aria-busy={isPending}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[13px] font-medium text-red-600 hover:bg-background cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
                  >
                    {isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <LogOut className="size-4 stroke-2" />
                    )}
                    {isPending ? "Logging out…" : "Log out"}
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth"
                className="cursor-pointer border-2 border-primary text-primary text-[13px] md:text-[14px] rounded-lg bg-transparent font-semibold py-1.5 px-4 hover:bg-primary/10"
              >
                Sign In
              </Link>
            )}
          </li>

          <li>
            <MenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />
          </li>
        </ul>

        <MobileMenuBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoggedIn={!!user}
        />
      </nav>
    </div>
  );
};

export default Navbar;
