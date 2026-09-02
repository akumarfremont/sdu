"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { days } from "@/data/days";
import { getDayActivities } from "@/lib/schedule";
import { formatTime, longDate, weekdayName } from "@/lib/format";
import { dayShareText } from "@/lib/share";
import { cn } from "@/lib/cn";
import { DayTabs } from "./DayTabs";
import { ShareButton } from "./ShareButton";
import { IconChevron, IconPin, IconStar } from "./Icons";

/** Today, if the celebration is running — otherwise the first main day. */
function defaultDayId(): string {
  const today = new Date().toISOString().slice(0, 10);
  const match = days.find((day) => day.date === today);
  if (match) return match.id;
  const upcoming = days.find((day) => day.date >= today);
  return (upcoming ?? days.find((day) => day.isMainDay) ?? days[0]).id;
}

export function TodayPreview() {
  const [activeId, setActiveId] = useState(days.find((day) => day.isMainDay)?.id ?? days[0].id);

  useEffect(() => setActiveId(defaultDayId()), []);

  const day = days.find((item) => item.id === activeId) ?? days[0];
  const activities = getDayActivities(day.id);
  const isToday = day.date === new Date().toISOString().slice(0, 10);

  return (
    <section aria-labelledby="today-heading" className="container-page">
      <div
        className={cn(
          "rounded-4xl border p-6 shadow-card sm:p-8",
          day.isMainDay ? "border-marigold-200 bg-white/85" : "border-sand bg-white/75",
        )}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{isToday ? "Today at the farm" : "A day at a glance"}</p>
            <h2 id="today-heading" className="mt-1.5 text-3xl">
              {day.label} — {day.title}
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              {weekdayName(day.date)} · {longDate(day.date)}
              {day.isMainDay ? (
                <span className="ml-2 inline-flex items-center gap-1 text-marigold-600">
                  <IconStar className="h-3.5 w-3.5" />
                  Main day
                </span>
              ) : null}
            </p>
          </div>
          <ShareButton
            text={() => dayShareText(day.id, activities)}
            label={`Share the ${day.label}`}
          />
        </div>

        <div className="mt-5">
          <DayTabs activeId={day.id} onSelect={setActiveId} />
        </div>

        <ol className="mt-6 divide-y divide-sand/70">
          {activities.slice(0, 7).map((activity) => (
            <li key={activity.key} className="flex items-start gap-4 py-3">
              <span className="w-[4.25rem] shrink-0 font-display text-base font-semibold text-marigold-600">
                {formatTime(activity.start)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium leading-snug text-plum-600">{activity.name}</span>
                <span className="mt-0.5 flex items-center gap-1 text-xs text-ink-faint">
                  <IconPin className="h-3 w-3" />
                  {activity.summary}
                </span>
              </span>
            </li>
          ))}
        </ol>

        <Link
          href={`/schedule?day=${day.id}`}
          className="btn-primary mt-5 w-full sm:w-auto sm:px-7"
        >
          See the full {day.label}
          <IconChevron className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
