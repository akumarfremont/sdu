import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DiamondRule } from "./Motifs";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        centered ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <div
        className={cn(
          "flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
          centered && "sm:flex-col sm:items-center",
        )}
      >
        <h2 className="text-balance text-3xl leading-[1.15] sm:text-4xl">{title}</h2>
        {action}
      </div>
      {centered ? <DiamondRule className="w-40" /> : null}
      {intro ? (
        <p
          className={cn(
            "max-w-prose text-[0.975rem] leading-relaxed text-ink-soft",
            centered && "text-center",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
