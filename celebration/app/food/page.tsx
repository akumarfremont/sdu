import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { DiamondRule, LeafPair, MarigoldGarland } from "@/components/Motifs";
import { foodIntro, foodStations, menuByDay } from "@/data/food";
import { days } from "@/data/days";
import { longDate, weekdayName } from "@/lib/format";
import { cn } from "@/lib/cn";
import { IconBowl, IconStar } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Food",
  description:
    "Pure vegetarian and alcohol-free all week, with Jain and satvik counters at every meal. Menus by day, plus the stations that run throughout.",
};

export default function FoodPage() {
  return (
    <>
      <PageHeader
        eyebrow="Seven days of eating"
        title="Food at the Farm"
        intro={foodIntro.body[0]}
      />

      <div className="container-page py-10 sm:py-14">
        <Reveal>
          <section className="rounded-4xl border border-leaf-300/60 bg-gradient-to-br from-leaf-100/60 via-white to-marigold-50/40 p-7 shadow-card sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="eyebrow text-leaf-600">The short version</p>
                <h2 className="mt-2 text-balance text-3xl sm:text-4xl">{foodIntro.heading}</h2>
                <DiamondRule className="my-5 w-40" />
                <p className="prose-warm">{foodIntro.body[1]}</p>
              </div>
              <ul className="space-y-2.5">
                {foodIntro.notes.map((note) => (
                  <li
                    key={note}
                    className="flex gap-3 rounded-2xl border border-sand bg-white/85 px-4 py-3 text-sm leading-relaxed text-ink-soft"
                  >
                    <IconBowl className="h-4 w-4 shrink-0 text-leaf-500" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <MarigoldGarland className="my-14 opacity-60" />

        <section>
          <SectionHeading
            eyebrow="Running all week"
            title="The Stations"
            intro="Counters that appear at every meal, and the specialities that come out at particular times of day."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {foodStations.map((station, index) => (
              <Reveal as="li" key={station.id} delay={Math.min(index * 45, 250)}>
                <article className="card card-hover h-full p-6">
                  <div className="flex items-center gap-2">
                    <LeafPair />
                    <h3 className="text-xl leading-snug">{station.name}</h3>
                  </div>
                  <p className="mt-2 text-sm font-medium text-marigold-600">{station.blurb}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{station.detail}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {station.tags.map((tag) => (
                      <li key={tag} className="chip bg-cream text-ink-soft ring-sand">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ul>
        </section>

        <MarigoldGarland className="my-14 opacity-60" />

        <section id="menus" className="scroll-mt-nav">
          <SectionHeading
            eyebrow="Day by day"
            title="Menus"
            intro="A guide rather than a promise — the kitchen works with whatever the garden and the market give it each morning. Menus can be edited right up to the week itself."
          />
          <ul className="mt-8 grid gap-4 lg:grid-cols-2">
            {days.map((day, index) => {
              const menu = menuByDay[day.id];
              return (
                <Reveal as="li" key={day.id} delay={Math.min(index * 40, 220)}>
                  <article
                    className={cn(
                      "h-full rounded-3xl border p-6 shadow-card",
                      day.isMainDay
                        ? "border-marigold-200 bg-gradient-to-br from-marigold-50 via-white to-white"
                        : "border-sand bg-white/80",
                    )}
                  >
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="font-display text-2xl font-semibold text-plum-600">
                        {day.label}
                      </h3>
                      <span className="text-xs text-ink-faint">
                        {weekdayName(day.date)} · {longDate(day.date)}
                      </span>
                      {day.isMainDay ? (
                        <span className="chip ml-auto bg-marigold-50 text-marigold-600 ring-marigold-200">
                          <IconStar className="h-3.5 w-3.5" />
                          Main day
                        </span>
                      ) : null}
                    </div>

                    {menu ? (
                      <>
                        <dl className="mt-4 space-y-3">
                          <Course term="Breakfast" items={menu.breakfast} />
                          <Course term="Lunch" items={menu.lunch} />
                          <Course term="Tea & snacks" items={menu.snacks} />
                          <Course term="Dinner" items={menu.dinner} />
                        </dl>
                        {menu.note ? (
                          <p className="mt-4 rounded-2xl border border-marigold-100 bg-marigold-50/60 px-3.5 py-2.5 text-xs leading-relaxed text-ink-soft">
                            {menu.note}
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <p className="mt-4 text-sm text-ink-faint">Menu to follow.</p>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}

function Course({ term, items }: { term: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">{term}</dt>
      <dd className="text-sm leading-relaxed text-ink-soft">{items.join(" · ")}</dd>
    </div>
  );
}
