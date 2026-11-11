"use client";
import Image from "next/image";
import NavItem from "./NavItem";
import Link from "next/link";
import { isLoggedIn, profile } from "@/data/data";
import MenuToggle from "../ui/MenuToggle";
import MobileMenuBar from "./MobileMenu";
import { ReactElement, useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState(0);

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
        className="flex items-center justify-between py-3 px-4 sm:py-4 sm:px-10 lg:py-6 lg:px-14 border border-border z-10 w-full bg-white fixed left-0 top-0"
      >
        <Link
          href="/"
          className="text-black text-body-lg md:text-card capitalize font-sans font-bold flex items-center gap-2"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            className="size-6 md:size-8"
            width={32}
            height={32}
          />
          RESUMEIQ
        </Link>
        <ul className="gap-8 items-center justify-center hidden sm:flex ">
          <NavItem />
        </ul>
        <ul className="flex gap-5 items-center justify-center">
          <Link
            href="/reports"
            className="font-sans text-body-sm text-muted-gray font-semibold hover:text-black hover:font-bold hidden sm:inline-block"
          >
            Feedback
          </Link>

          {/* dynamic data */}

          {isLoggedIn ? (
            <button className="font-sans text-body-sm md:text-body-lg text-black font-semibold tracking-widest bg-lighter-gray p-2 rounded-full border border-border">
              {profile.name
                .split(" ")
                .map((initials) => initials[0])
                .join("")}
            </button>
          ) : (
            <Link
              href="/auth"
              className="cursor-pointer border-2 border-primary text-primary text-[13px] md:text-[14px] rounded-[8px] bg-transparent font-semibold py-1.5 px-4 hover:bg-primary/10"
            >
              Sign In
            </Link>
          )}
          <MenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />
          <MobileMenuBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
