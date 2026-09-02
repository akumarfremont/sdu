import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/Timeline";
import { Reveal } from "@/components/Reveal";
import { DiamondRule, LotusMark, MarigoldGarland } from "@/components/Motifs";
import { story, timeline } from "@/data/story";
import { event } from "@/data/event";

export const metadata: Metadata = {
  title: "Their Story",
  description: `Fifty years of ${event.coupleFull} — how it began, the years in between, and the family it grew into.`,
};

export default function StoryPage() {
  return (
    <>
      <PageHeader eyebrow="Since 1976" title={story.heading} intro={story.standfirst} />

      <div className="container-page py-10 sm:py-14">
        <Reveal>
          <section className="mx-auto max-w-prose">
            <div className="prose-warm space-y-4">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <figure className="mt-10 rounded-4xl border border-marigold-200 bg-gradient-to-br from-marigold-50 to-white p-8 text-center shadow-card">
              <LotusMark className="mx-auto h-7 w-11 text-marigold-400" />
              <blockquote className="mt-4 font-display text-2xl leading-snug text-plum-600 sm:text-3xl">
                “{story.quote.text}”
              </blockquote>
              <figcaption className="mt-3 text-sm text-ink-soft">
                — {story.quote.attribution}
              </figcaption>
            </figure>

            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              {story.family.map((entry) => (
                <div key={entry.role} className="rounded-2xl border border-sand bg-white/80 p-5 text-center">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    {entry.role}
                  </dt>
                  <dd className="mt-1 font-display text-lg text-plum-600">{entry.names}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-center text-xs text-ink-faint">
              Placeholder text — edit <code>data/story.ts</code> to add the real names, story and
              photographs.
            </p>
          </section>
        </Reveal>

        <MarigoldGarland className="my-16 opacity-60" />

        <section>
          <SectionHeading
            eyebrow="Fifty years"
            title="A timeline"
            intro="A decade at a time. Add a photograph to any milestone by setting an image path in data/story.ts."
            align="center"
          />
          <div className="mt-12">
            <Timeline milestones={timeline} />
          </div>
        </section>

        <Reveal className="mt-10">
          <section className="rounded-4xl border border-sand bg-white/80 p-8 text-center shadow-card">
            <h2 className="text-2xl">Have a photograph or a memory?</h2>
            <DiamondRule className="mx-auto my-4 w-36" />
            <p className="mx-auto max-w-prose text-sm leading-relaxed text-ink-soft">
              The memory table at the farm is being put together now, and the gallery here will grow
              through the week. Send anything you have to the family — most of the best pictures
              every year come from guests.
            </p>
            <Link href="/gallery" className="btn-primary mt-6">
              See the gallery
            </Link>
          </section>
        </Reveal>
      </div>
    </>
  );
}
