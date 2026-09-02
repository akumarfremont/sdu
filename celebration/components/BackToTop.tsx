"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { IconArrowUp } from "./Icons";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed right-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-sand bg-white/90 text-plum-600 shadow-lift backdrop-blur transition-all duration-300",
        "bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] lg:bottom-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <IconArrowUp />
    </button>
  );
}
