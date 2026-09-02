import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TodayPreview } from "@/components/TodayPreview";
import { QuickLinks } from "@/components/QuickLinks";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ShareButton } from "@/components/ShareButton";
import { DiamondRule, LeafPair, MarigoldGarland, PeacockFeather } from "@/components/Motifs";
import { IconChevron } from "@/components/Icons";
import { event } from "@/data/event";
import { spiritual } from "@/data/spiritual";
import { siteShareText } from "@/lib/share";
import { activeCategories, countForCategory } from "@/lib/schedule";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Reveal className="mt-4">
        <TodayPreview />
      </Reveal>

      <MarigoldGarland className="my-14 opacity-60" />

      {/* Welcome from the family */}
      <Reveal className="container-page">
        <section className="relative overflow-hidden rounded-4xl border border-sand bg-white/75 p-7 shadow-card sm:p-12">
          <PeacockFeather className="pointer-events-none absolute -right-2 -top-2 hidden opacity-60 sm:block" />
          <div className="max-w-prose">
            <p className="eyebrow">{event.welcome.heading}</p>
            <h2 className="mt-3 text-balance text-3xl sm:text-4xl">
              Come as you are. Stay as long as you can.
            </h2>
            <DiamondRule className="my-6 w-44" />
            <div className="prose-warm space-y-4">
              {event.welcome.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-6 font-display text-xl text-plum-500">{event.welcome.signature}</p>
            <Link href="/story" className="link-underline mt-4 inline-flex items-center gap-1 text-sm font-semibold text-plum-600">
              Read their story
              <IconChevron className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </Reveal>

      {/* Guest notes */}
      <section className="container-page mt-16">
        <SectionHeading
          eyebrow="Before you come"
          title="A few things worth knowing"
          align="center"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {event.guestNotes.map((note, index) => (
            <Reveal as="li" key={note.title} delay={index * 70}>
              <div className="card h-full p-6">
                <div className="flex items-center gap-2">
                  <LeafPair />
                  <h3 className="text-xl">{note.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{note.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Explore by activity */}
      <section className="container-page mt-20">
        <SectionHeading
          eyebrow="Or browse another way"
          title="Explore by activity"
          intro="Everything happening through the week, sorted the way you think about it — spiritual, music, dance, wellness, sport, nature and everything for the children."
          action={
            <Link href="/activities" className="btn-ghost shrink-0">
              All activities
              <IconChevron className="h-4 w-4" />
            </Link>
          }
        />
        <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {activeCategories.map((category, index) => (
            <Reveal as="li" key={category.id} delay={Math.min(index * 45, 250)}>
              <Link
                href="/activities"
                className="group flex h-full flex-col rounded-3xl border border-sand bg-white/80 p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-marigold-300 hover:shadow-lift"
              >
                <span className="font-display text-xl font-semibold leading-tight text-plum-600 transition-colors group-hover:text-marigold-600">
                  {category.name}
                </span>
                <span className="mt-1 text-xs leading-relaxed text-ink-soft">{category.blurb}</span>
                <span className="mt-3 text-[0.7rem] uppercase tracking-[0.14em] text-marigold-600">
                  {countForCategory(category.id)} to explore
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Spiritual programming */}
      <Reveal className="container-page mt-20">
        <section className="overflow-hidden rounded-4xl border border-peacock-100 bg-gradient-to-br from-peacock-50 via-white to-marigold-50/50 p-7 shadow-card sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-peacock-500">Every afternoon</p>
              <h2 className="mt-3 text-balance text-3xl sm:text-4xl">{spiritual.heading}</h2>
              <DiamondRule className="my-5 w-40" />
              <div className="prose-warm space-y-3">
                {spiritual.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
              <Link href="/experiences#bhagwat" className="btn-primary mt-6">
                About the Bhagwat
              </Link>
            </div>
            <div className="rounded-3xl border border-sand bg-white/85 p-6 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Daily timing
              </p>
              <p className="mt-1 font-display text-3xl text-plum-600">{spiritual.timing.daily}</p>
              <p className="mt-1 text-sm text-ink-soft">{spiritual.timing.exception}</p>
              <p className="mt-5 rounded-2xl border border-peacock-100 bg-peacock-50/70 px-4 py-3 text-sm leading-relaxed text-ink-soft">
                {spiritual.welcomeNote}
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Quick links */}
      <section className="container-page mt-20">
        <SectionHeading eyebrow="Everything else" title="Quick links" align="center" />
        <div className="mt-8">
          <QuickLinks />
        </div>
      </section>

      {/* Share */}
      <Reveal className="container-page mt-20">
        <section className="rounded-4xl border border-marigold-200 bg-gradient-to-br from-marigold-50 to-white p-8 text-center shadow-card sm:p-12">
          <h2 className="text-balance text-3xl sm:text-4xl">Pass it on</h2>
          <p className="mx-auto mt-3 max-w-prose leading-relaxed text-ink-soft">
            Most guests will open this from a WhatsApp message. Share the site with anyone who is
            coming — the schedule, dress guidance and travel notes are all here.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
            <ShareButton text={siteShareText()} label="Share this website" variant="primary" />
            <Link href="/rsvp" className="btn-ghost">
              RSVP
            </Link>
          </div>
        </section>
      </Reveal>
    </>
  );
}
