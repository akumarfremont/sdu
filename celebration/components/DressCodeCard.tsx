import type { DressCode } from "@/data/types";
import { cn } from "@/lib/cn";
import { IconShirt } from "./Icons";

export function DressCodeCard({
  code,
  className,
  featured = false,
}: {
  code: DressCode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "card card-hover flex h-full flex-col p-6",
        featured && "card-main",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow">{code.appliesTo}</p>
          <h3 className="mt-1.5 text-2xl">{code.name}</h3>
          <p className="mt-0.5 text-sm font-semibold text-marigold-600">{code.summary}</p>
        </div>
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-plum-500">
          <IconShirt />
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2" aria-hidden>
        {code.palette.map((hex) => (
          <span
            key={hex}
            className="h-7 w-7 rounded-full ring-1 ring-inset ring-black/10"
            style={{ backgroundColor: hex }}
          />
        ))}
        <span className="ml-1 text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
          Palette
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{code.detail}</p>

      <dl className="mt-4 space-y-3 border-t border-sand/70 pt-4 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Footwear
          </dt>
          <dd className="mt-0.5 text-ink-soft">{code.footwear}</dd>
        </div>
        {code.tips.length ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
              Tips
            </dt>
            <dd className="mt-1">
              <ul className="space-y-1.5">
                {code.tips.map((tip) => (
                  <li key={tip} className="flex gap-2 text-ink-soft">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold-300" />
                    {tip}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}
