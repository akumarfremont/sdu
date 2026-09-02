import type { TimelineMilestone } from "@/data/types";
import { Reveal } from "./Reveal";

/**
 * The fifty-year timeline. A single column on mobile, alternating sides
 * on desktop with the rule running down the middle.
 */
export function Timeline({ milestones }: { milestones: TimelineMilestone[] }) {
  return (
    <ol className="relative mx-auto max-w-4xl">
      <span
        aria-hidden
        className="absolute left-[1.15rem] top-2 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-marigold-200 via-marigold-300 to-transparent md:left-1/2"
      />
      {milestones.map((milestone, index) => (
        <Reveal
          as="li"
          key={milestone.year}
          delay={Math.min(index * 50, 280)}
          className="relative pb-10 pl-12 md:w-1/2 md:pl-0 md:odd:pr-12 md:odd:text-right md:even:ml-auto md:even:pl-12"
        >
          <span
            aria-hidden
            className="absolute left-[0.6rem] top-1.5 h-4 w-4 rounded-full border-2 border-marigold-400 bg-ivory md:odd:left-auto md:odd:-right-2 md:even:-left-2"
          />
          <p className="font-display text-2xl font-semibold text-marigold-600">{milestone.year}</p>
          <h3 className="mt-1 text-lg text-plum-600">{milestone.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{milestone.body}</p>
          {milestone.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={milestone.image}
              alt={milestone.title}
              loading="lazy"
              className="mt-3 aspect-[4/3] w-full max-w-xs rounded-2xl object-cover shadow-card md:odd:ml-auto"
            />
          ) : null}
        </Reveal>
      ))}
    </ol>
  );
}
