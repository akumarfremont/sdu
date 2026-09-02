import Link from "next/link";
import { event } from "@/data/event";
import { days } from "@/data/days";
import { Countdown } from "./Countdown";
import { DiamondRule, FloralCorner, LotusMark, TempleArch } from "./Motifs";
import { ShareButton } from "./ShareButton";
import { siteShareText } from "@/lib/share";
import { IconCalendar, IconSparkle } from "./Icons";
import { weekdayName } from "@/lib/format";

const mainDays = days.filter((day) => day.isMainDay);

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[34rem] w-[26rem] -translate-x-1/2 opacity-45">
          <TempleArch />
        </div>
        <FloralCorner className="absolute -left-8 bottom-0 h-52 w-52 opacity-70" />
        <FloralCorner className="absolute -right-8 bottom-0 h-52 w-52 -scale-x-100 opacity-70" />
      </div>

      <div className="container-page relative pb-12 pt-8 sm:pb-14 sm:pt-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <LotusMark className="h-9 w-14 animate-floatSlow text-marigold-400" />

          <p className="eyebrow mt-4 sm:mt-5">A golden anniversary</p>

          <h1 className="mt-3 text-balance font-display text-[2.45rem] font-semibold leading-[1.08] text-plum-600 sm:text-6xl">
            Celebrating{" "}
            <span className="relative inline-block">
              <span className="relative z-10">50 Years</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-full bg-marigold-100"
              />
            </span>{" "}
            of Sharda &amp; Manoj
          </h1>

          <p className="mt-4 max-w-xl text-balance text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg">
            {event.tagline}
          </p>

          <DiamondRule className="my-6 w-56 sm:my-7" />

          <div className="flex flex-col items-center gap-1">
            <p className="font-display text-2xl font-semibold text-plum-500 sm:text-3xl">
              {event.dateRange}
            </p>
            <p className="text-sm text-ink-soft">
              {event.venue.name} · {event.venue.area}, {event.venue.city}
            </p>
          </div>

          <div className="mt-7 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
            <Link href="/schedule" className="btn-primary w-full sm:w-auto sm:px-7">
              <IconCalendar className="h-4 w-4" />
              Explore by Day
            </Link>
            <Link href="/activities" className="btn-marigold w-full sm:w-auto sm:px-7">
              <IconSparkle className="h-4 w-4" />
              Explore Activities
            </Link>
            <ShareButton text={siteShareText()} label="Share" variant="ghost" className="w-full sm:w-auto" />
          </div>

          <Countdown className="mt-10 w-full" />
        </div>

        {/* Main celebration days */}
        <div className="mx-auto mt-14 max-w-4xl">
          <div className="rounded-4xl border border-marigold-200 bg-gradient-to-br from-marigold-50 via-white to-white p-6 shadow-lift sm:p-8">
            <div className="text-center">
              <p className="eyebrow">The heart of the week</p>
              <h2 className="mt-2 font-display text-3xl text-plum-600 sm:text-4xl">
                Main Celebration Days
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
                The {event.mainDaysLabel} are the primary days for guests travelling in. If you can
                only join us for part of the week, plan around these three.
              </p>
            </div>

            <ol className="mt-7 grid gap-3 sm:grid-cols-3">
              {mainDays.map((day) => (
                <li key={day.id}>
                  <Link
                    href={`/schedule?day=${day.id}`}
                    className="group flex h-full flex-col rounded-3xl border border-sand bg-white/90 p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-marigold-300 hover:shadow-lift"
                  >
                    <span className="text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint">
                      {weekdayName(day.date)}
                    </span>
                    <span className="mt-0.5 font-display text-4xl font-semibold leading-none text-marigold-500">
                      {day.label}
                    </span>
                    <span className="mt-3 font-display text-lg font-semibold leading-snug text-plum-600 transition-colors group-hover:text-marigold-600">
                      {day.title}
                    </span>
                    <span className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {day.subtitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
