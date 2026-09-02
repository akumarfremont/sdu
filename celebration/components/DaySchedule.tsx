"use client";

import type { ScheduledActivity } from "@/data/types";
import { groupBySegment } from "@/lib/schedule";
import { ActivityCard } from "./ActivityCard";
import { LeafPair } from "./Motifs";

/**
 * One day, laid out along the daily rhythm: morning → late evening.
 */
export function DaySchedule({ activities }: { activities: ScheduledActivity[] }) {
  const groups = groupBySegment(activities);

  if (groups.length === 0) {
    return (
      <p className="card p-6 text-center text-sm text-ink-soft">
        Nothing scheduled yet for this day. Details will be added closer to the date.
      </p>
    );
  }

  return (
    <div className="space-y-9">
      {groups.map(({ segment, activities: items }) => (
        <section key={segment.id} aria-labelledby={`segment-${segment.id}`}>
          <div className="mb-3 flex items-center gap-3">
            <h3
              id={`segment-${segment.id}`}
              className="font-display text-xl font-semibold text-plum-500"
            >
              {segment.name}
            </h3>
            <LeafPair />
            {segment.note ? (
              <span className="hidden text-xs text-ink-faint sm:inline">{segment.note}</span>
            ) : null}
          </div>
          <div className="space-y-3">
            {items.map((activity) => (
              <ActivityCard key={activity.key} activity={activity} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
