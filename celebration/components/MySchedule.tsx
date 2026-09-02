"use client";

import Link from "next/link";
import { useMemo } from "react";
import { days } from "@/data/days";
import { allActivities } from "@/lib/schedule";
import { useItinerary } from "@/lib/useItinerary";
import { itineraryShareText } from "@/lib/share";
import { longDate, toMinutes, weekdayName } from "@/lib/format";
import { ActivityCard } from "./ActivityCard";
import { ShareButton } from "./ShareButton";
import { DiamondRule, LotusMark } from "./Motifs";
import { IconHeart, IconStar } from "./Icons";
import { cn } from "@/lib/cn";

/**
 * "My Celebration" — the guest's own picks, grouped by day.
 * Everything lives in localStorage; there is no account.
 */
export function MySchedule() {
  const { keys, clear } = useItinerary();

  const chosen = useMemo(() => {
    const set = new Set(keys);
    return allActivities
      .filter((activity) => set.has(activity.key))
      .sort((a, b) => a.dayId.localeCompare(b.dayId) || toMinutes(a.start) - toMinutes(b.start));
  }, [keys]);

  const byDay = useMemo(
    () =>
      days
        .map((day) => ({ day, items: chosen.filter((activity) => activity.dayId === day.id) }))
        .filter((group) => group.items.length > 0),
    [chosen],
  );

  if (chosen.length === 0) {
    return (
      <div className="card mx-auto max-w-xl p-10 text-center">
        <LotusMark className="mx-auto h-8 w-12 text-marigold-300" />
        <h2 className="mt-4 text-2xl">Nothing picked yet</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Tap the <span className="font-semibold text-plum-600">+</span> on any activity and it will
          appear here. Your list is kept privately in this browser — no account, no sign-in.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/schedule" className="btn-primary">
            Browse the schedule
          </Link>
          <Link href="/activities" className="btn-ghost">
            Explore activities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="flex items-center gap-2 text-sm text-ink-soft">
          <IconHeart className="h-5 w-5 text-rose-400" />
          <span>
            <span className="font-semibold text-plum-600">{chosen.length}</span>{" "}
            {chosen.length === 1 ? "activity" : "activities"} across{" "}
            <span className="font-semibold text-plum-600">{byDay.length}</span>{" "}
            {byDay.length === 1 ? "day" : "days"}
          </span>
        </p>
        <div className="flex flex-wrap gap-2">
          <ShareButton text={() => itineraryShareText(chosen)} label="Share my schedule" />
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Clear everything from My Celebration?")) clear();
            }}
            className="btn-ghost"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-10">
        {byDay.map(({ day, items }) => (
          <section key={day.id} aria-labelledby={`my-day-${day.id}`}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h2
                id={`my-day-${day.id}`}
                className={cn(
                  "font-display text-2xl font-semibold",
                  day.isMainDay ? "text-marigold-600" : "text-plum-600",
                )}
              >
                {day.label}
              </h2>
              <span className="chip bg-cream text-ink-soft ring-sand">
                {weekdayName(day.date)} · {longDate(day.date)}
              </span>
              {day.isMainDay ? (
                <span className="chip bg-marigold-50 text-marigold-600 ring-marigold-200">
                  <IconStar className="h-3.5 w-3.5" />
                  Main day
                </span>
              ) : null}
            </div>
            <DiamondRule className="mb-4" />
            <div className="space-y-3">
              {items.map((activity) => (
                <ActivityCard key={activity.key} activity={activity} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
