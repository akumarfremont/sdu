"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades content up the first time it scrolls into view.
 * Falls back to visible immediately when IntersectionObserver is absent
 * or the guest prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={shown ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
