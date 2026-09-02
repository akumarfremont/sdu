import type { ReactNode } from "react";
import { DiamondRule, MarigoldGarland } from "./Motifs";

/** The consistent top of every inner page. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-sand/60 bg-gradient-to-b from-cream/70 to-transparent">
      <MarigoldGarland className="absolute inset-x-0 top-0 opacity-50" />
      <div className="container-page py-8 text-center sm:py-14">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mx-auto mt-2 max-w-3xl text-balance font-display text-[2.15rem] font-semibold leading-[1.1] text-plum-600 sm:mt-3 sm:text-5xl">
          {title}
        </h1>
        <DiamondRule className="mx-auto my-4 w-44 sm:my-5" />
        {intro ? (
          <p className="mx-auto max-w-prose text-[0.95rem] leading-relaxed text-ink-soft sm:text-[1.02rem]">
            {intro}
          </p>
        ) : null}
        {children ? <div className="mt-5 sm:mt-6">{children}</div> : null}
      </div>
    </header>
  );
}
