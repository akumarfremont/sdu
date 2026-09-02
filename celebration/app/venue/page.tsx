import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { VenueMap } from "@/components/VenueMap";
import { Reveal } from "@/components/Reveal";
import { MarigoldGarland } from "@/components/Motifs";
import { venueZones } from "@/data/venues";
import { event } from "@/data/event";
import { IconMap, IconPin } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Venue",
  description: `Find your way around ${event.venue.name} — the main house, the Bhagwat canopy, the waterfall stage, the back lawn, the wellness zone and everything else.`,
};

export default function VenuePage() {
  const outdoor = venueZones.filter((zone) => zone.kind !== "service");
  const service = venueZones.filter((zone) => zone.kind === "service");

  return (
    <>
      <PageHeader
        eyebrow={`${event.venue.area} · ${event.venue.city}`}
        title={event.venue.name}
        intro="Everything happens within a five-minute walk. Tap a pin to see what an area is for and what's scheduled there through the week."
      >
        <a
          href={event.venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          <IconMap className="h-4 w-4" />
          Open in Maps
        </a>
      </PageHeader>

      <div className="container-page py-10 sm:py-14">
        <Reveal>
          <VenueMap />
        </Reveal>

        <p className="mt-4 text-center text-xs text-ink-faint">
          The map above is an illustration. When a real property plan is ready, set{" "}
          <code>venueMapImage</code> in <code>data/venues.ts</code> and the pins will sit on top of
          it.
        </p>

        <MarigoldGarland className="my-14 opacity-60" />

        <section>
          <SectionHeading eyebrow="Around the farm" title="The zones" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {outdoor.map((zone, index) => (
              <Reveal as="li" key={zone.id} delay={Math.min(index * 35, 220)}>
                <article className="card h-full p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl leading-snug">{zone.name}</h3>
                    <span className="chip bg-cream text-ink-soft ring-sand">{zone.kind}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{zone.description}</p>
                  {zone.note ? (
                    <p className="mt-3 flex gap-2 rounded-2xl border border-marigold-100 bg-marigold-50/60 px-3.5 py-2.5 text-xs leading-relaxed text-ink-soft">
                      <IconPin className="h-3.5 w-3.5 shrink-0 text-marigold-500" />
                      {zone.note}
                    </p>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <SectionHeading eyebrow="Arriving" title="Parking, valet and drop-off" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {service.map((zone) => (
              <li key={zone.id}>
                <article className="card h-full p-6">
                  <h3 className="text-xl">{zone.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{zone.description}</p>
                  {zone.note ? (
                    <p className="mt-3 text-xs text-marigold-600">{zone.note}</p>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
