import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { WellnessCard } from "@/components/WellnessCard";
import { ActivityCard } from "@/components/ActivityCard";
import { Reveal } from "@/components/Reveal";
import { DiamondRule, MarigoldGarland, PeacockFeather } from "@/components/Motifs";
import { spiritual } from "@/data/spiritual";
import { dayById, wellnessExperiences, allActivities, uniqueActivities } from "@/lib/schedule";
import { IconBowl, IconLeaf, IconUsers } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "The Bhagwat, the wellness programme and the excursions — timings, seating, bookings and what to wear.",
};

const excursionsAndShows = uniqueActivities(
  allActivities.filter(
    (activity) => activity.category === "excursions" || activity.category === "entertainment",
  ),
);

export default function ExperiencesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Beyond the schedule"
        title="Experiences"
        intro="Three threads run through the whole week — the Bhagwat every afternoon, the wellness programme every morning, and a handful of excursions and performances scattered between them."
      />

      <div className="container-page py-10 sm:py-14">
        {/* ── Bhagwat ── */}
        <section id="bhagwat" className="scroll-mt-nav">
          <div className="relative overflow-hidden rounded-4xl border border-peacock-100 bg-gradient-to-br from-peacock-50 via-white to-marigold-50/40 p-7 shadow-card sm:p-12">
            <PeacockFeather className="pointer-events-none absolute -right-1 top-4 hidden opacity-60 sm:block" />
            <p className="eyebrow text-peacock-500">Spiritual programming</p>
            <h2 className="mt-3 text-balance text-3xl sm:text-4xl">{spiritual.heading}</h2>
            <DiamondRule className="my-5 w-44" />
            <div className="prose-warm max-w-prose space-y-3">
              {spiritual.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <div className="rounded-3xl border border-sand bg-white/85 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Timing
                </p>
                <p className="mt-1 font-display text-2xl text-plum-600">{spiritual.timing.daily}</p>
                <p className="mt-1 text-sm text-ink-soft">{spiritual.timing.exception}</p>
                <p className="mt-3 text-sm text-ink-soft">{spiritual.timing.breakNote}</p>
              </div>

              <div className="rounded-3xl border border-sand bg-white/85 p-5">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  <IconUsers className="h-4 w-4" />
                  Speaker
                </p>
                <p className="mt-1 font-display text-2xl text-plum-600">{spiritual.speaker.name}</p>
                <p className="text-sm font-medium text-marigold-600">{spiritual.speaker.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{spiritual.speaker.bio}</p>
              </div>

              <div className="rounded-3xl border border-sand bg-white/85 p-5">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  <IconLeaf className="h-4 w-4" />
                  Seating
                </p>
                <ul className="mt-2 space-y-2">
                  {spiritual.seating.map((line) => (
                    <li key={line} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-peacock-200" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-sand bg-white/85 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Session by session
                </p>
                <ol className="mt-3 space-y-2.5">
                  {spiritual.topics.map((topic) => (
                    <li key={topic.dayId} className="flex gap-3">
                      <span className="w-10 shrink-0 font-display text-lg font-semibold text-marigold-600">
                        {dayById[topic.dayId]?.label ?? topic.dayId}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-plum-600">
                          {topic.title}
                        </span>
                        <span className="block text-xs leading-relaxed text-ink-soft">
                          {topic.note}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl border border-sand bg-white/85 p-5">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  <IconBowl className="h-4 w-4" />
                  Food around the sessions
                </p>
                <ul className="mt-3 space-y-2">
                  {spiritual.food.map((line) => (
                    <li key={line} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold-300" />
                      {line}
                    </li>
                  ))}
                </ul>
                <Link href="/food" className="link-underline mt-4 inline-block text-sm font-semibold text-plum-600">
                  See the food pages
                </Link>
              </div>
            </div>
          </div>
        </section>

        <MarigoldGarland className="my-14 opacity-60" />

        {/* ── Wellness ── */}
        <section id="wellness" className="scroll-mt-nav">
          <SectionHeading
            eyebrow="Mornings and late mornings"
            title="The Wellness Programme"
            intro="Sunrise yoga on the lawn, breathwork under the fruit trees, and a therapy wing running through the late morning. Everything below is optional, gentle, and open to complete beginners."
          />
          <p className="mt-4 rounded-2xl border border-sand bg-cream/60 px-4 py-3 text-sm text-ink-soft">
            These are relaxation and leisure experiences offered as part of the celebration — not
            medical treatments, and no health claims are made for them. If something is right for
            you is a decision for you and your own doctor.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {wellnessExperiences.map((activity, index) => (
              <Reveal as="li" key={activity.id} delay={Math.min(index * 45, 250)} className="flex">
                <WellnessCard activity={activity} />
              </Reveal>
            ))}
          </ul>
        </section>

        <MarigoldGarland className="my-14 opacity-60" />

        {/* ── Excursions & performances ── */}
        <section id="excursions" className="scroll-mt-nav">
          <SectionHeading
            eyebrow="Off the farm and on the stage"
            title="Excursions & Performances"
            intro="One guided morning in the old city, and the invited performers who take the waterfall stage on the 24th and the 27th."
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {excursionsAndShows.map((activity) => (
              <li key={activity.key} className="flex">
                <ActivityCard activity={activity} variant="grid" showDay className="flex-1" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
