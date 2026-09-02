import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { DressCodeCard } from "@/components/DressCodeCard";
import { Reveal } from "@/components/Reveal";
import { MarigoldGarland } from "@/components/Motifs";
import { dressCodes, dressCodeById } from "@/data/dressCodes";
import { days } from "@/data/days";
import { weekdayName } from "@/lib/format";
import { IconChevron, IconStar } from "@/components/Icons";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Dress Code",
  description:
    "What to wear for the Bhagwat, the bhajan evening, garba and dandiya, the closing celebration, wellness mornings and everything in between.",
};

const mainDays = days.filter((day) => day.isMainDay && day.feature);

export default function DressCodePage() {
  return (
    <>
      <PageHeader
        eyebrow="What to wear"
        title="Dress Code"
        intro="Warm afternoons, cool evenings and a lot of sitting on the floor. Everything below is a friendly suggestion rather than a rule — come in whatever lets you enjoy the day."
      />

      <div className="container-page py-10 sm:py-14">
        <section>
          <SectionHeading eyebrow="The three main evenings" title="Start here" />
          <ul className="mt-7 grid gap-4 lg:grid-cols-3">
            {mainDays.map((day) => {
              const code = dressCodeById[day.feature!.dressCodeId];
              return (
                <li key={day.id}>
                  <div className="card card-main h-full p-6">
                    <span className="chip bg-plum-600 text-ivory ring-plum-600">
                      <IconStar className="h-3.5 w-3.5" />
                      {day.label} · {weekdayName(day.date, "short")}
                    </span>
                    <h3 className="mt-4 text-2xl">{code?.name}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-marigold-600">{code?.summary}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{code?.detail}</p>
                    <div className="mt-4 flex gap-1.5" aria-hidden>
                      {code?.palette.map((hex) => (
                        <span
                          key={hex}
                          className="h-6 w-6 rounded-full ring-1 ring-inset ring-black/10"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                    <Link
                      href={`/schedule?day=${day.id}`}
                      className={cn("link-underline mt-4 inline-flex items-center gap-1 text-sm font-semibold text-plum-600")}
                    >
                      {day.title}
                      <IconChevron className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <MarigoldGarland className="my-14 opacity-60" />

        <section>
          <SectionHeading
            eyebrow="Every occasion"
            title="All dress guidance"
            intro="Edit any of these in data/dressCodes.ts — the wording, the palette and the footwear notes all flow through to the schedule and the activity cards."
          />
          <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {dressCodes.map((code, index) => (
              <Reveal as="li" key={code.id} delay={Math.min(index * 45, 250)} className="flex">
                <div id={code.id} className="scroll-mt-nav flex w-full">
                  <DressCodeCard code={code} className="flex-1" />
                </div>
              </Reveal>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
