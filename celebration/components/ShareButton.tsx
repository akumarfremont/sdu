"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { share } from "@/lib/share";
import { IconCheck, IconShare } from "./Icons";

/**
 * Uses the device share sheet (WhatsApp, Messages, Mail…) where available,
 * and copies to the clipboard everywhere else.
 */
export function ShareButton({
  text,
  label = "Share",
  title,
  className,
  variant = "ghost",
}: {
  text: string | (() => string);
  label?: string;
  title?: string;
  className?: string;
  variant?: "ghost" | "primary" | "marigold" | "icon";
}) {
  const [state, setState] = useState<"idle" | "shared" | "copied">("idle");

  async function onClick() {
    const value = typeof text === "function" ? text() : text;
    const result = await share(value, title);
    if (result === "failed") return;
    setState(result);
    window.setTimeout(() => setState("idle"), 2400);
  }

  const feedback = state === "copied" ? "Copied" : state === "shared" ? "Shared" : label;

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand bg-white/80 text-plum-600 transition-colors hover:border-marigold-200 hover:bg-marigold-50",
          className,
        )}
      >
        {state === "idle" ? <IconShare className="h-[1.15rem] w-[1.15rem]" /> : <IconCheck className="h-[1.15rem] w-[1.15rem] text-leaf-500" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        variant === "primary" && "btn-primary",
        variant === "marigold" && "btn-marigold",
        variant === "ghost" && "btn-ghost",
        className,
      )}
    >
      {state === "idle" ? <IconShare className="h-4 w-4" /> : <IconCheck className="h-4 w-4" />}
      {feedback}
    </button>
  );
}
