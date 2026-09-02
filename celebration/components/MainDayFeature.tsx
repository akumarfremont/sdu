import Link from "next/link";
import type { Day } from "@/data/types";
import { dressCodeById } from "@/data/dressCodes";
import { getDayActivities } from "@/lib/schedule";
import { formatTime, longDate, weekdayName } from "@/lib/format";
import { cn } from "@/lib/cn";
import { DiamondRule, FloralCorner, PeacockFeather } from "./Motifs";
import { IconShirt, IconStar } from "./Icons";

/**
 * The richer editorial treatment given to the 25th, 26th and 27th.
 */
export function MainDayFeature({ day, index }: { day: Day; index: number }) {
  if (!day.feature) return null;
  const dress = dressCodeById[day.feature.dressCodeId];
  const evening = getDayActivities(day.id).filter(
    (activity) => activity.segment === "evening" || activity.segment === "late-evening",
  );

  return (
    <article
      id={`day-${day.id}`}
      className="scroll-mt-nav relative overflow-hidden rounded-4xl border border-marigold-200 bg-gradient-to-br from-marigold-50 via-white to-peacock-50/40 shadow-lift"
    >
      <FloralCorner className="pointer-events-none absolute -left-6 bottom-0 opacity-60" />
      <PeacockFeather className="pointer-events-none absolute right-5 top-6 hidden opacity-50 sm:block" />

      <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip bg-plum-600 text-ivory ring-plum-600">
              <IconStar className="h-3.5 w-3.5" />
              Main day {index + 1} of 3
            </span>
            <span className="chip bg-white text-ink-soft ring-sand">
              {weekdayName(day.date)}, {longDate(day.date)}
            </span>
          </div>

          <p className="eyebrow mt-5">{day.feature.eyebrow}</p>
          <h3 className="mt-1 text-balance font-display text-3xl leading-tight text-plum-600 sm:text-4xl">
            {day.feature.heading}
          </h3>

          {/* Replace with a real photograph: set `feature.image` in data/days.ts */}
          <ImagePlaceholder image={day.feature.image} label={day.title} className="mt-5" />

          <p className="mt-5 leading-relaxed text-ink-soft">{day.feature.body}</p>

          <DiamondRule className="my-6 max-w-xs" />

          <ul className="space-y-2.5">
            {day.feature.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[0.925rem] leading-relaxed text-ink">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold-400" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-sand bg-white/85 p-5 shadow-card">
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
              <IconShirt className="h-4 w-4" />
              What to wear
            </h4>
            <p className="mt-2 font-display text-xl text-plum-600">{dress?.name}</p>
            <p className="text-sm font-medium text-marigold-600">{dress?.summary}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{dress?.detail}</p>
            <div className="mt-3 flex items-center gap-1.5" aria-hidden>
              {dress?.palette.map((hex) => (
                <span
                  key={hex}
                  className="h-5 w-5 rounded-full ring-1 ring-inset ring-black/10"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
            <Link href="/dress-code" className="link-underline mt-3 inline-block text-sm text-plum-600">
              All dress guidance
            </Link>
          </div>

          <div className="rounded-3xl border border-sand bg-white/85 p-5 shadow-card">
            <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
              Evening programme
            </h4>
            <ol className="mt-3 space-y-3">
              {evening.map((activity) => (
                <li key={activity.key} className="flex gap-3">
                  <span className="w-[3.75rem] shrink-0 font-display text-base font-semibold text-marigold-600">
                    {formatTime(activity.start)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-plum-600">{activity.name}</span>
                    <span className="block text-xs leading-relaxed text-ink-soft">
                      {activity.summary}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <Link
            href={`/schedule?day=${day.id}`}
            className="btn-marigold w-full"
            scroll
          >
            See the full day
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * A tasteful stand-in until real photographs are added. Set `image` on the
 * day's `feature` in data/days.ts and this renders the photo instead.
 */
function ImagePlaceholder({
  image,
  label,
  className,
}: {
  image?: string;
  label: string;
  className?: string;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={label}
        loading="lazy"
        className={cn("aspect-[16/9] w-full rounded-3xl object-cover shadow-card", className)}
      />
    );
  }
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-3xl border border-marigold-100 bg-gradient-to-br from-marigold-100 via-cream to-peacock-50",
        className,
      )}
    >
      <svg viewBox="0 0 400 220" className="absolute inset-0 h-full w-full text-marigold-200" fill="none">
        {[40, 110, 180, 250, 320].map((x, i) => (
          <g key={x} transform={`translate(${x} ${i % 2 ? 70 : 140})`}>
            <circle r="26" stroke="currentColor" strokeWidth="1" opacity=".7" />
            <circle r="14" stroke="currentColor" strokeWidth="1" opacity=".5" />
            <circle r="5" fill="currentColor" opacity=".5" />
          </g>
        ))}
      </svg>
      <span className="relative rounded-full bg-white/70 px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-ink-faint">
        Photograph to follow
      </span>
    </div>
  );
}
