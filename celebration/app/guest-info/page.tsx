import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { DiamondRule, MarigoldGarland } from "@/components/Motifs";
import { guestInfoIntro, guestInfoSections } from "@/data/guestInfo";
import { event } from "@/data/event";
import { dressCodes } from "@/data/dressCodes";
import { IconChevron, IconInfo, IconStar } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Guest Information",
  description:
    "Arrivals, departures, transport, parking, weather, packing, meals, children, accessibility and emergency contacts for the celebration.",
};

export default function GuestInfoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Practical things"
        title="Guest Information"
        intro={guestInfoIntro.body}
      />

      <div className="container-page py-10 sm:py-14">
        <Reveal>
          <section className="rounded-4xl border border-marigold-200 bg-gradient-to-br from-marigold-50 via-white to-white p-7 shadow-lift sm:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <span className="chip bg-plum-600 text-ivory ring-plum-600">
                  <IconStar className="h-3.5 w-3.5" />
                  Plan around these dates
                </span>
                <h2 className="mt-4 text-balance text-3xl sm:text-4xl">
                  Most guests join for the {event.mainDaysLabel}
                </h2>
                <p className="mt-3 max-w-prose leading-relaxed text-ink-soft">
                  The 22nd to the 24th are quieter days at the farm for family and early arrivals —
                  wellness mornings, the excursion and the first Bhagwat sessions. The 28th is
                  primarily a departure day, with the final morning session and the bhandara lunch
                  before the cars start running.
                </p>
                <Link href="/schedule?view=main" className="btn-primary mt-6">
                  See the main days
                  <IconChevron className="h-4 w-4" />
                </Link>
              </div>
              <ul className="space-y-2.5">
                {event.guestNotes.map((note) => (
                  <li key={note.title} className="rounded-2xl border border-sand bg-white/85 px-4 py-3">
                    <p className="text-sm font-semibold text-plum-600">{note.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{note.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <MarigoldGarland className="my-14 opacity-60" />

        <section>
          <SectionHeading
            eyebrow="Everything, in order"
            title="Before, during and after"
            intro="If your question isn't answered here, try the FAQ — and if it still isn't, call one of the numbers at the bottom of this page."
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guestInfoSections.map((section, index) => (
              <Reveal as="li" key={section.id} delay={Math.min(index * 40, 240)}>
                <article id={section.id} className="card scroll-mt-nav h-full p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl leading-snug">{section.title}</h3>
                    <IconInfo className="h-5 w-5 shrink-0 text-marigold-400" />
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-marigold-600">{section.summary}</p>
                  <ul className="mt-3 space-y-2">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold-300" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </ul>
        </section>

        <MarigoldGarland className="my-14 opacity-60" />

        <section>
          <SectionHeading
            eyebrow="At a glance"
            title="Dress code, day by day"
            action={
              <Link href="/dress-code" className="btn-ghost shrink-0">
                Full guidance
                <IconChevron className="h-4 w-4" />
              </Link>
            }
          />
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dressCodes.map((code) => (
              <li key={code.id}>
                <Link
                  href={`/dress-code#${code.id}`}
                  className="group flex h-full flex-col rounded-3xl border border-sand bg-white/80 p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-marigold-300 hover:shadow-lift"
                >
                  <span className="text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
                    {code.appliesTo}
                  </span>
                  <span className="mt-1 font-display text-xl font-semibold text-plum-600 transition-colors group-hover:text-marigold-600">
                    {code.name}
                  </span>
                  <span className="mt-1 text-sm text-ink-soft">{code.summary}</span>
                  <span className="mt-3 flex gap-1.5" aria-hidden>
                    {code.palette.map((hex) => (
                      <span
                        key={hex}
                        className="h-4 w-4 rounded-full ring-1 ring-inset ring-black/10"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Reveal className="mt-16">
          <section className="rounded-4xl border border-sand bg-white/80 p-7 shadow-card sm:p-10">
            <div className="text-center">
              <p className="eyebrow">Any trouble at all</p>
              <h2 className="mt-2 text-3xl">Who to call</h2>
              <DiamondRule className="mx-auto my-5 w-40" />
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {event.contacts.map((contact) => (
                <li key={contact.role} className="rounded-2xl border border-sand bg-cream/50 p-5 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    {contact.role}
                  </p>
                  <p className="mt-1.5 font-display text-xl text-plum-600">{contact.name}</p>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="link-underline mt-1 inline-block text-sm text-ink-soft"
                  >
                    {contact.phone}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-xs text-ink-faint">
              Numbers are placeholders — replace them in <code>data/event.ts</code>.
            </p>
          </section>
        </Reveal>
      </div>
    </>
  );
}
