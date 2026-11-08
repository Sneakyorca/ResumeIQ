"use client";
import {
  ArrowRight,
  ChevronRight,
  FileScan,
  House,
  Summary,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const icons = {
  //   close: ,
  home: House,
  //   chevron: <House className={`size-3.5 font-semibold stroke-3`} />,
  analyze: FileScan,
  //   activeChevron: <House className={`size-3.5 font-semibold stroke-3`} />,
  reports: Summary,
  signIn: ArrowRight,
};

const menuItems = [
  { label: "Home", icon: icons.home, route: "/" },
  { label: "Analyze resume", icon: icons.analyze, route: "/analyze" },
  { label: "My reports", icon: icons.reports, route: "/reports" },
  { label: "Sign in", icon: icons.signIn, separated: true, route: "/auth" },
];
const MobileMenuBar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  return (
    <>
      <div
        className={`absolute left-0 top-15 w-full p-2 transition-all duration-150 ease-in-out md:ml-auto md:max-w-96 ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex w-full flex-col gap-1 rounded-b-xl border border-[#e5e7eb] bg-white p-2 shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
          {menuItems.map((item) => {
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
                  className={`flex h-12 w-full items-center justify-between rounded-lg px-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#16a34a] ${
                    pathname === item.route
                      ? "bg-[#f0fdf4]"
                      : "bg-white hover:bg-[#f9fafb]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <item.icon
                      className={`size-4.5 stroke-3 ${
                        pathname === item.route
                          ? "text-primary/80"
                          : "text-muted-gray"
                      }`}
                    />

                    <span
                      className={`text-[14px] leading-normal ${
                        pathname === item.route
                          ? "font-semibold text-[#16a34a]"
                          : "font-medium text-[#111827]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </span>

                  <ChevronRight
                    className={`size-3.5 stroke-3 ${
                      pathname === item.route
                        ? "text-primary"
                        : "text-light-gray"
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileMenuBar;
