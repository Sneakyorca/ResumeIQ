"use client";
import { CircleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SignInNotice = () => {
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
    <div className="w-full" style={{ height: height }}>
      <div
        ref={navRef}
        className="p-3 sm:px-1 lg:px-20 bg-notice-yellow flex items-start gap-2 justify-center border-b border-border w-full  fixed z-20"
      >
        <CircleAlert className="size-4 text-warning stroke-3" />
        <p className="text-xs sm:text-[13px] lg:text-sm font-medium">
          Sign in to save this report to your permanent dashboard.
        </p>
      </div>
    </div>
  );
};

export default SignInNotice;
